#!/usr/bin/env node
// Smoke test against the PACKED npm artifact, not the repo tree — catches the
// "works-from-repo, broken-from-npm" class (files whitelist, chmod, path
// assumptions). Packs the tarball, extracts it, audits the ship surface, then
// runs the packed scripts/install.js end to end (install → verify → uninstall).
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gdd-pack-'));

let failures = 0;
const check = (label, ok) => {
  process.stdout.write(`${ok ? 'ok' : 'FAIL'} - ${label}\n`);
  if (!ok) failures += 1;
};

try {
  // Pack into tmp and extract. npm roots every tarball entry under package/.
  // Locate the tarball by reading the (freshly created, empty) pack directory
  // rather than parsing `npm pack --json`, whose shape has drifted across npm
  // majors (npm 11 broke the array[0].filename assumption this once relied on).
  // The file npm actually wrote is authoritative and version-independent.
  const npmArgs = ['pack', '--pack-destination', tmp];
  const npmCli = process.env.npm_execpath || path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js');
  execFileSync(process.platform === 'win32' ? process.execPath : 'npm',
    process.platform === 'win32' ? [npmCli, ...npmArgs] : npmArgs, {
    cwd: repoRoot,
    stdio: ['ignore', 'inherit', 'inherit'],
  });
  const tgzName = fs.readdirSync(tmp).find((f) => f.endsWith('.tgz'));
  if (!tgzName) throw new Error(`npm pack wrote no .tgz into ${tmp}`);
  const tgz = path.join(tmp, tgzName);
  execFileSync('tar', ['-xzf', tgz, '-C', tmp]);
  const pkg = path.join(tmp, 'package');

  const files = fs
    .readdirSync(pkg, { recursive: true, withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => path.relative(pkg, path.join(e.parentPath ?? e.path, e.name)));

  // Ship-surface hygiene. Assert against the `files` allowlist itself rather
  // than naming individual paths to keep out: an allowlist check catches a new
  // directory nobody thought to exclude, which naming known offenders cannot,
  // and it keeps development-only path names out of a file that ships publicly.
  // npm always packs package.json / README / LICENSE / CHANGELOG regardless of
  // `files`, so those are expected on top of it.
  const manifest = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
  const packedManifest = JSON.parse(fs.readFileSync(path.join(pkg, 'package.json'), 'utf8'));
  check('packed npm version matches the reviewed source', packedManifest.version === manifest.version);
  for (const relative of ['.claude-plugin/plugin.json', 'plugin.json']) {
    const pluginManifest = JSON.parse(fs.readFileSync(path.join(pkg, relative), 'utf8'));
    check(`packed ${relative} version matches npm`, pluginManifest.version === packedManifest.version);
  }

  const allowedTop = new Set([
    ...manifest.files.map((f) => f.split('/')[0]),
    'package.json', 'README.md', 'LICENSE', 'CHANGELOG.md',
  ]);
  const strays = [...new Set(files.map((f) => f.split(path.sep)[0]))].filter((t) => !allowedTop.has(t));
  check(`tarball holds only allowlisted top-level entries${strays.length ? ` (strays: ${strays.join(', ')})` : ''}`, strays.length === 0);
  check('tarball ships scripts/install.js', files.includes(path.join('scripts', 'install.js')));
  check('packed gdd command resolves to the shipped installer', manifest.bin.gdd === 'scripts/install.js');
  check('tarball has no top-level bin/ directory', !fs.existsSync(path.join(pkg, 'bin')));
  check(`sane file count (${files.length})`, files.length > 40 && files.length < 240);

  // The packed installer must resolve its payload from the packed tree, not the
  // repo copy — this is the assertion the repo-relative smoke tests can't make.
  const installer = path.join(pkg, 'scripts', 'install.js');
  const cliVersion = execFileSync(process.execPath, [installer, '--version'], {encoding: 'utf8'}).trim();
  check('packed CLI reports the npm/plugin version', cliVersion === packedManifest.version);
  // Exercise the same npm exec route used by npx against these exact bytes.
  // Fresh offline cache and neutral cwd prevent a registry or local-copy fallback.
  const npmrc = path.join(tmp, 'npmrc');
  fs.writeFileSync(npmrc, '');
  const execArgs = ['exec', '--offline', '--yes', '--ignore-scripts',
    '--userconfig', npmrc, '--cache', path.join(tmp, 'npm-cache'),
    '--package', tgz, '--', 'gdd', '--version'];
  const execVersion = execFileSync(process.platform === 'win32' ? process.execPath : 'npm',
    process.platform === 'win32' ? [npmCli, ...execArgs] : execArgs,
    {cwd: tmp, encoding: 'utf8'}).trim();
  check('npm/npx executes the exact packed version in an isolated cache', execVersion === packedManifest.version);

  const configDir = path.join(tmp, 'cfg');
  execFileSync('node', [installer, '--claude', '--config-dir', configDir], { stdio: 'pipe' });
  for (const rel of [
    'commands/gdd/scope-deal.md',
    'agents/gdd-verifier.md',
    'gdd-core/workflows/size-market.md',
    'gdd-core/VERSION',
  ]) {
    check(`packed install writes ${rel}`, fs.existsSync(path.join(configDir, rel)));
  }
  check('installed VERSION matches the npm/plugin version',
    fs.readFileSync(path.join(configDir, 'gdd-core', 'VERSION'), 'utf8').trim() === packedManifest.version);
  check('installed inventory records the npm/plugin version',
    JSON.parse(fs.readFileSync(path.join(configDir, 'gdd-core', 'gdd-file-manifest.json'), 'utf8')).version === packedManifest.version);
  execFileSync('node', [installer, '--claude', '--config-dir', configDir, '--uninstall'], { stdio: 'pipe' });
  check('packed uninstall removes gdd-core', !fs.existsSync(path.join(configDir, 'gdd-core')));
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

process.stdout.write(failures === 0 ? 'pack smoke: PASS\n' : `pack smoke: ${failures} FAILURE(S)\n`);
process.exit(failures === 0 ? 0 : 1);

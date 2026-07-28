#!/usr/bin/env node
// Smoke test against the PACKED npm artifact, not the repo tree — catches the
// "works-from-repo, broken-from-npm" class (files whitelist, chmod, path
// assumptions). Packs the tarball, extracts it, audits the ship surface, then
// runs the packed bin/install.js end to end (install → verify → uninstall).
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
  execFileSync('npm', ['pack', '--pack-destination', tmp], {
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

  // Ship-surface hygiene: private-only tooling and strategy must never reach npm.
  check('tarball excludes bin/sync-public.sh', !files.includes(path.join('bin', 'sync-public.sh')));
  check('tarball excludes the private plan dir', !files.some((f) => f.startsWith(path.join('docs', 'plan') + path.sep)));
  check('tarball excludes examples/', !files.some((f) => f.startsWith('examples' + path.sep)));
  check('tarball ships bin/install.js', files.includes(path.join('bin', 'install.js')));
  check(`sane file count (${files.length})`, files.length > 40 && files.length < 120);

  // The packed installer must resolve its payload from the packed tree, not the
  // repo copy — this is the assertion the repo-relative smoke tests can't make.
  const installer = path.join(pkg, 'bin', 'install.js');
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
  execFileSync('node', [installer, '--claude', '--config-dir', configDir, '--uninstall'], { stdio: 'pipe' });
  check('packed uninstall removes gdd-core', !fs.existsSync(path.join(configDir, 'gdd-core')));
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

process.stdout.write(failures === 0 ? 'pack smoke: PASS\n' : `pack smoke: ${failures} FAILURE(S)\n`);
process.exit(failures === 0 ? 0 : 1);

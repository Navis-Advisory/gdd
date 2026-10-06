#!/usr/bin/env node
// CLI-behavior tests for the installer: version flag, uninstall containment,
// manifest robustness. Complements the per-runtime surface smoke tests.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const installer = path.join(repoRoot, 'scripts', 'install.js');
const VERSION = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8')).version;

let failures = 0;
function check(label, ok) {
  process.stdout.write(`${ok ? 'ok' : 'FAIL'} - ${label}\n`);
  if (!ok) failures += 1;
}

// Run the installer, capturing stdout/stderr and exit code without throwing.
function run(args) {
  const r = spawnSync('node', [installer, ...args], { encoding: 'utf8' });
  return { code: r.status ?? 1, stdout: r.stdout || '', stderr: r.stderr || '' };
}

// --- A3: --version / -v prints VERSION and exits 0 ---
for (const flag of ['--version', '-v']) {
  const r = run([flag]);
  check(`${flag} exits 0`, r.code === 0);
  check(`${flag} prints the version`, r.stdout.trim() === VERSION);
}

// --- A4/P1-10: uninstall must not delete files outside configDir ---
// A tampered manifest with a traversal entry must be contained: the outside
// sentinel survives, and the installer warns rather than deleting it.
{
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gdd-trav-'));
  try {
    const configDir = path.join(tmp, '.claude');
    run(['--claude', '--config-dir', configDir]);
    const sentinel = path.join(tmp, 'DO-NOT-DELETE.txt');
    fs.writeFileSync(sentinel, 'precious');
    const manifestPath = path.join(configDir, 'gdd-core', 'gdd-file-manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    manifest.files.push('../DO-NOT-DELETE.txt'); // escapes configDir
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    const r = run(['--claude', '--config-dir', configDir, '--uninstall']);
    check('traversal target survives uninstall', fs.existsSync(sentinel));
    check('uninstall warns on out-of-tree target', /outside|skip|refus/i.test(r.stdout + r.stderr));
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

// --- P2: corrupt manifest -> clean error on uninstall, not a raw stack trace ---
{
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gdd-corrupt-'));
  try {
    const configDir = path.join(tmp, '.claude');
    run(['--claude', '--config-dir', configDir]);
    fs.writeFileSync(path.join(configDir, 'gdd-core', 'gdd-file-manifest.json'), '{not json');
    const r = run(['--claude', '--config-dir', configDir, '--uninstall']);
    check('corrupt-manifest uninstall exits 1', r.code === 1);
    check('corrupt-manifest error is clean (no stack trace)', /corrupt/i.test(r.stderr) && !/\bat \w+.*:\d+:\d+/.test(r.stderr));
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

// --- P2: dry-run file count matches a real install (VERSION + manifest) ---
{
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gdd-count-'));
  try {
    const configDir = path.join(tmp, '.claude');
    const dry = run(['--claude', '--config-dir', configDir, '--dry-run']);
    const real = run(['--claude', '--config-dir', configDir]);
    const num = (s) => Number((s.match(/: (\d+) files\./) || [])[1]);
    check('dry-run count equals real install count', num(dry.stdout) === num(real.stdout) && num(real.stdout) > 0);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

// --- A9: manifest records the install invocation (provenance for /gdd:update) ---
{
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gdd-prov-'));
  try {
    const configDir = path.join(tmp, '.claude');
    run(['--claude', '--config-dir', configDir]);
    const manifest = JSON.parse(fs.readFileSync(path.join(configDir, 'gdd-core', 'gdd-file-manifest.json'), 'utf8'));
    check('manifest records install.runtime_flag', manifest.install?.runtime_flag === '--claude');
    check('manifest records install.scope', typeof manifest.install?.scope === 'string');
    check('manifest records config_dir_override', 'config_dir_override' in (manifest.install || {}));
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

// --- P2: first-install collision over a pre-existing file warns ---
{
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gdd-collide-'));
  try {
    const configDir = path.join(tmp, '.claude');
    const collide = path.join(configDir, 'commands', 'gdd', 'help.md');
    fs.mkdirSync(path.dirname(collide), { recursive: true });
    fs.writeFileSync(collide, 'pre-existing content that differs\n');
    const r = run(['--claude', '--config-dir', configDir]);
    check('first-install collision warns', /overwrite pre-existing/i.test(r.stdout));
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

// Retired runtime flags must fail without changing an existing installation.
for (const flag of ['--antigravity', '--antigravity-cli']) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gdd-retired-'));
  try {
    const configDir = path.join(tmp, '.agents');
    fs.mkdirSync(configDir);
    const sentinel = path.join(configDir, 'USER-CONTENT.txt');
    fs.writeFileSync(sentinel, 'existing installation');
    const before = fs.readdirSync(configDir);
    const r = run([flag, '--config-dir', configDir]);
    check(flag + ' exits 1 with retirement explanation', r.code === 1 && /discontinued/.test(r.stderr));
    check(flag + ' preserves the existing directory', JSON.stringify(fs.readdirSync(configDir)) === JSON.stringify(before) && fs.readFileSync(sentinel, 'utf8') === 'existing installation');
  } finally {
    fs.rmSync(tmp, {recursive: true, force: true});
  }
}

// --- E2: --update backs up a locally modified file before overwriting ---
{
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gdd-update-'));
  try {
    const configDir = path.join(tmp, '.claude');
    run(['--claude', '--config-dir', configDir]);
    const help = path.join(configDir, 'commands', 'gdd', 'help.md');
    fs.appendFileSync(help, '\nLOCAL EDIT\n');
    const r = run(['--claude', '--config-dir', configDir, '--update']);
    const backup = path.join(configDir, 'gdd-patches', 'commands', 'gdd', 'help.md');
    check('--update backs up the modified file', fs.existsSync(backup));
    check('backup preserves the local edit', fs.readFileSync(backup, 'utf8').includes('LOCAL EDIT'));
    check('--update overwrites the on-disk file (edit gone from live copy)', !fs.readFileSync(help, 'utf8').includes('LOCAL EDIT'));
    check('--update reports the backup', /backed up/i.test(r.stdout));
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

// --- E3: reinstall prunes files the prior manifest listed but no longer ships ---
{
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gdd-prune-'));
  try {
    const configDir = path.join(tmp, '.claude');
    run(['--claude', '--config-dir', configDir]);
    // Simulate a file that a prior version shipped but the current one doesn't:
    // drop a real file on disk and register it in the manifest.
    const stale = path.join(configDir, 'gdd-core', 'references', 'OLD-REMOVED.md');
    fs.writeFileSync(stale, 'from an older version\n');
    const manifestPath = path.join(configDir, 'gdd-core', 'gdd-file-manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    manifest.files.push('gdd-core/references/OLD-REMOVED.md');
    manifest.hashes['gdd-core/references/OLD-REMOVED.md'] = 'x';
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    const r = run(['--claude', '--config-dir', configDir]);
    check('stale file pruned on reinstall', !fs.existsSync(stale));
    check('reinstall reports the prune', /prune/i.test(r.stdout));
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

process.stdout.write(failures === 0 ? 'installer-behavior: PASS\n' : `installer-behavior: ${failures} FAILURE(S)\n`);
process.exit(failures === 0 ? 0 : 1);

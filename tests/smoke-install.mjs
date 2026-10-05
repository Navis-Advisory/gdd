#!/usr/bin/env node
// Smoke test: install → verify surface → fork cleanliness → uninstall.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const installer = path.join(repoRoot, 'bin', 'install.js');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gdd-smoke-'));
const configDir = path.join(tmp, '.claude');

let failures = 0;
function check(label, ok) {
  process.stdout.write(`${ok ? 'ok' : 'FAIL'} - ${label}\n`);
  if (!ok) failures += 1;
}

function listFiles(dir) {
  return fs.readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => path.join(e.parentPath ?? e.path, e.name));
}

try {
  execFileSync('node', [installer, '--claude', '--config-dir', configDir], { stdio: 'pipe' });

  // Surface completeness.
  const expect = [
    'commands/gdd/help.md',
    'commands/gdd/scope-deal.md',
    'commands/gdd/size-market.md',
    'commands/gdd/triangulate.md',
    'commands/gdd/storyline.md',
    'agents/gdd-scoper.md',
    'agents/gdd-verifier.md',
    'agents/gdd-sizer-topdown.md',
    'agents/gdd-sizer-bottomup.md',
    'gdd-core/workflows/size-market.md',
    'gdd-core/templates/taxonomy.md',
    'gdd-core/references/verification-checks.md',
    'gdd-core/VERSION',
    'gdd-core/gdd-file-manifest.json',
  ];
  for (const rel of expect) {
    check(`installed: ${rel}`, fs.existsSync(path.join(configDir, rel)));
  }

  const commandCount = fs.readdirSync(path.join(configDir, 'commands', 'gdd')).length;
  const agentCount = fs.readdirSync(path.join(configDir, 'agents')).length;
  check(`19 commands (found ${commandCount})`, commandCount === 19);
  check(`10 agents (found ${agentCount})`, agentCount === 10);

  // Token rewrite and fork cleanliness across every installed text file.
  // The neutral plugin variable must be rewritten to the absolute config dir
  // on install; nothing installed should still carry it (or the old token).
  const staleFragments = ['${CLAUDE_PLUGIN_ROOT}', 'gsd-tools', '.planning/', '/gsd:', 'gsd-core'];
  let rewriteOk = true;
  let cleanOk = true;
  let includeOk = false;
  for (const f of listFiles(configDir)) {
    if (!/\.(md|json)$/.test(f)) continue;
    const body = fs.readFileSync(f, 'utf8');
    if (body.includes('${CLAUDE_PLUGIN_ROOT}') || body.includes('{GDD_INSTALL_DIR}')) rewriteOk = false;
    for (const frag of staleFragments.slice(1, 4)) {
      if (body.includes(frag)) {
        process.stdout.write(`   stale fragment "${frag}" in ${f}\n`);
        cleanOk = false;
      }
    }
    if (body.replaceAll('\\', '/').includes(`@${path.join(configDir, 'gdd-core', 'workflows').replaceAll('\\', '/')}`)) includeOk = true;
  }
  check('install-dir token fully rewritten', rewriteOk);
  check('no stale GSD fragments in installed files', cleanOk);
  check('commands @-include workflows via absolute install path', includeOk);

  // Manifest sanity.
  const manifest = JSON.parse(
    fs.readFileSync(path.join(configDir, 'gdd-core', 'gdd-file-manifest.json'), 'utf8')
  );
  check('manifest lists all installed files', manifest.files.length >= expect.length);

  // Uninstall.
  execFileSync('node', [installer, '--claude', '--config-dir', configDir, '--uninstall'], {
    stdio: 'pipe',
  });
  check('uninstall removes gdd-core', !fs.existsSync(path.join(configDir, 'gdd-core')));
  check('uninstall removes commands/gdd', !fs.existsSync(path.join(configDir, 'commands', 'gdd')));
  check(
    'uninstall removes agents',
    !fs.existsSync(path.join(configDir, 'agents', 'gdd-scoper.md'))
  );
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

process.stdout.write(failures === 0 ? 'smoke test: PASS\n' : `smoke test: ${failures} FAILURE(S)\n`);
process.exit(failures === 0 ? 0 : 1);

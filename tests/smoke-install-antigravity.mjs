#!/usr/bin/env node
// Smoke test: Antigravity install → skill/agent conversion correctness → uninstall.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const installer = path.join(repoRoot, 'bin', 'install.js');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gdd-smoke-antigravity-'));
const configDir = path.join(tmp, '.agents');

let failures = 0;
function check(label, ok) {
  process.stdout.write(`${ok ? 'ok' : 'FAIL'} - ${label}\n`);
  if (!ok) failures += 1;
}

try {
  execFileSync('node', [installer, '--antigravity', '--config-dir', configDir], { stdio: 'pipe' });

  check('skill dir exists', fs.existsSync(path.join(configDir, 'skills', 'gdd-help', 'SKILL.md')));
  check('agent md exists', fs.existsSync(path.join(configDir, 'agents', 'gdd-planner.md')));
  check(
    '13 skills (found ' + fs.readdirSync(path.join(configDir, 'skills')).length + ')',
    fs.readdirSync(path.join(configDir, 'skills')).length === 13
  );
  check(
    '10 agents (found ' + fs.readdirSync(path.join(configDir, 'agents')).length + ')',
    fs.readdirSync(path.join(configDir, 'agents')).length === 10
  );

  const skillMd = fs.readFileSync(path.join(configDir, 'skills', 'gdd-help', 'SKILL.md'), 'utf8');
  check('skill frontmatter has name', /^name: gdd-help$/m.test(skillMd));
  check('skill body has no unresolved ${CLAUDE_PLUGIN_ROOT} include', !skillMd.includes('@${CLAUDE_PLUGIN_ROOT}'));
  check('skill body inlines the workflow content', skillMd.includes('Startup ladder: help'));
  check('no stale /gdd: prefix in skill body', !skillMd.includes('/gdd:'));
  check('rewritten to /gdd- prefix', skillMd.includes('/gdd-start'));

  // Agent: Claude tool names mapped to the Gemini/Antigravity vocabulary.
  const agentMd = fs.readFileSync(path.join(configDir, 'agents', 'gdd-planner.md'), 'utf8');
  check('agent frontmatter has name', /^name: gdd-planner$/m.test(agentMd));
  check('agent tools mapped (Read -> read_file)', /^tools: .*read_file/m.test(agentMd));
  check('agent tools have no raw Claude tool names', !/^tools:.*\bRead\b/m.test(agentMd));
  check('agent has no unresolved plugin-root token', !agentMd.includes('${CLAUDE_PLUGIN_ROOT}'));

  execFileSync('node', [installer, '--antigravity', '--config-dir', configDir, '--uninstall'], { stdio: 'pipe' });
  check('uninstall removes gdd-core', !fs.existsSync(path.join(configDir, 'gdd-core')));
  check('uninstall removes skill dirs', !fs.existsSync(path.join(configDir, 'skills', 'gdd-help')));
  check('uninstall removes agent md', !fs.existsSync(path.join(configDir, 'agents', 'gdd-planner.md')));
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

process.stdout.write(
  failures === 0 ? 'smoke test (antigravity): PASS\n' : `smoke test (antigravity): ${failures} FAILURE(S)\n`
);
process.exit(failures === 0 ? 0 : 1);

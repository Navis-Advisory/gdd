#!/usr/bin/env node
// Smoke test: Codex install → skill/TOML conversion correctness → uninstall.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const installer = path.join(repoRoot, 'bin', 'install.js');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gdd-smoke-codex-'));
const configDir = path.join(tmp, '.codex');

let failures = 0;
function check(label, ok) {
  process.stdout.write(`${ok ? 'ok' : 'FAIL'} - ${label}\n`);
  if (!ok) failures += 1;
}

try {
  execFileSync('node', [installer, '--codex', '--config-dir', configDir], { stdio: 'pipe' });

  // Surface completeness: skills are directories, agents are TOML.
  check('skill dir exists', fs.existsSync(path.join(configDir, 'skills', 'gdd-help', 'SKILL.md')));
  check('agent toml exists', fs.existsSync(path.join(configDir, 'agents', 'gdd-planner.toml')));
  check(
    '13 skills (found ' + fs.readdirSync(path.join(configDir, 'skills')).length + ')',
    fs.readdirSync(path.join(configDir, 'skills')).length === 13
  );
  check(
    '10 agent TOML files (found ' + fs.readdirSync(path.join(configDir, 'agents')).length + ')',
    fs.readdirSync(path.join(configDir, 'agents')).length === 10
  );

  // Skill frontmatter: name + description only (Codex skill spec).
  const skillMd = fs.readFileSync(path.join(configDir, 'skills', 'gdd-help', 'SKILL.md'), 'utf8');
  check('skill frontmatter has name', /^name: gdd-help$/m.test(skillMd));
  check('skill frontmatter has description', /^description: /m.test(skillMd));
  check('skill frontmatter has no allowed-tools (not part of Codex skill spec)', !/^allowed-tools:/m.test(skillMd));

  // @-include resolved to real content, not a dangling reference.
  check('skill body has no unresolved ${CLAUDE_PLUGIN_ROOT} include', !skillMd.includes('@${CLAUDE_PLUGIN_ROOT}'));
  check('skill body inlines the workflow content', skillMd.includes('Startup ladder: help'));

  // Command prefix rewritten from /gdd: to $gdd- throughout.
  check('no stale /gdd: prefix in skill body', !skillMd.includes('/gdd:'));
  check('rewritten to $gdd- prefix', skillMd.includes('$gdd-start'));

  // TOML agent: valid required fields, inline instructions, no external ref.
  const agentToml = fs.readFileSync(path.join(configDir, 'agents', 'gdd-planner.toml'), 'utf8');
  check('toml has name field', /^name = "gdd-planner"$/m.test(agentToml));
  check('toml has description field', /^description = /m.test(agentToml));
  check('toml has inline developer_instructions', /^developer_instructions = """$/m.test(agentToml));
  check('toml instructions body present', agentToml.includes('<role>'));
  check('toml has no unresolved plugin-root token', !agentToml.includes('${CLAUDE_PLUGIN_ROOT}'));

  // Uninstall.
  execFileSync('node', [installer, '--codex', '--config-dir', configDir, '--uninstall'], { stdio: 'pipe' });
  check('uninstall removes gdd-core', !fs.existsSync(path.join(configDir, 'gdd-core')));
  check('uninstall removes skill dirs', !fs.existsSync(path.join(configDir, 'skills', 'gdd-help')));
  check('uninstall removes agent toml', !fs.existsSync(path.join(configDir, 'agents', 'gdd-planner.toml')));
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

process.stdout.write(failures === 0 ? 'smoke test (codex): PASS\n' : `smoke test (codex): ${failures} FAILURE(S)\n`);
process.exit(failures === 0 ? 0 : 1);

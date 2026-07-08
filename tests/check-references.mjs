#!/usr/bin/env node
// Reference integrity: every ${CLAUDE_PLUGIN_ROOT}/gdd-core include, spawned
// agent, and /gdd:command mentioned anywhere in the content tree must exist —
// plus the plugin manifest and its flat command layout must be well formed.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const trees = ['commands', 'agents', 'gdd-core'];

let failures = 0;
function report(file, msg) {
  process.stdout.write(`FAIL - ${path.relative(repoRoot, file)}: ${msg}\n`);
  failures += 1;
}

const files = trees.flatMap((t) =>
  fs
    .readdirSync(path.join(repoRoot, t), { recursive: true, withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.md'))
    .map((e) => path.join(e.parentPath ?? e.path, e.name))
);

for (const f of files) {
  const body = fs.readFileSync(f, 'utf8');

  // Payload includes: ${CLAUDE_PLUGIN_ROOT}/gdd-core/x/y.md must exist under
  // gdd-core/ (the plugin variable resolves to the plugin root; gdd-core is
  // bundled there).
  for (const m of body.matchAll(/\$\{CLAUDE_PLUGIN_ROOT\}\/gdd-core\/([A-Za-z0-9/_.-]+)/g)) {
    if (!fs.existsSync(path.join(repoRoot, 'gdd-core', m[1]))) {
      report(f, `include points at missing gdd-core/${m[1]}`);
    }
  }

  // No stale install-token should survive the plugin migration.
  if (body.includes('{GDD_INSTALL_DIR}')) {
    report(f, 'contains stale {GDD_INSTALL_DIR} token — use ${CLAUDE_PLUGIN_ROOT}/gdd-core');
  }

  // Spawned agents: "spawn `gdd-x`" (any inflection) must have agents/gdd-x.md.
  for (const m of body.matchAll(/[Ss]pawn(?:s|ed|ing)?[^`\n]*`(gdd-[a-z-]+)`/g)) {
    if (!fs.existsSync(path.join(repoRoot, 'agents', `${m[1]}.md`))) {
      report(f, `spawns unknown agent ${m[1]}`);
    }
  }

  // Command mentions: /gdd:x must have commands/x.md.
  for (const m of body.matchAll(/\/gdd:([a-z-]+)/g)) {
    if (!fs.existsSync(path.join(repoRoot, 'commands', `${m[1]}.md`))) {
      report(f, `mentions unknown command /gdd:${m[1]}`);
    }
  }
}

// Inverse: every agent and template is referenced by something.
const contentBlob = files.map((f) => fs.readFileSync(f, 'utf8')).join('\n');
for (const agent of fs.readdirSync(path.join(repoRoot, 'agents'))) {
  const name = agent.replace(/\.md$/, '');
  const referencedElsewhere = files.some(
    (f) => !f.endsWith(agent) && fs.readFileSync(f, 'utf8').includes(name)
  );
  if (!referencedElsewhere) report(path.join(repoRoot, 'agents', agent), 'agent never referenced');
}
for (const tpl of fs.readdirSync(path.join(repoRoot, 'gdd-core', 'templates'))) {
  if (!contentBlob.includes(`templates/${tpl}`) && !contentBlob.includes(tpl)) {
    report(path.join(repoRoot, 'gdd-core', 'templates', tpl), 'template never referenced');
  }
}

// Plugin layout: the manifest must be well formed, its declared commands must
// resolve as flat markdown, and no command may carry a `gdd:` frontmatter
// prefix (the plugin name already supplies the /gdd: namespace — a prefixed
// name would double it to /gdd:gdd:x).
const pluginManifestPath = path.join(repoRoot, '.claude-plugin', 'plugin.json');
const marketplacePath = path.join(repoRoot, '.claude-plugin', 'marketplace.json');
function reportPath(p, msg) {
  process.stdout.write(`FAIL - ${path.relative(repoRoot, p)}: ${msg}\n`);
  failures += 1;
}

if (!fs.existsSync(pluginManifestPath)) {
  reportPath(pluginManifestPath, 'missing plugin manifest');
} else {
  const manifest = JSON.parse(fs.readFileSync(pluginManifestPath, 'utf8'));
  if (manifest.name !== 'gdd') {
    reportPath(pluginManifestPath, `plugin name must be "gdd" to yield /gdd: commands (got "${manifest.name}")`);
  }
  const commandFiles = fs
    .readdirSync(path.join(repoRoot, 'commands'), { withFileTypes: true })
    .filter((e) => e.name.endsWith('.md'));
  if (commandFiles.some((e) => e.isDirectory())) {
    reportPath(pluginManifestPath, 'commands/ must be flat .md files — nested dirs are not discovered as plugin skills');
  }
  for (const e of commandFiles) {
    const fm = fs.readFileSync(path.join(repoRoot, 'commands', e.name), 'utf8').match(/^name:\s*(.+)$/m);
    if (fm && fm[1].trim().includes(':')) {
      reportPath(path.join(repoRoot, 'commands', e.name), `command name "${fm[1].trim()}" must not carry a namespace prefix`);
    }
  }
}

if (!fs.existsSync(marketplacePath)) {
  reportPath(marketplacePath, 'missing marketplace manifest');
} else {
  const market = JSON.parse(fs.readFileSync(marketplacePath, 'utf8'));
  const entry = (market.plugins || []).find((p) => p.name === 'gdd');
  if (!entry) reportPath(marketplacePath, 'marketplace does not list the gdd plugin');
  else if (entry.source !== '.') reportPath(marketplacePath, `gdd plugin source should be "." (got ${JSON.stringify(entry.source)})`);
}

process.stdout.write(
  failures === 0 ? `reference check: PASS (${files.length} files scanned)\n` : `reference check: ${failures} FAILURE(S)\n`
);
process.exit(failures === 0 ? 0 : 1);

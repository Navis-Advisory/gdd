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
// resolve as flat markdown, and no command may carry a `name:` frontmatter key
// at all. The plugin name supplies the /gdd: namespace and the skills-layout
// installer synthesizes its own `gdd-<rel>` name, so a source `name:` is dead
// weight that only lands verbatim in the Claude Code copy — where it has
// tripped autocomplete. Keep it out (see docs/install.md).
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
    const content = fs.readFileSync(path.join(repoRoot, 'commands', e.name), 'utf8');
    const fmEnd = content.startsWith('---') ? content.indexOf('---', 3) : -1;
    const frontmatter = fmEnd === -1 ? '' : content.slice(3, fmEnd);
    if (/^name:/m.test(frontmatter)) {
      reportPath(
        path.join(repoRoot, 'commands', e.name),
        'command carries a `name:` frontmatter key — remove it (vestigial; the plugin/skill name is derived, not read from source)'
      );
    }
  }
}

if (!fs.existsSync(marketplacePath)) {
  reportPath(marketplacePath, 'missing marketplace manifest');
} else {
  const market = JSON.parse(fs.readFileSync(marketplacePath, 'utf8'));
  const entry = (market.plugins || []).find((p) => p.name === 'gdd');
  if (!entry) reportPath(marketplacePath, 'marketplace does not list the gdd plugin');
  else if (!['.', './'].includes(entry.source)) reportPath(marketplacePath, `gdd plugin source should be "." (got ${JSON.stringify(entry.source)})`);
}

// Version parity: package.json, .claude-plugin/plugin.json, and the first
// versioned CHANGELOG heading must agree, so a published npm version can never
// diverge from the plugin manifest or the changelog it points readers at.
{
  const pkgVersion = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8')).version;
  const pluginVersion = JSON.parse(fs.readFileSync(pluginManifestPath, 'utf8')).version;
  if (pkgVersion !== pluginVersion) {
    reportPath(pluginManifestPath, `plugin.json version ${pluginVersion} != package.json version ${pkgVersion}`);
  }
  const changelogPath = path.join(repoRoot, 'CHANGELOG.md');
  const changelog = fs.readFileSync(changelogPath, 'utf8');
  // First heading of the form `## [X.Y.Z]` — skips `## [Unreleased]`/vNEXT.
  const m = changelog.match(/^##\s*\[(\d+\.\d+\.\d+)\]/m);
  if (!m) {
    reportPath(changelogPath, 'no versioned "## [X.Y.Z]" heading found');
  } else if (m[1] !== pkgVersion) {
    reportPath(changelogPath, `top CHANGELOG version ${m[1]} != package.json version ${pkgVersion}`);
  }
}

process.stdout.write(
  failures === 0 ? `reference check: PASS (${files.length} files scanned)\n` : `reference check: ${failures} FAILURE(S)\n`
);
process.exit(failures === 0 ? 0 : 1);

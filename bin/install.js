#!/usr/bin/env node
'use strict';

/*
 * GDD bootstrap installer — installs or uninstalls Get Diligence Done.
 *
 * Projects the GDD command/agent surface plus the gdd-core payload
 * (workflows, templates, references) into an AI-agent runtime's config
 * directory. Runtimes are data-defined in runtime-catalog.json. Claude
 * Code, Codex, and Antigravity CLI are supported; OpenCode and Copilot
 * CLI are catalogued but gated until their converters exist.
 *
 * Pattern follows the GSD installer (single self-contained Node
 * script, no dependencies, JSON runtime catalog).
 */

const fs = require('fs');
const os = require('os');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const PKG = readJson(path.join(REPO_ROOT, 'package.json'));
const CATALOG = readJson(path.join(REPO_ROOT, 'runtime-catalog.json'));
const VERSION = PKG.version;
const MANIFEST_NAME = 'gdd-file-manifest.json';
// Content is authored to the neutral plugin variable so the repo loads as a
// Claude/Cowork plugin with no build step (${CLAUDE_PLUGIN_ROOT} resolves to
// the plugin root, and gdd-core lives there). For a CLI install we are the
// converter: rewrite the variable to the absolute config dir we copy into.
const PLUGIN_ROOT_TOKEN = '${CLAUDE_PLUGIN_ROOT}';

// Commands are authored once against Claude Code's own conventions: an
// `<execution_context>@${CLAUDE_PLUGIN_ROOT}/gdd-core/workflows/x.md</execution_context>`
// block that Claude Code auto-inlines, and `/gdd:x` literals in prose. Runtimes
// without native @-include support (codex, antigravity) need that block
// resolved to real content at install time, or the installed skill is a
// dangling reference to nothing.
const INCLUDE_RE = /<execution_context>\s*@\$\{CLAUDE_PLUGIN_ROOT\}\/gdd-core\/([^\s<]+)\s*<\/execution_context>/;

// Claude → Gemini-family tool name mapping, reused by Antigravity (shares
// Gemini CLI's tool vocabulary). Source: GSD's claudeToGeminiTools table.
const CLAUDE_TO_GEMINI_TOOLS = {
  Read: 'read_file',
  Write: 'write_file',
  Edit: 'replace',
  Bash: 'run_shell_command',
  Glob: 'glob',
  Grep: 'search_file_content',
  WebSearch: 'google_web_search',
  WebFetch: 'web_fetch',
  TodoWrite: 'write_todos',
};

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function extractFrontmatterAndBody(content) {
  if (!content.startsWith('---')) return { frontmatter: null, body: content };
  const end = content.indexOf('---', 3);
  if (end === -1) return { frontmatter: null, body: content };
  return { frontmatter: content.slice(3, end).trim(), body: content.slice(end + 3) };
}

function extractFrontmatterField(frontmatter, field) {
  const m = frontmatter.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'));
  if (!m) return null;
  return m[1].trim().replace(/^['"]|['"]$/g, '');
}

function resolveIncludes(content, srcCore) {
  return content.replace(INCLUDE_RE, (_, relPath) => {
    const includeContent = fs.readFileSync(path.join(srcCore, relPath), 'utf8');
    return `<execution_context>\n${includeContent.trim()}\n</execution_context>`;
  });
}

function rewriteCommandPrefix(content, runtime) {
  return runtime.command_prefix === '/gdd:' ? content : content.split('/gdd:').join(runtime.command_prefix);
}

function mapGeminiToolName(tool) {
  if (tool.startsWith('mcp__') || tool === 'Task' || tool === 'Agent' || tool === 'AskUserQuestion') return null;
  return CLAUDE_TO_GEMINI_TOOLS[tool] || tool.toLowerCase();
}

// Codex skill: ~/.codex/skills/<name>/SKILL.md, frontmatter trimmed to the
// two fields Codex's skill spec recognizes (name, description).
// Antigravity skill: same shape (confirmed against GSD's shipped
// convertClaudeCommandToAntigravitySkill converter).
function convertCommandToSkill(resolvedContent, skillName) {
  const { frontmatter, body } = extractFrontmatterAndBody(resolvedContent);
  const description = frontmatter ? extractFrontmatterField(frontmatter, 'description') || '' : '';
  const fm = `---\nname: ${skillName}\ndescription: ${JSON.stringify(description)}\n---`;
  return `${fm}\n${body}`;
}

// Antigravity custom agent: flat markdown, name/description/tools(mapped)/
// color frontmatter, body passthrough. Confirmed against GSD's shipped
// convertClaudeAgentToAntigravityAgent converter — Antigravity does read
// static agent files (unlike some blog claims of a dynamic-only model).
function convertAgentToAntigravity(content) {
  const { frontmatter, body } = extractFrontmatterAndBody(content);
  if (!frontmatter) return content;
  const name = extractFrontmatterField(frontmatter, 'name') || 'unknown';
  const description = extractFrontmatterField(frontmatter, 'description') || '';
  const color = extractFrontmatterField(frontmatter, 'color');
  const toolsRaw = extractFrontmatterField(frontmatter, 'tools') || '';
  const tools = toolsRaw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
    .map(mapGeminiToolName)
    .filter(Boolean);
  let fm = `---\nname: ${name}\ndescription: ${JSON.stringify(description)}\ntools: ${tools.join(', ')}\n`;
  if (color) fm += `color: ${color}\n`;
  fm += '---';
  return `${fm}\n${body}`;
}

// Codex custom agent: standalone TOML under ~/.codex/agents/<name>.toml.
// Per developers.openai.com/codex/subagents, `developer_instructions` is an
// inline TOML multi-line string — no external file reference is supported,
// so the agent's full body is embedded directly.
function convertAgentToCodexToml(content) {
  const { frontmatter, body } = extractFrontmatterAndBody(content);
  const name = frontmatter ? extractFrontmatterField(frontmatter, 'name') || 'unknown' : 'unknown';
  const description = frontmatter ? extractFrontmatterField(frontmatter, 'description') || '' : '';
  const instructions = body.trim();
  if (instructions.includes('"""')) {
    fail(
      `Codex TOML conversion: agent "${name}" body contains a literal """ sequence, ` +
        'which would break the TOML multi-line string. Rewrite the agent content to avoid it.'
    );
  }
  return (
    `name = ${JSON.stringify(name)}\n` +
    `description = ${JSON.stringify(description)}\n` +
    `developer_instructions = """\n${instructions}\n"""\n`
  );
}

function writeContent(content, destPath, dryRun, written) {
  if (dryRun) {
    process.stdout.write(`  would write ${destPath}\n`);
  } else {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, content);
  }
  written.push(destPath);
}

function usage() {
  const flags = CATALOG.runtimes
    .map((r) => `  ${r.install_flags[0].padEnd(12)} target ${r.display_name}${r.enabled ? '' : ' (planned, not yet supported)'}`)
    .join('\n');
  return `GDD ${VERSION} — Get Diligence Done installer

Usage: node bin/install.js [runtime] [scope] [options]

Runtimes:
${flags}

Scope:
  -g, --global     install into the runtime's user-level config dir
  -l, --local      install into ./<config-dir> of the current project (default)

Options:
  -c, --config-dir <path>  override the destination config dir entirely
  -u, --uninstall          remove a previous install (reads the manifest)
  -n, --dry-run            print what would happen without writing
  -h, --help               show this help
`;
}

function parseArgs(argv) {
  const opts = {
    runtime: null,
    scope: 'local',
    configDir: null,
    uninstall: false,
    dryRun: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    const rt = CATALOG.runtimes.find((r) => r.install_flags.includes(a));
    if (rt) {
      if (opts.runtime && opts.runtime !== rt) fail('Pick a single runtime per invocation.');
      opts.runtime = rt;
    } else if (a === '-g' || a === '--global') {
      opts.scope = 'global';
    } else if (a === '-l' || a === '--local') {
      opts.scope = 'local';
    } else if (a === '-c' || a === '--config-dir') {
      i += 1;
      if (!argv[i]) fail(`${a} requires a path argument.`);
      opts.configDir = path.resolve(argv[i]);
    } else if (a === '-u' || a === '--uninstall') {
      opts.uninstall = true;
    } else if (a === '-n' || a === '--dry-run') {
      opts.dryRun = true;
    } else if (a === '-h' || a === '--help') {
      opts.help = true;
    } else {
      fail(`Unknown argument: ${a}\n\n${usage()}`);
    }
  }
  return opts;
}

function fail(msg) {
  process.stderr.write(`gdd: ${msg}\n`);
  process.exit(1);
}

function resolveConfigDir(runtime, scope, override) {
  if (override) return override;
  if (scope === 'local') return path.join(process.cwd(), runtime.config_dir_name);
  const gc = runtime.global_config || {};
  if (gc.env_var && process.env[gc.env_var]) return path.resolve(process.env[gc.env_var]);
  return path.join(os.homedir(), gc.home_subpath || runtime.config_dir_name);
}

function listFilesRecursive(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFilesRecursive(p));
    else out.push(p);
  }
  return out;
}

function projectFile(srcPath, destPath, configDir, dryRun, written, runtime) {
  // The plugin variable is `${CLAUDE_PLUGIN_ROOT}` and content references
  // `${CLAUDE_PLUGIN_ROOT}/gdd-core/...`; installing copies gdd-core under
  // configDir, so rewriting the variable to configDir resolves the includes.
  const isText = /\.(md|json)$/.test(srcPath);
  if (!isText) {
    writeContent(fs.readFileSync(srcPath), destPath, dryRun, written);
    return;
  }
  let content = fs.readFileSync(srcPath, 'utf8').split(PLUGIN_ROOT_TOKEN).join(configDir);
  if (runtime && /\.md$/.test(srcPath)) content = rewriteCommandPrefix(content, runtime);
  writeContent(content, destPath, dryRun, written);
}

function install(runtime, configDir, dryRun) {
  // Commands are authored flat (plugin layout); the CLI install nests them
  // under commands/gdd/ so a standalone runtime derives the /gdd: namespace
  // from the subdirectory.
  const srcCommands = path.join(REPO_ROOT, 'commands');
  const srcAgents = path.join(REPO_ROOT, 'agents');
  const srcCore = path.join(REPO_ROOT, 'gdd-core');
  const installDir = path.join(configDir, 'gdd-core');
  const written = [];

  // Command surface. Nested layout gives /gdd:<name> on Claude Code; "skills"
  // (codex, antigravity) converts each command into a SKILL.md directory with
  // its @-include resolved to real content, since neither runtime auto-inlines
  // ${CLAUDE_PLUGIN_ROOT} references the way Claude Code does.
  for (const f of listFilesRecursive(srcCommands)) {
    const rel = path.relative(srcCommands, f);
    if (runtime.command_layout === 'skills') {
      const skillName = `gdd-${rel.replace(/\.md$/, '')}`;
      const raw = fs.readFileSync(f, 'utf8');
      const resolved = runtime.native_include_support === false ? resolveIncludes(raw, srcCore) : raw;
      // Rewrite ${CLAUDE_PLUGIN_ROOT} to the install dir like projectFile and the
      // agent converter do. Skills-layout runtimes don't expand the variable, so
      // bare references in the command body or its inlined workflow (e.g. to
      // gdd-core/templates/*) would otherwise point at an undefined path.
      const rooted = resolved.split(PLUGIN_ROOT_TOKEN).join(configDir);
      const prefixed = rewriteCommandPrefix(rooted, runtime);
      const skillContent = convertCommandToSkill(prefixed, skillName);
      writeContent(skillContent, path.join(configDir, 'skills', skillName, 'SKILL.md'), dryRun, written);
      continue;
    }
    const dest =
      runtime.command_layout === 'nested'
        ? path.join(configDir, 'commands', 'gdd', rel)
        : path.join(configDir, 'commands', `gdd-${rel}`);
    projectFile(f, dest, configDir, dryRun, written, runtime);
  }

  // Agents. codex-toml and antigravity-markdown convert to each runtime's
  // native custom-agent format; anything else is a passthrough copy.
  for (const f of listFilesRecursive(srcAgents)) {
    const rel = path.relative(srcAgents, f);
    if (runtime.agent_layout === 'codex-toml' || runtime.agent_layout === 'antigravity-markdown') {
      const raw = fs.readFileSync(f, 'utf8');
      const rewritten = rewriteCommandPrefix(raw.split(PLUGIN_ROOT_TOKEN).join(configDir), runtime);
      if (runtime.agent_layout === 'codex-toml') {
        const base = path.basename(rel, '.md');
        writeContent(convertAgentToCodexToml(rewritten), path.join(configDir, 'agents', `${base}.toml`), dryRun, written);
      } else {
        writeContent(convertAgentToAntigravity(rewritten), path.join(configDir, 'agents', rel), dryRun, written);
      }
      continue;
    }
    projectFile(f, path.join(configDir, 'agents', rel), configDir, dryRun, written, runtime);
  }

  // Payload: workflows, templates, references. Still installed for every
  // runtime (agents Read these directly at runtime) even though skills-layout
  // runtimes also get the workflow content inlined into each SKILL.md.
  for (const f of listFilesRecursive(srcCore)) {
    const rel = path.relative(srcCore, f);
    projectFile(f, path.join(installDir, rel), configDir, dryRun, written, runtime);
  }

  if (!dryRun) {
    fs.writeFileSync(path.join(installDir, 'VERSION'), `${VERSION}\n`);
    written.push(path.join(installDir, 'VERSION'));
    const manifest = {
      name: PKG.name,
      version: VERSION,
      runtime: runtime.runtime_name,
      installed_at: new Date().toISOString(),
      config_dir: configDir,
      files: written.map((p) => path.relative(configDir, p)),
    };
    fs.writeFileSync(path.join(installDir, MANIFEST_NAME), `${JSON.stringify(manifest, null, 2)}\n`);
  }

  const count = written.length + (dryRun ? 0 : 1);
  process.stdout.write(
    `${dryRun ? '[dry-run] ' : ''}GDD ${VERSION} → ${runtime.display_name} (${configDir}): ${count} files.\n` +
      `Launch \`${runtime.launch_command}\` and run ${runtime.command_prefix}help to begin.\n`
  );
}

function uninstall(runtime, configDir, dryRun) {
  const manifestPath = path.join(configDir, 'gdd-core', MANIFEST_NAME);
  if (!fs.existsSync(manifestPath)) {
    fail(`no ${MANIFEST_NAME} found under ${configDir} — nothing to uninstall.`);
  }
  const manifest = readJson(manifestPath);
  const targets = manifest.files.map((rel) => path.join(configDir, rel)).concat([manifestPath]);
  for (const p of targets) {
    if (!fs.existsSync(p)) continue;
    if (dryRun) process.stdout.write(`  would remove ${p}\n`);
    else fs.rmSync(p);
  }
  if (!dryRun) {
    // Prune now-empty directories we own outright.
    for (const dir of [
      path.join(configDir, 'gdd-core'),
      path.join(configDir, 'commands', 'gdd'),
    ]) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
    // Prune per-skill directories (skills/gdd-<name>/) left empty after
    // their SKILL.md was removed. Never touch skills/ itself — it may hold
    // skills installed by something other than GDD.
    const skillsDir = path.join(configDir, 'skills');
    if (fs.existsSync(skillsDir)) {
      for (const entry of fs.readdirSync(skillsDir, { withFileTypes: true })) {
        if (!entry.isDirectory() || !entry.name.startsWith('gdd-')) continue;
        const dir = path.join(skillsDir, entry.name);
        if (fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
      }
    }
  }
  process.stdout.write(`${dryRun ? '[dry-run] ' : ''}GDD removed from ${configDir}.\n`);
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    process.stdout.write(usage());
    return;
  }
  const runtime = opts.runtime || CATALOG.runtimes.find((r) => r.runtime_name === 'claude-code');
  if (!runtime.enabled) {
    const supported = CATALOG.runtimes.filter((r) => r.enabled).map((r) => r.install_flags[0]);
    fail(
      `${runtime.display_name} support is catalogued but not yet implemented. ` +
        `Supported runtimes: ${supported.join(', ')}.`
    );
  }
  const configDir = resolveConfigDir(runtime, opts.scope, opts.configDir);
  if (opts.uninstall) uninstall(runtime, configDir, opts.dryRun);
  else install(runtime, configDir, opts.dryRun);
}

main();

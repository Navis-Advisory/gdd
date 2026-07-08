#!/usr/bin/env node
'use strict';

/*
 * GDD bootstrap installer — installs or uninstalls Get Diligence Done.
 *
 * Projects the GDD command/agent surface plus the gdd-core payload
 * (workflows, templates, references) into an AI-agent runtime's config
 * directory. Runtimes are data-defined in runtime-catalog.json; Claude
 * Code is the supported runtime for the MVP, the rest are catalogued but
 * gated until their converters exist.
 *
 * Pattern follows the GSD / GPD installers (single self-contained Node
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

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
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

function projectFile(srcPath, destPath, configDir, dryRun, written) {
  // The plugin variable is `${CLAUDE_PLUGIN_ROOT}` and content references
  // `${CLAUDE_PLUGIN_ROOT}/gdd-core/...`; installing copies gdd-core under
  // configDir, so rewriting the variable to configDir resolves the includes.
  const rewritten = /\.(md|json)$/.test(srcPath)
    ? fs.readFileSync(srcPath, 'utf8').split(PLUGIN_ROOT_TOKEN).join(configDir)
    : fs.readFileSync(srcPath);
  if (dryRun) {
    process.stdout.write(`  would write ${destPath}\n`);
  } else {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, rewritten);
  }
  written.push(destPath);
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

  // Command surface. Nested layout gives /gdd:<name> on Claude Code.
  for (const f of listFilesRecursive(srcCommands)) {
    const rel = path.relative(srcCommands, f);
    const dest =
      runtime.command_layout === 'nested'
        ? path.join(configDir, 'commands', 'gdd', rel)
        : path.join(configDir, 'commands', `gdd-${rel}`);
    projectFile(f, dest, configDir, dryRun, written);
  }

  // Agents.
  for (const f of listFilesRecursive(srcAgents)) {
    const rel = path.relative(srcAgents, f);
    projectFile(f, path.join(configDir, 'agents', rel), configDir, dryRun, written);
  }

  // Payload: workflows, templates, references.
  for (const f of listFilesRecursive(srcCore)) {
    const rel = path.relative(srcCore, f);
    projectFile(f, path.join(installDir, rel), configDir, dryRun, written);
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
    // Prune now-empty directories we own.
    for (const dir of [
      path.join(configDir, 'gdd-core'),
      path.join(configDir, 'commands', 'gdd'),
    ]) {
      fs.rmSync(dir, { recursive: true, force: true });
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
    fail(
      `${runtime.display_name} support is catalogued but not yet implemented. ` +
        'Claude Code (--claude) is the supported runtime for the MVP.'
    );
  }
  const configDir = resolveConfigDir(runtime, opts.scope, opts.configDir);
  if (opts.uninstall) uninstall(runtime, configDir, opts.dryRun);
  else install(runtime, configDir, opts.dryRun);
}

main();

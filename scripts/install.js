#!/usr/bin/env node
'use strict';

/*
 * GDD bootstrap installer — installs or uninstalls Get Diligence Done.
 *
 * Projects the GDD command/agent surface plus the gdd-core payload
 * (workflows, templates, references) into an AI-agent runtime's config
 * directory. Runtimes are data-defined in runtime-catalog.json: Claude
 * Code and Codex. Other runtimes are community ports on
 * demand.
 *
 * Pattern follows the GSD installer (single self-contained Node
 * script, no dependencies, JSON runtime catalog).
 */

const crypto = require('crypto');
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
// without native @-include support (Codex) need that block
// resolved to real content at install time, or the installed skill is a
// dangling reference to nothing.
// Global: a command may carry more than one <execution_context> include, and
// every one must resolve. Without /g, replace() would rewrite only the first
// and silently drop the rest for skills-layout runtimes.
const INCLUDE_RE = /<execution_context>\s*@\$\{CLAUDE_PLUGIN_ROOT\}\/gdd-core\/([^\s<]+)\s*<\/execution_context>/g;

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function sha256(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
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

// Codex skill: ~/.codex/skills/<name>/SKILL.md, frontmatter trimmed to the
// two fields Codex's skill spec recognizes (name, description).
function convertCommandToSkill(resolvedContent, skillName) {
  const { frontmatter, body } = extractFrontmatterAndBody(resolvedContent);
  const description = frontmatter ? extractFrontmatterField(frontmatter, 'description') || '' : '';
  const fm = `---\nname: ${skillName}\ndescription: ${JSON.stringify(description)}\n---`;
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

// ctx: { configDir, dryRun, force, priorHashes, written, skipped, hashes }.
// priorHashes holds the sha256 of what the LAST install wrote (from the
// previous manifest); a dest file whose on-disk hash matches neither that
// baseline nor the incoming content is a local modification — skip it
// unless --force, so a reinstall never silently clobbers user edits.
function writeContent(content, destPath, ctx) {
  const rel = path.relative(ctx.configDir, destPath);
  const newHash = sha256(content);
  const prior = ctx.priorHashes[rel];
  if (prior && fs.existsSync(destPath)) {
    const diskHash = sha256(fs.readFileSync(destPath));
    if (diskHash !== prior && diskHash !== newHash) {
      // Locally modified since last install. Three dispositions:
      //   --update : back the user's version up to gdd-patches/, then overwrite
      //              so the update workflow can 3-way-merge it back in.
      //   --force  : overwrite in place (edits lost — the user asked for it).
      //   default  : skip, leave the edit untouched.
      if (ctx.update) {
        const backupPath = path.join(ctx.configDir, 'gdd-patches', rel);
        if (!ctx.dryRun) {
          fs.mkdirSync(path.dirname(backupPath), { recursive: true });
          fs.copyFileSync(destPath, backupPath);
        }
        process.stdout.write(`  ${ctx.dryRun ? 'would back up' : 'backed up'} local ${rel} -> gdd-patches/${rel}\n`);
        ctx.backedUp.push(rel);
        // fall through and overwrite with the new content
      } else if (!ctx.force) {
        process.stdout.write(
          `  ${ctx.dryRun ? 'would skip' : 'skip'} ${rel}: locally modified since last install ` +
            '(re-run with --force to overwrite, or /gdd:update to merge)\n'
        );
        ctx.skipped.push(rel);
        ctx.written.push(destPath);
        ctx.hashes[rel] = prior; // keep the last-GDD-written baseline
        return;
      }
      // --force with no --update falls through to overwrite.
    }
  } else if (!prior && fs.existsSync(destPath)) {
    // First install (no GDD baseline) colliding with a pre-existing file: we
    // overwrite to establish the baseline, but say so — the user has no
    // manifest that would otherwise flag the clobber.
    const diskHash = sha256(fs.readFileSync(destPath));
    if (diskHash !== newHash) {
      process.stdout.write(`  ${ctx.dryRun ? 'would overwrite' : 'overwrite'} pre-existing ${rel} (no prior GDD install)\n`);
    }
  }
  if (ctx.dryRun) {
    process.stdout.write(`  would write ${destPath}\n`);
  } else {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, content);
  }
  ctx.written.push(destPath);
  ctx.hashes[rel] = newHash;
}

function usage() {
  const flags = CATALOG.runtimes
    .map((r) => `  ${r.install_flags[0].padEnd(14)} target ${r.display_name}`)
    .join('\n');
  return `GDD ${VERSION}: Get Diligence Done installer

Usage: node scripts/install.js [runtime] [scope] [options]

Runtimes:
${flags}

Scope:
  -g, --global     install into the runtime's user-level config dir
  -l, --local      install into ./<config-dir> of the current project (default)

Options:
  -c, --config-dir <path>  override the destination config dir entirely
  -u, --uninstall          remove a previous install (reads the manifest)
  -f, --force              overwrite locally modified GDD files on reinstall
                           (default: warn and leave them in place)
      --update             reinstall in place, backing up locally modified
                           files to gdd-patches/ first (used by /gdd:update)
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
    force: false,
    update: false,
    dryRun: false,
    help: false,
    version: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--antigravity" || a === "--antigravity-cli") {
      fail("Antigravity support has been discontinued. Use --claude or --codex. Existing installations are left untouched.");
    }
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
    } else if (a === '-f' || a === '--force') {
      opts.force = true;
    } else if (a === '--update') {
      opts.update = true;
    } else if (a === '-n' || a === '--dry-run') {
      opts.dryRun = true;
    } else if (a === '-h' || a === '--help') {
      opts.help = true;
    } else if (a === '-v' || a === '--version') {
      opts.version = true;
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

function projectFile(srcPath, destPath, ctx, runtime) {
  // The plugin variable is `${CLAUDE_PLUGIN_ROOT}` and content references
  // `${CLAUDE_PLUGIN_ROOT}/gdd-core/...`; installing copies gdd-core under
  // configDir, so rewriting the variable to configDir resolves the includes.
  const isText = /\.(md|json)$/.test(srcPath);
  if (!isText) {
    writeContent(fs.readFileSync(srcPath), destPath, ctx);
    return;
  }
  let content = fs.readFileSync(srcPath, 'utf8').split(PLUGIN_ROOT_TOKEN).join(ctx.configDir);
  if (runtime && /\.md$/.test(srcPath)) content = rewriteCommandPrefix(content, runtime);
  writeContent(content, destPath, ctx);
}

function install(runtime, configDir, opts) {
  const { dryRun, force } = opts;
  // Commands are authored flat (plugin layout); the CLI install nests them
  // under commands/gdd/ so a standalone runtime derives the /gdd: namespace
  // from the subdirectory.
  const srcCommands = path.join(REPO_ROOT, 'commands');
  const srcAgents = path.join(REPO_ROOT, 'agents');
  const srcCore = path.join(REPO_ROOT, 'gdd-core');
  const installDir = path.join(configDir, 'gdd-core');
  const written = [];
  // Prior manifest (if reinstalling) supplies the per-file hash baseline
  // that lets writeContent detect and protect local modifications.
  const priorManifestPath = path.join(installDir, MANIFEST_NAME);
  let priorManifest = null;
  if (fs.existsSync(priorManifestPath)) {
    try {
      priorManifest = readJson(priorManifestPath);
    } catch (_e) {
      priorManifest = null;
    }
  }
  const priorHashes = (priorManifest && priorManifest.hashes) || {};
  const ctx = { configDir, dryRun, force, update: opts.update, priorHashes, written, skipped: [], backedUp: [], hashes: {} };

  // Provenance the update path (/gdd:update) replays to reinstall in place.
  const provenance = {
    runtime_flag: runtime.install_flags[0],
    scope: opts.scope,
    config_dir_override: opts.configDir || null,
  };

  let installError = null;
  try {
    // Command surface. Nested layout gives /gdd:<name> on Claude Code; "skills"
    // (Codex) converts each command into a SKILL.md directory with
    // its @-include resolved to real content, since Codex does not auto-inline
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
        writeContent(skillContent, path.join(configDir, 'skills', skillName, 'SKILL.md'), ctx);
        continue;
      }
      // Nested (Claude Code) copies the command file through verbatim — its
      // name is derived from the filename under commands/gdd/, so command
      // frontmatter must NOT carry a `name:` key (it would land here unused
      // and has tripped Claude Code's autocomplete). The skills branch above
      // synthesizes its own gdd-<rel> and ignores any source name entirely.
      // check-references.mjs guards against a `name:` sneaking back in.
      const dest =
        runtime.command_layout === 'nested'
          ? path.join(configDir, 'commands', 'gdd', rel)
          : path.join(configDir, 'commands', `gdd-${rel}`);
      projectFile(f, dest, ctx, runtime);
    }

    // Agents. codex-toml converts to Codex's
    // native custom-agent format; anything else is a passthrough copy.
    for (const f of listFilesRecursive(srcAgents)) {
      const rel = path.relative(srcAgents, f);
      if (runtime.agent_layout === 'codex-toml') {
        const raw = fs.readFileSync(f, 'utf8');
        const rewritten = rewriteCommandPrefix(raw.split(PLUGIN_ROOT_TOKEN).join(configDir), runtime);
        const base = path.basename(rel, '.md');
        writeContent(convertAgentToCodexToml(rewritten), path.join(configDir, 'agents', `${base}.toml`), ctx);
        continue;
      }
      projectFile(f, path.join(configDir, 'agents', rel), ctx, runtime);
    }

    // Payload: workflows, templates, references. Still installed for every
    // runtime (agents Read these directly at runtime) even though skills-layout
    // runtimes also get the workflow content inlined into each SKILL.md.
    for (const f of listFilesRecursive(srcCore)) {
      const rel = path.relative(srcCore, f);
      projectFile(f, path.join(installDir, rel), ctx, runtime);
    }

    if (!dryRun) {
      writeContent(`${VERSION}\n`, path.join(installDir, 'VERSION'), ctx);
    }
  } catch (e) {
    installError = e;
  } finally {
    // Write the manifest even on a half-failed install, so `--uninstall` can
    // clean up whatever was written. It lists itself in files[] — it is an
    // installed file, and integrity tooling diffing manifest vs disk must come
    // out even.
    if (!dryRun) {
      const manifestRel = path.join('gdd-core', MANIFEST_NAME);
      const manifest = {
        name: PKG.name,
        version: VERSION,
        runtime: runtime.runtime_name,
        installed_at: new Date().toISOString(),
        config_dir: configDir,
        install: provenance,
        partial: installError ? true : undefined,
        files: written.map((p) => path.relative(configDir, p)).concat([manifestRel]),
        hashes: ctx.hashes,
      };
      fs.mkdirSync(installDir, { recursive: true });
      fs.writeFileSync(path.join(installDir, MANIFEST_NAME), `${JSON.stringify(manifest, null, 2)}\n`);
    }
  }
  if (installError) {
    fail(`install failed after writing ${written.length} file(s): ${installError.message}\n` +
      `A manifest was written; run with --uninstall to clean up the partial install.`);
  }

  // Reinstall pruning: any file the PRIOR manifest listed that this install no
  // longer ships is a stale GDD-owned file — delete it (contained to configDir,
  // like uninstall). Skips gdd-patches/ (user backups) implicitly: those are
  // never manifest-listed.
  const pruned = [];
  if (priorManifest && Array.isArray(priorManifest.files)) {
    // VERSION and the manifest are always (re)written on a real install; count
    // them as shipped so a dry-run doesn't report them as prunable (dry-run
    // skips actually writing VERSION).
    const nowShipped = new Set(
      written
        .map((p) => path.relative(configDir, p))
        .concat([path.join('gdd-core', MANIFEST_NAME), path.join('gdd-core', 'VERSION')])
    );
    const configRoot = path.resolve(configDir) + path.sep;
    for (const rel of priorManifest.files) {
      if (nowShipped.has(rel)) continue;
      const target = path.resolve(path.join(configDir, rel));
      if (target !== path.resolve(configDir) && !target.startsWith(configRoot)) continue;
      if (!fs.existsSync(target)) continue;
      if (dryRun) {
        process.stdout.write(`  would prune ${rel} (no longer shipped)\n`);
      } else {
        fs.rmSync(target);
      }
      pruned.push(rel);
    }
  }

  // On a real install `written` already includes VERSION and we add 1 for the
  // manifest (written directly, not via writeContent). A dry-run writes neither,
  // so report what a real install *would* write: + VERSION + manifest.
  const count = written.length + (dryRun ? 2 : 1);
  const skippedNote = ctx.skipped.length
    ? `${ctx.skipped.length} locally modified file(s) left in place; re-run with --force to overwrite.\n`
    : '';
  const backedUpNote = ctx.backedUp.length
    ? `${ctx.backedUp.length} locally modified file(s) backed up to gdd-patches/ — merge your edits back in.\n`
    : '';
  const prunedNote = pruned.length ? `${pruned.length} stale file(s) ${dryRun ? 'would be ' : ''}pruned.\n` : '';
  process.stdout.write(
    `${dryRun ? '[dry-run] ' : ''}GDD ${VERSION} → ${runtime.display_name} (${configDir}): ${count} files.\n` +
      skippedNote +
      backedUpNote +
      prunedNote +
      `Launch \`${runtime.launch_command}\` and run ${runtime.command_prefix}help to begin.\n`
  );
}

function uninstall(runtime, configDir, dryRun) {
  const manifestPath = path.join(configDir, 'gdd-core', MANIFEST_NAME);
  if (!fs.existsSync(manifestPath)) {
    fail(`no ${MANIFEST_NAME} found under ${configDir}: nothing to uninstall.`);
  }
  let manifest;
  try {
    manifest = readJson(manifestPath);
  } catch (_e) {
    fail(`${MANIFEST_NAME} under ${configDir} is corrupt and cannot be read; remove ${path.join(configDir, 'gdd-core')} by hand.`);
  }
  const targets = manifest.files.map((rel) => path.join(configDir, rel)).concat([manifestPath]);
  // Containment: a resolved target must stay under configDir. A tampered or
  // corrupt manifest with a traversal entry (../../x) must never let uninstall
  // delete outside its own install tree — warn and skip instead.
  const configRoot = path.resolve(configDir) + path.sep;
  for (const p of targets) {
    const resolved = path.resolve(p);
    if (resolved !== path.resolve(configDir) && !resolved.startsWith(configRoot)) {
      process.stderr.write(`  skip ${p}: resolves outside ${configDir}, refusing to delete\n`);
      continue;
    }
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
  if (opts.version) {
    process.stdout.write(`${VERSION}\n`);
    return;
  }
  if (opts.help) {
    process.stdout.write(usage());
    return;
  }
  const runtime = opts.runtime || CATALOG.runtimes.find((r) => r.runtime_name === 'claude-code');
  const configDir = resolveConfigDir(runtime, opts.scope, opts.configDir);
  if (opts.uninstall) uninstall(runtime, configDir, opts.dryRun);
  else install(runtime, configDir, opts);
}

main();

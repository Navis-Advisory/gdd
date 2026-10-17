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
// Each context block can contain several includes and surrounding prose.
const CONTEXT_RE = /<execution_context>([\s\S]*?)<\/execution_context>/g;
const INCLUDE_RE = /@\$\{CLAUDE_PLUGIN_ROOT\}\/gdd-core\/([^\s<]+)/g;

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function sha256(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

// Inspect the selected config root and every destination component without
// following links (including Windows junctions and dangling links). Ancestors
// above the explicitly selected root may be OS aliases such as macOS /tmp.
// Recheck before each operation; this is not an OS sandbox against concurrent
// filesystem replacement by another process.
function safeEntry(configDir, target, kind = 'file') {
  const rel = path.relative(configDir, target);
  if (path.isAbsolute(rel) || rel === '..' || rel.startsWith(`..${path.sep}`)) {
    throw new Error(`refusing path outside config directory: ${target}`);
  }
  const parts = rel ? rel.split(path.sep) : [];
  let current = configDir;
  for (let i = 0; i <= parts.length; i += 1) {
    if (i) current = path.join(current, parts[i - 1]);
    let stat;
    try { stat = fs.lstatSync(current); }
    catch (e) { if (e.code === 'ENOENT') return null; throw e; }
    if (stat.isSymbolicLink()) throw new Error(`refusing linked/redirected destination: ${current}`);
    const directory = i < parts.length || kind === 'directory';
    if (directory ? !stat.isDirectory() : !stat.isFile()) {
      throw new Error(`refusing unexpected destination type: ${current}`);
    }
    if (!directory && stat.nlink > 1) throw new Error(`refusing multiply linked file: ${current}`);
    if (i === parts.length) return stat;
  }
}

function checkInstallRoots(configDir, runtime) {
  for (const rel of ['gdd-core', 'agents', runtime.command_layout === 'skills' ? 'skills' : 'commands/gdd']) {
    safeEntry(configDir, path.join(configDir, rel), 'directory');
  }
}

function manifestRelativePath(rel) {
  if (typeof rel !== 'string') throw new Error('file paths must be strings');
  const parts = rel.split(/[\\/]/);
  // Windows trims trailing dots/spaces; reject aliases of traversal segments.
  if (parts.some((p) => !p || p === '.' || p === '..' || /[:\0]/.test(p) || /[. ]$/.test(p))) {
    throw new Error('refusing invalid or outside path');
  }
  const normalized = parts.join('/');
  if (!/^(gdd-core\/.+|commands\/gdd\/.+|skills\/gdd-[^/]+\/.+|agents\/gdd-[^/]+\.(md|toml))$/.test(normalized)) {
    throw new Error('refusing file outside GDD-owned namespaces');
  }
  return path.join(...parts);
}

function loadManifest(configDir, runtime) {
  const manifestPath = path.join(configDir, 'gdd-core', MANIFEST_NAME);
  if (!safeEntry(configDir, manifestPath)) return null;
  try {
    const m = readJson(manifestPath);
    if (!m || m.name !== PKG.name || m.runtime !== runtime.runtime_name ||
        typeof m.version !== 'string' || typeof m.config_dir !== 'string' ||
        path.relative(configDir, path.resolve(m.config_dir)) !== '' || !Array.isArray(m.files) ||
        !m.hashes || typeof m.hashes !== 'object' || Array.isArray(m.hashes)) {
      throw new Error('wrong identity, config root or structure');
    }
    m.files = m.files.map(manifestRelativePath);
    const keys = m.files.map((p) => process.platform === 'win32' ? p.toLowerCase() : p);
    if (new Set(keys).size !== keys.length) throw new Error('duplicate file paths');
    const hashes = {};
    for (const [rel, hash] of Object.entries(m.hashes)) {
      const normalized = manifestRelativePath(rel);
      if (!m.files.includes(normalized) || Object.hasOwn(hashes, normalized) ||
          typeof hash !== 'string' || !/^[a-f0-9]{64}$/.test(hash)) throw new Error('invalid file hash');
      hashes[normalized] = hash;
    }
    m.hashes = hashes;
    return m;
  } catch (e) {
    throw new Error(`${MANIFEST_NAME} is corrupt or invalid (${e.message}); no changes made. Restore a valid manifest before retrying.`);
  }
}

function checkWrite(content, destPath, ctx) {
  if (!safeEntry(ctx.configDir, destPath)) return;
  const rel = path.relative(ctx.configDir, destPath);
  if (!ctx.owned.has(rel) && !ctx.force) {
    throw new Error(`refusing pre-existing unowned file ${rel}; use --force only to explicitly replace it`);
  }
  const diskHash = sha256(fs.readFileSync(destPath));
  if (ctx.update && ctx.owned.has(rel) && diskHash !== ctx.priorHashes[rel] && diskHash !== sha256(content)) {
    const backupPath = path.join(ctx.configDir, 'gdd-patches', rel);
    if (safeEntry(ctx.configDir, backupPath) && sha256(fs.readFileSync(backupPath)) !== diskHash) {
      throw new Error(`unresolved backup already exists at ${backupPath}; preserve or reconcile it before updating again`);
    }
  }
}

// Remove only empty directories reached through known installed files. Never
// recursively remove a namespace: it may also contain unowned user files.
function pruneEmptyDirectories(configDir, files) {
  const dirs = new Set();
  for (const rel of files) {
    let dir = path.dirname(path.join(configDir, rel));
    while (dir !== configDir && !['agents', 'commands', 'skills'].includes(path.relative(configDir, dir))) {
      dirs.add(dir);
      dir = path.dirname(dir);
    }
  }
  for (const dir of [...dirs].sort((a, b) => b.length - a.length)) {
    if (!safeEntry(configDir, dir, 'directory')) continue;
    try { fs.rmdirSync(dir); }
    catch (e) { if (!['ENOTEMPTY', 'EEXIST', 'ENOENT'].includes(e.code)) throw e; }
  }
}

function saveManifest(configDir, manifest) {
  const manifestPath = path.join(configDir, 'gdd-core', MANIFEST_NAME);
  safeEntry(configDir, manifestPath);
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  safeEntry(configDir, manifestPath);
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
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
  return content.replace(CONTEXT_RE, (_, context) => {
    const resolved = context.replace(INCLUDE_RE, (_include, relPath) => {
      const parts = relPath.split('/');
      if (parts.some((p) => !p || p === '.' || p === '..' || /[\\:\0]/.test(p) || /[. ]$/.test(p))) {
        throw new Error(`invalid execution-context include: ${relPath}`);
      }
      const target = path.join(srcCore, ...parts);
      safeEntry(srcCore, target);
      return fs.readFileSync(target, 'utf8').trim();
    });
    return `<execution_context>${resolved}</execution_context>`;
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
// Required fields are strings: https://learn.chatgpt.com/docs/agent-configuration/subagents
// JSON's string escapes also work in TOML basic strings, except that TOML
// additionally forbids an unescaped DEL. Encode instructions as a string so
// Windows paths, newlines and quote delimiters survive parsing unchanged.
function tomlString(value) {
  return JSON.stringify(value).replace(/\u007f/g, '\\u007f');
}

function convertAgentToCodexToml(content) {
  const { frontmatter, body } = extractFrontmatterAndBody(content);
  const name = frontmatter ? extractFrontmatterField(frontmatter, 'name') || 'unknown' : 'unknown';
  const description = frontmatter ? extractFrontmatterField(frontmatter, 'description') || '' : '';
  const instructions = body.trim();
  return (
    `name = ${tomlString(name)}\n` +
    `description = ${tomlString(description)}\n` +
    `developer_instructions = ${tomlString(instructions)}\n`
  );
}

// ctx: { configDir, dryRun, force, priorHashes, written, skipped, hashes }.
// priorHashes holds the sha256 of what the LAST install wrote (from the
// previous manifest); a dest file whose on-disk hash matches neither that
// baseline nor the incoming content is a local modification — skip it
// unless --force, so a reinstall never silently clobbers user edits.
function writeContent(content, destPath, ctx) {
  if (ctx.planning) {
    ctx.plan.push({ content, destPath });
    return;
  }
  checkWrite(content, destPath, ctx);
  const rel = path.relative(ctx.configDir, destPath);
  const newHash = sha256(content);
  const prior = ctx.priorHashes[rel];
  if (ctx.owned.has(rel) && fs.existsSync(destPath)) {
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
          if (!safeEntry(ctx.configDir, backupPath)) {
            fs.copyFileSync(destPath, backupPath, fs.constants.COPYFILE_EXCL);
          }
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
        if (prior) ctx.hashes[rel] = prior; // keep the last-GDD-written baseline
        return;
      }
      // --force with no --update falls through to overwrite.
    }
  } else if (!prior && fs.existsSync(destPath)) {
    // Only an explicit --force can replace an unowned collision.
    const diskHash = sha256(fs.readFileSync(destPath));
    if (diskHash !== newHash) {
      process.stdout.write(`  ${ctx.dryRun ? 'would overwrite' : 'overwrite'} pre-existing ${rel} (no prior GDD install)\n`);
    }
  }
  if (ctx.dryRun) {
    process.stdout.write(`  would write ${destPath}\n`);
  } else {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    safeEntry(ctx.configDir, destPath);
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
  -u, --uninstall          remove unchanged owned files; keep local edits
  -f, --force              replace unowned collisions / local edits, or remove
                           modified owned files during pruning or uninstall
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
  checkInstallRoots(configDir, runtime);
  const priorManifest = loadManifest(configDir, runtime);
  const priorHashes = (priorManifest && priorManifest.hashes) || {};
  const ctx = {
    configDir, dryRun, force, update: opts.update, priorHashes, written,
    owned: new Set(priorManifest?.files || []), planning: true, plan: [],
    skipped: [], backedUp: [], hashes: { ...priorHashes },
  };

  // Provenance the update path (/gdd:update) replays to reinstall in place.
  const provenance = {
    runtime_flag: runtime.install_flags[0],
    scope: opts.scope,
    config_dir_override: opts.configDir || null,
  };

  {
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

    writeContent(`${VERSION}\n`, path.join(installDir, 'VERSION'), ctx);
  }

  // Prepare all content and check all destinations before the first mutation.
  // A late collision, redirected subtree or unresolved backup must not leave a
  // half-updated installation. The operation helpers recheck their own paths.
  for (const rel of ctx.owned) safeEntry(configDir, path.join(configDir, rel));
  for (const { content, destPath } of ctx.plan) checkWrite(content, destPath, ctx);
  ctx.planning = false;
  const manifestRel = path.join('gdd-core', MANIFEST_NAME);
  const retained = new Set(ctx.owned);
  const nowShipped = new Set(ctx.plan.map(({ destPath }) => path.relative(configDir, destPath)).concat(manifestRel));
  const pruned = [];
  let installError;
  try {
    for (const { content, destPath } of ctx.plan) writeContent(content, destPath, ctx);
    for (const rel of ctx.owned) {
      if (nowShipped.has(rel)) continue;
      const target = path.join(configDir, rel);
      if (safeEntry(configDir, target)) {
        if (!force && (!priorHashes[rel] || sha256(fs.readFileSync(target)) !== priorHashes[rel])) {
          process.stdout.write(`  preserve ${rel}: retired file has local changes or no known baseline\n`);
          continue;
        }
        if (dryRun) process.stdout.write(`  would prune ${rel} (no longer shipped)\n`);
        else fs.rmSync(target);
        pruned.push(rel);
      }
      retained.delete(rel);
      delete ctx.hashes[rel];
    }
  } catch (e) {
    installError = e;
  }
  if (!dryRun) {
    // Retain prior ownership as well as completed writes if an I/O error occurs;
    // a partial retry must not forget files that it never reached.
    saveManifest(configDir, {
      name: PKG.name, version: VERSION, runtime: runtime.runtime_name,
      installed_at: new Date().toISOString(), config_dir: configDir, install: provenance,
      partial: installError ? true : undefined,
      files: [...new Set([...retained, ...written.map((p) => path.relative(configDir, p)), manifestRel])],
      hashes: ctx.hashes,
    });
  }
  if (installError) throw new Error(`install stopped: ${installError.message}; ownership retained for retry`);

  const count = written.length + 1; // includes VERSION, plus the manifest
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

function uninstall(runtime, configDir, opts) {
  const { dryRun, force } = opts;
  checkInstallRoots(configDir, runtime);
  const manifestPath = path.join(configDir, 'gdd-core', MANIFEST_NAME);
  const manifest = loadManifest(configDir, runtime);
  if (!manifest) throw new Error(`no ${MANIFEST_NAME} found under ${configDir}: nothing to uninstall.`);
  const manifestRel = path.relative(configDir, manifestPath);
  const files = manifest.files.filter((rel) => rel !== manifestRel);
  for (const rel of files) safeEntry(configDir, path.join(configDir, rel));
  const kept = [];
  for (const rel of files) {
    const target = path.join(configDir, rel);
    if (!safeEntry(configDir, target)) continue;
    if (!force && (!manifest.hashes[rel] || sha256(fs.readFileSync(target)) !== manifest.hashes[rel])) {
      kept.push(rel);
      process.stdout.write(`  preserve ${rel}: locally modified or no known baseline\n`);
    } else if (dryRun) process.stdout.write(`  would remove ${target}\n`);
    else fs.rmSync(target);
  }
  if (!dryRun) {
    if (kept.length) {
      manifest.files = [...kept, manifestRel];
      manifest.hashes = Object.fromEntries(kept.filter((rel) => manifest.hashes[rel]).map((rel) => [rel, manifest.hashes[rel]]));
      saveManifest(configDir, manifest);
    } else {
      safeEntry(configDir, manifestPath);
      fs.rmSync(manifestPath);
    }
    pruneEmptyDirectories(configDir, [...files, manifestRel]);
  }
  process.stdout.write(`${dryRun ? '[dry-run] ' : ''}GDD uninstall: ${kept.length} modified file(s) preserved in ${configDir}.\n`);
  if (kept.length) process.stdout.write('Ownership manifest retained; use --uninstall --force only to explicitly remove these edits.\n');
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
  if (opts.uninstall) uninstall(runtime, configDir, opts);
  else install(runtime, configDir, opts);
}

try { main(); }
catch (e) { fail(e.message); }

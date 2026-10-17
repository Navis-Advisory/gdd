#!/usr/bin/env node
// Synthetic filesystem regressions. Never use the user's runtime configuration.
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const installer = fileURLToPath(new URL('../scripts/install.js', import.meta.url));
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'gdd-installer-safety-'));
const digest = (text) => crypto.createHash('sha256').update(text).digest('hex');
const manifestRel = path.join('gdd-core', 'gdd-file-manifest.json');
let count = 0;
function run(config, runtime, flags = [], ok = true) {
  const result = spawnSync(process.execPath, [installer, runtime, '--config-dir', config, ...flags], { encoding: 'utf8' });
  assert.ifError(result.error);
  assert.equal(result.status, ok ? 0 : 1, result.stdout + result.stderr);
  return result.stdout + result.stderr;
}
function fixture(name, runtime, test) {
  const dir = path.join(root, `${++count}-${name.replace(/[\\/]/g, '-')}`);
  fs.mkdirSync(dir);
  const config = path.join(dir, 'config with spaces');
  test({ dir, config, runtime });
  process.stdout.write(`ok - ${name} (${runtime})\n`);
}
function snapshot(dir) {
  if (!fs.existsSync(dir)) return {};
  const out = {};
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isSymbolicLink()) out[entry.name] = `link:${fs.readlinkSync(p)}`;
    else if (entry.isDirectory()) out[entry.name] = snapshot(p);
    else out[entry.name] = digest(fs.readFileSync(p));
  }
  return out;
}
function command(config, runtime) {
  return runtime === '--claude' ? path.join(config, 'commands/gdd/help.md') : path.join(config, 'skills/gdd-help/SKILL.md');
}
function editManifest(config, edit) {
  const p = path.join(config, manifestRel);
  const m = JSON.parse(fs.readFileSync(p, 'utf8'));
  edit(m);
  fs.writeFileSync(p, JSON.stringify(m));
}
function link(target, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  // Junctions need no Windows developer mode / elevated symlink privilege.
  fs.symlinkSync(target, dest, process.platform === 'win32' ? 'junction' : 'dir');
}
try {
  for (const runtime of ['--claude', '--codex']) {
    fixture('unowned collision is preserved before any writes', runtime, ({ config }) => {
      const p = command(config, runtime);
      fs.mkdirSync(path.dirname(p), { recursive: true });
      fs.writeFileSync(p, 'user-owned');
      const before = snapshot(config);
      for (const flags of [[], ['--update'], ['--dry-run']]) {
        assert.match(run(config, runtime, flags, false), /pre-existing|unowned/i);
        assert.deepEqual(snapshot(config), before);
      }
      run(config, runtime, ['--force']);
      assert.notEqual(fs.readFileSync(p, 'utf8'), 'user-owned');
    });

    fixture('corrupt and wrong-shaped manifests fail without changes', runtime, ({ config }) => {
      run(config, runtime);
      const p = path.join(config, manifestRel);
      const good = fs.readFileSync(p, 'utf8');
      const malformedHash = JSON.parse(good);
      const hashKey = Object.keys(malformedHash.hashes)[0];
      malformedHash.hashes[hashKey] = [malformedHash.hashes[hashKey]];
      const duplicateHash = JSON.parse(good);
      const alias = hashKey.includes('\\') ? hashKey.replaceAll('\\', '/') : hashKey.replaceAll('/', '\\');
      duplicateHash.hashes[alias] = duplicateHash.hashes[hashKey];
      for (const bad of ['{broken', 'null', '[]', JSON.stringify({ ...JSON.parse(good), hashes: [] }),
        JSON.stringify(malformedHash), JSON.stringify(duplicateHash)]) {
        fs.writeFileSync(p, bad);
        const before = snapshot(config);
        for (const flags of [[], ['--force'], ['--update'], ['--uninstall']]) {
          assert.match(run(config, runtime, flags, false), /manifest.*corrupt|invalid.*manifest/i);
          assert.deepEqual(snapshot(config), before);
        }
      }
    });

    fixture('manifest cannot claim paths outside owned namespaces', runtime, ({ dir, config }) => {
      run(config, runtime);
      const p = path.join(config, manifestRel);
      const good = fs.readFileSync(p, 'utf8');
      fs.writeFileSync(path.join(dir, 'outside.txt'), 'outside');
      fs.writeFileSync(path.join(config, 'settings.json'), 'user settings');
      for (const rel of ['../outside.txt', '..\\outside.txt', 'gdd-core/.. /settings.json',
        'gdd-core/../settings.json.', 'settings.json', 'gdd-patches/keep.md']) {
        fs.writeFileSync(p, good);
        editManifest(config, (m) => { m.files.push(rel); m.hashes[rel] = digest('user settings'); });
        const before = snapshot(dir);
        for (const flags of [[], ['--uninstall', '--force']]) {
          run(config, runtime, flags, false);
          assert.deepEqual(snapshot(dir), before);
        }
      }
    });

    fixture('updates never overwrite unresolved backups', runtime, ({ config }) => {
      run(config, runtime);
      const p = command(config, runtime);
      const rel = path.relative(config, p);
      const backup = path.join(config, 'gdd-patches', rel);
      fs.writeFileSync(p, 'first edit');
      run(config, runtime, ['--update']);
      assert.equal(fs.readFileSync(backup, 'utf8'), 'first edit');
      fs.writeFileSync(p, 'second edit');
      const before = snapshot(config);
      assert.match(run(config, runtime, ['--update'], false), /backup/i);
      assert.deepEqual(snapshot(config), before);
      // A retry with the same saved edit can safely reuse the existing backup.
      fs.writeFileSync(p, 'first edit');
      run(config, runtime, ['--update']);
      assert.equal(fs.readFileSync(backup, 'utf8'), 'first edit');
    });

    fixture('modified retired files survive pruning and uninstall', runtime, ({ config }) => {
      run(config, runtime);
      const rel = path.join('gdd-core', 'references', 'retired.md');
      const retired = path.join(config, rel);
      fs.writeFileSync(retired, 'local revision');
      editManifest(config, (m) => { m.files.push(rel); m.hashes[rel] = digest('original'); });
      run(config, runtime);
      assert.equal(fs.readFileSync(retired, 'utf8'), 'local revision');
      assert.ok(JSON.parse(fs.readFileSync(path.join(config, manifestRel))).files.includes(rel));
      const active = command(config, runtime);
      fs.writeFileSync(active, 'active edit');
      run(config, runtime, ['--uninstall']);
      assert.equal(fs.readFileSync(retired, 'utf8'), 'local revision');
      assert.equal(fs.readFileSync(active, 'utf8'), 'active edit');
      assert.ok(fs.existsSync(path.join(config, manifestRel)), 'retain ownership for an explicit later cleanup');
      run(config, runtime, ['--uninstall', '--force']);
      assert.equal(fs.existsSync(retired), false);
      assert.equal(fs.existsSync(active), false);
    });

    fixture('uninstall preserves unowned additions', runtime, ({ config }) => {
      run(config, runtime);
      const extras = ['gdd-core/references/user-note.md', 'commands/gdd/user-command.md', 'skills/gdd-user/SKILL.md'];
      for (const rel of extras) {
        const p = path.join(config, rel);
        fs.mkdirSync(path.dirname(p), { recursive: true });
        fs.writeFileSync(p, 'keep');
      }
      run(config, runtime, ['--uninstall', '--force']);
      for (const rel of extras) assert.equal(fs.readFileSync(path.join(config, rel), 'utf8'), 'keep');
    });

    fixture('dry runs preserve valid installed files and ownership', runtime, ({ config }) => {
      run(config, runtime);
      fs.writeFileSync(command(config, runtime), 'local edit');
      const before = snapshot(config);
      for (const flags of [['--dry-run'], ['--update', '--dry-run'], ['--uninstall', '--force', '--dry-run']]) {
        run(config, runtime, flags);
        assert.deepEqual(snapshot(config), before);
      }
    });

    fixture('hard-linked artifact is not overwritten or deleted', runtime, ({ dir, config }) => {
      run(config, runtime);
      const p = command(config, runtime);
      const outside = path.join(dir, 'hardlinked-copy');
      fs.linkSync(p, outside);
      const before = snapshot(dir);
      for (const flags of [['--force'], ['--uninstall', '--force']]) {
        assert.match(run(config, runtime, flags, false), /linked/i);
        assert.deepEqual(snapshot(dir), before);
      }
    });

    fixture('dangling directory link is not treated as absent', runtime, ({ dir, config }) => {
      const destination = path.join(config, 'gdd-core');
      link(path.join(dir, 'missing-target'), destination);
      const before = snapshot(dir);
      run(config, runtime, [], false);
      assert.deepEqual(snapshot(dir), before);
      fs.unlinkSync(destination);
    });

    for (const redirected of ['', 'gdd-core', runtime === '--claude' ? 'commands/gdd' : 'skills', 'agents']) {
      fixture(`reject redirected destination ${redirected || 'config root'}`, runtime, ({ dir, config }) => {
        const outside = path.join(dir, 'outside');
        fs.mkdirSync(outside);
        fs.writeFileSync(path.join(outside, 'sentinel'), 'keep');
        const dest = path.join(config, redirected);
        link(outside, dest);
        const before = snapshot(dir);
        for (const flags of [[], ['--force'], ['--dry-run'], ['--uninstall']]) {
          assert.match(run(config, runtime, flags, false), /link|redirect/i);
          assert.deepEqual(snapshot(dir), before);
        }
        fs.unlinkSync(dest); // remove the fixture link itself before recursive cleanup
      });
    }

    fixture('backup redirection blocks update before any change', runtime, ({ dir, config }) => {
      run(config, runtime);
      fs.writeFileSync(command(config, runtime), 'local edit');
      const outside = path.join(dir, 'outside');
      fs.mkdirSync(outside);
      link(outside, path.join(config, 'gdd-patches'));
      const before = snapshot(dir);
      run(config, runtime, ['--update'], false);
      assert.deepEqual(snapshot(dir), before);
      fs.unlinkSync(path.join(config, 'gdd-patches'));
    });

    fixture('redirected installed subtree blocks pruning and uninstall', runtime, ({ dir, config }) => {
      run(config, runtime);
      const subtree = path.join(config, 'gdd-core/references');
      const outside = path.join(dir, 'outside');
      fs.renameSync(subtree, outside);
      link(outside, subtree);
      const before = snapshot(dir);
      for (const flags of [[], ['--uninstall'], ['--uninstall', '--force']]) {
        run(config, runtime, flags, false);
        assert.deepEqual(snapshot(dir), before);
      }
      fs.unlinkSync(subtree);
    });
  }
  process.stdout.write(`installer-safety: PASS (${count} cases)\n`);
} finally {
  // root is created above, never a user-supplied path; directory links are
  // unlinked by their cases, and rm does not follow remaining fixture links.
  fs.rmSync(root, { recursive: true, force: true });
}

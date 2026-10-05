// Keep the portable skill self-contained; canonical content stays in core.
// Generated files are checked in so a Git marketplace installs without a build.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export function skillResources() {
  const entries = new Map();
  for (const tree of ['gdd-core', 'agents', 'commands']) {
    for (const entry of fs.readdirSync(path.join(root, tree), {recursive: true, withFileTypes: true})) {
      if (!entry.isFile()) continue;
      const source = path.join(entry.parentPath ?? entry.path, entry.name);
      const relative = path.relative(root, source).split(path.sep).join('/');
      let content = fs.readFileSync(source, 'utf8').replace(/\r\n/g, '\n');
      content = content.replaceAll('${CLAUDE_PLUGIN_ROOT}', 'RESOURCE_ROOT')
        .replaceAll('$ARGUMENTS', 'ARGUMENTS');
      entries.set(relative, content);
    }
  }
  return entries;
}
export function buildSkills() {
  const destination = path.join(root, 'skills', 'gdd', 'resources');
  // Only remove stale generated files in this exact directory.
  fs.mkdirSync(destination, {recursive: true});
  const expected = skillResources();
  for (const entry of fs.readdirSync(destination, {recursive: true, withFileTypes: true})) {
    if (!entry.isFile()) continue;
    const file = path.join(entry.parentPath ?? entry.path, entry.name);
    const relative = path.relative(destination, file).split(path.sep).join('/');
    if (!expected.has(relative)) fs.unlinkSync(file);
  }
  for (const [relative, content] of expected) {
    const file = path.join(destination, relative);
    fs.mkdirSync(path.dirname(file), {recursive: true});
    fs.writeFileSync(file, content);
  }
  console.log(`Built ${expected.size} portable skill resources`);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) buildSkills();

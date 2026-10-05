// Stage only installable product files, never an entire repository archive.
import fs from 'node:fs';
import path from 'node:path';
import {buildSkills, root} from './build-skills.mjs';
const destination = process.argv[2];
if (!destination) throw Error('Usage: node scripts/build-pilot.mjs <new-output-directory>');
const output = path.resolve(destination);
if (fs.existsSync(output)) throw Error('Use a new output directory; existing output is never overwritten.');
buildSkills();
fs.mkdirSync(output, {recursive: true});
const shared = ['skills', 'LICENSE'];
for (const [name, payload] of [
  ['gdd-claude', [...shared, '.claude-plugin', 'commands', 'agents', 'gdd-core']],
  ['gdd-openai', [...shared, 'plugin.json', '.agents/plugins/marketplace.json']],
]) {
  const target = path.join(output, name);
  for (const relative of payload) {
    const file = path.join(target, relative);
    fs.mkdirSync(path.dirname(file), {recursive: true});
    fs.cpSync(path.join(root, relative), file, {recursive: true});
  }
}
console.log(`Staged Claude and OpenAI plugin folders in ${output}`);

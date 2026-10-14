import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
// GitHub rejects a workflow file that reads step-only contexts (runner, steps,
// job) in workflow- or job-level keys such as `env:`. A rejected file fails
// every run in 0s, which silently blocked npm releases (0.2.3-0.2.8).
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, '.github/workflows');
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => /\.ya?ml$/.test(f)) : [];
const indent = line => line.match(/^ */)[0].length;
for (const file of files) {
  const lines = fs.readFileSync(path.join(dir, file), 'utf8').split('\n');
  let stepsIndent = -1;
  lines.forEach((line, i) => {
    if (!line.trim() || line.trim().startsWith('#')) return;
    if (stepsIndent >= 0 && indent(line) <= stepsIndent) stepsIndent = -1;
    if (/^\s*steps:\s*$/.test(line)) { stepsIndent = indent(line); return; }
    for (const m of line.matchAll(/\$\{\{([^}]*)\}\}/g)) {
      assert.ok(stepsIndent >= 0 || !/\b(runner|steps|job)\./.test(m[1]),
        `${file}:${i + 1}: \`${m[0]}\` is only available inside steps`);
    }
  });
}
console.log(`workflow contexts ok (${files.length} files)`);

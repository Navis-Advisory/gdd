import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {root, skillResources} from '../scripts/build-skills.mjs';
const resources = path.join(root, 'skills/gdd/resources');
const expected = skillResources();
const actual = fs.readdirSync(resources, {recursive:true, withFileTypes:true})
  .filter(e=>e.isFile()).map(e=>path.relative(resources,path.join(e.parentPath ?? e.path,e.name)).split(path.sep).join('/'));
assert.deepEqual(actual.sort(), [...expected.keys()].sort(), 'portable payload must have exactly canonical resources');
for (const [relative, content] of expected) {
  assert.equal(fs.readFileSync(path.join(resources, relative), 'utf8').replace(/\r\n/g, '\n'), content, `stale resource: ${relative}; run npm run build:skills`);
}
const versions = ['package.json','.claude-plugin/plugin.json','plugin.json'].map(p=>JSON.parse(fs.readFileSync(path.join(root,p))).version);
assert.equal(new Set(versions).size,1,'plugin versions must agree');
const skill = fs.readFileSync(path.join(root,'skills/gdd/SKILL.md'),'utf8');
for (const match of skill.matchAll(/\]\((resources\/[^)]+)\)/g)) assert.ok(fs.existsSync(path.join(root,'skills/gdd',match[1])),match[1]);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(),'gdd-plugin-'));
try {
  const output = path.join(tmp,'staged');
  execFileSync(process.execPath,[path.join(root,'scripts/build-pilot.mjs'),output]);
  const allFiles = fs.readdirSync(output,{recursive:true,withFileTypes:true}).filter(e=>e.isFile());
  for(const e of allFiles){
    const file=path.join(e.parentPath ?? e.path,e.name);
    const relative=path.relative(output,file).split(path.sep).join('/');
    const [bundle, top] = relative.split('/');
    const allowed = bundle === 'gdd-claude'
      ? ['skills','LICENSE','.claude-plugin','commands','agents','gdd-core']
      : ['skills','LICENSE','plugin.json','.agents'];
    assert.ok(allowed.includes(top), `Unexpected plugin payload: ${relative}`);
  }
  const market=JSON.parse(fs.readFileSync(path.join(output,'gdd-openai/.agents/plugins/marketplace.json')));
  assert.equal(market.plugins[0].source.path,'./');
  assert.ok(fs.existsSync(path.join(output,'gdd-openai/skills/gdd/resources/gdd-core/workflows/ingest-sow.md')));
  assert.ok(fs.existsSync(path.join(output,'gdd-claude/commands/ingest-sow.md')));
}finally{fs.rmSync(tmp,{recursive:true,force:true});}
console.log('plugin package: PASS (self-contained, canonical, versioned, bounded payload)');

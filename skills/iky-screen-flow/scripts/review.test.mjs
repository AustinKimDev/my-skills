import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const cli = fileURLToPath(new URL('./review.mjs', import.meta.url));
function fixture(t) {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'screen-flow-test-'));
  t.after(() => fs.rmSync(parent, { recursive: true, force: true }));
  const root = path.join(parent, 'review');
  const run = (command, ...flags) => spawnSync(process.execPath, [cli, command, root, ...flags], { encoding: 'utf8' });
  assert.equal(run('init', '--title', '검증용 화면').status, 0);
  const file = path.join(root, 'flow.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.sections = [{ id: 'main', title: '주요 화면' }];
  data.screens = ['entry', 'detail'].map((id) => ({ id, title: id, description: '검증용 시안', kind: 'new', section: 'main', image: `images/${id}.svg` }));
  data.meta.entryScreenIds = ['entry'];
  data.flows[0].nodes = [{ id: 'entry', col: 0, row: 0 }, { id: 'detail', col: 1, row: 0 }];
  data.flows[0].edges = [{ from: 'entry', to: 'detail', type: 'primary', label: '상세 열기' }, { from: 'detail', to: 'entry', type: 'return', label: '뒤로' }];
  const write = () => fs.writeFileSync(file, JSON.stringify(data));
  write();
  return { parent, root, file, data, run, write };
}
test('initialization refuses overwrite and has no broken parent-page dependency', (t) => {
  const f = fixture(t), before = fs.readFileSync(f.file);
  assert.notEqual(f.run('init').status, 0);
  assert.deepEqual(fs.readFileSync(f.file), before);
  assert.ok(!fs.readFileSync(path.join(f.root, 'index.html'), 'utf8').includes('../index.html'));
});
test('build derives availability, is deterministic, and validate never writes', (t) => {
  const f = fixture(t);
  fs.writeFileSync(path.join(f.root, 'images/entry.svg'), '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="20"></svg>');
  assert.equal(f.run('build').status, 0);
  let data = JSON.parse(fs.readFileSync(f.file));
  assert.deepEqual(data.screens.map((s) => s.status), ['ready', 'pending']);
  const before = fs.readFileSync(f.file);
  assert.equal(f.run('build').status, 0); assert.deepEqual(fs.readFileSync(f.file), before);
  assert.equal(f.run('validate').status, 0); assert.notEqual(f.run('validate', '--require-images').status, 0);
  assert.deepEqual(fs.readFileSync(f.file), before);
  fs.copyFileSync(path.join(f.root, 'images/entry.svg'), path.join(f.root, 'images/detail.svg'));
  assert.equal(f.run('validate', '--require-images').status, 0);
});
test('rejects dangling and unreachable screens, duplicate coordinates, and split maps', (t) => {
  const f = fixture(t), original = structuredClone(f.data);
  for (const corrupt of [
    d => { d.flows[0].edges[0].to = 'missing'; },
    d => { d.flows[0].edges = []; },
    d => { d.flows[0].nodes[1].col = 0; },
    d => { d.flows.push(structuredClone(d.flows[0])); },
    d => { d.flows[0].nodes.pop(); },
  ]) {
    f.data = structuredClone(original); corrupt(f.data); fs.writeFileSync(f.file, JSON.stringify(f.data));
    assert.notEqual(f.run('build').status, 0);
  }
});
test('rejects outside image paths and symlinks without copying private files', (t) => {
  const f = fixture(t), outside = path.join(f.parent, 'private.svg');
  fs.writeFileSync(outside, '<svg/>');
  for (const image of ['../private.svg', outside, 'https://example.com/image.png', 'javascript:alert(1)', 'images/%2e%2e/private.svg']) {
    f.data.screens[0].image = image; f.write(); assert.notEqual(f.run('validate').status, 0);
  }
  fs.symlinkSync(outside, path.join(f.root, 'images/outside.svg'));
  f.data.screens[0].image = 'images/outside.svg'; f.write(); assert.notEqual(f.run('validate').status, 0);
});
test('preserves revision metadata and supports edited mockups and explicit independent entry points', (t) => {
  const f = fixture(t);
  f.data.screens[0].kind = 'edit'; f.data.screens[0].reviewNotes = ['Text still needs review'];
  f.data.meta.revision = 'r2'; f.data.meta.entryScreenIds = ['entry', 'detail']; f.data.flows[0].edges = [];
  f.write(); assert.equal(f.run('build').status, 0);
  const data = JSON.parse(fs.readFileSync(f.file));
  assert.equal(data.meta.revision, 'r2'); assert.deepEqual(data.screens[0].reviewNotes, ['Text still needs review']);
});

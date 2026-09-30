import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import http from 'node:http';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createReviewServer, loadManifest, safeFile, catalog, modes, archiveReview } from './preview.mjs';

const base = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'ui-review-')));
let review;
const archives = [];
try {
  fs.cpSync(path.join(base, 'assets/example'), root, { recursive: true });
  const manifest = loadManifest(root);
  const comparisonSubject = manifest.subjects.find(s => s.comparison);
  assert.ok(comparisonSubject, 'A working comparison example is required');
  const openSubject = { ...comparisonSubject, id: 'spatial-workbench', type: 'new.hybrid-purpose', mode: 'spatial-reasoning', modeLabel: '공간적 판단', next: [] };
  for (const type of ['new.hybrid-purpose', undefined]) {
    fs.writeFileSync(path.join(root, 'manifest.json'), JSON.stringify({ title: 'Open composition', subjects: [{ ...openSubject, type }] }));
    assert.equal(loadManifest(root).subjects[0].mode, 'spatial-reasoning');
  }
  fs.writeFileSync(path.join(root, 'manifest.json'), JSON.stringify(manifest));
  for (const preview of [{ viewport: 'mobile' }, { viewport: 'tablet', height: 900, isolatedHeight: 280 }]) {
    fs.writeFileSync(path.join(root, 'manifest.json'), JSON.stringify({ title: 'Portrait', subjects: [{ ...openSubject, preview }] }));
    assert.deepEqual(loadManifest(root).subjects[0].preview, preview);
  }
  for (const preview of [null, [], { viewport: 'portrait' }, { height: 0 }, { height: '844' }, { isolatedHeight: 4001 }]) {
    fs.writeFileSync(path.join(root, 'manifest.json'), JSON.stringify({ title: 'Invalid frame', subjects: [{ ...openSubject, preview }] }));
    assert.throws(() => loadManifest(root));
  }
  fs.writeFileSync(path.join(root, 'manifest.json'), JSON.stringify(manifest));
  // Exercise the shipped frame-sizing function, including the former component crop.
  const viewer = fs.readFileSync(path.join(base, 'assets/review.html'), 'utf8');
  const geometry = vm.createContext({
    current: { viewport: 'mobile', context: 'isolated' },
    target: { mode: 'component', preview: { viewport: 'mobile' } },
    frames: [{ frame: { style: {} }, wrap: { style: {} }, canvas: { clientWidth: 410 } }],
    getComputedStyle: () => ({ paddingLeft: '10', paddingRight: '10' })
  });
  vm.runInContext('const subject=()=>target;\n' + viewer.match(/^function resizeFrames\(\).*$/m)[0], geometry);
  const resize = () => vm.runInContext('resizeFrames()', geometry);
  resize();
  assert.equal(geometry.frames[0].frame.style.width, '390px');
  assert.equal(geometry.frames[0].frame.style.height, '844px');
  geometry.target.preview.isolatedHeight = 280; resize();
  assert.equal(geometry.frames[0].frame.style.height, '280px');
  geometry.current.context = 'context'; resize();
  assert.equal(geometry.frames[0].frame.style.height, '844px');
  geometry.frames[0].canvas.clientWidth = 215; resize();
  assert.equal(geometry.frames[0].wrap.style.width, '195px');
  assert.equal(geometry.frames[0].wrap.style.height, '422px');
  geometry.current.viewport = 'desktop'; resize();
  assert.equal(geometry.frames[0].frame.style.width, '1280px');
  assert.equal(geometry.frames[0].frame.style.height, '800px');
  for (const file of ['assets/review.html', 'assets/example/sample.html']) {
    const html = fs.readFileSync(path.join(base, file), 'utf8');
    for (const script of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new vm.Script(script[1], { filename: file });
  }
  assert.equal(new Set(catalog.map(t => t.id)).size, catalog.length);
  assert.ok(manifest.subjects.every(s => modes.includes(s.mode)));
  for (const mode of modes) {
    const scoped = { ...manifest, subjects: [{ ...manifest.subjects[0], mode, next: [] }] };
    fs.writeFileSync(path.join(root, 'manifest.json'), JSON.stringify(scoped));
    assert.equal(loadManifest(root).subjects[0].mode, mode);
  }
  fs.writeFileSync(path.join(root, 'manifest.json'), JSON.stringify(manifest));
  for (const type of catalog) {
    for (const next of type.next) assert.ok(catalog.some(t => t.id === next), next);
    for (const brand of type.brand_candidates) assert.ok(fs.existsSync(path.join(base, 'references/brands', brand + '.md')), brand);
  }
  assert.throws(() => safeFile(root, '../outside.html'));
  fs.symlinkSync('/etc/hosts', path.join(root, 'escape.html'));
  assert.throws(() => safeFile(root, 'escape.html'));
  fs.unlinkSync(path.join(root, 'escape.html'));
  for (const bad of [
    data => { data.subjects[0].mode = 'invalid mode'; },
    data => { data.subjects[0].next = ['missing']; },
    data => { data.subjects[0].variants[0].url = 'http://example.com'; },
    data => { data.subjects[0].variants[0].url = '../private.html'; },
    data => { data.subjects[0].id = null; }
  ]) {
    const data = structuredClone(manifest); bad(data);
    fs.writeFileSync(path.join(root, 'manifest.json'), JSON.stringify(data));
    assert.throws(() => loadManifest(root));
  }
  for (const change of [
    c => { c.criteria.push(c.criteria[0]); },
    c => { c.assessments[0].variant = 'missing'; },
    c => { c.assessments[0].criterion = 'missing'; },
    c => { c.assessments.push(c.assessments[0]); },
    c => { c.assessments[0].status = 'proven'; },
    c => { c.assessments[0].sourceUrl = 'javascript:alert(1)'; },
    c => { c.assessments[0].sourceUrl = 'https://user:secret@example.com/'; },
    c => { c.recommendations[0].variants = ['missing']; }
  ]) {
    const data = structuredClone(manifest); change(data.subjects.find(s => s.comparison).comparison);
    fs.writeFileSync(path.join(root, 'manifest.json'), JSON.stringify(data));
    assert.throws(() => loadManifest(root));
  }
  fs.writeFileSync(path.join(root, 'manifest.json'), JSON.stringify(manifest));
  review = await createReviewServer(root);
  const request = async (route, options) => fetch(review.url + route, options);
  assert.equal((await request('/')).status, 200);
  assert.equal((await request('/api/catalog')).status, 200);
  assert.match(await (await request('/preview/sample.html')).text(), /prototype-result/);
  assert.notEqual((await request('/preview/%2e%2e%2fmanifest.json')).status, 200);
  assert.equal((await request('/preview/manifest.json')).status, 403);
  const wrongHost = await new Promise((resolve, reject) => http.get(review.url + '/api/status', { headers: { Host: 'example.com' } }, res => { res.resume(); resolve(res.statusCode); }).on('error', reject));
  assert.equal(wrongHost, 403);
  const body = { kind: 'feedback', subject: 'component', variant: 'b', state: 'error', size: 'lg', viewport: 'mobile', message: 'Check saved feedback' };
  const headers = { 'Content-Type': 'application/json', Origin: review.url, 'X-UI-Design': 'review' };
  const send = (value, h = headers) => request('/api/events', { method: 'POST', headers: h, body: JSON.stringify(value) });
  assert.equal((await send(body, { ...headers, Origin: 'http://example.com' })).status, 403);
  assert.equal((await send({ ...body, state: 'missing' })).status, 400);
  assert.equal((await send({ ...body, message: '' })).status, 400);
  assert.equal((await send(body)).status, 201);
  assert.equal((await send({ ...body, kind: 'select', variant: 'a' })).status, 201);
  const cli = (...args) => execFileSync(process.execPath, [path.join(base, 'scripts/preview.mjs'), ...args], { encoding: 'utf8' });
  const pending = JSON.parse(cli('poll', root, '0', '0'));
  assert.equal(pending.events.length, 2);
  assert.equal(pending.events[0].mode, 'component');
  cli('ack', root, '2', 'Verified');
  const status = await (await request('/api/status')).json();
  assert.equal(status.active, true);
  assert.equal(status.acknowledged.seq, 2);
  const criterionEvent = { ...body, subject: comparisonSubject.id, variant: comparisonSubject.variants[0].id, state: comparisonSubject.states[0], size: comparisonSubject.sizes[0], criterion: comparisonSubject.comparison.criteria[0].id };
  assert.equal((await send({ ...criterionEvent, criterion: 'missing' })).status, 400);
  assert.equal((await send({ ...criterionEvent, kind: 'select' })).status, 400);
  const savedCriterion = await send(criterionEvent);
  assert.equal(savedCriterion.status, 201);
  assert.equal((await savedCriterion.json()).criterionLabel, comparisonSubject.comparison.criteria[0].label);
  const archived = JSON.parse(cli('archive', root)).archive;
  archives.push(archived);
  assert.deepEqual(loadManifest(archived), manifest);
  assert.equal(fs.existsSync(path.join(archived, '.review')), false);
  assert.match(JSON.parse(fs.readFileSync(path.join(archived, 'archive-record.json'), 'utf8')).records['events.jsonl'], /Check saved feedback/);
  const originalSample = fs.readFileSync(path.join(archived, 'sample.html'), 'utf8');
  fs.appendFileSync(path.join(root, 'sample.html'), '\n<!-- revised -->');
  assert.equal(fs.readFileSync(path.join(archived, 'sample.html'), 'utf8'), originalSample);
  fs.symlinkSync('/etc/hosts', path.join(root, 'escape.html'));
  assert.throws(() => archiveReview(root), /심볼릭/);
  fs.unlinkSync(path.join(root, 'escape.html'));
  const remote = structuredClone(manifest);
  remote.subjects[0].variants[0].url = 'http://localhost:9999/demo';
  fs.writeFileSync(path.join(root, 'manifest.json'), JSON.stringify(remote));
  assert.throws(() => archiveReview(root), /정적 파일/);
  fs.writeFileSync(path.join(root, 'manifest.json'), JSON.stringify(manifest));
  const controller = new AbortController();
  const stream = await request('/api/stream', { signal: controller.signal });
  const reader = stream.body.getReader();
  assert.match(new TextDecoder().decode((await reader.read()).value), /connected/);
  fs.appendFileSync(path.join(root, 'sample.html'), '\n<!-- live refresh -->');
  const deadline = setTimeout(() => controller.abort(), 3000);
  assert.match(new TextDecoder().decode((await reader.read()).value), /event: update/);
  clearTimeout(deadline); controller.abort();
  console.log('PASS: optional/custom screen purposes and modes, comparison validation and criterion feedback, example links, legacy manifests, file/origin boundaries, feedback persistence, revision archives, poll/ack, live refresh');
} finally {
  if (review) await review.close();
  fs.rmSync(root, { recursive: true, force: true });
  for (const directory of archives) fs.rmSync(directory, { recursive: true, force: true });
}

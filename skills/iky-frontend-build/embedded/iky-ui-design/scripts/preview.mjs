#!/usr/bin/env node
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { once } from 'node:events';
import { setTimeout as delay } from 'node:timers/promises';

const base = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const catalog = JSON.parse(fs.readFileSync(path.join(base, 'references/screens/catalog.json'), 'utf8'));
export const modes = ['page', 'layout', 'wireframe', 'prototype', 'typography', 'component', 'color', 'assets', 'motion', 'states'];
const idPattern = /^[a-z0-9][a-z0-9-]{0,79}$/;
const isID = value => typeof value === 'string' && idPattern.test(value);
const fail = message => { throw new Error(message); };
const readJSON = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const stateDir = root => path.join(root, '.review');
const logPath = root => path.join(stateDir(root), 'events.jsonl');
const events = root => fs.existsSync(logPath(root)) ? fs.readFileSync(logPath(root), 'utf8').trim().split('\n').filter(Boolean).map(JSON.parse) : [];
const saveJSON = (file, data) => { fs.writeFileSync(`${file}.tmp`, JSON.stringify(data, null, 2) + '\n'); fs.renameSync(`${file}.tmp`, file); };
const text = (v, max = 1000) => typeof v === 'string' && v.trim().length > 0 && v.length <= max;

export function validateComparison(subject) {
  const c = subject.comparison;
  if (c === undefined) return;
  if (!c || !Array.isArray(c.criteria) || !c.criteria.length) fail('비교 기준이 필요합니다');
  const criteria = new Set(), variants = new Set(subject.variants.map(v => v.id));
  for (const row of c.criteria) {
    if (!row || !isID(row.id) || criteria.has(row.id) || !text(row.label, 150) || !text(row.why) || !['high', 'normal'].includes(row.priority)) fail('비교 기준 설정 오류');
    if (row.group !== undefined && !text(row.group, 150)) fail('비교 그룹 설정 오류');
    criteria.add(row.id);
  }
  if (!Array.isArray(c.assessments) || !Array.isArray(c.recommendations)) fail('비교 관찰과 추천 배열이 필요합니다');
  const cells = new Set();
  for (const a of c.assessments) {
    if (!a || !criteria.has(a.criterion) || !variants.has(a.variant) || !text(a.observation) || !text(a.evidence) || !text(a.tradeoff) || !['observed', 'hypothesis', 'untested'].includes(a.status)) fail('비교 관찰 설정 오류');
    const key = a.criterion + ':' + a.variant;
    if (cells.has(key)) fail('중복된 비교 관찰');
    cells.add(key);
    if (a.sourceUrl !== undefined) {
      const url = new URL(a.sourceUrl);
      if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) fail('근거 링크는 공개 HTTP(S) 주소를 사용하세요');
    }
  }
  for (const r of c.recommendations) {
    if (!r || !text(r.label, 150) || !text(r.reason) || !Array.isArray(r.variants) || !r.variants.length || r.variants.some(id => !variants.has(id))) fail('추천 시안을 확인해 주세요');
    if (r.caution !== undefined && !text(r.caution)) fail('추천의 고려 사항을 확인해 주세요');
  }
  if (c.nextComparison !== undefined && !text(c.nextComparison)) fail('다음 비교 설명을 확인해 주세요');
}

export function safeFile(root, relative) {
  const parts = relative.replaceAll('\\', '/').split('/');
  if (!relative || parts.some(p => p.startsWith('.')) || path.isAbsolute(relative)) fail('허용되지 않는 파일 경로');
  const resolved = fs.realpathSync(path.resolve(root, relative));
  if (!resolved.startsWith(root + path.sep) || !fs.statSync(resolved).isFile()) fail('미리보기 폴더 밖의 파일');
  return resolved;
}

function checkURL(root, value) {
  if (!text(value, 2000)) fail('시안 URL이 필요합니다');
  if (/^https?:\/\//.test(value)) {
    const u = new URL(value);
    if (u.protocol !== 'http:' || !['localhost', '127.0.0.1', '[::1]'].includes(u.hostname) || u.username || u.password) fail('기존 서버는 로컬 HTTP URL만 연결할 수 있습니다');
    return;
  }
  if (value.startsWith('/') || /^[a-z]+:/i.test(value)) fail('상대 HTML 경로를 사용하세요');
  const file = decodeURIComponent(value.split(/[?#]/)[0]);
  if (path.extname(file) !== '.html') fail('시안은 HTML 파일이어야 합니다');
  safeFile(root, file);
}

export function loadManifest(root) {
  const data = readJSON(path.join(root, 'manifest.json'));
  if (!text(data.title, 150) || !Array.isArray(data.subjects) || !data.subjects.length) fail('제목과 비교 대상이 필요합니다');
  if (data.variantLink !== undefined && !['separate', 'linked'].includes(data.variantLink)) fail('variantLink는 separate 또는 linked여야 합니다');
  const ids = new Set();
  for (const s of data.subjects) {
    if (!isID(s.id) || ids.has(s.id)) fail('비교 대상 ID가 잘못되었거나 중복입니다');
    ids.add(s.id);
    if (!text(s.name, 150) || !text(s.question, 1000) || !isID(s.mode)) fail(`비교 대상 설정 오류: ${s.id}`);
    for (const field of ['type', 'purpose', 'modeLabel']) if (s[field] !== undefined && !text(s[field])) fail(`${s.id}: ${field} 설명 오류`);
    if (s.preview !== undefined) {
      if (!s.preview || typeof s.preview !== 'object' || Array.isArray(s.preview)) fail(`${s.id}: preview 설정 오류`);
      if (s.preview.viewport !== undefined && !['mobile', 'tablet', 'desktop'].includes(s.preview.viewport)) fail(`${s.id}: preview viewport 설정 오류`);
      for (const field of ['height', 'isolatedHeight']) if (s.preview[field] !== undefined && (!Number.isInteger(s.preview[field]) || s.preview[field] < 100 || s.preview[field] > 4000)) fail(`${s.id}: preview ${field}는 100–4000 CSS px로 지정하세요`);
    }
    for (const field of ['states', 'sizes']) {
      if (!Array.isArray(s[field]) || !s[field].length || s[field].some(x => !isID(x)) || new Set(s[field]).size !== s[field].length) fail(`${s.id}: ${field} 설정 오류`);
    }
    // Optional display names for custom states, e.g. {"live": "행사 당일"}.
    if (s.stateLabels !== undefined && (!s.stateLabels || typeof s.stateLabels !== 'object' || Array.isArray(s.stateLabels) || Object.entries(s.stateLabels).some(([k, v]) => !s.states.includes(k) || !text(v, 40)))) fail(`${s.id}: stateLabels 설정 오류`);
    if (!Array.isArray(s.variants) || s.variants.length < 1 || s.variants.length > 6) fail(`${s.id}: 시안은 1–6개로 구성하세요`);
    const variants = new Set();
    for (const v of s.variants) {
      if (!isID(v.id) || variants.has(v.id) || !text(v.name, 150) || !text(v.description) || !text(v.tradeoff)) fail(`${s.id}: 시안 설명 또는 ID 오류`);
      variants.add(v.id);
      checkURL(root, v.url);
      if (v.contextUrl) checkURL(root, v.contextUrl);
    }
    validateComparison(s);
  }
  for (const s of data.subjects) if (s.next && (!Array.isArray(s.next) || s.next.some(id => !ids.has(id)))) fail(`${s.id}: 연결되지 않은 다음 화면`);
  return data;
}

export function archiveReview(directory) {
  const root = fs.realpathSync(directory);
  const manifest = loadManifest(root);
  if (manifest.subjects.some(s => s.variants.some(v => [v.url, v.contextUrl].some(url => /^https?:/.test(url ?? ''))))) fail('개발 서버 시안은 정적 파일로 내보낸 뒤 보관하세요');
  // Keep complete local assets; exclude runtime state and reject symlinks before copying.
  const inspect = dir => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue;
      if (entry.isSymbolicLink()) fail('보관 대상의 심볼릭 링크를 일반 파일로 바꿔주세요');
      if (entry.isDirectory()) inspect(path.join(dir, entry.name));
      else if (!entry.isFile()) fail('일반 파일만 보관할 수 있습니다');
    }
  };
  inspect(root);
  const destination = fs.mkdtempSync(path.join(path.dirname(root), `${path.basename(root)}-archive-`));
  try {
    fs.cpSync(root, destination, { recursive: true, filter: source => source === root || !path.basename(source).startsWith('.') });
    const records = {};
    for (const name of ['events.jsonl', 'ack.json']) {
      const file = path.join(stateDir(root), name);
      if (fs.existsSync(file)) {
        if (fs.realpathSync(file) !== file || !fs.statSync(file).isFile()) fail('리뷰 기록은 일반 파일이어야 합니다');
        records[name] = fs.readFileSync(file, 'utf8');
      }
    }
    saveJSON(path.join(destination, 'archive-record.json'), { at: new Date().toISOString(), source: root, records });
    loadManifest(destination);
    return destination;
  } catch (error) {
    fs.rmSync(destination, { recursive: true, force: true });
    throw error;
  }
}

export async function createReviewServer(directory, port = 0) {
  const root = fs.realpathSync(directory);
  loadManifest(root);
  fs.mkdirSync(stateDir(root), { recursive: true });
  if (fs.realpathSync(stateDir(root)) !== stateDir(root)) fail('리뷰 상태 폴더는 심볼릭 링크일 수 없습니다');
  for (const name of ['events.jsonl', 'worker.json', 'ack.json', 'server.json']) {
    const file = path.join(stateDir(root), name);
    if (fs.existsSync(file) && fs.lstatSync(file).isSymbolicLink()) fail('리뷰 상태 파일은 심볼릭 링크일 수 없습니다');
  }
  const clients = new Set();
  let origin, timer;
  const broadcast = (type = 'update') => { for (const client of clients) client.write(`event: ${type}\ndata: {}\n\n`); };
  const json = (res, status, data) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(data)); };
  const server = http.createServer(async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    try {
      if (req.headers.host !== new URL(origin).host) return json(res, 403, { error: '잘못된 로컬 호스트' });
      const url = new URL(req.url, origin);
      if (req.method === 'POST' && url.pathname === '/api/events') {
        if (req.headers.origin !== origin || req.headers['x-ui-design'] !== 'review' || !req.headers['content-type']?.startsWith('application/json')) return json(res, 403, { error: '리뷰 화면에서만 의견을 보낼 수 있습니다' });
        const chunks = []; let length = 0;
        for await (const chunk of req) {
          length += chunk.length;
          if (length > 16000) return json(res, 413, { error: '의견이 너무 깁니다' });
          chunks.push(chunk);
        }
        const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
        const manifest = loadManifest(root);
        const subject = manifest.subjects.find(s => s.id === body.subject);
        if (!subject || !subject.variants.some(v => v.id === body.variant) || !['feedback', 'select'].includes(body.kind)) return json(res, 400, { error: '비교 대상 또는 시안을 확인해 주세요' });
        if (body.kind === 'feedback' && !text(body.message, 4000)) return json(res, 400, { error: '수정 의견을 입력해 주세요' });
        if (!subject.states.includes(body.state) || !subject.sizes.includes(body.size) || !['mobile', 'tablet', 'desktop'].includes(body.viewport)) return json(res, 400, { error: '미리보기 상태를 확인해 주세요' });
        const criterion = body.criterion === undefined ? null : subject.comparison?.criteria.find(c => c.id === body.criterion);
        if (body.criterion !== undefined && (!criterion || body.kind !== 'feedback')) return json(res, 400, { error: '의견의 비교 기준을 확인해 주세요' });
        // ponytail: one server writes each review log; use a shared store only for multi-user reviews.
        const previous = events(root);
        const event = { seq: (previous.at(-1)?.seq ?? 0) + 1, at: new Date().toISOString(), kind: body.kind, subject: subject.id, mode: subject.mode, variant: body.variant, state: body.state, size: body.size, viewport: body.viewport, message: typeof body.message === 'string' ? body.message.slice(0, 4000) : '' };
        if (criterion) { event.criterion = criterion.id; event.criterionLabel = criterion.label; }
        fs.appendFileSync(logPath(root), JSON.stringify(event) + '\n');
        broadcast('status');
        return json(res, 201, event);
      }
      if (req.method !== 'GET') return json(res, 405, { error: '지원하지 않는 요청' });
      if (url.pathname === '/api/manifest') return json(res, 200, loadManifest(root));
      if (url.pathname === '/api/catalog') return json(res, 200, catalog);
      if (url.pathname === '/api/status') {
        const worker = path.join(stateDir(root), 'worker.json');
        const ack = path.join(stateDir(root), 'ack.json');
        return json(res, 200, { active: fs.existsSync(worker) && Date.now() - readJSON(worker).at < 65000, acknowledged: fs.existsSync(ack) ? readJSON(ack) : null, events: events(root) });
      }
      if (url.pathname === '/api/stream') {
        res.writeHead(200, { 'Content-Type': 'text/event-stream', Connection: 'keep-alive' });
        res.write('event: connected\ndata: {}\n\n');
        clients.add(res); req.on('close', () => clients.delete(res)); return;
      }
      let file;
      if (url.pathname === '/') file = path.join(base, 'assets/review.html');
      else if (url.pathname.startsWith('/preview/')) file = safeFile(root, decodeURIComponent(url.pathname.slice(9)));
      else return json(res, 404, { error: '페이지를 찾을 수 없습니다' });
      const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff' };
      const mime = types[path.extname(file)];
      if (!mime) return json(res, 403, { error: '지원하지 않는 미리보기 파일' });
      if (url.pathname.startsWith('/preview/') && path.extname(file) === '.html') res.setHeader('Content-Security-Policy', "default-src 'self' data: blob:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'none'; form-action 'none'; base-uri 'none'");
      res.setHeader('Content-Type', mime);
      fs.createReadStream(file).on('error', () => res.destroy()).pipe(res);
    } catch (error) { if (!res.headersSent) json(res, 400, { error: error.message }); else res.destroy(); }
  });
  server.listen(port, '127.0.0.1');
  await once(server, 'listening');
  origin = `http://127.0.0.1:${server.address().port}`;
  const watcher = fs.watch(root, { recursive: true }, (_, filename) => {
    if (!filename || filename.split(path.sep).some(p => p.startsWith('.'))) return;
    clearTimeout(timer); timer = setTimeout(broadcast, 120);
  });
  const heartbeat = setInterval(() => { for (const client of clients) client.write(': keepalive\n\n'); }, 20000);
  saveJSON(path.join(stateDir(root), 'server.json'), { pid: process.pid, root, url: origin, command: `node ${fileURLToPath(import.meta.url)} serve ${JSON.stringify(root)} ${server.address().port}` });
  return { server, url: origin, root, close: async () => {
    watcher.close(); clearTimeout(timer); clearInterval(heartbeat);
    for (const client of clients) client.end();
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  } };
}

async function main() {
  const [command, directory, extra, timeoutArg] = process.argv.slice(2);
  if (!directory || !['serve', 'poll', 'ack', 'check', 'archive'].includes(command)) {
    console.log('Usage: node preview.mjs serve ROOT [PORT]\n       node preview.mjs poll ROOT [AFTER_SEQ] [SECONDS<=50]\n       node preview.mjs ack ROOT SEQ [MESSAGE]\n       node preview.mjs check ROOT\n       node preview.mjs archive ROOT'); return;
  }
  const root = fs.realpathSync(directory);
  if (command === 'archive') { console.log(JSON.stringify({ archive: archiveReview(root) })); return; }
  if (command === 'check') { loadManifest(root); console.log('PASS: manifest, screen types, modes, variants, files, and flow links'); return; }
  if (command === 'serve') {
    const port = Number(extra ?? 4317);
    if (!Number.isInteger(port) || port < 0 || port > 65535) fail('잘못된 포트');
    const marker = path.join(stateDir(root), 'server.json');
    if (fs.existsSync(marker)) {
      const old = readJSON(marker); let alive = false;
      try { process.kill(old.pid, 0); alive = true; } catch {}
      if (alive) fail(`이 리뷰 서버가 실행 중일 수 있습니다. 먼저 확인하세요: ${old.url} (PID ${old.pid})`);
    }
    const review = await createReviewServer(root, port);
    console.log(JSON.stringify({ url: review.url, root, pid: process.pid }));
    for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, async () => { await review.close(); process.exit(0); });
    return;
  }
  fs.mkdirSync(stateDir(root), { recursive: true });
  const ackFile = path.join(stateDir(root), 'ack.json');
  if (command === 'ack') {
    const seq = Number(extra);
    if (!events(root).some(e => e.seq === seq)) fail('존재하지 않는 피드백 번호');
    saveJSON(ackFile, { seq, message: timeoutArg ?? '반영 완료', at: new Date().toISOString() });
    console.log(`Acknowledged ${seq}`); return;
  }
  const after = extra === undefined ? (fs.existsSync(ackFile) ? readJSON(ackFile).seq : 0) : Number(extra);
  const seconds = Number(timeoutArg ?? 50);
  if (!Number.isInteger(after) || after < 0 || !Number.isFinite(seconds) || seconds < 0 || seconds > 50) fail('잘못된 대기 설정');
  const deadline = Date.now() + seconds * 1000;
  do {
    saveJSON(path.join(stateDir(root), 'worker.json'), { at: Date.now(), after });
    const pending = events(root).filter(e => e.seq > after);
    if (pending.length) { console.log(JSON.stringify({ events: pending, cursor: pending.at(-1).seq })); return; }
    await delay(500);
  } while (Date.now() < deadline);
  console.log(JSON.stringify({ events: [], cursor: after }));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch(error => { console.error(error.message); process.exitCode = 1; });

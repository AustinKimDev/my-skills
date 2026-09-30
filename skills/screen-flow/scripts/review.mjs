#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const template = fileURLToPath(new URL('../assets/viewer/', import.meta.url));
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const edgeTypes = new Set(['primary', 'optional', 'return']);
const imageExtension = /\.(png|jpe?g|webp|avif|gif|svg)$/i;
const fail = (message) => { throw new Error(message); };
const list = (value, name) => Array.isArray(value) ? value : fail(`${name} must be an array`);
const text = (value, name) => typeof value === 'string' && value.trim() ? value : fail(`${name} must be nonempty text`);
const id = (value, name) => idPattern.test(text(value, name)) ? value : fail(`${name} must be lowercase kebab-case`);
const integer = (value, name, min = 0) => Number.isSafeInteger(value) && value >= min ? value : fail(`${name} must be an integer >= ${min}`);
function unique(values, label) {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) fail(`Duplicate ${label}: ${value}`);
    seen.add(value);
  }
  return seen;
}
function localImage(root, relative) {
  if (relative === undefined || relative === null || relative === '') return false;
  text(relative, 'image');
  if (path.isAbsolute(relative) || /[:\\?#%\u0000-\u001f]/.test(relative) || relative.split('/').includes('..') || !imageExtension.test(relative)) {
    fail(`Image must be a local relative image path: ${relative}`);
  }
  const target = path.resolve(root, relative);
  if (!fs.existsSync(target)) return false;
  const realRoot = fs.realpathSync(root), realTarget = fs.realpathSync(target);
  if (!realTarget.startsWith(realRoot + path.sep) || !fs.statSync(realTarget).isFile()) fail(`Image escapes the artifact or is not a file: ${relative}`);
  return true;
}
function check(root, data, requireImages) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) fail('Catalog must be an object');
  const sections = list(data.sections, 'sections'), screens = list(data.screens, 'screens'), flows = list(data.flows, 'flows');
  if (flows.length !== 1) fail('Use exactly one flow for the whole screen map');
  if (!data.meta || typeof data.meta !== 'object' || Array.isArray(data.meta)) fail('meta must be an object');
  text(data.meta.title, 'meta.title');
  if (data.meta.defaultMode !== undefined && !['all', 'graph'].includes(data.meta.defaultMode)) fail('defaultMode must be all or graph');
  const sectionIds = unique(sections.map((s) => { text(s.title, 'section.title'); return id(s.id, 'section.id'); }), 'section ID');
  const available = new Map();
  const screenIds = unique(screens.map((s) => {
    id(s.id, 'screen.id'); text(s.title, `screen ${s.id} title`); text(s.description, `screen ${s.id} description`);
    if (!sectionIds.has(s.section)) fail(`Unknown section for screen ${s.id}: ${s.section}`);
    if (!['new', 'existing', 'edit'].includes(s.kind)) fail(`Invalid screen kind: ${s.id}`);
    available.set(s.id, localImage(root, s.image));
    return s.id;
  }), 'screen ID');
  const flow = flows[0]; id(flow.id, 'flow.id'); text(flow.title, 'flow.title');
  const nodes = list(flow.nodes, 'nodes'), edges = list(flow.edges, 'edges'), groups = list(flow.groups ?? [], 'groups');
  const nodeIds = unique(nodes.map((n) => {
    if (!screenIds.has(n.id)) fail(`Unknown screen node: ${n.id}`);
    integer(n.col, `${n.id}.col`); integer(n.row, `${n.id}.row`);
    return n.id;
  }), 'screen node');
  unique(nodes.map((n) => `${n.col},${n.row}`), 'node coordinate');
  for (const sid of screenIds) if (!nodeIds.has(sid)) fail(`Screen is missing from the map: ${sid}`);
  unique(edges.map((e) => {
    if (!nodeIds.has(e.from) || !nodeIds.has(e.to)) fail(`Dangling edge: ${e.from} -> ${e.to}`);
    if (e.from === e.to) fail(`Self edge: ${e.from}; use a distinct state node when needed`);
    if (!edgeTypes.has(e.type)) fail(`Unknown edge type: ${e.type}`);
    text(e.label, `edge ${e.from} -> ${e.to} label`);
    return JSON.stringify([e.from, e.to, e.type, e.label]);
  }), 'edge');
  unique(groups.map((g) => {
    id(g.id, 'group.id'); text(g.title, 'group.title');
    integer(g.col, `${g.id}.col`); integer(g.row, `${g.id}.row`); integer(g.cols, `${g.id}.cols`, 1); integer(g.rows, `${g.id}.rows`, 1);
    return g.id;
  }), 'group ID');
  const warnings = [];
  const entries = data.meta.entryScreenIds ?? nodes.slice(0, 1).map((n) => n.id);
  list(entries, 'meta.entryScreenIds'); unique(entries, 'entry screen');
  if (data.meta.entryScreenIds === undefined && nodes.length) warnings.push('Entry screen inferred from the first node; declare meta.entryScreenIds explicitly.');
  if (screens.length && !entries.length) fail('A nonempty catalog requires at least one entry screen');
  for (const entry of entries) if (!nodeIds.has(entry)) fail(`Unknown entry screen: ${entry}`);
  const adjacency = new Map(nodes.map((n) => [n.id, []]));
  for (const edge of edges) adjacency.get(edge.from).push(edge.to);
  const reachable = new Set(entries), queue = [...entries];
  for (let i = 0; i < queue.length; i++) for (const target of adjacency.get(queue[i])) {
    if (!reachable.has(target)) { reachable.add(target); queue.push(target); }
  }
  const unreachable = [...nodeIds].filter((sid) => !reachable.has(sid));
  if (unreachable.length) fail(`Unreachable screens: ${unreachable.join(', ')}`);
  const pending = screens.filter((s) => !available.get(s.id)).map((s) => s.id);
  if (!screens.length) warnings.push('Empty starter catalog; no screens have been designed.');
  if (pending.length) warnings.push(`Missing image files: ${pending.join(', ')}`);
  if (requireImages && (!screens.length || pending.length)) fail('Image completion check failed: empty catalog or missing images');
  return { available, report: { screens: screens.length, ready: screens.length - pending.length, pending, flows: 1, edges: edges.length, groups: groups.length, entries, warnings } };
}
function initialize(root, title) {
  if (fs.existsSync(root) && (!fs.statSync(root).isDirectory() || fs.readdirSync(root).length)) fail('init requires a new or empty output directory');
  fs.mkdirSync(root, { recursive: true });
  for (const file of ['index.html', 'viewer.css', 'viewer.js']) fs.copyFileSync(path.join(template, file), path.join(root, file), fs.constants.COPYFILE_EXCL);
  fs.mkdirSync(path.join(root, 'images'));
  const data = {
    meta: { title, description: '화면과 이동 경로를 등록하면 전체 시안과 연결 지도를 함께 볼 수 있습니다.', notice: '화면과 연결은 검토용 제안이며 실제 앱 구현·동작 검증을 뜻하지 않습니다.', defaultMode: 'all', entryScreenIds: [] },
    sections: [], screens: [], flows: [{ id: 'all', title: '전체 화면 흐름', description: '검토할 화면과 이동 경로', nodes: [], edges: [], groups: [] }],
  };
  fs.writeFileSync(path.join(root, 'flow.json'), JSON.stringify(data, null, 2) + '\n', { flag: 'wx' });
  return { initialized: root, ...check(root, data, false).report };
}
function main() {
  const args = process.argv.slice(2), command = args.shift();
  if (!command || command === '--help' || command === '-h') {
    console.log('Usage: node review.mjs init <output> [--title <title>]\n       node review.mjs build|validate <output> [--require-images]');
    return;
  }
  if (!['init', 'build', 'validate'].includes(command)) fail(`Unknown command: ${command}`);
  const target = args.shift(); if (!target || target.startsWith('--')) fail('Provide an output directory');
  let title = '프로젝트 · 전체 화면과 흐름', requireImages = false;
  while (args.length) {
    const flag = args.shift();
    if (flag === '--title' && command === 'init') title = text(args.shift(), '--title');
    else if (flag === '--require-images' && command !== 'init') requireImages = true;
    else fail(`Unknown option: ${flag}`);
  }
  const root = path.resolve(target);
  if (command === 'init') { console.log(JSON.stringify(initialize(root, title), null, 2)); return; }
  const file = path.join(root, 'flow.json'), data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const { available, report } = check(root, data, requireImages);
  if (command === 'build') {
    for (const screen of data.screens) screen.status = available.get(screen.id) ? 'ready' : 'pending';
    const temp = path.join(root, `.flow-${process.pid}.tmp`);
    let created = false;
    try { fs.writeFileSync(temp, JSON.stringify(data, null, 2) + '\n', { flag: 'wx' }); created = true; fs.renameSync(temp, file); }
    finally { if (created && fs.existsSync(temp)) fs.unlinkSync(temp); }
  }
  console.log(JSON.stringify({ command, ...report }, null, 2));
}
try { main(); } catch (error) { console.error(`screen-flow: ${error.message}`); process.exitCode = 1; }

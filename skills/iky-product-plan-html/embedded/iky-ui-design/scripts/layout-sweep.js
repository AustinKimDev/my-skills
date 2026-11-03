// Browser-side layout sweep for two defects that box-overlap and overflow checks miss.
// Load this source into the page and call layoutSweep(options); it returns an array of findings.
//   empty  - a visible block at least 16x16 with no text, control or painted surface that sits
//            on its own vertical band (nothing beside it), i.e. a gap that reserves space for nothing
//            (a header with every child hidden, an empty wrapper left after content moved).
//   ragged - rows of one vertical list whose first text glyph starts at different x positions
//            (a leading tag or chip counts by its box, not its text). Lists laid out side by side are skipped.
// Each finding: { rule, name, note }. An empty array means clean for this screen and state.
// Options (all optional):
//   lists   - selector for vertical lists to compare (default 'ul,ol,tbody,[role=list],[role=rowgroup]')
//   hidden  - selector for visually hidden helpers to ignore (default '.sr-only,.visually-hidden,.vh')
//   tag     - selector for leading tags/chips aligned by their box (default '.tag,.chip,.badge')
//   minRows - smallest list to compare (default 3)
//   tolerance - allowed x difference in px (default 2)
// eslint-disable-next-line no-unused-vars
function layoutSweep(options) {
  const o = Object.assign({ lists: 'ul,ol,tbody,[role=list],[role=rowgroup]', hidden: '.sr-only,.visually-hidden,.vh', tag: '.tag,.chip,.badge', minRows: 3, tolerance: 2 }, options || {});
  const out = [];
  const CTRL = 'input,button,select,textarea,img,svg,canvas,video,iframe,picture,[role=img],[role=button],[role=switch],[role=progressbar],[role=slider],[role=checkbox],[role=radio],[contenteditable]';
  const vis = (e) => {
    if (e.checkVisibility && !e.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) return false;
    const r = e.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const alpha = (c) => {
    if (!c || c === 'transparent') return 0;
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return 1;
    const p = m[1].split(/[ ,/]+/).filter(Boolean);
    return p.length > 3 ? parseFloat(p[3]) : 1;
  };
  const surface = (e) => {
    const s = getComputedStyle(e);
    if (alpha(s.backgroundColor) > 0.01 || s.backgroundImage !== 'none' || s.boxShadow !== 'none') return true;
    return ['Top', 'Right', 'Bottom', 'Left'].some((d) => parseFloat(s['border' + d + 'Width']) > 0 && s['border' + d + 'Style'] !== 'none' && alpha(s['border' + d + 'Color']) > 0.01);
  };
  const memo = new Map();
  const content = (e) => {
    if (memo.has(e)) return memo.get(e);
    let c = false;
    if (vis(e) && !e.matches(o.hidden)) {
      if (e.matches(CTRL) || surface(e)) c = true;
      else {
        for (const n of e.childNodes) if (n.nodeType === 3 && n.data.trim()) { c = true; break; }
        if (!c) for (const k of e.children) if (content(k)) { c = true; break; }
      }
    }
    memo.set(e, c);
    return c;
  };
  const cls = (x) => String(x.className && x.className.baseVal !== undefined ? x.className.baseVal : x.className || '').trim().split(/\s+/).filter(Boolean).slice(0, 2).join('.');
  const nm = (e) => {
    const p = e.parentElement;
    return (p ? p.tagName.toLowerCase() + (cls(p) ? '.' + cls(p) : '') + ' > ' : '') + e.tagName.toLowerCase() + (cls(e) ? '.' + cls(e) : '');
  };
  const walk = (e) => {
    for (const k of e.children) {
      if (k.matches('script,style,template,noscript') || k.matches(o.hidden) || !vis(k)) continue;
      const r = k.getBoundingClientRect();
      if (r.height >= 16 && r.width >= 16 && !content(k)) {
        const shares = [...k.parentElement.children].some((x) => {
          if (x === k || !vis(x)) return false;
          const b = x.getBoundingClientRect();
          return Math.min(b.bottom, r.bottom) - Math.max(b.top, r.top) > 1;
        });
        if (!shares) out.push({ rule: 'empty', name: nm(k), note: Math.round(r.width) + 'x' + Math.round(r.height) });
        continue;
      }
      walk(k);
    }
  };
  walk(document.body);
  const glyph = (row) => {
    const tw = document.createTreeWalker(row, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => {
        const p = n.parentElement;
        return n.data.trim() && p && vis(p) && !p.closest(o.hidden + ',[aria-hidden="true"]') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });
    const n = tw.nextNode();
    if (!n) return null;
    const i = n.data.search(/\S/);
    const rg = document.createRange();
    rg.setStart(n, i);
    rg.setEnd(n, i + 1);
    const tg = n.parentElement.closest(o.tag);
    return { x: tg && row.contains(tg) ? tg.getBoundingClientRect().left : rg.getBoundingClientRect().left, t: n.data.trim().slice(0, 10) };
  };
  for (const list of new Set(document.querySelectorAll(o.lists))) {
    if (!vis(list)) continue;
    const kids = [...list.children].filter(vis);
    if (new Set(kids.map((k) => Math.round(k.getBoundingClientRect().top))).size < kids.length) continue;
    const xs = kids.map(glyph).filter(Boolean);
    if (xs.length < o.minRows) continue;
    const cnt = {};
    xs.forEach((g) => { const k = Math.round(g.x); cnt[k] = (cnt[k] || 0) + 1; });
    const mode = +Object.entries(cnt).sort((a, b) => b[1] - a[1])[0][0];
    const odd = xs.filter((g) => Math.abs(g.x - mode) > o.tolerance);
    if (odd.length) out.push({ rule: 'ragged', name: nm(list), note: 'x' + mode + ' ' + odd.length + '/' + xs.length + ' off: ' + odd.slice(0, 3).map((g) => g.t + '@' + Math.round(g.x)).join(', ') });
  }
  return out;
}

(() => {
  const root = document.documentElement;
  const themeButtons = [...document.querySelectorAll('[data-appearance]')];
  const media = matchMedia('(prefers-color-scheme: dark)');
  let theme = 'system';
  try { theme = localStorage.getItem('product-plan-theme') || 'system'; } catch (_) {}
  function applyTheme(value) {
    theme = ['system', 'light', 'dark'].includes(value) ? value : 'system';
    root.dataset.theme = theme === 'system' ? (media.matches ? 'dark' : 'light') : theme;
    themeButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.appearance === theme)));
    try { localStorage.setItem('product-plan-theme', theme); } catch (_) {}
  }
  themeButtons.forEach(button => button.addEventListener('click', () => applyTheme(button.dataset.appearance)));
  media.addEventListener('change', () => applyTheme(theme));
  applyTheme(theme);
  const search = document.getElementById('feature-search');
  const features = [...document.querySelectorAll('[data-search]')];
  const details = [...document.querySelectorAll('details')];
  const status = document.getElementById('search-status');
  function filter() {
    const query = search.value.trim().toLocaleLowerCase();
    features.forEach(feature => feature.hidden = Boolean(query) && !feature.textContent.toLocaleLowerCase().includes(query));
    const count = features.filter(feature => !feature.hidden).length;
    status.textContent = query ? `기능·설명 ${features.length}개 중 ${count}개 일치 · 개요와 공통 표는 계속 표시됩니다.` : `기능·설명 ${features.length}개 · 상세 정책은 펼쳐서 확인할 수 있습니다.`;
    document.getElementById('empty').hidden = count !== 0;
  }
  search.addEventListener('input', filter);
  filter();
  document.getElementById('expand-all').addEventListener('click', () => details.forEach(detail => detail.open = true));
  document.getElementById('collapse-all').addEventListener('click', () => details.forEach(detail => detail.open = false));
  let printState = null;
  window.addEventListener('beforeprint', () => {
    if (printState) return;
    printState = details.map(detail => detail.open);
    details.forEach(detail => detail.open = true);
    features.forEach(feature => feature.hidden = false);
    document.getElementById('empty').hidden = true;
  });
  window.addEventListener('afterprint', () => {
    if (!printState) return;
    details.forEach((detail, index) => detail.open = printState[index]);
    printState = null;
    filter();
  });
  document.getElementById('print').addEventListener('click', () => window.print());
  const nav = [...document.querySelectorAll('nav a')];
  const sections = [...document.querySelectorAll('main > section, main > header')];
  let scheduled = false;
  function markSection() {
    scheduled = false;
    let current = sections[0];
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= innerHeight * .25) current = section;
    });
    nav.forEach(link => link.setAttribute('aria-current', String(link.hash === '#' + current.id)));
  }
  function scheduleMark() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(markSection); }
  }
  window.addEventListener('scroll', scheduleMark, { passive: true });
  window.addEventListener('resize', scheduleMark);
  markSection();
  function revealHash() {
    const id = decodeURIComponent(location.hash.substring(1));
    const target = id && document.getElementById(id);
    if (target && target.closest('[data-search]')?.hidden) {
      search.value = ''; filter(); target.scrollIntoView();
    }
  }
  window.addEventListener('hashchange', revealHash);
  revealHash();
})();

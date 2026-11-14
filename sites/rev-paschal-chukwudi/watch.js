/* Archive filtering — progressive: without JS every card is simply listed. */
(() => {
  'use strict';
  const grid = document.getElementById('archiveGrid');
  const buttons = Array.from(document.querySelectorAll('.filter'));
  const empty = document.getElementById('archiveEmpty');
  if (!grid || !buttons.length) return;

  const cards = Array.from(grid.querySelectorAll('.arc-card'));

  const apply = (key, push) => {
    let shown = 0;
    cards.forEach((card) => {
      const match = key === 'all' || card.dataset.cat === key;
      card.hidden = !match;
      if (match) shown += 1;
    });
    buttons.forEach((b) => {
      const on = b.dataset.filter === key;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if (empty) empty.hidden = shown !== 0;
    if (push) {
      // Keep any other query parameters intact; only the filter is ours.
      const params = new URLSearchParams(location.search);
      if (key === 'all') params.delete('kind');
      else params.set('kind', key);
      const qs = params.toString();
      try {
        history.replaceState(null, '', location.pathname + (qs ? `?${qs}` : '') + location.hash);
      } catch { /* file:// or sandboxed */ }
    }
  };

  buttons.forEach((b) => {
    b.addEventListener('click', () => apply(b.dataset.filter, true));
  });

  const start = new URLSearchParams(location.search).get('kind');
  const valid = buttons.some((b) => b.dataset.filter === start);
  apply(valid ? start : 'all', false);
})();

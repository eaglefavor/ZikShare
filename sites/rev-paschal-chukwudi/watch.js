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
    if (push && history.replaceState) {
      const url = key === 'all' ? location.pathname + location.search : '?kind=' + key;
      history.replaceState(null, '', url);
    }
  };

  buttons.forEach((b) => {
    b.addEventListener('click', () => apply(b.dataset.filter, true));
  });

  const start = new URLSearchParams(location.search).get('kind');
  const valid = buttons.some((b) => b.dataset.filter === start);
  apply(valid ? start : 'all', false);
})();

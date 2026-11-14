/* Books — catalogue + order sheet.
   ------------------------------------------------------------------
   TO EDIT THE CATALOGUE, edit BOOKS below. Nothing else needs to change.

   {
     id:    'short-slug',              // used in the URL (#order=slug)
     title: 'Book title',
     sub:   'Optional subtitle',       // '' if none
     blurb: 'Two or three sentences.',
     pages: 128,                       // optional — omit or null to hide
     year:  2024,                      // optional
     cover: 'assets/books/slug.jpg',   // optional — a typographic cover is
                                       // drawn when this is missing
     hard:  5000,                      // printed copy, naira. null = not sold
     soft:  1500,                      // soft copy, naira. null = not sold
     softFree: false,                  // true = free download, no payment
     softFile: 'https://…/book.pdf',   // direct link used only when softFree
   }
   ------------------------------------------------------------------ */

const BOOKS = [];

/* Price formatting ─────────────────────────────────────────────── */
const NAIRA = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
});
const money = (n) => (n == null ? null : NAIRA.format(n).replace('NGN', '₦').replace(/\s/g, ''));
const priceText = (n) => (n === 0 ? 'Free' : money(n));

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const grid = document.getElementById('shelfGrid');
const empty = document.getElementById('shelfEmpty');

/* ── Render the shelf ─────────────────────────────────────────── */
const coverMarkup = (book) => {
  if (book.cover) {
    return `<img class="book__img" src="${esc(book.cover)}" alt="Cover of ${esc(book.title)}" loading="lazy" />`;
  }
  const initials = book.title
    .split(/\s+/)
    .filter((w) => /[A-Za-z]/.test(w[0] || ''))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
  return `<span class="book__type" aria-hidden="true">
      <span class="book__type-mark">${esc(initials)}</span>
      <span class="book__type-title">${esc(book.title)}</span>
      <span class="book__type-author">Rev. Paschal Chukwudi</span>
    </span>`;
};

const priceRow = (label, value, note) => `
  <div class="book__price">
    <span class="book__price-label">${label}</span>
    <strong class="book__price-value">${value}</strong>
    <small class="book__price-note">${note}</small>
  </div>`;

const card = (book) => {
  const hard = priceText(book.hard);
  const soft = priceText(book.soft);
  const meta = [book.pages ? `${book.pages} pages` : null, book.year || null]
    .filter(Boolean)
    .join(' · ');

  const hardAction = hard
    ? `<button class="btn btn--solid btn--sm book__btn" type="button" data-order="${esc(book.id)}" data-format="hard">
         Order hardcopy
       </button>`
    : '';

  const softAction = soft
    ? `<button class="btn btn--line btn--sm book__btn" type="button" data-order="${esc(book.id)}" data-format="soft">
         ${book.softFree ? 'Download soft copy' : 'Get soft copy'}
       </button>`
    : '';

  return `
    <article class="book" data-reveal>
      <div class="book__cover">${coverMarkup(book)}</div>
      <div class="book__body">
        ${meta ? `<p class="book__meta">${esc(meta)}</p>` : ''}
        <h3 class="book__title">${esc(book.title)}</h3>
        ${book.sub ? `<p class="book__sub">${esc(book.sub)}</p>` : ''}
        ${book.blurb ? `<p class="book__blurb">${esc(book.blurb)}</p>` : ''}
        <div class="book__prices">
          ${hard ? priceRow('Hardcopy', hard, 'Printed · delivered to you') : ''}
          ${soft ? priceRow('Soft copy', soft, book.softFree ? 'PDF · free download' : 'PDF · sent by email') : ''}
        </div>
        <div class="book__actions">${hardAction}${softAction}</div>
      </div>
    </article>`;
};

if (grid) {
  if (BOOKS.length) {
    grid.innerHTML = BOOKS.map(card).join('');
    grid.classList.add('is-filled');
    if (empty) empty.hidden = true;
    // Let the shared reveal observer pick up the freshly injected cards.
    document.dispatchEvent(new CustomEvent('books:rendered'));
  } else if (empty) {
    empty.hidden = false;
  }
}

/* ── Order sheet ──────────────────────────────────────────────── */
const sheet = document.getElementById('orderSheet');
const form = document.getElementById('orderForm');
const titleEl = document.getElementById('sheetTitle');
const totalEl = document.getElementById('orderTotal');
const hintEl = document.getElementById('orderHint');
const hardFields = document.getElementById('hardFields');
const qtyEl = document.getElementById('orderQty');

if (sheet && form && grid) {
  let current = null;
  let format = 'hard';

  const pickButtons = Array.from(sheet.querySelectorAll('[data-pick]'));
  const priceHardEl = sheet.querySelector('[data-price-hard]');
  const priceSoftEl = sheet.querySelector('[data-price-soft]');

  const total = () => {
    if (!current) return 0;
    const unit = format === 'hard' ? current.hard : current.soft;
    if (unit == null) return 0;
    const qty = format === 'hard' ? Math.max(1, Number(qtyEl.value) || 1) : 1;
    return unit * qty;
  };

  const repaint = () => {
    if (!current) return;
    pickButtons.forEach((b) => {
      const on = b.dataset.pick === format;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.disabled = (b.dataset.pick === 'hard' ? current.hard : current.soft) == null;
    });
    const hardAvailable = current.hard != null;
    hardFields.hidden = !(format === 'hard' && hardAvailable);
    hardFields.querySelectorAll('input').forEach((i) => {
      i.required = format === 'hard' && hardAvailable;
    });
    const t = total();
    totalEl.textContent = t ? money(t) : '—';
    hintEl.textContent = format === 'hard'
      ? 'Delivery is charged separately and confirmed by the office before dispatch.'
      : (current.softFree
        ? 'This one is free — the download link opens straight away.'
        : 'The soft copy is emailed once payment is confirmed.');
  };

  const open = (book, wanted) => {
    if (!book) return;
    current = book;
    format = (wanted === 'soft' && book.soft != null) || book.hard == null ? 'soft' : 'hard';
    titleEl.textContent = book.title;
    priceHardEl.textContent = book.hard == null ? 'Not sold' : priceText(book.hard);
    priceSoftEl.textContent = book.soft == null ? 'Not sold' : priceText(book.soft);
    qtyEl.value = '1';
    repaint();

    if (format === 'soft' && book.softFree && book.softFile) {
      window.location.href = book.softFile;
      return;
    }

    if (typeof sheet.showModal === 'function') sheet.showModal();
    else sheet.setAttribute('open', '');
    document.body.classList.add('is-locked');
    window.setTimeout(() => document.getElementById('orderName')?.focus(), 60);
  };

  const close = () => {
    if (typeof sheet.close === 'function') sheet.close();
    else sheet.removeAttribute('open');
    document.body.classList.remove('is-locked');
    current = null;
  };

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-order]');
    if (!btn) return;
    const book = BOOKS.find((b) => b.id === btn.dataset.order);
    open(book, btn.dataset.format);
  });

  pickButtons.forEach((b) => b.addEventListener('click', () => {
    format = b.dataset.pick;
    repaint();
  }));

  qtyEl?.addEventListener('input', repaint);
  document.getElementById('sheetClose')?.addEventListener('click', close);
  sheet.addEventListener('click', (e) => { if (e.target === sheet) close(); });
  sheet.addEventListener('close', () => document.body.classList.remove('is-locked'));
  sheet.addEventListener('cancel', () => document.body.classList.remove('is-locked'));

  // Deep link: books.html#order=slug
  const m = /order=([\w-]+)/.exec(location.hash);
  if (m) {
    const book = BOOKS.find((b) => b.id === m[1]);
    if (book) open(book, 'hard');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!current) return;

    const fields = [document.getElementById('orderName'), document.getElementById('orderPhone'), document.getElementById('orderEmail')];
    if (format === 'hard') fields.push(document.getElementById('orderAddress'), document.getElementById('orderCity'));
    const bad = fields.find((f) => f && !f.value.trim());
    if (bad) {
      bad.focus();
      bad.reportValidity?.();
      return;
    }

    const name = document.getElementById('orderName').value.trim();
    const phone = document.getElementById('orderPhone').value.trim();
    const email = document.getElementById('orderEmail').value.trim();
    const qty = format === 'hard' ? Math.max(1, Number(qtyEl.value) || 1) : 1;
    const address = document.getElementById('orderAddress').value.trim();
    const city = document.getElementById('orderCity').value.trim();
    const unit = format === 'hard' ? current.hard : current.soft;
    const sum = unit * qty;

    const label = format === 'hard' ? 'Hardcopy' : 'Soft copy';
    const subject = `Book order — ${current.title} (${label})`;
    const lines = [
      `Title: ${current.title}${current.sub ? ` — ${current.sub}` : ''}`,
      `Format: ${label}`,
      `Quantity: ${qty}`,
      `Price: ${money(unit)} each`,
      `Total: ${money(sum)}`,
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
    ];
    if (format === 'hard') {
      lines.push(`Address: ${address}`, `City / State: ${city}`);
      lines.push('', 'Delivery fee to be confirmed by the office before dispatch.');
    } else {
      lines.push('', 'Please email the soft copy to the address above once payment is confirmed.');
    }
    lines.push('', 'Payment made to: Access Bank Plc · Remnant Christian Network Anambra · 0826965262', `Transfer reference: ${name}`);

    const href = `mailto:rcnanambra@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;

    if (current.softFree && format === 'soft' && current.softFile) {
      window.location.href = current.softFile;
      return;
    }

    window.location.href = href;
    hintEl.textContent = 'Your email app should now be open with the order — send it and the office will reply.';
  });
}

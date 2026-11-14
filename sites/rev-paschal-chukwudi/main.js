/* Rev. Paschal Chukwudi — interaction layer
   Everything here is progressive: the page reads fine without JS. */

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ── Preloader ───────────────────────────────────────────── */
  const preloader = $('#preloader');
  const bar = $('#preloaderBar');
  const counter = $('#preloaderCount');

  let visited = false;
  try {
    visited = sessionStorage.getItem('rpc-seen') === '1';
    sessionStorage.setItem('rpc-seen', '1');
  } catch { /* private mode — always show it */ }

  const boot = () => {
    if (!preloader || reduceMotion || visited) {
      document.body.classList.add('is-ready');
      preloader?.remove();
      return;
    }
    let n = 0;
    const tick = window.setInterval(() => {
      n = Math.min(100, n + Math.ceil(Math.random() * 11));
      if (counter) counter.textContent = String(n);
      if (bar) bar.style.width = n + '%';
      if (n >= 100) {
        window.clearInterval(tick);
        window.setTimeout(() => {
          preloader.classList.add('is-done');
          document.body.classList.add('is-ready');
          window.setTimeout(() => preloader.remove(), 1200);
        }, 260);
      }
    }, 95);
  };

  // Start as soon as the markup is parsed — images must not hold the curtain.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
  // Safety net: never let anything hold the page hostage.
  window.setTimeout(() => {
    if (preloader && !document.body.classList.contains('is-ready')) boot();
  }, 2400);

  /* ── Sticky nav ──────────────────────────────────────────── */
  const nav = $('#nav');
  const onScrollNav = () => nav?.classList.toggle('is-stuck', window.scrollY > 40);
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* ── Mobile menu ─────────────────────────────────────────── */
  const navToggle = $('#navToggle');
  const menu = $('#menu');
  // Body scroll lock is shared by the menu, the video lightbox and the book
  // sheet — so it has to be derived from all three, never toggled blindly.
  const lightboxEl = $('#lightbox');
  const syncLock = () => {
    const locked = !!menu?.classList.contains('is-open') ||
      !!lightboxEl?.classList.contains('is-open') ||
      !!document.querySelector('dialog.sheet[open]');
    document.body.classList.toggle('is-locked', locked);
  };

  let lastFocus = null;

  const setMenu = (open) => {
    if (!menu || !navToggle) return;
    if (open === menu.classList.contains('is-open')) return;
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    if (open) {
      menu.removeAttribute('inert');
      lastFocus = document.activeElement;
      window.setTimeout(() => menu.querySelector('.menu__link')?.focus(), 320);
    } else {
      menu.setAttribute('inert', '');
      if (lastFocus && lastFocus !== document.body) lastFocus.focus?.();
      lastFocus = null;
    }
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', open);
    syncLock();
  };
  navToggle?.addEventListener('click', () => setMenu(!menu?.classList.contains('is-open')));
  $$('.menu__link').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { setMenu(false); closeVideo(); }
  });

  /* ── Reveal on scroll ────────────────────────────────────── */
  const io = ('IntersectionObserver' in window && !reduceMotion)
    ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
    : null;

  // Content rendered after load (the book shelf) must be able to ask for a
  // rescan — otherwise it stays at opacity 0 forever.
  const scanReveals = (scope = document) => {
    const found = Array.from(scope.querySelectorAll('[data-reveal]:not(.is-in)'));
    if (scope.matches?.('[data-reveal]:not(.is-in)')) found.push(scope);
    found.forEach((el) => (io ? io.observe(el) : el.classList.add('is-in')));
  };
  scanReveals();
  window.addEventListener('reveal:rescan', (e) => scanReveals(e.detail?.scope || document));
  window.__revealScan = scanReveals;

  /* ── Custom cursor ───────────────────────────────────────── */
  const cursor = $('#cursor');
  if (cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
    const dot = $('.cursor__dot', cursor);
    const ring = $('.cursor__ring', cursor);
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    }, { passive: true });

    let raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = window.requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) window.cancelAnimationFrame(raf);
      else raf = window.requestAnimationFrame(loop);
    });

    const hot = 'a, button, .sound, .feature__frame, [data-magnetic]';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hot)) cursor.classList.add('is-active');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hot)) cursor.classList.remove('is-active');
    });
  }

  /* ── Magnetic buttons ────────────────────────────────────── */
  if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    $$('[data-magnetic]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ── Scroll parallax ─────────────────────────────────────── */
  const parallaxEls = $$('[data-parallax]');
  const ghost = $('#heroGhost');
  if (!reduceMotion && (parallaxEls.length || ghost)) {
    let ticking = false;
    const apply = () => {
      const y = window.scrollY;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
        el.style.transform = `translate3d(0, ${Math.min(y * speed, 90)}px, 0)`;
      });
      if (ghost) {
        ghost.style.transform = `translate3d(calc(-50% - ${y * 0.14}px), ${y * -0.06}px, 0)`;
      }
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; window.requestAnimationFrame(apply); }
    }, { passive: true });
  }

  /* ── Accordion ───────────────────────────────────────────── */
  $$('.acc').forEach((acc, i) => {
    const head = $('.acc__head', acc);
    const body = $('.acc__body', acc);
    if (head && body && !body.id) {
      body.id = `acc-body-${i + 1}`;
      head.setAttribute('aria-controls', body.id);
    }
    head?.addEventListener('click', () => {
      const open = acc.classList.contains('is-open');
      $$('.acc').forEach((other) => {
        other.classList.remove('is-open');
        $('.acc__head', other)?.setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        acc.classList.add('is-open');
        head.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── Video lightbox ──────────────────────────────────────── */
  const lightbox = lightboxEl || $('#lightbox');
  const frame = $('#lightboxFrame');
  const closeBtn = $('#lightboxClose');

  let videoTrigger = null;

  function openVideo(id) {
    if (!lightbox || !frame) return;
    frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1"
      title="Worship video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>`;
    videoTrigger = document.activeElement;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    syncLock();
    closeBtn?.focus();
  }

  function closeVideo() {
    if (!lightbox || !lightbox.classList.contains('is-open')) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    syncLock();
    window.setTimeout(() => { frame.innerHTML = ''; }, 380);
    if (videoTrigger && videoTrigger !== document.body) videoTrigger.focus?.();
    videoTrigger = null;
  }

  $$('[data-video]').forEach((el) => {
    if (el.tagName !== 'BUTTON' && el.tagName !== 'A') {
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', `Play ${el.querySelector('h3')?.textContent?.trim() || 'video'}`);
    }
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openVideo(el.getAttribute('data-video'));
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openVideo(el.getAttribute('data-video'));
      }
    });
  });

  /* ── Thumbnail fallback (maxres -> hq) ───────────────────── */
  $$('img[data-yt]').forEach((img) => {
    img.addEventListener('error', () => {
      const id = img.getAttribute('data-yt');
      img.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      img.removeAttribute('data-yt');
    });
  });
  closeBtn?.addEventListener('click', closeVideo);
  lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeVideo(); });

  /* ── Invitation form → email ─────────────────────────────── */
  const form = $('#inviteForm');
  const note = $('#formNote');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const contact = String(data.get('contact') || '').trim();
    const type = String(data.get('type') || '').trim();
    const message = String(data.get('message') || '').trim();

    const subject = `Invitation: ${type} — ${name}`;
    const body = [
      `Name: ${name}`,
      `Contact: ${contact}`,
      `Gathering: ${type}`,
      '',
      message,
    ].join('\n');

    window.location.href = `mailto:rcnanambra@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (note) {
      note.textContent = 'Your email app is opening with the invitation ready to send. God bless you.';
      note.classList.add('is-ok');
    }
  });

  /* ── Count-up numbers ────────────────────────────────────── */
  $$('[data-count]').forEach((el) => {
    const target = Number(el.getAttribute('data-count'));
    if (!Number.isFinite(target) || reduceMotion) return;
    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      el.textContent = '0';
      const start = performance.now();
      const dur = 1200;
      const step = (now) => {
        const p = Math.min(1, (now - start) / dur);
        el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { run(); obs.disconnect(); }
        });
      }, { threshold: 0.6 });
      obs.observe(el);
    }
  });

  /* ── Next gathering countdown (Nigeria time) ─────────────── */
  const nextName = $('#nextName');
  const nextWhen = $('#nextWhen');
  const nextCount = $('#nextCount');
  if (nextName && nextWhen && nextCount) {
    const SCHEDULE = [
      { name: 'Mentality Shift', day: 3, utcHour: 16, label: 'Wednesday · 5:00 PM (WAT)' },
      { name: 'Quivers Night of Prayer', day: 5, utcHour: 20, label: 'Friday · 9:00 PM (WAT)' },
      { name: 'Build Up Service', day: 0, utcHour: 14, label: 'Sunday · 3:00 PM (WAT)' },
    ];
    const upcoming = () => {
      const now = new Date();
      let best = null;
      SCHEDULE.forEach((s) => {
        const when = new Date(Date.UTC(
          now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), s.utcHour, 0, 0
        ));
        while (when.getUTCDay() !== s.day || when.getTime() <= now.getTime()) {
          when.setUTCDate(when.getUTCDate() + 1);
        }
        if (!best || when < best.when) best = { name: s.name, label: s.label, when };
      });
      return best;
    };
    const tick = () => {
      const n = upcoming();
      const ms = n.when - new Date();
      const days = Math.floor(ms / 86400000);
      const hours = Math.floor((ms % 86400000) / 3600000);
      const mins = Math.floor((ms % 3600000) / 60000);
      nextName.textContent = n.name;
      nextWhen.textContent = n.label;
      nextCount.textContent = days > 0 ? `${days}d ${hours}h` : hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };
    tick();
    window.setInterval(tick, 30000);
  }

  /* ── Copy to clipboard ──────────────────────────────────── */
  $$('.copy-btn').forEach((btn) => {
    const original = btn.textContent;
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy') || '';
      const done = () => {
        btn.textContent = 'Copied ✓';
        btn.classList.add('is-copied');
        window.setTimeout(() => {
          btn.textContent = original;
          btn.classList.remove('is-copied');
        }, 2200);
      };
      try {
        await navigator.clipboard.writeText(text);
        done();
      } catch {
        window.prompt('Copy the account number:', text);
      }
    });
  });

  /* ── Year ────────────────────────────────────────────────── */
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ── Anchor offset for the fixed nav ─────────────────────── */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 72);
      window.scrollTo({ top: offset, behavior: reduceMotion ? 'auto' : 'smooth' });
      try { history.replaceState(null, '', id); } catch { /* file:// or sandboxed */ }
    });
  });
})();

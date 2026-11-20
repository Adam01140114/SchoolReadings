/* School Readings: builds the page from data.js, then handles filtering and search. */
(() => {
  'use strict';
  const { term, courses } = window.READINGS;
  const $ = (s) => document.querySelector(s);
  const slug = (c) => c.code.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const plural = (n, w) => `${n} ${w}${n === 1 ? '' : /(s|x|ch|sh)$/.test(w) ? 'es' : 's'}`;

  const SOURCES = {
    drive: { tag: 'In Drive', cls: 'drive', open: 'Open in Google Drive' },
    bookstore: { tag: 'Bookstore', cls: 'store', open: 'View at UCSC Bookstore' },
  };
  const ARROW = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const EMPTY_ICON = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M4 5h5a3 3 0 0 1 3 3v11a2.5 2.5 0 0 0-2.5-2.5H4zM20 5h-5a3 3 0 0 0-3 3v11a2.5 2.5 0 0 1 2.5-2.5H20z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';

  const state = { course: 'all', q: '' };

  /* ---------- header summary ---------- */
  const all = courses.flatMap((c) => c.readings);
  const inDrive = all.filter((r) => r.source === 'drive').length;
  const toBuy = all.filter((r) => r.source === 'bookstore');
  $('#title').textContent = `${term} Readings`;
  $('#summary').textContent = `${plural(all.length, 'book')} across ${plural(courses.length, 'class')} · ${inDrive} in Drive` +
    (toBuy.length ? ` · ${toBuy.length} to buy${toBuy.every((r) => r.optional) ? ' (optional)' : ''}` : '');

  /* ---------- filter chips ---------- */
  const chips = $('#chips');
  const chipList = [{ id: 'all', label: 'All classes', count: all.length }].concat(
    courses.map((c) => ({ id: slug(c), label: c.code, count: c.readings.length, hue: c.hue }))
  );
  chips.innerHTML = chipList.map((c) => `
    <button class="chip" type="button" role="radio" data-id="${c.id}" aria-checked="false"${c.hue != null ? ` style="--h:${c.hue}"` : ''}>
      ${c.hue != null ? '<span class="dot" aria-hidden="true"></span>' : ''}${esc(c.label)}<span class="count" aria-label="${plural(c.count, 'book')}">${c.count}</span>
    </button>`).join('');

  /* ---------- render ---------- */
  const highlight = (text, q) => {
    if (!q) return esc(text);
    const i = text.toLowerCase().indexOf(q);
    if (i < 0) return esc(text);
    return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length));
  };
  const matches = (c, r, q) => !q || [r.title, r.subtitle, r.authors, c.code, c.name].some((s) => s && s.toLowerCase().includes(q));

  function bookCard(c, r, q) {
    const src = SOURCES[r.source] || { tag: 'Link', cls: 'meta', open: 'Open link' };
    const label = `${r.title}${r.subtitle ? ': ' + r.subtitle : ''}, by ${r.authors}. ${src.open} (opens in a new tab)`;
    return `
      <li>
        <a class="book" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(label)}" style="--h:${c.hue}">
          <div class="cover">
            <img src="${esc(r.cover)}" alt="" loading="lazy" decoding="async" width="300" height="400"
                 onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'fallback',textContent:${esc(JSON.stringify(r.title))}}))">
          </div>
          <div class="book-body">
            <h3 class="book-title">${highlight(r.title, q)}</h3>
            ${r.subtitle ? `<p class="book-sub">${highlight(r.subtitle, q)}</p>` : ''}
            <p class="book-authors">${highlight(r.authors, q)}</p>
            <div class="book-meta">
              <span class="tag ${src.cls}">${src.tag}</span>
              ${r.optional ? '<span class="tag optional">Optional</span>' : ''}
              ${r.edition ? `<span class="tag meta">${esc(r.edition)}</span>` : ''}
              ${r.year ? `<span class="tag meta">${r.year}</span>` : ''}
            </div>
            <span class="book-open" aria-hidden="true">${src.open} ${ARROW}</span>
          </div>
        </a>
      </li>`;
  }

  function render() {
    const q = state.q.trim().toLowerCase();
    let shownBooks = 0, shownCourses = 0;
    const html = courses.map((c) => {
      if (state.course !== 'all' && state.course !== slug(c)) return '';
      const courseHit = q && (c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q));
      const books = c.readings.filter((r) => courseHit || matches(c, r, q));
      if (q && !books.length && !courseHit) return '';
      shownCourses++; shownBooks += books.length;
      const body = c.readings.length === 0
        ? `<div class="no-books">${EMPTY_ICON}<p><strong>No readings listed</strong>${esc(c.note || 'Nothing to buy for this class.')}</p></div>`
        : `<ul class="books" role="list">${books.map((r) => bookCard(c, r, q)).join('')}</ul>`;
      return `
        <section class="course" id="${slug(c)}" style="--h:${c.hue}" aria-labelledby="h-${slug(c)}">
          <div class="course-head">
            <span class="badge">${highlight(c.code, q)}${c.section ? `<span class="sec">· ${esc(c.section)}</span>` : ''}</span>
            <h2 id="h-${slug(c)}">${highlight(c.name, q)}</h2>
            <span class="course-count">${c.readings.length ? plural(c.readings.length, 'book') : 'No books'}</span>
          </div>
          ${body}
        </section>`;
    }).join('');

    $('#courses').innerHTML = html;
    const none = shownCourses === 0;
    $('#empty').hidden = !none;
    $('#empty-q').textContent = state.q.trim();
    $('#live').textContent = q ? (none ? 'No matching readings' : `${plural(shownBooks, 'book')} found`) : '';

    for (const b of chips.querySelectorAll('.chip')) b.setAttribute('aria-checked', String(b.dataset.id === state.course));
  }

  /* ---------- interactions ---------- */
  function setCourse(id, { scroll = true } = {}) {
    state.course = id;
    render();
    const chip = chips.querySelector(`[data-id="${id}"]`);
    chip && chip.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    history.replaceState(null, '', id === 'all' ? location.pathname + location.search : '#' + id);
    if (scroll) window.scrollTo({ top: Math.min(window.scrollY, $('.chips-bar').offsetTop), behavior: 'smooth' });
  }

  chips.addEventListener('click', (e) => {
    const b = e.target.closest('.chip');
    if (b) setCourse(b.dataset.id === state.course && b.dataset.id !== 'all' ? 'all' : b.dataset.id);
  });
  // arrow keys move between chips, like any radio group
  chips.addEventListener('keydown', (e) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    const list = [...chips.querySelectorAll('.chip')];
    let i = list.findIndex((b) => b.dataset.id === state.course);
    i = e.key === 'Home' ? 0 : e.key === 'End' ? list.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + list.length) % list.length;
    e.preventDefault();
    setCourse(list[i].dataset.id, { scroll: false });
    list[i].focus();
  });

  const input = $('#q');
  input.addEventListener('input', () => { state.q = input.value; render(); });
  input.addEventListener('keydown', (e) => { if (e.key === 'Escape') { input.value = ''; state.q = ''; render(); } });
  $('#clear').addEventListener('click', () => { input.value = ''; state.q = ''; render(); input.focus(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== input && !e.metaKey && !e.ctrlKey) { e.preventDefault(); input.focus(); }
  });

  // hairline under the class bar once it sticks to the top
  const bar = $('.chips-bar');
  const sentinel = document.createElement('div');
  bar.before(sentinel);
  new IntersectionObserver(([en]) => bar.classList.toggle('stuck', !en.isIntersecting)).observe(sentinel);

  // open straight to a class from a link like …/#educ-222 (on load, and on back/forward)
  const courseFromHash = () => { const id = location.hash.slice(1); return chipList.some((c) => c.id === id) ? id : 'all'; };
  window.addEventListener('hashchange', () => setCourse(courseFromHash(), { scroll: false }));
  state.course = courseFromHash();
  render();
})();

# PDF Full-Text Search Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add full-text search across all PDF rulebooks with a scope picker (All / Core / Setting / UA / Current Book), displayed as a dropdown in the rulebooks viewer header; also upgrade the PDF route to use the `send` package for automatic ETag/cache-control headers.

**Architecture:** Server-side lazy indexing via `pdfjs-dist` on Node.js — text is extracted page-by-page and stored as per-book JSON files in `web/data/search-index/`. A new `/api/pdf-search` route loads those files and does case-insensitive substring match. The `/api/pdf` route is replaced with `send(req, fullPath)` which handles Range, ETag, Last-Modified, and Cache-Control automatically. Client-side: a debounced search bar + scope `<select>` in the header, results rendered in a dismissible dropdown.

**Tech Stack:** Express.js (existing), `pdfjs-dist@3.11.174` (Node.js text extraction), `send` npm package (HTTP caching), vanilla JS/CSS.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `web/package.json` | Modify | Add `pdfjs-dist`, `send` as direct dependencies |
| `web/lib/pdf-indexer.js` | Create | Extract text page-by-page from a PDF; write per-book JSON index |
| `web/data/search-index/` | Create dir | Per-book index files (gitignored) |
| `web/server.js` | Modify | Add `/api/pdf-search` route + background indexing state; replace `/api/pdf` with `send` |
| `web/public/rulebooks.html` | Modify | Add `#pdf-search` input, `#search-scope` select, `#search-dropdown` div + CSS |
| `web/public/rulebooks.js` | Modify | Add search logic: debounce, fetch, render dropdown, keyboard nav |

---

### Task 1: Install dependencies

**Files:**
- Modify: `web/package.json`

- [ ] **Step 1: Install pdfjs-dist and send**

From a terminal in `web/`:
```bash
cd web
npm install pdfjs-dist@3.11.174 send
```

Expected output includes lines like:
```
added 2 packages, ...
```

- [ ] **Step 2: Verify pdfjs-dist loads in Node**

```bash
node -e "const p = require('pdfjs-dist/legacy/build/pdf.js'); console.log(p.version)"
```

Expected: `3.11.174`

- [ ] **Step 3: Verify send loads**

```bash
node -e "const send = require('send'); console.log(typeof send)"
```

Expected: `function`

- [ ] **Step 4: Create the search-index directory and add it to .gitignore**

```bash
mkdir -p web/data/search-index
```

Add to `.gitignore` (or `web/.gitignore` if it exists):
```
web/data/search-index/
```

- [ ] **Step 5: Commit**

```bash
git add web/package.json web/package-lock.json .gitignore
git commit -m "chore: add pdfjs-dist and send dependencies, gitignore search-index"
```

---

### Task 2: pdf-indexer.js — text extraction

**Files:**
- Create: `web/lib/pdf-indexer.js`

- [ ] **Step 1: Create `web/lib/` directory if it doesn't exist**

```bash
mkdir -p web/lib
```

- [ ] **Step 2: Create `web/lib/pdf-indexer.js`**

```js
'use strict';

const fs      = require('fs');
const path    = require('path');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

// Disable worker — not needed for text-only extraction in Node.js
pdfjsLib.GlobalWorkerOptions.workerSrc = false;

const INDEX_DIR = path.join(__dirname, '../data/search-index');

function safeId(bookId) {
  return bookId.replace(/[^a-z0-9]/gi, '_') + '.json';
}

function getIndexPath(bookId) {
  return path.join(INDEX_DIR, safeId(bookId));
}

function isIndexed(bookId) {
  return fs.existsSync(getIndexPath(bookId));
}

async function buildIndex(bookId, pdfPath) {
  fs.mkdirSync(INDEX_DIR, { recursive: true });

  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc  = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;

  const pages = [];
  for (let i = 1; i <= doc.numPages; i++) {
    try {
      const page    = await doc.getPage(i);
      const content = await page.getTextContent();
      // Join text items, collapse runs of whitespace to a single space
      const text = content.items
        .map(item => item.str)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
      if (text.length > 0) pages.push({ page: i, text });
    } catch {
      // Skip unreadable pages (image-only, corrupted, etc.)
    }
  }

  const index = { bookId, builtAt: new Date().toISOString(), pages };
  fs.writeFileSync(getIndexPath(bookId), JSON.stringify(index));
  return index;
}

function loadIndex(bookId) {
  const p = getIndexPath(bookId);
  if (!fs.existsSync(p)) return null;
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return null; }
}

module.exports = { buildIndex, loadIndex, isIndexed, getIndexPath };
```

- [ ] **Step 3: Smoke-test the indexer on a small book**

Pick a small UA book (e.g. `D&D 5E - UA - Artificer.pdf`, 191KB):

```bash
node -e "
const idx = require('./web/lib/pdf-indexer.js');
const path = require('path');
const p = 'C:/Users/joshu/OneDrive/Documents/dnd/01 - Core Books/Unearthed Arcana/D&D 5E - UA - Artificer.pdf';
idx.buildIndex('core/Unearthed Arcana/D&D 5E - UA - Artificer.pdf', p)
  .then(r => console.log('Pages indexed:', r.pages.length, '— first page snippet:', r.pages[0]?.text.slice(0, 100)))
  .catch(console.error);
"
```

Expected: `Pages indexed: <N> — first page snippet: Artificer...`
The file `web/data/search-index/core_Unearthed_Arcana_D_D_5E___UA___Artificer_pdf.json` should exist.

- [ ] **Step 4: Commit**

```bash
git add web/lib/pdf-indexer.js
git commit -m "feat: pdf-indexer — pdfjs-dist text extraction, per-book JSON index"
```

---

### Task 3: Server — `/api/pdf-search` route

**Files:**
- Modify: `web/server.js`

The existing `/api/search` route (line ~950) searches markdown files — leave it untouched. The new route is `/api/pdf-search`.

- [ ] **Step 1: Add require for pdf-indexer near the top of server.js**

Find the `require` block at the top of `web/server.js` (around lines 3–19). After the last `require`, add:

```js
const pdfIndexer = require('./lib/pdf-indexer');
```

- [ ] **Step 2: Add background-indexing state after the PDF_DIRS constants**

Find these lines (around line 29–31):
```js
const PDF_DIRS = {
  core:    process.env.PDF_DIR_CORE    || 'C:/Users/joshu/OneDrive/Documents/dnd/01 - Core Books',
  setting: process.env.PDF_DIR_SETTING || 'C:/Users/joshu/OneDrive/Documents/dnd/02 - Setting Books',
};
const ANNOTATIONS_FILE = path.join(CAMPAIGN_ROOT, 'web/data/pdf-annotations.json');
```

Add directly after `ANNOTATIONS_FILE`:
```js
const indexingNow = new Set(); // bookIds currently being indexed in background

function pdfPathForBook(book) {
  const baseDir = PDF_DIRS[book.bookId.startsWith('core') ? 'core' : 'setting'];
  const rel = book.bookId.split('/').slice(1).join(path.sep);
  return path.join(baseDir, rel);
}

function allBooksFlat() {
  const result = [];
  for (const [cat, dir] of Object.entries(PDF_DIRS)) {
    if (!fs.existsSync(dir)) continue;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.toLowerCase().endsWith('.pdf')) {
        result.push({ bookId: `${cat}/${entry.name}`, name: entry.name });
      } else if (entry.isDirectory()) {
        const subDir = path.join(dir, entry.name);
        try {
          for (const sub of fs.readdirSync(subDir, { withFileTypes: true })) {
            if (sub.isFile() && sub.name.toLowerCase().endsWith('.pdf')) {
              result.push({
                bookId: `${cat}/${entry.name}/${sub.name}`,
                name: sub.name,
                subcategory: entry.name,
              });
            }
          }
        } catch { /* skip unreadable subdirectory */ }
      }
    }
  }
  return result;
}

function triggerIndexBuild(book) {
  if (indexingNow.has(book.bookId)) return;
  if (pdfIndexer.isIndexed(book.bookId)) return;
  const pdfPath = pdfPathForBook(book);
  if (!fs.existsSync(pdfPath)) return;
  indexingNow.add(book.bookId);
  pdfIndexer.buildIndex(book.bookId, pdfPath)
    .catch(e => console.error(`[pdf-indexer] Failed ${book.bookId}:`, e.message))
    .finally(() => indexingNow.delete(book.bookId));
}

function extractSnippet(text, q) {
  const lc  = text.toLowerCase();
  const lq  = q.toLowerCase();
  const idx = lc.indexOf(lq);
  if (idx === -1) return '';
  const start = Math.max(0, idx - 60);
  const end   = Math.min(text.length, idx + q.length + 80);
  const raw   = (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
  return raw.replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
    m => `<mark>${m}</mark>`);
}
```

- [ ] **Step 3: Add `/api/pdf-search` route and add to PUBLIC_PREFIXES**

First, find `PUBLIC_PREFIXES` (around line 243) and add `/api/pdf-search`:
```js
const PUBLIC_PREFIXES = [
  '/login', '/api/login', '/api/logout',
  // Rulebook viewer — public so players can be given the link
  '/rulebooks', '/api/pdf', '/api/books', '/api/annotations',
  '/api/pdf-search',
];
```

Then find the rulebook routes block (around line 2560, just before `/api/books`). Add the new route **before** the existing `/api/books` route:

```js
// ─── PDF full-text search ─────────────────────────────────────────────────────

app.get('/api/pdf-search', (req, res) => {
  const q     = (req.query.q || '').trim();
  const scope = (req.query.scope || 'all').trim();

  if (q.length < 2) return res.json({ results: [], indexing: [] });

  const all  = allBooksFlat();
  let books;
  if (scope === 'all')     books = all;
  else if (scope === 'core')    books = all.filter(b => b.bookId.startsWith('core/') && !b.subcategory);
  else if (scope === 'setting') books = all.filter(b => b.bookId.startsWith('setting/'));
  else if (scope === 'ua')      books = all.filter(b => b.subcategory === 'Unearthed Arcana');
  else if (scope.startsWith('book:')) {
    const id = scope.slice(5);
    books = all.filter(b => b.bookId === id);
  } else books = all;

  const results  = [];
  const indexing = [];

  for (const book of books) {
    if (results.length >= 20) break;

    if (!pdfIndexer.isIndexed(book.bookId)) {
      triggerIndexBuild(book);
      if (indexingNow.has(book.bookId)) indexing.push(book.bookId);
      continue;
    }

    const index = pdfIndexer.loadIndex(book.bookId);
    if (!index) continue;

    const bookName = book.name.replace(/\.pdf$/i, '');

    for (const { page, text } of index.pages) {
      if (results.length >= 20) break;
      if (!text.toLowerCase().includes(q.toLowerCase())) continue;
      results.push({
        bookId:   book.bookId,
        bookName,
        page,
        snippet:  extractSnippet(text, q),
      });
    }
  }

  res.json({ results, indexing });
});
```

- [ ] **Step 4: Verify the route works**

Start the server (`node server.js` in `web/`). Then hit:
```
http://localhost:5050/api/pdf-search?q=artificer&scope=ua
```

Expected (after the UA Artificer book was indexed in Task 2):
```json
{
  "results": [
    { "bookId": "core/Unearthed Arcana/D&D 5E - UA - Artificer.pdf",
      "bookName": "D&D 5E - UA - Artificer",
      "page": 1,
      "snippet": "…<mark>Artificer</mark>…" }
  ],
  "indexing": []
}
```

Try with an un-indexed book:
```
http://localhost:5050/api/pdf-search?q=grapple&scope=core
```

Expected: `{ "results": [], "indexing": ["core/Player's Handbook.pdf", ...] }` — indexing triggers in background.

- [ ] **Step 5: Commit**

```bash
git add web/server.js
git commit -m "feat: /api/pdf-search route with lazy background indexing"
```

---

### Task 4: Server — replace `/api/pdf` route with `send`

**Files:**
- Modify: `web/server.js`

- [ ] **Step 1: Add `send` require near the top of server.js**

In the `require` block (around lines 3–19), add alongside `pdfIndexer`:
```js
const send = require('send');
```

- [ ] **Step 2: Replace the `/api/pdf` route body**

Find the current `/api/pdf/:category/*` route body (around lines 2619–2649) — the entire block after the path-traversal guard and `existsSync` check:

```js
  if (!fs.existsSync(fullPath)) return res.status(404).send('Not found');

  const stat = fs.statSync(fullPath);
  // ... everything down to ...
  stream.pipe(res);
});
```

Replace everything from `if (!fs.existsSync(fullPath))` to the closing `});` with:

```js
  if (!fs.existsSync(fullPath)) return res.status(404).send('Not found');

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline');

  send(req, fullPath, { dotfiles: 'deny' })
    .on('error', err => { if (!res.headersSent) res.status(err.status || 500).end(); })
    .pipe(res);
});
```

- [ ] **Step 3: Verify PDF loading still works in browser**

Start the server. Open `http://localhost:5050/rulebooks`. Open DevTools → Network tab. Click a book.

Expected:
- First request: `200 OK` (or `206 Partial Content` for range requests), with `ETag` and `Last-Modified` headers present
- Reload page, re-open same book: `304 Not Modified` on the initial fetch (browser uses cache)

- [ ] **Step 4: Commit**

```bash
git add web/server.js
git commit -m "feat: replace manual pdf route with send — adds ETag, Last-Modified, Cache-Control"
```

---

### Task 5: HTML — search bar, scope picker, dropdown

**Files:**
- Modify: `web/public/rulebooks.html`

- [ ] **Step 1: Add CSS for search UI**

Find the `/* ── Spinner ── */` CSS comment (around line 167). Insert the following **before** it:

```css
    /* ── Full-text search ── */
    #search-wrap {
      flex: 1; position: relative; display: flex; gap: 6px; align-items: center;
      max-width: 500px;
    }
    #pdf-search {
      flex: 1; padding: 4px 10px;
      background: #222; border: 1px solid #444; border-radius: 4px;
      color: #e0d8c8; font-size: 13px;
    }
    #pdf-search::placeholder { color: #666; }
    #pdf-search:focus { outline: none; border-color: #c5a56a; }
    #search-scope {
      padding: 4px 6px; background: #222; border: 1px solid #444;
      border-radius: 4px; color: #e0d8c8; font-size: 12px; cursor: pointer;
    }
    #search-scope:focus { outline: none; border-color: #c5a56a; }

    #search-dropdown {
      display: none; position: absolute; top: calc(100% + 6px); left: 0; right: 0;
      background: #1e1e1e; border: 1px solid #444; border-radius: 6px;
      z-index: 500; max-height: 380px; overflow-y: auto;
      box-shadow: 0 8px 32px rgba(0,0,0,.7);
    }
    #search-dropdown.open { display: block; }

    .sd-status {
      padding: 10px 14px; color: #888; font-size: 13px; font-style: italic;
    }
    .sd-result {
      display: flex; flex-direction: column; gap: 2px;
      padding: 8px 14px; cursor: pointer; border-bottom: 1px solid #2a2a2a;
    }
    .sd-result:last-child { border-bottom: none; }
    .sd-result:hover, .sd-result.active { background: #2a2018; }
    .sd-result-header {
      display: flex; gap: 8px; align-items: baseline;
      font-size: 12px; font-weight: 600; color: #c5a56a;
    }
    .sd-result-page { color: #888; font-weight: 400; font-size: 11px; }
    .sd-result-snippet { font-size: 12px; color: #a09880; line-height: 1.4; }
    .sd-result-snippet mark {
      background: rgba(197,165,106,0.3); color: #e0d8c8;
      border-radius: 2px; padding: 0 1px;
    }
    .sd-footer {
      padding: 6px 14px; color: #666; font-size: 11px;
      border-top: 1px solid #2a2a2a; font-style: italic;
    }
```

- [ ] **Step 2: Replace header HTML**

Find the current header:
```html
<div id="header">
  <h1>📖 Rulebooks</h1>
  <input id="book-search" type="text" placeholder="Search books...">
  <button id="toggle-bookmarks">⭐ Bookmarks</button>
</div>
```

Replace with:
```html
<div id="header">
  <h1>📖 Rulebooks</h1>
  <input id="book-search" type="text" placeholder="Filter library…" style="max-width:180px">
  <div id="search-wrap">
    <input id="pdf-search" type="search" placeholder="Search rulebooks…" autocomplete="off">
    <select id="search-scope">
      <option value="all">All Books</option>
      <option value="core">Core Books</option>
      <option value="setting">Setting Books</option>
      <option value="ua">Unearthed Arcana</option>
      <option value="book:" id="scope-current-book" disabled>Current Book</option>
    </select>
    <div id="search-dropdown"></div>
  </div>
  <button id="toggle-bookmarks">⭐ Bookmarks</button>
</div>
```

- [ ] **Step 3: Verify layout renders**

Start the server. Open `http://localhost:5050/rulebooks`. Expected: header now has a narrower "Filter library…" input on the left, a wider "Search rulebooks…" input + scope dropdown in the middle, and the bookmarks button on the right. No JS errors.

- [ ] **Step 4: Commit**

```bash
git add web/public/rulebooks.html
git commit -m "feat: search bar + scope picker + dropdown shell in rulebooks header"
```

---

### Task 6: JS — search logic

**Files:**
- Modify: `web/public/rulebooks.js`

- [ ] **Step 1: Add search state and helpers after the `state` object**

Find the line `// ── API ──────` (around line 24). Insert before it:

```js
// ── Search ────────────────────────────────────────────────────────────────────
let _searchTimer   = null;
let _searchActive  = -1; // index of keyboard-focused result row

function closeSearchDropdown() {
  const dd = document.getElementById('search-dropdown');
  dd.classList.remove('open');
  dd.innerHTML = '';
  _searchActive = -1;
}

function openBook_andClose(bookId, page) {
  closeSearchDropdown();
  openBook(bookId, page);
}
```

- [ ] **Step 2: Add `performSearch` and `renderSearchResults`**

After the helpers above, add:

```js
async function performSearch(q, scope) {
  const dd = document.getElementById('search-dropdown');

  if (q.length < 2) { closeSearchDropdown(); return; }

  dd.innerHTML = '<div class="sd-status">Searching…</div>';
  dd.classList.add('open');

  let data;
  try {
    // For "Current Book" scope, build the scope value from current book
    const effectiveScope = scope === 'book:'
      ? (state.currentBookId ? `book:${state.currentBookId}` : 'all')
      : scope;
    const res = await fetch(`/api/pdf-search?q=${encodeURIComponent(q)}&scope=${encodeURIComponent(effectiveScope)}`);
    data = await res.json();
  } catch {
    dd.innerHTML = '<div class="sd-status">Search failed — is the server running?</div>';
    return;
  }

  renderSearchResults(data, q);
}

function renderSearchResults({ results, indexing }, q) {
  const dd = document.getElementById('search-dropdown');
  dd.innerHTML = '';
  _searchActive = -1;

  if (!results.length && !indexing.length) {
    dd.innerHTML = `<div class="sd-status">No results for "<strong>${esc(q)}</strong>"</div>`;
    return;
  }

  for (const r of results) {
    const row = document.createElement('div');
    row.className = 'sd-result';
    row.innerHTML = `
      <div class="sd-result-header">
        <span>📄 ${esc(r.bookName)}</span>
        <span class="sd-result-page">p. ${r.page}</span>
      </div>
      <div class="sd-result-snippet">${r.snippet}</div>
    `;
    row.addEventListener('click', () => openBook_andClose(r.bookId, r.page));
    dd.appendChild(row);
  }

  if (indexing.length) {
    const footer = document.createElement('div');
    footer.className = 'sd-footer';
    footer.textContent = `⏳ Indexing ${indexing.length} book(s) — results may be incomplete`;
    dd.appendChild(footer);
  } else if (results.length === 20) {
    const footer = document.createElement('div');
    footer.className = 'sd-footer';
    footer.textContent = 'Showing first 20 results — refine your search';
    dd.appendChild(footer);
  }
}
```

- [ ] **Step 3: Wire search events inside `bindEvents()`**

Find the bottom of `bindEvents()` — the line `document.getElementById('new-collection-btn').addEventListener(...)` followed by the closing `}`. Add these event listeners **before** the closing `}`:

```js
  // ── Full-text search ──────────────────────────────────────────────────────
  const pdfSearchInput = document.getElementById('pdf-search');
  const searchScopeEl  = document.getElementById('search-scope');
  const scopeCurrentEl = document.getElementById('scope-current-book');

  function scheduleSearch() {
    clearTimeout(_searchTimer);
    _searchTimer = setTimeout(() => {
      performSearch(pdfSearchInput.value.trim(), searchScopeEl.value);
    }, 300);
  }

  pdfSearchInput.addEventListener('input', scheduleSearch);
  searchScopeEl.addEventListener('change', scheduleSearch);

  pdfSearchInput.addEventListener('keydown', e => {
    const dd   = document.getElementById('search-dropdown');
    const rows = Array.from(dd.querySelectorAll('.sd-result'));
    if (!rows.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      _searchActive = Math.min(_searchActive + 1, rows.length - 1);
      rows.forEach((r, i) => r.classList.toggle('active', i === _searchActive));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      _searchActive = Math.max(_searchActive - 1, 0);
      rows.forEach((r, i) => r.classList.toggle('active', i === _searchActive));
    } else if (e.key === 'Enter' && _searchActive >= 0) {
      e.preventDefault();
      rows[_searchActive].click();
    } else if (e.key === 'Escape') {
      closeSearchDropdown();
    }
  });

  document.addEventListener('mousedown', e => {
    const wrap = document.getElementById('search-wrap');
    if (!wrap.contains(e.target)) closeSearchDropdown();
  });
```

- [ ] **Step 4: Update "Current Book" scope option when a book opens**

Find `async function openBook(bookId, startPage = 1)` (around line 138). After the line `state.currentPage = startPage;`, add:

```js
  // Keep "Current Book" scope option in sync
  const scopeCurrentEl = document.getElementById('scope-current-book');
  if (scopeCurrentEl) {
    scopeCurrentEl.value   = `book:${bookId}`;
    scopeCurrentEl.textContent = bookId.split('/').pop().replace(/\.pdf$/i, '');
    scopeCurrentEl.disabled = false;
  }
```

- [ ] **Step 5: End-to-end test**

1. Start server. Open `http://localhost:5050/rulebooks`.
2. Type "grapple" in the search box, scope = "All Books".
   - First search: dropdown shows "Searching…" then results for indexed books + "⏳ Indexing N books" footer.
   - Wait 10–30 seconds, search again — more results appear as indexes complete.
3. Switch scope to "Unearthed Arcana" — results only from UA books.
4. Open a book. Switch scope to "Current Book" — scope option now shows that book's name.
5. Search "fighter" with scope = "Current Book" — only results from the open book.
6. Press ↓/↑ to navigate results, Enter to jump to a result — correct book + page opens.
7. Press Escape — dropdown closes.
8. Click outside the search area — dropdown closes.
9. Restart server — index files in `web/data/search-index/` persist; searches are instant for indexed books.

- [ ] **Step 6: Commit**

```bash
git add web/public/rulebooks.js
git commit -m "feat: full-text search — debounced fetch, dropdown results, keyboard nav"
```

---

## Self-Review

**Spec coverage:**
- ✅ Cross-book search (`scope=all`, `core`, `setting`, `ua`) → Task 3
- ✅ Single-book search (`scope=book:<bookId>`) → Task 3
- ✅ Lazy indexing with background build, `indexing` list in response → Task 3
- ✅ Per-book JSON index in `web/data/search-index/` → Tasks 2, 3
- ✅ Case-insensitive substring match, snippet with `<mark>` wrapping → Task 3
- ✅ Max 20 results → Task 3
- ✅ `send` package replacing manual range handler (ETag, Cache-Control, 304) → Task 4
- ✅ Search bar always visible in header → Task 5
- ✅ Scope picker: All / Core / Setting / UA / Current Book → Task 5
- ✅ Dropdown results: book name + page + snippet → Task 6
- ✅ 300ms debounce → Task 6
- ✅ Keyboard nav ↑/↓/Enter/Escape → Task 6
- ✅ Click-outside closes dropdown → Task 6
- ✅ "Current Book" scope updates when book opens → Task 6
- ✅ "Indexing N books" footer → Task 6
- ✅ Route added to PUBLIC_PREFIXES (no auth needed) → Task 3

**Placeholder scan:** No TBDs. All code blocks present. ✓

**Name consistency:**
- `closeSearchDropdown()` — defined Task 6 Step 1, called in Steps 1 & 3 ✓
- `openBook_andClose(bookId, page)` — defined Step 1, called in `renderSearchResults` Step 2 ✓
- `performSearch(q, scope)` — defined Step 2, called in `scheduleSearch` Step 3 ✓
- `renderSearchResults({results, indexing}, q)` — defined Step 2, called in `performSearch` ✓
- `esc(str)` — already defined in rulebooks.js (Task 5 of original plan) ✓
- `openBook(bookId, startPage)` — already exists, modified in Task 6 Step 4 ✓
- `#scope-current-book` — id set in HTML Task 5, referenced in JS Task 6 Steps 3 & 4 ✓
- `#search-wrap` — set in HTML Task 5, used in click-outside handler Task 6 Step 3 ✓

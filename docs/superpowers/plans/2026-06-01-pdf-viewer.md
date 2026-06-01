# PDF Rulebook Viewer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/rulebooks` route to the Express dashboard that lets the DM view D&D PDFs, highlight text, add notes, and organize bookmarks into named collections — all persisted to a local JSON file.

**Architecture:** PDF.js (CDN) renders pages onto a `<canvas>` inside a three-panel layout (library | reader | bookmarks). Highlights and note pins are absolutely-positioned `<div>` elements using percentage coordinates so they survive zoom. Everything persists in `web/data/pdf-annotations.json` via a 500ms debounced POST. All new server routes are automatically auth-gated because `app.use(requireAuth)` is already global at line 272 of `server.js`.

**Tech Stack:** Express.js (existing, `web/server.js`), PDF.js 3.11.174 (CDNJS), vanilla JS, vanilla CSS, Node.js `fs`.

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `web/server.js` | Modify | Add 2 constants + 5 routes (lines ~28, ~end of route block) |
| `web/data/pdf-annotations.json` | Create | Empty initial storage — created in Task 3 |
| `web/public/rulebooks.html` | Create | Page shell: three-panel layout + all inline CSS |
| `web/public/rulebooks.js` | Create | All client logic: PDF.js, annotation layer, bookmarks, collections |

---

### Task 1: Server — Constants and `/api/books` route

**Files:**
- Modify: `web/server.js`

- [ ] **Step 1: Add PDF_DIRS and ANNOTATIONS_FILE constants**

Open `web/server.js`. Find this line (around line 27):
```js
const CAMPAIGN_ROOT = path.resolve(__dirname, '..');
```
Insert directly below it:
```js
const PDF_DIRS = {
  core:    'C:/Users/joshu/OneDrive/Documents/dnd/01 - Core Books',
  setting: 'C:/Users/joshu/OneDrive/Documents/dnd/02 - Setting Books',
};
const ANNOTATIONS_FILE = path.join(CAMPAIGN_ROOT, 'web/data/pdf-annotations.json');
```

- [ ] **Step 2: Add the `/api/books` route**

Find the last `app.get`/`app.post` route in `server.js` (before `server.listen` or the WebSocket setup). Add this block after it:

```js
// ─── Rulebook routes ─────────────────────────────────────────────────────────

app.get('/api/books', (req, res) => {
  const result = {};
  for (const [cat, dir] of Object.entries(PDF_DIRS)) {
    result[cat] = [];
    if (!fs.existsSync(dir)) continue;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.toLowerCase().endsWith('.pdf')) {
        result[cat].push({ name: entry.name, bookId: `${cat}/${entry.name}` });
      } else if (entry.isDirectory()) {
        const subDir = path.join(dir, entry.name);
        for (const sub of fs.readdirSync(subDir, { withFileTypes: true })) {
          if (sub.isFile() && sub.name.toLowerCase().endsWith('.pdf')) {
            result[cat].push({
              name: sub.name,
              subcategory: entry.name,
              bookId: `${cat}/${entry.name}/${sub.name}`,
            });
          }
        }
      }
    }
  }
  res.json(result);
});
```

- [ ] **Step 3: Verify the route**

Start the server (`cd web && node server.js`) and open `http://localhost:5050` (log in if prompted). Then navigate to:
```
http://localhost:5050/api/books
```
Expected JSON — two keys, each an array of book objects:
```json
{
  "core": [
    { "name": "Player's Handbook.pdf", "bookId": "core/Player's Handbook.pdf" },
    { "name": "Unearthed Arcana - Psionics.pdf", "bookId": "core/Unearthed Arcana/Unearthed Arcana - Psionics.pdf", "subcategory": "Unearthed Arcana" }
  ],
  "setting": [
    { "name": "Explorer's Guide to Wildemount.pdf", "bookId": "setting/Explorer's Guide to Wildemount.pdf" }
  ]
}
```

- [ ] **Step 4: Commit**

```
git add web/server.js
git commit -m "feat: add PDF_DIRS constants and /api/books route"
```

---

### Task 2: Server — `/api/pdf` streaming route

**Files:**
- Modify: `web/server.js` (add after the `/api/books` route)

- [ ] **Step 1: Add the PDF streaming route**

The wildcard `*` param captures the full filename including subfolder paths (e.g. `Unearthed Arcana/UA-Artificer.pdf`).

```js
app.get('/api/pdf/:category/*', (req, res) => {
  const category = req.params.category;
  const filename  = req.params[0]; // everything after /api/pdf/:category/

  if (!PDF_DIRS[category]) return res.status(400).send('Invalid category');
  if (!filename.toLowerCase().endsWith('.pdf')) return res.status(400).send('Invalid file type');

  const baseDir  = path.resolve(PDF_DIRS[category]);
  const fullPath = path.resolve(path.join(baseDir, filename));

  // Path traversal guard — resolved path must remain inside baseDir
  if (fullPath !== baseDir && !fullPath.startsWith(baseDir + path.sep)) {
    return res.status(403).send('Forbidden');
  }

  if (!fs.existsSync(fullPath)) return res.status(404).send('Not found');

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline');
  fs.createReadStream(fullPath).pipe(res);
});
```

- [ ] **Step 2: Test PDF streaming**

After logging in, open:
```
http://localhost:5050/api/pdf/core/Player's%20Handbook.pdf
```
Expected: The PDF streams — browser shows or downloads it.

Test path traversal protection by opening:
```
http://localhost:5050/api/pdf/core/../../server.js
```
Expected: `403 Forbidden`

- [ ] **Step 3: Commit**

```
git add web/server.js
git commit -m "feat: add /api/pdf streaming route with path traversal guard"
```

---

### Task 3: Server — Annotations routes + `/rulebooks` route

**Files:**
- Modify: `web/server.js`
- Create: `web/data/pdf-annotations.json`

- [ ] **Step 1: Create `web/data/pdf-annotations.json`**

Create the file with empty initial state:
```json
{
  "collections": [],
  "bookmarks": [],
  "annotations": {}
}
```

- [ ] **Step 2: Add the three remaining routes to server.js**

Add after the `/api/pdf` route:

```js
app.get('/api/annotations', (req, res) => {
  if (!fs.existsSync(ANNOTATIONS_FILE)) {
    return res.json({ collections: [], bookmarks: [], annotations: {} });
  }
  try {
    res.json(JSON.parse(fs.readFileSync(ANNOTATIONS_FILE, 'utf8')));
  } catch {
    res.json({ collections: [], bookmarks: [], annotations: {} });
  }
});

app.post('/api/annotations', express.json({ limit: '10mb' }), (req, res) => {
  try {
    fs.mkdirSync(path.dirname(ANNOTATIONS_FILE), { recursive: true });
    fs.writeFileSync(ANNOTATIONS_FILE, JSON.stringify(req.body, null, 2), 'utf8');
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/rulebooks', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'rulebooks.html'));
});
```

- [ ] **Step 3: Test all three routes**

GET annotations (should return empty state):
```
http://localhost:5050/api/annotations
```
Expected: `{ "collections": [], "bookmarks": [], "annotations": {} }`

POST annotations — run in browser console (after logging in at localhost:5050):
```js
fetch('/api/annotations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ collections: [], bookmarks: [], annotations: { test: true } })
}).then(r => r.json()).then(console.log)
```
Expected: `{ ok: true }`. Then GET `/api/annotations` — should return `{ test: true }`.

Restore the file to empty state after testing:
```json
{ "collections": [], "bookmarks": [], "annotations": {} }
```

GET `/rulebooks` — should 404 until `rulebooks.html` is created in Task 4.

- [ ] **Step 4: Commit**

```
git add web/server.js web/data/pdf-annotations.json
git commit -m "feat: add /api/annotations and /rulebooks server routes"
```

---

### Task 4: HTML shell — `rulebooks.html`

**Files:**
- Create: `web/public/rulebooks.html`

- [ ] **Step 1: Create `web/public/rulebooks.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rulebooks — Northwatch Wardens</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      display: flex; flex-direction: column; height: 100vh; overflow: hidden;
      background: #1a1a1a; color: #e0d8c8;
      font-family: 'Segoe UI', system-ui, sans-serif; font-size: 14px;
    }

    /* ── Header ── */
    #header {
      display: flex; align-items: center; gap: 12px;
      padding: 8px 16px; background: #111; border-bottom: 1px solid #333; flex-shrink: 0;
    }
    #header h1 { font-size: 15px; font-weight: 600; color: #c5a56a; white-space: nowrap; }
    #book-search {
      flex: 1; max-width: 320px; padding: 4px 10px;
      background: #222; border: 1px solid #444; border-radius: 4px;
      color: #e0d8c8; font-size: 13px;
    }
    #book-search::placeholder { color: #666; }
    #toggle-bookmarks {
      margin-left: auto; padding: 4px 12px;
      background: #2a2a2a; border: 1px solid #444; border-radius: 4px;
      color: #c5a56a; cursor: pointer; font-size: 13px;
    }
    #toggle-bookmarks:hover { background: #333; }

    /* ── Main layout ── */
    #main { display: flex; flex: 1; overflow: hidden; }

    /* ── Library panel ── */
    #library-panel {
      width: 220px; flex-shrink: 0; overflow-y: auto;
      border-right: 1px solid #333; background: #151515; padding: 8px 0;
    }
    .library-category { padding: 4px 0; }
    .library-category-header {
      display: flex; align-items: center; gap: 6px;
      cursor: pointer; color: #888; font-size: 11px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.08em;
      padding: 4px 12px; user-select: none;
    }
    .library-category-header:hover { color: #c5a56a; }
    .library-category-header .arrow { transition: transform 0.15s; display: inline-block; }
    .library-category-header.collapsed .arrow { transform: rotate(-90deg); }
    .library-books { list-style: none; }
    .library-books.hidden { display: none; }
    .sub-label {
      padding: 6px 8px 2px 20px; font-size: 10px; color: #555;
      text-transform: uppercase; letter-spacing: .05em;
    }
    .library-book {
      padding: 5px 8px 5px 20px; cursor: pointer; border-radius: 3px;
      font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      color: #b0a890; margin: 0 4px;
    }
    .library-book:hover { background: #222; color: #e0d8c8; }
    .library-book.active { background: #2a2018; color: #c5a56a; }

    /* ── Reader panel ── */
    #reader-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

    #scroll-area {
      flex: 1; overflow: auto; display: flex;
      justify-content: center; align-items: flex-start;
      padding: 24px 16px; background: #1a1a1a;
    }

    #page-container { position: relative; display: inline-block; box-shadow: 0 4px 32px rgba(0,0,0,.8); }
    #pdf-canvas { display: block; }
    #text-layer {
      position: absolute; inset: 0; overflow: hidden; line-height: 1;
      pointer-events: auto;
    }
    #text-layer span {
      position: absolute; white-space: pre; cursor: text;
      transform-origin: 0% 0%; color: transparent;
    }
    #text-layer ::selection { background: rgba(197,165,106,0.35); color: transparent; }
    #annotation-layer { position: absolute; inset: 0; pointer-events: none; }

    .highlight-rect {
      position: absolute; opacity: 0.35; border-radius: 2px;
      pointer-events: auto; cursor: pointer;
    }
    .highlight-rect[data-color="yellow"] { background: #ffe066; }
    .highlight-rect[data-color="orange"] { background: #ff9a3c; }
    .highlight-rect[data-color="green"]  { background: #6bff7a; }
    .highlight-rect[data-color="blue"]   { background: #66b3ff; }

    .note-pin {
      position: absolute; font-size: 18px; cursor: pointer;
      pointer-events: auto; transform: translate(-50%, -100%);
      z-index: 10; line-height: 1; user-select: none;
    }
    .note-pin:hover { filter: brightness(1.3); }

    /* ── Toolbar ── */
    #toolbar {
      display: flex; align-items: center; gap: 8px;
      padding: 6px 12px; background: #111; border-top: 1px solid #333;
      flex-shrink: 0; flex-wrap: wrap;
    }
    #toolbar button {
      padding: 4px 10px; background: #2a2a2a; border: 1px solid #444;
      border-radius: 4px; color: #e0d8c8; cursor: pointer; font-size: 13px;
    }
    #toolbar button:hover { background: #333; }
    #toolbar button.active { background: #3a2a10; border-color: #c5a56a; color: #c5a56a; }
    #toolbar button:disabled { opacity: 0.4; cursor: default; pointer-events: none; }
    #page-input {
      width: 52px; text-align: center; padding: 3px 6px;
      background: #222; border: 1px solid #444; border-radius: 4px;
      color: #e0d8c8; font-size: 13px;
    }
    #page-total { color: #888; }
    #zoom-display { color: #888; font-size: 13px; min-width: 44px; text-align: center; }
    .toolbar-sep { width: 1px; height: 20px; background: #333; margin: 0 2px; }

    /* ── Bookmarks panel ── */
    #bookmarks-panel {
      width: 240px; flex-shrink: 0; overflow-y: auto;
      border-left: 1px solid #333; background: #151515;
      display: flex; flex-direction: column;
    }
    #bookmarks-panel.hidden { display: none; }
    .bm-panel-header {
      padding: 8px 12px 4px; font-size: 11px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.08em; color: #888; flex-shrink: 0;
    }
    .collection-block { margin-bottom: 2px; }
    .collection-header {
      display: flex; align-items: center; gap: 6px;
      padding: 5px 12px; cursor: pointer; font-size: 12px;
      font-weight: 600; color: #c5a56a; user-select: none;
    }
    .collection-header:hover { background: #1f1f1f; }
    .collection-header .arrow { transition: transform 0.15s; display: inline-block; font-size: 10px; }
    .collection-header.collapsed .arrow { transform: rotate(-90deg); }
    .bm-list { list-style: none; }
    .bm-list.hidden { display: none; }
    .bm-item {
      display: flex; align-items: center; gap: 6px;
      padding: 4px 12px 4px 22px; cursor: pointer; font-size: 12px; color: #b0a890;
    }
    .bm-item:hover { background: #222; color: #e0d8c8; }
    .bm-label { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .bm-delete { color: #555; font-size: 10px; cursor: pointer; flex-shrink: 0; }
    .bm-delete:hover { color: #e06060; }
    .unassigned-section { border-top: 1px solid #222; padding-top: 4px; margin-top: 4px; }
    #new-collection-btn {
      margin: 8px 12px 12px; padding: 5px 10px;
      background: transparent; border: 1px dashed #444;
      border-radius: 4px; color: #666; cursor: pointer;
      font-size: 12px; text-align: left; flex-shrink: 0;
    }
    #new-collection-btn:hover { border-color: #c5a56a; color: #c5a56a; }

    /* ── Empty state ── */
    #empty-state {
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      height: 100%; color: #555; gap: 8px; text-align: center;
    }
    #empty-state p { font-size: 15px; }
    #empty-state small { font-size: 12px; }

    /* ── Overlays ── */
    .overlay-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,.55);
      z-index: 200; display: flex; align-items: center; justify-content: center;
    }
    .overlay-backdrop.hidden { display: none; }
    .overlay-box {
      background: #222; border: 1px solid #444; border-radius: 6px;
      padding: 16px; min-width: 260px;
    }
    .overlay-box h3 { font-size: 13px; color: #c5a56a; margin-bottom: 12px; }
    .overlay-actions { display: flex; gap: 8px; justify-content: flex-end; }
    .overlay-actions button {
      padding: 5px 12px; border-radius: 4px; border: 1px solid #444;
      cursor: pointer; font-size: 13px; background: transparent; color: #e0d8c8;
    }
    .overlay-actions button:hover { background: #333; }

    /* Color picker */
    #color-picker-box { display: flex; gap: 12px; align-items: center; }
    .color-swatch {
      width: 30px; height: 30px; border-radius: 50%;
      cursor: pointer; border: 2px solid transparent; flex-shrink: 0;
    }
    .color-swatch:hover { border-color: #fff; transform: scale(1.1); }
    .color-swatch[data-color="yellow"] { background: #ffe066; }
    .color-swatch[data-color="orange"] { background: #ff9a3c; }
    .color-swatch[data-color="green"]  { background: #6bff7a; }
    .color-swatch[data-color="blue"]   { background: #66b3ff; }
    #cancel-highlight-btn {
      background: transparent; border: none; color: #888;
      cursor: pointer; font-size: 20px; line-height: 1;
    }
    #cancel-highlight-btn:hover { color: #e0d8c8; }

    /* Note editor */
    #note-textarea {
      width: 100%; min-height: 80px; background: #1a1a1a; border: 1px solid #444;
      border-radius: 4px; color: #e0d8c8; font-size: 13px; padding: 6px 8px;
      resize: vertical; font-family: inherit; margin-bottom: 10px; display: block;
    }
    #save-note-btn  { background: #3a2a10; border-color: #c5a56a; color: #c5a56a; }
    #delete-note-btn { color: #e06060; }
    #delete-note-btn.hidden { display: none; }

    /* Bookmark label input */
    #bm-label-input {
      width: 100%; padding: 5px 8px; background: #1a1a1a; border: 1px solid #444;
      border-radius: 4px; color: #e0d8c8; font-size: 13px;
      margin-bottom: 10px; display: block;
    }
    #save-bm-btn { background: #3a2a10; border-color: #c5a56a; color: #c5a56a; }

    /* Context menu */
    .ctx-menu {
      position: fixed; background: #222; border: 1px solid #444; border-radius: 4px;
      padding: 4px 0; z-index: 300; min-width: 170px;
      box-shadow: 0 4px 16px rgba(0,0,0,.6); font-size: 13px;
    }
    .ctx-menu-label {
      padding: 4px 14px 2px; font-size: 10px; color: #555;
      text-transform: uppercase; letter-spacing: .05em;
    }
    .ctx-menu-item {
      padding: 6px 14px; cursor: pointer; color: #e0d8c8;
      display: flex; align-items: center; gap: 8px;
    }
    .ctx-menu-item:hover { background: #333; }
    .ctx-menu-empty { padding: 6px 14px; color: #555; font-size: 12px; }

    /* Cursor modes */
    body.highlight-mode #text-layer { cursor: text; }
    body.note-mode #page-container { cursor: crosshair; }
    body.note-mode #text-layer { pointer-events: none; }
  </style>
</head>
<body>

<div id="header">
  <h1>📖 Rulebooks</h1>
  <input id="book-search" type="text" placeholder="Search books...">
  <button id="toggle-bookmarks">⭐ Bookmarks</button>
</div>

<div id="main">
  <div id="library-panel"></div>

  <div id="reader-panel">
    <div id="scroll-area">
      <div id="page-container" style="display:none">
        <canvas id="pdf-canvas"></canvas>
        <div id="text-layer"></div>
        <div id="annotation-layer"></div>
      </div>
      <div id="empty-state">
        <p>📚 Select a book from the library</p>
        <small>Your annotations and bookmarks will persist across sessions</small>
      </div>
    </div>

    <div id="toolbar">
      <button id="prev-btn" disabled>◀</button>
      <input id="page-input" type="number" min="1" value="1" disabled>
      <span>/ <span id="page-total">—</span></span>
      <button id="next-btn" disabled>▶</button>
      <div class="toolbar-sep"></div>
      <button id="zoom-out-btn" disabled>−</button>
      <span id="zoom-display">100%</span>
      <button id="zoom-in-btn" disabled>+</button>
      <div class="toolbar-sep"></div>
      <button id="highlight-btn" disabled title="Toggle highlight mode (select text to highlight)">🖊 Highlight</button>
      <button id="note-btn" disabled title="Click page to place a note">📝 Note</button>
      <button id="bookmark-btn" disabled title="Bookmark this page">⭐ Bookmark</button>
    </div>
  </div>

  <div id="bookmarks-panel">
    <div class="bm-panel-header">Bookmarks</div>
    <div id="collections-container"></div>
    <button id="new-collection-btn">＋ New Collection</button>
  </div>
</div>

<!-- Color picker overlay -->
<div id="color-picker-overlay" class="overlay-backdrop hidden">
  <div class="overlay-box">
    <h3>Choose highlight color</h3>
    <div id="color-picker-box">
      <div class="color-swatch" data-color="yellow" title="Yellow"></div>
      <div class="color-swatch" data-color="orange" title="Orange"></div>
      <div class="color-swatch" data-color="green"  title="Green"></div>
      <div class="color-swatch" data-color="blue"   title="Blue"></div>
      <button id="cancel-highlight-btn" title="Cancel">✕</button>
    </div>
  </div>
</div>

<!-- Note editor overlay -->
<div id="note-editor-overlay" class="overlay-backdrop hidden">
  <div class="overlay-box">
    <h3 id="note-editor-title">Add Note</h3>
    <textarea id="note-textarea" placeholder="Write your DM note..."></textarea>
    <div class="overlay-actions">
      <button id="delete-note-btn" class="hidden">🗑 Delete</button>
      <button id="cancel-note-btn">Cancel</button>
      <button id="save-note-btn">Save</button>
    </div>
  </div>
</div>

<!-- Bookmark label overlay -->
<div id="bm-label-overlay" class="overlay-backdrop hidden">
  <div class="overlay-box">
    <h3>Bookmark label</h3>
    <input id="bm-label-input" type="text" placeholder="e.g. Grapple rules">
    <div class="overlay-actions">
      <button id="cancel-bm-btn">Cancel</button>
      <button id="save-bm-btn">Save</button>
    </div>
  </div>
</div>

<script src="/rulebooks.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify the shell loads**

Restart the server. Open `http://localhost:5050/rulebooks`.
Expected: Three-panel layout visible. Empty library panel, empty bookmarks panel. Toolbar at bottom (buttons disabled). No JS errors in console (rulebooks.js doesn't exist yet — expect one 404 for it, that's fine).

- [ ] **Step 3: Commit**

```
git add web/public/rulebooks.html
git commit -m "feat: add rulebooks.html three-panel shell"
```

---

### Task 5: JS — State, API layer, init scaffold

**Files:**
- Create: `web/public/rulebooks.js`

- [ ] **Step 1: Create `web/public/rulebooks.js`**

```js
'use strict';

// ── PDF.js setup ──────────────────────────────────────────────────────────────
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// ── State ─────────────────────────────────────────────────────────────────────
const state = {
  books: { core: [], setting: [] },
  currentBookId: null,
  pdfDoc: null,
  currentPage: 1,
  totalPages: 0,
  zoom: 1.0,
  highlightMode: false,
  noteMode: false,
  pendingHighlight: null,   // { rects:[{x,y,w,h} as 0-1 fractions], text:string }
  pendingNotePos: null,     // { x, y } as 0-1 fractions of canvas
  editingNoteId: null,
  annotations: { collections: [], bookmarks: [], annotations: {} },
  saveTimer: null,
};

// ── API ───────────────────────────────────────────────────────────────────────
async function apiLoadBooks() {
  const res = await fetch('/api/books');
  if (!res.ok) throw new Error('Failed to load books: ' + res.status);
  return res.json();
}

async function apiLoadAnnotations() {
  const res = await fetch('/api/annotations');
  if (!res.ok) throw new Error('Failed to load annotations: ' + res.status);
  return res.json();
}

async function apiSaveAnnotations() {
  await fetch('/api/annotations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state.annotations),
  });
}

function scheduleSave() {
  clearTimeout(state.saveTimer);
  state.saveTimer = setTimeout(apiSaveAnnotations, 500);
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function pageAnnotations() {
  const ba = state.annotations.annotations;
  if (!ba[state.currentBookId]) ba[state.currentBookId] = {};
  const key = String(state.currentPage);
  if (!ba[state.currentBookId][key]) ba[state.currentBookId][key] = [];
  return ba[state.currentBookId][key];
}

function addAnnotation(ann) { pageAnnotations().push(ann); }

function removeAnnotation(annId) {
  const anns = pageAnnotations();
  const i = anns.findIndex(a => a.id === annId);
  if (i !== -1) anns.splice(i, 1);
}

// ── Stub functions (implemented in later tasks) ───────────────────────────────
function renderLibrary()       { /* Task 6 */ }
function renderBookmarksPanel(){ /* Task 11 */ }
function loadLocalState()      { /* Task 13 */ }
function bindEvents()          { /* Tasks 6-13 */ }

// ── Init ──────────────────────────────────────────────────────────────────────
async function init() {
  try {
    const [books, annotations] = await Promise.all([apiLoadBooks(), apiLoadAnnotations()]);
    state.books = books;
    state.annotations = annotations;
  } catch (e) {
    console.error('Rulebooks init error:', e);
  }
  renderLibrary();
  renderBookmarksPanel();
  loadLocalState();
  bindEvents();
}

init();
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:5050/rulebooks`. Open DevTools → Console.
Expected: No errors. Type `state.books` in the console — should show the books object with `core` and `setting` arrays populated. Type `state.annotations` — should show `{ collections: [], bookmarks: [], annotations: {} }`.

- [ ] **Step 3: Commit**

```
git add web/public/rulebooks.js
git commit -m "feat: rulebooks.js init, state object, API layer, helpers"
```

---

### Task 6: JS — Library panel

**Files:**
- Modify: `web/public/rulebooks.js`

- [ ] **Step 1: Replace the `renderLibrary` stub with the real implementation**

Find and replace the stub `function renderLibrary() { /* Task 6 */ }`:

```js
function renderLibrary(filter = '') {
  const panel = document.getElementById('library-panel');
  panel.innerHTML = '';
  const lf = filter.toLowerCase();

  const cats = [
    { key: 'core',    label: 'Core Books' },
    { key: 'setting', label: 'Setting Books' },
  ];

  for (const { key, label } of cats) {
    const books = (state.books[key] || []).filter(b => b.name.toLowerCase().includes(lf));
    if (!books.length) continue;

    // Group by subcategory
    const groups = {};
    for (const book of books) {
      const g = book.subcategory || '__main__';
      (groups[g] = groups[g] || []).push(book);
    }

    const catDiv = document.createElement('div');
    catDiv.className = 'library-category';

    const header = document.createElement('div');
    header.className = 'library-category-header';
    header.innerHTML = `<span class="arrow">▾</span> ${label}`;

    const ul = document.createElement('ul');
    ul.className = 'library-books';

    header.onclick = () => {
      header.classList.toggle('collapsed');
      ul.classList.toggle('hidden');
    };

    const appendBooks = (bookList) => {
      for (const book of bookList) {
        const li = document.createElement('li');
        li.className = 'library-book' + (book.bookId === state.currentBookId ? ' active' : '');
        li.textContent = book.name.replace(/\.pdf$/i, '');
        li.title = book.name;
        li.addEventListener('click', () => openBook(book.bookId));
        ul.appendChild(li);
      }
    };

    if (groups['__main__']) appendBooks(groups['__main__']);

    for (const [sub, subBooks] of Object.entries(groups)) {
      if (sub === '__main__') continue;
      const subLabel = document.createElement('li');
      subLabel.className = 'sub-label';
      subLabel.textContent = sub;
      ul.appendChild(subLabel);
      appendBooks(subBooks);
    }

    catDiv.appendChild(header);
    catDiv.appendChild(ul);
    panel.appendChild(catDiv);
  }
}

async function openBook(bookId) {
  state.currentBookId = bookId;
  state.currentPage = 1;
  renderLibrary();

  document.getElementById('empty-state').style.display = 'none';
  document.getElementById('page-container').style.display = 'inline-block';

  ['prev-btn','next-btn','zoom-in-btn','zoom-out-btn','highlight-btn','note-btn','bookmark-btn','page-input']
    .forEach(id => { const el = document.getElementById(id); if (el) el.disabled = false; });

  saveLocalState();
  await loadPdf(bookId);
}
```

- [ ] **Step 2: Add search binding to `bindEvents`**

Replace the `bindEvents` stub:

```js
function bindEvents() {
  document.getElementById('book-search').addEventListener('input', e => renderLibrary(e.target.value));
  // Remaining events wired in Tasks 7-13
}
```

- [ ] **Step 3: Test library panel**

Open `http://localhost:5050/rulebooks`. Left panel should show two expandable categories with book lists. Search input filters in real time. Clicking a book should run `openBook` (will console-error on `loadPdf` until Task 7 — expected). Library item becomes `.active` on click.

- [ ] **Step 4: Commit**

```
git add web/public/rulebooks.js
git commit -m "feat: library panel — categories, book list, search filter"
```

---

### Task 7: JS — PDF.js rendering and page navigation

**Files:**
- Modify: `web/public/rulebooks.js`

- [ ] **Step 1: Replace the `renderAnnotations` stub (will be filled in Task 9 but needs to exist)**

Add this placeholder now so Tasks 7–8 don't crash:

```js
function renderAnnotations() {
  const layer = document.getElementById('annotation-layer');
  const canvas = document.getElementById('pdf-canvas');
  layer.style.width  = canvas.width  + 'px';
  layer.style.height = canvas.height + 'px';
  layer.innerHTML = '';
  // Full implementation in Task 9
}
```

- [ ] **Step 2: Add `loadPdf`, `renderPage`, `goToPage`, `setZoom`**

```js
// ── PDF rendering ─────────────────────────────────────────────────────────────
async function loadPdf(bookId) {
  const parts = bookId.split('/');                         // ['core', 'Player\'s Handbook.pdf']
  const category = parts[0];
  const fileParts = parts.slice(1);
  const url = `/api/pdf/${encodeURIComponent(category)}/${fileParts.map(encodeURIComponent).join('/')}`;

  state.pdfDoc = await pdfjsLib.getDocument(url).promise;
  state.totalPages = state.pdfDoc.numPages;
  document.getElementById('page-total').textContent = state.totalPages;
  document.getElementById('page-input').max = state.totalPages;

  await renderPage(state.currentPage);
}

async function renderPage(pageNum) {
  if (!state.pdfDoc) return;
  pageNum = Math.max(1, Math.min(pageNum, state.totalPages));
  state.currentPage = pageNum;

  const page = await state.pdfDoc.getPage(pageNum);
  // 1.5 base scale = ~96dpi equivalent for typical monitor
  const viewport = page.getViewport({ scale: state.zoom * 1.5 });

  const canvas = document.getElementById('pdf-canvas');
  const ctx    = canvas.getContext('2d');
  canvas.width  = viewport.width;
  canvas.height = viewport.height;

  await page.render({ canvasContext: ctx, viewport }).promise;

  document.getElementById('page-input').value = pageNum;
  document.getElementById('prev-btn').disabled = pageNum <= 1;
  document.getElementById('next-btn').disabled = pageNum >= state.totalPages;

  await buildTextLayer(page, viewport);
  renderAnnotations();
  saveLocalState();
}

function goToPage(num) {
  renderPage(Number(num));
}

function setZoom(delta) {
  state.zoom = Math.max(0.5, Math.min(3.0, Math.round((state.zoom + delta) * 100) / 100));
  document.getElementById('zoom-display').textContent = Math.round(state.zoom * 100) + '%';
  renderPage(state.currentPage);
}

// ── Text layer ────────────────────────────────────────────────────────────────
async function buildTextLayer(page, viewport) {
  const div = document.getElementById('text-layer');
  div.innerHTML = '';
  div.style.width  = viewport.width  + 'px';
  div.style.height = viewport.height + 'px';

  const textContent = await page.getTextContent();

  if (pdfjsLib.renderTextLayer) {
    const render = pdfjsLib.renderTextLayer({
      textContentSource: textContent,
      container: div,
      viewport,
    });
    await render.promise;
  }
}
```

- [ ] **Step 3: Wire navigation into `bindEvents`**

Append inside `bindEvents()`:

```js
  document.getElementById('prev-btn').addEventListener('click', () => goToPage(state.currentPage - 1));
  document.getElementById('next-btn').addEventListener('click', () => goToPage(state.currentPage + 1));
  document.getElementById('page-input').addEventListener('change', e => goToPage(e.target.value));
  document.getElementById('zoom-in-btn').addEventListener('click',  () => setZoom(0.25));
  document.getElementById('zoom-out-btn').addEventListener('click', () => setZoom(-0.25));
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goToPage(state.currentPage + 1);
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goToPage(state.currentPage - 1);
  });
```

- [ ] **Step 4: Test PDF rendering**

Open `http://localhost:5050/rulebooks`. Click any book.
- [ ] PDF renders in center panel
- [ ] Prev/Next buttons navigate pages; Prev is disabled on page 1
- [ ] Typing a page number in the input field and pressing Enter jumps to that page
- [ ] Arrow keys advance/retreat pages when focus is not on an input
- [ ] Zoom +/− rescales the render; display shows "125%", "75%", etc.

- [ ] **Step 5: Commit**

```
git add web/public/rulebooks.js
git commit -m "feat: PDF.js rendering, page navigation, zoom, text layer"
```

---

### Task 8: JS — Highlight mode

**Files:**
- Modify: `web/public/rulebooks.js`

- [ ] **Step 1: Add highlight functions**

```js
// ── Highlight mode ────────────────────────────────────────────────────────────
function toggleHighlightMode() {
  state.highlightMode = !state.highlightMode;
  if (state.highlightMode) state.noteMode = false;
  document.body.classList.toggle('highlight-mode', state.highlightMode);
  document.body.classList.toggle('note-mode', false);
  document.getElementById('highlight-btn').classList.toggle('active', state.highlightMode);
  document.getElementById('note-btn').classList.remove('active');
}

function handleTextSelection() {
  if (!state.highlightMode) return;
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed || !sel.toString().trim()) return;

  const text = sel.toString();
  const container = document.getElementById('page-container');
  const cr0 = container.getBoundingClientRect();
  const W = document.getElementById('pdf-canvas').width;
  const H = document.getElementById('pdf-canvas').height;

  const rects = [];
  for (let i = 0; i < sel.rangeCount; i++) {
    for (const r of sel.getRangeAt(i).getClientRects()) {
      if (r.width < 1 || r.height < 1) continue;
      rects.push({
        x: (r.left - cr0.left) / W,
        y: (r.top  - cr0.top)  / H,
        w: r.width  / W,
        h: r.height / H,
      });
    }
  }

  if (!rects.length) return;
  state.pendingHighlight = { rects, text };
  sel.removeAllRanges();
  document.getElementById('color-picker-overlay').classList.remove('hidden');
}

function saveHighlight(color) {
  if (!state.pendingHighlight || !state.currentBookId) return;
  document.getElementById('color-picker-overlay').classList.add('hidden');

  addAnnotation({
    id: crypto.randomUUID(),
    type: 'highlight',
    color,
    rects: state.pendingHighlight.rects,
    selectedText: state.pendingHighlight.text,
  });
  state.pendingHighlight = null;

  renderAnnotations();
  scheduleSave();
}

function cancelHighlight() {
  state.pendingHighlight = null;
  document.getElementById('color-picker-overlay').classList.add('hidden');
}
```

- [ ] **Step 2: Wire highlight events in `bindEvents`**

Append inside `bindEvents()`:

```js
  document.getElementById('highlight-btn').addEventListener('click', toggleHighlightMode);

  document.getElementById('text-layer').addEventListener('mouseup', handleTextSelection);

  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => saveHighlight(swatch.dataset.color));
  });
  document.getElementById('cancel-highlight-btn').addEventListener('click', cancelHighlight);
```

- [ ] **Step 3: Test highlight mode (data only — visual render in Task 9)**

1. Open a book, toggle "🖊 Highlight" → button turns gold, cursor becomes text cursor over page text.
2. Select a word or sentence on the page → color picker overlay appears.
3. Click a color → `console.log(pageAnnotations())` shows the new highlight with rects. No visual yet.
4. Click "✕" → picker closes, no highlight saved.
5. Toggle Highlight off → cursor returns to normal.

- [ ] **Step 4: Commit**

```
git add web/public/rulebooks.js
git commit -m "feat: highlight mode, text selection capture, color picker"
```

---

### Task 9: JS — Note pins + full annotation rendering

**Files:**
- Modify: `web/public/rulebooks.js`

- [ ] **Step 1: Add note placement and editor functions**

```js
// ── Notes ─────────────────────────────────────────────────────────────────────
function toggleNoteMode() {
  state.noteMode = !state.noteMode;
  if (state.noteMode) state.highlightMode = false;
  document.body.classList.toggle('note-mode', state.noteMode);
  document.body.classList.toggle('highlight-mode', false);
  document.getElementById('note-btn').classList.toggle('active', state.noteMode);
  document.getElementById('highlight-btn').classList.remove('active');
}

function handlePageClick(e) {
  if (!state.noteMode) return;
  // Ignore clicks on existing pins or highlights
  if (e.target.classList.contains('note-pin') || e.target.classList.contains('highlight-rect')) return;

  const container = document.getElementById('page-container');
  const rect = container.getBoundingClientRect();
  const W = document.getElementById('pdf-canvas').width;
  const H = document.getElementById('pdf-canvas').height;

  state.pendingNotePos = {
    x: (e.clientX - rect.left) / W,
    y: (e.clientY - rect.top)  / H,
  };
  state.editingNoteId = null;
  openNoteEditor('', false);
}

function openNoteEditor(text, showDelete) {
  document.getElementById('note-editor-title').textContent = showDelete ? 'Edit Note' : 'Add Note';
  document.getElementById('note-textarea').value = text;
  document.getElementById('delete-note-btn').classList.toggle('hidden', !showDelete);
  document.getElementById('note-editor-overlay').classList.remove('hidden');
  setTimeout(() => document.getElementById('note-textarea').focus(), 50);
}

function saveNote() {
  const text = document.getElementById('note-textarea').value.trim();
  if (!text) { cancelNote(); return; }

  if (state.editingNoteId) {
    const ann = pageAnnotations().find(a => a.id === state.editingNoteId);
    if (ann) ann.text = text;
  } else {
    addAnnotation({
      id: crypto.randomUUID(),
      type: 'note',
      x: state.pendingNotePos.x,
      y: state.pendingNotePos.y,
      text,
    });
  }
  state.editingNoteId = null;
  state.pendingNotePos = null;
  cancelNote();
  renderAnnotations();
  scheduleSave();
}

function deleteNote() {
  if (state.editingNoteId) removeAnnotation(state.editingNoteId);
  state.editingNoteId = null;
  cancelNote();
  renderAnnotations();
  scheduleSave();
}

function cancelNote() {
  document.getElementById('note-editor-overlay').classList.add('hidden');
}
```

- [ ] **Step 2: Replace the `renderAnnotations` stub with the full implementation**

Find `function renderAnnotations()` (the stub from Task 7) and replace it entirely:

```js
function renderAnnotations() {
  const layer  = document.getElementById('annotation-layer');
  const canvas = document.getElementById('pdf-canvas');
  const W = canvas.width;
  const H = canvas.height;
  layer.style.width  = W + 'px';
  layer.style.height = H + 'px';
  layer.innerHTML = '';

  for (const ann of pageAnnotations()) {
    if (ann.type === 'highlight') {
      for (const r of ann.rects) {
        const div = document.createElement('div');
        div.className = 'highlight-rect';
        div.dataset.color = ann.color;
        div.dataset.annId = ann.id;
        div.style.left   = (r.x * W) + 'px';
        div.style.top    = (r.y * H) + 'px';
        div.style.width  = (r.w * W) + 'px';
        div.style.height = (r.h * H) + 'px';
        div.title = ann.selectedText ? `"${ann.selectedText}"\n(Shift+click to remove)` : 'Shift+click to remove';
        div.addEventListener('click', e => {
          e.stopPropagation();
          if (e.shiftKey) { removeAnnotation(ann.id); renderAnnotations(); scheduleSave(); }
        });
        layer.appendChild(div);
      }
    } else if (ann.type === 'note') {
      const pin = document.createElement('div');
      pin.className = 'note-pin';
      pin.textContent = '📝';
      pin.style.left = (ann.x * W) + 'px';
      pin.style.top  = (ann.y * H) + 'px';
      pin.title = ann.text;
      pin.addEventListener('click', e => {
        e.stopPropagation();
        state.editingNoteId = ann.id;
        state.pendingNotePos = { x: ann.x, y: ann.y };
        openNoteEditor(ann.text, true);
      });
      layer.appendChild(pin);
    }
  }
}
```

- [ ] **Step 3: Wire note events in `bindEvents`**

Append inside `bindEvents()`:

```js
  document.getElementById('note-btn').addEventListener('click', toggleNoteMode);
  document.getElementById('page-container').addEventListener('click', handlePageClick);
  document.getElementById('save-note-btn').addEventListener('click', saveNote);
  document.getElementById('delete-note-btn').addEventListener('click', deleteNote);
  document.getElementById('cancel-note-btn').addEventListener('click', cancelNote);
```

- [ ] **Step 4: End-to-end annotation test**

1. Open any book, go to page 1.
2. Toggle Highlight → select a sentence → pick Yellow → colored rect appears over the selected text.
3. Shift+click the highlight rect → it disappears.
4. Add a new highlight. Toggle Highlight off.
5. Toggle Note → click somewhere on the page → editor opens → type "Test note" → Save → 📝 pin appears.
6. Click the pin → editor reopens with "Test note" → change text → Save → title updates.
7. Click pin → Delete → pin disappears.
8. Navigate to page 2 and back to page 1 → highlight still there.
9. Hard-refresh (`Ctrl+Shift+R`) → re-open same book + page → highlight persists (loaded from JSON).
10. Check `web/data/pdf-annotations.json` — should contain the highlight annotation with correct rects.

- [ ] **Step 5: Commit**

```
git add web/public/rulebooks.js
git commit -m "feat: note pins, full annotation rendering (highlights + notes)"
```

---

### Task 10: JS — Annotation persistence verification

**Files:**
- No new code — verification task

- [ ] **Step 1: Confirm debounced save fires correctly**

Open DevTools → Network tab. Add a highlight on any page. Wait 500ms.
Expected: One POST to `/api/annotations` fires. Response is `{ "ok": true }`.

- [ ] **Step 2: Confirm no save fires on navigation alone**

Navigate between pages (no annotation changes). 
Expected: No POST to `/api/annotations`.

- [ ] **Step 3: Check JSON structure is correct**

Open `web/data/pdf-annotations.json`. Verify:
- Top-level keys: `collections`, `bookmarks`, `annotations`
- `annotations` is keyed `"<bookId>" → "<pageNum>" → [array of annotation objects]`
- Highlight rects are stored as `{ x, y, w, h }` fractions (values between 0 and 1)
- Note positions are stored as `{ x, y }` fractions

- [ ] **Step 4: Commit (annotations file with test data)**

```
git add web/data/pdf-annotations.json
git commit -m "test: verify annotation JSON structure"
```

---

### Task 11: JS — Bookmarks panel

**Files:**
- Modify: `web/public/rulebooks.js`

- [ ] **Step 1: Add bookmark data functions**

```js
// ── Bookmarks ─────────────────────────────────────────────────────────────────
function addBookmark(label) {
  const bm = {
    id: crypto.randomUUID(),
    bookId: state.currentBookId,
    page: state.currentPage,
    label,
    collectionIds: [],
  };
  state.annotations.bookmarks.push(bm);
  scheduleSave();
  renderBookmarksPanel();
}

function removeBookmark(bmId) {
  state.annotations.bookmarks = state.annotations.bookmarks.filter(b => b.id !== bmId);
  for (const col of state.annotations.collections) {
    col.bookmarkIds = col.bookmarkIds.filter(id => id !== bmId);
  }
  scheduleSave();
  renderBookmarksPanel();
}

async function jumpToBookmark(bm) {
  await openBook(bm.bookId);
  goToPage(bm.page);
}
```

- [ ] **Step 2: Add bookmark label prompt state and wiring**

```js
let _pendingBmCallback = null;

function promptBookmarkLabel(onSave) {
  _pendingBmCallback = onSave;
  const existing = state.annotations.bookmarks.find(
    b => b.bookId === state.currentBookId && b.page === state.currentPage
  );
  document.getElementById('bm-label-input').value = existing ? existing.label : `Page ${state.currentPage}`;
  document.getElementById('bm-label-overlay').classList.remove('hidden');
  setTimeout(() => document.getElementById('bm-label-input').select(), 50);
}
```

- [ ] **Step 3: Replace the `renderBookmarksPanel` stub with the full implementation**

Find and replace `function renderBookmarksPanel(){ /* Task 11 */ }`:

```js
function renderBookmarksPanel() {
  const container = document.getElementById('collections-container');
  container.innerHTML = '';

  const bms  = state.annotations.bookmarks;
  const cols = state.annotations.collections;

  // Named collections
  for (const col of cols) {
    const colBms = col.bookmarkIds.map(id => bms.find(b => b.id === id)).filter(Boolean);

    const block = document.createElement('div');
    block.className = 'collection-block';

    const header = document.createElement('div');
    header.className = 'collection-header';
    header.innerHTML = `<span class="arrow">▾</span> ${esc(col.name)}`;

    const ul = document.createElement('ul');
    ul.className = 'bm-list';
    for (const bm of colBms) ul.appendChild(makeBmItem(bm));

    header.addEventListener('click', () => {
      header.classList.toggle('collapsed');
      ul.classList.toggle('hidden');
    });

    block.appendChild(header);
    block.appendChild(ul);
    container.appendChild(block);
  }

  // Unsorted bookmarks
  const unsorted = bms.filter(b => !b.collectionIds.length);
  if (unsorted.length) {
    const section = document.createElement('div');
    section.className = 'unassigned-section';
    const label = document.createElement('div');
    label.className = 'bm-panel-header';
    label.textContent = 'Unsorted';
    const ul = document.createElement('ul');
    ul.className = 'bm-list';
    for (const bm of unsorted) ul.appendChild(makeBmItem(bm));
    section.appendChild(label);
    section.appendChild(ul);
    container.appendChild(section);
  }
}

function makeBmItem(bm) {
  const bookName = bm.bookId.split('/').pop().replace(/\.pdf$/i, '');
  const li = document.createElement('li');
  li.className = 'bm-item';
  li.innerHTML = `
    <span class="bm-label" title="${esc(bm.label)} — ${esc(bookName)} p.${bm.page}">${esc(bm.label)}</span>
    <span class="bm-delete" title="Remove">✕</span>
  `;
  li.querySelector('.bm-label').addEventListener('click', () => jumpToBookmark(bm));
  li.querySelector('.bm-delete').addEventListener('click', e => {
    e.stopPropagation();
    removeBookmark(bm.id);
  });
  li.addEventListener('contextmenu', e => {
    e.preventDefault();
    showBmContextMenu(bm, e.clientX, e.clientY);
  });
  return li;
}
```

- [ ] **Step 4: Wire bookmark events in `bindEvents`**

Append inside `bindEvents()`:

```js
  document.getElementById('bookmark-btn').addEventListener('click', () => {
    if (!state.currentBookId) return;
    promptBookmarkLabel(label => addBookmark(label));
  });
  document.getElementById('toggle-bookmarks').addEventListener('click', () => {
    document.getElementById('bookmarks-panel').classList.toggle('hidden');
    saveLocalState();
  });
  document.getElementById('save-bm-btn').addEventListener('click', () => {
    const label = document.getElementById('bm-label-input').value.trim() || `Page ${state.currentPage}`;
    document.getElementById('bm-label-overlay').classList.add('hidden');
    if (_pendingBmCallback) { _pendingBmCallback(label); _pendingBmCallback = null; }
  });
  document.getElementById('cancel-bm-btn').addEventListener('click', () => {
    document.getElementById('bm-label-overlay').classList.add('hidden');
    _pendingBmCallback = null;
  });
  document.getElementById('bm-label-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('save-bm-btn').click();
    if (e.key === 'Escape') document.getElementById('cancel-bm-btn').click();
  });
```

- [ ] **Step 5: Test bookmarks**

1. Open a book, go to page 5. Click "⭐ Bookmark" → label prompt pre-filled with "Page 5". Edit to "Grapple Rules" → Save.
2. Bookmark appears in "Unsorted" section of right panel with label "Grapple Rules".
3. Navigate to page 1. Click the "Grapple Rules" bookmark → jumps back to page 5.
4. Click ✕ → bookmark removed.
5. Hard-refresh → bookmarks survive.

- [ ] **Step 6: Commit**

```
git add web/public/rulebooks.js
git commit -m "feat: bookmarks panel — add, jump, remove, panel toggle"
```

---

### Task 12: JS — Collections

**Files:**
- Modify: `web/public/rulebooks.js`

- [ ] **Step 1: Add collection data functions**

```js
// ── Collections ───────────────────────────────────────────────────────────────
function createCollection(name) {
  state.annotations.collections.push({ id: crypto.randomUUID(), name, bookmarkIds: [] });
  scheduleSave();
  renderBookmarksPanel();
}

function addBookmarkToCollection(bmId, colId) {
  const col = state.annotations.collections.find(c => c.id === colId);
  const bm  = state.annotations.bookmarks.find(b => b.id === bmId);
  if (!col || !bm || col.bookmarkIds.includes(bmId)) return;
  col.bookmarkIds.push(bmId);
  bm.collectionIds.push(colId);
  scheduleSave();
  renderBookmarksPanel();
}

function removeBookmarkFromCollection(bmId, colId) {
  const col = state.annotations.collections.find(c => c.id === colId);
  const bm  = state.annotations.bookmarks.find(b => b.id === bmId);
  if (col) col.bookmarkIds = col.bookmarkIds.filter(id => id !== bmId);
  if (bm)  bm.collectionIds = bm.collectionIds.filter(id => id !== colId);
  scheduleSave();
  renderBookmarksPanel();
}
```

- [ ] **Step 2: Add context menu for collection assignment**

```js
function showBmContextMenu(bm, x, y) {
  document.getElementById('bm-ctx-menu')?.remove();

  const menu = document.createElement('div');
  menu.id = 'bm-ctx-menu';
  menu.className = 'ctx-menu';
  menu.style.left = x + 'px';
  menu.style.top  = y + 'px';

  const cols = state.annotations.collections;
  if (!cols.length) {
    const empty = document.createElement('div');
    empty.className = 'ctx-menu-empty';
    empty.textContent = 'No collections yet';
    menu.appendChild(empty);
  } else {
    const lbl = document.createElement('div');
    lbl.className = 'ctx-menu-label';
    lbl.textContent = 'Add to collection';
    menu.appendChild(lbl);

    for (const col of cols) {
      const inCol = col.bookmarkIds.includes(bm.id);
      const item = document.createElement('div');
      item.className = 'ctx-menu-item';
      item.innerHTML = `<span style="color:${inCol ? '#c5a56a' : '#444'}">${inCol ? '✓' : '○'}</span> ${esc(col.name)}`;
      item.addEventListener('click', () => {
        if (inCol) removeBookmarkFromCollection(bm.id, col.id);
        else addBookmarkToCollection(bm.id, col.id);
        menu.remove();
      });
      menu.appendChild(item);
    }
  }

  document.body.appendChild(menu);
  const dismiss = (e) => { if (!menu.contains(e.target)) { menu.remove(); document.removeEventListener('mousedown', dismiss); } };
  setTimeout(() => document.addEventListener('mousedown', dismiss), 0);
}
```

- [ ] **Step 3: Wire new-collection button in `bindEvents`**

Append inside `bindEvents()`:

```js
  document.getElementById('new-collection-btn').addEventListener('click', () => {
    const name = prompt('Collection name:');
    if (name && name.trim()) createCollection(name.trim());
  });
```

- [ ] **Step 4: Test collections**

1. Click "＋ New Collection" → enter "Session Prep" → "Session Prep" appears as accordion header in bookmarks panel.
2. Add two bookmarks on different pages.
3. Right-click a bookmark → context menu shows "Session Prep".
4. Click "Session Prep" → `○` becomes `✓`, bookmark appears under "Session Prep" accordion and disappears from "Unsorted".
5. Right-click the bookmark in "Session Prep" → click to uncheck → moves back to Unsorted.
6. Hard-refresh → collection membership persists.

- [ ] **Step 5: Commit**

```
git add web/public/rulebooks.js
git commit -m "feat: collections — create, assign/unassign via right-click context menu"
```

---

### Task 13: JS — localStorage state persistence

**Files:**
- Modify: `web/public/rulebooks.js`

- [ ] **Step 1: Replace `saveLocalState` and `loadLocalState` stubs with full implementations**

Find the two stubs and replace them:

```js
// ── localStorage state ────────────────────────────────────────────────────────
function saveLocalState() {
  localStorage.setItem('rulebooks_v1', JSON.stringify({
    currentBookId: state.currentBookId,
    currentPage:   state.currentPage,
    zoom:          state.zoom,
    bmPanelHidden: document.getElementById('bookmarks-panel').classList.contains('hidden'),
  }));
}

function loadLocalState() {
  let saved;
  try { saved = JSON.parse(localStorage.getItem('rulebooks_v1') || 'null'); } catch { return; }
  if (!saved) return;

  if (saved.zoom) {
    state.zoom = saved.zoom;
    document.getElementById('zoom-display').textContent = Math.round(state.zoom * 100) + '%';
  }
  if (saved.bmPanelHidden) {
    document.getElementById('bookmarks-panel').classList.add('hidden');
  }
  if (saved.currentBookId) {
    state.currentPage = saved.currentPage || 1;
    openBook(saved.currentBookId);
  }
}
```

- [ ] **Step 2: Full smoke test**

- [ ] Library shows all ~36 books across Core, Setting, and Unearthed Arcana subcategory
- [ ] Click a book → renders in center
- [ ] Page navigation: buttons + keyboard arrows + direct page number input
- [ ] Zoom in/out renders correctly at 50%, 100%, 150%, 200%
- [ ] Highlight mode: select text → color picker → rect appears; Shift+click removes it
- [ ] Note mode: click page → pin appears; click pin to edit; delete removes it
- [ ] Annotations survive page navigation (in-memory)
- [ ] Annotations survive hard refresh (from JSON)
- [ ] Bookmark current page → appears in panel → clicking jumps back
- [ ] Create a collection → assign bookmark via right-click → accordion shows it
- [ ] Collapse bookmarks panel, zoom to 150%, navigate to page 7, hard-refresh → state restored
- [ ] Opening `/rulebooks` in a new tab is fully independent of `localhost:5050`
- [ ] No console errors during normal use

- [ ] **Step 3: Final commit**

```
git add web/public/rulebooks.js
git commit -m "feat: localStorage state — restore last book, page, zoom, panel state"
```

---

## Self-Review

**Spec coverage:**
- ✅ `/rulebooks` separate route → Task 3
- ✅ `/api/books` with Unearthed Arcana subfolder → Task 1
- ✅ `/api/pdf` streaming + path traversal guard → Task 2
- ✅ `/api/annotations` GET + POST → Task 3
- ✅ `web/data/pdf-annotations.json` data model (collections/bookmarks/annotations) → Task 3
- ✅ PDF.js 3.11.174 from CDNJS, single-page render → Task 7
- ✅ Zoom 0.5×–3× → Task 7
- ✅ Text layer from `page.getTextContent()` → Task 7
- ✅ Three-panel layout (library | reader | bookmarks) → Task 4
- ✅ Highlights as percentage-rect divs, 4 colors → Tasks 8, 9
- ✅ Shift+click to remove highlight → Task 9
- ✅ Note pins as percentage-position divs → Task 9
- ✅ Note editor: add / edit / delete → Task 9
- ✅ Debounced 500ms save → Tasks 8, 9, 11
- ✅ Bookmarks: add with label prompt, jump, remove → Task 11
- ✅ Collections: create, assign/unassign via context menu → Task 12
- ✅ `bookId` format `"core/<filename>"` or `"setting/<filename>"` → Tasks 1, 5
- ✅ `localStorage`: last book, page, zoom, panel collapse → Task 13
- ✅ Auth automatic via `app.use(requireAuth)` at line 272 → noted in all route tasks
- ✅ Subfolder PDF route (`Unearthed Arcana/...`) via wildcard → Task 2

**Placeholder scan:** No TBDs, no "implement later", no vague steps. All code blocks present. ✓

**Type/name consistency:**
- `pageAnnotations()` — defined Task 5, used Tasks 8, 9 ✓
- `addAnnotation(ann)` / `removeAnnotation(annId)` — Task 5, used Tasks 8, 9 ✓
- `scheduleSave()` — Task 5, called after every mutation ✓
- `renderAnnotations()` — stub Task 7, full impl Task 9, called in Tasks 7, 8, 9 ✓
- `renderBookmarksPanel()` — stub Task 5, full impl Task 11, called in Tasks 11, 12 ✓
- `openBook(bookId)` — Task 6, used Tasks 11, 13 ✓
- `goToPage(num)` — Task 7, used Tasks 7, 11 ✓
- `saveLocalState()` — stub Task 5, full impl Task 13, called in Tasks 6, 7, 11 ✓
- `esc(str)` — Task 5, used Tasks 11, 12 ✓
- `makeBmItem(bm)` — Task 11, used in Task 11's `renderBookmarksPanel` ✓
- `showBmContextMenu(bm, x, y)` — Task 12, wired in Task 11's `makeBmItem` ✓

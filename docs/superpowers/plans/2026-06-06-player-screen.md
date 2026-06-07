# Player Screen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a public `/player` route that displays DM-pushed content (portraits, handouts, rulebook pages, text) in real time via WebSocket.

**Architecture:** In-memory `playerScreenState` on the server; `POST /api/player-screen` (DM-auth) updates it and broadcasts to all `/ws/player` WebSocket clients; the player screen fetches state on connect and re-renders on each push. The DM dashboard gets a persistent Now Showing strip and contextual send buttons in the NPC viewer, rulebook toolbar, and file header.

**Tech Stack:** Node.js/Express, `ws` npm package (already installed), vanilla JS, no new dependencies.

---

## File Map

| File | Action | What changes |
|------|--------|--------------|
| `web/server.js` | Modify | `playerScreenState` global, `broadcastPlayerScreen()`, `GET`+`POST /api/player-screen`, `/player` route, `/ws/player` WSS, PUBLIC_PREFIXES update |
| `web/public/player.html` | **Create** | Full player screen: all content states, WebSocket, auto-reconnect |
| `web/public/rulebooks.html` | Modify | Embed-mode CSS + Send Page button in toolbar |
| `web/public/rulebooks.js` | Modify | Embed-mode detection + auto-open from URL params + Send Page handler |
| `web/public/index.html` | Modify | Player strip HTML+CSS, `btn-send-player` in header, `btn-player` in nav |
| `web/public/app.js` | Modify | `sendToPlayerScreen()`, `initPlayerStrip()`, NPC send-portrait, handout send |

---

### Task 1: Server — state, REST endpoints, /player route

**Files:**
- Modify: `web/server.js`

The server needs three things added before the WebSocket section: in-memory state + broadcast helper, REST routes, and the `/player` HTML route.

- [ ] **Step 1: Add playerScreenState and broadcastPlayerScreen globals**

Find this line in `web/server.js` (around line 40):
```js
const indexingNow = new Set(); // bookIds currently being indexed in background
```

Insert immediately after it:
```js
let playerScreenState = { type: 'idle', idleMessage: null };
let playerWss = null; // assigned later after server is created

function broadcastPlayerScreen() {
  if (!playerWss) return;
  const msg = JSON.stringify(playerScreenState);
  playerWss.clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) ws.send(msg);
  });
}
```

- [ ] **Step 2: Add /player and /api/player-screen routes**

Find this block in `web/server.js` (around line 3121):
```js
app.get('/rulebooks', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'rulebooks.html'));
});
```

Insert immediately after it:
```js
// ─── Player Screen ────────────────────────────────────────────────────────────

app.get('/player', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'player.html'));
});

app.get('/api/player-screen', (req, res) => {
  res.json(playerScreenState);
});

app.post('/api/player-screen', (req, res) => {
  // POST is auth-gated even though route prefix is in PUBLIC_PREFIXES (GET is public)
  if (verifyValue(req.cookies[COOKIE_NAME]) !== 'dm') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { type, url, caption, content, title, markdown, bookId, page, idleMessage } = req.body;
  const VALID_TYPES = ['idle', 'image', 'text', 'handout', 'rulebook'];
  if (!VALID_TYPES.includes(type)) return res.status(400).json({ error: 'Invalid type' });
  if (type === 'image'    && !url)      return res.status(400).json({ error: 'url required' });
  if (type === 'text'     && !content)  return res.status(400).json({ error: 'content required' });
  if (type === 'handout'  && !markdown) return res.status(400).json({ error: 'markdown required' });
  if (type === 'rulebook' && !bookId)   return res.status(400).json({ error: 'bookId required' });

  if (type === 'idle') {
    playerScreenState = { type: 'idle', idleMessage: idleMessage || null };
  } else if (type === 'image') {
    playerScreenState = { type: 'image', url, caption: caption || null };
  } else if (type === 'text') {
    playerScreenState = { type: 'text', content };
  } else if (type === 'handout') {
    playerScreenState = { type: 'handout', title: title || '', markdown };
  } else if (type === 'rulebook') {
    playerScreenState = { type: 'rulebook', bookId, page: Number(page) || 1 };
  }

  broadcastPlayerScreen();
  res.json({ ok: true });
});
```

- [ ] **Step 3: Add /player and /api/player-screen to PUBLIC_PREFIXES**

Find (around line 377):
```js
const PUBLIC_PREFIXES = [
  '/login', '/api/login', '/api/logout',
  // Rulebook viewer — public so players can be given the link
  '/rulebooks', '/api/pdf', '/api/books', '/api/annotations',
  '/api/pdf-search',
];
```

Replace with:
```js
const PUBLIC_PREFIXES = [
  '/login', '/api/login', '/api/logout',
  // Rulebook viewer — public so players can be given the link
  '/rulebooks', '/api/pdf', '/api/books', '/api/annotations',
  '/api/pdf-search',
  // Player screen — public display + DM reads state (POST auth checked inside handler)
  '/player', '/api/player-screen',
];
```

- [ ] **Step 4: Manual test — start server and check routes**

```bash
cd web && node server.js
```

In a second terminal (or browser):
```bash
curl http://localhost:5050/api/player-screen
# Expected: {"type":"idle","idleMessage":null}

curl http://localhost:5050/player
# Expected: HTML response (player.html doesn't exist yet — will be 404, that's fine for now)

curl -X POST http://localhost:5050/api/player-screen \
  -H "Content-Type: application/json" \
  -d '{"type":"text","content":"hello"}'
# Expected: {"error":"Unauthorized"} with status 401

# With auth cookie (replace TOKEN with actual value from dm_auth cookie):
curl -X POST http://localhost:5050/api/player-screen \
  -H "Content-Type: application/json" \
  -H "Cookie: dm_auth=TOKEN" \
  -d '{"type":"invalid"}'
# Expected: {"error":"Invalid type"} with status 400
```

- [ ] **Step 5: Commit**

```bash
git add web/server.js
git commit -m "feat: player screen REST endpoints and state"
```

---

### Task 2: Server — /ws/player WebSocket

**Files:**
- Modify: `web/server.js`

- [ ] **Step 1: Add playerWss creation near server startup**

Find this block (around line 3244):
```js
const HOST = process.env.HOST || '0.0.0.0';
server.listen(PORT, HOST, () => {
```

Insert immediately before it:
```js
// Player screen WebSocket — push state to all /player clients
playerWss = new WebSocket.Server({ server, path: '/ws/player' });
playerWss.on('connection', ws => {
  // Send current state immediately so clients joining mid-session are in sync
  ws.send(JSON.stringify(playerScreenState));
});
```

- [ ] **Step 2: Manual test — verify WebSocket sends state on connect**

Start the server. Open a browser console on any page at localhost:5050 and run:
```js
const ws = new WebSocket('ws://localhost:5050/ws/player');
ws.onmessage = e => console.log('received:', e.data);
// Expected: received: {"type":"idle","idleMessage":null}
```

Then in another tab, POST a change (must be logged in as DM) and verify the WebSocket receives the broadcast:
```js
// On the same browser console (authenticated):
fetch('/api/player-screen', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ type: 'text', content: 'Test broadcast' }),
});
// Expected on the ws.onmessage above: received: {"type":"text","content":"Test broadcast"}
```

- [ ] **Step 3: Commit**

```bash
git add web/server.js
git commit -m "feat: /ws/player WebSocket broadcasts player screen state"
```

---

### Task 3: Player screen HTML

**Files:**
- Create: `web/public/player.html`

- [ ] **Step 1: Create the player screen file**

Create `web/public/player.html` with this full content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Player Screen — Northwatch Wardens</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: #111; color: #e0d8c8;
      font-family: 'Segoe UI', system-ui, sans-serif;
      width: 100vw; height: 100vh; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
    }

    /* ── Content wrapper (fades on transition) ── */
    #content {
      width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      transition: opacity 0.2s;
    }
    #content.fading { opacity: 0; }

    /* ── Idle ── */
    #view-idle { text-align: center; padding: 40px; }
    #view-idle h1 {
      font-size: clamp(2rem, 6vw, 5rem); color: #c5a56a;
      letter-spacing: 0.05em;
      font-family: 'Palatino Linotype', Palatino, serif;
    }
    #idle-message {
      font-size: clamp(1rem, 2.5vw, 2rem); color: #555;
      margin-top: 1rem; min-height: 1em;
    }

    /* ── Image ── */
    #view-image {
      display: flex; flex-direction: column; align-items: center; gap: 16px;
    }
    #img-el {
      max-width: 90vw; max-height: 85vh;
      object-fit: contain; border-radius: 4px;
    }
    #img-caption {
      font-size: clamp(0.9rem, 2vw, 1.4rem); color: #c5a56a; text-align: center;
    }

    /* ── Text ── */
    #view-text { max-width: 80vw; text-align: center; }
    #text-content {
      font-size: clamp(1.5rem, 4vw, 3.5rem); color: #e0d8c8;
      line-height: 1.4; font-family: 'Palatino Linotype', Palatino, serif;
    }

    /* ── Handout ── */
    #view-handout {
      background: #f5e9c8; color: #3a2a10;
      padding: clamp(24px, 4vw, 60px);
      border-radius: 4px;
      max-width: min(700px, 90vw);
      max-height: 90vh; overflow-y: auto;
      font-family: 'Palatino Linotype', Palatino, serif;
      box-shadow: 0 8px 40px rgba(0,0,0,.7);
    }
    #view-handout .handout-title {
      font-size: clamp(1.3rem, 3.5vw, 2.2rem); color: #58180d;
      margin-bottom: 1em; border-bottom: 2px solid #c5a56a;
      padding-bottom: 0.4em; font-weight: bold;
    }
    #view-handout h1 { font-size: clamp(1.2rem, 3vw, 2rem); color: #58180d; margin: 0.8em 0 0.4em; border-bottom: 1px solid #c5a56a; padding-bottom: 0.2em; }
    #view-handout h2 { font-size: clamp(1rem, 2vw, 1.4rem); color: #58180d; margin: 0.8em 0 0.3em; }
    #view-handout h3 { font-size: clamp(0.9rem, 1.8vw, 1.2rem); color: #7a3010; margin: 0.6em 0 0.2em; }
    #view-handout p  { margin: 0.5em 0; line-height: 1.6; font-size: clamp(0.85rem, 1.5vw, 1.1rem); }
    #view-handout ul { margin: 0.5em 0 0.5em 1.5em; }
    #view-handout li { margin: 0.3em 0; line-height: 1.5; font-size: clamp(0.85rem, 1.5vw, 1.1rem); }
    #view-handout hr { border: none; border-top: 1px solid #c5a56a; margin: 1em 0; }

    /* ── Rulebook (full-screen iframe) ── */
    #view-rulebook { position: absolute; inset: 0; }
    #view-rulebook iframe { width: 100%; height: 100%; border: none; }

    /* ── Reconnect indicator ── */
    #reconnect-indicator {
      position: fixed; bottom: 12px; right: 12px;
      background: rgba(0,0,0,.75); color: #666;
      font-size: 11px; padding: 4px 10px; border-radius: 3px;
      display: none; font-family: sans-serif;
    }
    #reconnect-indicator.visible { display: block; }

    .ps-hidden { display: none !important; }
  </style>
</head>
<body>

<div id="content">
  <div id="view-idle">
    <h1>Northwatch Wardens</h1>
    <p id="idle-message"></p>
  </div>

  <div id="view-image" class="ps-hidden">
    <img id="img-el" src="" alt="">
    <div id="img-caption"></div>
  </div>

  <div id="view-text" class="ps-hidden">
    <p id="text-content"></p>
  </div>

  <div id="view-handout" class="ps-hidden"></div>

  <div id="view-rulebook" class="ps-hidden">
    <iframe id="rulebook-frame" src="" title="Rulebook page"></iframe>
  </div>
</div>

<div id="reconnect-indicator">⚡ reconnecting…</div>

<script>
'use strict';

const views = {
  idle:     document.getElementById('view-idle'),
  image:    document.getElementById('view-image'),
  text:     document.getElementById('view-text'),
  handout:  document.getElementById('view-handout'),
  rulebook: document.getElementById('view-rulebook'),
};
const content      = document.getElementById('content');
const reconnectEl  = document.getElementById('reconnect-indicator');

// ── Minimal markdown renderer (headings, bold, italic, lists, hr, paragraphs) ──
function renderMd(md) {
  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function inline(s) {
    return esc(s)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g,     '<em>$1</em>');
  }
  const lines = md.split('\n');
  let html = '';
  let inList = false;
  const closeList = () => { if (inList) { html += '</ul>'; inList = false; } };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if      (/^---+$/.test(line))  { closeList(); html += '<hr>'; }
    else if (/^### (.*)/.test(line)) { closeList(); html += `<h3>${inline(line.slice(4))}</h3>`; }
    else if (/^## (.*)/.test(line))  { closeList(); html += `<h2>${inline(line.slice(3))}</h2>`; }
    else if (/^# (.*)/.test(line))   { closeList(); html += `<h1>${inline(line.slice(2))}</h1>`; }
    else if (/^- (.*)/.test(line))   {
      if (!inList) { html += '<ul>'; inList = true; }
      html += `<li>${inline(line.slice(2))}</li>`;
    }
    else if (line === '') { closeList(); }
    else                  { closeList(); html += `<p>${inline(line)}</p>`; }
  }
  closeList();
  return html;
}

// ── Apply a state object to the screen ────────────────────────────────────────
function applyState(state) {
  content.classList.add('fading');
  setTimeout(() => {
    Object.values(views).forEach(v => v.classList.add('ps-hidden'));

    if (state.type === 'idle') {
      document.getElementById('idle-message').textContent = state.idleMessage || '';
      views.idle.classList.remove('ps-hidden');

    } else if (state.type === 'image') {
      document.getElementById('img-el').src = state.url;
      const cap = document.getElementById('img-caption');
      cap.textContent = state.caption || '';
      cap.style.display = state.caption ? '' : 'none';
      views.image.classList.remove('ps-hidden');

    } else if (state.type === 'text') {
      document.getElementById('text-content').textContent = state.content;
      views.text.classList.remove('ps-hidden');

    } else if (state.type === 'handout') {
      const el = views.handout;
      const titleHtml = state.title
        ? `<div class="handout-title">${state.title}</div>`
        : '';
      el.innerHTML = titleHtml + renderMd(state.markdown);
      el.classList.remove('ps-hidden');

    } else if (state.type === 'rulebook') {
      const params = new URLSearchParams({
        book:  state.bookId,
        page:  String(state.page),
        embed: '1',
      });
      document.getElementById('rulebook-frame').src = `/rulebooks?${params}`;
      views.rulebook.classList.remove('ps-hidden');
    }

    content.classList.remove('fading');
  }, 200);
}

// ── WebSocket with auto-reconnect ──────────────────────────────────────────────
function connect() {
  const ws = new WebSocket(`ws://${location.host}/ws/player`);

  ws.addEventListener('open', () => {
    reconnectEl.classList.remove('visible');
  });

  ws.addEventListener('message', e => {
    try { applyState(JSON.parse(e.data)); } catch {}
  });

  ws.addEventListener('close', () => {
    reconnectEl.classList.add('visible');
    setTimeout(connect, 3000);
  });
}

connect();
</script>
</body>
</html>
```

- [ ] **Step 2: Verify the player screen loads**

With the server running, open `http://localhost:5050/player` in a browser.

Expected: dark screen with "Northwatch Wardens" in gold, centered. No errors in console.

Then from the DM dashboard browser console (authenticated session):
```js
fetch('/api/player-screen', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ type: 'text', content: 'A shadow falls over the village.' }),
});
```

Expected: player screen transitions to the announcement text within 200ms.

- [ ] **Step 3: Test image state**

```js
fetch('/api/player-screen', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ type: 'image', url: '/portraits/thorne.jpg', caption: 'Marshal Brenna Thorne' }),
});
```

Expected: player screen shows the portrait with caption below.

- [ ] **Step 4: Test idle state**

```js
fetch('/api/player-screen', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ type: 'idle', idleMessage: 'Session begins shortly…' }),
});
```

Expected: player screen returns to idle with the custom subtitle.

- [ ] **Step 5: Test reconnect**

Open `/player`. Kill and restart the server. Within 3 seconds, the reconnect indicator should appear, then disappear when the server is back, and the current state should be restored (the server sends state on connect).

- [ ] **Step 6: Commit**

```bash
git add web/public/player.html
git commit -m "feat: player screen HTML with WebSocket and all content states"
```

---

### Task 4: Rulebooks embed mode

**Files:**
- Modify: `web/public/rulebooks.html`
- Modify: `web/public/rulebooks.js`

When the player screen sends a rulebook page, it iframes `/rulebooks?book=...&page=...&embed=1`. The embed mode hides all UI chrome and auto-opens the book at the specified page.

- [ ] **Step 1: Add embed CSS to rulebooks.html**

Find the `/* ── Cursor modes ── */` section near the bottom of the `<style>` block in `web/public/rulebooks.html`:
```css
/* Cursor modes */
body.highlight-mode #text-layer { cursor: text; }
body.note-mode #page-container { cursor: crosshair; }
body.note-mode #text-layer { pointer-events: none; }
```

Insert immediately after the closing `</style>` comment (before `</style>`):
```css

/* ── Embed mode (player screen via iframe) ── */
body.embed #header,
body.embed #library-panel,
body.embed #toolbar,
body.embed #bookmarks-panel { display: none !important; }
body.embed #main { height: 100vh; }
body.embed #scroll-area { padding: 0; }
```

- [ ] **Step 2: Add Send Page button to rulebooks toolbar**

Find the toolbar in `web/public/rulebooks.html`:
```html
      <button id="bookmark-btn" disabled title="Bookmark this page">⭐ Bookmark</button>
```

Replace with:
```html
      <button id="bookmark-btn" disabled title="Bookmark this page">⭐ Bookmark</button>
      <div class="toolbar-sep"></div>
      <button id="send-player-btn" disabled title="Send current page to player screen">📺 Send Page</button>
```

- [ ] **Step 3: Add embed detection and auto-open to rulebooks.js**

Find the `async function init()` in `web/public/rulebooks.js`:
```js
async function init() {
  try {
    const [books, annotations] = await Promise.all([apiLoadBooks(), apiLoadAnnotations()]);
    state.books = books;
    state.annotations = annotations;
  } catch (e) {
    console.error('Rulebooks init error:', e);
  }
  loadFavorites();
  renderLibrary();
  renderBookmarksPanel();
  loadLocalState();
  bindEvents();
}
```

Replace with:
```js
async function init() {
  // Embed mode: hide UI chrome, auto-open book from URL params
  const _params    = new URLSearchParams(location.search);
  const _isEmbed   = _params.get('embed') === '1';
  const _embedBook = _params.get('book');
  const _embedPage = parseInt(_params.get('page'), 10) || 1;

  if (_isEmbed) document.body.classList.add('embed');

  try {
    const [books, annotations] = await Promise.all([apiLoadBooks(), apiLoadAnnotations()]);
    state.books = books;
    state.annotations = annotations;
  } catch (e) {
    console.error('Rulebooks init error:', e);
  }

  if (!_isEmbed) {
    loadFavorites();
    renderLibrary();
    renderBookmarksPanel();
    loadLocalState();
    bindEvents();
  }

  if (_embedBook) {
    openBook(_embedBook, _embedPage);
  }
}
```

- [ ] **Step 4: Add Send Page button to openBook (enable it when book opens)**

Find in `web/public/rulebooks.js` the line that enables toolbar buttons:
```js
  ['prev-btn','next-btn','zoom-in-btn','zoom-out-btn','highlight-btn','note-btn','bookmark-btn','page-input']
    .forEach(id => { const el = document.getElementById(id); if (el) el.disabled = false; });
```

Replace with:
```js
  ['prev-btn','next-btn','zoom-in-btn','zoom-out-btn','highlight-btn','note-btn','bookmark-btn','send-player-btn','page-input']
    .forEach(id => { const el = document.getElementById(id); if (el) el.disabled = false; });
```

- [ ] **Step 5: Wire Send Page button in bindEvents**

Find the `// ── Full-text search ──` comment in `bindEvents()`. Insert before it:
```js
  // ── Send current page to player screen ───────────────────────────────────
  document.getElementById('send-player-btn').addEventListener('click', async () => {
    if (!state.currentBookId) return;
    try {
      await fetch('/api/player-screen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type:   'rulebook',
          bookId: state.currentBookId,
          page:   state.currentPage,
        }),
      });
    } catch (e) {
      console.error('Send page failed:', e);
    }
  });

```

- [ ] **Step 6: Manual test — embed mode**

With the server running, find a valid bookId (e.g. from the library panel). Then open:
```
http://localhost:5050/rulebooks?book=core%2FPlayer's%20Handbook.pdf&page=42&embed=1
```

Expected: page opens with no header, no library panel, no toolbar — just the PDF canvas at page 42.

- [ ] **Step 7: Manual test — Send Page**

Open the rulebook viewer normally. Open a book, navigate to a page. Click "📺 Send Page". Open `http://localhost:5050/player` in another tab.

Expected: player screen shows the rulebook page via the embed iframe.

- [ ] **Step 8: Commit**

```bash
git add web/public/rulebooks.html web/public/rulebooks.js
git commit -m "feat: rulebooks embed mode and Send Page to player button"
```

---

### Task 5: DM Now Showing strip

**Files:**
- Modify: `web/public/index.html`
- Modify: `web/public/app.js`

A slim persistent strip below the tabbar showing what's on the player screen, with Clear, Open, Message, and Edit idle message controls.

- [ ] **Step 1: Add player strip HTML and CSS to index.html**

Find this line in `web/public/index.html`:
```html
  <!-- Season picker (body-level so it escapes tabbar overflow clipping) -->
  <div id="season-picker" hidden></div>
```

Insert immediately before it:
```html
  <!-- Player screen Now Showing strip -->
  <div id="player-strip">
    <span id="ps-icon">📺</span>
    <span id="ps-status-text">Idle</span>
    <button id="ps-clear" class="ps-action" hidden>✕ Clear</button>
    <div id="ps-msg-wrap" hidden>
      <input id="ps-msg-input" type="text" placeholder="Message to players…" maxlength="500">
      <button id="ps-msg-send" class="ps-action">Send</button>
      <button id="ps-msg-cancel" class="ps-action ps-action--muted">✕</button>
    </div>
    <div id="ps-idle-wrap" hidden>
      <input id="ps-idle-input" type="text" placeholder="Idle screen message…" maxlength="200">
      <button id="ps-idle-save" class="ps-action">Save</button>
      <button id="ps-idle-cancel" class="ps-action ps-action--muted">✕</button>
    </div>
    <div class="ps-right">
      <button id="ps-msg-btn"  class="ps-action" title="Send a message to players">✉</button>
      <button id="ps-idle-btn" class="ps-action" title="Edit idle screen message">✏ Idle</button>
      <button id="ps-open"     class="ps-action ps-action--open" title="Open player screen in new tab">Open ↗</button>
    </div>
  </div>

```

Add the CSS for the strip. Find the **closing** `</style>` tag in `index.html` (this is the large `<style>` block that starts around line 29, after the inline theme `<script>`). Insert the following CSS immediately before that `</style>` tag:
```css
    /* ── Player Screen strip ── */
    #player-strip {
      display: flex; align-items: center; gap: 8px;
      padding: 4px 12px; background: #0a0a0a; border-bottom: 1px solid #1e1e1e;
      flex-shrink: 0; font-size: 12px; font-family: sans-serif; min-height: 28px;
    }
    #ps-icon { font-size: 13px; flex-shrink: 0; }
    #ps-status-text { color: #666; flex-shrink: 0; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 260px; }
    .ps-action {
      padding: 2px 8px; background: #181818; border: 1px solid #2a2a2a;
      border-radius: 3px; color: #aaa; cursor: pointer; font-size: 11px;
      font-family: sans-serif; white-space: nowrap; flex-shrink: 0;
    }
    .ps-action:hover { background: #222; border-color: #444; color: #ccc; }
    .ps-action--muted { color: #555; }
    .ps-action--open  { color: #c5a56a; border-color: #4a3820; }
    .ps-action--open:hover { background: #2a1e08; }
    #ps-clear { color: #666; }
    #ps-clear:hover { color: #f38ba8; border-color: #f38ba8; }
    #ps-msg-wrap, #ps-idle-wrap { display: flex; align-items: center; gap: 4px; }
    #ps-msg-input, #ps-idle-input {
      background: #181818; border: 1px solid #2a2a2a; color: #ccc;
      border-radius: 3px; padding: 2px 8px; font-size: 11px;
      font-family: sans-serif; width: 200px;
    }
    #ps-msg-input:focus, #ps-idle-input:focus { outline: 1px solid #c5a56a; border-color: #4a3820; }
    .ps-right { margin-left: auto; display: flex; gap: 6px; align-items: center; flex-shrink: 0; }
```

- [ ] **Step 2: Add btn-send-player to the header bar**

Find in `web/public/index.html`:
```html
    <button id="btn-print" title="Print this handout" hidden>🖨 Print</button>
```

Insert immediately after it:
```html
    <button id="btn-send-player" title="Send handout to player screen" hidden>📺 Send</button>
```

- [ ] **Step 3: Add initPlayerStrip and sendToPlayerScreen to app.js**

Find the `// ─── Rulebooks tab` section in `web/public/app.js`:
```js
// ─── Rulebooks tab ────────────────────────────────────────────────────────────
let _rulebooksTab = null;
```

Insert immediately before it:
```js
// ─── Player Screen ────────────────────────────────────────────────────────────

async function sendToPlayerScreen(payload) {
  try {
    const r = await fetch('/api/player-screen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!r.ok) console.error('sendToPlayerScreen failed:', r.status);
  } catch (e) {
    console.error('sendToPlayerScreen error:', e);
  }
}

function psDescribe(state) {
  if (!state) return 'Idle';
  if (state.type === 'idle') {
    return state.idleMessage ? `Idle — "${state.idleMessage}"` : 'Idle';
  }
  if (state.type === 'image') {
    return `Image: ${state.caption || state.url.split('/').pop()}`;
  }
  if (state.type === 'text') {
    const preview = state.content.length > 40 ? state.content.slice(0, 40) + '…' : state.content;
    return `Message: "${preview}"`;
  }
  if (state.type === 'handout') return `Handout: ${state.title || '(untitled)'}`;
  if (state.type === 'rulebook') return `Rulebook p.${state.page}`;
  return 'Idle';
}

function psUpdateStrip(state) {
  $('ps-status-text').textContent = psDescribe(state);
  const isIdle = !state || (state.type === 'idle' && !state.idleMessage);
  $('ps-clear').hidden = isIdle;
}

function initPlayerStrip() {
  // Fetch initial state
  fetch('/api/player-screen')
    .then(r => r.json())
    .then(psUpdateStrip)
    .catch(() => {});

  // Live updates via WebSocket
  function connectPlayerWs() {
    const ws = new WebSocket(`ws://${location.host}/ws/player`);
    ws.addEventListener('message', e => {
      try { psUpdateStrip(JSON.parse(e.data)); } catch {}
    });
    ws.addEventListener('close', () => setTimeout(connectPlayerWs, 5000));
  }
  connectPlayerWs();

  // Clear — resets to idle, preserving idleMessage
  $('ps-clear').addEventListener('click', () => {
    fetch('/api/player-screen')
      .then(r => r.json())
      .then(state => sendToPlayerScreen({ type: 'idle', idleMessage: state.idleMessage || null }))
      .catch(() => sendToPlayerScreen({ type: 'idle', idleMessage: null }));
  });

  // Open player screen in new tab
  $('ps-open').addEventListener('click', () => {
    window.open('/player', 'player-screen');
  });

  // Message form
  $('ps-msg-btn').addEventListener('click', () => {
    const wrap = $('ps-msg-wrap');
    wrap.hidden = !wrap.hidden;
    if (!wrap.hidden) { $('ps-idle-wrap').hidden = true; $('ps-msg-input').focus(); }
  });
  $('ps-msg-send').addEventListener('click', () => {
    const content = $('ps-msg-input').value.trim();
    if (!content) return;
    sendToPlayerScreen({ type: 'text', content });
    $('ps-msg-input').value = '';
    $('ps-msg-wrap').hidden = true;
  });
  $('ps-msg-input').addEventListener('keydown', e => {
    if (e.key === 'Enter')  $('ps-msg-send').click();
    if (e.key === 'Escape') $('ps-msg-cancel').click();
  });
  $('ps-msg-cancel').addEventListener('click', () => {
    $('ps-msg-wrap').hidden = true;
    $('ps-msg-input').value = '';
  });

  // Idle message edit form
  $('ps-idle-btn').addEventListener('click', () => {
    const wrap = $('ps-idle-wrap');
    wrap.hidden = !wrap.hidden;
    if (!wrap.hidden) { $('ps-msg-wrap').hidden = true; $('ps-idle-input').focus(); }
  });
  $('ps-idle-save').addEventListener('click', () => {
    const idleMessage = $('ps-idle-input').value.trim() || null;
    sendToPlayerScreen({ type: 'idle', idleMessage });
    $('ps-idle-wrap').hidden = true;
  });
  $('ps-idle-input').addEventListener('keydown', e => {
    if (e.key === 'Enter')  $('ps-idle-save').click();
    if (e.key === 'Escape') $('ps-idle-cancel').click();
  });
  $('ps-idle-cancel').addEventListener('click', () => {
    $('ps-idle-wrap').hidden = true;
    $('ps-idle-input').value = '';
  });
}

```

- [ ] **Step 4: Call initPlayerStrip in DOMContentLoaded**

Find in `web/public/app.js`:
```js
document.addEventListener('DOMContentLoaded', () => {
  setTheme(readPrefs().theme || 'mocha');
  fillTree('', fileTree);
  openPath('gm-lore/welcome.md');
  updateManifestBtn();
  initTerminal();
```

Add `initPlayerStrip();` on a new line after `initTerminal();`:
```js
document.addEventListener('DOMContentLoaded', () => {
  setTheme(readPrefs().theme || 'mocha');
  fillTree('', fileTree);
  openPath('gm-lore/welcome.md');
  updateManifestBtn();
  initTerminal();
  initPlayerStrip();
```

- [ ] **Step 5: Manual test — Now Showing strip**

Open the DM dashboard at `http://localhost:5050`. Expected: a slim dark strip below the tab bar showing "📺 Idle".

Click "✉". Expected: a text input appears. Type "Session starts in 5 minutes" and click Send. Expected: strip updates to show `Message: "Session starts in 5 minutes"` and the Clear button appears.

Click "✕ Clear". Expected: strip returns to "📺 Idle". 

Click "✏ Idle". Expected: idle input appears. Type "Welcome" and save. Expected: strip shows `Idle — "Welcome"`.

Open `/player` in another tab. Expected: idle subtitle reads "Welcome".

- [ ] **Step 6: Commit**

```bash
git add web/public/index.html web/public/app.js
git commit -m "feat: DM Now Showing strip with player screen controls"
```

---

### Task 6: Contextual send buttons

**Files:**
- Modify: `web/public/app.js` (NPC portrait send, handout file send)
- Modify: `web/public/index.html` (btn-send-player already added in Task 5)

- [ ] **Step 1: Wire btn-send-player for handout files**

Find the `openPath` function in `web/public/app.js`. Find the block that controls `btnPrint`:
```js
  // Show print button for handout files (files in *-handouts/ or handouts/ directories)
  const isHandout = /[\\/]handouts[\\/]|[\\/][^/]+-handouts[\\/]/.test(p) && p.endsWith('.md') && !p.endsWith('MANIFEST.md');
  btnPrint.hidden = !isHandout;
```

Insert immediately after it:
```js
  const btnSendPlayer = $('btn-send-player');
  btnSendPlayer.hidden = !isHandout;
  if (isHandout) {
    btnSendPlayer.onclick = async () => {
      try {
        const raw  = await fetch(`/raw?file=${encodeURIComponent(p)}`);
        const markdown = await raw.text();
        // If markdown starts with a # heading, omit title (heading serves as title)
        const filename = p.split('/').pop().replace(/\.md$/i, '');
        const title = markdown.trimStart().startsWith('#') ? '' : filename;
        sendToPlayerScreen({ type: 'handout', title, markdown });
      } catch (e) {
        console.error('Send handout failed:', e);
      }
    };
  }
```

- [ ] **Step 2: Add Send Portrait button to NPC detail view**

Find in `web/public/app.js` the NPC detail template (look for `npc-hero-actions` div). The relevant section looks like:
```js
          <div class="npc-hero-actions">
            ${npc.ac != null ? `<div class="npc-stat-frame"><span class="nsf-label">AC<\span><span class="nsf-val">${npc.ac}<\span><\div>` : ''}
            ${npc.hp != null ? `<div class="npc-stat-frame"><span class="nsf-label">HP<\span><span class="nsf-val">${npc.hp}<\span><\div>` : ''}
            ${npc.speed ? `<div class="npc-stat-frame"><span class="nsf-label">SPD<\span><span class="nsf-val">${escapeHtml(npc.speed)}<\span><\div>` : ''}
            <button class="npc-detail-open">Open full file</button>
          </div>
```

Replace with:
```js
          <div class="npc-hero-actions">
            ${npc.ac != null ? `<div class="npc-stat-frame"><span class="nsf-label">AC<\span><span class="nsf-val">${npc.ac}<\span><\div>` : ''}
            ${npc.hp != null ? `<div class="npc-stat-frame"><span class="nsf-label">HP<\span><span class="nsf-val">${npc.hp}<\span><\div>` : ''}
            ${npc.speed ? `<div class="npc-stat-frame"><span class="nsf-label">SPD<\span><span class="nsf-val">${escapeHtml(npc.speed)}<\span><\div>` : ''}
            <button class="npc-detail-open">Open full file</button>
            ${npc.portrait ? `<button class="npc-send-portrait" data-portrait="${escapeHtml(npc.portrait)}" data-caption="${escapeHtml(npc.name)}">📺 Send Portrait</button>` : ''}
          </div>
```

Then find where the existing `.npc-detail-open` event is wired (immediately after the `innerHTML = ...` assignment):
```js
  m.querySelector('.npc-detail-open').addEventListener('click', () => {
    openPath(npc.path);
    closeTopModal();
  });
```

Insert immediately after it:
```js
  const sendPortraitBtn = m.querySelector('.npc-send-portrait');
  if (sendPortraitBtn) {
    sendPortraitBtn.addEventListener('click', () => {
      sendToPlayerScreen({
        type:    'image',
        url:     sendPortraitBtn.dataset.portrait,
        caption: sendPortraitBtn.dataset.caption,
      });
    });
  }
```

- [ ] **Step 3: Manual test — handout send**

Open the DM dashboard. Navigate to any file inside a `handouts/` directory (e.g. `adventures/season-1/peril-in-pinebrook-handouts/pb-1-contract.md`). Expected: "📺 Send" button appears in the header bar next to "🖨 Print".

Click "📺 Send". Expected: the Now Showing strip updates to show `Handout: <title>` and the player screen at `/player` displays the handout card.

- [ ] **Step 4: Manual test — NPC portrait send**

Click the "NPCs" tab. Open any NPC with a portrait. Expected: a "📺 Send Portrait" button appears in the `npc-hero-actions` area.

Click it. Expected: the Now Showing strip updates to `Image: <NPC name>` and the player screen shows the portrait.

- [ ] **Step 5: Commit**

```bash
git add web/public/app.js web/public/index.html
git commit -m "feat: contextual send-to-player buttons for handouts and NPC portraits"
```

# Player Screen — Design Spec
**Date:** 2026-06-06  
**Status:** Approved

## Overview

A public `/player` route the DM can display on a TV or second monitor for players. The DM pushes content from the existing dashboard — NPC portraits, handouts, rulebook pages, or typed announcements — and the player screen updates instantly via WebSocket. Multiple player screens can be open simultaneously.

---

## Architecture

```
DM Dashboard                    Server                    Player Screen(s)
──────────────                  ──────                    ─────────────────
[Send Portrait]  ──POST /api/player-screen──►  playerScreenState (in-memory)
[Send Page]                                              │
[Send Handout]                                     broadcastPlayerScreen()
[Clear]                                                  │
                                                         ▼
"Now Showing" panel  ◄──GET /api/player-screen──  /ws/player (WSS)  ◄──── browser(s)
```

- **In-memory state** — single `playerScreenState` object on the server. Resets to idle on server restart.
- **REST endpoint** — DM writes via `POST`, everyone reads via `GET`.
- **WebSocket endpoint** — player screens subscribe; server broadcasts on every state change. Player screen fetches `GET /api/player-screen` on first connect to pick up state mid-session.
- **Auth** — `POST /api/player-screen` requires DM auth. `GET /api/player-screen` and `/player` are public (added to `PUBLIC_PREFIXES`). `/ws/player` is public (no auth handshake on WebSocket).

---

## Server Changes (`web/server.js`)

### In-memory state

```js
let playerScreenState = { type: 'idle', idleMessage: null };
```

Initialized at the top of the file alongside other globals.

### `broadcastPlayerScreen()`

```js
function broadcastPlayerScreen() {
  const msg = JSON.stringify(playerScreenState);
  playerWss.clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) ws.send(msg);
  });
}
```

### WebSocket server — `/ws/player`

Second `WebSocket.Server` instance alongside the existing `/terminal` WSS:

```js
const playerWss = new WebSocket.Server({ server, path: '/ws/player' });
playerWss.on('connection', ws => {
  ws.send(JSON.stringify(playerScreenState)); // send current state immediately
});
```

No auth check on connection (public display endpoint).

### `GET /api/player-screen`

Public. Returns `playerScreenState` as JSON. Used by player screen on reconnect and by the DM dashboard "Now Showing" controller on load.

### `POST /api/player-screen`

Auth-gated (DM only). Accepts one of five payload shapes:

| `type` | Additional fields |
|--------|------------------|
| `idle` | `idleMessage: string\|null` |
| `image` | `url: string`, `caption: string\|null` |
| `text` | `content: string` |
| `handout` | `title: string`, `markdown: string` |
| `rulebook` | `bookId: string`, `page: number` |

Validation: `type` must be one of those five values; required fields must be present and non-empty strings where applicable. On valid input: update `playerScreenState`, call `broadcastPlayerScreen()`, return `{ ok: true }`. On invalid: return 400.

### `PUBLIC_PREFIXES` additions

```js
'/player',
'/api/player-screen',
```

`/api/player-screen` is added to PUBLIC_PREFIXES so the unauthenticated player screen can call `GET /api/player-screen` on reconnect. The `POST /api/player-screen` handler compensates by calling `requireAuth(req, res, next)` explicitly at the top of its body before processing the payload — same pattern used elsewhere in the codebase for fine-grained auth within a public prefix.

### Route for player HTML

```js
app.get('/player', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'player.html'));
});
```

---

## Player Screen (`web/public/player.html`)

Single self-contained HTML file. No external dependencies beyond what's already on the server.

### Layout

Full-screen dark background (`#1a1a1a`), centered content area, no UI chrome.

### Content states

**Idle:**
```
        Northwatch Wardens          ← gold (#c5a56a), large
        
        [idle message if set]       ← #888, smaller
```

**Image:**
- Image centered, `max-width: 90vw; max-height: 90vh; object-fit: contain`
- Dark letterbox background
- Optional caption below in gold

**Text:**
- Large centered white text (`font-size: clamp(2rem, 5vw, 4rem)`)
- Good for dramatic announcements

**Handout:**
- Parchment-colored card (`#f5e9c8` background, `#3a2a10` text) centered on dark background
- `max-width: 700px`, generous padding
- Title in bold at top, markdown body rendered below
- Built-in minimal markdown renderer (handles `#` headings, `**bold**`, `*italic*`, paragraphs, `---` dividers — sufficient for handout content)

**Rulebook:**
- Full-screen `<iframe>` pointing to `/rulebooks?book=<bookId>&page=<page>&embed=1`
- No border, 100vw × 100vh

### Embed mode for rulebooks viewer

When `?embed=1` is present in the URL, `rulebooks.html` hides the library panel, toolbar, and bookmarks panel via a CSS class on `<body>`:

```css
body.embed #library-panel,
body.embed #toolbar,
body.embed #bookmarks-panel,
body.embed #header { display: none; }

body.embed #scroll-area { padding: 0; }
```

The rulebooks JS detects `new URLSearchParams(location.search).get('embed') === '1'` on init and applies `document.body.classList.add('embed')`, then auto-opens the book at the specified page.

### WebSocket behavior

```js
function connect() {
  const ws = new WebSocket(`ws://${location.host}/ws/player`);
  ws.onmessage = e => applyState(JSON.parse(e.data));
  ws.onclose = () => setTimeout(connect, 3000); // auto-reconnect
}
```

On disconnect: a small `position: fixed; bottom: 8px; right: 8px` indicator shows "⚡ reconnecting…" in muted color — does not interrupt the displayed content.

On connect: server immediately sends current state, so joining mid-session works without a separate GET call.

### Transitions

Content swaps use a 200ms CSS fade: outgoing content fades to opacity 0, incoming fades in. Prevents jarring cuts between states.

---

## DM Dashboard Additions (`web/public/index.html` + `app.js`)

### "Now Showing" strip

A persistent bar added to the dashboard nav (below the existing tab row or inline with tabs). Always visible when logged in.

**Contents:**
- Status text: `Now showing: [description]` or `Idle`
- **Clear** button — posts `{ type: 'idle', idleMessage: playerScreenState.idleMessage }` (clears content, keeps idle message)
- **Open Player Screen** link — `window.open('/player', 'player-screen')`
- **✉ Message** button — expands an inline text input; on submit posts `{ type: 'text', content }`
- **✏ Edit idle message** — inline edit of `idleMessage`; saves via POST

The DM dashboard connects to `/ws/player` (read-only) to keep the Now Showing strip in sync without polling.

### Contextual send buttons

**NPC portrait viewer** — `📺` button on each NPC card. Posts:
```json
{ "type": "image", "url": "/portraits/<filename>", "caption": "<npc name>" }
```

**Rulebook viewer toolbar** — `📺 Send Page` button added to `#toolbar` (after the ⭐ Bookmark button). Posts:
```json
{ "type": "rulebook", "bookId": "<state.currentBookId>", "page": <state.currentPage> }
```
Disabled when no book is open (same pattern as the other toolbar buttons).

**File browser (`.md` files)** — `📺` icon in the file list action row for `.md` files whose path contains `/handouts/`. On click: fetches `/raw?file=<path>`, then posts:
```json
{ "type": "handout", "title": "<filename without extension>", "markdown": "<content>" }
```

**Now Showing strip** — `✉ Message` button for typed text announcements (see above).

---

## Out of Scope

- Persistent player screen state across server restarts (in-memory only — intentional; each session starts fresh)
- Player screen auth or per-player content routing
- Video or audio content
- DM-side preview of what the player screen looks like
- History of previously shown content
- Animating in/out individual content types differently (single fade covers all cases)

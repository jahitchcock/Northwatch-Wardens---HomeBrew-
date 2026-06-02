# PDF Full-Text Search — Design Spec
**Date:** 2026-06-02  
**Status:** Approved

## Overview

Add full-text search across all PDF rulebooks (or a filtered scope) to the `/rulebooks` viewer. A persistent search bar in the header queries a server-side index and shows a dropdown of matching pages with snippets. Also bundles a PDF route upgrade to use the `send` npm package for proper HTTP caching (ETag, Last-Modified, Cache-Control) alongside the existing range-request support.

---

## Architecture

### New files
| File | Purpose |
|------|---------|
| `web/lib/pdf-indexer.js` | Extracts text page-by-page from a PDF using `pdfjs-dist` on Node.js. Called lazily on first search. |
| `web/data/search-index/<safe-id>.json` | Per-book index: `{ bookId, builtAt, pages: [{page, text}] }` |

### Server changes (`web/server.js`)
- **`/api/pdf` route** — replace manual range implementation with `send(req, fullPath).pipe(res)`. The `send` package (already installed as an Express dependency) handles Range requests, ETag, Last-Modified, and Cache-Control automatically.
- **`GET /api/search`** — new route, query params:
  - `q` — search string (required, min 2 chars)
  - `scope` — one of: `all`, `core`, `setting`, `ua`, `book:<bookId>` (default: `all`)
  - Returns: `{ results: [{bookId, bookName, page, snippet}], indexing: [bookId, ...] }`
  - Loads relevant per-book index files, case-insensitive substring match, max 20 results sorted by scope then page order
  - If a book has no index file yet, triggers a background index build and includes its bookId in `indexing`

### Client changes (`web/public/rulebooks.js`, `web/public/rulebooks.html`)
- Search bar + scope picker added to header
- Dropdown results panel wired to debounced fetch (300ms after last keystroke)
- Click result → `openBook(bookId, page)`

---

## `pdf-indexer.js`

```js
// Signature
async function buildIndex(bookId, pdfPath)
// Returns: { bookId, builtAt, pages: [{page: N, text: "..."}] }
// Writes result to web/data/search-index/<safeId>.json
// Uses pdfjs-dist (Node canvas not required — text extraction only)
```

- `pdfjs-dist` text extraction does not require a canvas; works in pure Node.js with `isNodeJS: true`
- Extract `page.getTextContent()` for each page, join items into a single string per page
- Strip excessive whitespace (collapse runs of spaces/newlines to single space)
- Skip pages that produce no text (image-only pages)
- Safe filename: `bookId.replace(/[^a-z0-9]/gi, '_') + '.json'`
- If build errors on a page, skip that page and continue
- `builtAt` is ISO timestamp — used to detect stale indexes if a file changes

---

## Data Model

`web/data/search-index/core_Player_s_Handbook_pdf.json`:
```json
{
  "bookId": "core/Player's Handbook.pdf",
  "builtAt": "2026-06-02T12:00:00.000Z",
  "pages": [
    { "page": 1, "text": "Player's Handbook Dungeons Dragons..." },
    { "page": 42, "text": "Grappling. Using the Attack action you can make a special melee attack..." }
  ]
}
```

---

## Search API

**`GET /api/search?q=grapple&scope=core`**

Scope values and what they load:
| scope | Books searched |
|-------|---------------|
| `all` | All books across core + setting + ua |
| `core` | Core Books only (no UA subfolder) |
| `setting` | Setting Books only |
| `ua` | Unearthed Arcana only |
| `book:<bookId>` | Single specific book |

Algorithm:
1. Validate `q` (min 2 chars, max 200 chars)
2. Determine which bookIds to search from scope
3. For each bookId: load index file if exists; if missing, enqueue background build, add to `indexing` list
4. Search loaded indexes: for each page text, check `text.toLowerCase().includes(q.toLowerCase())`
5. Extract snippet: find match position, take 60 chars before and 80 chars after, trim to word boundaries, wrap match in `<mark>` tag
6. Collect up to 20 hits total, sorted by bookId order then page number
7. Return `{ results, indexing }`

**`POST /api/search/index`** — manually trigger index build for a specific bookId (used by "Re-index" button if added later). Returns `{ ok: true }`.

Both routes are in `PUBLIC_PREFIXES` (rulebooks is already public).

---

## UI

### Header layout
```
┌─────────────────────────────────────────────────────────────────┐
│  📖 Rulebooks   [Search rulebooks...        ] [All Books ▾]  [⭐]│
│                  ─────────────────────────────                   │
│                  │ 📄 PHB p.47  "...make a grapple attack..."  │ │
│                  │ 📄 PHB p.195 "...grappled condition ends..."│ │
│                  │ 📄 XGtE p.12 "...grappling improvements..."│ │
│                  ─────────────────────────────                   │
└─────────────────────────────────────────────────────────────────┘
```

### Scope picker options
- All Books
- Core Books (no UA)
- Setting Books
- Unearthed Arcana
- Current Book (disabled if no book open)

### Dropdown behavior
- Appears on first keystroke (if ≥ 2 chars), hidden on Escape or click-outside
- Debounced 300ms after last keystroke
- "Searching…" spinner while fetch in progress
- If `indexing` array non-empty: shows "⏳ Indexing X book(s) — results may be incomplete" note at bottom
- Max 20 results; if exactly 20 shown: "Showing first 20 results — refine your search" note
- Each row: `📄 <Book Name> p.<N>` on left, snippet on right (match wrapped in `<mark>`)
- Keyboard: ↑/↓ to navigate rows, Enter to open, Escape to close
- Click outside dropdown → close

### Indexing UX
- No blocking UI — indexing happens in the background
- If user searches a book that isn't indexed yet, results show immediately for already-indexed books plus the "Indexing…" note
- Index files persist across server restarts — no need to rebuild unless PDF changes

---

## HTTP Caching upgrade (`send` package)

Replace in `/api/pdf` route:
```js
// Before (manual)
res.setHeader('Accept-Ranges', 'bytes');
// ... 30 lines of manual range handling ...

// After
import send from 'send';  // already in node_modules via Express
send(req, fullPath, { dotfiles: 'deny' })
  .on('error', err => { if (!res.headersSent) res.status(err.status || 500).end(); })
  .pipe(res);
```

`send` automatically handles: Range (206), ETag, Last-Modified, Cache-Control, conditional requests (304), and proper error codes. No additional npm install required.

---

## Out of Scope
- Fuzzy/stemmed search (exact case-insensitive substring is sufficient for D&D rules lookup)
- Search result ranking beyond page order
- Highlighting matches on the PDF canvas itself
- Re-index on file change detection (manual re-index button deferred)
- Books with image-only pages (scanned PDFs without text layer) — skipped silently

# PDF Rulebook Viewer — Design Spec
**Date:** 2026-06-01  
**Status:** Approved

## Overview

A standalone `/rulebooks` route added to the existing Express web dashboard (`web/server.js`). Opens in a new browser tab. Provides a PDF viewer with highlights, text notes, per-page bookmarks, and named collections — all persisted to a local JSON file.

PDFs live in two directories outside the campaign repo:
- `C:/Users/joshu/OneDrive/Documents/dnd/01 - Core Books` (Core Books + Unearthed Arcana subfolder)
- `C:/Users/joshu/OneDrive/Documents/dnd/02 - Setting Books`

---

## Architecture

### New files
| File | Purpose |
|------|---------|
| `web/public/rulebooks.html` | Standalone page served at `/rulebooks` |
| `web/public/rulebooks.js` | All client logic: PDF.js, annotation layer, bookmark/collection UI |
| `web/data/pdf-annotations.json` | Persistent storage — annotations, bookmarks, collections |

### Server changes (`web/server.js`)
Two constants added at the top:
```js
const PDF_DIRS = {
  core:    'C:/Users/joshu/OneDrive/Documents/dnd/01 - Core Books',
  setting: 'C:/Users/joshu/OneDrive/Documents/dnd/02 - Setting Books',
};
const ANNOTATIONS_FILE = path.join(CAMPAIGN_ROOT, 'web/data/pdf-annotations.json');
```

Five new routes, all behind the existing `requireAuth` middleware:

| Route | Method | Description |
|-------|--------|-------------|
| `/rulebooks` | GET | Serves `rulebooks.html` |
| `/api/books` | GET | Scans `PDF_DIRS` recursively (one level), returns `{ core: [...], setting: [...] }` |
| `/api/pdf/:category/:filename` | GET | Streams PDF from disk. Validates category + filename to prevent path traversal. Sets `Content-Type: application/pdf`, `Content-Disposition: inline`. For UA books, the route accepts an encoded subfolder prefix in `filename` (e.g. `Unearthed%20Arcana%2FUA-Artificer.pdf`). |
| `/api/annotations` | GET | Returns `pdf-annotations.json`; returns `{}` if file doesn't exist |
| `/api/annotations` | POST | Accepts full annotations object, writes to `pdf-annotations.json` |

Book scanner recurses one level into subdirectories (for `Unearthed Arcana/`). Those books carry a `subcategory: "Unearthed Arcana"` field in the response.

---

## Data Model

`web/data/pdf-annotations.json`:

```json
{
  "collections": [
    { "id": "col-1", "name": "Session Prep", "bookmarkIds": ["bm-1"] }
  ],
  "bookmarks": [
    {
      "id": "bm-1",
      "bookId": "core/Player's Handbook.pdf",
      "page": 42,
      "label": "Grapple rules",
      "collectionIds": ["col-1"]
    }
  ],
  "annotations": {
    "core/Player's Handbook.pdf": {
      "42": [
        {
          "id": "ann-1",
          "type": "highlight",
          "color": "yellow",
          "rects": [{ "x": 120, "y": 340, "w": 280, "h": 18 }],
          "selectedText": "The target is grappled..."
        },
        {
          "id": "ann-2",
          "type": "note",
          "x": 0.62,
          "y": 0.34,
          "text": "Use this for the Salsvault encounter"
        }
      ]
    }
  }
}
```

**Key decisions:**
- `bookId` format: `"core/<filename>"` or `"setting/<filename>"` — stable across restarts
- Annotations keyed `bookId → pageNumber → array` for O(1) page lookup
- Note positions stored as percentages of canvas dimensions (survive zoom changes)
- Bookmarks and collections are flat arrays with ID cross-references
- A bookmark can belong to multiple collections
- IDs generated client-side via `crypto.randomUUID()`
- Full object rewritten on every save (file is small; easy SQLite migration later)

---

## UI Layout

Three-panel layout at `/rulebooks`:

```
┌─────────────────────────────────────────────────────────────────┐
│  📖 Rulebooks          [search books...]          [⭐ Bookmarks] │
├──────────────┬──────────────────────────────┬───────────────────┤
│ LIBRARY      │                              │ BOOKMARKS         │
│              │                              │                   │
│ ▾ Core Books │     PDF.js canvas render     │ ▾ Session Prep    │
│   PHB        │     (current page)           │   · Grapple rules │
│   DMG        │                              │   · Spell slots   │
│   MM         │  ◀ prev  [42 / 320]  next ▶  │ ▾ Dragon Fight    │
│   XGtE ...   │                              │   · Breath weapon │
│              │  [🔍 zoom] [+ highlight]     │                   │
│ ▾ Setting    │  [📝 note] [⭐ bookmark]     │ + New Collection  │
│   SCAG       │                              │                   │
│   EGtW ...   │                              │                   │
└──────────────┴──────────────────────────────┴───────────────────┘
```

**Left panel:** Collapsible library tree grouped by Core / Setting / Unearthed Arcana. Click a book to open it.

**Center:** PDF.js renders one page at a time onto a `<canvas>`. A transparent overlay `<div>` captures mouse events. Highlights paint on a second transparent `<canvas>` layered above. Notes render as `📝` icons that expand to a textarea on click. Toolbar below canvas: zoom (0.5×–3×), prev/next, page number input, action buttons.

**Right panel:** Bookmark collections as an accordion. Click a bookmark to jump to that book + page. Drag bookmark into a collection to assign it. Panel is collapsible for more reader space.

**Highlight mode:** Toggle activates text selection on the overlay. On mouseup, `window.getSelection()` captures text and rects from the PDF.js text layer. A color picker popover (yellow / orange / green / blue) appears; confirming saves the highlight.

---

## Client Implementation

**PDF.js:** Loaded from CDN (`mozilla.github.io/pdf.js/build/pdf.min.mjs`). PDF fetched via `/api/pdf/:category/:filename`. One page rendered at a time: `page.render({ canvasContext, viewport })`. Zoom changes the viewport scale and re-renders.

**Text layer:** Built from `page.getTextContent()` — a hidden `<div>` overlaying the canvas that enables native text selection for highlights.

**Annotation overlay:** `position:absolute; inset:0` div sits above text layer for note pin clicks. Note pins are absolutely positioned by percentage coordinates so they remain stable across zoom levels.

**Persistence:** Annotations loaded once on page load. All mutations update a local in-memory object. A debounced save (500ms after last change) POSTs the full object to `/api/annotations`.

**Bookmark navigation:** `openBook(bookId)` + `goToPage(pageNum)` — same functions used by normal navigation.

**`localStorage` state:**
- Last opened book + page number (restored on reload)
- Left/right panel collapsed state
- Zoom level

---

## Out of Scope (for now)

- Full-text search across PDFs
- Annotation sharing between users
- Mobile/touch support
- SQLite migration (deferred until JSON file becomes a bottleneck)

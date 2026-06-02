# Map Thumbnails — Design Spec
_Date: 2026-06-02_

## Problem

The map gallery loads full-resolution battle map images as thumbnails. Maps can be several MB each; with 30+ in the gallery, first load is slow and the Node.js event loop is stressed by simultaneous large-file streams.

## Solution

On-demand thumbnail generation using Sharp. First request for a thumb generates a 200px-wide JPEG and caches it to disk; subsequent requests serve the cached file. Gallery uses thumbs; lightbox uses full-res.

---

## Storage

**Location:** `MAPS_LIBRARY_DIR/.thumbs/<same-relative-path>`

The `.thumbs/` directory mirrors the source structure:
- `07 - Maps/130.jpg` → `07 - Maps/.thumbs/130.jpg`
- `07 - Maps/downloads/forest-outdoor/bandit-camp/Bandit Camp.jpg` → `07 - Maps/.thumbs/downloads/forest-outdoor/bandit-camp/Bandit Camp.jpg`

All thumbs written as **JPEG quality 80** regardless of source format (PNG, WebP → JPEG). This keeps file sizes small (~15–40 KB per thumb).

The `.thumbs/` directory is skipped automatically by the map listing API: the top-level scan filters by image extension (so all directories are skipped), and the `downloads/` scan only recurses into `downloads/` subdirectories.

---

## New Route — `GET /maps-thumb/<rel>`

Added to `web/server.js`, guarded by `requireAuth`.

**Path traversal check:** `full` must start with `MAPS_LIBRARY_DIR` (same guard as `/maps-library/`).

**Cache hit** (`fs.existsSync(thumbPath)` is true):
- Serve with `res.sendFile(path.basename(thumbPath), { root: path.dirname(thumbPath) })`

**Cache miss:**
1. Ensure the thumb's parent directory exists (`fs.mkdirSync(..., { recursive: true })`)
2. Generate: `sharp(sourceFull).resize(200, null, { fit: 'inside' }).jpeg({ quality: 80 }).toFile(thumbPath)`
3. Serve the written file with `res.sendFile`

**Error fallback:** If Sharp fails (corrupt source, disk full, unsupported format), redirect `302` to the full-res `/maps-library/<rel>` URL. The gallery degrades gracefully — shows the original image instead of a broken thumb.

---

## API Change — `/api/map-library`

Each map entry gains one new field:

```json
{ "thumb_url": "/maps-thumb/130.jpg" }
```

The existing `url` field is unchanged. All three source types (numbered maps, downloads, adventure images) populate `thumb_url`.

For adventure images (sourced via `/raw?path=...`): thumb generation is skipped — those entries set `thumb_url: null` and the frontend falls back to `url`.

---

## Frontend Change — `web/public/app.js`

In `renderGallery()`, the gallery `<img>` tag changes from:
```js
<img src="${escapeHtml(mp.url)}" ...>
```
to:
```js
<img src="${escapeHtml(mp.thumb_url || mp.url)}" ...>
```

The lightbox `openLightbox(thumb.dataset.url, ...)` call is unchanged — it continues using the full-res `url`.

---

## Dependency

`sharp` added to `web/package.json` dependencies. Prebuilt Windows binaries are included in the Sharp npm package; no system-level install required.

```bash
cd web && npm install sharp
```

---

## Error Handling Summary

| Scenario | Behaviour |
|---|---|
| Source file missing | 404 from `/maps-thumb/` |
| Sharp generation fails | 302 redirect to `/maps-library/<rel>` |
| Thumb directory can't be created | Same 302 redirect |
| Corrupt thumb on disk | Sharp will error on next read; serve original |

---

## Out of Scope

- Re-generating stale thumbs when source images are updated (manual delete of `.thumbs/` clears the cache)
- Thumbs for adventure images (served via `/raw` — different path scheme, skipped for now)
- Bulk pre-generation script (on-demand covers all cases)

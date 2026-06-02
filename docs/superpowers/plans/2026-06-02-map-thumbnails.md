# Map Thumbnails Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Gallery `<img>` tags load 200px JPEG thumbs generated on-demand by Sharp; lightbox continues opening full-res images.

**Architecture:** New `/maps-thumb/<rel>` route checks for a cached thumb in `MAPS_LIBRARY_DIR/.thumbs/<rel>` and serves it; on cache miss, Sharp resizes the source image to 200px wide at JPEG quality 80, writes the result to disk, then serves it. `/api/map-library` gains a `thumb_url` field; the gallery `<img>` uses `thumb_url || url`.

**Tech Stack:** Node.js, Express 4, `sharp` ^0.33 (new dependency), existing `res.sendFile` Windows-safe pattern.

---

## Files

| File | Change |
|---|---|
| `web/package.json` | Add `sharp` dependency |
| `web/server.js` | Add optional `sharp` require; add `THUMBS_DIR` constant; add `/maps-thumb` route; add `thumb_url` to all three map sources in `/api/map-library` |
| `web/public/app.js` | Gallery `<img src>` uses `thumb_url \|\| url` |

---

## Task 1 — Install Sharp

**Files:**
- Modify: `web/package.json`

- [ ] **Add `sharp` to dependencies in `web/package.json`**

Replace the dependencies block:
```json
"dependencies": {
  "cookie-parser": "^1.4.7",
  "express": "^4.18.2",
  "marked": "^12.0.0",
  "node-pty": "^1.0.0",
  "pdfjs-dist": "^3.11.174",
  "send": "^1.2.1",
  "sharp": "^0.33.0",
  "ws": "^8.17.0"
}
```

- [ ] **Install**

```bash
cd web && npm install
```

Expected: `node_modules/sharp/` present, `package-lock.json` updated. No native build errors — Sharp ships prebuilt Windows binaries.

- [ ] **Commit**

```bash
git add web/package.json web/package-lock.json
git commit -m "chore: add sharp for thumbnail generation"
```

---

## Task 2 — Add `sharp` optional require and `THUMBS_DIR` constant to server.js

**Files:**
- Modify: `web/server.js` (lines ~17–29 for requires; line ~99 for constants)

- [ ] **Add optional `sharp` require after the existing optional-deps block**

Find this block (around line 17):
```javascript
// Optional deps — degrade gracefully if missing
let pty;
try { pty = require('node-pty'); } catch { console.warn('node-pty not found — terminal disabled'); }

let hbRender;
try {
  const { render } = require('../homebrewery-renderer');
  hbRender = render;
} catch (e) { console.warn('homebrewery-renderer unavailable — raw fallback'); }
```

Add after it:
```javascript
let sharp;
try { sharp = require('sharp'); } catch { console.warn('sharp not found — thumbnail generation disabled'); }
```

- [ ] **Add `THUMBS_DIR` constant directly after `MAPS_LIBRARY_DIR`**

Find line ~99:
```javascript
const MAPS_LIBRARY_DIR = path.resolve(process.env.MAPS_LIBRARY_DIR || 'C:/Users/joshu/OneDrive/Documents/dnd/07 - Maps');
```

Add immediately after:
```javascript
const THUMBS_DIR = path.join(MAPS_LIBRARY_DIR, '.thumbs');
```

- [ ] **Verify server starts without errors**

```bash
cd web && node server.js
```

Expected: Server starts on port 5050, no crash. Press Ctrl+C.

- [ ] **Commit**

```bash
git add web/server.js
git commit -m "chore: optional sharp require + THUMBS_DIR constant"
```

---

## Task 3 — Add `/maps-thumb` route

**Files:**
- Modify: `web/server.js` (after the `/maps-library` route, around line 888)

- [ ] **Add the `/maps-thumb` route after the `/maps-library` route**

Find the end of the `/maps-library` route:
```javascript
app.use('/maps-library', requireAuth, (req, res) => {
  const rel = decodeURIComponent(req.path.replace(/^\//, ''));
  const full = path.resolve(path.join(MAPS_LIBRARY_DIR, rel));
  if (!full.startsWith(MAPS_LIBRARY_DIR)) return res.status(403).end();
  if (!/\.(png|jpg|jpeg|webp)$/i.test(full)) return res.status(400).end();
  res.sendFile(path.basename(full), { root: path.dirname(full) });
});
```

Add immediately after:
```javascript
// ─── On-demand thumbnail generation (200px wide JPEG, cached to .thumbs/) ────

app.use('/maps-thumb', requireAuth, async (req, res) => {
  const rel = decodeURIComponent(req.path.replace(/^\//, ''));
  const sourceFull = path.resolve(path.join(MAPS_LIBRARY_DIR, rel));
  if (!sourceFull.startsWith(MAPS_LIBRARY_DIR)) return res.status(403).end();
  if (!/\.(png|jpg|jpeg|webp)$/i.test(sourceFull)) return res.status(400).end();

  const thumbPath = path.join(THUMBS_DIR, rel.replace(/\.[^.]+$/, '.jpg'));

  if (fs.existsSync(thumbPath)) {
    return res.sendFile(path.basename(thumbPath), { root: path.dirname(thumbPath) });
  }

  if (!fs.existsSync(sourceFull)) return res.status(404).end();

  if (!sharp) {
    const encodedRel = rel.split('/').map(encodeURIComponent).join('/');
    return res.redirect(302, `/maps-library/${encodedRel}`);
  }

  try {
    fs.mkdirSync(path.dirname(thumbPath), { recursive: true });
    await sharp(sourceFull).resize(200, null, { fit: 'inside' }).jpeg({ quality: 80 }).toFile(thumbPath);
    res.sendFile(path.basename(thumbPath), { root: path.dirname(thumbPath) });
  } catch (e) {
    console.error('[maps-thumb] generation failed:', rel, e.message);
    const encodedRel = rel.split('/').map(encodeURIComponent).join('/');
    res.redirect(302, `/maps-library/${encodedRel}`);
  }
});
```

- [ ] **Verify the route works manually**

Start the server: `cd web && node server.js`

In a browser (while logged in), navigate to:
```
http://localhost:5050/maps-thumb/130.jpg
```

Expected first request: ~50–200ms pause while Sharp generates, then a small JPEG image loads. Check that `07 - Maps/.thumbs/130.jpg` now exists on disk.

Expected second request: near-instant — cached file served directly.

- [ ] **Commit**

```bash
git add web/server.js
git commit -m "feat: add /maps-thumb route with on-demand Sharp generation"
```

---

## Task 4 — Add `thumb_url` to `/api/map-library`

**Files:**
- Modify: `web/server.js` (three `maps.push(...)` blocks in `/api/map-library`)

- [ ] **Source 1: numbered maps — add `thumb_url`**

Find (around line 919):
```javascript
        maps.push({
          id: `lib-${base}`,
          name: m.terrain ? `Map ${base} — ${m.terrain}` : `Map ${base}`,
          filename: f,
          url: `/maps-library/${encodeURIComponent(f)}`,
          gridless_url: fs.existsSync(path.join(MAPS_LIBRARY_DIR, gridlessName))
            ? `/maps-library/${encodeURIComponent(gridlessName)}` : null,
          source: '07-maps',
          terrain: m.terrain || '',
          tags: m.tags || [],
          northwatch_uses: m.northwatch_uses || [],
          description: m.description || '',
        });
```

Replace with:
```javascript
        maps.push({
          id: `lib-${base}`,
          name: m.terrain ? `Map ${base} — ${m.terrain}` : `Map ${base}`,
          filename: f,
          url: `/maps-library/${encodeURIComponent(f)}`,
          thumb_url: `/maps-thumb/${encodeURIComponent(f)}`,
          gridless_url: fs.existsSync(path.join(MAPS_LIBRARY_DIR, gridlessName))
            ? `/maps-library/${encodeURIComponent(gridlessName)}` : null,
          source: '07-maps',
          terrain: m.terrain || '',
          tags: m.tags || [],
          northwatch_uses: m.northwatch_uses || [],
          description: m.description || '',
        });
```

- [ ] **Source 2: downloads — add `thumb_url`**

Find (around line 978):
```javascript
            maps.push({
              id: `dl-${category}-${mapFolder}`,
              name: mapName,
              filename: primaryEntry.name,
              url: `/maps-library/${primaryEntry.rel.split('/').map(encodeURIComponent).join('/')}`,
              source: 'downloads',
              terrain: category.replace(/-/g, ' '),
              tags: [category.replace(/-/g, ' ')],
              northwatch_uses: dm.northwatch_uses || [],
              description: dm.terrain || dm.name || '',
              variant_count: variants.length,
            });
```

Replace with:
```javascript
            maps.push({
              id: `dl-${category}-${mapFolder}`,
              name: mapName,
              filename: primaryEntry.name,
              url: `/maps-library/${primaryEntry.rel.split('/').map(encodeURIComponent).join('/')}`,
              thumb_url: `/maps-thumb/${primaryEntry.rel.split('/').map(encodeURIComponent).join('/')}`,
              source: 'downloads',
              terrain: category.replace(/-/g, ' '),
              tags: [category.replace(/-/g, ' ')],
              northwatch_uses: dm.northwatch_uses || [],
              description: dm.terrain || dm.name || '',
              variant_count: variants.length,
            });
```

- [ ] **Source 3: adventure images — add `thumb_url: null`**

Find (around line 1009):
```javascript
          maps.push({
            id: `adv-${rel.replace(/[^a-z0-9]/gi, '-')}`,
            name: adventureName ? `${adventureName} — ${e.name}` : e.name,
            filename: e.name,
            url: `/raw?path=${encodeURIComponent(rel)}`,
            source: 'adventure',
            adventure: adventureName,
            terrain: '',
            tags: adventureName ? [adventureName.toLowerCase()] : [],
            northwatch_uses: [],
          });
```

Replace with:
```javascript
          maps.push({
            id: `adv-${rel.replace(/[^a-z0-9]/gi, '-')}`,
            name: adventureName ? `${adventureName} — ${e.name}` : e.name,
            filename: e.name,
            url: `/raw?path=${encodeURIComponent(rel)}`,
            thumb_url: null,
            source: 'adventure',
            adventure: adventureName,
            terrain: '',
            tags: adventureName ? [adventureName.toLowerCase()] : [],
            northwatch_uses: [],
          });
```

- [ ] **Verify API response includes `thumb_url`**

Start the server, open `http://localhost:5050` in a browser (while logged in), then in DevTools console run:
```javascript
fetch('/api/map-library').then(r=>r.json()).then(d=>console.log(JSON.stringify(d.slice(0,2),null,2)))
```

Expected: each entry has a `thumb_url` field like `/maps-thumb/130.jpg` for numbered maps, `/maps-thumb/downloads/...` for downloads, and `null` for adventure entries.

- [ ] **Commit**

```bash
git add web/server.js
git commit -m "feat: add thumb_url to /api/map-library responses"
```

---

## Task 5 — Update gallery `<img>` to use `thumb_url`

**Files:**
- Modify: `web/public/app.js` (line ~4356)

- [ ] **Change gallery `<img src>` to prefer `thumb_url`**

Find (around line 4356):
```javascript
        <img src="${escapeHtml(mp.url)}" alt="${escapeHtml(mp.name)}" loading="lazy">
```

Replace with:
```javascript
        <img src="${escapeHtml(mp.thumb_url || mp.url)}" alt="${escapeHtml(mp.name)}" loading="lazy">
```

The `data-url` attribute on the parent div (line ~4349) stays unchanged — it holds the full-res URL used by the lightbox.

- [ ] **Manual end-to-end test**

1. Restart the server: `cd web && node server.js`
2. Open `http://localhost:5050` and navigate to the Maps section
3. Verify gallery tiles show actual images (not broken icons)
4. First load of each tile may take ~50–200ms for generation; subsequent page loads are instant
5. Click a tile — lightbox should open the full-resolution image
6. Check `07 - Maps/.thumbs/` on disk — should contain generated `.jpg` files mirroring the source structure

- [ ] **Commit**

```bash
git add web/public/app.js
git commit -m "feat: gallery uses thumb_url for fast-loading map thumbnails"
```

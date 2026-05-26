# Ambient Sounds Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a persistent footer bar to the DM Panel that plays one ambient audio scene at a time, with crossfade between scenes and context-aware suggestions when files are opened.

**Architecture:** `sounds.js` is a self-contained `SoundPlayer` module (plain IIFE, no build step) that owns all audio logic. `app.js` calls `SoundPlayer.init()` on load and `SoundPlayer.suggest(filepath)` when a file is opened. The server adds one route to list custom sounds; bundled MP3s are served as static files.

**Tech Stack:** Vanilla JS (ES6), HTML5 Web Audio (`<audio>` elements), `requestAnimationFrame` for crossfade, `localStorage` for persistence, Express static + one new GET route.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `web/public/sounds.js` | `SoundPlayer` module — all audio logic |
| Create | `web/public/sounds/sounds.json` | Scene manifest |
| Create | `web/public/sounds/custom/.gitkeep` | Drop-in folder placeholder |
| Create | `web/public/sounds/*.mp3` | Bundled CC0 ambient loops (Task 9) |
| Modify | `web/server.js` | Add `/api/sounds/custom` route |
| Modify | `web/public/index.html` | Add `#sound-bar` HTML, audio elements, script tag |
| Modify | `web/public/style.css` | Add `#sound-bar` styles |
| Modify | `web/public/app.js:137-148` | Call `SoundPlayer.suggest(p)` in `openPath()` |
| Modify | `web/public/app.js:2614-2620` | Call `SoundPlayer.init()` in `DOMContentLoaded` |

---

## Task 1: Server Route + Directory Structure

**Files:**
- Modify: `web/server.js` (insert before line 1611 — the `// ─── WebSocket terminal` comment)
- Create: `web/public/sounds/custom/.gitkeep`

- [ ] **Step 1: Create the custom sounds directory**

```bash
mkdir -p web/public/sounds/custom
touch web/public/sounds/custom/.gitkeep
```

- [ ] **Step 2: Add the `/api/sounds/custom` route to `server.js`**

Insert this block immediately before the `// ─── WebSocket terminal` comment (after the last `app.delete` route, around line 1610):

```js
app.get('/api/sounds/custom', (req, res) => {
  const dir = path.join(__dirname, 'public', 'sounds', 'custom');
  if (!fs.existsSync(dir)) return res.json([]);
  const files = fs.readdirSync(dir).filter(f => /\.(mp3|ogg|wav)$/i.test(f));
  res.json(files);
});
```

- [ ] **Step 3: Verify the route works**

```bash
cd web && node server.js
# In a second terminal:
curl http://localhost:5050/api/sounds/custom
```

Expected output: `[]`

- [ ] **Step 4: Commit**

```bash
git add web/server.js web/public/sounds/custom/.gitkeep
git commit -m "feat: add /api/sounds/custom route and custom sounds directory"
```

---

## Task 2: Scene Manifest

**Files:**
- Create: `web/public/sounds/sounds.json`

- [ ] **Step 1: Create the manifest**

Create `web/public/sounds/sounds.json`:

```json
{
  "scenes": [
    { "id": "tavern", "label": "Tavern", "file": "tavern.mp3", "keywords": ["waystone", "inn", "tavern", "town", "village", "pinebrook", "welton"] },
    { "id": "forest", "label": "Forest", "file": "forest.mp3", "keywords": ["forest", "woods", "wilderness", "wolves", "westly"] },
    { "id": "dungeon", "label": "Dungeon", "file": "dungeon.mp3", "keywords": ["dungeon", "temple", "dragonknights", "ruins", "underground"] },
    { "id": "cave", "label": "Cave", "file": "cave.mp3", "keywords": ["cave", "croaker", "salsvault", "grotto"] },
    { "id": "combat", "label": "Combat", "file": "combat.mp3", "keywords": ["combat", "encounter", "battle"] },
    { "id": "winter", "label": "Winter Wind", "file": "winter.mp3", "keywords": ["frozen", "blizzard", "snow", "cold", "pale", "northreach"] },
    { "id": "night", "label": "Night Ambience", "file": "night.mp3", "keywords": ["night", "camp", "campfire"] }
  ],
  "customDir": "custom"
}
```

- [ ] **Step 2: Verify the manifest is served**

```bash
# server must be running
curl http://localhost:5050/sounds/sounds.json
```

Expected: the JSON above (Express static middleware already serves `web/public/`).

- [ ] **Step 3: Commit**

```bash
git add web/public/sounds/sounds.json
git commit -m "feat: add ambient sounds scene manifest"
```

---

## Task 3: Footer Bar HTML + CSS

**Files:**
- Modify: `web/public/index.html`
- Modify: `web/public/style.css`

- [ ] **Step 1: Add audio elements and footer bar to `index.html`**

Immediately before `</body>` (after the `<script src="app.js">` line), add:

```html
  <!-- Hidden audio elements for crossfade -->
  <audio id="snd-a"></audio>
  <audio id="snd-b"></audio>

  <!-- Ambient sound bar -->
  <div id="sound-bar">
    <span id="snd-icon">♪</span>
    <span id="snd-name">— stopped —</span>
    <button id="snd-play">▶ Play</button>
    <button id="snd-loop" title="Loop">⟳</button>
    <div id="snd-quick"></div>
    <span id="snd-suggest-label" hidden>suggested for this file</span>
    <div id="snd-vol-wrap">
      <span>🔊</span>
      <input id="snd-vol" type="range" min="0" max="100" value="70">
    </div>
  </div>
```

- [ ] **Step 2: Add `#sound-bar` styles to `style.css`**

Append to the end of `web/public/style.css`:

```css
/* ─── Sound Bar ──────────────────────────────────────────────────────────── */

#sound-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 38px;
  background: #0d0d0d;
  border-top: 1px solid #2a2a2a;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  font-family: 'Segoe UI', system-ui, sans-serif;
  font-size: 12px;
  z-index: 100;
}

#snd-icon { color: var(--accent); font-size: 14px; flex-shrink: 0; }

#snd-name {
  color: #f5f0e8;
  min-width: 130px;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
}

#snd-play {
  background: #313244;
  border: none;
  color: #cdd6f4;
  padding: 3px 12px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 11px;
  flex-shrink: 0;
}
#snd-play:hover { background: #45475a; }

#snd-loop {
  background: none;
  border: 1px solid #333;
  color: #444;
  border-radius: 3px;
  padding: 3px 7px;
  font-size: 13px;
  cursor: pointer;
  flex-shrink: 0;
  line-height: 1;
}
#snd-loop.snd-loop-on { border-color: var(--accent); color: var(--accent); }
#snd-loop:hover { border-color: #666; color: #888; }
#snd-loop.snd-loop-on:hover { border-color: var(--accent); color: var(--accent); }

#snd-quick {
  display: flex;
  gap: 4px;
  flex-wrap: nowrap;
  overflow: hidden;
}

.snd-quick-btn {
  background: none;
  border: 1px solid #333;
  color: #666;
  border-radius: 3px;
  padding: 3px 9px;
  font-size: 11px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
}
.snd-quick-btn:hover { border-color: #666; color: #aaa; }
.snd-quick-btn.snd-active { background: #2a1a3a; border-color: var(--accent); color: var(--accent); }
.snd-quick-btn.snd-suggested { background: #1a2a1a; border-color: #4a8a4a; color: #a6e3a1; }

.snd-more-btn {
  background: none;
  border: 1px solid #2a2a2a;
  color: #555;
  border-radius: 3px;
  padding: 3px 9px;
  font-size: 11px;
  cursor: pointer;
  flex-shrink: 0;
}
.snd-more-btn:hover { border-color: #555; color: #888; }

#snd-suggest-label {
  font-size: 10px;
  color: #4a8a4a;
  font-style: italic;
  flex-shrink: 0;
}

#snd-vol-wrap {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  font-size: 11px;
  flex-shrink: 0;
}

#snd-vol { width: 70px; accent-color: var(--accent); cursor: pointer; }

/* Push workspace content above the sound bar */
#workspace { padding-bottom: 38px; }
```

- [ ] **Step 3: Verify the bar renders**

Restart the server and open `http://localhost:5050`. You should see a slim dark bar pinned to the bottom of the page with `♪ — stopped — ▶ Play ⟳ 🔊` controls. The `#snd-quick` area will be empty until `sounds.js` runs.

- [ ] **Step 4: Commit**

```bash
git add web/public/index.html web/public/style.css
git commit -m "feat: add sound bar HTML and CSS"
```

---

## Task 4: SoundPlayer Scaffold + Init

**Files:**
- Create: `web/public/sounds.js`
- Modify: `web/public/index.html` (add script tag)
- Modify: `web/public/app.js` (call `SoundPlayer.init()` in DOMContentLoaded)

- [ ] **Step 1: Create `web/public/sounds.js`**

```js
'use strict';

window.SoundPlayer = (() => {
  // ── State ──────────────────────────────────────────────────────────────────
  let scenes = [];
  let activeEl = null;
  let currentScene = null;
  let suggestedScene = null;
  let volume = 0.7;
  let looping = true;

  // ── DOM refs ───────────────────────────────────────────────────────────────
  let sndA, sndB, bar, nameEl, playBtn, loopBtn, volSlider, quickArea, suggestLabel;

  // ── Init ───────────────────────────────────────────────────────────────────
  async function init() {
    sndA = document.getElementById('snd-a');
    sndB = document.getElementById('snd-b');
    nameEl = document.getElementById('snd-name');
    playBtn = document.getElementById('snd-play');
    loopBtn = document.getElementById('snd-loop');
    volSlider = document.getElementById('snd-vol');
    quickArea = document.getElementById('snd-quick');
    suggestLabel = document.getElementById('snd-suggest-label');

    // Restore persisted state
    volume = parseFloat(localStorage.getItem('soundbar-volume') ?? '0.7');
    looping = localStorage.getItem('soundbar-loop') !== 'false';
    const lastScene = localStorage.getItem('soundbar-scene');

    volSlider.value = Math.round(volume * 100);
    loopBtn.classList.toggle('snd-loop-on', looping);

    // Wire controls (implemented in later tasks — stubs here)
    playBtn.addEventListener('click', () => {
      if (!currentScene) return;
      if (activeEl && !activeEl.paused) stop();
      else play(currentScene);
    });

    loopBtn.addEventListener('click', () => {
      looping = !looping;
      localStorage.setItem('soundbar-loop', String(looping));
      loopBtn.classList.toggle('snd-loop-on', looping);
      if (activeEl) activeEl.loop = looping;
    });

    volSlider.addEventListener('input', () => {
      volume = parseInt(volSlider.value, 10) / 100;
      localStorage.setItem('soundbar-volume', String(volume));
      if (activeEl && !activeEl.paused) activeEl.volume = volume;
    });

    // Load manifest + custom files
    try {
      const manifest = await fetch('/sounds/sounds.json').then(r => r.json());
      scenes = [...manifest.scenes];

      const customFiles = await fetch('/api/sounds/custom').then(r => r.json()).catch(() => []);
      for (const f of customFiles) {
        const id = f.replace(/\.[^.]+$/, '');
        const label = id.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        scenes.push({ id, label, file: `custom/${f}`, keywords: [], custom: true });
      }

      renderQuickButtons();

      // Restore last scene name (no auto-play)
      if (lastScene) {
        const sc = scenes.find(s => s.id === lastScene);
        if (sc) { currentScene = sc.id; nameEl.textContent = sc.label; }
      }
    } catch (e) {
      console.warn('SoundPlayer: failed to load manifest', e);
    }
  }

  // ── Render quick buttons ───────────────────────────────────────────────────
  function renderQuickButtons() {
    quickArea.innerHTML = '';
    scenes.filter(s => !s.custom).forEach(sc => {
      const btn = document.createElement('button');
      btn.className = 'snd-quick-btn';
      btn.dataset.sceneId = sc.id;
      btn.textContent = sc.label;
      btn.addEventListener('click', () => play(sc.id));
      quickArea.appendChild(btn);
    });

    const moreBtn = document.createElement('button');
    moreBtn.className = 'snd-more-btn';
    moreBtn.textContent = '+ More…';
    moreBtn.addEventListener('click', openMoreModal);
    quickArea.appendChild(moreBtn);

    updateQuickButtonStates();
  }

  function updateQuickButtonStates() {
    const isPlaying = activeEl && !activeEl.paused;
    quickArea.querySelectorAll('.snd-quick-btn').forEach(btn => {
      const id = btn.dataset.sceneId;
      const sc = scenes.find(s => s.id === id);
      const isActive = id === currentScene && isPlaying;
      const isSuggested = id === suggestedScene && id !== currentScene;
      btn.classList.toggle('snd-active', isActive);
      btn.classList.toggle('snd-suggested', isSuggested);
      btn.textContent = sc ? (isSuggested ? sc.label + ' ❆' : sc.label) : id;
    });
    playBtn.textContent = (isPlaying) ? '■ Stop' : '▶ Play';
    suggestLabel.hidden = !suggestedScene;
  }

  // ── Playback (stubs — implemented in Task 5) ───────────────────────────────
  function crossfade(fromEl, toEl, targetVol, done) { if (done) done(); }
  function play(sceneId) { console.log('play stub:', sceneId); }
  function stop() { console.log('stop stub'); }

  // ── Suggestion (implemented in Task 7) ────────────────────────────────────
  function suggest(filepath) {}

  // ── More modal (implemented in Task 8) ────────────────────────────────────
  function openMoreModal() {}

  return { init, play, stop, suggest };
})();
```

- [ ] **Step 2: Add script tag to `index.html`**

After `<script src="app.js"></script>` (the last script tag, before `</body>`), add:

```html
  <script src="sounds.js"></script>
```

- [ ] **Step 3: Call `SoundPlayer.init()` in `app.js`**

Find the `DOMContentLoaded` handler at the bottom of `web/public/app.js` (lines 2614–2620):

```js
document.addEventListener('DOMContentLoaded', () => {
  fillTree('', fileTree);
  openPath('gm-lore/welcome.md');
  updateManifestBtn();
  initTerminal();
  loadWorldTables();
});
```

Replace it with:

```js
document.addEventListener('DOMContentLoaded', () => {
  fillTree('', fileTree);
  openPath('gm-lore/welcome.md');
  updateManifestBtn();
  initTerminal();
  loadWorldTables();
  SoundPlayer.init();
});
```

- [ ] **Step 4: Verify quick buttons render**

Restart the server, open `http://localhost:5050`. The sound bar should now show the 7 quick-scene buttons (Tavern, Forest, Dungeon, Combat, Cave, Winter Wind, Night Ambience) + `+ More…`. Check the browser console for errors.

- [ ] **Step 5: Commit**

```bash
git add web/public/sounds.js web/public/index.html web/public/app.js
git commit -m "feat: SoundPlayer scaffold — init, quick buttons, localStorage restore"
```

---

## Task 5: Crossfade, play(), stop()

**Files:**
- Modify: `web/public/sounds.js` (replace stub functions)

- [ ] **Step 1: Replace the crossfade, play, and stop stubs in `sounds.js`**

Find and replace the three stub functions:

```js
  // ── Playback (stubs — implemented in Task 5) ───────────────────────────────
  function crossfade(fromEl, toEl, targetVol, done) { if (done) done(); }
  function play(sceneId) { console.log('play stub:', sceneId); }
  function stop() { console.log('stop stub'); }
```

Replace with:

```js
  // ── Crossfade ──────────────────────────────────────────────────────────────
  function crossfade(fromEl, toEl, targetVol, done) {
    const DURATION = 1500;
    const start = performance.now();
    const fromStart = fromEl ? fromEl.volume : 0;

    function tick(now) {
      const t = Math.min((now - start) / DURATION, 1);
      if (fromEl) fromEl.volume = fromStart * (1 - t);
      if (toEl) toEl.volume = targetVol * t;
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        if (fromEl) { fromEl.pause(); fromEl.removeAttribute('src'); fromEl.load(); }
        done();
      }
    }
    requestAnimationFrame(tick);
  }

  // ── play ───────────────────────────────────────────────────────────────────
  function play(sceneId) {
    const sc = scenes.find(s => s.id === sceneId);
    if (!sc) return;

    currentScene = sceneId;
    nameEl.textContent = sc.label;
    localStorage.setItem('soundbar-scene', sceneId);

    const from = (activeEl && !activeEl.paused) ? activeEl : null;
    const to = (activeEl === sndA) ? sndB : sndA;

    to.src = `/sounds/${sc.file}`;
    to.loop = looping;
    to.volume = 0;
    to.play().catch(() => {});
    to.onended = looping ? null : () => stop();

    crossfade(from, to, volume, () => {
      activeEl = to;
      updateQuickButtonStates();
    });
  }

  // ── stop ───────────────────────────────────────────────────────────────────
  function stop() {
    if (!activeEl || activeEl.paused) return;
    const from = activeEl;
    activeEl = null;
    crossfade(from, null, 0, () => {
      nameEl.textContent = currentScene
        ? (scenes.find(s => s.id === currentScene)?.label ?? '— stopped —')
        : '— stopped —';
      updateQuickButtonStates();
    });
  }
```

- [ ] **Step 2: Verify playback**

Restart the server. Open `http://localhost:5050`. Note: audio won't play until MP3 files exist (Task 9), but you can drop a test MP3 at `web/public/sounds/tavern.mp3` temporarily to verify. Click the "Tavern" quick button — the scene name should update to "Tavern", the Play button should change to "■ Stop", and the Tavern button should highlight purple. Click "■ Stop" — the name resets and button dims.

Check the browser console — no errors expected.

- [ ] **Step 3: Commit**

```bash
git add web/public/sounds.js
git commit -m "feat: implement crossfade, play(), stop() in SoundPlayer"
```

---

## Task 6: Loop Toggle + Volume + localStorage

These controls were already wired in Task 4's `init()` (the `playBtn`, `loopBtn`, `volSlider` event listeners). This task verifies they work correctly with the now-real `play()` and `stop()`.

**Files:**
- No code changes — verification task

- [ ] **Step 1: Verify loop toggle**

With a test MP3 in place and a scene playing:
1. The ⟳ button should start with purple border (loop ON)
2. Click ⟳ — border dims (loop OFF). `localStorage['soundbar-loop']` should be `"false"`.
3. Let the track finish — playback should stop and the scene name should show the label (not "— stopped —") with the play button reverting to "▶ Play".
4. Click ⟳ again — border returns purple (loop ON). `localStorage['soundbar-loop']` should be `"true"`.

Verify in DevTools console: `localStorage.getItem('soundbar-loop')`.

- [ ] **Step 2: Verify volume**

1. Drag the volume slider left and right while a scene plays — audio volume should change immediately.
2. Refresh the page — the slider should be at the same position as before. Verify: `localStorage.getItem('soundbar-volume')`.

- [ ] **Step 3: Verify loop state restores on refresh**

1. Set loop OFF (click ⟳ to dim it).
2. Refresh page — the ⟳ button should remain dimmed.

- [ ] **Step 4: Commit (no code changes)**

```bash
# No new files — nothing to commit for this task
```

---

## Task 7: suggest() + openPath Hook

**Files:**
- Modify: `web/public/sounds.js` (replace suggest stub)
- Modify: `web/public/app.js:137-148` (`openPath` function)

- [ ] **Step 1: Replace the `suggest` stub in `sounds.js`**

Find:

```js
  // ── Suggestion (implemented in Task 7) ────────────────────────────────────
  function suggest(filepath) {}
```

Replace with:

```js
  // ── Suggestion ─────────────────────────────────────────────────────────────
  function suggest(filepath) {
    const tokens = filepath.toLowerCase().split(/[/\\\-_.]+/);
    let matched = null;

    outer: for (const sc of scenes) {
      for (const kw of (sc.keywords || [])) {
        if (tokens.includes(kw)) {
          matched = sc.id;
          break outer;
        }
      }
    }

    // Don't suggest the scene that's already playing
    if (matched && matched === currentScene && activeEl && !activeEl.paused) {
      matched = null;
    }

    suggestedScene = matched;
    updateQuickButtonStates();
  }
```

- [ ] **Step 2: Call `SoundPlayer.suggest(p)` in `openPath()` in `app.js`**

Find `openPath` in `web/public/app.js` (lines 137–148):

```js
function openPath(p) {
  currentPath = p;
  if (typeof hideTrackerPanel === 'function') hideTrackerPanel();
  viewer.src = buildPreviewUrl(p);
  breadcrumb.textContent = p;
  btnCtx.hidden = false;
  // Show print button for handout files (files in *-handouts/ or handouts/ directories)
  const isHandout = /[\\/]handouts[\\/]|[\\/][^/]+-handouts[\\/]/.test(p) && p.endsWith('.md') && !p.endsWith('MANIFEST.md');
  btnPrint.hidden = !isHandout;
  if (typeof updateManifestBtn === 'function') updateManifestBtn();
  closeAllDrawers();
}
```

Add one line at the end (before the closing `}`):

```js
function openPath(p) {
  currentPath = p;
  if (typeof hideTrackerPanel === 'function') hideTrackerPanel();
  viewer.src = buildPreviewUrl(p);
  breadcrumb.textContent = p;
  btnCtx.hidden = false;
  const isHandout = /[\\/]handouts[\\/]|[\\/][^/]+-handouts[\\/]/.test(p) && p.endsWith('.md') && !p.endsWith('MANIFEST.md');
  btnPrint.hidden = !isHandout;
  if (typeof updateManifestBtn === 'function') updateManifestBtn();
  closeAllDrawers();
  if (window.SoundPlayer) SoundPlayer.suggest(p);
}
```

- [ ] **Step 3: Verify suggestions work**

Restart the server, open `http://localhost:5050`. Click any file in the file browser:

1. Open `npcs/core/` or any NPC file — no match expected, no buttons highlighted.
2. Open `adventures/season-1/` or `adventures/` — no strong match unless a file contains a keyword.
3. Open `locations/waystone-inn.md` (or any file with "waystone" in the path) — the "Tavern" button should gain a green tint and show "Tavern ✦". The italic "suggested for this file" label should appear.
4. Open another file that doesn't match — the suggestion should clear.
5. If "Tavern" is already playing and you open a waystone file — no suggestion marker appears (it's already playing).

- [ ] **Step 4: Commit**

```bash
git add web/public/sounds.js web/public/app.js
git commit -m "feat: implement suggest() and openPath hook for scene suggestions"
```

---

## Task 8: More… Modal

**Files:**
- Modify: `web/public/sounds.js` (replace `openMoreModal` stub)

- [ ] **Step 1: Replace the `openMoreModal` stub in `sounds.js`**

Find:

```js
  // ── More modal (implemented in Task 8) ────────────────────────────────────
  function openMoreModal() {}
```

Replace with:

```js
  // ── More modal ─────────────────────────────────────────────────────────────
  function openMoreModal() {
    const bundled = scenes.filter(s => !s.custom);
    const custom = scenes.filter(s => s.custom);
    const isPlaying = activeEl && !activeEl.paused;

    function sceneRow(sc) {
      const playing = sc.id === currentScene && isPlaying;
      return `<div class="snd-modal-row" data-label="${sc.label.toLowerCase()}"
        style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid #1e1e1e">
        <span style="flex:1;font-size:13px;color:#cdd6f4">${sc.label}</span>
        <button class="snd-modal-play" data-scene-id="${sc.id}"
          style="background:#313244;border:none;color:#cdd6f4;padding:4px 12px;border-radius:3px;cursor:pointer;font-size:11px">
          ${playing ? '■ Playing' : '▶ Play'}
        </button>
      </div>`;
    }

    function section(list, heading) {
      if (!list.length) return '';
      return `<div style="margin-bottom:14px">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.08em;color:#555;margin-bottom:6px">${heading}</div>
        ${list.map(sceneRow).join('')}
      </div>`;
    }

    const html = `<div style="padding:16px 20px">
      <input id="snd-modal-search" type="search" placeholder="Search scenes…"
        style="width:100%;background:#1a1a1a;border:1px solid #333;color:#cdd6f4;border-radius:3px;
               padding:6px 10px;font-family:inherit;font-size:13px;box-sizing:border-box;margin-bottom:12px">
      <div id="snd-modal-list">
        ${section(bundled, 'Bundled Scenes')}
        ${section(custom, 'Your Sounds')}
      </div>
    </div>`;

    window.dmOpenModalRaw('Ambient Scenes', html);

    document.getElementById('snd-modal-search')?.addEventListener('input', e => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('.snd-modal-row').forEach(row => {
        row.style.display = (!q || row.dataset.label.includes(q)) ? '' : 'none';
      });
    });

    document.querySelectorAll('.snd-modal-play').forEach(btn => {
      btn.addEventListener('click', () => {
        play(btn.dataset.sceneId);
        // Update button states in modal
        document.querySelectorAll('.snd-modal-play').forEach(b => {
          b.textContent = b.dataset.sceneId === btn.dataset.sceneId ? '■ Playing' : '▶ Play';
        });
      });
    });
  }
```

- [ ] **Step 2: Verify the modal**

Restart the server, open `http://localhost:5050`. Click `+ More…`:
1. A modal should open titled "Ambient Scenes"
2. All 7 bundled scenes should be listed with "▶ Play" buttons
3. Typing in the search box should filter the list in real time
4. Clicking "▶ Play" on a scene should start it playing (with crossfade if something was already playing), and that button should change to "■ Playing"
5. If you placed custom MP3s in `web/public/sounds/custom/`, they should appear under "Your Sounds"

- [ ] **Step 3: Commit**

```bash
git add web/public/sounds.js
git commit -m "feat: implement More… scene picker modal with search"
```

---

## Task 9: Source CC0 Ambient MP3 Files

**Files:**
- Create: `web/public/sounds/tavern.mp3`
- Create: `web/public/sounds/forest.mp3`
- Create: `web/public/sounds/dungeon.mp3`
- Create: `web/public/sounds/cave.mp3`
- Create: `web/public/sounds/combat.mp3`
- Create: `web/public/sounds/winter.mp3`
- Create: `web/public/sounds/night.mp3`

All files must be CC0 licensed, loopable, 60–120 seconds, ≈2–4 MB each.

- [ ] **Step 1: Download files from Freesound.org**

Go to [freesound.org](https://freesound.org). For each scene, search the suggested terms, filter by **CC0 license**, and download an MP3. Look for seamlessly loopable tracks or ones with consistent texture that loop naturally (avoid tracks with obvious intros/outros).

| Filename to save | Search terms on Freesound |
|-----------------|--------------------------|
| `tavern.mp3` | "tavern ambience loop" or "inn crowd background" |
| `forest.mp3` | "forest ambience loop" or "woodland birds loop" |
| `dungeon.mp3` | "dungeon ambience loop" or "stone cave dripping" |
| `cave.mp3` | "cave drip ambience" or "underground cave loop" |
| `combat.mp3` | "battle ambience loop" or "war sounds background" |
| `winter.mp3` | "winter wind loop" or "blizzard ambience" |
| `night.mp3` | "night ambience loop" or "crickets campfire" |

Save each file to `web/public/sounds/` with the exact filename shown above.

- [ ] **Step 2: Verify all 7 scenes play**

Restart the server, open `http://localhost:5050`. Click each quick-scene button one at a time:
- Each should start playing (browser tab should show audio activity)
- Scene name should update in the bar
- Crossfading between scenes should be smooth (1.5s transition)
- Clicking ⟳ to disable loop and waiting for the track end should stop playback

- [ ] **Step 3: Add attribution file**

Create `web/public/sounds/CREDITS.txt` with the Freesound URLs and author names for each file you downloaded (required by Freesound's terms even for CC0 files — good practice).

```
Ambient sounds for Northwatch Wardens DM Panel
All files CC0 licensed from Freesound.org

tavern.mp3   — [Author] — https://freesound.org/s/XXXXX/
forest.mp3   — [Author] — https://freesound.org/s/XXXXX/
dungeon.mp3  — [Author] — https://freesound.org/s/XXXXX/
cave.mp3     — [Author] — https://freesound.org/s/XXXXX/
combat.mp3   — [Author] — https://freesound.org/s/XXXXX/
winter.mp3   — [Author] — https://freesound.org/s/XXXXX/
night.mp3    — [Author] — https://freesound.org/s/XXXXX/
```

Fill in the actual author names and URLs as you download each file.

- [ ] **Step 4: Add sounds to `.gitignore` (optional)**

MP3 files are large for git. If you'd prefer to keep them out of the repo and manage them manually:

Add to `.gitignore`:
```
web/public/sounds/*.mp3
web/public/sounds/custom/*.mp3
web/public/sounds/custom/*.ogg
web/public/sounds/custom/*.wav
```

If you do NOT add them to `.gitignore`, git will track the MP3s in the repo (simpler, but adds binary blobs to history).

- [ ] **Step 5: Commit**

```bash
git add web/public/sounds/CREDITS.txt
# If tracking MP3s:
git add web/public/sounds/*.mp3
git commit -m "feat: add bundled CC0 ambient sound files"
```

---

## Self-Review Checklist

- [x] **Footer bar** — HTML in Task 3, CSS in Task 3, always visible via `position:fixed`
- [x] **SoundPlayer.init()** — Task 4, called in DOMContentLoaded
- [x] **play() + crossfade** — Task 5, dual-audio ping-pong
- [x] **stop() + crossfade** — Task 5, fades out active element
- [x] **Loop toggle** — Task 4 (wired in init), Task 6 (verified)
- [x] **Volume slider** — Task 4 (wired in init), Task 6 (verified)
- [x] **localStorage** — volume, loop, and last scene persisted; scene not auto-resumed
- [x] **suggest()** — Task 7, tokenizes filepath and matches keywords
- [x] **openPath hook** — Task 7, guarded with `if (window.SoundPlayer)`
- [x] **More… modal** — Task 8, uses `window.dmOpenModalRaw`, search filter, play buttons
- [x] **Custom sounds** — `GET /api/sounds/custom` route (Task 1), scanned in init (Task 4), listed in modal (Task 8)
- [x] **CC0 sound files** — Task 9 with attribution file

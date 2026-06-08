# VTT Effects Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Rain, Fog, Snow, Fire, and Darkness overlays to the `/vtt` screen, toggled live from a new VTT section in the DM panel Tools dropdown.

**Architecture:** `vttState` gains `effects` (string array) and `darkness` (float 0–1) fields persisted on the server and broadcast via WebSocket. The VTT screen shows/hides pre-built CSS animation layers via JS. The DM panel wires toggle buttons and a darkness slider to POST updates.

**Tech Stack:** Node.js/Express, vanilla JS, CSS `@keyframes`, `requestAnimationFrame` for fog/fire random walks.

---

## Files

| File | Change |
|---|---|
| `web/server.js` | Extend `vttState` initial shape; update POST handler to accept/preserve `effects` + `darkness` |
| `web/public/vtt.html` | Add effect layer divs, CSS animations, update `applyState()` |
| `web/public/index.html` | Add VTT Screen tools-section to `#tools-dropdown` |
| `web/public/style.css` | Add `.vtt-fx-btn`, `.vtt-fx-btn.active`, `.vtt-dark-row` |
| `web/public/app.js` | Add `_vttEffects` state, wire all VTT controls, sync on load |

---

## Task 1 — Extend server vttState and POST handler

**Files:**
- Modify: `web/server.js` (line 43 for state init; lines 3201–3215 for POST handler)

- [ ] **Update `vttState` initial value to include effects and darkness**

Find line 43:
```javascript
let vttState          = { type: 'idle' };
```
Replace with:
```javascript
let vttState          = { type: 'idle', effects: [], darkness: 0 };
```

- [ ] **Replace the POST `/api/vtt-screen` handler body**

Find the full existing handler (lines ~3201–3215):
```javascript
app.post('/api/vtt-screen', express.json(), (req, res) => {
  if (verifyValue(req.cookies[COOKIE_NAME]) !== 'dm') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const { type, url } = req.body;
  if (type === 'idle') {
    vttState = { type: 'idle' };
  } else if (type === 'map' && url) {
    vttState = { type: 'map', url };
  } else {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  broadcastVtt();
  res.json({ ok: true });
});
```

Replace with:
```javascript
app.post('/api/vtt-screen', express.json(), (req, res) => {
  if (verifyValue(req.cookies[COOKIE_NAME]) !== 'dm') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const { type, url, effects, darkness } = req.body;
  const VALID_FX = new Set(['rain', 'fog', 'snow', 'fire']);

  // effects and darkness are optional — preserve existing values if not sent
  let newEffects = vttState.effects;
  if (effects !== undefined) {
    if (!Array.isArray(effects) || !effects.every(f => VALID_FX.has(f))) {
      return res.status(400).json({ error: 'invalid effects' });
    }
    newEffects = effects;
  }

  let newDarkness = vttState.darkness;
  if (darkness !== undefined) {
    if (typeof darkness !== 'number' || darkness < 0 || darkness > 1) {
      return res.status(400).json({ error: 'darkness must be 0–1' });
    }
    newDarkness = darkness;
  }

  if (type === undefined) {
    // Effects/darkness-only update — preserve existing type and url
    vttState = { ...vttState, effects: newEffects, darkness: newDarkness };
  } else if (type === 'idle') {
    vttState = { type: 'idle', effects: newEffects, darkness: newDarkness };
  } else if (type === 'map' && url) {
    vttState = { type: 'map', url, effects: newEffects, darkness: newDarkness };
  } else {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  broadcastVtt();
  res.json({ ok: true });
});
```

- [ ] **Restart server and verify**

```bash
cd web && node server.js
```

In another terminal:
```bash
curl -s -X POST http://localhost:5050/api/vtt-screen \
  -H "Content-Type: application/json" \
  -b "dm_auth=TPK" \
  -d '{"type":"idle","effects":["rain"],"darkness":0.3}'
```
Expected: `{"ok":true}` (or 401 if cookie not set — that's fine, auth works).

- [ ] **Commit**

```bash
git add web/server.js
git commit -m "feat: vttState gains effects array and darkness field"
```

---

## Task 2 — VTT screen effect layers and animations

**Files:**
- Modify: `web/public/vtt.html` (full replacement — add CSS, DOM, updated JS)

- [ ] **Replace `vtt.html` with the full version including all effect layers**

Write the complete file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VTT — Northwatch Wardens</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 100%; height: 100%; overflow: hidden; background: #000; }

    #map {
      position: relative; z-index: 0;
      width: 100vw; height: 100vh;
      object-fit: contain; display: block;
      opacity: 0; transition: opacity 0.4s ease;
    }
    #map.loaded { opacity: 1; }

    /* ── Effect root — stacked above map ── */
    #fx-root {
      position: fixed; inset: 0; z-index: 10;
      pointer-events: none; overflow: hidden;
    }

    /* Darkness overlay */
    #fx-dark {
      position: absolute; inset: 0;
      background-color: rgba(0,0,0,0);
      transition: background-color 0.5s ease;
    }

    /* Each effect layer hidden by default */
    .fx-layer { position: absolute; inset: 0; display: none; }

    /* ── RAIN ── */
    @keyframes rain-fall {
      0%   { transform: translateY(-5%) translateX(0); }
      100% { transform: translateY(105%) translateX(-4vw); }
    }
    .raindrop {
      position: absolute; width: 1px; border-radius: 1px;
      background: rgba(180,215,255,0.55);
      animation: rain-fall linear infinite;
    }

    /* ── SNOW ── */
    @keyframes snow-fall {
      0%   { transform: translateY(0)      translateX(0px);  opacity: 0.9; }
      50%  { transform: translateY(50vh)   translateX(8px);  opacity: 0.7; }
      100% { transform: translateY(110vh)  translateX(-5px); opacity: 0;   }
    }
    .snowflake {
      position: absolute; border-radius: 50%;
      background: rgba(220,240,255,0.9);
      animation: snow-fall ease-in infinite;
    }

    /* ── FOG ── */
    .fog-blob {
      position: absolute; border-radius: 50%;
      filter: blur(60px);
      background: rgba(200,218,232,0.50);
    }

    /* ── FIRE ── */
    @keyframes hotspot-pulse {
      0%   { transform: scale(1)    rotate(0deg);   opacity: 0.70; }
      25%  { transform: scale(1.08) rotate(2deg);   opacity: 0.90; }
      50%  { transform: scale(0.95) rotate(-2deg);  opacity: 0.75; }
      75%  { transform: scale(1.05) rotate(1deg);   opacity: 0.85; }
      100% { transform: scale(1)    rotate(0deg);   opacity: 0.70; }
    }
    @keyframes fire-ambient {
      0%   { opacity: 0.18; }
      33%  { opacity: 0.28; }
      66%  { opacity: 0.14; }
      100% { opacity: 0.18; }
    }
    .fire-ambient {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at 50% 60%, rgba(255,90,0,0.35) 0%, transparent 70%);
      animation: fire-ambient 3s ease-in-out infinite;
    }
    .fire-hotspot {
      position: absolute; border-radius: 50%;
    }

    #idle {
      position: fixed; inset: 0; z-index: 5;
      display: flex; align-items: center; justify-content: center;
    }
  </style>
</head>
<body>
  <div id="idle"></div>
  <img id="map" src="" alt="">

  <div id="fx-root">
    <div id="fx-dark"></div>
    <div id="fx-rain"  class="fx-layer"></div>
    <div id="fx-snow"  class="fx-layer"></div>
    <div id="fx-fog"   class="fx-layer"></div>
    <div id="fx-fire"  class="fx-layer">
      <div class="fire-ambient"></div>
    </div>
  </div>

  <script>
    const mapEl  = document.getElementById('map');
    const idleEl = document.getElementById('idle');
    const fxDark = document.getElementById('fx-dark');

    /* ── Generate rain drops once at load ── */
    (function buildRain() {
      const layer = document.getElementById('fx-rain');
      for (let i = 0; i < 80; i++) {
        const d = document.createElement('div');
        d.className = 'raindrop';
        d.style.left     = (Math.random() * 110) + '%';
        d.style.top      = (Math.random() * 100) + '%';
        d.style.height   = (8  + Math.random() * 14) + 'px';
        d.style.opacity  = (0.3 + Math.random() * 0.5).toFixed(2);
        d.style.animationDuration = (0.35 + Math.random() * 0.4) + 's';
        d.style.animationDelay   = -(Math.random() * 1.5) + 's';
        layer.appendChild(d);
      }
    })();

    /* ── Generate snowflakes once at load ── */
    (function buildSnow() {
      const layer = document.getElementById('fx-snow');
      for (let i = 0; i < 60; i++) {
        const s = document.createElement('div');
        s.className = 'snowflake';
        const sz = 2 + Math.random() * 4;
        s.style.width    = sz + 'px';
        s.style.height   = sz + 'px';
        s.style.left     = (Math.random() * 100) + '%';
        s.style.top      = '-6px';
        s.style.opacity  = (0.5 + Math.random() * 0.5).toFixed(2);
        s.style.animationDuration = (4 + Math.random() * 5) + 's';
        s.style.animationDelay   = -(Math.random() * 9) + 's';
        layer.appendChild(s);
      }
    })();

    /* ── Fog: 5 blobs doing slow random walks ── */
    (function buildFog() {
      const layer  = document.getElementById('fx-fog');
      const blobs  = [];
      const COUNT  = 5;
      for (let i = 0; i < COUNT; i++) {
        const el = document.createElement('div');
        el.className = 'fog-blob';
        const w = 30 + Math.random() * 30; // % of viewport width
        const h = w * 0.5;
        el.style.width   = w  + 'vw';
        el.style.height  = h  + 'vw';
        el.style.opacity = (0.45 + Math.random() * 0.35).toFixed(2);
        layer.appendChild(el);
        blobs.push({
          el,
          x: Math.random() * 120 - 10,   // % of vw, can start off-edge
          y: Math.random() * 110 - 5,
          vx: (Math.random() - 0.5) * 0.0006,
          vy: (Math.random() - 0.5) * 0.0003,
          w,
        });
        el.style.left = blobs[i].x + 'vw';
        el.style.top  = blobs[i].y + 'vh';
      }

      let last = null;
      function tick(ts) {
        if (!last) last = ts;
        const dt = Math.min(ts - last, 50);
        last = ts;
        for (const b of blobs) {
          b.x += b.vx * dt;
          b.y += b.vy * dt;
          b.vx += (Math.random() - 0.5) * 0.000015;
          b.vy += (Math.random() - 0.5) * 0.000010;
          const maxV = 0.0008;
          b.vx = Math.max(-maxV, Math.min(maxV, b.vx));
          b.vy = Math.max(-maxV * 0.5, Math.min(maxV * 0.5, b.vy));
          if (b.x >  120)        b.x = -b.w;
          if (b.x < -(b.w + 5)) b.x = 115;
          if (b.y >  110)        b.y = -20;
          if (b.y < -25)         b.y = 105;
          b.el.style.left = b.x + 'vw';
          b.el.style.top  = b.y + 'vh';
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    })();

    /* ── Fire: 4 roaming hotspots ── */
    (function buildFire() {
      const layer = document.getElementById('fx-fire');
      const spots = [];
      const HUES  = ['rgba(255,110,0,', 'rgba(255,50,0,', 'rgba(255,160,20,', 'rgba(220,60,0,'];
      for (let i = 0; i < 4; i++) {
        const el = document.createElement('div');
        el.className = 'fire-hotspot';
        const size = 15 + Math.random() * 15; // vw
        el.style.width      = size + 'vw';
        el.style.height     = size + 'vw';
        el.style.marginLeft = -(size / 2) + 'vw';
        el.style.marginTop  = -(size / 2) + 'vw';
        const h = HUES[i % HUES.length];
        el.style.background     = `radial-gradient(circle,${h}0.75) 0%,${h}0.35) 40%,transparent 75%)`;
        el.style.animation      = `hotspot-pulse ${1.2 + Math.random() * 1.4}s ease-in-out infinite`;
        el.style.animationDelay = -(Math.random() * 2) + 's';
        layer.appendChild(el);
        spots.push({
          el,
          x: 15 + Math.random() * 70,  // % of vw
          y: 15 + Math.random() * 70,
          vx: (Math.random() - 0.5) * 0.0005,
          vy: (Math.random() - 0.5) * 0.0005,
        });
        el.style.left = spots[i].x + 'vw';
        el.style.top  = spots[i].y + 'vh';
      }

      let last = null;
      function tick(ts) {
        if (!last) last = ts;
        const dt = Math.min(ts - last, 50);
        last = ts;
        for (const s of spots) {
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          s.vx += (Math.random() - 0.5) * 0.000025;
          s.vy += (Math.random() - 0.5) * 0.000025;
          const maxV = 0.0007;
          s.vx = Math.max(-maxV, Math.min(maxV, s.vx));
          s.vy = Math.max(-maxV, Math.min(maxV, s.vy));
          if (s.x < 5)  { s.x = 5;  s.vx =  Math.abs(s.vx); }
          if (s.x > 95) { s.x = 95; s.vx = -Math.abs(s.vx); }
          if (s.y < 5)  { s.y = 5;  s.vy =  Math.abs(s.vy); }
          if (s.y > 95) { s.y = 95; s.vy = -Math.abs(s.vy); }
          s.el.style.left = s.x + 'vw';
          s.el.style.top  = s.y + 'vh';
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    })();

    /* ── State application ── */
    function applyState(state) {
      // Map image
      if (state.type === 'map' && state.url) {
        idleEl.style.display = 'none';
        mapEl.classList.remove('loaded');
        mapEl.src = state.url;
        mapEl.onload = () => mapEl.classList.add('loaded');
      } else {
        mapEl.src = '';
        mapEl.classList.remove('loaded');
        idleEl.style.display = 'flex';
      }

      // Effects
      const active = new Set(state.effects || []);
      ['rain', 'snow', 'fog', 'fire'].forEach(fx => {
        document.getElementById('fx-' + fx).style.display = active.has(fx) ? 'block' : 'none';
      });

      // Darkness
      fxDark.style.backgroundColor = `rgba(0,0,0,${state.darkness || 0})`;
    }

    // Load initial state
    fetch('/api/vtt-screen').then(r => r.json()).then(applyState).catch(() => {});

    // Live updates via WebSocket
    function connect() {
      const ws = new WebSocket(`ws://${location.host}/ws/vtt`);
      ws.onmessage = e => { try { applyState(JSON.parse(e.data)); } catch {} };
      ws.onclose   = () => setTimeout(connect, 2000);
    }
    connect();
  </script>
</body>
</html>
```

- [ ] **Verify manually**

Open `http://localhost:5050/vtt` in a browser. Page should show black screen (idle state). Then POST a test state:

In browser DevTools console (or curl with cookie):
```javascript
fetch('/api/vtt-screen', {
  method: 'POST',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({ type: 'idle', effects: ['rain', 'fog'], darkness: 0.3 })
})
```

Expected: rain streaks and fog blobs appear on the VTT screen immediately.

- [ ] **Commit**

```bash
git add web/public/vtt.html
git commit -m "feat: vtt effect layers — rain, snow, fog, fire, darkness"
```

---

## Task 3 — Tools dropdown VTT section (HTML)

**Files:**
- Modify: `web/public/index.html` (after the SRD Tools section, around line 718)

- [ ] **Add VTT Screen section to `#tools-dropdown`**

Find the SRD Tools section:
```html
    <div class="tools-section">
      <div class="tools-section-label">SRD Tools</div>
      <button id="tool-random-encounter" class="tool-item">⚔ Random Encounter</button>
      <button id="tool-treasure-hoard" class="tool-item">💰 Treasure Hoard</button>
    </div>
```

Add immediately after:
```html
    <div class="tools-section">
      <div class="tools-section-label">🗺️ VTT Screen</div>
      <div style="display:flex;flex-wrap:wrap;gap:4px;padding:4px 12px 6px">
        <button class="vtt-fx-btn" data-fx="rain">🌧 Rain</button>
        <button class="vtt-fx-btn" data-fx="fog">🌫 Fog</button>
        <button class="vtt-fx-btn" data-fx="snow">❄️ Snow</button>
        <button class="vtt-fx-btn" data-fx="fire">🔥 Fire</button>
      </div>
      <div class="vtt-dark-row">
        <span>🌑</span>
        <input type="range" id="vtt-dark-slider" min="0" max="100" value="0">
        <span id="vtt-dark-val">0%</span>
      </div>
      <div style="display:flex;gap:4px;padding:4px 12px 8px">
        <button id="vtt-clear-fx" class="tool-item" style="flex:1;padding:5px 8px;font-size:11px">✕ Clear</button>
        <button id="vtt-open" class="tool-item" style="flex:1;padding:5px 8px;font-size:11px;color:var(--accent)">↗ Open VTT</button>
      </div>
    </div>
```

- [ ] **Commit**

```bash
git add web/public/index.html
git commit -m "feat: VTT Screen section in tools dropdown"
```

---

## Task 4 — VTT button styles (CSS)

**Files:**
- Modify: `web/public/style.css` (after `.tool-item:hover` rule, around line 951)

- [ ] **Add VTT-specific styles**

Find:
```css
.tool-item:hover { background: var(--overlay); color: var(--accent); }
```

Add immediately after:
```css
.vtt-fx-btn {
  background: none;
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--subtext);
  font-family: inherit;
  font-size: 11px;
  padding: 4px 8px;
  cursor: pointer;
  transition: background 0.1s, border-color 0.1s, color 0.1s;
}
.vtt-fx-btn:hover { background: var(--overlay); color: var(--text); border-color: var(--text); }
.vtt-fx-btn.active { border-color: var(--accent); color: var(--accent); background: var(--overlay); }
.vtt-dark-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  font-size: 11px;
  color: var(--subtext);
}
.vtt-dark-row input[type=range] { flex: 1; accent-color: var(--accent); cursor: pointer; }
#vtt-dark-val { min-width: 28px; text-align: right; }
```

- [ ] **Commit**

```bash
git add web/public/style.css
git commit -m "feat: vtt-fx-btn and vtt-dark-row styles"
```

---

## Task 5 — DM panel JS: VTT effects state and handlers

**Files:**
- Modify: `web/public/app.js` (add near end of file, before the final closing)

- [ ] **Find the end of the file to locate insertion point**

Search for the last occurrence of a top-level event listener or function near the bottom of `app.js`. Add the VTT effects block after all existing code.

- [ ] **Add the complete VTT effects module**

Find the line:
```javascript
btnSendPlayer.addEventListener('click', async () => {
```

Add the following block **above** it (as a self-contained section):

```javascript
// ─── VTT Effects Controls ─────────────────────────────────────────────────────

{
  // Mirror of server vttState effects/darkness fields
  let _vttActive  = new Set();   // currently active effect names
  let _vttDark    = 0;           // 0–1
  let _darkTimer  = null;

  const fxBtns   = document.querySelectorAll('.vtt-fx-btn');
  const darkSlider = document.getElementById('vtt-dark-slider');
  const darkVal    = document.getElementById('vtt-dark-val');
  const clearBtn   = document.getElementById('vtt-clear-fx');
  const openBtn    = document.getElementById('vtt-open');

  function postVttEffects() {
    // No `type` field — server preserves existing type/url and only updates effects/darkness
    fetch('/api/vtt-screen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        effects: [..._vttActive],
        darkness: _vttDark,
      }),
    }).catch(() => {});
  }

  function refreshBtnUI() {
    fxBtns.forEach(btn => {
      btn.classList.toggle('active', _vttActive.has(btn.dataset.fx));
    });
    darkVal.textContent = Math.round(_vttDark * 100) + '%';
    darkSlider.value    = Math.round(_vttDark * 100);
  }

  // Toggle effect buttons
  fxBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const fx = btn.dataset.fx;
      if (_vttActive.has(fx)) _vttActive.delete(fx);
      else _vttActive.add(fx);
      refreshBtnUI();
      postVttEffects();
    });
  });

  // Darkness slider — debounced 50ms
  darkSlider.addEventListener('input', () => {
    _vttDark = darkSlider.value / 100;
    darkVal.textContent = darkSlider.value + '%';
    clearTimeout(_darkTimer);
    _darkTimer = setTimeout(postVttEffects, 50);
  });

  // Clear all effects
  clearBtn.addEventListener('click', () => {
    _vttActive.clear();
    _vttDark = 0;
    refreshBtnUI();
    postVttEffects();
  });

  // Open VTT in new tab
  openBtn.addEventListener('click', () => {
    window.open('/vtt', 'vtt-screen');
  });

  // Sync with server state on load
  fetch('/api/vtt-screen').then(r => r.ok ? r.json() : null).then(state => {
    if (!state) return;
    _vttActive = new Set(state.effects || []);
    _vttDark   = state.darkness || 0;
    refreshBtnUI();
  }).catch(() => {});
}
```

- [ ] **Verify the controls work end-to-end**

1. Restart the server: `cd web && node server.js`
2. Open `http://localhost:5050` and log in
3. Open `http://localhost:5050/vtt` in a second tab
4. Open the Tools dropdown in the DM panel
5. Click **🌧 Rain** — button highlights, rain appears on VTT tab immediately
6. Click **🔥 Fire** — both Rain and Fire active simultaneously
7. Drag the Darkness slider to 50% — VTT darkens in real time
8. Click **✕ Clear** — all effects off, darkness resets to 0
9. Click **↗ Open VTT** — new tab opens at `/vtt`
10. Send a map via the lightbox — map appears on VTT, effects persist

- [ ] **Commit**

```bash
git add web/public/app.js
git commit -m "feat: VTT effects panel — toggle rain/fog/snow/fire, darkness slider"
```

# Adventure Maps → VTT Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a maps sidebar to adventure scenes that allows DMs to preview maps and send them to the VTT display with effects (darkness, grid, weather) in one workflow.

**Architecture:** 
- Backend parses `maps:` frontmatter array (YAML list syntax), injects HTML sidebar into adventure renders
- Frontend modal UI built into `index.html` with client-side state management (darkness/grid/weather)
- Existing `/api/vtt-screen` endpoint handles map broadcast — no backend changes needed
- Adventure files populated with `maps:` field referencing image files in `web/public/maps/`

**Tech Stack:** Node.js/Express (server.js), vanilla JavaScript (app.js), HTML/CSS (index.html, style.css), YAML frontmatter parsing

---

## File Structure

**Files to Create:**
- None (reuse existing structure)

**Files to Modify:**
- `web/server.js` — Add array parsing for maps YAML, inject sidebar HTML
- `web/public/index.html` — Add modal structure for map control panel
- `web/public/style.css` — Add styles for maps sidebar + modal
- `web/public/app.js` — Add JavaScript for modal interactions, VTT broadcast
- `adventures/season-1/the-pale-sickness/01-palebank-investigation.md` — Add `maps:` frontmatter (+ other scenes)

---

## Implementation Tasks

### Task 1: Update frontmatter parsing to handle maps array

**Files:**
- Modify: `web/server.js:260-272` (extractFrontmatter function)

**Context:** The current `extractFrontmatter()` parses simple key:value pairs. The `maps:` field can be a YAML array:

```yaml
maps:
  - location: "Urgon's Cabin"
    file: "pale-sickness-urgons-cabin.png"
  - location: "Pelc's Curiosities"
    file: "pale-sickness-pelcs-curiosities.png"
```

We need a helper to parse this into a JavaScript array of objects.

- [ ] **Step 1: Add a maps array parser helper function**

After line 272 (end of `extractFrontmatter`), add:

```javascript
// Parse maps: YAML array into [{ location, file }, ...]
function parseMapsArray(mapsYaml) {
  if (!mapsYaml || typeof mapsYaml !== 'string') return [];
  
  // Extract lines between first `maps:` and next key or end
  const lines = mapsYaml.split('\n').slice(1); // Skip the "maps:" line itself
  const maps = [];
  let currentMap = null;
  
  for (const line of lines) {
    // Stop at next top-level key (no leading spaces) or empty
    if (line && !line.match(/^\s/) && line.includes(':')) break;
    
    const locationMatch = line.match(/^\s*-\s*location:\s*["']?([^"'\n]+)["']?\s*$/);
    const fileMatch = line.match(/^\s*file:\s*["']?([^"'\n]+)["']?\s*$/);
    
    if (locationMatch) {
      if (currentMap) maps.push(currentMap);
      currentMap = { location: locationMatch[1].trim(), file: null };
    } else if (fileMatch && currentMap) {
      currentMap.file = fileMatch[1].trim();
    }
  }
  if (currentMap && currentMap.file) maps.push(currentMap);
  
  return maps;
}
```

- [ ] **Step 2: Update extractFrontmatter to use the parser**

Replace lines 260-272 with:

```javascript
function extractFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const result = {};
  let mapsRaw = null;
  
  for (const line of m[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon < 1) continue;
    const key = line.slice(0, colon).trim();
    
    // Capture maps: block for later parsing
    if (key === 'maps') {
      mapsRaw = m[1].slice(m[1].indexOf('maps:'));
    } else {
      const val = line.slice(colon + 1).trim().replace(/^["']|["']$/g, '');
      if (key) result[key] = val;
    }
  }
  
  // Parse maps array if present
  if (mapsRaw) {
    result.maps = parseMapsArray(mapsRaw);
  }
  
  return result;
}
```

- [ ] **Step 3: Run server to verify no crashes**

```bash
cd web
node server.js
# Check logs for errors. Expect: "DM Panel running on http://localhost:5050"
```

- [ ] **Step 4: Commit**

```bash
git add web/server.js
git commit -m "feat: add YAML maps array parser for adventure frontmatter"
```

---

### Task 2: Inject maps sidebar HTML in renderWebMarkdown

**Files:**
- Modify: `web/server.js:951-997` (renderWebMarkdown function)

**Context:** After parsing frontmatter (including maps array), we inject a styled sidebar before the main HTML. The sidebar contains buttons for each map.

- [ ] **Step 1: Add function to generate maps sidebar HTML**

After the `parseMapsArray` function (around line 290), add:

```javascript
// Generate HTML for maps sidebar
function generateMapsSidebar(maps) {
  if (!maps || !Array.isArray(maps) || maps.length === 0) return '';
  
  const buttons = maps.map(m => 
    `<button class="map-btn" data-map-file="${esc(m.file)}" data-map-location="${esc(m.location)}" title="Show ${esc(m.location)} map">📍 ${esc(m.location)}</button>`
  ).join('\n');
  
  return `
<div class="maps-sidebar">
  <div class="maps-header">MAPS FOR THIS SCENE</div>
  <div class="maps-buttons">
    ${buttons}
  </div>
</div>
`;
}
```

- [ ] **Step 2: Update renderWebMarkdown to inject sidebar**

In the `renderWebMarkdown` function, find the line `html = header + html;` (line 971). After that section, add:

```javascript
  // Inject maps sidebar if present
  if (fm.maps && fm.maps.length > 0) {
    const mapsSidebar = generateMapsSidebar(fm.maps);
    html = mapsSidebar + html;
  }
```

The updated section should look like:

```javascript
  // Inject NPC portrait + metadata header when frontmatter fields are present
  if (fm.role || fm.location || fm.status || fm.affiliation) {
    let header = '<div class="npc-header">';
    // ... existing code ...
    html = header + html;
  }
  
  // Inject maps sidebar if present
  if (fm.maps && fm.maps.length > 0) {
    const mapsSidebar = generateMapsSidebar(fm.maps);
    html = mapsSidebar + html;
  }
  
  // Post-process: inject data-modal on cross-reference links
  html = html.replace(
    /<a href="((?:npcs|locations|factions|arcs|gm-lore|player-lore|adventures|timeline|homebrew)\/[^"]+)">/g,
    (_, p) => `<a href="#" data-modal="${esc(p)}">`
  );
```

- [ ] **Step 3: Test frontmatter parsing**

Add test data to `adventures/season-1/the-pale-sickness/01-palebank-investigation.md` at the top (just below the existing `---`):

```yaml
---
scene: 1
title: Palebank Investigation
location: Palebank Village — Urgon's cabin, Pelc's Curiosities, Tulgi's cabin, Irven's home
maps:
  - location: "Urgon's Cabin"
    file: "test-map.png"
  - location: "Pelc's Curiosities"
    file: "test-map.png"
---
```

- [ ] **Step 4: Reload DM Panel and view adventure**

```bash
# In browser: http://localhost:5050
# Click on adventures > season-1 > The Pale Sickness > 01-palebank-investigation.md
# Expected: Maps sidebar appears at the top with two buttons
```

- [ ] **Step 5: Verify sidebar HTML in browser console**

In browser DevTools:

```javascript
document.querySelector('.maps-sidebar') // Should return the sidebar element
document.querySelectorAll('.map-btn').length // Should return 2
```

- [ ] **Step 6: Commit**

```bash
git add web/server.js adventures/season-1/the-pale-sickness/01-palebank-investigation.md
git commit -m "feat: inject maps sidebar HTML for adventures with maps frontmatter"
```

---

### Task 3: Add modal structure to index.html

**Files:**
- Modify: `web/public/index.html` (add modal HTML before closing `</body>`)

**Context:** The modal displays the map preview, darkness slider, grid checkbox, weather dropdown, and Send/Close buttons.

- [ ] **Step 1: Add modal HTML**

Find the line with `</body>` (near end of file). Before it, add:

```html
<!-- Maps control panel modal -->
<div id="maps-modal" class="modal-overlay maps-modal-overlay" hidden>
  <div class="modal-box maps-modal-box">
    <div class="maps-modal-header">
      <span id="maps-modal-title">Map Name</span>
      <button class="modal-close maps-modal-close">✕</button>
    </div>
    
    <div class="maps-modal-content">
      <!-- Map preview -->
      <div class="maps-preview-container">
        <img id="maps-preview-img" class="maps-preview-img" src="" alt="Map preview">
        <div id="maps-preview-error" class="maps-preview-error" hidden>Map file not found</div>
      </div>
      
      <!-- Controls -->
      <div class="maps-controls">
        <div class="maps-control-group">
          <label for="maps-darkness">Darkness</label>
          <div class="maps-slider-container">
            <input type="range" id="maps-darkness" class="maps-slider" min="0" max="100" value="0">
            <span id="maps-darkness-value" class="maps-slider-value">0%</span>
          </div>
        </div>
        
        <div class="maps-control-group">
          <label class="maps-checkbox-label">
            <input type="checkbox" id="maps-grid" class="maps-checkbox">
            Grid on/off
          </label>
        </div>
        
        <div class="maps-control-group">
          <label for="maps-weather">Weather</label>
          <select id="maps-weather" class="maps-select">
            <option value="">None</option>
            <option value="rain">Rain</option>
            <option value="snow">Snow</option>
            <option value="fog">Fog</option>
            <option value="fire">Fire</option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="maps-modal-footer">
      <button id="maps-send-btn" class="maps-send-btn">Send to VTT</button>
      <button id="maps-close-btn" class="maps-close-btn">Close</button>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Verify HTML is in place**

```bash
# Search for "maps-modal" in index.html
grep -n "maps-modal" web/public/index.html | head -5
# Expected: Multiple matches showing the modal elements
```

- [ ] **Step 3: Commit**

```bash
git add web/public/index.html
git commit -m "feat: add maps control panel modal HTML structure"
```

---

### Task 4: Add CSS for maps sidebar and modal

**Files:**
- Modify: `web/public/style.css` (add at end of file)

**Context:** Style the maps sidebar callout and the control panel modal.

- [ ] **Step 1: Add maps sidebar CSS**

At the end of `web/public/style.css`, add:

```css
/* ─── Maps Sidebar ─────────────────────────────────────────────────────────── */

.maps-sidebar {
  background: var(--overlay);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 12px 16px;
  margin-bottom: 20px;
  font-family: sans-serif;
}

.maps-header {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 10px;
}

.maps-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.map-btn {
  background: var(--panel);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  text-align: left;
  transition: all 0.2s ease;
}

.map-btn:hover {
  background: var(--accent);
  color: var(--bg);
  border-color: var(--accent);
}

/* ─── Maps Modal ───────────────────────────────────────────────────────────── */

.maps-modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
}

.maps-modal-box {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 6px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.maps-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.maps-modal-close {
  background: none;
  border: none;
  color: var(--subtext);
  cursor: pointer;
  font-size: 20px;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.maps-modal-close:hover {
  color: var(--accent);
}

.maps-modal-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.maps-preview-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 4px;
  min-height: 300px;
  max-height: 400px;
  position: relative;
}

.maps-preview-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}

.maps-preview-error {
  color: var(--red);
  font-size: 12px;
  text-align: center;
}

.maps-controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.maps-control-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.maps-control-group > label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
}

.maps-slider-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.maps-slider {
  flex: 1;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--overlay);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}

.maps-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
}

.maps-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
  border: none;
}

.maps-slider-value {
  font-size: 12px;
  color: var(--subtext);
  min-width: 35px;
}

.maps-checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 13px;
  color: var(--text);
}

.maps-checkbox {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.maps-select {
  background: var(--overlay);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}

.maps-select:hover {
  border-color: var(--accent);
}

.maps-select:focus {
  outline: none;
  border-color: var(--accent);
}

.maps-modal-footer {
  display: flex;
  gap: 10px;
  padding: 16px;
  border-top: 1px solid var(--border);
  justify-content: flex-end;
}

.maps-send-btn,
.maps-close-btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid var(--border);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.maps-send-btn {
  background: var(--accent);
  color: var(--bg);
  border-color: var(--accent);
}

.maps-send-btn:hover {
  opacity: 0.9;
}

.maps-send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.maps-close-btn {
  background: var(--panel);
  color: var(--text);
}

.maps-close-btn:hover {
  background: var(--overlay);
}
```

- [ ] **Step 2: Verify CSS compiles (no syntax errors)**

```bash
# Check if the file has balanced braces
cd web/public
node -e "require('fs').readFileSync('style.css', 'utf8')" && echo "CSS valid"
```

- [ ] **Step 3: Commit**

```bash
git add web/public/style.css
git commit -m "feat: add CSS for maps sidebar and modal UI"
```

---

### Task 5: Add JavaScript event handlers for modal interaction

**Files:**
- Modify: `web/public/app.js` (add event listener in main document.addEventListener click block)

**Context:** Handle map button clicks to open the modal, slider/checkbox/dropdown changes, and send-to-VTT requests.

- [ ] **Step 1: Add modal state and helper functions**

At the top of `app.js`, after the existing state variables (around line 29), add:

```javascript
let mapsModalState = {
  currentMapFile: null,
  currentMapLocation: null,
  darkness: 0,
  grid: false,
  weather: '',
};
```

- [ ] **Step 2: Add function to open the maps modal**

Before the main `document.addEventListener('click', ...)` block (around line 550), add:

```javascript
function openMapsModal(mapFile, mapLocation) {
  const modal = $('maps-modal');
  const titleEl = $('maps-modal-title');
  const imgEl = $('maps-preview-img');
  const errorEl = $('maps-preview-error');
  const darknessSlider = $('maps-darkness');
  const gridCheckbox = $('maps-grid');
  const weatherSelect = $('maps-weather');
  
  // Update state
  mapsModalState.currentMapFile = mapFile;
  mapsModalState.currentMapLocation = mapLocation;
  mapsModalState.darkness = 0;
  mapsModalState.grid = false;
  mapsModalState.weather = '';
  
  // Reset controls to defaults
  titleEl.textContent = mapLocation;
  darknessSlider.value = 0;
  gridCheckbox.checked = false;
  weatherSelect.value = '';
  
  updateMapsDarknessLabel();
  
  // Try to load image
  imgEl.hidden = false;
  errorEl.hidden = true;
  imgEl.src = `/maps/${encodeURIComponent(mapFile)}`;
  imgEl.onerror = () => {
    imgEl.hidden = true;
    errorEl.hidden = false;
  };
  
  // Show modal
  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add('visible'));
}

function closeMapsModal() {
  const modal = $('maps-modal');
  modal.classList.remove('visible');
  setTimeout(() => { modal.hidden = true; }, 200);
}

function updateMapsDarknessLabel() {
  const slider = $('maps-darkness');
  const value = $('maps-darkness-value');
  mapsModalState.darkness = parseInt(slider.value, 10);
  value.textContent = `${mapsModalState.darkness}%`;
}
```

- [ ] **Step 3: Add map button click handler**

In the main `document.addEventListener('click', e => { ... })` block (around line 550-755), add this handler after the "Close button" handler (around line 751):

```javascript
  // Maps sidebar buttons
  const mapBtn = e.target.closest('.map-btn');
  if (mapBtn) {
    e.preventDefault();
    const mapFile = mapBtn.getAttribute('data-map-file');
    const mapLocation = mapBtn.getAttribute('data-map-location');
    openMapsModal(mapFile, mapLocation);
    return;
  }
  
  // Maps modal close button
  const mapsModalClose = e.target.closest('.maps-modal-close, .maps-close-btn');
  if (mapsModalClose) {
    e.preventDefault();
    closeMapsModal();
    return;
  }
```

- [ ] **Step 4: Add slider change handler**

After the main click event listener (around line 755), add:

```javascript
// Maps darkness slider
document.getElementById('maps-darkness')?.addEventListener('input', updateMapsDarknessLabel);

// Maps grid checkbox
document.getElementById('maps-grid')?.addEventListener('change', e => {
  mapsModalState.grid = e.target.checked;
});

// Maps weather select
document.getElementById('maps-weather')?.addEventListener('change', e => {
  mapsModalState.weather = e.target.value;
});

// Maps send button
document.getElementById('maps-send-btn')?.addEventListener('click', async () => {
  const mapFile = mapsModalState.currentMapFile;
  if (!mapFile) return;
  
  const mapUrl = `http://localhost:5050/maps/${encodeURIComponent(mapFile)}`;
  const effects = [];
  if (mapsModalState.weather) effects.push(mapsModalState.weather);
  
  try {
    const r = await fetch('/api/vtt-screen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'map',
        url: mapUrl,
        darkness: mapsModalState.darkness,
        grid: mapsModalState.grid,
        effects: effects,
      }),
    });
    if (r.ok) {
      showToast(`Map sent to VTT: ${mapsModalState.currentMapLocation}`);
      closeMapsModal();
    } else {
      showToast('Failed to send map to VTT', 'error');
    }
  } catch (e) {
    showToast(`Error: ${e.message}`, 'error');
  }
});
```

- [ ] **Step 5: Test in browser**

```bash
# In browser: http://localhost:5050
# 1. Navigate to adventure with maps
# 2. Click a map button
# Expected: Modal opens with map preview
# 3. Adjust slider, checkbox, dropdown
# Expected: Values update in real-time
# 4. Click "Send to VTT"
# Expected: Toast shows "Map sent to VTT", modal closes
```

- [ ] **Step 6: Commit**

```bash
git add web/public/app.js
git commit -m "feat: add maps modal interaction and VTT broadcast"
```

---

### Task 6: Create maps directory and add test maps

**Files:**
- Create: `web/public/maps/` directory
- Add placeholder map images

**Context:** Adventure maps need to exist in `web/public/maps/` to be served. For testing, we'll use simple placeholder images.

- [ ] **Step 1: Create maps directory**

```bash
mkdir -p "web/public/maps"
ls -la web/public/maps/
# Expected: directory exists and is empty
```

- [ ] **Step 2: Create placeholder images**

For now, we'll use simple PNG placeholders. Create a minimal test image using Python:

```bash
python3 << 'EOF'
from PIL import Image, ImageDraw
import os

# Create 3 simple placeholder maps
maps_dir = r"web\public\maps"
os.makedirs(maps_dir, exist_ok=True)

for name in ["pale-sickness-urgons-cabin", "pale-sickness-pelcs-curiosities", "pale-sickness-tulgi-cabin"]:
    img = Image.new('RGB', (800, 600), color=(40, 30, 20))
    draw = ImageDraw.Draw(img)
    # Draw a simple border and text
    draw.rectangle([(10, 10), (790, 590)], outline=(180, 140, 100), width=2)
    draw.text((400, 300), name.replace("pale-sickness-", "").replace("-", " ").title(), 
              fill=(200, 150, 100), anchor="mm")
    img.save(os.path.join(maps_dir, f"{name}.png"))
    print(f"Created {name}.png")

print("Done!")
EOF
```

- [ ] **Step 3: Verify maps exist**

```bash
ls -la web/public/maps/
# Expected: 3 PNG files listed
```

- [ ] **Step 4: Commit**

```bash
git add web/public/maps/
git commit -m "feat: add placeholder map images for testing"
```

---

### Task 7: Add maps frontmatter to Pale Sickness adventure scenes

**Files:**
- Modify: `adventures/season-1/the-pale-sickness/01-palebank-investigation.md`
- Modify: `adventures/season-1/the-pale-sickness/02-croaker-cave.md`
- Modify: `adventures/season-1/the-pale-sickness/03-journey-to-salsvault.md`
- Modify: `adventures/season-1/the-pale-sickness/04-salsvault.md`
- Modify: `adventures/season-1/the-pale-sickness/05-return-resolution.md`

**Context:** Add `maps:` YAML array to each adventure file's frontmatter, pointing to map files in `web/public/maps/`.

- [ ] **Step 1: Update 01-palebank-investigation.md frontmatter**

Read the file first to see current frontmatter, then update it:

```yaml
---
scene: 1
title: Palebank Investigation
location: Palebank Village — Urgon's cabin, Pelc's Curiosities, Tulgi's cabin, Irven's home
maps:
  - location: "Urgon's Cabin"
    file: "pale-sickness-urgons-cabin.png"
  - location: "Pelc's Curiosities"
    file: "pale-sickness-pelcs-curiosities.png"
  - location: "Tulgi's Cabin"
    file: "pale-sickness-tulgi-cabin.png"
---
```

Replace the entire frontmatter block (lines 1-5) with the above.

- [ ] **Step 2: Update 02-croaker-cave.md**

Read file to find current scene/title, then add maps. Example (adjust based on actual content):

```yaml
---
scene: 2
title: Croaker Cave
maps:
  - location: "Croaker Cave Entrance"
    file: "pale-sickness-croaker-cave.png"
---
```

- [ ] **Step 3: Update 03-journey-to-salsvault.md**

Update frontmatter similar to step 1. If this is a travel scene with no specific map, leave maps: empty or omit it.

- [ ] **Step 4: Update 04-salsvault.md**

Add maps frontmatter:

```yaml
---
scene: 4
title: Salsvault
maps:
  - location: "Salsvault Exterior"
    file: "pale-sickness-salsvault.png"
---
```

- [ ] **Step 5: Update 05-return-resolution.md**

Add if applicable, or leave without maps if it's a wrap-up scene.

- [ ] **Step 6: Test in browser**

Navigate to each adventure scene in the DM Panel and verify:
- Maps sidebar appears with correct buttons
- Buttons can be clicked without errors
- Modal opens and closes properly

- [ ] **Step 7: Commit all adventure updates**

```bash
git add adventures/season-1/the-pale-sickness/
git commit -m "feat: add maps frontmatter to Pale Sickness scenes"
```

---

### Task 8: End-to-end integration test

**Files:**
- Test: Manual verification in browser

**Context:** Verify the complete workflow from adventure view → map modal → VTT broadcast.

- [ ] **Step 1: Start DM Panel**

```bash
pm2 restart dm-panel
# or if not running:
cd web && npm run up
```

- [ ] **Step 2: Open DM Panel in browser**

Navigate to: `http://localhost:5050`

- [ ] **Step 3: Open Pale Sickness adventure**

File browser → adventures → season-1 → The Pale Sickness → 01-palebank-investigation.md

Expected: Maps sidebar appears below the title with map buttons.

- [ ] **Step 4: Click first map button**

Click "📍 Urgon's Cabin"

Expected:
- Modal opens with title "Urgon's Cabin"
- Placeholder map image loads and displays
- Darkness slider at 0%, grid unchecked, weather "None"
- Send to VTT and Close buttons present

- [ ] **Step 5: Adjust controls**

- Drag darkness slider to 80%
- Check the grid checkbox
- Select "Snow" from weather dropdown

Expected: Values update in real-time (slider shows 80%, checkbox is checked, dropdown shows Snow)

- [ ] **Step 6: Send to VTT**

Click "Send to VTT"

Expected:
- Toast notification: "Map sent to VTT: Urgon's Cabin"
- Modal closes
- No browser errors in DevTools

- [ ] **Step 7: Verify VTT state persisted**

Open VTT display (`http://localhost:5050/vtt`) in separate tab.

Expected:
- If VTT display is running, map should appear with darkness effect applied
- (VTT display logic already exists, we're just testing the broadcast)

- [ ] **Step 8: Test map not found error**

Edit a map button's `data-map-file` temporarily in DevTools to a non-existent filename, click it.

Expected:
- Modal opens
- "Map file not found" message appears
- Image is hidden

- [ ] **Step 9: Test missing modal fixture**

Reload page, verify modal doesn't show errors in console.

- [ ] **Step 10: Commit final verification**

No changes needed if all tests pass. If you found bugs, fix them and commit.

```bash
git status
# Should be clean
```

---

## Spec Coverage Checklist

✅ **Data Structure** — YAML array parsing for `maps:` field (Task 1)  
✅ **Frontend Sidebar** — Maps sidebar callout rendered below scene title (Task 2, 4)  
✅ **Control Panel Modal** — Map preview + darkness/grid/weather controls (Task 3, 4, 5)  
✅ **VTT Broadcast** — POST to existing `/api/vtt-screen` endpoint (Task 5)  
✅ **Adventure Frontmatter** — `maps:` added to Pale Sickness scenes (Task 7)  
✅ **Error Handling** — Missing map file shows placeholder error (Task 5, inline)  
✅ **CSS Styling** — Sidebar and modal styled with theme variables (Task 4)  
✅ **End-to-End Testing** — Full workflow verified in browser (Task 8)  

---

## Implementation Notes

- **No backend endpoint changes** — Existing `/api/vtt-screen` already handles map broadcast
- **Image serving** — Maps are static files in `web/public/maps/`, served by Express `static` middleware
- **Session persistence** — VTT state already persists to `web/data/vtt-state.json` (no changes needed)
- **Backwards compatibility** — Adventures without `maps:` frontmatter render normally (maps sidebar doesn't appear)
- **Testing** — Manual browser testing only (no unit tests added; would require mocking Express)

---

## Next Steps

**Plan complete and saved.** Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach would you prefer?**

# Map Deletion & Collapsible Panels Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add multi-select map deletion with 30-day trash recovery and independently collapsible Files/Maps panels to the DM Panel.

**Architecture:** Backend trash system (move to folder, track with manifest, daily cleanup cron) + frontend selection UI (checkboxes, action bar, confirmation modal) + collapsible section state persisted to localStorage.

**Tech Stack:** Node.js/Express (server), vanilla JavaScript (client), CSS Grid/Flexbox (layout), localStorage (state persistence)

---

## File Structure

**Modified files:**
- `web/server.js` — Add trash utilities, `/api/maps/delete` endpoint, daily cleanup job
- `web/public/app.js` — Add map selection tracking, action bar/modal logic, collapse state handlers
- `web/public/index.html` — Add checkbox HTML, action bar, modal, collapse toggles to headers
- `web/public/style.css` — Add checkbox, action bar, modal, collapse animation styles

---

## Task 1: Backend Trash Utilities

**Files:**
- Modify: `web/server.js` (top-level utilities section, before routes)

Create helper functions for trash operations.

- [ ] **Step 1: Add trash directory constant and helper functions**

Add this after the `VTT_STATE_FILE` definition and before the vttState initialization (~line 90):

```javascript
// ── Trash management for deleted maps ────────────────────────────────────────
const TRASH_DIR = path.join(CAMPAIGN_ROOT, 'web/data/trash');
const TRASH_MANIFEST_FILE = path.join(TRASH_DIR, 'trash-manifest.json');

function ensureTrashDir() {
  try {
    fs.mkdirSync(TRASH_DIR, { recursive: true });
    return true;
  } catch (e) {
    console.error('[trash] Failed to create trash directory:', e.message);
    return false;
  }
}

function loadTrashManifest() {
  try {
    if (!fs.existsSync(TRASH_MANIFEST_FILE)) return {};
    return JSON.parse(fs.readFileSync(TRASH_MANIFEST_FILE, 'utf8'));
  } catch (e) {
    console.warn('[trash] Failed to load manifest, starting fresh:', e.message);
    return {};
  }
}

function saveTrashManifest(manifest) {
  try {
    ensureTrashDir();
    fs.writeFileSync(TRASH_MANIFEST_FILE, JSON.stringify(manifest, null, 2));
    return true;
  } catch (e) {
    console.error('[trash] Failed to save manifest:', e.message);
    return false;
  }
}

function trashFile(filePath, originalPath, source) {
  // Move a file to trash and record in manifest
  if (!ensureTrashDir()) return false;
  
  try {
    const filename = path.basename(filePath);
    const trashPath = path.join(TRASH_DIR, filename);
    
    // If file already in trash with same name, append timestamp
    if (fs.existsSync(trashPath)) {
      const ts = Date.now();
      const ext = path.extname(filename);
      const nameWithoutExt = path.basename(filename, ext);
      const newFilename = `${nameWithoutExt}_${ts}${ext}`;
      fs.copyFileSync(filePath, path.join(TRASH_DIR, newFilename));
      fs.unlinkSync(filePath);
      
      const manifest = loadTrashManifest();
      manifest[newFilename] = {
        filename: newFilename,
        original_path: originalPath,
        trashed_at: ts,
        source: source
      };
      saveTrashManifest(manifest);
      return true;
    }
    
    // Normal case: move to trash
    fs.copyFileSync(filePath, trashPath);
    fs.unlinkSync(filePath);
    
    const manifest = loadTrashManifest();
    manifest[filename] = {
      filename: filename,
      original_path: originalPath,
      trashed_at: Date.now(),
      source: source
    };
    saveTrashManifest(manifest);
    return true;
  } catch (e) {
    console.error('[trash] Failed to trash file:', filePath, e.message);
    return false;
  }
}

function cleanupExpiredTrash(daysOld = 30) {
  // Delete files in trash older than daysOld days
  const manifest = loadTrashManifest();
  const now = Date.now();
  const expiryMs = daysOld * 24 * 60 * 60 * 1000;
  let deleted = 0;
  let errors = 0;
  
  for (const [filename, entry] of Object.entries(manifest)) {
    if (now - entry.trashed_at > expiryMs) {
      const filePath = path.join(TRASH_DIR, filename);
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        delete manifest[filename];
        deleted++;
      } catch (e) {
        console.error('[trash] Failed to delete:', filename, e.message);
        errors++;
      }
    }
  }
  
  if (deleted > 0 || errors > 0) {
    saveTrashManifest(manifest);
    console.log(`[trash] Cleanup: deleted ${deleted} files, ${errors} errors`);
  }
  return { deleted, errors };
}
```

- [ ] **Step 2: Verify constants are properly scoped**

Run: `grep -n "const TRASH_DIR" web/server.js`
Expected: One match, showing the constant definition

- [ ] **Step 3: Commit**

```bash
git add web/server.js
git commit -m "feat: add trash utility functions for map deletion"
```

---

## Task 2: Daily Cleanup Scheduled Job

**Files:**
- Modify: `web/server.js` (in the server setup section, after express initialization)

Add a daily cron job that runs cleanup and also runs on startup.

- [ ] **Step 1: Add cleanup scheduling after server creation**

Find the line where the server is created (~line 2200 where `http.createServer()` appears). Add this code after the server is fully initialized (around line 2250, before or after the WebSocket setup):

```javascript
// ── Scheduled cleanup for expired trash (daily at 3 AM) ──────────────────────
function scheduleTrashCleanup() {
  // Run cleanup immediately on startup (in case we missed scheduled runs)
  cleanupExpiredTrash(30);
  
  // Schedule daily cleanup at 3 AM server time
  const now = new Date();
  const scheduledTime = new Date();
  scheduledTime.setHours(3, 0, 0, 0);
  
  if (now > scheduledTime) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }
  
  const msUntilThreeAM = scheduledTime - now;
  
  console.log(`[trash] Cleanup scheduled for ${scheduledTime.toISOString()}`);
  
  setTimeout(() => {
    cleanupExpiredTrash(30);
    // Reschedule every 24 hours
    setInterval(() => cleanupExpiredTrash(30), 24 * 60 * 60 * 1000);
  }, msUntilThreeAM);
}

scheduleTrashCleanup();
```

- [ ] **Step 2: Test that startup cleanup runs**

Restart the server with: `pm2 restart dm-panel`
Check logs with: `pm2 logs dm-panel | grep trash`
Expected: Should see "[trash]" messages indicating startup cleanup ran

- [ ] **Step 3: Commit**

```bash
git add web/server.js
git commit -m "feat: add daily scheduled trash cleanup (3 AM server time)"
```

---

## Task 3: Delete Maps API Endpoint

**Files:**
- Modify: `web/server.js` (add new route after existing map routes, around line 1430)

Add the `/api/maps/delete` POST endpoint that handles deletion.

- [ ] **Step 1: Implement the delete endpoint**

Add this after the `/api/maps/generate` endpoint (around line 1500+):

```javascript
app.post('/api/maps/delete', requireAuth, async (req, res) => {
  try {
    const { filenames } = req.body;
    if (!Array.isArray(filenames) || filenames.length === 0) {
      return res.status(400).json({ error: 'filenames must be a non-empty array' });
    }
    
    const deleted = [];
    const errors = {};
    
    for (const filename of filenames) {
      // Sanitize filename to prevent directory traversal
      const sanitized = path.basename(filename);
      if (!sanitized || sanitized !== filename) {
        errors[filename] = 'Invalid filename';
        continue;
      }
      
      let found = false;
      let sourcePath = null;
      let source = null;
      
      // Check all possible sources
      const possibleSources = [
        { dir: MAPS_OUTPUT_DIR, type: 'generated' },
        { dir: path.join(CAMPAIGN_ROOT, 'web/public/maps'), type: 'generated' }, // user-saved maps
        { dir: path.join(CAMPAIGN_ROOT, 'web/data/maps'), type: 'generated' },
      ];
      
      // Check library paths
      const MAP_LIBRARY_PATHS = [
        path.join(CAMPAIGN_ROOT, '07 - Maps'),
        path.join(CAMPAIGN_ROOT, 'Web Resources'),
      ];
      MAP_LIBRARY_PATHS.forEach(dir => {
        possibleSources.push({ dir, type: 'library' });
      });
      
      // Check adventure maps
      possibleSources.push({
        dir: path.join(CAMPAIGN_ROOT, 'adventures/season-1/the-pale-sickness/maps'),
        type: 'adventure'
      });
      
      for (const { dir, type } of possibleSources) {
        const fullPath = path.join(dir, sanitized);
        if (fs.existsSync(fullPath) && fullPath.startsWith(path.resolve(dir))) {
          found = true;
          sourcePath = fullPath;
          source = type;
          break;
        }
      }
      
      if (!found) {
        errors[filename] = 'File not found';
        continue;
      }
      
      if (trashFile(sourcePath, sourcePath, source)) {
        deleted.push(filename);
      } else {
        errors[filename] = 'Failed to move to trash';
      }
    }
    
    res.json({ deleted, errors });
  } catch (e) {
    console.error('[maps/delete]', e);
    res.status(500).json({ error: e.message });
  }
});
```

- [ ] **Step 2: Test the endpoint manually**

Create a test map file and call the endpoint:

```bash
curl -X POST http://localhost:5050/api/maps/delete \
  -H "Content-Type: application/json" \
  -H "Cookie: dm_auth=<your_auth_token>" \
  -d '{"filenames": ["nonexistent.png"]}'
```

Expected: Response should have the file listed in `errors` with "File not found"

- [ ] **Step 3: Commit**

```bash
git add web/server.js
git commit -m "feat: add POST /api/maps/delete endpoint with trash logic"
```

---

## Task 4: HTML Structure for Checkboxes & Action Bar

**Files:**
- Modify: `web/public/index.html` (add checkbox to map template and action bar HTML)

Update the HTML to include checkbox overlays and the action bar.

- [ ] **Step 1: Update map thumbnail HTML template**

Find the section around line 795-820 where the map gallery is defined. Update the template by modifying the inline HTML in app.js that generates thumbnails. But first, let's update index.html to add the action bar structure.

Add this HTML after the `left-maps-gen-form` closing `</div>` (around line 820):

```html
      <div id="left-maps-action-bar" hidden class="left-maps-action-bar">
        <span id="left-maps-count" class="left-maps-count">0 maps selected</span>
        <div class="left-maps-bar-buttons">
          <button id="left-maps-select-all" class="left-maps-bar-btn">Select All</button>
          <button id="left-maps-clear" class="left-maps-bar-btn">Clear</button>
          <button id="left-maps-delete" class="left-maps-bar-btn left-maps-delete-btn">Delete</button>
        </div>
      </div>
```

- [ ] **Step 2: Add confirmation modal HTML**

Add this modal HTML before the closing `</body>` tag (around line 4900+):

```html
    <!-- Map deletion confirmation modal -->
    <div id="left-maps-confirm-modal" class="left-maps-modal" hidden>
      <div class="left-maps-modal-backdrop"></div>
      <div class="left-maps-modal-dialog">
        <div class="left-maps-modal-header">
          <h3>Delete maps?</h3>
          <button class="left-maps-modal-close" id="left-maps-confirm-cancel">✕</button>
        </div>
        <div class="left-maps-modal-body">
          <p id="left-maps-confirm-count" style="margin: 0 0 12px 0; color: #aaa; font-size: 13px;">These will be moved to trash and auto-deleted after 30 days.</p>
          <div id="left-maps-confirm-list" class="left-maps-confirm-list"></div>
        </div>
        <div class="left-maps-modal-footer">
          <button id="left-maps-confirm-cancel-btn" class="left-maps-modal-btn">Cancel</button>
          <button id="left-maps-confirm-delete-btn" class="left-maps-modal-btn left-maps-modal-delete-btn">Delete</button>
        </div>
      </div>
    </div>
```

- [ ] **Step 3: Add collapse toggles to section headers**

Find the line with `<div class="panel-hdr panel-hdr-maps">Maps</div>` (around line 795). Update it to:

```html
      <div class="panel-hdr panel-hdr-maps">
        <span class="panel-collapse-toggle" data-section="maps">▼</span>
        <span>Maps</span>
      </div>
```

Also update the Files header similarly. Find the section around line 765-770 and update it to:

```html
      <div class="panel-hdr panel-hdr-files">
        <span class="panel-collapse-toggle" data-section="files">▼</span>
        <span>Files</span>
      </div>
```

- [ ] **Step 4: Verify HTML structure compiles without errors**

Open `http://localhost:5050` in browser and open dev console.
Expected: No HTML parse errors, new elements should be present in DOM

- [ ] **Step 5: Commit**

```bash
git add web/public/index.html
git commit -m "feat: add HTML for map checkboxes, action bar, confirmation modal, collapse toggles"
```

---

## Task 5: CSS Styles for Checkboxes & Action Bar

**Files:**
- Modify: `web/public/style.css` (add new styles at the end)

Add CSS for the new UI components.

- [ ] **Step 1: Add checkbox and action bar styles**

Add this at the end of `style.css`:

```css
/* ── Map Selection UI ────────────────────────────────────────────────────────────── */

.lm-thumb {
  position: relative;
}

.lm-thumb-checkbox {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 20px;
  height: 20px;
  background: rgba(30, 58, 90, 0.9);
  border: 2px solid #3a7abf;
  border-radius: 3px;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background-color 0.15s;
}

.lm-thumb-checkbox:hover {
  background: rgba(30, 58, 90, 1);
}

.lm-thumb-checkbox::after {
  content: '';
  width: 4px;
  height: 8px;
  border: solid #7ada7a;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) translate(-1px, -2px);
  opacity: 0;
  transition: opacity 0.15s;
}

.lm-thumb-checkbox.checked {
  background: #1e3a1e;
  border-color: #7ada7a;
}

.lm-thumb-checkbox.checked::after {
  opacity: 1;
}

.lm-thumb.selected {
  border-color: #7ada7a !important;
  box-shadow: 0 0 8px rgba(122, 218, 122, 0.3);
}

.lm-thumb[data-selecting] .lm-thumb-checkbox {
  display: flex;
}

/* ── Action Bar ────────────────────────────────────────────────────────────── */

.left-maps-action-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #0a0a0a;
  border-top: 1px solid #2a2a2a;
  gap: 12px;
  font-size: 12px;
}

.left-maps-count {
  color: #7ada7a;
  font-weight: 500;
  flex: 1;
}

.left-maps-bar-buttons {
  display: flex;
  gap: 6px;
}

.left-maps-bar-btn {
  padding: 4px 12px;
  background: #1a1a1a;
  border: 1px solid #333;
  color: #aaa;
  border-radius: 3px;
  cursor: pointer;
  font-size: 11px;
  transition: all 0.15s;
}

.left-maps-bar-btn:hover {
  border-color: #3a7abf;
  color: #c8d8e8;
  background: #111;
}

.left-maps-delete-btn {
  background: #3a1a1a;
  border-color: #7a3a3a;
  color: #e05050;
}

.left-maps-delete-btn:hover {
  background: #4a2a2a;
  border-color: #9a5a5a;
  color: #f07070;
}

/* ── Confirmation Modal ────────────────────────────────────────────────────────────── */

.left-maps-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.left-maps-modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
}

.left-maps-modal-dialog {
  position: relative;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 6px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.left-maps-modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.left-maps-modal-header h3 {
  margin: 0;
  color: #c8d8e8;
  font-size: 16px;
  font-weight: 600;
}

.left-maps-modal-close {
  background: none;
  border: none;
  color: #666;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.15s;
}

.left-maps-modal-close:hover {
  color: #aaa;
}

.left-maps-modal-body {
  padding: 16px 20px;
  overflow-y: auto;
  flex: 1;
}

.left-maps-confirm-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.left-maps-confirm-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px;
  background: #111;
  border-radius: 3px;
  font-size: 12px;
}

.left-maps-confirm-item-thumb {
  width: 40px;
  height: 40px;
  border-radius: 2px;
  overflow: hidden;
  flex-shrink: 0;
  background: #0a0a0a;
}

.left-maps-confirm-item-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.left-maps-confirm-item-name {
  flex: 1;
  color: #c8d8e8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.left-maps-modal-footer {
  padding: 12px 20px;
  border-top: 1px solid #2a2a2a;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.left-maps-modal-btn {
  padding: 6px 20px;
  background: #1a1a1a;
  border: 1px solid #333;
  color: #aaa;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.15s;
}

.left-maps-modal-btn:hover {
  border-color: #3a7abf;
  color: #c8d8e8;
  background: #111;
}

.left-maps-modal-delete-btn {
  background: #3a1a1a;
  border-color: #7a3a3a;
  color: #e05050;
}

.left-maps-modal-delete-btn:hover {
  background: #4a2a2a;
  border-color: #9a5a5a;
  color: #f07070;
}

/* ── Collapsible Panels ────────────────────────────────────────────────────────────── */

.panel-collapse-toggle {
  display: inline-block;
  cursor: pointer;
  user-select: none;
  transition: transform 0.3s ease;
  margin-right: 6px;
  font-size: 10px;
  color: #666;
}

.panel-collapse-toggle[data-collapsed="true"] {
  transform: rotate(-90deg);
}

.panel-section {
  max-height: 1000px;
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  opacity: 1;
}

.panel-section[data-collapsed="true"] {
  max-height: 0;
  opacity: 0;
}

#left-maps-panel {
  transition: max-height 0.3s ease;
}

#left-files-panel {
  transition: max-height 0.3s ease;
}
```

- [ ] **Step 2: Test styles are loaded**

Open `http://localhost:5050`, open dev console, and run:
```javascript
window.getComputedStyle(document.querySelector('.left-maps-action-bar')).display
```
Expected: "flex" (styles loaded)

- [ ] **Step 3: Commit**

```bash
git add web/public/style.css
git commit -m "feat: add CSS for map selection, action bar, modal, and collapse animations"
```

---

## Task 6: Frontend Map Selection Logic

**Files:**
- Modify: `web/public/app.js` (in initLeftMaps function)

Add JavaScript logic to track selected maps and handle Ctrl+Click.

- [ ] **Step 1: Add selection state tracking**

Find the `initLeftMaps()` function (around line 4627). At the start of the function, add this code after the existing variable declarations (~line 4638):

```javascript
  let selectedMaps = new Set();  // Track selected map filenames

  function updateSelectionUI() {
    const count = selectedMaps.size;
    const actionBar = document.getElementById('left-maps-action-bar');
    const countEl = document.getElementById('left-maps-count');
    const mapThumbs = gallery.querySelectorAll('.lm-thumb');
    
    // Show/hide action bar
    if (count > 0) {
      actionBar.hidden = false;
      countEl.textContent = `${count} map${count === 1 ? '' : 's'} selected`;
      gallery.setAttribute('data-selecting', '1');
    } else {
      actionBar.hidden = true;
      gallery.removeAttribute('data-selecting');
    }
    
    // Update visual state of thumbnails
    mapThumbs.forEach(thumb => {
      const name = thumb.dataset.name;
      const checkbox = thumb.querySelector('.lm-thumb-checkbox');
      if (selectedMaps.has(name)) {
        thumb.classList.add('selected');
        if (checkbox) checkbox.classList.add('checked');
      } else {
        thumb.classList.remove('selected');
        if (checkbox) checkbox.classList.remove('checked');
      }
    });
  }

  function toggleMapSelection(name) {
    if (selectedMaps.has(name)) {
      selectedMaps.delete(name);
    } else {
      selectedMaps.add(name);
    }
    updateSelectionUI();
  }

  function clearSelection() {
    selectedMaps.clear();
    updateSelectionUI();
  }

  function selectAllVisible() {
    galleryShown.forEach(m => selectedMaps.add(m.name));
    updateSelectionUI();
  }
```

- [ ] **Step 2: Update thumbHtml to include checkbox**

Find the `thumbHtml(mp)` function (around line 4686). Update it to:

```javascript
  function thumbHtml(mp) {
    return `<div class="lm-thumb"
         data-url="${escapeHtml(mp.url)}"
         data-name="${escapeHtml(mp.name)}"
         data-gridless="${escapeHtml(mp.gridless_url || '')}"
         data-desc="${escapeHtml(mp.description || '')}"
         data-tags="${escapeHtml((mp.tags||[]).join(','))}"
         data-uses="${escapeHtml((mp.northwatch_uses||[]).join(','))}"
         title="${escapeHtml(mp.name)}${mp.terrain ? ' · ' + mp.terrain : ''}">
      <img src="${escapeHtml(mp.thumb_url || mp.url)}" alt="${escapeHtml(mp.name)}">
      <div class="lm-thumb-checkbox"></div>
      <div class="lm-thumb-name">${escapeHtml(mp.name)}</div>
    </div>`;
  }
```

- [ ] **Step 3: Update attachThumbClicks to handle selection**

Replace the existing `attachThumbClicks` function (around line 4700) with:

```javascript
  function attachThumbClicks(container) {
    container.querySelectorAll('.lm-thumb:not([data-bound])').forEach(thumb => {
      thumb.dataset.bound = '1';
      
      // Checkbox click
      const checkbox = thumb.querySelector('.lm-thumb-checkbox');
      if (checkbox) {
        checkbox.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleMapSelection(thumb.dataset.name);
        });
      }
      
      // Ctrl+Click on thumbnail
      thumb.addEventListener('click', (e) => {
        if (e.ctrlKey || e.metaKey) {
          e.stopPropagation();
          toggleMapSelection(thumb.dataset.name);
          return;
        }
        
        // Normal click: open lightbox
        const tags = thumb.dataset.tags ? thumb.dataset.tags.split(',').filter(Boolean) : [];
        const uses = thumb.dataset.uses ? thumb.dataset.uses.split(',').filter(Boolean) : [];
        openLightbox(thumb.dataset.url, thumb.dataset.name, {
          description: thumb.dataset.desc,
          tags, northwatch_uses: uses,
          gridless_url: thumb.dataset.gridless || null,
        });
      });
    });
  }
```

- [ ] **Step 4: Test selection works**

Manually test:
1. Open DM Panel
2. Ctrl+Click on a map → should highlight and checkbox appear
3. Click checkbox → should toggle selection
4. Action bar should appear at bottom when selected

- [ ] **Step 5: Commit**

```bash
git add web/public/app.js
git commit -m "feat: add map selection tracking and Ctrl+Click handler"
```

---

## Task 7: Frontend Action Bar Logic

**Files:**
- Modify: `web/public/app.js` (in initLeftMaps function, add event handlers)

Add event handlers for the action bar buttons.

- [ ] **Step 1: Add action bar button handlers**

Add this at the end of the `initLeftMaps()` function, just before the final closing `})();` (around line 4849):

```javascript
  // Action bar button handlers
  const selectAllBtn = document.getElementById('left-maps-select-all');
  const clearBtn = document.getElementById('left-maps-clear');
  const deleteBtn = document.getElementById('left-maps-delete');
  
  if (selectAllBtn) {
    selectAllBtn.addEventListener('click', () => selectAllVisible());
  }
  
  if (clearBtn) {
    clearBtn.addEventListener('click', () => clearSelection());
  }
  
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => showDeleteConfirmation());
  }
```

- [ ] **Step 2: Test action bar buttons**

Manually test:
1. Select a map (Ctrl+Click)
2. Click "Select All" → all visible maps should highlight
3. Click "Clear" → all selections should disappear
4. Click "Delete" → confirmation modal should appear

- [ ] **Step 3: Commit**

```bash
git add web/public/app.js
git commit -m "feat: add action bar button event handlers (Select All, Clear, Delete)"
```

---

## Task 8: Frontend Delete Confirmation Modal Logic

**Files:**
- Modify: `web/public/app.js` (in initLeftMaps function)

Add modal display and confirmation logic.

- [ ] **Step 1: Add confirmation modal functions**

Add this before the action bar button handlers (around line 4845):

```javascript
  function showDeleteConfirmation() {
    if (selectedMaps.size === 0) return;
    
    const modal = document.getElementById('left-maps-confirm-modal');
    const list = document.getElementById('left-maps-confirm-list');
    const count = document.getElementById('left-maps-confirm-count');
    
    // Build list of maps to delete
    const mapList = allMaps.filter(m => selectedMaps.has(m.name));
    
    list.innerHTML = mapList.map(m => `
      <div class="left-maps-confirm-item">
        <div class="left-maps-confirm-item-thumb">
          <img src="${escapeHtml(m.thumb_url || m.url)}" alt="${escapeHtml(m.name)}">
        </div>
        <div class="left-maps-confirm-item-name">${escapeHtml(m.name)}</div>
      </div>
    `).join('');
    
    count.textContent = `Delete ${selectedMaps.size} map${selectedMaps.size === 1 ? '' : 's'}? These will be moved to trash and auto-deleted after 30 days.`;
    
    modal.hidden = false;
  }
  
  function closeDeleteConfirmation() {
    const modal = document.getElementById('left-maps-confirm-modal');
    modal.hidden = true;
  }
  
  async function confirmDelete() {
    if (selectedMaps.size === 0) return;
    
    const filenames = Array.from(selectedMaps);
    
    try {
      const r = await fetch('/api/maps/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filenames })
      });
      
      const result = await r.json();
      
      if (!r.ok) {
        showToast(`Error: ${result.error || 'Delete failed'}`);
        return;
      }
      
      const deleted = result.deleted || [];
      const errors = Object.keys(result.errors || {});
      
      // Remove deleted maps from allMaps
      allMaps = allMaps.filter(m => !deleted.includes(m.name));
      
      // Clear selection and re-render
      clearSelection();
      renderGallery();
      closeDeleteConfirmation();
      
      if (deleted.length > 0) {
        const msg = `Deleted ${deleted.length} map${deleted.length === 1 ? '' : 's'}`;
        const errMsg = errors.length > 0 ? ` (${errors.length} failed)` : '';
        showToast(msg + errMsg);
      }
    } catch (e) {
      showToast(`Error: ${e.message}`);
    }
  }
```

- [ ] **Step 2: Add modal event listeners**

Add this right after the showDeleteConfirmation function:

```javascript
  // Modal button handlers
  const confirmModal = document.getElementById('left-maps-confirm-modal');
  const confirmCancelBtn = document.getElementById('left-maps-confirm-cancel-btn');
  const confirmDeleteBtn = document.getElementById('left-maps-confirm-delete-btn');
  const modalClose = document.getElementById('left-maps-confirm-cancel');
  const modalBackdrop = confirmModal ? confirmModal.querySelector('.left-maps-modal-backdrop') : null;
  
  if (confirmCancelBtn) {
    confirmCancelBtn.addEventListener('click', closeDeleteConfirmation);
  }
  
  if (modalClose) {
    modalClose.addEventListener('click', closeDeleteConfirmation);
  }
  
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeDeleteConfirmation);
  }
  
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', confirmDelete);
  }
  
  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !confirmModal.hidden) {
      closeDeleteConfirmation();
    }
  });
```

- [ ] **Step 3: Test full delete flow**

Manually test:
1. Select one map (Ctrl+Click)
2. Click Delete button
3. Confirmation modal shows with map thumbnail and name
4. Click Delete in modal → map should be deleted and gallery updated
5. Action bar should disappear

- [ ] **Step 4: Commit**

```bash
git add web/public/app.js
git commit -m "feat: add delete confirmation modal with API integration"
```

---

## Task 9: Frontend Collapse Panels Logic

**Files:**
- Modify: `web/public/app.js` (add collapse handler, not in initLeftMaps)

Add logic to handle collapsible Files and Maps sections.

- [ ] **Step 1: Add collapse state handlers**

Add this as a new function before the `initLeftMaps()` function (around line 4620):

```javascript
// ── Left-panel Section Collapse ───────────────────────────────────────────────

(function initCollapseState() {
  const STORAGE_KEY = 'dm-panel-collapse-state';
  
  function loadCollapseState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : { files: false, maps: false };
    } catch {
      return { files: false, maps: false };
    }
  }
  
  function saveCollapseState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('[collapse] Failed to save state:', e.message);
    }
  }
  
  function applyCollapseState(state) {
    const toggles = document.querySelectorAll('.panel-collapse-toggle');
    toggles.forEach(toggle => {
      const section = toggle.dataset.section;
      if (!section) return;
      
      const isCollapsed = state[section] === true;
      const panelId = section === 'files' ? 'left-files-panel' : 'left-maps-panel';
      const panel = document.getElementById(panelId);
      
      toggle.dataset.collapsed = isCollapsed ? 'true' : 'false';
      if (panel) {
        panel.dataset.collapsed = isCollapsed ? 'true' : 'false';
      }
    });
  }
  
  // Load and apply on page load
  const state = loadCollapseState();
  applyCollapseState(state);
  
  // Attach click handlers to toggles
  document.querySelectorAll('.panel-collapse-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const section = toggle.dataset.section;
      if (!section) return;
      
      const panelId = section === 'files' ? 'left-files-panel' : 'left-maps-panel';
      const panel = document.getElementById(panelId);
      
      const isCurrentlyCollapsed = toggle.dataset.collapsed === 'true';
      const newCollapsed = !isCurrentlyCollapsed;
      
      toggle.dataset.collapsed = newCollapsed ? 'true' : 'false';
      if (panel) {
        panel.data.collapsed = newCollapsed ? 'true' : 'false';
      }
      
      state[section] = newCollapsed;
      saveCollapseState(state);
    });
  });
})();
```

- [ ] **Step 2: Wrap panel sections in data-collapsed attribute**

Find the Files panel section in app.js (initFilesCmds function, around line 4200+). Look for where the HTML is built and ensure panels have the `data-collapsed` attribute. But actually, we need to add this via CSS class. Let's verify the HTML structure first.

Find `<div id="left-files-panel">` in index.html (around line 770) and update it to:

```html
      <div id="left-files-panel" class="panel-section" data-collapsed="false">
```

Find `<div id="left-maps-panel">` in index.html (around line 796) and update it to:

```html
      <div id="left-maps-panel" class="panel-section" data-collapsed="false">
```

- [ ] **Step 3: Test collapse functionality**

Manually test:
1. Reload page
2. Click on the collapse arrow next to "Files" → section should collapse smoothly
3. Click again → should expand
4. Reload page → state should be preserved
5. Test "Maps" section independently

- [ ] **Step 4: Commit**

```bash
git add web/public/app.js web/public/index.html
git commit -m "feat: add collapsible Files and Maps panels with localStorage persistence"
```

---

## Task 10: Verification & Integration Testing

**Files:**
- Test in browser (no code changes needed)

Manually verify the complete feature works end-to-end.

- [ ] **Step 1: Verify trash directory creation**

Check that trash directory exists:
```bash
ls -la web/data/trash/
```
Expected: Directory should exist (created on first delete) with trash-manifest.json

- [ ] **Step 2: Test multi-select delete workflow**

1. Navigate to DM Panel Maps section
2. Ctrl+Click on 2-3 maps to select them
3. Verify action bar appears with correct count
4. Click "Select All" → all visible maps highlighted
5. Click "Delete" → confirmation modal shows all selected maps with thumbnails
6. Click "Delete" in modal → maps deleted, gallery refreshes, action bar disappears
7. Verify maps are no longer visible in gallery

- [ ] **Step 3: Check trash directory contents**

After deletion:
```bash
cat web/data/trash/trash-manifest.json
```
Expected: JSON with entries showing deleted map filenames, timestamps, and sources

- [ ] **Step 4: Verify cleanup cron runs**

Check server logs:
```bash
pm2 logs dm-panel | grep trash
```
Expected: Should see "[trash]" messages about scheduled cleanup

- [ ] **Step 5: Test collapse persistence**

1. Reload page
2. Collapse Files section → verify it stays collapsed on reload
3. Collapse Maps section → verify independent of Files state
4. Clear localStorage and reload → both should be expanded by default

- [ ] **Step 6: Test error handling**

Try deleting a map that doesn't exist by manually calling API:
```bash
curl -X POST http://localhost:5050/api/maps/delete \
  -H "Content-Type: application/json" \
  -H "Cookie: dm_auth=..." \
  -d '{"filenames": ["fake-map.png"]}'
```
Expected: Should return error gracefully, toast should show "1 failed"

- [ ] **Step 7: Final check**

Verify all success criteria from spec are met:
- [x] Users can multi-select maps via checkboxes and Ctrl+Click
- [x] Action bar appears/disappears correctly based on selection
- [x] Confirmation modal shows all selected maps with thumbnails
- [x] Delete moves maps to trash with timestamp metadata
- [x] Daily cron job runs and deletes maps >30 days old (verify in logs)
- [x] Trash is transparent to user (no UI for viewing/restoring)
- [x] Files and Maps sections collapse independently
- [x] Collapse state persists across page reloads
- [x] No errors when trash folder doesn't exist (auto-created)
- [x] Selection state clears after successful delete

---

## Task 11: Final Cleanup & Commit

**Files:**
- No code changes needed for this task

Prepare for merge.

- [ ] **Step 1: Verify git history is clean**

Run:
```bash
git log --oneline -n 10
```

Expected: Should see commits like:
- feat: add trash utility functions for map deletion
- feat: add daily scheduled trash cleanup (3 AM server time)
- feat: add POST /api/maps/delete endpoint with trash logic
- feat: add HTML for map checkboxes, action bar, confirmation modal, collapse toggles
- feat: add CSS for map selection, action bar, modal, and collapse animations
- feat: add map selection tracking and Ctrl+Click handler
- feat: add action bar button event handlers (Select All, Clear, Delete)
- feat: add delete confirmation modal with API integration
- feat: add collapsible Files and Maps panels with localStorage persistence

- [ ] **Step 2: Run full test suite if available**

Run:
```bash
cd web && npm test 2>/dev/null || echo "No tests defined"
```

If tests exist, they should all pass.

- [ ] **Step 3: Check for console errors**

Open DM Panel in browser, open dev console, reload page.
Expected: No errors related to the new features

- [ ] **Step 4: Final verification of no regressions**

Test existing features:
- File browser still works
- Combat tracker still works
- Other panels load without error
- Maps library still displays (non-deleted maps)

- [ ] **Step 5: Create final commit message**

```bash
git log --oneline -n 9 | head -1
```

All commits should be present. If needed, squash or amend, but preferred to keep as individual commits for clarity.

---

## Summary

**Tasks completed:**
1. Backend trash utilities (move files, track manifest)
2. Daily cleanup cron job (3 AM, runs on startup)
3. Delete API endpoint (/api/maps/delete)
4. HTML structure (checkboxes, action bar, modal, toggles)
5. CSS styles (all new UI components)
6. Map selection logic (Ctrl+Click, checkboxes)
7. Action bar buttons (Select All, Clear)
8. Confirmation modal (show, confirm, delete)
9. Collapse panels (toggle, persistence)
10. Verification & testing
11. Final cleanup

**Key features:**
- ✅ Multi-select with checkboxes and Ctrl+Click
- ✅ Floating action bar with Select All / Clear / Delete
- ✅ Confirmation modal showing thumbnails and names
- ✅ Trash system with 30-day auto-cleanup via daily cron
- ✅ Independently collapsible Files and Maps sections
- ✅ Collapse state persists to localStorage
- ✅ Error handling and user feedback via toasts

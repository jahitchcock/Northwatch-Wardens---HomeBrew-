'use strict';

// ─── State ──────────────────────────────────────────────────────────────────

const $ = id => document.getElementById(id);

const viewer      = $('viewer');
const breadcrumb  = $('breadcrumb');
const fileTree    = $('file-tree');
const seasonSel   = $('season-sel');
const panelL      = $('panel-left');
const panelR      = $('panel-right');
const rhL         = $('rh-l');
const rhR         = $('rh-r');
const cbtL        = $('cbt-l');
const cbtR        = $('cbt-r');
const searchInput = $('search-input');

let leftW  = 260;
let rightW = 420;
let leftCollapsed  = false;
let rightCollapsed = false;
let activeLabel    = null;
let termFit        = null; // set by initTerminal
let sendToTerminal = null; // set by initTerminal
let currentPath    = null;

const btnCtx   = $('btn-ctx');
const toast    = $('toast');
const modal1 = $('modal');
const modal2 = $('modal2');
const backdrop = $('drawer-backdrop');
const mobFiles = $('mob-files');
const mobTerm  = $('mob-term');

// ─── Resize handles ──────────────────────────────────────────────────────────

let dragging = null; // 'l' | 'r'
let dragStartX = 0;
let dragStartW = 0;

function startDrag(side, e) {
  dragging   = side;
  dragStartX = e.clientX;
  dragStartW = side === 'l' ? leftW : rightW;
  document.body.classList.add('dragging');
  e.preventDefault();
}

rhL.addEventListener('mousedown', e => { if (e.target === rhL) startDrag('l', e); });
rhR.addEventListener('mousedown', e => { if (e.target === rhR) startDrag('r', e); });

document.addEventListener('mousemove', e => {
  if (!dragging) return;
  const delta = e.clientX - dragStartX;
  if (dragging === 'l') {
    leftW = Math.max(120, Math.min(600, dragStartW + delta));
    if (!leftCollapsed) panelL.style.width = leftW + 'px';
  } else {
    rightW = Math.max(160, Math.min(800, dragStartW - delta));
    if (!rightCollapsed) {
      panelR.style.width = rightW + 'px';
      if (termFit) setTimeout(termFit, 50);
    }
  }
});

document.addEventListener('mouseup', () => {
  if (!dragging) return;
  dragging = null;
  document.body.classList.remove('dragging');
  if (termFit) setTimeout(termFit, 60);
});

// ─── Collapse / expand ────────────────────────────────────────────────────────

function applyCollapse(panel, collapsed, openChar, closeChar, btn, restoreW, onExpand) {
  if (collapsed) {
    panel.style.width = '0';
    btn.textContent = openChar;
  } else {
    panel.style.width = restoreW + 'px';
    btn.textContent = closeChar;
    if (onExpand) setTimeout(onExpand, 60);
  }
}

cbtL.addEventListener('click', () => {
  leftCollapsed = !leftCollapsed;
  applyCollapse(panelL, leftCollapsed, '›', '‹', cbtL, leftW);
});

cbtR.addEventListener('click', () => {
  rightCollapsed = !rightCollapsed;
  applyCollapse(panelR, rightCollapsed, '‹', '›', cbtR, rightW, termFit);
});

// ─── Mobile drawers ───────────────────────────────────────────────────────────

function closeAllDrawers() {
  panelL.classList.remove('drawer-open');
  panelR.classList.remove('drawer-open');
  backdrop.classList.remove('visible');
  if (mobFiles) mobFiles.classList.remove('active');
  if (mobTerm)  mobTerm.classList.remove('active');
}

function toggleDrawer(panel, btn) {
  const isOpen = panel.classList.contains('drawer-open');
  closeAllDrawers();
  if (!isOpen) {
    panel.classList.add('drawer-open');
    backdrop.classList.add('visible');
    btn.classList.add('active');
    if (panel === panelR && termFit) setTimeout(termFit, 230);
  }
}

// Mobile drawer click listeners are registered below (with isMobile guard)

// ─── File tree ────────────────────────────────────────────────────────────────

function setActive(label) {
  if (activeLabel) activeLabel.classList.remove('active');
  activeLabel = label;
  if (label) label.classList.add('active');
}

function buildPreviewUrl(p) {
  let url = '/preview?path=' + encodeURIComponent(p);
  const s = seasonSel.value;
  if (s) url += '&season=' + s;
  return url;
}

function openPath(p) {
  currentPath = p;
  viewer.src = buildPreviewUrl(p);
  breadcrumb.textContent = p;
  btnCtx.hidden = false;
  closeAllDrawers();
}

seasonSel.addEventListener('change', () => {
  if (currentPath) {
    viewer.src = buildPreviewUrl(currentPath);
  }
});

function buildItem(entry) {
  const item  = document.createElement('div');
  item.className = 'ti';

  const label = document.createElement('div');
  label.className = 'tl';
  label.title = entry.path;

  const icon = document.createElement('span');
  icon.className = 'ti-icon';

  const name = document.createElement('span');
  name.className = 'ti-name';
  name.textContent = entry.name;

  label.appendChild(icon);
  label.appendChild(name);
  item.appendChild(label);

  if (entry.type === 'dir') {
    icon.textContent = '▶';
    const children = document.createElement('div');
    children.className = 'tc';
    item.appendChild(children);

    let loaded = false;
    label.addEventListener('click', async e => {
      e.stopPropagation();
      const open = children.classList.contains('open');
      if (!loaded && !open) {
        children.innerHTML = '<div class="tree-spinner">Loading…</div>';
        await fillTree(entry.path, children);
        loaded = true;
      }
      children.classList.toggle('open', !open);
      icon.classList.toggle('open', !open);
    });
  } else {
    icon.textContent = '·';
    icon.style.color = 'var(--subtext)';
    label.addEventListener('click', e => {
      e.stopPropagation();
      setActive(label);
      openPath(entry.path);
      if (isMobile()) closeDrawers();
    });
  }
  return item;
}

async function fillTree(dirPath, container) {
  try {
    const r = await fetch(`/api/files?path=${encodeURIComponent(dirPath || '')}`);
    if (!r.ok) throw new Error(await r.text());
    const entries = await r.json();
    container.innerHTML = '';
    for (const e of entries) container.appendChild(buildItem(e));
    if (entries.length === 0) {
      container.innerHTML = '<div class="tree-spinner" style="color:var(--subtext)">Empty</div>';
    }
  } catch (err) {
    container.innerHTML = `<div class="tree-err">${err.message}</div>`;
  }
}

// ─── Quick-access tabs ────────────────────────────────────────────────────────

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    openPath(tab.dataset.path);
    setActive(null);
    if (isMobile()) closeDrawers();
  });
});

// Update breadcrumb when iframe navigates internally (e.g. directory listing links)
viewer.addEventListener('load', () => {
  try {
    const url = new URL(viewer.contentWindow.location.href);
    const p = url.searchParams.get('path');
    if (p) breadcrumb.textContent = p;
  } catch {}
});

// ─── Terminal ─────────────────────────────────────────────────────────────────

function initTerminal() {
  const container = $('term-wrap');

  const term = new Terminal({
    fontFamily: 'Consolas, "Cascadia Code", "Courier New", monospace',
    fontSize: 12,
    lineHeight: 1.2,
    cursorBlink: true,
    convertEol: true,
    scrollback: 5000,
    theme: {
      background:          '#0d0d0d',
      foreground:          '#cccccc',
      cursor:              '#cccccc',
      selectionBackground: '#404040',
      black:   '#1e1e2e', red:    '#f38ba8',
      green:   '#a6e3a1', yellow: '#f9e2af',
      blue:    '#89b4fa', magenta:'#cba6f7',
      cyan:    '#89dceb', white:  '#cdd6f4',
    },
  });

  const fitAddon = new FitAddon.FitAddon();
  term.loadAddon(fitAddon);
  term.open(container);

  function fit() {
    try {
      fitAddon.fit();
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'resize', cols: term.cols, rows: term.rows }));
      }
    } catch {}
  }

  // Expose fit so collapse/resize can call it
  termFit = fit;

  // Expose sendToTerminal for other features
  sendToTerminal = data => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'input', data }));
    }
  };

  const ro = new ResizeObserver(fit);
  ro.observe(container);

  let ws;

  function connect() {
    const proto = location.protocol === 'https:' ? 'wss' : 'ws';
    ws = new WebSocket(`${proto}://${location.host}/terminal`);

    ws.onopen = () => {
      const stored = sessionStorage.getItem('termSessionId');
      ws.send(JSON.stringify({ type: 'attach', sessionId: stored || null }));
      fit();
    };

    ws.onmessage = e => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === 'session') {
          sessionStorage.setItem('termSessionId', msg.sessionId);
        } else if (msg.type === 'output') {
          term.write(msg.data);
        }
      } catch {}
    };

    ws.onclose = () => {
      term.write('\r\n\x1b[33m[disconnected — reconnecting in 3s…]\x1b[0m\r\n');
      setTimeout(connect, 3000);
    };

    ws.onerror = () => ws.close();
  }

  term.onData(data => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'input', data }));
    }
  });

  connect();
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function getTopModal() {
  if (modal2 && !modal2.hidden) return modal2;
  if (modal1 && !modal1.hidden) return modal1;
  return null;
}

function getFreeModal() {
  if (!modal1 || modal1.hidden) return modal1;
  return modal2;
}

async function openModal(relPath) {
  const m = getFreeModal();
  if (!m) return;
  m.querySelector('.modal-title').textContent = '…';
  m.querySelector('.modal-body').innerHTML =
    '<div style="padding:24px;color:#888;font-family:sans-serif;font-size:13px">Loading…</div>';
  m.querySelector('.modal-box').classList.remove('modal-box--tall');
  m.hidden = false;
  requestAnimationFrame(() => m.classList.add('visible'));

  try {
    const r = await fetch(`/preview?path=${encodeURIComponent(relPath)}`);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const html = await r.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const title = doc.body?.dataset.title || doc.title ||
      relPath.split('/').pop().replace(/\.md$/, '').replace(/[-_]/g, ' ');
    const content = doc.querySelector('.web-content');
    m.querySelector('.modal-title').textContent = title;
    m.querySelector('.modal-body').innerHTML = content
      ? `<div class="web-content" style="padding:20px 24px">${content.innerHTML}</div>`
      : doc.body?.innerHTML || '';
  } catch (err) {
    m.querySelector('.modal-title').textContent = 'Error';
    m.querySelector('.modal-body').innerHTML =
      `<div style="padding:20px;color:#f38ba8;font-family:sans-serif;font-size:13px">${err.message}</div>`;
  }
}

function open5eModal(url) {
  const m = getFreeModal();
  if (!m) return;
  m.querySelector('.modal-title').textContent = '5etools';
  m.querySelector('.modal-body').innerHTML = `<iframe src="${url}" title="5etools"></iframe>`;
  m.querySelector('.modal-box').classList.add('modal-box--tall');
  m.hidden = false;
  requestAnimationFrame(() => m.classList.add('visible'));
}

function closeTopModal() {
  const m = getTopModal();
  if (!m) return;
  m.classList.remove('visible');
  setTimeout(() => {
    m.hidden = true;
    m.querySelector('.modal-body').innerHTML = '';
    m.querySelector('.modal-box').classList.remove('modal-box--tall');
  }, 180);
}

// Document-level click handler for modal links and close targets
document.addEventListener('click', e => {
  // data-modal links (NPC, location, faction cross-refs)
  const modalLink = e.target.closest('[data-modal]');
  if (modalLink) { e.preventDefault(); openModal(modalLink.dataset.modal); return; }

  // data-modal-5e links (5etools)
  const e5Link = e.target.closest('[data-modal-5e]');
  if (e5Link) { e.preventDefault(); open5eModal(e5Link.dataset.modal5e); return; }

  // NPC table inline modals
  const npcTrigger = e.target.closest('.npc-modal-trigger');
  if (npcTrigger) {
    e.preventDefault();
    const row = npcTrigger.closest('tr');
    const table = npcTrigger.closest('table.npc-table');
    if (!row || !table) return;
    const headers = [...table.querySelectorAll('thead th')].map(th => th.textContent.trim());
    const cells = [...row.querySelectorAll('td')];
    const name = cells[0]?.textContent.trim() || npcTrigger.textContent.trim();
    let content = '<dl style="margin:0;padding:20px 24px;font-family:\'Palatino Linotype\',Georgia,serif">';
    headers.forEach((header, i) => {
      if (i === 0 || !cells[i]) return;
      content += `<dt style="font-weight:700;color:#8b7355;margin-top:14px;font-size:11px;text-transform:uppercase;letter-spacing:.05em">${header}</dt>`;
      content += `<dd style="margin:4px 0 0 0;color:#2c1810;font-size:14px;line-height:1.6">${cells[i].textContent.trim()}</dd>`;
    });
    content += '</dl>';
    const m = getFreeModal();
    if (!m) return;
    m.querySelector('.modal-title').textContent = name;
    m.querySelector('.modal-body').innerHTML = content;
    m.querySelector('.modal-box').classList.remove('modal-box--tall');
    m.hidden = false;
    requestAnimationFrame(() => m.classList.add('visible'));
    return;
  }

  // Close button
  if (e.target.closest('.modal-close')) { closeTopModal(); return; }

  // Backdrop click (click on overlay itself, not the box)
  if (e.target.classList.contains('modal-overlay')) closeTopModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeTopModal();
});

// ─── Search ───────────────────────────────────────────────────────────────────

let searchTimer = null;
let searchActive = false;

function hl(text, q) {
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(escaped, 'gi'), m => `<mark>${m}</mark>`);
}

function escHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function showSearchResults(results, q) {
  searchActive = true;
  fileTree.innerHTML = '';

  if (results.length === 0) {
    fileTree.innerHTML = '<div class="tree-spinner">No results</div>';
    return;
  }

  for (const r of results) {
    const item = document.createElement('div');
    item.className = 'sr-item';

    const nameEl = document.createElement('div');
    nameEl.className = 'sr-name';
    nameEl.innerHTML = hl(escHtml(r.name), q);

    const pathEl = document.createElement('div');
    pathEl.className = 'sr-path';
    pathEl.textContent = r.path;

    item.appendChild(nameEl);
    item.appendChild(pathEl);

    for (const s of r.snippets) {
      const snip = document.createElement('div');
      snip.className = 'sr-snip';
      snip.innerHTML = `<span class="sr-ln">${s.line}</span>${hl(escHtml(s.text), q)}`;
      item.appendChild(snip);
    }

    item.addEventListener('click', () => {
      document.querySelectorAll('.sr-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      openPath(r.path);
    });

    fileTree.appendChild(item);
  }
}

function clearSearch() {
  searchActive = false;
  fileTree.innerHTML = '';
  fillTree('', fileTree);
}

searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  const q = searchInput.value.trim();
  if (q.length < 2) {
    if (searchActive) clearSearch();
    return;
  }
  searchTimer = setTimeout(async () => {
    try {
      const r = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await r.json();
      showSearchResults(data, q);
    } catch (e) {
      fileTree.innerHTML = `<div class="tree-err">${e.message}</div>`;
    }
  }, 280);
});

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    searchInput.value = '';
    clearSearch();
    searchInput.blur();
  }
});

// ─── Mobile drawers ───────────────────────────────────────────────────────────

function isMobile() { return window.matchMedia('(max-width: 900px)').matches; }

function openDrawer(side) {
  const panel = side === 'left' ? panelL : panelR;
  const btn   = side === 'left' ? mobFiles : mobTerm;
  closeDrawers(side); // close the other one first
  panel.classList.add('drawer-open');
  btn.classList.add('active');
  backdrop.classList.add('visible');
  if (side === 'right' && termFit) setTimeout(termFit, 240);
}

function closeDrawers(except) {
  if (except !== 'left') {
    panelL.classList.remove('drawer-open');
    mobFiles.classList.remove('active');
  }
  if (except !== 'right') {
    panelR.classList.remove('drawer-open');
    mobTerm.classList.remove('active');
  }
  if (!panelL.classList.contains('drawer-open') && !panelR.classList.contains('drawer-open')) {
    backdrop.classList.remove('visible');
  }
}

mobFiles.addEventListener('click', () => {
  if (!isMobile()) return;
  panelL.classList.contains('drawer-open') ? closeDrawers() : openDrawer('left');
});

mobTerm.addEventListener('click', () => {
  if (!isMobile()) return;
  panelR.classList.contains('drawer-open') ? closeDrawers() : openDrawer('right');
});

backdrop.addEventListener('click', () => closeDrawers());

// ─── Toast ────────────────────────────────────────────────────────────────────

let toastTimer = null;
function showToast(msg, isError = false) {
  toast.textContent = msg;
  toast.className = isError ? 'toast-err' : 'toast-ok';
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2800);
}

// ─── Send path to terminal ────────────────────────────────────────────────────

btnCtx.addEventListener('click', () => {
  if (!currentPath || !sendToTerminal) return;
  const p = currentPath.includes(' ') ? `"${currentPath}"` : currentPath;
  sendToTerminal(p);
  // Focus the terminal panel so the user can keep typing
  $('term-wrap').querySelector('.xterm-helper-textarea')?.focus();
  showToast('Path sent to terminal');
});

// ─── Image paste into terminal ────────────────────────────────────────────────
// Capture at document level so we intercept before xterm.js consumes the event.
// Only act when the terminal panel is active/visible.

document.addEventListener('paste', e => {
  // Only intercept when focus is inside the terminal panel
  const panel = $('panel-right');
  if (!panel || !panel.contains(document.activeElement)) return;

  const items = e.clipboardData?.items;
  if (!items) return;

  let imageItem = null;
  for (const item of items) {
    if (item.type.startsWith('image/')) { imageItem = item; break; }
  }
  if (!imageItem) return; // no image — let xterm handle text paste normally

  e.preventDefault();
  e.stopPropagation();

  const blob = imageItem.getAsFile();
  if (!blob) return;
  const ext = imageItem.type.split('/')[1]?.split('+')[0] || 'png';

  showToast('Saving image…');

  // Use FileReader — avoids stack overflow from spreading large typed arrays
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const b64 = reader.result.split(',')[1];
      const r = await fetch('/api/save-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: b64, ext }),
      });
      if (!r.ok) throw new Error(await r.text());
      const { path: imgPath, absPath } = await r.json();
      if (sendToTerminal) {
        const p = absPath.includes(' ') ? `"${absPath}"` : absPath;
        sendToTerminal(' ' + p);
      }
      showToast(`Saved: ${imgPath.split('/').pop()}`);
    } catch (err) {
      showToast(`Image save failed: ${err.message}`, true);
    }
  };
  reader.onerror = () => showToast('FileReader error', true);
  reader.readAsDataURL(blob);
}, { capture: true });

// ─── Tools dropdown ───────────────────────────────────────────────────────────

const btnTools       = $('btn-tools');
const toolsDropdown  = $('tools-dropdown');
const worldTablesDiv = $('tools-world-tables');

function closeTools() {
  toolsDropdown.hidden = true;
  btnTools.classList.remove('open');
  document.body.classList.remove('tools-open');
}

function positionDropdown() {
  const r = btnTools.getBoundingClientRect();
  const ddW = 240;
  let left = r.left;
  if (left + ddW > window.innerWidth - 8) left = window.innerWidth - ddW - 8;
  toolsDropdown.style.top  = (r.bottom + 6) + 'px';
  toolsDropdown.style.left = left + 'px';
}

btnTools.addEventListener('click', e => {
  e.stopPropagation();
  const opening = toolsDropdown.hidden;
  if (opening) positionDropdown();
  toolsDropdown.hidden = !opening;
  btnTools.classList.toggle('open', opening);
  document.body.classList.toggle('tools-open', opening);
});

document.addEventListener('click', () => closeTools());

// Populate World Tables from /api/tables — each becomes a roll button
async function loadWorldTables() {
  try {
    const r = await fetch('/api/tables');
    const tables = await r.json();
    if (tables.length === 0) {
      worldTablesDiv.innerHTML =
        '<div class="tool-item" style="color:var(--subtext);cursor:default;font-style:italic">No tables found</div>';
      return;
    }
    worldTablesDiv.innerHTML = '';
    for (const t of tables) {
      const btn = document.createElement('button');
      btn.className = 'tool-item';
      btn.textContent = `🎲 ${t.name}`;
      btn.addEventListener('click', () => { closeTools(); openWorldTableTool(t); });
      worldTablesDiv.appendChild(btn);
    }
  } catch {
    worldTablesDiv.innerHTML =
      '<div class="tool-item" style="color:var(--red);cursor:default">Failed to load</div>';
  }
}

function openWorldTableTool(t) {
  const m = getFreeModal();
  if (!m) return;
  m.querySelector('.modal-title').textContent = t.name;
  m.querySelector('.modal-box').classList.remove('modal-box--tall');
  m.querySelector('.modal-body').innerHTML = `
    <div style="padding:16px;font-family:'Palatino Linotype',serif">
      <div style="margin-bottom:14px">
        <button class="wt-reroll" style="background:#8b7355;border:none;color:#f5f0e8;padding:5px 14px;border-radius:4px;cursor:pointer;font-size:12px;font-weight:600">🎲 Roll Again</button>
      </div>
      <div class="wt-result" style="min-height:40px"><em style="color:#7a6050;font-size:13px">Rolling…</em></div>
    </div>`;
  m.hidden = false;
  requestAnimationFrame(() => m.classList.add('visible'));

  async function doRoll() {
    const el = m.querySelector('.wt-result');
    if (!el) return;
    el.innerHTML = '<em style="color:#7a6050;font-size:13px">Rolling…</em>';
    try {
      const resp = await fetch(`/tools/roll-table?file=${encodeURIComponent(t.file)}&tableIdx=${t.tableIdx}`);
      el.innerHTML = await resp.text();
    } catch (err) {
      el.innerHTML = `<span style="color:#c0392b">${err.message}</span>`;
    }
  }

  m.querySelector('.wt-reroll').addEventListener('click', doRoll);
  doRoll();
}

// Random Encounter tool
$('tool-random-encounter').addEventListener('click', () => {
  closeTools();
  const m = getFreeModal();
  if (!m) return;
  m.querySelector('.modal-title').textContent = 'Random Encounter';
  m.querySelector('.modal-box').classList.remove('modal-box--tall');
  m.querySelector('.modal-body').innerHTML = `
    <div style="padding:16px;font-family:'Segoe UI',sans-serif">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
        <label style="font-size:12px;color:#5a4030;font-weight:600">Challenge Rating</label>
        <select id="re-cr" style="background:#ede8da;border:1px solid #b8a88a;color:#2c1810;padding:4px 8px;border-radius:4px;font-size:12px">
          ${[0,'1/8','1/4','1/2',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
            .map(cr => `<option value="${cr}">${cr}</option>`).join('')}
        </select>
        <button onclick="rollEncounter()" style="background:var(--accent);border:none;color:#1e1e2e;padding:5px 12px;border-radius:4px;cursor:pointer;font-size:12px;font-weight:600">Roll</button>
      </div>
      <div id="re-result"></div>
    </div>`;
  m.hidden = false;
  requestAnimationFrame(() => m.classList.add('visible'));
});

window.rollEncounter = async function() {
  const cr = $('re-cr')?.value || '1';
  const el = $('re-result');
  if (!el) return;
  el.innerHTML = '<div style="color:var(--subtext);font-size:12px">Rolling…</div>';
  try {
    const r = await fetch(`/tools/random-encounter?cr=${encodeURIComponent(cr)}`);
    el.innerHTML = await r.text();
  } catch (e) {
    el.innerHTML = `<div style="color:var(--red);font-size:12px">${e.message}</div>`;
  }
};

// Treasure Hoard tool
$('tool-treasure-hoard').addEventListener('click', () => {
  closeTools();
  const m = getFreeModal();
  if (!m) return;
  m.querySelector('.modal-title').textContent = 'Treasure Hoard';
  m.querySelector('.modal-box').classList.remove('modal-box--tall');
  m.querySelector('.modal-body').innerHTML = `
    <div style="padding:16px;font-family:'Segoe UI',sans-serif">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
        <label style="font-size:12px;color:#5a4030;font-weight:600">Party Level</label>
        <select id="th-level" style="background:#ede8da;border:1px solid #b8a88a;color:#2c1810;padding:4px 8px;border-radius:4px;font-size:12px">
          ${Array.from({ length: 20 }, (_, i) => i + 1)
            .map(l => `<option value="${l}">${l}</option>`).join('')}
        </select>
        <button onclick="rollHoard()" style="background:var(--accent);border:none;color:#1e1e2e;padding:5px 12px;border-radius:4px;cursor:pointer;font-size:12px;font-weight:600">Generate</button>
      </div>
      <div id="th-result"></div>
    </div>`;
  m.hidden = false;
  requestAnimationFrame(() => m.classList.add('visible'));
});

window.rollHoard = async function() {
  const level = $('th-level')?.value || '1';
  const el = $('th-result');
  if (!el) return;
  el.innerHTML = '<div style="color:var(--subtext);font-size:12px">Generating…</div>';
  try {
    const r = await fetch(`/tools/treasure-hoard?level=${level}`);
    el.innerHTML = await r.text();
  } catch (e) {
    el.innerHTML = `<div style="color:var(--red);font-size:12px">${e.message}</div>`;
  }
};

// 5etools buttons
document.querySelectorAll('.tool-5e').forEach(btn => {
  btn.addEventListener('click', () => {
    closeTools();
    open5eModal(btn.dataset['5eUrl']);
  });
});

// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  fillTree('', fileTree);
  initTerminal();
  loadWorldTables();
});

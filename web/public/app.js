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
const btnPrint = $('btn-print');
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

seasonSel.addEventListener('change', async () => {
  const s = seasonSel.value;
  await fillTree('', fileTree);

  // After tree is built, expand season-aware dirs so season filtering is visible
  if (s) {
    for (const item of fileTree.querySelectorAll('.ti')) {
      const nameTxt = item.querySelector('.ti-name')?.textContent.trim();
      if (!SEASON_TABS.has(nameTxt)) continue;
      const tc  = item.querySelector('.tc');
      const ico = item.querySelector('.ti-icon');
      const lbl = item.querySelector('.tl');
      if (!tc || !ico || !lbl) continue;
      tc.innerHTML = '<div class="tree-spinner">Loading…</div>';
      await fillTree(lbl.title, tc);
      tc._preloaded = true;
      tc.classList.add('open');
      ico.classList.add('open');
    }
  }

  // Refresh viewer — jump to season subdir if currently viewing a season-aware dir
  if (currentPath) {
    const base = currentPath.split('/')[0];
    if (SEASON_TABS.has(currentPath) || (SEASON_TABS.has(base) && /^season-\d+$/i.test(currentPath.split('/')[1] || ''))) {
      const newPath = s ? tabPath(base) : base;
      currentPath = newPath;
      viewer.src = buildPreviewUrl(newPath);
      breadcrumb.textContent = newPath;
    } else {
      viewer.src = buildPreviewUrl(currentPath);
    }
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
      if (!loaded && !children._preloaded && !open) {
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
    let url = `/api/files?path=${encodeURIComponent(dirPath || '')}`;
    const s = seasonSel.value;
    if (s) url += `&season=${s}`;
    const r = await fetch(url);
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

// Tabs that have season-N subdirectories
const SEASON_TABS = new Set(['adventures', 'npcs']);

function tabPath(base) {
  const s = seasonSel.value;
  if (s && SEASON_TABS.has(base)) return `${base}/season-${s}`;
  return base;
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.dataset.tab) return; // handled by dedicated tab listener (e.g. Tracker)
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    openPath(tabPath(tab.dataset.path));
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

  // Ctrl+V / Ctrl+Shift+V → paste from clipboard into terminal
  term.attachCustomKeyEventHandler(e => {
    if (e.type === 'keydown' && e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      navigator.clipboard.readText().then(text => {
        if (text && ws && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'input', data: text }));
        }
      }).catch(() => {});
      return false; // prevent xterm default handling
    }
    return true;
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
  if (!url) return;
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

// Expose modal functions for iframe bridge (web-rendered files use these via window.parent)
window.dmOpenModal = openModal;
window.dmOpen5eModal = open5eModal;
window.dmOpenModalRaw = (title, bodyHtml) => {
  const m = getFreeModal();
  if (!m) return;
  m.querySelector('.modal-title').textContent = title;
  m.querySelector('.modal-body').innerHTML = bodyHtml;
  m.querySelector('.modal-box').classList.remove('modal-box--tall');
  m.hidden = false;
  requestAnimationFrame(() => m.classList.add('visible'));
};

// Document-level click handler for modal links and close targets
document.addEventListener('click', e => {
  // data-modal links (NPC, location, faction cross-refs)
  const modalLink = e.target.closest('[data-modal]');
  if (modalLink) { e.preventDefault(); openModal(modalLink.dataset.modal); return; }

  // data-modal-5e links (5etools)
  const e5Link = e.target.closest('[data-modal-5e]');
  if (e5Link) { e.preventDefault(); open5eModal(e5Link.getAttribute('data-modal-5e')); return; }

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
    // Seasonal Calendar
    const calBtn = document.createElement('button');
    calBtn.className = 'tool-item';
    calBtn.textContent = '📅 Seasonal Calendar';
    calBtn.addEventListener('click', () => { closeTools(); openSeasonalCalendar(); });
    worldTablesDiv.appendChild(calBtn);
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

// ─── Combat Tracker ────────────────────────────────────────────────────────────

const CONDITIONS = ['Blinded','Charmed','Deafened','Frightened','Grappled',
  'Incapacitated','Invisible','Paralyzed','Petrified','Poisoned','Prone',
  'Restrained','Stunned','Unconscious','Exhaustion'];

let combatState = null; // { round, turnIndex, combatants: [] }
let ctAddPanelOpen = false;
let ctAddPanelTab = 'players'; // 'players' | 'npcs' | 'monsters' | 'manual'
let ctAddMonsterTab = 'adventure'; // 'adventure' | '5etools'
let ctAddAdventurePath = ''; // selected adventure file path
let ctAddSearchQuery = ''; // 5etools search query

function initCombatState() {
  combatState = { round: 1, turnIndex: 0, combatants: [] };
}

function ctUid() { return Math.random().toString(36).slice(2, 9); }

$('tab-combat-tracker').addEventListener('click', () => {
  if (!combatState) initCombatState();
  openCombatTracker();
});

function openCombatTracker() {
  const m = getFreeModal();
  if (!m) return;
  m.querySelector('.modal-title').textContent = 'Combat Tracker';
  m.querySelector('.modal-box').classList.remove('modal-box--tall');
  m.querySelector('.modal-box').classList.add('modal-box--tall');
  m.hidden = false;
  requestAnimationFrame(() => m.classList.add('visible'));
  renderCombatTracker(m);
}

function renderCombatTracker(m, view = 'combat') {
  const s = combatState;

  if (view === 'load') {
    m.querySelector('.modal-body').innerHTML = `
      <div class="ct-wrap">
        <div class="ct-header">
          <span style="color:#888;font-size:13px">Saved Encounters</span>
          <button class="ct-reset-btn" id="ct-back" style="margin-left:auto">← Back</button>
        </div>
        <div class="ct-list" id="ct-enc-list-wrap"></div>
      </div>`;
    m.querySelector('#ct-back').addEventListener('click', () => renderCombatTracker(m));
    renderEncounterList(m);
    return;
  }

  const sorted = [...s.combatants].sort((a, b) => b.initiative - a.initiative);
  const activeCombatant = sorted[s.turnIndex % Math.max(sorted.length, 1)];

  m.querySelector('.modal-body').innerHTML = `
    <div class="ct-wrap">
      <div class="ct-header">
        <div class="ct-round">Round <strong>${s.round}</strong></div>
        <button class="ct-next-btn" id="ct-next">Next Turn ▶</button>
        <div style="margin-left:auto;display:flex;gap:6px;align-items:center">
          <button class="ct-load-btn" id="ct-load">Load</button>
          <button class="ct-save-btn" id="ct-save">Save</button>
          <button class="ct-reset-btn" id="ct-reset">Reset</button>
          <button class="ct-add-toggle-btn${ctAddPanelOpen ? ' open' : ''}" id="ct-add-toggle">${ctAddPanelOpen ? '✕ Close' : '+ Add'}</button>
        </div>
      </div>
      <div class="ct-save-bar" id="ct-save-bar" hidden></div>
      <div class="ct-list" id="ct-list"></div>
      <div class="ct-add-panel" id="ct-add-panel"${ctAddPanelOpen ? '' : ' hidden'}>
        <div class="ct-add-tabs" id="ct-add-tabs">
          <button class="ct-add-tab${ctAddPanelTab === 'players' ? ' active' : ''}" data-tab="players">Players</button>
          <button class="ct-add-tab${ctAddPanelTab === 'npcs' ? ' active' : ''}" data-tab="npcs">NPCs</button>
          <button class="ct-add-tab${ctAddPanelTab === 'monsters' ? ' active' : ''}" data-tab="monsters">Monsters</button>
          <button class="ct-add-tab${ctAddPanelTab === 'manual' ? ' active' : ''}" data-tab="manual">Manual</button>
        </div>
        <div class="ct-add-body" id="ct-add-body"></div>
      </div>
    </div>`;

  renderCombatList(m, sorted, activeCombatant);

  m.querySelector('#ct-next').addEventListener('click', () => {
    s.turnIndex++;
    if (s.turnIndex >= s.combatants.length) { s.turnIndex = 0; s.round++; }
    renderCombatTracker(m);
  });

  m.querySelector('#ct-reset').addEventListener('click', () => {
    if (!confirm('Reset combat? This clears all combatants and the round counter.')) return;
    initCombatState();
    renderCombatTracker(m);
  });

  m.querySelector('#ct-load').addEventListener('click', () => renderCombatTracker(m, 'load'));

  m.querySelector('#ct-save').addEventListener('click', () => {
    const bar = m.querySelector('#ct-save-bar');
    if (!bar.hidden) { bar.hidden = true; return; }
    bar.hidden = false;
    bar.innerHTML = `
      <input id="ct-save-name" placeholder="Encounter name…" autocomplete="off">
      <button class="ct-save-confirm" id="ct-save-confirm">Save</button>
      <button class="ct-save-cancel" id="ct-save-cancel">✕</button>
      <span class="ct-saved-msg" id="ct-saved-msg"></span>`;
    bar.querySelector('#ct-save-name').focus();

    bar.querySelector('#ct-save-cancel').addEventListener('click', () => { bar.hidden = true; });

    const doSave = async () => {
      const name = bar.querySelector('#ct-save-name').value.trim();
      if (!name) { bar.querySelector('#ct-save-name').focus(); return; }
      try {
        const r = await fetch(`/api/encounters/${encodeURIComponent(name)}`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(combatState),
        });
        if (!r.ok) throw new Error((await r.json()).error);
        const msg = bar.querySelector('#ct-saved-msg');
        msg.textContent = `Saved "${name}" ✓`;
        setTimeout(() => { msg.textContent = ''; bar.hidden = true; }, 2000);
      } catch (e) {
        bar.querySelector('#ct-saved-msg').textContent = `Error: ${e.message}`;
        bar.querySelector('#ct-saved-msg').style.color = '#f38ba8';
      }
    };
    bar.querySelector('#ct-save-confirm').addEventListener('click', doSave);
    bar.querySelector('#ct-save-name').addEventListener('keydown', e => { if (e.key === 'Enter') doSave(); });
  });

  m.querySelector('#ct-add-toggle').addEventListener('click', () => {
    ctAddPanelOpen = !ctAddPanelOpen;
    renderCombatTracker(m);
    if (ctAddPanelOpen) renderAddTab(m);
  });

  if (ctAddPanelOpen) {
    m.querySelectorAll('.ct-add-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        ctAddPanelTab = tab.dataset.tab;
        m.querySelectorAll('.ct-add-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderAddTab(m);
      });
    });
    renderAddTab(m);
  }
}

function renderAddTab(m) {
  switch (ctAddPanelTab) {
    case 'players':   renderAddPlayers(m);  break;
    case 'npcs':      renderAddNpcs(m);     break;
    case 'monsters':  renderAddMonsters(m); break;
    case 'manual':    renderAddManual(m);   break;
  }
}

function renderAddManual(m) {
  const body = m.querySelector('#ct-add-body');
  if (!body) return;
  body.innerHTML = `
    <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:4px 0">
      <label style="font-size:11px;color:#888">Name</label>
      <input name="name" placeholder="Goblin" autocomplete="off"
        style="flex:1;min-width:80px;background:#1e1e2e;border:1px solid #444;border-radius:3px;color:#cdd6f4;padding:3px 6px;font-size:12px;font-family:inherit">
      <label style="font-size:11px;color:#888">Init</label>
      <input name="init" type="number" placeholder="12"
        style="width:48px;background:#1e1e2e;border:1px solid #444;border-radius:3px;color:#cdd6f4;padding:3px 4px;font-size:12px;font-family:inherit;text-align:center">
      <label style="font-size:11px;color:#888">AC</label>
      <input name="ac" type="number" placeholder="13"
        style="width:44px;background:#1e1e2e;border:1px solid #444;border-radius:3px;color:#cdd6f4;padding:3px 4px;font-size:12px;font-family:inherit;text-align:center">
      <label style="font-size:11px;color:#888">HP</label>
      <input name="hp" type="number" placeholder="7"
        style="width:52px;background:#1e1e2e;border:1px solid #444;border-radius:3px;color:#cdd6f4;padding:3px 4px;font-size:12px;font-family:inherit;text-align:center">
      <select name="type"
        style="background:#1e1e2e;border:1px solid #444;border-radius:3px;color:#cdd6f4;padding:3px 4px;font-size:12px;font-family:inherit">
        <option value="monster">Monster</option>
        <option value="player">Player</option>
        <option value="npc">NPC</option>
      </select>
      <button class="ct-add-btn-sm" id="ct-manual-add-btn">+ Add</button>
    </div>`;

  const doAdd = () => {
    const name = body.querySelector('[name=name]').value.trim() || 'Unknown';
    const init = parseInt(body.querySelector('[name=init]').value) || 0;
    const ac   = parseInt(body.querySelector('[name=ac]').value)   || 10;
    const hp   = parseInt(body.querySelector('[name=hp]').value)   || 1;
    const type = body.querySelector('[name=type]').value;
    combatState.combatants.push({ id: ctUid(), name, initiative: init, ac, hpMax: hp, hpCur: hp, type, conditions: [] });
    body.querySelector('[name=name]').value = '';
    body.querySelector('[name=init]').value = '';
    body.querySelector('[name=ac]').value   = '';
    body.querySelector('[name=hp]').value   = '';
    renderCombatList(m, [...combatState.combatants].sort((a, b) => b.initiative - a.initiative),
      combatState.combatants[combatState.turnIndex % Math.max(combatState.combatants.length, 1)]);
    body.querySelector('[name=name]').focus();
  };

  body.querySelector('#ct-manual-add-btn').addEventListener('click', doAdd);
  body.querySelector('[name=hp]').addEventListener('keydown', e => { if (e.key === 'Enter') doAdd(); });
}

function renderAddMonsters5etools(m) {
  const wrap = m.querySelector('#ct-add-monster-body');
  if (!wrap) return;
  wrap.innerHTML = `
    <input class="ct-add-search" id="ct-5e-search" placeholder="Search bestiary (e.g. wolf, goblin, dragon)…" value="${ctAddSearchQuery}">
    <div id="ct-5e-results"></div>`;

  const searchInput = wrap.querySelector('#ct-5e-search');
  const resultsWrap = wrap.querySelector('#ct-5e-results');

  let debounceTimer;
  searchInput.addEventListener('input', () => {
    ctAddSearchQuery = searchInput.value;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => run5eSearch(resultsWrap), 350);
  });

  if (ctAddSearchQuery.length >= 2) run5eSearch(resultsWrap);
  else searchInput.focus();

  async function run5eSearch(wrap) {
    const q = ctAddSearchQuery.trim();
    if (q.length < 2) { wrap.innerHTML = ''; return; }
    wrap.innerHTML = '<div class="ct-add-loading">Searching…</div>';
    let monsters;
    try {
      const r = await fetch(`/api/5etools/search?q=${encodeURIComponent(q)}`);
      if (!r.ok) throw new Error((await r.json()).error || 'Search failed');
      monsters = await r.json();
    } catch (e) {
      wrap.innerHTML = `<div class="ct-add-error">Error: ${e.message}</div>`;
      return;
    }
    if (!monsters.length) {
      wrap.innerHTML = '<div class="ct-add-loading">No results.</div>';
      return;
    }
    wrap.innerHTML = '';
    monsters.forEach(mon => {
      const row = document.createElement('div');
      row.className = 'ct-add-row';
      row.innerHTML = `
        <span class="ct-add-name">${mon.name}</span>
        <span class="ct-add-stat">AC ${mon.ac} · HP ${mon.hp} · CR ${mon.cr}</span>
        <button class="ct-add-btn-sm ct-5e-add-btn">+ Add</button>`;
      wrap.appendChild(row);

      row.querySelector('.ct-5e-add-btn').addEventListener('click', () => {
        const initiative = Math.floor(Math.random() * 20) + 1;
        combatState.combatants.push({
          id: ctUid(), name: mon.name,
          initiative, ac: mon.ac,
          hpMax: mon.hp, hpCur: mon.hp,
          type: 'monster', conditions: [],
        });
        renderCombatList(m, [...combatState.combatants].sort((a, b) => b.initiative - a.initiative),
          combatState.combatants[combatState.turnIndex % Math.max(combatState.combatants.length, 1)]);
      });
    });
  }
}

function renderAddMonsters(m) {
  const body = m.querySelector('#ct-add-body');
  if (!body) return;

  body.innerHTML = `
    <div class="ct-add-sub-tabs">
      <button class="ct-add-sub-tab${ctAddMonsterTab === 'adventure' ? ' active' : ''}" data-mtab="adventure">Adventure</button>
      <button class="ct-add-sub-tab${ctAddMonsterTab === '5etools' ? ' active' : ''}" data-mtab="5etools">5etools</button>
    </div>
    <div id="ct-add-monster-body"></div>`;

  body.querySelectorAll('.ct-add-sub-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      ctAddMonsterTab = tab.dataset.mtab;
      body.querySelectorAll('.ct-add-sub-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderAddMonstersBody(m);
    });
  });

  renderAddMonstersBody(m);
}

function renderAddMonstersBody(m) {
  if (ctAddMonsterTab === 'adventure') renderAddMonstersAdventure(m);
  else renderAddMonsters5etools(m);
}

async function renderAddMonstersAdventure(m) {
  const wrap = m.querySelector('#ct-add-monster-body');
  if (!wrap) return;
  wrap.innerHTML = '<div class="ct-add-loading">Loading adventures…</div>';

  let adventures;
  try {
    const r = await fetch('/api/adventures');
    if (!r.ok) throw new Error('Failed to load adventures');
    adventures = await r.json();
  } catch (e) {
    wrap.innerHTML = `<div class="ct-add-error">Error: ${e.message}</div>`;
    return;
  }

  // Seed selection to first adventure if not set
  if (!ctAddAdventurePath && adventures.length) ctAddAdventurePath = adventures[0].path;

  const options = adventures.map(a =>
    `<option value="${a.path}"${a.path === ctAddAdventurePath ? ' selected' : ''}>${a.season.replace('season-', 'S')} — ${a.label}</option>`
  ).join('');

  wrap.innerHTML = `
    <select class="ct-add-adv-select" id="ct-adv-select">${options}</select>
    <div id="ct-adv-monsters"></div>`;

  wrap.querySelector('#ct-adv-select').addEventListener('change', e => {
    ctAddAdventurePath = e.target.value;
    loadAdvMonsters(m);
  });

  loadAdvMonsters(m);
}

async function loadAdvMonsters(m) {
  const wrap = m.querySelector('#ct-adv-monsters');
  if (!wrap) return;
  if (!ctAddAdventurePath) { wrap.innerHTML = '<div class="ct-add-loading">Select an adventure.</div>'; return; }
  wrap.innerHTML = '<div class="ct-add-loading">Loading monsters…</div>';

  let monsters;
  try {
    const r = await fetch(`/api/adventure-monsters?path=${encodeURIComponent(ctAddAdventurePath)}`);
    if (!r.ok) throw new Error('Failed to load monsters');
    monsters = await r.json();
  } catch (e) {
    wrap.innerHTML = `<div class="ct-add-error">Error: ${e.message}</div>`;
    return;
  }

  if (!monsters.length) {
    wrap.innerHTML = '<div class="ct-add-loading">No parseable monsters found in this adventure.</div>';
    return;
  }

  wrap.innerHTML = `
    <div style="display:flex;justify-content:flex-end;margin-bottom:4px">
      <button class="ct-add-all-btn" id="ct-adv-add-all">Add All</button>
    </div>
    ${monsters.map((mon, i) => `
      <div class="ct-add-row" data-idx="${i}">
        <span class="ct-add-name">${mon.name}</span>
        <span class="ct-add-stat">AC ${mon.ac} · HP ${mon.hp}${mon.cr ? ` · CR ${mon.cr}` : ''}</span>
        <input class="ct-add-count" type="number" value="${mon.count}" min="1" max="20">
        <button class="ct-add-btn-sm ct-adv-add-btn">+ Add</button>
      </div>`).join('')}`;

  const addMonsterRows = (subset) => {
    subset.forEach(({ name, ac, hp, count }) => {
      for (let i = 0; i < count; i++) {
        const initiative = Math.floor(Math.random() * 20) + 1;
        combatState.combatants.push({
          id: ctUid(), name, initiative, ac, hpMax: hp, hpCur: hp, type: 'monster', conditions: [],
        });
      }
    });
    renderCombatList(m, [...combatState.combatants].sort((a, b) => b.initiative - a.initiative),
      combatState.combatants[combatState.turnIndex % Math.max(combatState.combatants.length, 1)]);
  };

  wrap.querySelector('#ct-adv-add-all').addEventListener('click', () => {
    const rows = [...wrap.querySelectorAll('.ct-add-row')];
    addMonsterRows(rows.map((row, i) => ({
      ...monsters[i],
      count: Math.max(1, parseInt(row.querySelector('.ct-add-count').value) || 1),
    })));
  });

  wrap.querySelectorAll('.ct-adv-add-btn').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const count = Math.max(1, parseInt(btn.closest('.ct-add-row').querySelector('.ct-add-count').value) || 1);
      addMonsterRows([{ ...monsters[i], count }]);
    });
  });
}

async function renderAddNpcs(m) {
  const body = m.querySelector('#ct-add-body');
  if (!body) return;
  body.innerHTML = '<div class="ct-add-loading">Loading…</div>';
  let npcs;
  try {
    const r = await fetch('/api/npcs');
    if (!r.ok) throw new Error('Failed to load NPCs');
    npcs = await r.json();
  } catch (e) {
    body.innerHTML = `<div class="ct-add-error">Error: ${e.message}</div>`;
    return;
  }

  if (!npcs.length) {
    body.innerHTML = '<div class="ct-add-loading">No NPC stat blocks found.</div>';
    return;
  }

  body.innerHTML = '';
  npcs.forEach(npc => {
    const row = document.createElement('div');
    row.className = 'ct-add-row';
    const acLabel = npc.ac != null ? `AC ${npc.ac}` : 'AC ?';
    const hpLabel = npc.hp != null ? `HP ${npc.hp}` : 'HP ?';
    row.innerHTML = `
      <span class="ct-add-name">${npc.name}</span>
      <span class="ct-add-stat">${acLabel} · ${hpLabel}</span>
      <button class="ct-add-btn-sm ct-npc-add-btn">+ Add</button>`;
    body.appendChild(row);

    row.querySelector('.ct-npc-add-btn').addEventListener('click', () => {
      const dexMod = npc.dexMod ?? 0;
      const initiative = Math.floor(Math.random() * 20) + 1 + dexMod;
      combatState.combatants.push({
        id: ctUid(), name: npc.name,
        initiative, ac: npc.ac ?? 10,
        hpMax: npc.hp ?? 1, hpCur: npc.hp ?? 1,
        type: 'npc', conditions: [],
      });
      renderCombatList(m, [...combatState.combatants].sort((a, b) => b.initiative - a.initiative),
        combatState.combatants[combatState.turnIndex % Math.max(combatState.combatants.length, 1)]);
    });
  });
}

async function renderAddPlayers(m) {
  const body = m.querySelector('#ct-add-body');
  if (!body) return;
  body.innerHTML = '<div class="ct-add-loading">Loading…</div>';
  let chars;
  try {
    const r = await fetch('/api/characters');
    if (!r.ok) throw new Error('Failed to load party');
    chars = await r.json();
  } catch (e) {
    body.innerHTML = `<div class="ct-add-error">Error: ${e.message}</div>`;
    return;
  }

  const inCombat = new Set(
    combatState.combatants.filter(c => c.type === 'player').map(c => c.name)
  );

  body.innerHTML = '';
  chars.forEach(ch => {
    const already = inCombat.has(ch.name);
    const row = document.createElement('div');
    row.className = 'ct-add-row' + (already ? ' ct-add-dim' : '');
    row.innerHTML = `
      <span class="ct-add-name">${ch.name} <span class="ct-add-sub">${ch.classLevel || ''}</span></span>
      <span class="ct-add-stat">AC ${ch.ac} · HP ${ch.maxHp}</span>
      ${already
        ? '<span class="ct-add-check">✓ in combat</span>'
        : `<div class="ct-add-init-wrap">
             <input class="ct-add-init" type="number" placeholder="Init" min="-5" max="30" aria-label="Initiative">
             <button class="ct-add-btn-sm ct-player-add-btn">+ Add</button>
           </div>`
      }`;
    body.appendChild(row);

    if (already) return;

    const initInput = row.querySelector('.ct-add-init');
    const addBtn = row.querySelector('.ct-player-add-btn');

    const doAdd = () => {
      const init = parseInt(initInput.value);
      if (isNaN(init)) {
        initInput.classList.add('error');
        initInput.focus();
        return;
      }
      combatState.combatants.push({
        id: ctUid(), name: ch.name,
        initiative: init, ac: ch.ac,
        hpMax: ch.maxHp, hpCur: ch.maxHp,
        type: 'player', conditions: [],
      });
      renderCombatList(m, [...combatState.combatants].sort((a, b) => b.initiative - a.initiative),
        combatState.combatants[combatState.turnIndex % Math.max(combatState.combatants.length, 1)]);
      renderAddPlayers(m); // refresh to show "in combat"
    };

    addBtn.addEventListener('click', doAdd);
    initInput.addEventListener('keydown', e => { if (e.key === 'Enter') doAdd(); });
    initInput.addEventListener('input', () => initInput.classList.remove('error'));
  });
}

async function renderEncounterList(m) {
  const wrap = m.querySelector('#ct-enc-list-wrap');
  wrap.innerHTML = '<div class="ct-empty">Loading…</div>';
  try {
    const r = await fetch('/api/encounters');
    const list = await r.json();
    if (!list.length) { wrap.innerHTML = '<div class="ct-empty">No saved encounters yet.</div>'; return; }
    const ul = document.createElement('ul');
    ul.className = 'ct-enc-list';
    list.forEach(enc => {
      const li = document.createElement('li');
      li.className = 'ct-enc-item';
      const date = new Date(enc.modified).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      li.innerHTML = `
        <span class="ct-enc-name">${enc.name}</span>
        <span class="ct-enc-date">${date}</span>
        <button class="ct-enc-load">Load</button>
        <button class="ct-enc-del" title="Delete">✕</button>`;
      li.querySelector('.ct-enc-load').addEventListener('click', async () => {
        try {
          const r = await fetch(`/api/encounters/${encodeURIComponent(enc.name)}`);
          if (!r.ok) throw new Error('Failed to load');
          combatState = await r.json();
          // Re-stamp IDs in case they're missing
          combatState.combatants.forEach(c => { if (!c.id) c.id = ctUid(); });
          renderCombatTracker(m);
        } catch (e) { alert(`Load failed: ${e.message}`); }
      });
      li.querySelector('.ct-enc-del').addEventListener('click', async () => {
        if (!confirm(`Delete "${enc.name}"?`)) return;
        await fetch(`/api/encounters/${encodeURIComponent(enc.name)}`, { method: 'DELETE' });
        li.remove();
        if (!ul.children.length) wrap.innerHTML = '<div class="ct-empty">No saved encounters yet.</div>';
      });
      ul.appendChild(li);
    });
    wrap.innerHTML = '';
    wrap.appendChild(ul);
  } catch (e) {
    wrap.innerHTML = `<div class="ct-empty" style="color:#f38ba8">Error: ${e.message}</div>`;
  }
}

function renderCombatList(m, sorted, activeCombatant) {
  const list = m.querySelector('#ct-list');
  if (!sorted.length) {
    list.innerHTML = '<div class="ct-empty">No combatants yet — add one below.</div>';
    return;
  }

  list.innerHTML = '';
  sorted.forEach((c, idx) => {
    const isActive = activeCombatant && c.id === activeCombatant.id;
    const isDead   = c.hpCur <= 0;
    const isLow    = !isDead && c.hpCur <= Math.floor(c.hpMax / 2);

    const row = document.createElement('div');
    row.className = `ct-row${isActive ? ' ct-active' : ''}${isDead ? ' ct-dead' : ''}`;
    row.dataset.id = c.id;

    row.innerHTML = `
      <input class="ct-init" type="number" value="${c.initiative}" title="Initiative" aria-label="Initiative">
      <span class="ct-name" contenteditable="true" spellcheck="false">${c.name}</span>
      <input class="ct-ac" type="number" value="${c.ac}" title="Armor Class" aria-label="AC">
      <div class="ct-hp-ctrl">
        <button class="ct-hp-btn ct-dmg" title="Damage">−</button>
        <input class="ct-hp-cur" type="number" value="${c.hpCur}" ${isLow || isDead ? 'data-low="true"' : ''} aria-label="Current HP">
        <span class="ct-hp-sep">/</span>
        <input class="ct-hp-max" type="number" value="${c.hpMax}" aria-label="Max HP">
        <button class="ct-hp-btn ct-heal" title="Heal">+</button>
      </div>
      <div class="ct-actions">
        <button class="ct-cond-btn" title="Add condition">± cond</button>
        <button class="ct-remove-btn" title="Remove combatant">✕</button>
      </div>`;

    list.appendChild(row);

    // Condition pills row (always rendered, hidden if empty)
    if (c.conditions.length || row.querySelector('.ct-cond-btn')._pickerOpen) {
      const condRow = document.createElement('div');
      condRow.className = 'ct-cond-wrap';
      condRow.dataset.for = c.id;
      c.conditions.forEach(cond => {
        const pill = document.createElement('span');
        pill.className = 'ct-cond';
        pill.textContent = cond;
        pill.title = 'Click to remove';
        pill.addEventListener('click', () => {
          c.conditions = c.conditions.filter(x => x !== cond);
          renderCombatList(m, sorted, activeCombatant);
        });
        condRow.appendChild(pill);
      });
      list.appendChild(condRow);
    }

    // Initiative edit
    row.querySelector('.ct-init').addEventListener('change', e => {
      c.initiative = parseInt(e.target.value) || 0;
      renderCombatTracker(m);
    });

    // Name edit
    row.querySelector('.ct-name').addEventListener('blur', e => {
      c.name = e.target.textContent.trim() || c.name;
    });

    // AC edit
    row.querySelector('.ct-ac').addEventListener('change', e => {
      c.ac = parseInt(e.target.value) || 0;
    });

    // HP current edit
    row.querySelector('.ct-hp-cur').addEventListener('change', e => {
      c.hpCur = parseInt(e.target.value) ?? c.hpCur;
      renderCombatList(m, sorted, activeCombatant);
    });

    // HP max edit
    row.querySelector('.ct-hp-max').addEventListener('change', e => {
      c.hpMax = parseInt(e.target.value) || c.hpMax;
    });

    // Damage button
    row.querySelector('.ct-dmg').addEventListener('click', () => {
      const amt = parseInt(prompt('Damage amount:', '')) || 0;
      c.hpCur = Math.max(0, c.hpCur - amt);
      renderCombatList(m, sorted, activeCombatant);
    });

    // Heal button
    row.querySelector('.ct-heal').addEventListener('click', () => {
      const amt = parseInt(prompt('Heal amount:', '')) || 0;
      c.hpCur = Math.min(c.hpMax, c.hpCur + amt);
      renderCombatList(m, sorted, activeCombatant);
    });

    // Condition picker toggle
    row.querySelector('.ct-cond-btn').addEventListener('click', e => {
      // Toggle inline condition picker below this row
      const existingPicker = list.querySelector(`.ct-cond-picker[data-for="${c.id}"]`);
      if (existingPicker) { existingPicker.remove(); return; }
      const picker = document.createElement('div');
      picker.className = 'ct-cond-picker';
      picker.dataset.for = c.id;
      CONDITIONS.forEach(cond => {
        const btn = document.createElement('button');
        btn.className = 'ct-cond-opt' + (c.conditions.includes(cond) ? ' selected' : '');
        btn.textContent = cond;
        btn.addEventListener('click', () => {
          if (c.conditions.includes(cond)) {
            c.conditions = c.conditions.filter(x => x !== cond);
          } else {
            c.conditions.push(cond);
          }
          renderCombatList(m, sorted, activeCombatant);
        });
        picker.appendChild(btn);
      });
      // Insert picker after the condition row (or after this row if no cond row)
      const condRow = list.querySelector(`.ct-cond-wrap[data-for="${c.id}"]`);
      const insertAfter = condRow || row;
      insertAfter.insertAdjacentElement('afterend', picker);
    });

    // Remove combatant
    row.querySelector('.ct-remove-btn').addEventListener('click', () => {
      combatState.combatants = combatState.combatants.filter(x => x.id !== c.id);
      if (combatState.turnIndex >= combatState.combatants.length) {
        combatState.turnIndex = 0;
      }
      renderCombatTracker(m);
    });
  });
}

async function renderImportPanel(m, advPath) {
  const panel = m.querySelector('#ct-import-panel');
  panel.innerHTML = '<div class="ct-import-hdr"><span>Loading monsters from adventure…</span></div>';

  let monsters;
  try {
    const r = await fetch(`/api/adventure-monsters?path=${encodeURIComponent(advPath)}`);
    monsters = await r.json();
  } catch (e) {
    panel.innerHTML = `<div class="ct-import-hdr"><span style="color:#f38ba8">Error: ${e.message}</span></div>`;
    return;
  }

  if (!monsters.length) {
    panel.innerHTML = '<div class="ct-import-hdr"><span style="color:#666">No parseable monsters found in this adventure.</span></div>';
    return;
  }

  const addMonsters = (subset) => {
    subset.forEach(({ name, ac, hp, count }) => {
      for (let i = 0; i < count; i++) {
        combatState.combatants.push({ id: ctUid(), name, initiative: 0, ac, hpMax: hp, hpCur: hp, type: 'monster', conditions: [] });
      }
    });
    renderCombatTracker(m);
  };

  panel.innerHTML = `
    <div class="ct-import-hdr">
      <span>${monsters.length} monster${monsters.length !== 1 ? 's' : ''} found</span>
      <button class="ct-import-add-all" id="ct-import-all">Add All</button>
    </div>
    ${monsters.map((mon, i) => `
      <div class="ct-import-row" data-idx="${i}">
        <span class="ct-import-name">${mon.name}</span>
        <span class="ct-import-stats">AC ${mon.ac} · HP ${mon.hp}${mon.cr ? ` · CR ${mon.cr}` : ''}</span>
        <input class="ct-import-count" type="number" value="${mon.count}" min="1" max="20" title="Count">
        <button class="ct-import-btn">+ Add</button>
      </div>`).join('')}`;

  panel.querySelector('#ct-import-all').addEventListener('click', () => {
    const rows = [...panel.querySelectorAll('.ct-import-row')];
    const subset = rows.map((row, i) => ({
      ...monsters[i],
      count: Math.max(1, parseInt(row.querySelector('.ct-import-count').value) || 1),
    }));
    addMonsters(subset);
  });

  panel.querySelectorAll('.ct-import-row').forEach((row, i) => {
    row.querySelector('.ct-import-btn').addEventListener('click', () => {
      const count = Math.max(1, parseInt(row.querySelector('.ct-import-count').value) || 1);
      addMonsters([{ ...monsters[i], count }]);
    });
  });
}

// Seasonal Calendar tool (button added dynamically in loadWorldTables)

async function openSeasonalCalendar() {
  const m = getFreeModal();
  if (!m) return;
  m.querySelector('.modal-title').textContent = 'Seasonal Calendar';
  m.querySelector('.modal-box').classList.remove('modal-box--tall');
  m.querySelector('.modal-body').innerHTML =
    '<div style="padding:12px 16px"><em style="color:#7a6050;font-size:13px">Loading…</em></div>';
  m.hidden = false;
  requestAnimationFrame(() => m.classList.add('visible'));

  try {
    const r = await fetch('/tools/seasonal-calendar');
    const months = await r.json();

    m.querySelector('.modal-body').innerHTML = `
      <div style="padding:12px 16px 0;font-family:'Palatino Linotype',serif">
        <div class="cal-tabs" style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px;border-bottom:2px solid #c9ad6a;padding-bottom:10px"></div>
        <div class="cal-content"></div>
      </div>`;

    const tabs = m.querySelector('.cal-tabs');
    months.forEach(mo => {
      const btn = document.createElement('button');
      const shortName = mo.name.replace(/\s*\([^)]+\)/, '').trim();
      btn.textContent = shortName.charAt(0) + shortName.slice(1).toLowerCase();
      btn.dataset.num = mo.num;
      btn.style.cssText = 'background:#ede8da;border:1px solid #b8a88a;color:#3b0d0d;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:11px;font-weight:600;font-family:inherit';
      btn.addEventListener('click', () => {
        tabs.querySelectorAll('button').forEach(b => { b.style.background='#ede8da'; b.style.color='#3b0d0d'; });
        btn.style.background = '#8b7355'; btn.style.color = '#f5f0e8';
        loadCalMonth(m, mo.num);
      });
      tabs.appendChild(btn);
    });

    // Load month 1 by default
    if (months.length) {
      tabs.querySelector('button').click();
    }
  } catch (e) {
    m.querySelector('.modal-body').innerHTML =
      `<div style="padding:16px;color:#c0392b">${e.message}</div>`;
  }
}

async function loadCalMonth(m, num) {
  const el = m.querySelector('.cal-content');
  if (!el) return;
  el.innerHTML = '<em style="color:#7a6050;font-size:13px;padding:8px;display:block">Loading…</em>';
  try {
    const r = await fetch(`/tools/seasonal-calendar?month=${num}`);
    el.innerHTML = await r.text();
  } catch (e) {
    el.innerHTML = `<span style="color:#c0392b">${e.message}</span>`;
  }
}

// 5etools buttons
document.querySelectorAll('.tool-5e').forEach(btn => {
  btn.addEventListener('click', () => {
    closeTools();
    const path = btn.getAttribute('data-5e-path');
    open5eModal(path ? `${BASE_5E}/${path}` : BASE_5E);
  });
});

// ─── Manifest editor ──────────────────────────────────────────────────────────

const btnManifest = $('btn-manifest');

function currentDir() {
  if (!currentPath) return null;
  // If currentPath ends with .md it's a file — take parent dir
  return currentPath.endsWith('.md')
    ? currentPath.split('/').slice(0, -1).join('/') || ''
    : currentPath;
}

async function openManifestEditor() {
  const dir = '';

  const m = getFreeModal();
  if (!m) return;
  m.querySelector('.modal-title').textContent = 'Edit MANIFEST.md — root';
  m.querySelector('.modal-body').innerHTML =
    '<div style="padding:16px;color:#888;font-family:sans-serif;font-size:13px">Loading…</div>';
  m.querySelector('.modal-box').classList.remove('modal-box--tall');
  m.querySelector('.modal-box').classList.add('modal-box--tall');
  m.hidden = false;
  requestAnimationFrame(() => m.classList.add('visible'));

  let content = '';
  try {
    const r = await fetch('/api/manifest?path=' + encodeURIComponent(dir));
    const data = await r.json();
    content = data.content || '';
  } catch (e) {
    m.querySelector('.modal-body').innerHTML =
      `<div style="padding:16px;color:#f38ba8;font-family:sans-serif;font-size:13px">Error: ${e.message}</div>`;
    return;
  }

  const body = m.querySelector('.modal-body');
  body.innerHTML = `
    <div style="display:flex;flex-direction:column;height:100%;padding:12px;box-sizing:border-box;gap:8px">
      <div style="font-size:11px;color:#888;font-family:sans-serif">
        One link per line, e.g. <code>- [Label](filename.md)</code>. Order determines tree sort.
      </div>
      <textarea id="manifest-textarea" spellcheck="false" style="
        flex:1;width:100%;box-sizing:border-box;
        background:#1e1e1e;color:#cdd6f4;border:1px solid #444;
        font-family:'Cascadia Code',Consolas,monospace;font-size:13px;
        line-height:1.5;padding:10px;resize:none;border-radius:4px;
      ">${content.replace(/</g, '&lt;')}</textarea>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button id="manifest-save-btn" style="
          background:#58180d;color:#f5f0e8;border:none;padding:6px 18px;
          font-family:inherit;font-size:13px;border-radius:4px;cursor:pointer;
        ">Save</button>
      </div>
    </div>`;

  body.querySelector('#manifest-save-btn').addEventListener('click', async () => {
    const text = body.querySelector('#manifest-textarea').value;
    try {
      const r = await fetch('/api/manifest?path=' + encodeURIComponent(dir), {
        method: 'POST',
        body: text,
        headers: { 'Content-Type': 'text/plain' },
      });
      if (!r.ok) throw new Error((await r.json()).error || r.statusText);
      showToast('MANIFEST.md saved');
      closeTopModal();
      // Refresh the tree so new sort order takes effect
      const activeTab = document.querySelector('.tab.active');
      if (activeTab) activeTab.click();
    } catch (e) {
      showToast('Save failed: ' + e.message);
    }
  });
}

btnManifest.addEventListener('click', openManifestEditor);

btnPrint.addEventListener('click', () => {
  if (currentPath) window.open(`/print?path=${encodeURIComponent(currentPath)}`, '_blank');
});

// Root manifest button is always visible
function updateManifestBtn() {
  btnManifest.hidden = false;
}

// ─── Campaign Tracker ─────────────────────────────────────────────────────────

const panelTracker   = $('panel-tracker');
const trackerContent = $('tracker-content');
const trackerSaved   = $('tracker-saved');
const tabTracker     = $('tab-tracker');

let trackerSection  = 'contracts';
let trackerSaveTimer = null;

function showTrackerPanel() {
  viewer.hidden = true;
  panelTracker.hidden = false;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  tabTracker.classList.add('active');
  loadTrackerSection(trackerSection);
}

function hideTrackerPanel() {
  panelTracker.hidden = true;
  viewer.hidden = false;
}

tabTracker.addEventListener('click', () => {
  hideTrackerPanel(); // reset first
  showTrackerPanel();
  setActive(null);
  if (isMobile()) closeDrawers();
});

// When any other tab is clicked, hide the tracker panel
document.querySelectorAll('.tab:not(#tab-tracker)').forEach(tab => {
  tab.addEventListener('click', hideTrackerPanel);
});

document.querySelectorAll('.tr-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tr-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    trackerSection = btn.dataset.section;
    loadTrackerSection(trackerSection);
  });
});

async function loadTrackerSection(section) {
  trackerContent.innerHTML = '<div style="padding:20px;color:#888;font-family:sans-serif;font-size:13px">Loading…</div>';
  if (section === 'sessions') {
    await renderSessionsSection();
    return;
  }
  try {
    const r = await fetch(`/api/tracker?section=${section}`);
    const { content } = await r.json();
    renderTrackerSection(section, content);
  } catch (e) {
    trackerContent.innerHTML = `<div style="padding:20px;color:#f38ba8;font-family:sans-serif;font-size:13px">Error: ${e.message}</div>`;
  }
}

async function saveTrackerSection(section, content) {
  try {
    await fetch(`/api/tracker?section=${section}`, {
      method: 'POST', body: content, headers: { 'Content-Type': 'text/plain' }
    });
    trackerSaved.textContent = 'Saved ✓';
    clearTimeout(trackerSaveTimer);
    trackerSaveTimer = setTimeout(() => { trackerSaved.textContent = ''; }, 2000);
  } catch (e) {
    trackerSaved.textContent = 'Save failed';
  }
}

function scheduleSave(section, getContentFn) {
  clearTimeout(trackerSaveTimer);
  trackerSaveTimer = setTimeout(() => saveTrackerSection(section, getContentFn()), 600);
}

// Parse "- [x] label" lines from a markdown string
function parseCheckboxBlock(text) {
  return text.split('\n')
    .filter(l => /^- \[[ x]\]/.test(l))
    .map(l => ({ checked: l[3] === 'x', label: l.slice(6).trim() }));
}

// Serialize checkbox items back to markdown lines
function serializeCheckboxBlock(items) {
  return items.map(i => `- [${i.checked ? 'x' : ' '}] ${i.label}`).join('\n');
}

// Parse a markdown table into { headers, rows }
function parseMarkdownTable(text) {
  const lines = text.split('\n').filter(l => l.trim().startsWith('|'));
  if (lines.length < 2) return { headers: [], rows: [] };
  const headers = lines[0].split('|').slice(1, -1).map(h => h.trim());
  const rows = lines.slice(2).map(l =>
    l.split('|').slice(1, -1).map(c => c.trim())
  );
  return { headers, rows };
}

// Serialize { headers, rows } back to a markdown table
function serializeMarkdownTable({ headers, rows }) {
  const sep = headers.map(h => '-'.repeat(Math.max(h.length, 3)));
  const fmt = cells => '| ' + cells.join(' | ') + ' |';
  return [fmt(headers), fmt(sep), ...rows.map(fmt)].join('\n');
}

function renderTrackerSection(section, content) {
  const renderers = { party: renderParty, contracts: renderContracts,
    npcs: renderNpcs, clues: renderClues, promises: renderPromises,
    treasure: renderTreasure };
  const fn = renderers[section];
  if (fn) fn(content);
  else trackerContent.innerHTML = `<div class="tr-section"><p style="color:#888">Unknown section: ${section}</p></div>`;
}

function renderContracts(content) {
  // Strip everything before the first ## heading, then split into per-adventure blocks
  const strippedContent = content.replace(/^[\s\S]*?(?=^## )/m, '');
  const blocks = strippedContent.split(/^## /m).filter(Boolean);
  const div = document.createElement('div');
  div.className = 'tr-section';
  div.innerHTML = '<h2>Contract Outcomes</h2>';

  blocks.forEach(block => {
    const lines = block.split('\n');
    const title = lines[0].trim();
    const rest = lines.slice(1).join('\n');

    // Split checkboxes from notes
    const notesMatch = rest.match(/^### Notes\n([\s\S]*?)(?=^### |\Z)/m);
    const notesText = notesMatch ? notesMatch[1].trim() : '';
    const checkboxText = rest.replace(/^### Notes[\s\S]*/, '').trim();
    const items = parseCheckboxBlock(checkboxText);

    const contract = document.createElement('div');
    contract.className = 'tr-contract';

    const titleEl = document.createElement('div');
    titleEl.className = 'tr-contract-title';
    titleEl.innerHTML = `<span class="arrow">▶</span> ${title}`;
    titleEl.addEventListener('click', () => {
      titleEl.classList.toggle('open');
      body.classList.toggle('open');
    });

    const body = document.createElement('div');
    body.className = 'tr-contract-body';

    // Checkboxes
    const ul = document.createElement('ul');
    ul.className = 'tr-checklist';
    items.forEach((item, idx) => {
      const li = document.createElement('li');
      if (item.checked) li.classList.add('checked');
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = item.checked;
      cb.addEventListener('change', () => {
        items[idx].checked = cb.checked;
        li.classList.toggle('checked', cb.checked);
        serializeAndSaveContracts(div);
      });
      li.appendChild(cb);
      li.appendChild(document.createTextNode(item.label));
      ul.appendChild(li);
    });
    body.appendChild(ul);

    // Notes
    const notesLabel = document.createElement('div');
    notesLabel.style.cssText = 'font-size:11px;color:#666;text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px';
    notesLabel.textContent = 'Notes';
    const notes = document.createElement('textarea');
    notes.className = 'tr-notes';
    notes.value = notesText;
    notes.placeholder = 'Session notes…';
    notes.addEventListener('input', () => serializeAndSaveContracts(div));

    body.appendChild(notesLabel);
    body.appendChild(notes);
    contract.appendChild(titleEl);
    contract.appendChild(body);
    div.appendChild(contract);
  });

  trackerContent.innerHTML = '';
  trackerContent.appendChild(div);
}

function serializeAndSaveContracts(div) {
  const blocks = [];
  div.querySelectorAll('.tr-contract').forEach(contract => {
    const title = contract.querySelector('.tr-contract-title').textContent.replace('▶', '').replace('▼', '').trim();
    const items = [...contract.querySelectorAll('.tr-checklist li')].map(li => {
      const cb = li.querySelector('input[type=checkbox]');
      const label = li.textContent.trim();
      return `- [${cb.checked ? 'x' : ' '}] ${label}`;
    });
    const notes = contract.querySelector('.tr-notes').value;
    blocks.push(`## ${title}\n${items.join('\n')}\n\n### Notes\n${notes}`);
  });
  saveTrackerSection('contracts', '# Contract Outcomes\n\n' + blocks.join('\n\n'));
}

function renderParty(content) {
  const { headers, rows } = parseMarkdownTable(content);
  const workingRows = rows.length ? rows.map(r => [...r]) : [['','','',''],['','','',''],['','','',''],['','','',''],['','','','']];

  const div = document.createElement('div');
  div.className = 'tr-section';
  div.innerHTML = '<h2>Party Roster</h2>';

  const table = document.createElement('table');
  table.className = 'tr-table';
  const thead = document.createElement('thead');
  thead.innerHTML = '<tr>' + (headers.length ? headers : ['Player','Character','Class / Level','Status']).map(h => `<th>${h}</th>`).join('') + '<th></th></tr>';
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  const saveParty = () => {
    const rows = [...tbody.querySelectorAll('tr')].map(tr =>
      [...tr.querySelectorAll('input')].map(i => i.value)
    );
    const hdrs = headers.length ? headers : ['Player','Character','Class / Level','Status'];
    saveTrackerSection('party', '# Party Roster\n\n' + serializeMarkdownTable({ headers: hdrs, rows }));
  };

  const addRow = (cells) => {
    const tr = document.createElement('tr');
    cells.forEach(cell => {
      const td = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'text';
      input.value = cell;
      input.addEventListener('blur', saveParty);
      td.appendChild(input);
      tr.appendChild(td);
    });
    const removeTd = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.className = 'tr-remove-btn';
    removeBtn.textContent = '✕';
    removeBtn.addEventListener('click', () => { tr.remove(); saveParty(); });
    removeTd.appendChild(removeBtn);
    tr.appendChild(removeTd);
    tbody.appendChild(tr);
  };

  workingRows.forEach(row => addRow(row));
  table.appendChild(tbody);
  div.appendChild(table);

  const addBtn = document.createElement('button');
  addBtn.className = 'tr-add-btn';
  addBtn.textContent = '+ Add player';
  addBtn.addEventListener('click', () => { addRow(['','','','']); });
  div.appendChild(addBtn);

  trackerContent.innerHTML = '';
  trackerContent.appendChild(div);
}

function renderNpcs(content) {
  const { headers, rows } = parseMarkdownTable(content);
  const hdrs = headers.length ? headers : ['NPC','Location','Status','Relationship','Notes'];
  const workingRows = rows.length ? rows.map(r => [...r]) : [['','','Alive','Neutral','']];

  const div = document.createElement('div');
  div.className = 'tr-section';
  div.innerHTML = '<h2>NPC Status</h2>';

  const table = document.createElement('table');
  table.className = 'tr-table';
  const thead = document.createElement('thead');
  thead.innerHTML = '<tr>' + hdrs.map(h => `<th>${h}</th>`).join('') + '<th></th></tr>';
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  const saveNpcs = () => {
    const rows = [...tbody.querySelectorAll('tr')].map(tr => {
      return [...tr.querySelectorAll('input, select')].map(el => el.value);
    });
    saveTrackerSection('npcs', '# NPC Status\n\n' + serializeMarkdownTable({ headers: hdrs, rows }));
  };

  const addRow = (cells) => {
    const tr = document.createElement('tr');
    cells.forEach((cell, i) => {
      const td = document.createElement('td');
      if (i === 2) {
        const sel = document.createElement('select');
        ['Alive','Dead','Unknown'].forEach(opt => {
          const o = document.createElement('option');
          o.value = o.textContent = opt;
          if (cell === opt) o.selected = true;
          sel.appendChild(o);
        });
        sel.addEventListener('change', saveNpcs);
        td.appendChild(sel);
      } else if (i === 3) {
        const sel = document.createElement('select');
        ['Ally','Neutral','Enemy','Unknown'].forEach(opt => {
          const o = document.createElement('option');
          o.value = o.textContent = opt;
          if (cell === opt) o.selected = true;
          sel.appendChild(o);
        });
        sel.addEventListener('change', saveNpcs);
        td.appendChild(sel);
      } else {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = cell;
        input.addEventListener('blur', saveNpcs);
        td.appendChild(input);
      }
      tr.appendChild(td);
    });
    const removeTd = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.className = 'tr-remove-btn';
    removeBtn.textContent = '✕';
    removeBtn.addEventListener('click', () => { tr.remove(); saveNpcs(); });
    removeTd.appendChild(removeBtn);
    tr.appendChild(removeTd);
    tbody.appendChild(tr);
  };

  workingRows.forEach(row => {
    while (row.length < 5) row.push('');
    addRow(row);
  });
  table.appendChild(tbody);
  div.appendChild(table);

  const addBtn = document.createElement('button');
  addBtn.className = 'tr-add-btn';
  addBtn.textContent = '+ Add NPC';
  addBtn.addEventListener('click', () => { addRow(['','','Alive','Neutral','']); });
  div.appendChild(addBtn);

  trackerContent.innerHTML = '';
  trackerContent.appendChild(div);
}

function renderClues(content) {
  const theoriesMatch = content.match(/^## Party Theories\n([\s\S]*)/m);
  const theoriesText = theoriesMatch ? theoriesMatch[1].trim() : '';
  const checkboxText = content.replace(/^## Party Theories[\s\S]*/m, '').replace(/^# .*\n/m, '').trim();
  const items = parseCheckboxBlock(checkboxText);

  const saveClues = () => {
    const cbLines = [...ul.querySelectorAll('li')].map(li => {
      const cb = li.querySelector('input[type=checkbox]');
      const label = li.textContent.trim();
      return `- [${cb.checked ? 'x' : ' '}] ${label}`;
    }).join('\n');
    const theories = textarea.value;
    saveTrackerSection('clues', `# Aevorian Echo — Clue Tracker\n\n${cbLines}\n\n## Party Theories\n\n${theories}`);
  };

  const div = document.createElement('div');
  div.className = 'tr-section';
  div.innerHTML = '<h2>Aevorian Echo — Clue Tracker</h2>';

  const ul = document.createElement('ul');
  ul.className = 'tr-checklist';
  items.forEach(item => {
    const li = document.createElement('li');
    if (item.checked) li.classList.add('checked');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = item.checked;
    cb.addEventListener('change', () => {
      li.classList.toggle('checked', cb.checked);
      saveClues();
    });
    li.appendChild(cb);
    li.appendChild(document.createTextNode(item.label));
    ul.appendChild(li);
  });
  div.appendChild(ul);

  const theoriesHeading = document.createElement('div');
  theoriesHeading.style.cssText = 'font-size:11px;color:#666;text-transform:uppercase;letter-spacing:.05em;margin:16px 0 6px';
  theoriesHeading.textContent = 'Party Theories';
  div.appendChild(theoriesHeading);

  const textarea = document.createElement('textarea');
  textarea.className = 'tr-notes';
  textarea.style.minHeight = '120px';
  textarea.value = theoriesText;
  textarea.placeholder = 'What do the players think is going on…';
  textarea.addEventListener('input', saveClues);
  div.appendChild(textarea);

  trackerContent.innerHTML = '';
  trackerContent.appendChild(div);
}

function renderPromises(content) {
  const sections = [
    { key: 'party', heading: 'Party Said They Would', placeholder: 'Something the party promised to do…' },
    { key: 'hooks', heading: 'Open Hooks', placeholder: 'A dangling thread for a future session…' },
  ];

  const parseSection = (heading) => {
    const re = new RegExp(`^## ${heading}\\n([\\s\\S]*?)(?=^## |\\Z)`, 'm');
    const m = content.match(re);
    return m ? parseCheckboxBlock(m[1]) : [];
  };

  const div = document.createElement('div');
  div.className = 'tr-section';
  div.innerHTML = '<h2>Promises & Open Hooks</h2>';

  const sectionData = {};
  const sectionUls = {};

  const savePromises = () => {
    const blocks = sections.map(s => {
      const lines = [...sectionUls[s.key].querySelectorAll('li')].map(li => {
        const cb = li.querySelector('input[type=checkbox]');
        const span = li.querySelector('span');
        return `- [${cb.checked ? 'x' : ' '}] ${span.textContent}`;
      }).join('\n');
      return `## ${s.heading}\n${lines}`;
    }).join('\n\n');
    saveTrackerSection('promises', `# Promises & Open Hooks\n\n${blocks}`);
  };

  sections.forEach(s => {
    sectionData[s.key] = parseSection(s.heading);

    const heading = document.createElement('h3');
    heading.style.cssText = 'font-size:0.95em;font-weight:normal;color:#f5f0e8;margin:20px 0 8px';
    heading.textContent = s.heading;
    div.appendChild(heading);

    const ul = document.createElement('ul');
    ul.className = 'tr-checklist';
    sectionUls[s.key] = ul;

    const addItem = (item) => {
      const li = document.createElement('li');
      if (item.checked) li.classList.add('checked');
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = item.checked;
      cb.addEventListener('change', () => { li.classList.toggle('checked', cb.checked); savePromises(); });

      const span = document.createElement('span');
      span.contentEditable = true;
      span.textContent = item.label;
      span.style.cssText = 'outline:none;flex:1;';
      span.addEventListener('blur', savePromises);
      span.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); span.blur(); } });

      const removeBtn = document.createElement('button');
      removeBtn.className = 'tr-remove-btn';
      removeBtn.textContent = '✕';
      removeBtn.addEventListener('click', () => { li.remove(); savePromises(); });

      li.appendChild(cb);
      li.appendChild(span);
      li.appendChild(removeBtn);
      ul.appendChild(li);
    };

    (sectionData[s.key].length ? sectionData[s.key] : [{ checked: false, label: '' }]).forEach(addItem);
    div.appendChild(ul);

    const addBtn = document.createElement('button');
    addBtn.className = 'tr-add-btn';
    addBtn.textContent = '+ Add item';
    addBtn.addEventListener('click', () => { addItem({ checked: false, label: '' }); });
    div.appendChild(addBtn);
  });

  trackerContent.innerHTML = '';
  trackerContent.appendChild(div);
}

function renderTreasure(content) {
  const { headers, rows } = parseMarkdownTable(content);
  const hdrs = headers.length ? headers : ['Item','Found Where','Attuned By','Notes'];

  const goldMatch = content.match(/\*\*Party Gold:\*\* (.+)/);
  const storedMatch = content.match(/\*\*Stored at Waystone:\*\* (.+)/);
  const goldVal = goldMatch ? goldMatch[1].trim() : '0 gp';
  const storedVal = storedMatch ? storedMatch[1].trim() : '0 gp';

  const workingRows = rows.length ? rows.map(r => [...r]) : [['','','','']];

  const div = document.createElement('div');
  div.className = 'tr-section';
  div.innerHTML = '<h2>Treasure & Magic Items</h2>';

  const goldRow = document.createElement('div');
  goldRow.className = 'tr-gold-row';
  goldRow.innerHTML = `
    <label>Party Gold: <input id="tr-gold" type="text" value="${goldVal}" style="margin-left:6px"></label>
    <label>Stored at Waystone: <input id="tr-stored" type="text" value="${storedVal}" style="margin-left:6px"></label>
  `;
  div.appendChild(goldRow);

  const table = document.createElement('table');
  table.className = 'tr-table';
  const thead = document.createElement('thead');
  thead.innerHTML = '<tr>' + hdrs.map(h => `<th>${h}</th>`).join('') + '<th></th></tr>';
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  const saveTreasure = () => {
    const rows = [...tbody.querySelectorAll('tr')].map(tr =>
      [...tr.querySelectorAll('input')].map(i => i.value)
    );
    const gold = div.querySelector('#tr-gold').value;
    const stored = div.querySelector('#tr-stored').value;
    const tableStr = serializeMarkdownTable({ headers: hdrs, rows });
    saveTrackerSection('treasure', `# Treasure & Magic Items\n\n${tableStr}\n\n**Party Gold:** ${gold}\n**Stored at Waystone:** ${stored}`);
  };

  div.querySelector('#tr-gold').addEventListener('blur', saveTreasure);
  div.querySelector('#tr-stored').addEventListener('blur', saveTreasure);

  const addRow = (cells) => {
    const tr = document.createElement('tr');
    cells.forEach(cell => {
      const td = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'text';
      input.value = cell;
      input.addEventListener('blur', saveTreasure);
      td.appendChild(input);
      tr.appendChild(td);
    });
    const removeTd = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.className = 'tr-remove-btn';
    removeBtn.textContent = '✕';
    removeBtn.addEventListener('click', () => { tr.remove(); saveTreasure(); });
    removeTd.appendChild(removeBtn);
    tr.appendChild(removeTd);
    tbody.appendChild(tr);
  };

  workingRows.forEach(row => { while (row.length < 4) row.push(''); addRow(row); });
  table.appendChild(tbody);
  div.appendChild(table);

  const addBtn = document.createElement('button');
  addBtn.className = 'tr-add-btn';
  addBtn.textContent = '+ Add item';
  addBtn.addEventListener('click', () => { addRow(['','','','']); });
  div.appendChild(addBtn);

  trackerContent.innerHTML = '';
  trackerContent.appendChild(div);
}

async function renderSessionsSection() {
  const div = document.createElement('div');
  div.className = 'tr-section';
  div.innerHTML = '<h2>Session Logs</h2>';

  let sessions = [];
  try {
    const r = await fetch('/api/tracker/sessions');
    sessions = await r.json();
  } catch (e) { /* show empty */ }

  const newBtn = document.createElement('button');
  newBtn.className = 'tr-add-btn';
  newBtn.style.marginBottom = '16px';
  newBtn.textContent = '＋ New Session';
  newBtn.addEventListener('click', async () => {
    const r = await fetch('/api/tracker/session/new', { method: 'POST' });
    const { id } = await r.json();
    await renderSessionsSection();
    const item = trackerContent.querySelector(`[data-session-id="${id}"]`);
    if (item) item.click();
  });
  div.appendChild(newBtn);

  const list = document.createElement('ul');
  list.className = 'tr-session-list';

  const openSessionForm = async (id, listItem) => {
    const existing = div.querySelector('.tr-session-form');
    if (existing) existing.remove();

    const r = await fetch(`/api/tracker/session?id=${id}`);
    const { content } = await r.json();
    const fm = content.match(/^---\r?\n/) ? extractFrontmatterClient(content) : {};
    const body = content.replace(/^---[\s\S]*?---\n?/, '');
    const eventsMatch = body.match(/^## Key Events\n([\s\S]*?)(?=^## |\Z)/m);
    const mvpMatch = body.match(/^## MVP Moment\n([\s\S]*)/m);

    const form = document.createElement('div');
    form.className = 'tr-session-form';
    form.innerHTML = `
      <label>Date</label>
      <input type="text" id="sf-date" value="${fm.date || ''}" placeholder="e.g. 2026-05-22">
      <label>Adventure</label>
      <input type="text" id="sf-adventure" value="${fm.adventure || ''}" placeholder="e.g. Wolves of Welton">
      <label>Party Level</label>
      <input type="text" id="sf-level" value="${fm.level || ''}" placeholder="e.g. 2">
      <label>Key Events</label>
      <textarea id="sf-events" placeholder="What happened this session…">${(eventsMatch ? eventsMatch[1] : '').trim()}</textarea>
      <label>MVP Moment</label>
      <input type="text" id="sf-mvp" value="${(mvpMatch ? mvpMatch[1] : '').trim()}" placeholder="The standout moment">
      <button class="tr-session-save">Save Session</button>
    `;

    form.querySelector('.tr-session-save').addEventListener('click', async () => {
      const date = form.querySelector('#sf-date').value;
      const adventure = form.querySelector('#sf-adventure').value;
      const level = form.querySelector('#sf-level').value;
      const events = form.querySelector('#sf-events').value;
      const mvp = form.querySelector('#sf-mvp').value;
      const sessionNum = id.replace('session-', '');
      const fileContent = `---\nsession: ${sessionNum}\ndate: ${date}\nadventure: ${adventure}\nlevel: ${level}\n---\n\n## Key Events\n\n${events}\n\n## MVP Moment\n\n${mvp}\n`;
      await fetch(`/api/tracker/session?id=${id}`, {
        method: 'POST', body: fileContent, headers: { 'Content-Type': 'text/plain' }
      });
      trackerSaved.textContent = 'Session saved ✓';
      setTimeout(() => { trackerSaved.textContent = ''; }, 2000);
      await renderSessionsSection();
    });

    listItem.insertAdjacentElement('afterend', form);
  };

  sessions.forEach(s => {
    const li = document.createElement('li');
    li.className = 'tr-session-item';
    li.dataset.sessionId = s.id;
    li.innerHTML = `
      <div class="session-meta">Session ${s.session}${s.date ? ' — ' + s.date : ''}${s.adventure ? ' · ' + s.adventure : ''}${s.level ? ' · Level ' + s.level : ''}</div>
      <div class="session-preview">${s.preview || '(no content yet)'}</div>
    `;
    li.addEventListener('click', () => openSessionForm(s.id, li));
    list.appendChild(li);
  });

  if (!sessions.length) {
    list.innerHTML = '<li style="color:#555;font-size:13px;padding:8px 0">No sessions logged yet. Click ＋ New Session to start.</li>';
  }

  div.appendChild(list);
  trackerContent.innerHTML = '';
  trackerContent.appendChild(div);
}

// Client-side frontmatter parser (mirrors server's extractFrontmatter)
function extractFrontmatterClient(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const result = {};
  for (const line of m[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon < 1) continue;
    result[line.slice(0, colon).trim()] = line.slice(colon + 1).trim().replace(/^["']|["']$/g, '');
  }
  return result;
}

// ─── Party Modal ──────────────────────────────────────────────────────────────

const BASE_5E = `http://${location.hostname}:2014`;

const CLASS_5E = {
  paladin: 'classes.html#paladin',
  warlock: 'classes.html#warlock',
  ranger:  'classes.html#ranger',
};

const FEATURE_5E = {
  'divine smite':     'classes.html#paladin_phb',
  'lay on hands':     'classes.html#paladin_phb,state:feature=s0-1~ishideoutline=b1',
  "hunter's mark":    "spells.html#hunter's mark_phb",
  'eldritch blast':   'spells.html#eldritch blast_phb',
  'chill touch':      'spells.html#chill touch_phb',
};

const ABILITY_FULL = {
  STR: 'Strength', DEX: 'Dexterity', CON: 'Constitution',
  INT: 'Intelligence', WIS: 'Wisdom', CHA: 'Charisma',
};

function link5eInline(text, slug) {
  return `<a href="#" class="link-5e-inline" data-modal-5e="${BASE_5E}/${slug}">${text}</a>`;
}

function renderCharacterSheet(char) {
  const classSlug = CLASS_5E[char.class.toLowerCase()];
  const classLink = classSlug
    ? link5eInline(`${char.classLevel}`, classSlug)
    : char.classLevel;

  const abilitiesHtml = ['STR','DEX','CON','INT','WIS','CHA'].map(ab => {
    const a = char.abilities[ab] || { score: '—', mod: '—' };
    return `<div class="pc-ability">
      <div class="pc-ability-name">${ab}</div>
      <div class="pc-ability-mod">${a.mod}</div>
      <div class="pc-ability-score">${a.score}</div>
    </div>`;
  }).join('');

  const combatHtml = [
    ['AC', char.ac], ['Initiative', char.initiative], ['HP', char.maxHp],
    ['Hit Dice', char.hitDice], ['Speed', char.speed], ['Prof. Bonus', char.profBonus],
  ].map(([label, val]) => `<div class="pc-combat-stat">
    <div class="pc-cs-label">${label}</div>
    <div class="pc-cs-value">${val || '—'}</div>
  </div>`).join('');

  const savesHtml = (char.savingThrows || []).map(s => {
    const ab = Object.entries(ABILITY_FULL).find(([,v]) => v === s)?.[0];
    const mod = ab ? char.abilities[ab]?.mod : '';
    return `<span class="pc-save">${s.slice(0,3)} ${mod}</span>`;
  }).join('');

  let defensesHtml = '';
  if (char.defenses?.resistances?.length) defensesHtml += `<div class="pc-def-row"><span class="pc-def-label">Resist: </span>${char.defenses.resistances.join(', ')}</div>`;
  if (char.defenses?.immunities?.length)  defensesHtml += `<div class="pc-def-row"><span class="pc-def-label">Immune: </span>${char.defenses.immunities.join(', ')}</div>`;
  if (char.defenses?.advantages?.length)  defensesHtml += `<div class="pc-def-row"><span class="pc-def-label">Adv: </span>${char.defenses.advantages.join('; ')}</div>`;

  const passivesHtml = Object.entries(char.passives || {}).map(([k,v]) =>
    `<div class="pc-passive-row"><span style="color:#7a6050;font-size:10px;text-transform:uppercase;letter-spacing:.06em">${k}:</span> <strong>${v}</strong></div>`
  ).join('');

  const skillsHtml = `<div class="pc-skills-grid">${(char.skills || []).map(s =>
    `<div class="pc-skill"><span class="pc-skill-mod">${s.mod}</span>${s.name}</div>`
  ).join('')}</div>`;

  const featuresHtml = (char.features || []).map(f => {
    const slug = FEATURE_5E[f.name.toLowerCase()];
    const nameHtml = slug ? link5eInline(f.name, slug) : `<strong>${f.name}</strong>`;
    return `<div class="pc-feature">
      <div class="pc-feature-name">${nameHtml}${f.subtitle ? ` <span class="pc-feature-sub">— ${f.subtitle}</span>` : ''}</div>
      ${f.description ? `<div class="pc-feature-desc">${f.description}</div>` : ''}
    </div>`;
  }).join('');

  const hasNotes = (char.attacks || []).some(a => a.notes);
  const attacksHtml = `<table class="pc-attacks">
    <thead><tr><th>Attack</th><th>Bonus</th><th>Damage</th>${hasNotes ? '<th>Notes</th>' : ''}</tr></thead>
    <tbody>${(char.attacks || []).map(a => {
      const slug = FEATURE_5E[a.name.toLowerCase()];
      const nameHtml = slug ? link5eInline(a.name, slug) : a.name;
      return `<tr><td>${nameHtml}</td><td>${a.bonus || '—'}</td><td>${a.damage || '—'}</td>${hasNotes ? `<td>${a.notes || ''}</td>` : ''}</tr>`;
    }).join('')}</tbody>
  </table>`;

  const profHtml = [
    char.armorProf  ? `<div class="pc-prof-row"><span class="pc-def-label">Armor: </span>${char.armorProf}</div>` : '',
    char.weaponProf ? `<div class="pc-prof-row"><span class="pc-def-label">Weapons: </span>${char.weaponProf}</div>` : '',
    char.toolProf   ? `<div class="pc-prof-row"><span class="pc-def-label">Tools: </span>${char.toolProf}</div>` : '',
  ].join('');

  const playerLine = char.isCompanion
    ? `Companion of <strong>Perkia</strong>`
    : `Played by <strong>${char.player}</strong>`;

  return `<div class="pc-sheet">
    <div class="pc-header">
      <div class="pc-name">${char.name}${char.isCompanion ? ' <span class="pc-companion-badge">Companion</span>' : ''}</div>
      <div class="pc-meta">${classLink} &middot; ${char.species} &middot; ${char.background} &middot; ${playerLine}</div>
    </div>
    <div class="pc-body">
      <div class="pc-col-left">
        <div class="pc-abilities">${abilitiesHtml}</div>
        <div class="pc-section"><div class="pc-section-title">Saving Throws</div><div class="pc-saves">${savesHtml || '<em style="font-size:12px;color:#aaa">None listed</em>'}</div></div>
        <div class="pc-section"><div class="pc-section-title">Senses</div>${passivesHtml}</div>
        ${defensesHtml ? `<div class="pc-section"><div class="pc-section-title">Defenses</div>${defensesHtml}</div>` : ''}
        ${char.languages?.length ? `<div class="pc-section"><div class="pc-section-title">Languages</div><div class="pc-lang">${char.languages.join(', ')}</div></div>` : ''}
        ${profHtml ? `<div class="pc-section"><div class="pc-section-title">Proficiencies</div>${profHtml}</div>` : ''}
      </div>
      <div class="pc-col-center">
        <div class="pc-combat">${combatHtml}</div>
        <div class="pc-section"><div class="pc-section-title">Attacks</div>${attacksHtml}</div>
        ${featuresHtml ? `<div class="pc-section"><div class="pc-section-title">Features & Abilities</div>${featuresHtml}</div>` : ''}
      </div>
      <div class="pc-col-right">
        <div class="pc-section"><div class="pc-section-title">Skills</div>${skillsHtml}</div>
      </div>
    </div>
  </div>`;
}

let partyData = null;

async function showPartyModal() {
  const m = getFreeModal();
  if (!m) return;
  m.querySelector('.modal-title').textContent = 'The Party';
  m.querySelector('.modal-box').classList.add('modal-box--tall');
  m.querySelector('.modal-body').style.cssText = 'padding:0;display:flex;flex-direction:column;overflow:hidden;background:#f4e8c1';
  m.querySelector('.modal-body').innerHTML = '<div style="padding:20px;color:#7a6050;font-family:sans-serif;font-size:13px">Loading…</div>';
  m.hidden = false;
  requestAnimationFrame(() => m.classList.add('visible'));

  if (!partyData) {
    try {
      const r = await fetch('/api/characters');
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      partyData = await r.json();
    } catch (err) {
      m.querySelector('.modal-body').innerHTML = `<div style="padding:20px;color:#f38ba8;font-family:sans-serif;font-size:13px">${err.message}</div>`;
      return;
    }
  }

  let activeIdx = 0;

  function renderPartyModal() {
    const tabsHtml = partyData.map((c, i) =>
      `<button class="pc-tab${i === activeIdx ? ' active' : ''}" data-idx="${i}">${c.name}</button>`
    ).join('');

    m.querySelector('.modal-body').innerHTML = `
      <div class="pc-tabs">${tabsHtml}</div>
      <div class="pc-scroll">${renderCharacterSheet(partyData[activeIdx])}</div>
    `;

    m.querySelector('.modal-body').querySelectorAll('.pc-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        activeIdx = parseInt(btn.dataset.idx);
        renderPartyModal();
      });
    });
  }

  renderPartyModal();
}

$('tab-party').addEventListener('click', () => {
  showPartyModal();
  if (isMobile()) closeDrawers();
});

// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  fillTree('', fileTree);
  openPath('gm-lore/welcome.md');
  updateManifestBtn();
  initTerminal();
  loadWorldTables();
  if (window.SoundPlayer) SoundPlayer.init();
});

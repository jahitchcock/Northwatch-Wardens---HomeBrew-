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
    open5eModal(btn.dataset['5eUrl']);
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

// Root manifest button is always visible
function updateManifestBtn() {
  btnManifest.hidden = false;
}

// ─── Campaign Tracker ─────────────────────────────────────────────────────────

const panelTracker   = $('panel-tracker');
const trackerContent = $('tracker-content');
const trackerSaved   = $('tracker-saved');
const btnPrint       = $('btn-print');
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
  // Split content into per-adventure blocks by ## headings
  const blocks = content.split(/^## /m).filter(Boolean);
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

// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  fillTree('', fileTree);
  openPath('gm-lore/welcome.md');
  updateManifestBtn();
  initTerminal();
  loadWorldTables();
});

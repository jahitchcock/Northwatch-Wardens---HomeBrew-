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
let shopCart = []; // { name, shopId, gp, sp, qty }
let shopStock = new Map(); // key: `${shopId}::${itemName}` → { qty: number }
let shopStockDate = null; // ISO string of last restock

// ─── Themes ───────────────────────────────────────────────────────────────────

const THEMES = {
  mocha: {
    label: 'Mocha',
    swatch: '#cba6f7',
    vars: {
      '--bg':      '#1e1e2e',
      '--panel':   '#181825',
      '--overlay': '#313244',
      '--text':    '#cdd6f4',
      '--subtext': '#a6adc8',
      '--accent':  '#cba6f7',
      '--border':  '#45475a',
      '--red':     '#f38ba8',
    },
  },
  tavern: {
    label: 'Tavern',
    swatch: '#d4a849',
    vars: {
      '--bg':      '#1a1208',
      '--panel':   '#140e06',
      '--overlay': '#2e2010',
      '--text':    '#f0e0c0',
      '--subtext': '#b89060',
      '--accent':  '#d4a849',
      '--border':  '#4a3820',
      '--red':     '#d45a3a',
    },
  },
  midnight: {
    label: 'Midnight',
    swatch: '#5b8fff',
    vars: {
      '--bg':      '#0a0a0f',
      '--panel':   '#060608',
      '--overlay': '#141420',
      '--text':    '#e8f0ff',
      '--subtext': '#8898cc',
      '--accent':  '#5b8fff',
      '--border':  '#1e2a44',
      '--red':     '#ff4d6a',
    },
  },
  forest: {
    label: 'Forest',
    swatch: '#5cba6c',
    vars: {
      '--bg':      '#0e1a10',
      '--panel':   '#0a1209',
      '--overlay': '#1a2e1c',
      '--text':    '#c8dcc8',
      '--subtext': '#7a9e7a',
      '--accent':  '#5cba6c',
      '--border':  '#2a4a2e',
      '--red':     '#d45a5a',
    },
  },
  arcane: {
    label: 'Arcane',
    swatch: '#48d0c8',
    vars: {
      '--bg':      '#0d0a1a',
      '--panel':   '#080612',
      '--overlay': '#1a1430',
      '--text':    '#c8d8f0',
      '--subtext': '#7a88c8',
      '--accent':  '#48d0c8',
      '--border':  '#2a2050',
      '--red':     '#f05080',
    },
  },
  parchment: {
    label: 'Parchment',
    swatch: '#8b2020',
    vars: {
      '--bg':      '#f0e8d0',
      '--panel':   '#e8ddc0',
      '--overlay': '#d8c8a0',
      '--text':    '#2c1810',
      '--subtext': '#6a4a30',
      '--accent':  '#8b2020',
      '--border':  '#c0a878',
      '--red':     '#c82020',
    },
  },
};

function applyThemeVars(id) {
  const theme = THEMES[id] || THEMES.mocha;
  const root = document.documentElement;
  for (const [prop, val] of Object.entries(theme.vars)) {
    root.style.setProperty(prop, val);
  }
}

function readPrefs() {
  try {
    const entry = document.cookie.split('; ').find(r => r.startsWith('dm_prefs='));
    return entry ? JSON.parse(decodeURIComponent(entry.substring(entry.indexOf('=') + 1))) : {};
  } catch { return {}; }
}

function writePrefs(patch) {
  const prefs = { ...readPrefs(), ...patch };
  document.cookie = 'dm_prefs=' + encodeURIComponent(JSON.stringify(prefs))
    + '; path=/; max-age=31536000; SameSite=Lax';
}

function setTheme(id) {
  if (!THEMES[id]) id = 'mocha';
  applyThemeVars(id);
  writePrefs({ theme: id });
  // Update active indicator in the Tools dropdown
  document.querySelectorAll('.theme-item').forEach(el => {
    el.classList.toggle('active', el.dataset.theme === id);
  });
}

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

// ─── Season Tracker ───────────────────────────────────────────────────────────

const CAMPAIGN_SEASONS = [
  { id: 'greenrise',  label: 'Greenrise',   sub: 'Month 1 · Spring Equinox',  icon: '🌱', pricingKey: 'spring'  },
  { id: 'blooming',   label: 'Blooming',    sub: 'Month 2 · Late Spring',     icon: '🌸', pricingKey: 'spring'  },
  { id: 'highsummer', label: 'Highsummer',  sub: 'Month 3 · Summer',          icon: '☀️', pricingKey: 'summer'  },
  { id: 'waning',     label: 'Waning',      sub: 'Month 4 · Early Autumn',    icon: '🍂', pricingKey: 'autumn'  },
  { id: 'deepfall',   label: 'Deepfall',    sub: 'Month 5 · Autumn',          icon: '🍁', pricingKey: 'autumn'  },
  { id: 'deepwinter', label: 'Deepwinter',  sub: 'Month 6 · Winter Solstice', icon: '❄️', pricingKey: 'winter'  },
  { id: 'thawthaw',   label: 'Thawthaw',    sub: 'Month 7 · Late Winter',     icon: '💧', pricingKey: 'winter'  },
];

let currentCampaignSeason = localStorage.getItem('campaignSeason') || 'greenrise';

function setCampaignSeason(id) {
  currentCampaignSeason = id;
  localStorage.setItem('campaignSeason', id);
  renderSeasonTracker();
  // Sync shop season selector if the shops modal is open
  const sel = document.getElementById('shop-season-sel');
  if (sel) {
    const s = CAMPAIGN_SEASONS.find(s => s.id === id);
    shopSeason = s?.pricingKey || '';
    sel.value = shopSeason;
    sel.dispatchEvent(new Event('change'));
  }
}

function renderSeasonTracker() {
  const s = CAMPAIGN_SEASONS.find(s => s.id === currentCampaignSeason) || CAMPAIGN_SEASONS[0];
  const tracker = $('season-tracker');
  $('season-tracker-icon').textContent = s.icon;
  $('season-tracker-name').textContent = s.label;
  tracker.dataset.season = s.id;
}

function openSeasonPicker() {
  const picker = $('season-picker');
  if (!picker.hidden) { picker.hidden = true; return; }

  picker.innerHTML = '';
  for (const s of CAMPAIGN_SEASONS) {
    const item = document.createElement('div');
    item.className = 'season-picker-item' + (s.id === currentCampaignSeason ? ' active' : '');
    item.innerHTML = `<span class="sp-icon">${s.icon}</span><span>${s.label}</span><span class="sp-sub">${s.sub}</span>`;
    item.addEventListener('click', () => {
      setCampaignSeason(s.id);
      picker.hidden = true;
    });
    picker.appendChild(item);
  }

  // Position below the tracker button
  const rect = $('season-tracker').getBoundingClientRect();
  picker.style.top  = (rect.bottom + 6) + 'px';
  picker.style.left = rect.left + 'px';
  picker.hidden = false;
}

$('season-tracker').addEventListener('click', e => { e.stopPropagation(); openSeasonPicker(); });
document.addEventListener('click', () => { $('season-picker').hidden = true; });

// Init on load
renderSeasonTracker();

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
  const btnSendPlayer = $('btn-send-player');
  btnSendPlayer.hidden = !isHandout;
  if (isHandout) {
    btnSendPlayer.onclick = async () => {
      try {
        const raw      = await fetch(`/raw?file=${encodeURIComponent(p)}`);
        const markdown = await raw.text();
        // If markdown starts with a # heading, omit title (heading serves as title)
        const filename = p.split('/').pop().replace(/\.md$/i, '');
        const title    = markdown.trimStart().startsWith('#') ? '' : filename;
        sendToPlayerScreen({ type: 'handout', title, markdown });
      } catch (e) {
        console.error('Send handout failed:', e);
      }
    };
  }
  if (typeof updateManifestBtn === 'function') updateManifestBtn();
  closeAllDrawers();
  if (window.SoundPlayer) SoundPlayer.suggest(p);
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

  // data-gen-homebrew links — generate stub on first click, then show in modal
  const genLink = e.target.closest('[data-gen-name]');
  if (genLink) {
    e.preventDefault();
    const name  = genLink.dataset.genName;
    const type  = genLink.dataset.genType  || 'ability';
    const desc  = genLink.dataset.genDesc  || '';
    const char  = genLink.dataset.genChar  || '';
    const m = getFreeModal();
    if (!m) return;
    m.querySelector('.modal-title').textContent = name;
    m.querySelector('.modal-body').innerHTML = '<div style="padding:20px;color:#888;font-size:13px">Generating homebrew entry…</div>';
    m.querySelector('.modal-box').classList.remove('modal-box--tall');
    m.hidden = false;
    requestAnimationFrame(() => m.classList.add('visible'));
    fetch('/api/homebrew/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, type, description: desc, character: char }),
    })
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(({ html, path: filePath }) => {
        m.querySelector('.modal-body').innerHTML = `<div style="padding:20px;font-family:'Palatino Linotype',Georgia,serif;font-size:13px;color:#2c1810;line-height:1.6">${html}</div>`;
        // Upgrade the link so future clicks use the file directly
        genLink.removeAttribute('data-gen-name');
        genLink.setAttribute('data-modal-file', filePath);
      })
      .catch(() => { m.querySelector('.modal-body').innerHTML = '<div style="padding:20px;color:#f38ba8;font-size:13px">Generation failed.</div>'; });
    return;
  }

  // data-modal-file links (homebrew markdown files)
  const fileLink = e.target.closest('[data-modal-file]');
  if (fileLink) {
    e.preventDefault();
    const filePath = fileLink.getAttribute('data-modal-file');
    const m = getFreeModal();
    if (!m) return;
    m.querySelector('.modal-title').textContent = fileLink.textContent.trim();
    m.querySelector('.modal-body').innerHTML = '<div style="padding:20px;color:#888;font-size:13px">Loading…</div>';
    m.querySelector('.modal-box').classList.remove('modal-box--tall');
    m.hidden = false;
    requestAnimationFrame(() => m.classList.add('visible'));
    fetch(`/api/homebrew-content?path=${encodeURIComponent(filePath)}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(({ html }) => { m.querySelector('.modal-body').innerHTML = `<div style="padding:20px;font-family:'Palatino Linotype',Georgia,serif;font-size:13px;color:#2c1810;line-height:1.6">${html}</div>`; })
      .catch(() => { m.querySelector('.modal-body').innerHTML = '<div style="padding:20px;color:#f38ba8;font-size:13px">Could not load file.</div>'; });
    return;
  }

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
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
const escapeHtml = escHtml;

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

// Theme picker — delegated click on the dropdown
toolsDropdown.addEventListener('click', e => {
  const item = e.target.closest('.theme-item');
  if (!item) return;
  e.stopPropagation();
  setTheme(item.dataset.theme);
  closeTools();
});

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

const CONDITION_RULES = {
  Blinded:       'Can\'t see. Auto-fail sight checks. Attack rolls against it have advantage; its attacks have disadvantage.',
  Charmed:       'Can\'t attack the charmer. Charmer has advantage on social checks against it.',
  Deafened:      'Can\'t hear. Auto-fail hearing checks.',
  Frightened:    'Disadvantage on ability checks and attack rolls while source of fear is in sight. Can\'t willingly move closer.',
  Grappled:      'Speed = 0. Ends if grappler is incapacitated or creature is moved out of reach.',
  Incapacitated: 'Can\'t take actions or reactions.',
  Invisible:     'Can\'t be seen without magic. Heavily obscured for hiding. Attacks have advantage; attacks against it have disadvantage.',
  Paralyzed:     'Incapacitated, can\'t move or speak. Auto-fail STR/DEX saves. Attacks against have advantage. Hits from within 5 ft are critical.',
  Petrified:     'Transformed to stone. Incapacitated, can\'t move/speak. Resistance to all damage. Immune to poison/disease.',
  Poisoned:      'Disadvantage on attack rolls and ability checks.',
  Prone:         'Crawling costs extra movement. Attacks in melee have advantage; ranged attacks have disadvantage. Its attacks have disadvantage.',
  Restrained:    'Speed = 0. Attack rolls against have advantage. Its attacks/DEX saves have disadvantage.',
  Stunned:       'Incapacitated, can\'t move, can barely speak. Auto-fail STR/DEX saves. Attacks against have advantage.',
  Unconscious:   'Incapacitated, can\'t move/speak, unaware. Drop what\'s held, fall prone. Auto-fail STR/DEX saves. Attacks have advantage; hits within 5 ft are critical.',
  Exhaustion:    'Level 1: Disadv on ability checks. 2: Speed halved. 3: Disadv on attacks/saves. 4: HP max halved. 5: Speed = 0. 6: Death.',
};

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
    // Decrement buff durations on the combatant whose turn just ended
    const ending = s.combatants[s.turnIndex % Math.max(s.combatants.length, 1)];
    if (ending && ending.buffs) {
      ending.buffs = ending.buffs
        .map(b => b.duration === -1 ? b : { ...b, duration: b.duration - 1 })
        .filter(b => b.duration !== 0);
    }
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

async function showStatBlockPopup(name, type) {
  // Remove any existing popup
  document.querySelector('.sb-overlay')?.remove();

  const overlay = document.createElement('div');
  overlay.className = 'sb-overlay';
  overlay.innerHTML = `
    <div class="sb-popup">
      <div class="sb-header">
        <span>${escHtml(name)}</span>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="sb-source" id="sb-source"></span>
          <button class="sb-close" id="sb-close">✕</button>
        </div>
      </div>
      <div class="sb-body" id="sb-body"><div class="sb-loading">Loading…</div></div>
    </div>`;
  document.body.appendChild(overlay);

  overlay.querySelector('#sb-close').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

  try {
    const r = await fetch(`/api/combatant-detail?name=${encodeURIComponent(name)}&type=${encodeURIComponent(type)}`);
    if (!r.ok) throw new Error(`Server error ${r.status}`);
    const data = await r.json();
    overlay.querySelector('#sb-body').innerHTML = data.html;
    const sourceLabels = { npc: 'NPC file', player: 'Character sheet', '5etools': '5etools', none: '' };
    overlay.querySelector('#sb-source').textContent = sourceLabels[data.source] || '';
  } catch (e) {
    overlay.querySelector('#sb-body').innerHTML = `<p style="color:#f38ba8">Error: ${e.message}</p>`;
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
    combatState.combatants.push({ id: ctUid(), name, initiative: init, ac, hpMax: hp, hpCur: hp, type, conditions: [], buffs: [] });
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
          type: 'monster', conditions: [], buffs: [],
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
          id: ctUid(), name, initiative, ac, hpMax: hp, hpCur: hp, type: 'monster', conditions: [], buffs: [],
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
        type: 'npc', conditions: [], buffs: [],
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
        type: 'player', conditions: [], buffs: [],
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
        <button class="ct-buff-btn" title="Add buff/debuff">+ buff</button>
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
        const rules = CONDITION_RULES[cond];
        pill.title = rules ? `${cond}: ${rules}\n\nClick to remove` : 'Click to remove';
        pill.addEventListener('click', () => {
          c.conditions = c.conditions.filter(x => x !== cond);
          renderCombatList(m, sorted, activeCombatant);
        });
        condRow.appendChild(pill);
      });
      list.appendChild(condRow);
    }

    // Buff pills row
    if (c.buffs && c.buffs.length) {
      const buffRow = document.createElement('div');
      buffRow.className = 'ct-buff-wrap';
      buffRow.dataset.for = c.id;
      c.buffs.forEach(buff => {
        const pill = document.createElement('span');
        pill.className = 'ct-buff';
        const durText = buff.duration === -1 ? '∞' : `${buff.duration}r`;
        pill.innerHTML = `<span>${escHtml(buff.name)}</span><span class="ct-buff-dur">${durText}</span><button class="ct-buff-remove" title="Remove buff">✕</button>`;
        pill.querySelector('.ct-buff-remove').addEventListener('click', () => {
          c.buffs = c.buffs.filter(b => b !== buff);
          renderCombatList(m, sorted, activeCombatant);
        });
        buffRow.appendChild(pill);
      });
      list.appendChild(buffRow);
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

    // Name click → stat block popup
    row.querySelector('.ct-name').addEventListener('click', e => {
      // Don't open popup when user is editing (contenteditable focus)
      if (document.activeElement === e.target) return;
      showStatBlockPopup(c.name, c.type);
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

    // Buff form toggle
    row.querySelector('.ct-buff-btn').addEventListener('click', () => {
      const existingForm = list.querySelector(`.ct-buff-form[data-for="${c.id}"]`);
      if (existingForm) { existingForm.remove(); return; }

      const form = document.createElement('div');
      form.className = 'ct-buff-form';
      form.dataset.for = c.id;
      form.innerHTML = `
        <input class="ct-buff-input" placeholder="Bless, Bane, Haste…" style="flex:1;min-width:100px">
        <input class="ct-buff-input ct-buff-dur-input" type="number" placeholder="rnds" min="-1" title="-1 = permanent">
        <button class="ct-add-btn-sm">+ Add</button>`;
      const buffRow = list.querySelector(`.ct-buff-wrap[data-for="${c.id}"]`);
      const insertAfter = buffRow || list.querySelector(`.ct-cond-wrap[data-for="${c.id}"]`) || row;
      insertAfter.insertAdjacentElement('afterend', form);

      const nameInput = form.querySelector('[placeholder="Bless, Bane, Haste…"]');
      const durInput  = form.querySelector('.ct-buff-dur-input');
      const addBtn    = form.querySelector('button');

      const doAdd = () => {
        const name = nameInput.value.trim();
        if (!name) return;
        const duration = parseInt(durInput.value);
        c.buffs = c.buffs || [];
        c.buffs.push({ name, duration: isNaN(duration) ? -1 : duration });
        renderCombatList(m, sorted, activeCombatant);
      };
      addBtn.addEventListener('click', doAdd);
      nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') durInput.focus(); });
      durInput.addEventListener('keydown', e => { if (e.key === 'Enter') doAdd(); });
      nameInput.focus();
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
        combatState.combatants.push({ id: ctUid(), name, initiative: 0, ac, hpMax: hp, hpCur: hp, type: 'monster', conditions: [], buffs: [] });
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

// ─── Player Screen ────────────────────────────────────────────────────────────

async function sendToPlayerScreen(payload) {
  try {
    const r = await fetch('/api/player-screen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!r.ok) console.error('sendToPlayerScreen failed:', r.status);
  } catch (e) {
    console.error('sendToPlayerScreen error:', e);
  }
}

function psDescribe(state) {
  if (!state) return 'Idle';
  if (state.type === 'idle') {
    return state.idleMessage ? `Idle — "${state.idleMessage}"` : 'Idle';
  }
  if (state.type === 'image') {
    return `Image: ${state.caption || state.url.split('/').pop()}`;
  }
  if (state.type === 'text') {
    const preview = state.content.length > 40 ? state.content.slice(0, 40) + '…' : state.content;
    return `Message: "${preview}"`;
  }
  if (state.type === 'handout') return `Handout: ${state.title || '(untitled)'}`;
  if (state.type === 'rulebook') return `Rulebook p.${state.page}`;
  return 'Idle';
}

function psUpdateStrip(state) {
  $('ps-status-text').textContent = psDescribe(state);
  const isIdle = !state || (state.type === 'idle' && !state.idleMessage);
  $('ps-clear').hidden = isIdle;
}

function initPlayerStrip() {
  // Fetch initial state
  fetch('/api/player-screen')
    .then(r => r.json())
    .then(psUpdateStrip)
    .catch(() => {});

  // Live updates via WebSocket
  function connectPlayerWs() {
    const ws = new WebSocket(`ws://${location.host}/ws/player`);
    ws.addEventListener('message', e => {
      try { psUpdateStrip(JSON.parse(e.data)); } catch {}
    });
    ws.addEventListener('close', () => setTimeout(connectPlayerWs, 5000));
  }
  connectPlayerWs();

  // Clear — resets to idle, preserving idleMessage
  $('ps-clear').addEventListener('click', () => {
    fetch('/api/player-screen')
      .then(r => r.json())
      .then(state => sendToPlayerScreen({ type: 'idle', idleMessage: state.idleMessage || null }))
      .catch(() => sendToPlayerScreen({ type: 'idle', idleMessage: null }));
  });

  // Open player screen in new tab
  $('ps-open').addEventListener('click', () => {
    window.open('/player', 'player-screen');
  });

  // Message form
  $('ps-msg-btn').addEventListener('click', () => {
    const wrap = $('ps-msg-wrap');
    wrap.hidden = !wrap.hidden;
    if (!wrap.hidden) { $('ps-idle-wrap').hidden = true; $('ps-msg-input').focus(); }
  });
  $('ps-msg-send').addEventListener('click', () => {
    const content = $('ps-msg-input').value.trim();
    if (!content) return;
    sendToPlayerScreen({ type: 'text', content });
    $('ps-msg-input').value = '';
    $('ps-msg-wrap').hidden = true;
  });
  $('ps-msg-input').addEventListener('keydown', e => {
    if (e.key === 'Enter')  $('ps-msg-send').click();
    if (e.key === 'Escape') $('ps-msg-cancel').click();
  });
  $('ps-msg-cancel').addEventListener('click', () => {
    $('ps-msg-wrap').hidden = true;
    $('ps-msg-input').value = '';
  });

  // Idle message edit form
  $('ps-idle-btn').addEventListener('click', () => {
    const wrap = $('ps-idle-wrap');
    wrap.hidden = !wrap.hidden;
    if (!wrap.hidden) { $('ps-msg-wrap').hidden = true; $('ps-idle-input').focus(); }
  });
  $('ps-idle-save').addEventListener('click', () => {
    const idleMessage = $('ps-idle-input').value.trim() || null;
    sendToPlayerScreen({ type: 'idle', idleMessage });
    $('ps-idle-wrap').hidden = true;
  });
  $('ps-idle-input').addEventListener('keydown', e => {
    if (e.key === 'Enter')  $('ps-idle-save').click();
    if (e.key === 'Escape') $('ps-idle-cancel').click();
  });
  $('ps-idle-cancel').addEventListener('click', () => {
    $('ps-idle-wrap').hidden = true;
    $('ps-idle-input').value = '';
  });
}

// ─── Rulebooks tab ────────────────────────────────────────────────────────────
let _rulebooksTab = null;
$('btn-rulebooks').addEventListener('click', () => {
  if (_rulebooksTab && !_rulebooksTab.closed) {
    _rulebooksTab.focus();
  } else {
    _rulebooksTab = window.open('/rulebooks', 'rulebooks');
  }
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

// ─── Adventures Modal ─────────────────────────────────────────────────────────

$('tab-adventures').addEventListener('click', () => {
  showAdventuresModal();
  if (isMobile()) closeDrawers();
});

async function showAdventuresModal() {
  const m = getFreeModal();
  if (!m) return;
  m.querySelector('.modal-title').textContent = 'Adventures';
  m.querySelector('.modal-box').classList.add('modal-box--tall');
  m.querySelector('.modal-body').style.cssText = 'padding:0;display:flex;flex-direction:column;overflow:hidden;background:#1a1a1a';
  m.querySelector('.modal-body').innerHTML = '<div style="padding:20px;color:#888;font-family:sans-serif;font-size:13px">Loading adventures…</div>';
  m.hidden = false;
  requestAnimationFrame(() => m.classList.add('visible'));

  try {
    const r = await fetch('/api/adventures');
    if (!r.ok) throw new Error('Failed to load adventures');
    const adventures = await r.json();
    if (!adventures.length) {
      m.querySelector('.modal-body').innerHTML = '<div style="padding:20px;color:#888;font-family:sans-serif;font-size:13px">No adventures found.</div>';
      return;
    }
    renderAdventuresModal(m, adventures);
  } catch (err) {
    m.querySelector('.modal-body').innerHTML = `<div style="padding:20px;color:#f38ba8;font-family:sans-serif;font-size:13px">${escapeHtml(err.message)}</div>`;
  }
}

function renderAdventuresModal(m, adventures) {
  // Persistent filter state via localStorage
  let filterSeason = localStorage.getItem('adv-filter-season') || 'all';
  let filterStatus = localStorage.getItem('adv-filter-status') || 'all';

  const allSeasons = [...new Set(adventures.map(a => a.season))].sort();

  const scroll = document.createElement('div');
  scroll.style.cssText = 'flex:1;overflow-y:auto;padding:16px 20px;display:flex;flex-direction:column;';

  // ── Summary + filter bar ─────────────────────────────────────────────────────
  const bar = document.createElement('div');
  bar.className = 'adv-bar';
  scroll.appendChild(bar);

  function recount() {
    const counts = { current: 0, completed: 0, upcoming: 0 };
    for (const a of adventures) counts[a.status] = (counts[a.status] || 0) + 1;
    return counts;
  }

  function renderBar() {
    const counts = recount();
    const seasonBtns = allSeasons.map(s => {
      const n = s.replace('season-', '');
      const active = filterSeason === s ? 'active' : '';
      return `<button class="adv-filter-btn ${active}" data-fs="${s}">${n}</button>`;
    }).join('');
    const statusBtns = ['upcoming','current','completed'].map(st => {
      const labels = { upcoming:'Upcoming', current:'Current', completed:'Done' };
      const active = filterStatus === st ? 'active' : '';
      return `<button class="adv-filter-btn adv-filter-btn--${st} ${active}" data-fst="${st}">${labels[st]}</button>`;
    }).join('');

    bar.innerHTML = `
      <div class="adv-counts">
        <span class="adv-summary-stat"><span class="adv-summary-n current">${counts.current}</span> Current</span>
        <span class="adv-summary-stat"><span class="adv-summary-n completed">${counts.completed}</span> Done</span>
        <span class="adv-summary-stat"><span class="adv-summary-n upcoming">${counts.upcoming}</span> Upcoming</span>
      </div>
      <div class="adv-filters">
        <span class="adv-filter-label">Season</span>
        <button class="adv-filter-btn ${filterSeason === 'all' ? 'active' : ''}" data-fs="all">All</button>
        ${seasonBtns}
        <span class="adv-filter-sep"></span>
        <span class="adv-filter-label">Status</span>
        <button class="adv-filter-btn ${filterStatus === 'all' ? 'active' : ''}" data-fst="all">All</button>
        ${statusBtns}
      </div>
    `;

    bar.querySelectorAll('[data-fs]').forEach(btn => {
      btn.addEventListener('click', () => {
        filterSeason = btn.dataset.fs;
        localStorage.setItem('adv-filter-season', filterSeason);
        buildGrids();
        renderBar();
      });
    });
    bar.querySelectorAll('[data-fst]').forEach(btn => {
      btn.addEventListener('click', () => {
        filterStatus = btn.dataset.fst;
        localStorage.setItem('adv-filter-status', filterStatus);
        buildGrids();
        renderBar();
      });
    });
  }

  // ── Grid area ────────────────────────────────────────────────────────────────
  const gridArea = document.createElement('div');
  gridArea.style.cssText = 'flex:1;';
  scroll.appendChild(gridArea);

  function buildCard(adv) {
    const card = document.createElement('div');
    card.className = `adv-card adv-card--${adv.status}`;

    const rating = parseInt(adv.mysteryRating, 10) || 0;
    const dots = Array.from({length: 5}, (_, i) =>
      `<span class="adv-dot ${i < rating ? 'on' : ''}"></span>`).join('');
    const metaParts = [];
    if (adv.levels) metaParts.push(`<b>Lv</b> ${escapeHtml(adv.levels)}`);
    if (adv.sessions) metaParts.push(`<b>Sess</b> ${escapeHtml(adv.sessions)}`);
    if (adv.duration) metaParts.push(`<b>Dur</b> ${escapeHtml(adv.duration)}`);

    card.innerHTML = `
      <div class="adv-card-top">
        <div class="adv-title">${escapeHtml(adv.label)}</div>
        <button class="adv-open-btn" title="Open adventure file">↗</button>
      </div>
      <div class="adv-meta2">
        ${metaParts.join('<span class="adv-sep">·</span>')}
      </div>
      <div class="adv-meta2" style="margin-top:2px">
        ${adv.type ? `<span style="color:#777">${escapeHtml(adv.type)}</span>` : ''}
        <span class="adv-dots" title="Mystery ${rating}/5">${dots}</span>
        ${adv.arc ? `<span class="adv-arc">${escapeHtml(adv.arc)}</span>` : ''}
      </div>
      ${adv.synopsis ? `<div class="adv-synopsis">${escapeHtml(adv.synopsis)}</div>` : ''}
      <div class="adv-status-row">
        <button class="adv-set-status ${adv.status==='upcoming'?'active':''}" data-status="upcoming">Upcoming</button>
        <button class="adv-set-status ${adv.status==='current'?'active':''}" data-status="current">Current</button>
        <button class="adv-set-status ${adv.status==='completed'?'active':''}" data-status="completed">Done</button>
      </div>`;

    card.querySelector('.adv-open-btn').addEventListener('click', e => {
      e.stopPropagation();
      openPath(adv.path);
      closeTopModal();
    });

    card.querySelectorAll('.adv-set-status').forEach(btn => {
      btn.addEventListener('click', async e => {
        e.stopPropagation();
        const newStatus = btn.dataset.status;
        adv.status = newStatus;
        // If status filter is active and card no longer matches, rebuild
        if (filterStatus !== 'all' && filterStatus !== newStatus) {
          buildGrids();
        } else {
          card.className = `adv-card adv-card--${newStatus}`;
          card.querySelectorAll('.adv-set-status').forEach(b =>
            b.classList.toggle('active', b.dataset.status === newStatus));
        }
        renderBar(); // update counts
        try {
          const r = await fetch('/api/adventures/status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path: adv.path, status: newStatus }),
          });
          if (!r.ok) console.warn('Status save failed:', await r.text());
        } catch (err) {
          console.warn('Status save error:', err);
        }
      });
    });

    return card;
  }

  function buildGrids() {
    gridArea.innerHTML = '';
    const filtered = adventures.filter(a =>
      (filterSeason === 'all' || a.season === filterSeason) &&
      (filterStatus === 'all' || a.status === filterStatus)
    );

    if (!filtered.length) {
      gridArea.innerHTML = '<div style="padding:40px;text-align:center;color:#555;font-family:sans-serif;font-size:13px">No adventures match the current filters.</div>';
      return;
    }

    const bySeason = {};
    for (const a of filtered) {
      if (!bySeason[a.season]) bySeason[a.season] = [];
      bySeason[a.season].push(a);
    }
    for (const season of Object.keys(bySeason).sort()) {
      const header = document.createElement('div');
      header.className = 'adv-header';
      header.innerHTML = `<span class="adv-season-badge">Season ${season.replace('season-', '')}</span>`;
      gridArea.appendChild(header);
      const grid = document.createElement('div');
      grid.className = 'adv-grid';
      for (const adv of bySeason[season]) grid.appendChild(buildCard(adv));
      gridArea.appendChild(grid);
    }
  }

  renderBar();
  buildGrids();

  m.querySelector('.modal-body').innerHTML = '';
  m.querySelector('.modal-body').appendChild(scroll);
}

// ─── NPC Modal ─────────────────────────────────────────────────────────────────

async function showNpcsModal() {
  const m = getFreeModal();
  if (!m) return;
  m.querySelector('.modal-title').textContent = 'NPCs';
  m.querySelector('.modal-box').classList.add('modal-box--tall');
  m.querySelector('.modal-body').style.cssText = 'padding:0;display:flex;flex-direction:column;overflow:hidden;background:#1a1a1a';
  m.querySelector('.modal-body').innerHTML = '<div style="padding:20px;color:#888;font-family:sans-serif;font-size:13px">Loading NPCs…</div>';
  m.hidden = false;
  requestAnimationFrame(() => m.classList.add('visible'));

  try {
    const r = await fetch('/api/npcs');
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const npcs = await r.json();
    renderRefModal(m, npcs, 'npc');
  } catch (err) {
    m.querySelector('.modal-body').innerHTML = `<div style="padding:20px;color:#f38ba8;font-family:sans-serif;font-size:13px">${err.message}</div>`;
  }
}

// ─── Location Modal ────────────────────────────────────────────────────────────

async function showLocationsModal() {
  const m = getFreeModal();
  if (!m) return;
  m.querySelector('.modal-title').textContent = 'Locations';
  m.querySelector('.modal-box').classList.add('modal-box--tall');
  m.querySelector('.modal-body').style.cssText = 'padding:0;display:flex;flex-direction:column;overflow:hidden;background:#1a1a1a';
  m.querySelector('.modal-body').innerHTML = '<div style="padding:20px;color:#888;font-family:sans-serif;font-size:13px">Loading locations…</div>';
  m.hidden = false;
  requestAnimationFrame(() => m.classList.add('visible'));

  try {
    const r = await fetch('/api/locations');
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const locations = await r.json();
    renderRefModal(m, locations, 'location');
  } catch (err) {
    m.querySelector('.modal-body').innerHTML = `<div style="padding:20px;color:#f38ba8;font-family:sans-serif;font-size:13px">${err.message}</div>`;
  }
}

// Shared renderer for NPC / Location modals
function renderRefModal(m, items, type) {
  const isNpc = type === 'npc';

  // Build filter buttons from unique values
  const filterMap = {};
  for (const item of items) {
    const val = isNpc ? (item.affiliation || 'Unaffiliated') : (item.region || 'Unknown');
    if (!filterMap[val]) filterMap[val] = 0;
    filterMap[val]++;
  }
  const filters = Object.keys(filterMap).sort();
  let activeFilter = 'All';
  let searchTerm = '';

  function build() {
    const filtered = items.filter(item => {
      const group = isNpc ? (item.affiliation || 'Unaffiliated') : (item.region || 'Unknown');
      if (activeFilter !== 'All' && group !== activeFilter) return false;
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (item.name || '').toLowerCase().includes(term) ||
        (item.synopsis || '').toLowerCase().includes(term) ||
        (item.tags || '').toLowerCase().includes(term);
    });

    const filterHtml = `<div class="ref-filter">
      <span style="color:#666;font-size:10px;text-transform:uppercase;letter-spacing:0.05em">Filter:</span>
      <button class="${activeFilter === 'All' ? 'active' : ''}" data-filter="All">All (${items.length})</button>
      ${filters.map(f => `<button class="${activeFilter === f ? 'active' : ''}" data-filter="${escapeHtml(f)}">${escapeHtml(f)} (${filterMap[f]})</button>`).join('')}
    </div>`;

    const gridHtml = filtered.length ? filtered.map(item => {
      const metaItems = [];
      if (isNpc) {
        if (item.role) metaItems.push(`<span class="ref-tag">${escapeHtml(item.role)}</span>`);
        if (item.status) metaItems.push(`<span class="ref-tag ref-tag--${escapeHtml((item.status||'').toLowerCase())}">${escapeHtml(item.status)}</span>`);
        if (item.location) metaItems.push(`<span>${escapeHtml(item.location)}</span>`);
        if (item.ac != null) metaItems.push(`<span class="ref-stat">AC&nbsp;${item.ac}</span>`);
        if (item.hp != null) metaItems.push(`<span class="ref-stat">HP&nbsp;${item.hp}</span>`);
      } else {
        if (item.type) metaItems.push(`<span class="ref-tag">${escapeHtml(item.type)}</span>`);
        if (item.status) metaItems.push(`<span class="ref-tag">${escapeHtml(item.status)}</span>`);
        if (item.region) metaItems.push(`<span>${escapeHtml(item.region)}</span>`);
      }

      const thumb = (isNpc && item.portrait)
        ? `<img class="ref-thumb" src="${escapeHtml(item.portrait)}" alt="" loading="lazy">`
        : '';

      return `<div class="ref-card${isNpc ? ' ref-card--npc' : ''}" data-path="${escapeHtml(item.path)}" data-idx="${escapeHtml(String(items.indexOf(item)))}">
        ${thumb}
        <div class="ref-card-body">
          <div class="ref-title">${escapeHtml(item.name)}</div>
          <div class="ref-meta">${metaItems.join('')}</div>
          ${item.synopsis ? `<div class="ref-synopsis">${escapeHtml(item.synopsis)}</div>` : ''}
        </div>
      </div>`;
    }).join('') : '<div class="ref-empty">No matches</div>';

    m.querySelector('.modal-body').innerHTML = `
      <div class="ref-search">
        <input type="text" placeholder="Search ${type}s…" value="${escapeHtml(searchTerm)}">
      </div>
      ${filterHtml}
      <div class="ref-scroll">
        <div class="ref-grid">${gridHtml}</div>
      </div>
    `;

    // Wire search
    const input = m.querySelector('.ref-search input');
    input.addEventListener('input', () => { searchTerm = input.value; build(); });

    // Wire filters
    m.querySelectorAll('.ref-filter button').forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.filter;
        build();
      });
    });

    // Wire card clicks
    m.querySelectorAll('.ref-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.idx, 10);
        if (isNpc) {
          showNpcDetail(m, items[idx], items, build);
        } else if (type === 'location') {
          showLocationDetail(m, items[idx], build);
        } else {
          openPath(card.dataset.path);
          closeTopModal();
        }
      });
    });
  }

  build();
}

// ─── NPC Detail View ────────────────────────────────────────────────────────────

async function showNpcDetail(m, npc, allNpcs, backFn) {
  const metaParts = [];
  if (npc.role) metaParts.push(`<span class="ref-tag">${escapeHtml(npc.role)}</span>`);
  if (npc.affiliation) metaParts.push(`<span class="ref-tag">${escapeHtml(npc.affiliation)}</span>`);
  if (npc.status) metaParts.push(`<span class="ref-tag ref-tag--${escapeHtml((npc.status||'').toLowerCase())}">${escapeHtml(npc.status)}</span>`);

  const statParts = [];
  if (npc.location) statParts.push(`<span><b>Location:</b> ${escapeHtml(npc.location)}</span>`);
  if (npc.introduced) statParts.push(`<span><b>Introduced:</b> ${escapeHtml(npc.introduced)}</span>`);

  m.querySelector('.modal-body').innerHTML = `
    <div class="npc-detail">
      <button class="npc-back-btn">← Back to NPCs</button>
      <div class="npc-detail-hero">
        ${npc.portrait ? `<img class="npc-detail-portrait" src="${escapeHtml(npc.portrait)}" alt="${escapeHtml(npc.name)}">` : '<div class="npc-detail-portrait npc-no-portrait"></div>'}
        <div class="npc-detail-info">
          <div class="npc-detail-name">${escapeHtml(npc.name)}</div>
          <div class="ref-meta" style="margin-bottom:6px">${metaParts.join('')}</div>
          <div class="npc-detail-stats">${statParts.join('')}</div>
          ${npc.synopsis ? `<div class="npc-detail-synopsis">${escapeHtml(npc.synopsis)}</div>` : ''}
          <div class="npc-hero-actions">
            ${npc.ac != null ? `<div class="npc-stat-frame"><span class="nsf-label">AC</span><span class="nsf-val">${npc.ac}</span></div>` : ''}
            ${npc.hp != null ? `<div class="npc-stat-frame"><span class="nsf-label">HP</span><span class="nsf-val">${npc.hp}</span></div>` : ''}
            ${npc.speed ? `<div class="npc-stat-frame"><span class="nsf-label">SPD</span><span class="nsf-val">${escapeHtml(npc.speed)}</span></div>` : ''}
            <button class="npc-detail-open">Open full file</button>
            ${npc.portrait ? `<button class="npc-send-portrait" data-portrait="${escapeHtml(npc.portrait)}" data-caption="${escapeHtml(npc.name)}">📺 Send Portrait</button>` : ''}
          </div>
        </div>
      </div>
      <div class="npc-stat-block" style="padding:0 20px 20px">
        <div style="color:#666;font-family:sans-serif;font-size:12px;padding:12px 0">Loading stat block…</div>
      </div>
    </div>
  `;

  m.querySelector('.npc-back-btn').addEventListener('click', backFn);
  m.querySelector('.npc-detail-open').addEventListener('click', () => {
    openPath(npc.path);
    closeTopModal();
  });
  const sendPortraitBtn = m.querySelector('.npc-send-portrait');
  if (sendPortraitBtn) {
    sendPortraitBtn.addEventListener('click', () => {
      sendToPlayerScreen({
        type:    'image',
        url:     sendPortraitBtn.dataset.portrait,
        caption: sendPortraitBtn.dataset.caption,
      });
    });
  }

  // Load stat block section asynchronously
  try {
    const r = await fetch(`/api/npc-statblock?path=${encodeURIComponent(npc.path)}`);
    const data = await r.json();
    const statEl = m.querySelector('.npc-stat-block');
    if (statEl) {
      if (data.html) {
        statEl.innerHTML = `<div class="npc-stat-section-label">Stat Block</div><div class="npc-stat-html">${data.html}</div>`;
      } else {
        statEl.innerHTML = '';
      }
    }
  } catch {
    const statEl = m.querySelector('.npc-stat-block');
    if (statEl) statEl.innerHTML = '';
  }
}

// ─── Location Detail View ──────────────────────────────────────────────────────

async function showLocationDetail(m, loc, backFn) {
  const metaParts = [];
  if (loc.type) metaParts.push(`<span class="ref-tag">${escapeHtml(loc.type)}</span>`);
  if (loc.region) metaParts.push(`<span class="ref-tag">${escapeHtml(loc.region)}</span>`);
  if (loc.status) metaParts.push(`<span class="ref-tag ref-tag--${escapeHtml((loc.status||'').toLowerCase())}">${escapeHtml(loc.status)}</span>`);

  const statParts = [];
  if (loc.introduced) statParts.push(`<span><b>Introduced:</b> ${escapeHtml(loc.introduced)}</span>`);

  m.querySelector('.modal-body').innerHTML = `
    <div class="npc-detail">
      <button class="npc-back-btn">← Back to Locations</button>
      <div class="loc-detail-hero">
        <div class="loc-detail-icon">${escapeHtml((loc.type || '?').slice(0,1).toUpperCase())}</div>
        <div class="npc-detail-info">
          <div class="npc-detail-name">${escapeHtml(loc.name)}</div>
          <div class="ref-meta" style="margin-bottom:6px">${metaParts.join('')}</div>
          <div class="npc-detail-stats">${statParts.join('')}</div>
          ${loc.synopsis ? `<div class="npc-detail-synopsis">${escapeHtml(loc.synopsis)}</div>` : ''}
          <div class="npc-hero-actions">
            <button class="npc-detail-open">Open full file</button>
          </div>
        </div>
      </div>
      <div class="npc-stat-block" style="padding:0 20px 20px">
        <div style="color:#666;font-family:sans-serif;font-size:12px;padding:12px 0">Loading…</div>
      </div>
    </div>
  `;

  m.querySelector('.npc-back-btn').addEventListener('click', backFn);
  m.querySelector('.npc-detail-open').addEventListener('click', () => {
    openPath(loc.path);
    closeTopModal();
  });

  try {
    const r = await fetch(`/api/location-content?path=${encodeURIComponent(loc.path)}`);
    const data = await r.json();
    const el = m.querySelector('.npc-stat-block');
    if (el && data.html) {
      el.innerHTML = `<div class="npc-stat-html loc-content-html">${data.html}</div>`;
    } else if (el) {
      el.innerHTML = '';
    }
  } catch {
    const el = m.querySelector('.npc-stat-block');
    if (el) el.innerHTML = '';
  }
}

$('tab-npcs').addEventListener('click', () => {
  showNpcsModal();
  if (isMobile()) closeDrawers();
});

$('tab-locations').addEventListener('click', () => {
  showLocationsModal();
  if (isMobile()) closeDrawers();
});

// ─── Homebrew Modal ────────────────────────────────────────────────────────────

async function showHomebrewModal() {
  const m = getFreeModal();
  if (!m) return;
  m.querySelector('.modal-title').textContent = 'Homebrew';
  m.querySelector('.modal-box').classList.add('modal-box--tall');
  m.querySelector('.modal-body').style.cssText = 'padding:0;display:flex;flex-direction:column;overflow:hidden;background:#1a1a1a';
  m.querySelector('.modal-body').innerHTML = '<div style="padding:20px;color:#888;font-family:sans-serif;font-size:13px">Loading homebrew…</div>';
  m.hidden = false;
  requestAnimationFrame(() => m.classList.add('visible'));
  try {
    const r = await fetch('/api/homebrew');
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const items = await r.json();
    renderHomebrewModal(m, items);
  } catch (err) {
    m.querySelector('.modal-body').innerHTML = `<div style="padding:20px;color:#f38ba8;font-family:sans-serif;font-size:13px">${escapeHtml(err.message)}</div>`;
  }
}

const HB_RARITY_CLASS = {
  'common': 'hb-r-common', 'uncommon': 'hb-r-uncommon', 'rare': 'hb-r-rare',
  'very rare': 'hb-r-very-rare', 'legendary': 'hb-r-legendary', 'artifact': 'hb-r-artifact',
};

function renderHomebrewModal(m, items) {
  // Collect unique types for filter buttons
  const typeCounts = {};
  for (const it of items) {
    const t = it.type || 'item';
    typeCounts[t] = (typeCounts[t] || 0) + 1;
  }
  const types = Object.keys(typeCounts).sort();

  let activeType = 'all';
  let searchTerm = '';

  function build() {
    const filtered = items.filter(it => {
      if (activeType !== 'all' && it.type !== activeType) return false;
      if (!searchTerm) return true;
      const q = searchTerm.toLowerCase();
      return it.name.toLowerCase().includes(q) ||
        (it.synopsis || '').toLowerCase().includes(q) ||
        (it.tags || '').toLowerCase().includes(q) ||
        (it.source || '').toLowerCase().includes(q);
    });

    const filterHtml = `<div class="ref-filter">
      <span style="color:#666;font-size:10px;text-transform:uppercase;letter-spacing:0.05em">Type:</span>
      <button class="${activeType === 'all' ? 'active' : ''}" data-type="all">All (${items.length})</button>
      ${types.map(t => `<button class="${activeType === t ? 'active' : ''}" data-type="${escapeHtml(t)}">${escapeHtml(t.charAt(0).toUpperCase() + t.slice(1))} (${typeCounts[t]})</button>`).join('')}
    </div>`;

    const gridHtml = filtered.length ? filtered.map((it, idx) => {
      const rarityClass = HB_RARITY_CLASS[(it.rarity || '').toLowerCase()] || '';
      const rarityLabel = it.rarity ? `<span class="hb-rarity ${rarityClass}">${escapeHtml(it.rarity)}</span>` : '';
      const attuneLabel = it.attunement ? `<span class="ref-tag">Attunement</span>` : '';
      const typeTag = `<span class="ref-tag hb-type-tag">${escapeHtml(it.type)}</span>`;
      const sourceSpan = it.source ? `<span style="color:#666;font-size:10px">${escapeHtml(it.source)}</span>` : '';

      return `<div class="ref-card hb-card" data-idx="${idx}">
        <div class="hb-card-header">
          <div class="ref-title">${escapeHtml(it.name)}</div>
          ${rarityLabel}
        </div>
        <div class="ref-meta">${typeTag}${attuneLabel}${sourceSpan}</div>
        ${it.synopsis ? `<div class="ref-synopsis">${escapeHtml(it.synopsis)}</div>` : ''}
      </div>`;
    }).join('') : '<div class="ref-empty">No matches</div>';

    m.querySelector('.modal-body').innerHTML = `
      <div class="ref-search">
        <input type="text" placeholder="Search homebrew…" value="${escapeHtml(searchTerm)}">
      </div>
      ${filterHtml}
      <div class="ref-scroll"><div class="ref-grid">${gridHtml}</div></div>
    `;

    m.querySelector('.ref-search input').addEventListener('input', e => { searchTerm = e.target.value; build(); });
    m.querySelectorAll('.ref-filter button').forEach(btn =>
      btn.addEventListener('click', () => { activeType = btn.dataset.type; build(); }));
    m.querySelectorAll('.hb-card').forEach(card =>
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.idx, 10);
        showHomebrewDetail(m, filtered[idx], build);
      }));
  }

  build();
}

async function showHomebrewDetail(m, item, backFn) {
  const rarityClass = HB_RARITY_CLASS[(item.rarity || '').toLowerCase()] || '';
  const metaParts = [
    `<span class="ref-tag hb-type-tag">${escapeHtml(item.type)}</span>`,
    item.rarity ? `<span class="hb-rarity ${rarityClass}">${escapeHtml(item.rarity)}</span>` : '',
    item.attunement ? `<span class="ref-tag">Requires Attunement</span>` : '',
  ].filter(Boolean);

  m.querySelector('.modal-body').innerHTML = `
    <div class="npc-detail">
      <button class="npc-back-btn">← Back to Homebrew</button>
      <div class="hb-detail-hero">
        <div class="hb-detail-type-icon">${escapeHtml((item.type||'?').slice(0,2).toUpperCase())}</div>
        <div class="npc-detail-info">
          <div class="npc-detail-name">${escapeHtml(item.name)}</div>
          <div class="ref-meta" style="margin-bottom:6px">${metaParts.join('')}</div>
          ${item.source ? `<div class="npc-detail-stats"><span><b>Source:</b> ${escapeHtml(item.source)}</span></div>` : ''}
          ${item.synopsis ? `<div class="npc-detail-synopsis">${escapeHtml(item.synopsis)}</div>` : ''}
          <div class="npc-hero-actions">
            <button class="npc-detail-open">Open full file</button>
          </div>
        </div>
      </div>
      <div class="npc-stat-block" style="padding:0 20px 20px">
        <div style="color:#666;font-family:sans-serif;font-size:12px;padding:8px 0">Loading…</div>
      </div>
    </div>
  `;

  m.querySelector('.npc-back-btn').addEventListener('click', backFn);
  m.querySelector('.npc-detail-open').addEventListener('click', () => { openPath(item.path); closeTopModal(); });

  try {
    const r = await fetch(`/api/homebrew-content?path=${encodeURIComponent(item.path)}`);
    const data = await r.json();
    const el = m.querySelector('.npc-stat-block');
    if (el && data.html) {
      el.innerHTML = `<div class="npc-stat-html hb-content-html">${data.html}</div>`;
    } else if (el) el.innerHTML = '';
  } catch {
    const el = m.querySelector('.npc-stat-block'); if (el) el.innerHTML = '';
  }
}

document.getElementById('tab-homebrew') && document.getElementById('tab-homebrew').addEventListener('click', () => {
  showHomebrewModal();
  if (isMobile()) closeDrawers();
});

// ─── Shop Seasonal Pricing ────────────────────────────────────────────────────

let shopSeason = ''; // '', 'spring', 'summer', 'autumn', 'winter'

// Rules from gm-lore/practical/common-goods.md
// mult: null = not available this season
const SEASON_RULES = {
  spring: [
    { cats: ['healing', 'potions'],                          mult: 1.25, label: '+25% Greenrise (healing scarce after Deepwinter)' },
    { cats: ['mounts'], nameMatch: /horse|mule|pony|donkey|camel|rental/i, mult: 0.75, label: '-25% Greenrise (caravans resume)' },
    { cats: ['mounts'],                                      mult: 0.75, label: '-25% Greenrise (caravans resume)' },
    { cats: ['services'], nameMatch: /guide/i,               mult: 0.75, label: '-25% Greenrise (caravans resume)' },
  ],
  summer: [
    { cats: ['food-drink'],                                  mult: 0.90, label: '-10% Highsummer (fresh produce)' },
  ],
  autumn: [
    { cats: ['food-drink'],                                  mult: 0.80, label: '-20% Deepfall (harvest surplus)' },
    { cats: ['clothing'],                                    mult: 1.50, label: '+50% Deepfall (Deepwinter gear demand)' },
    { cats: ['mounts'],                                      mult: 1.25, label: '+25% Deepfall (last caravans before Deepwinter)' },
    { cats: ['services'], nameMatch: /guide/i,               mult: 1.25, label: '+25% Deepfall (last caravans before Deepwinter)' },
  ],
  winter: [
    { nameMatch: /firewood/i,                                mult: 5.00, label: '5× Deepwinter (firewood)' },
    { cats: ['food-drink'],                                  mult: 1.50, label: '+50% Deepwinter (stored goods only)' },
    { cats: ['potions'], nameMatch: /healing/i,              mult: 2.00, label: '+100% Deepwinter (life-saving; scarce)' },
    { cats: ['healing', 'magical-healing'],                  mult: 2.00, label: '+100% Deepwinter (scarcity)' },
    { cats: ['mounts'],                                      mult: null,  label: 'Unavailable — Deepwinter roads closed' },
    { cats: ['services'], nameMatch: /guide|rental/i,        mult: null,  label: 'Unavailable — Deepwinter roads closed' },
  ],
};

function getSeasonMod(season, category, itemName) {
  if (!season || !SEASON_RULES[season]) return null;
  const lname = itemName.toLowerCase();
  for (const rule of SEASON_RULES[season]) {
    const catOk  = !rule.cats || rule.cats.includes(category);
    const nameOk = !rule.nameMatch || rule.nameMatch.test(lname);
    if (catOk && nameOk) return rule; // first match wins
  }
  return null;
}

function applySeasonMult(gp, sp, mult) {
  if (mult === null) return null; // item unavailable
  const totalSp = Math.round((gp * 10 + sp) * mult);
  return { gp: Math.floor(totalSp / 10), sp: totalSp % 10 };
}

// ─── Shop Stock Randomizer ────────────────────────────────────────────────────

const STOCK_ODDS = { available: 0.85, limited: 0.50, rare: 0.20 };
const STOCK_QTY  = {
  available: () => Math.floor(Math.random() * 6) + 3,  // 3–8
  limited:   () => Math.floor(Math.random() * 3) + 1,  // 1–3
  rare:      () => 1,
};

function isServiceItem(it) {
  // Free services and section-header rows are always available with no qty
  return (it.gp === 0 && it.sp === 0) || it.name.startsWith('—');
}

function rollStockForShops(shops) {
  shopStock.clear();
  for (const shop of shops) {
    for (const it of shop.items) {
      const key = `${shop.id}::${it.name}`;
      if (isServiceItem(it)) {
        shopStock.set(key, { qty: null }); // always available, no qty
        continue;
      }
      const odds = STOCK_ODDS[it.stock] ?? 0.5;
      const inStock = Math.random() < odds;
      const qty = inStock ? (STOCK_QTY[it.stock] ?? STOCK_QTY.limited)() : 0;
      shopStock.set(key, { qty });
    }
  }
  shopStockDate = new Date().toLocaleString('en-US', { month:'short', day:'numeric', hour:'numeric', minute:'2-digit' });
  try {
    sessionStorage.setItem('shopStock', JSON.stringify([...shopStock.entries()]));
    sessionStorage.setItem('shopStockDate', shopStockDate);
  } catch {}
}

function loadStockFromSession() {
  try {
    const raw = sessionStorage.getItem('shopStock');
    if (!raw) return false;
    shopStock = new Map(JSON.parse(raw));
    shopStockDate = sessionStorage.getItem('shopStockDate') || null;
    return shopStock.size > 0;
  } catch { return false; }
}

function getItemStock(shopId, itemName) {
  return shopStock.get(`${shopId}::${itemName}`) ?? { qty: null };
}

// ─── Shops Modal ──────────────────────────────────────────────────────────────

document.getElementById('tab-shops') && document.getElementById('tab-shops').addEventListener('click', () => {
  showShopsModal();
  if (isMobile()) closeDrawers();
});

async function showShopsModal() {
  const m = getFreeModal();
  if (!m) return;
  m.querySelector('.modal-title').textContent = 'Shops';
  m.querySelector('.modal-box').classList.add('modal-box--tall');
  const body = m.querySelector('.modal-body');
  body.style.cssText = 'padding:0;display:flex;flex-direction:column;overflow:hidden;background:#1a1a1a';
  body.innerHTML = '<div style="padding:20px;color:#888;font-family:sans-serif;font-size:13px">Loading shops…</div>';
  m.hidden = false;
  requestAnimationFrame(() => m.classList.add('visible'));

  try {
    const r = await fetch('/api/shops');
    if (!r.ok) throw new Error('Failed to load shops');
    const shops = await r.json();
    if (!shops.length) {
      body.innerHTML = '<div style="padding:20px;color:#888;font-family:sans-serif;font-size:13px">No shops found.</div>';
      return;
    }
    // Sync shopSeason from the campaign season tracker
    const trackerSeason = CAMPAIGN_SEASONS.find(s => s.id === currentCampaignSeason);
    if (trackerSeason) shopSeason = trackerSeason.pricingKey;
    // Load persisted stock or roll fresh
    if (!loadStockFromSession()) rollStockForShops(shops);
    renderShopsModal(m, shops);
  } catch (err) {
    body.innerHTML = `<div style="padding:20px;color:#f38ba8;font-family:sans-serif;font-size:13px">${escapeHtml(err.message)}</div>`;
  }
}

function renderShopsModal(m, shops) {
  const body = m.querySelector('.modal-body');

  body.innerHTML = `
    <div id="shop-scroll" style="flex:1;overflow-y:auto;padding:16px 20px">
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px">
        <input id="shop-search" type="search" placeholder="Search items…"
          style="flex:1;min-width:150px;padding:6px 10px;background:#2a2a2a;border:1px solid #444;color:#e0e0e0;border-radius:4px;font-size:13px">
        <select id="shop-cat-filter"
          style="padding:6px 8px;background:#2a2a2a;border:1px solid #444;color:#e0e0e0;border-radius:4px;font-size:13px">
          <option value="">All categories</option>
        </select>
        <select id="shop-shop-filter"
          style="padding:6px 8px;background:#2a2a2a;border:1px solid #444;color:#e0e0e0;border-radius:4px;font-size:13px">
          <option value="">All shops</option>
        </select>
        <label style="display:flex;align-items:center;gap:6px;font-family:sans-serif;font-size:12px;color:#888;cursor:pointer">
          <input type="checkbox" id="shop-hide-oos" style="cursor:pointer"> Hide out of stock
        </label>
        <select id="shop-season-sel"
          style="padding:6px 8px;background:#2a2035;border:1px solid #4a3a6a;color:#c9a0f0;border-radius:4px;font-size:13px">
          <option value="">No season</option>
          <option value="spring">🌱 Greenrise</option>
          <option value="summer">☀️ Highsummer</option>
          <option value="autumn">🍂 Deepfall</option>
          <option value="winter">❄️ Deepwinter</option>
        </select>
        <button id="shop-restock-btn" style="padding:4px 10px;background:#2a2035;border:1px solid #5a3a7a;color:#c9a0f0;border-radius:4px;cursor:pointer;font-size:12px;white-space:nowrap">🎲 Restock</button>
        <span id="shop-stock-date" style="font-family:sans-serif;font-size:11px;color:#555;white-space:nowrap"></span>
      </div>
      <div id="shop-items-list"></div>
      <div style="margin-top:24px;border-top:1px solid #2a2a2a;padding-top:16px">
        <div style="color:#666;font-size:11px;font-weight:600;letter-spacing:.08em;margin-bottom:8px">SEARCH 5ETOOLS ITEMS</div>
        <input id="shop-5e-search" type="search" placeholder="Search 5etools item database…"
          style="width:100%;box-sizing:border-box;padding:6px 10px;background:#2a2a2a;border:1px solid #444;color:#e0e0e0;border-radius:4px;font-size:13px;margin-bottom:8px">
        <div id="shop-5e-results"></div>
      </div>
    </div>
    <div id="shop-cart-bar" style="border-top:1px solid #333;padding:8px 20px;background:#111;display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-family:sans-serif;font-size:13px">
      <span style="color:#888">Cart:</span>
      <span id="shop-cart-count" style="color:#cba135;font-weight:600">0 items</span>
      <span id="shop-cart-total" style="color:#aaa"></span>
      <button id="shop-cart-view" style="padding:3px 9px;background:#1a2a3a;border:1px solid #2a4a6a;color:#89b4fa;border-radius:4px;cursor:pointer;font-size:12px" hidden>View</button>
      <button id="shop-cart-clear" style="padding:3px 9px;background:#3a2020;border:1px solid #6a3030;color:#f38ba8;border-radius:4px;cursor:pointer;font-size:12px" hidden>Clear</button>
    </div>`;

  // Populate shop filter
  const shopSel = body.querySelector('#shop-shop-filter');
  for (const s of shops) {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = `${s.name} (${s.location})`;
    shopSel.appendChild(opt);
  }

  // Collect all categories
  const allCats = new Set();
  for (const s of shops) for (const it of s.items) allCats.add(it.category);
  const catSel = body.querySelector('#shop-cat-filter');
  for (const c of [...allCats].sort()) {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c.replace(/-/g, ' ');
    catSel.appendChild(opt);
  }

  // Flatten items with shop metadata
  const allItems = shops.flatMap(s =>
    s.items.map(it => ({ ...it, shopId: s.id, shopName: s.name, shopLocation: s.location, guildDiscount: s.guildDiscount }))
  );

  function updateStockDate() {
    const el = body.querySelector('#shop-stock-date');
    if (el && shopStockDate) el.textContent = `Stocked: ${shopStockDate}`;
  }

  function renderItems() {
    const q = body.querySelector('#shop-search').value.trim().toLowerCase();
    const cat = catSel.value;
    const shopId = shopSel.value;
    const hideOos = body.querySelector('#shop-hide-oos')?.checked;
    const list = body.querySelector('#shop-items-list');

    let filtered = allItems.filter(it => {
      if (shopId && it.shopId !== shopId) return false;
      if (cat && it.category !== cat) return false;
      if (q && !it.name.toLowerCase().includes(q) && !it.category.toLowerCase().includes(q)) return false;
      if (hideOos && !isServiceItem(it)) {
        const s = getItemStock(it.shopId, it.name);
        if (s.qty === 0) return false;
      }
      return true;
    });

    if (!filtered.length) {
      list.innerHTML = '<div style="color:#555;font-size:13px;padding:16px 0">No items match.</div>';
      return;
    }

    // Group by shop when showing all shops
    list.innerHTML = '';
    if (!shopId) {
      const byShop = {};
      for (const it of filtered) {
        if (!byShop[it.shopId]) byShop[it.shopId] = { name: it.shopName, location: it.shopLocation, items: [] };
        byShop[it.shopId].items.push(it);
      }
      for (const [, group] of Object.entries(byShop)) {
        const header = document.createElement('div');
        header.style.cssText = 'color:#888;font-size:11px;font-weight:600;letter-spacing:.08em;padding:12px 0 6px;border-top:1px solid #2a2a2a;margin-top:4px';
        header.textContent = `${group.name.toUpperCase()} — ${group.location}`;
        list.appendChild(header);
        for (const it of group.items) list.appendChild(buildItemRow(it, body));
      }
    } else {
      for (const it of filtered) list.appendChild(buildItemRow(it, body));
    }
  }

  body.querySelector('#shop-search').addEventListener('input', renderItems);
  catSel.addEventListener('change', renderItems);
  shopSel.addEventListener('change', renderItems);
  body.querySelector('#shop-hide-oos').addEventListener('change', renderItems);
  body.querySelector('#shop-season-sel').addEventListener('change', function () {
    shopSeason = this.value;
    renderItems();
  });
  // Restore season state if set
  body.querySelector('#shop-season-sel').value = shopSeason;

  body.querySelector('#shop-restock-btn').addEventListener('click', () => {
    rollStockForShops(shops);
    shopCart = []; // clear cart on restock — stale items may no longer be available
    updateCartBar(body);
    updateStockDate();
    renderItems();
  });

  body.querySelector('#shop-cart-clear').addEventListener('click', () => {
    shopCart = [];
    updateCartBar(body);
    renderItems();
  });

  body.querySelector('#shop-cart-view').addEventListener('click', () => {
    showCartDetail(body);
  });

  updateStockDate();
  renderItems();
  updateCartBar(body);

  // Live 5etools item search
  let searchTimer = null;
  body.querySelector('#shop-5e-search').addEventListener('input', function () {
    clearTimeout(searchTimer);
    const q = this.value.trim();
    const resultsEl = body.querySelector('#shop-5e-results');
    if (q.length < 2) { resultsEl.innerHTML = ''; return; }
    resultsEl.innerHTML = '<span style="color:#555;font-size:12px">Searching…</span>';
    searchTimer = setTimeout(async () => {
      try {
        const r = await fetch(`/api/5etools/item-search?q=${encodeURIComponent(q)}`);
        const items = await r.json();
        if (!items.length) {
          resultsEl.innerHTML = '<span style="color:#555;font-size:12px">No results from 5etools.</span>';
          return;
        }
        resultsEl.innerHTML = '';
        for (const it of items) {
          const slug = it.name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
          const src  = (it.source || 'phb').toLowerCase();
          const url  = `http://localhost:2014/items.html#${slug}_${src}`;
          const div  = document.createElement('div');
          div.style.cssText = 'padding:5px 0;border-bottom:1px solid #222;font-family:sans-serif;font-size:13px;display:flex;gap:10px;align-items:baseline';
          div.innerHTML = `
            <a href="${url}" target="_blank" style="color:#c9b37e;text-decoration:none;flex:1">${escapeHtml(it.name)}</a>
            <span style="color:#555;font-size:11px">${escapeHtml(it.source || 'PHB')}</span>
            ${it.rarity && it.rarity !== 'none' ? `<span style="color:#888;font-size:11px">${escapeHtml(it.rarity)}</span>` : ''}`;
          resultsEl.appendChild(div);
        }
      } catch {
        resultsEl.innerHTML = '<span style="color:#f38ba8;font-size:12px">5etools offline or unavailable.</span>';
      }
    }, 300);
  });
}

function formatShopPrice(gp, sp) {
  if (gp === 0 && sp === 0) return '<span style="color:#a8d8a8;font-weight:600">Free</span>';
  const parts = [];
  if (gp) parts.push(`<span style="color:#cba135;font-weight:600">${gp}gp</span>`);
  if (sp) parts.push(`<span style="color:#aaa">${sp}sp</span>`);
  return parts.join(' ');
}

const SHOP_STOCK_STYLE = { available: '#a8d8a8', limited: '#f9c74f', rare: '#f38ba8' };

function buildItemRow(it, body) {
  const row = document.createElement('div');
  const inCart = shopCart.find(c => c.name === it.name && c.shopId === it.shopId)?.qty || 0;
  const stockColor = SHOP_STOCK_STYLE[it.stock] || '#888';
  const url5e = it['5etoolsId'] ? `http://localhost:2014/items.html#${it['5etoolsId']}` : null;
  const isHeader = it.name.startsWith('—');

  // Header/separator rows — no qty, no add button
  if (isHeader) {
    row.style.cssText = 'padding:10px 0 4px;font-family:sans-serif;font-size:11px;font-weight:600;color:#7a5a9a;letter-spacing:.06em;border-top:1px solid #2a2a2a;margin-top:8px';
    row.textContent = it.name;
    return row;
  }

  // Seasonal modifier
  const mod = getSeasonMod(shopSeason, it.category, it.name);
  const seasonUnavailable = mod?.mult === null;
  const adjPrice = (!isHeader && mod && mod.mult !== null && !isServiceItem(it))
    ? applySeasonMult(it.gp, it.sp, mod.mult)
    : null; // null = use base price

  // Determine current stock quantity
  const snap = getItemStock(it.shopId, it.name);
  const isService = isServiceItem(it);
  const qty = snap.qty; // null = always available (service), number = actual qty
  const outOfStock = (!isService && qty === 0) || seasonUnavailable;

  // Qty display
  let qtyBadge = '';
  if (!isService && qty !== null) {
    if (outOfStock) {
      qtyBadge = `<span style="font-size:11px;color:#555;font-style:italic">out of stock</span>`;
    } else {
      qtyBadge = `<span style="font-size:11px;color:#888">×${qty}</span>`;
    }
  }

  row.style.cssText = `display:flex;align-items:flex-start;gap:8px;padding:6px 0;border-bottom:1px solid #242424;font-family:sans-serif;font-size:13px;${outOfStock ? 'opacity:0.38' : ''}`;
  row.innerHTML = `
    <div style="flex:1;min-width:0">
      ${url5e
        ? `<a href="${url5e}" target="_blank" style="color:${outOfStock ? '#666' : '#c9b37e'};text-decoration:none;font-weight:500;pointer-events:${outOfStock ? 'none' : 'auto'}">${escapeHtml(it.name)}</a>`
        : `<span style="color:${outOfStock ? '#555' : '#d4c5a0'};font-weight:500">${escapeHtml(it.name)}</span>`}
      <span style="color:#404040;font-size:11px;margin-left:6px">${escapeHtml(it.category.replace(/-/g, ' '))}</span>
      ${it.priceNote ? `<span style="color:#4a4a4a;font-size:11px;margin-left:4px">· ${escapeHtml(it.priceNote)}</span>` : ''}
      ${it.notes ? `<div style="color:#585858;font-size:11px;margin-top:2px;line-height:1.4">${escapeHtml(it.notes)}</div>` : ''}
    </div>
    <div style="text-align:right;white-space:nowrap;min-width:80px">
      ${adjPrice
        ? `${formatShopPrice(adjPrice.gp, adjPrice.sp)}
           <div style="text-decoration:line-through;color:#444;font-size:10px">${it.gp || it.sp ? (it.gp ? it.gp+'gp ' : '') + (it.sp ? it.sp+'sp' : '') : 'Free'}</div>
           <div style="color:#c9a0f0;font-size:10px">${escapeHtml(mod.label)}</div>`
        : seasonUnavailable
          ? `<span style="color:#555;font-size:11px;font-style:italic">${escapeHtml(mod.label)}</span>`
          : formatShopPrice(it.gp, it.sp)}
    </div>
    <div style="min-width:55px;text-align:right;white-space:nowrap;font-size:11px;color:${outOfStock ? '#444' : stockColor}">${outOfStock ? '—' : it.stock}</div>
    <div style="min-width:70px;text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:2px">
      ${qtyBadge}
      <button class="shop-add-btn" ${outOfStock ? 'disabled' : ''}
        style="padding:3px 8px;background:${outOfStock ? '#1a1a1a' : '#2a3a2a'};border:1px solid ${outOfStock ? '#333' : '#3a5a3a'};color:${outOfStock ? '#444' : '#a8d8a8'};border-radius:4px;cursor:${outOfStock ? 'not-allowed' : 'pointer'};font-size:11px">
        ${outOfStock ? 'N/A' : (inCart ? `+1 (${inCart})` : '+ Add')}
      </button>
    </div>`;

  if (!outOfStock) {
    row.querySelector('.shop-add-btn').addEventListener('click', function () {
      // Respect available qty
      const currentSnap = getItemStock(it.shopId, it.name);
      const cartEntry = shopCart.find(c => c.name === it.name && c.shopId === it.shopId);
      const alreadyInCart = cartEntry?.qty || 0;
      if (currentSnap.qty !== null && alreadyInCart >= currentSnap.qty) {
        this.style.borderColor = '#f38ba8';
        setTimeout(() => { this.style.borderColor = '#3a5a3a'; }, 600);
        return; // can't add more than available
      }
      const effGp = adjPrice ? adjPrice.gp : it.gp;
      const effSp = adjPrice ? adjPrice.sp : it.sp;
      if (cartEntry) cartEntry.qty++;
      else shopCart.push({ name: it.name, shopId: it.shopId, shopName: it.shopName, gp: effGp, sp: effSp, qty: 1 });
      const newQty = shopCart.find(c => c.name === it.name && c.shopId === it.shopId)?.qty || 0;
      this.textContent = `+1 (${newQty})`;
      if (body) updateCartBar(body);
    });
  }

  return row;
}

function updateCartBar(body) {
  const countEl = body.querySelector('#shop-cart-count');
  const totalEl = body.querySelector('#shop-cart-total');
  const clearBtn = body.querySelector('#shop-cart-clear');
  const viewBtn  = body.querySelector('#shop-cart-view');
  if (!countEl) return;

  const totalItems = shopCart.reduce((s, c) => s + c.qty, 0);
  countEl.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;

  let totalGp = shopCart.reduce((s, c) => s + c.gp * c.qty, 0);
  let totalSp = shopCart.reduce((s, c) => s + c.sp * c.qty, 0);
  totalGp += Math.floor(totalSp / 10);
  totalSp = totalSp % 10;
  const parts = [];
  if (totalGp) parts.push(`${totalGp}gp`);
  if (totalSp) parts.push(`${totalSp}sp`);
  totalEl.textContent = parts.length ? `— ${parts.join(' ')} total` : '';
  if (clearBtn) clearBtn.hidden = totalItems === 0;
  if (viewBtn)  viewBtn.hidden  = totalItems === 0;
}

function showCartDetail(body) {
  if (!shopCart.length) return;
  let html = '<div style="font-family:sans-serif;font-size:13px;padding:4px 0">';
  const byShop = {};
  for (const c of shopCart) {
    if (!byShop[c.shopId]) byShop[c.shopId] = { name: c.shopName, items: [] };
    byShop[c.shopId].items.push(c);
  }
  for (const [, group] of Object.entries(byShop)) {
    html += `<div style="color:#888;font-size:11px;font-weight:600;letter-spacing:.06em;margin-bottom:4px">${escapeHtml(group.name.toUpperCase())}</div>`;
    for (const c of group.items) {
      const lineGp = c.gp * c.qty + Math.floor((c.sp * c.qty) / 10);
      const lineSp = (c.sp * c.qty) % 10;
      const priceStr = [lineGp ? `${lineGp}gp` : '', lineSp ? `${lineSp}sp` : ''].filter(Boolean).join(' ') || 'Free';
      html += `<div style="display:flex;justify-content:space-between;padding:3px 0;border-bottom:1px solid #222">
        <span style="color:#d4c5a0">${escapeHtml(c.name)} ×${c.qty}</span>
        <span style="color:#cba135">${priceStr}</span>
      </div>`;
    }
    html += '<div style="margin-bottom:10px"></div>';
  }
  let totalGp = shopCart.reduce((s, c) => s + c.gp * c.qty, 0);
  let totalSp = shopCart.reduce((s, c) => s + c.sp * c.qty, 0);
  totalGp += Math.floor(totalSp / 10);
  totalSp = totalSp % 10;
  const totalStr = [totalGp ? `${totalGp}gp` : '', totalSp ? `${totalSp}sp` : ''].filter(Boolean).join(' ') || 'Free';
  html += `<div style="border-top:2px solid #444;padding-top:8px;margin-top:4px;display:flex;justify-content:space-between;font-weight:600">
    <span style="color:#aaa">Total</span>
    <span style="color:#cba135">${totalStr}</span>
  </div></div>`;

  const n = getFreeModal();
  if (!n) return;
  n.querySelector('.modal-title').textContent = 'Cart';
  n.querySelector('.modal-box').classList.remove('modal-box--tall');
  n.querySelector('.modal-body').innerHTML = `<div style="padding:16px">${html}</div>`;
  n.hidden = false;
  requestAnimationFrame(() => n.classList.add('visible'));
}

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
  paladin: 'classes.html#paladin_phb',
  warlock: 'classes.html#warlock_phb',
  ranger:  'classes.html#ranger_phb',
  bard:    'classes.html#bard_phb',
  cleric:  'classes.html#cleric_phb',
};

// 5etools slugs for class features and abilities
const FEATURE_5E = {
  // Paladin
  'divine smite':                   'classes.html#paladin_phb',
  'lay on hands':                   'classes.html#paladin_phb',
  'divine sense':                   'classes.html#paladin_phb',
  'fighting style: great weapon fighting': 'classes.html#paladin_phb',
  'sacred oath: oath of devotion':  'classes.html#paladin_phb',
  'channel divinity: sacred weapon':'classes.html#paladin_phb',
  'channel divinity: turn the unholy': 'classes.html#paladin_phb',
  'savage attacker':                'feats.html#savage attacker_phb',
  // Cleric
  'eyes of night':                  'classes.html#cleric_phb',
  'vigilant blessing':              'classes.html#cleric_phb',
  'channel divinity: turn undead':  'classes.html#cleric_phb',
  'channel divinity: twilight sanctuary': 'classes.html#cleric_phb',
  // Elf / Half-Elf
  'fey ancestry':                   'races.html#elf_phb',
  'trance':                         'races.html#elf_phb',
  'keen senses':                    'races.html#elf_phb',
  'fey step':                       'races.html#eladrin_(variant)_mtf',
  // Bard
  'bardic inspiration':             'classes.html#bard_phb',
  'song of rest':                   'classes.html#bard_phb',
  'mantle of inspiration':          'classes.html#bard_phb',
  'countercharm':                   'classes.html#bard_phb',
  'darkvision':                     'races.html#tiefling_phb',
  'hellish resistance':             'races.html#tiefling_phb',
  // Ranger
  'favored enemy':                  'classes.html#ranger_phb',
  'natural explorer':               'classes.html#ranger_phb',
  'fighting style: archery':        'classes.html#ranger_phb',
  "ranger's companion":             'classes.html#ranger_phb',
  'primeval awareness':             'classes.html#ranger_phb',
  // Warlock
  'awakened mind':                  'classes.html#warlock_phb',
  'pact of the chain':              'classes.html#warlock_phb',
  'armor of shadows':               'classes.html#warlock_phb',
  'fiendish vigor':                 'classes.html#warlock_phb',
  // Feats
  'resourceful':                    'feats.html#resourceful_xphb',
  // Twilight Cleric (TCE)
  'heart of darkness':              'classes.html#cleric_tce',
  // Beastmaster Ranger
  'ranger archetype: beastmaster':  'classes.html#ranger_phb',
};

// 5etools slugs for spells (spells.html#name_source)
const SPELL_5E = {
  // Paladin
  'protection from evil and good':  'spells.html#protection from evil and good_phb',
  'sanctuary':                      'spells.html#sanctuary_phb',
  'searing smite':                  'spells.html#searing smite_phb',
  'thunderous smite':               'spells.html#thunderous smite_phb',
  // Cleric / Twilight Domain
  'faerie fire':                    'spells.html#faerie fire_phb',
  'sleep':                          'spells.html#sleep_phb',
  'guidance':                       'spells.html#guidance_phb',
  'toll the dead':                  'spells.html#toll the dead_xge',
  'sacred flame':                   'spells.html#sacred flame_phb',
  // Bard
  'mage hand':                      'spells.html#mage hand_phb',
  'message':                        'spells.html#message_phb',
  'prestidigitation':               'spells.html#prestidigitation_phb',
  'charm person':                   'spells.html#charm person_phb',
  'disguise self':                  'spells.html#disguise self_phb',
  'healing word':                   'spells.html#healing word_phb',
  'thunderwave':                    'spells.html#thunderwave_phb',
  'burning hands':                  'spells.html#burning hands_phb',
  'flame blade':                    'spells.html#flame blade_phb',
  // Ranger
  "hunter's mark":                  "spells.html#hunter's mark_phb",
  'ensnaring strike':               'spells.html#ensnaring strike_phb',
  'speak with animals':             'spells.html#speak with animals_phb',
  // Warlock
  'eldritch blast':                 'spells.html#eldritch blast_phb',
  'chill touch':                    'spells.html#chill touch_phb',
  'false life':                     'spells.html#false life_phb',
};

// 5etools slugs for weapons (items.html#name_phb)
const WEAPON_5E = {
  'longsword':       'items.html#longsword_phb',
  'shortsword':      'items.html#shortsword_phb',
  'short sword':     'items.html#shortsword_phb',
  'scimitar':        'items.html#scimitar_phb',
  'rapier':          'items.html#rapier_phb',
  'dagger':          'items.html#dagger_phb',
  'javelin':         'items.html#javelin_phb',
  'mace':            'items.html#mace_phb',
  'sickle':          'items.html#sickle_phb',
  'longbow':         'items.html#longbow_phb',
  'long bow':        'items.html#longbow_phb',
  'shortbow':        'items.html#shortbow_phb',
  'light crossbow':  'items.html#crossbow, light_phb',
  'hand crossbow':   'items.html#crossbow, hand_phb',
  'heavy crossbow':  'items.html#crossbow, heavy_phb',
  'greataxe':        'items.html#greataxe_phb',
  'greatsword':      'items.html#greatsword_phb',
  'handaxe':         'items.html#handaxe_phb',
  'spear':           'items.html#spear_phb',
  'quarterstaff':    'items.html#quarterstaff_phb',
  'warhammer':       'items.html#warhammer_phb',
  'unarmed strike':  'actions.html#unarmed strike_phb',
};

// Homebrew file paths (relative to campaign root, served via /api/homebrew-content)
const HOMEBREW_LINKS = {
  'antlers of the first fallen': 'homebrew/items/antlers-of-the-first-fallen.md',
  'legacy of cania':             'homebrew/abilities/legacy-of-cania.md',
  'bonded companion':            'homebrew/abilities/bonded-companion.md',
  'bite':                        'homebrew/abilities/bonded-companion.md',
  'cold puff':                   'homebrew/abilities/cold-puff.md',
  'glide':                       'homebrew/abilities/glide.md',
};

const ABILITY_FULL = {
  STR: 'Strength', DEX: 'Dexterity', CON: 'Constitution',
  INT: 'Intelligence', WIS: 'Wisdom', CHA: 'Charisma',
};

function link5eInline(text, slug) {
  return `<a href="#" class="link-5e-inline" data-modal-5e="${BASE_5E}/${slug}">${text}</a>`;
}

function linkHomebrew(text, filePath) {
  return `<a href="#" class="link-5e-inline" data-modal-file="${filePath}">${text}</a>`;
}

// Link a single spell name: checks SPELL_5E then FEATURE_5E, falls back to homebrew generate link
function linkSpell(name, character) {
  const key = name.trim().toLowerCase();
  if (SPELL_5E[key])   return link5eInline(name.trim(), SPELL_5E[key]);
  if (FEATURE_5E[key]) return link5eInline(name.trim(), FEATURE_5E[key]);
  return linkGenerate(name.trim(), 'spell', '', character);
}

// Link each spell in a comma-separated cell value
function linkSpellList(csv, character) {
  return csv.split(/,\s*/).map(s => linkSpell(s, character)).join(', ');
}

// Render a "generate homebrew" link for unknown spells/abilities
function linkGenerate(name, type, description, character) {
  const enc = s => s.replace(/"/g, '&quot;');
  return `<a href="#" class="link-5e-inline link-homebrew-gen" `
    + `data-gen-name="${enc(name)}" data-gen-type="${type}" `
    + `data-gen-desc="${enc(description || '')}" data-gen-char="${enc(character || '')}">`
    + `${name}</a>`;
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
    const key = f.name.toLowerCase();
    let nameHtml;
    if (FEATURE_5E[key])                               nameHtml = link5eInline(f.name, FEATURE_5E[key]);
    else if (key in HOMEBREW_LINKS && HOMEBREW_LINKS[key]) nameHtml = linkHomebrew(f.name, HOMEBREW_LINKS[key]);
    else                                               nameHtml = linkGenerate(f.name, 'ability', f.description || '', char.name);
    return `<div class="pc-feature">
      <div class="pc-feature-name">${nameHtml}${f.subtitle ? ` <span class="pc-feature-sub">— ${f.subtitle}</span>` : ''}</div>
      ${f.description ? `<div class="pc-feature-desc">${f.description}</div>` : ''}
    </div>`;
  }).join('');

  const hasNotes = (char.attacks || []).some(a => a.notes);
  const attacksHtml = `<table class="pc-attacks">
    <thead><tr><th>Attack</th><th>Bonus</th><th>Damage</th>${hasNotes ? '<th>Notes</th>' : ''}</tr></thead>
    <tbody>${(char.attacks || []).map(a => {
      const key = a.name.toLowerCase().replace(/\s*\(.*?\)\s*/g, '').trim();
      let nameHtml;
      if (WEAPON_5E[key])        nameHtml = link5eInline(a.name, WEAPON_5E[key]);
      else if (SPELL_5E[key])    nameHtml = link5eInline(a.name, SPELL_5E[key]);
      else if (FEATURE_5E[key])  nameHtml = link5eInline(a.name, FEATURE_5E[key]);
      else if (key in HOMEBREW_LINKS && HOMEBREW_LINKS[key]) nameHtml = linkHomebrew(a.name, HOMEBREW_LINKS[key]);
      else                       nameHtml = linkGenerate(a.name, 'ability', '', char.name);
      return `<tr><td>${nameHtml}</td><td>${a.bonus || '—'}</td><td>${a.damage || '—'}</td>${hasNotes ? `<td>${a.notes || ''}</td>` : ''}</tr>`;
    }).join('')}</tbody>
  </table>`;

  const profHtml = [
    char.armorProf  ? `<div class="pc-prof-row"><span class="pc-def-label">Armor: </span>${char.armorProf}</div>` : '',
    char.weaponProf ? `<div class="pc-prof-row"><span class="pc-def-label">Weapons: </span>${char.weaponProf}</div>` : '',
    char.toolProf   ? `<div class="pc-prof-row"><span class="pc-def-label">Tools: </span>${char.toolProf}</div>` : '',
  ].join('');

  let spellsHtml = '';
  if (char.spellcasting) {
    const sc = char.spellcasting;
    const statsHtml = [
      sc.ability   ? `<span class="pc-spell-stat"><span class="pc-def-label">Ability: </span>${sc.ability}</span>` : '',
      sc.attackMod ? `<span class="pc-spell-stat"><span class="pc-def-label">Attack: </span>${sc.attackMod}</span>` : '',
      sc.saveDC    ? `<span class="pc-spell-stat"><span class="pc-def-label">Save DC: </span>${sc.saveDC}</span>` : '',
    ].filter(Boolean).join('');

    const slotsHtml = sc.slots.length ? `
      <table class="pc-spell-table">
        <thead><tr><th>Slot</th><th>Total</th><th>Used</th></tr></thead>
        <tbody>${sc.slots.map(s => `<tr><td>${s.level}</td><td>${s.total}</td><td>${s.used}</td></tr>`).join('')}</tbody>
      </table>` : '';

    const prepHtml = sc.prepared.length ? `
      <table class="pc-spell-table pc-spell-table--wide">
        <thead><tr><th>Level</th><th>Spells</th></tr></thead>
        <tbody>${sc.prepared.map(p => `<tr><td style="white-space:nowrap">${p.level}</td><td>${linkSpellList(p.spells, char.name)}</td></tr>`).join('')}</tbody>
      </table>` : '';

    const extraHtml = (sc.extraSpellLists || []).map(list => `
      <div class="pc-spell-extra">
        <div class="pc-spell-extra-title">${list.title}</div>
        <table class="pc-spell-table pc-spell-table--wide">
          <thead><tr><th>Level</th><th>Spells</th></tr></thead>
          <tbody>${list.entries.map(e => `<tr><td style="white-space:nowrap">${e.level}</td><td>${linkSpellList(e.spells, char.name)}</td></tr>`).join('')}</tbody>
        </table>
      </div>`).join('');

    spellsHtml = `<div class="pc-section">
      <div class="pc-section-title">Spellcasting</div>
      ${statsHtml ? `<div class="pc-spell-stats">${statsHtml}</div>` : ''}
      <div class="pc-spell-grid">
        ${slotsHtml}${prepHtml}
      </div>
      ${extraHtml}
    </div>`;
  }

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
        ${spellsHtml}
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
  setTheme(readPrefs().theme || 'mocha');
  fillTree('', fileTree);
  openPath('gm-lore/welcome.md');
  updateManifestBtn();
  initTerminal();
  initPlayerStrip();
  loadWorldTables();
  if (window.SoundPlayer) SoundPlayer.init();
});

// ── Left-panel Maps section ───────────────────────────────────────────────

(function initLeftMaps() {
  const gallery   = document.getElementById('left-maps-gallery');
  const genBtn    = document.getElementById('left-maps-gen-btn');
  const genForm   = document.getElementById('left-maps-gen-form');
  const promptEl  = document.getElementById('left-maps-prompt');
  const submitBtn = document.getElementById('left-maps-submit');
  const status    = document.getElementById('left-maps-status');
  if (!gallery || !genBtn) return;

  let mapStyle = 'topdown';
  let allMaps  = [];
  let filter   = '';

  function openLightbox(url, name, meta) {
    const lb = getFreeModal();
    if (!lb) return;
    const tags = (meta.tags || []).map(t => `<span class="lm-tag">${escapeHtml(t)}</span>`).join('');
    const uses = (meta.northwatch_uses || []).map(u => `<span class="lm-use">${escapeHtml(u)}</span>`).join('');
    const gridless = meta.gridless_url
      ? `<a href="${escapeHtml(meta.gridless_url)}" target="_blank" class="lm-lb-link">Gridless version ↗</a>` : '';
    lb.innerHTML = `
      <div class="ref-modal-header">
        <span class="ref-modal-title">${escapeHtml(name)}</span>
        <button class="ref-modal-close" onclick="closeTopModal()">✕</button>
      </div>
      <div class="maps-lightbox">
        <img src="${escapeHtml(url)}" alt="${escapeHtml(name)}" style="max-width:100%;max-height:65vh;object-fit:contain;display:block;margin:0 auto">
        ${meta.description ? `<div class="lm-lb-desc">${escapeHtml(meta.description)}</div>` : ''}
        ${tags ? `<div class="lm-lb-tags">${tags}</div>` : ''}
        ${uses ? `<div class="lm-lb-uses"><strong>Good for:</strong> ${uses}</div>` : ''}
        ${gridless}
      </div>`;
    lb.hidden = false;
    lb.classList.add('visible');
  }

  const GALLERY_PAGE = 40;
  let galleryShown = null; // current filtered list
  let galleryRenderedCount = 0;

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
      <div class="lm-thumb-name">${escapeHtml(mp.name)}</div>
    </div>`;
  }

  function attachThumbClicks(container) {
    container.querySelectorAll('.lm-thumb:not([data-bound])').forEach(thumb => {
      thumb.dataset.bound = '1';
      thumb.addEventListener('click', () => {
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

  function renderGallery() {
    galleryShown = filter
      ? allMaps.filter(m =>
          m.name.toLowerCase().includes(filter) ||
          (m.terrain || '').toLowerCase().includes(filter) ||
          (m.tags || []).some(t => t.toLowerCase().includes(filter)) ||
          (m.northwatch_uses || []).some(u => u.toLowerCase().includes(filter)) ||
          (m.adventure || '').toLowerCase().includes(filter)
        )
      : allMaps;

    galleryRenderedCount = 0;
    gallery.innerHTML = '';

    if (galleryShown.length === 0) {
      gallery.innerHTML = `<div style="font-size:10px;color:var(--subtext);padding:4px;grid-column:1/-1">${filter ? 'No matches.' : 'No maps found.'}</div>`;
      return;
    }

    renderGalleryPage();
  }

  function renderGalleryPage() {
    const batch = galleryShown.slice(galleryRenderedCount, galleryRenderedCount + GALLERY_PAGE);
    if (batch.length === 0) return;

    // Remove existing "load more" button if present
    const existing = gallery.querySelector('.lm-load-more');
    if (existing) existing.remove();

    const frag = document.createDocumentFragment();
    batch.forEach(mp => {
      const el = document.createElement('div');
      el.innerHTML = thumbHtml(mp);
      frag.appendChild(el.firstElementChild);
    });
    gallery.appendChild(frag);
    attachThumbClicks(gallery);
    galleryRenderedCount += batch.length;

    if (galleryRenderedCount < galleryShown.length) {
      const btn = document.createElement('div');
      btn.className = 'lm-load-more';
      btn.style.cssText = 'grid-column:1/-1;text-align:center;padding:6px;font-size:10px;color:var(--accent);cursor:pointer';
      btn.textContent = `Load more (${galleryShown.length - galleryRenderedCount} remaining)`;
      btn.addEventListener('click', renderGalleryPage);
      gallery.appendChild(btn);
    }
  }

  // Load map library on page load
  fetch('/api/map-library').then(r => r.ok ? r.json() : []).then(d => {
    if (Array.isArray(d)) { allMaps = d; renderGallery(); }
  }).catch(() => {
    gallery.innerHTML = '<div style="font-size:10px;color:var(--subtext);padding:4px;grid-column:1/-1">Could not load map library.</div>';
  });

  // Filter input (injected into the panel header via JS below)
  const filterInput = document.getElementById('left-maps-filter');
  if (filterInput) {
    filterInput.addEventListener('input', () => {
      filter = filterInput.value.trim().toLowerCase();
      renderGallery();
    });
  }

  // Toggle generate form
  genBtn.addEventListener('click', () => {
    const hidden = genForm.hidden;
    genForm.hidden = !hidden;
    genBtn.textContent = hidden ? '− Cancel' : '+ Generate Map';
  });

  // Style toggle
  genForm.querySelectorAll('.left-maps-style-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      mapStyle = btn.dataset.style;
      genForm.querySelectorAll('.left-maps-style-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Generate
  submitBtn.addEventListener('click', async () => {
    const p = promptEl.value.trim();
    if (!p) return;
    submitBtn.disabled = true;
    status.textContent = 'Generating… (30–90s)';
    try {
      const r = await fetch('/api/maps/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ style: mapStyle, prompt: p }),
      });
      if (!r.ok) {
        let msg = 'Generation failed';
        try { msg = (await r.json()).error || msg; } catch { /* */ }
        throw new Error(msg);
      }
      status.textContent = 'Done — save the output to your adventure folder, then reload to see it here.';
      promptEl.value = '';
      genForm.hidden = true;
      genBtn.textContent = '+ Generate Map';
    } catch (e) {
      status.textContent = e.message;
    } finally {
      submitBtn.disabled = false;
    }
  });
})();

'use strict';

const express  = require('express');
const http     = require('http');
const WebSocket = require('ws');
const path     = require('path');
const fs       = require('fs');

// Optional deps — degrade gracefully if missing
let pty;
try { pty = require('node-pty'); } catch { console.warn('node-pty not found — terminal disabled'); }

let hbRender;
try {
  const { render } = require('../homebrewery-renderer');
  hbRender = render;
} catch (e) { console.warn('homebrewery-renderer unavailable — raw fallback'); }

const CAMPAIGN_ROOT = path.resolve(__dirname, '..');

// Directories never shown in file browser
const EXCLUDE = new Set([
  '.git', '.github', 'dm-panel', 'web', 'node_modules', 'build',
  'logs', 'scratchpad', 'scripts', 'templates', 'LionsdenGameFiles',
]);

// File extensions allowed in file browser and directory listings
const SHOW_EXTS = new Set(['.md', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']);

// Image extensions — served via /raw, displayed with <img> in preview
const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']);

// MIME types for raw image serving
const IMAGE_MIME = {
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml',
};

function showEntry(e) {
  if (e.name.startsWith('.') || e.name.startsWith('_') || EXCLUDE.has(e.name)) return false;
  if (e.isDirectory()) return true;
  return SHOW_EXTS.has(path.extname(e.name).toLowerCase());
}

const PORT = process.env.PORT || 5050;

const app    = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '20mb' }));

// ─── Path helpers ──────────────────────────────────────────────────────────

function safePath(rel) {
  const resolved = path.resolve(CAMPAIGN_ROOT, rel || '');
  if (resolved !== CAMPAIGN_ROOT && !resolved.startsWith(CAMPAIGN_ROOT + path.sep)) {
    throw new Error('Invalid path');
  }
  return resolved;
}

function toRel(abs) {
  return path.relative(CAMPAIGN_ROOT, abs).replace(/\\/g, '/');
}

function esc(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ─── File listing API ──────────────────────────────────────────────────────

app.get('/api/files', (req, res) => {
  try {
    const dir = safePath(req.query.path);
    const entries = fs.readdirSync(dir, { withFileTypes: true })
      .filter(showEntry)
      .map(e => ({
        name: e.name,
        type: e.isDirectory() ? 'dir' : 'file',
        path: toRel(path.join(dir, e.name))
      }))
      .sort((a, b) => (a.type !== b.type ? (a.type === 'dir' ? -1 : 1) : a.name.localeCompare(b.name)));
    res.json(entries);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ─── Raw file endpoint (images served with correct Content-Type) ───────────

app.get('/raw', (req, res) => {
  try {
    const filePath = safePath(req.query.path);
    const ext = path.extname(filePath).toLowerCase();
    res.setHeader('Content-Type', IMAGE_MIME[ext] || 'application/octet-stream');
    fs.createReadStream(filePath).pipe(res);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// ─── Preview endpoint (served into iframe) ─────────────────────────────────

// Strip {{season-gate: N}}...{{/season-gate}} blocks where N > currentSeason
function applySeasonGates(content, currentSeason) {
  return content.replace(
    /\{\{season-gate:\s*(\d+)\}\}([\s\S]*?)\{\{\/season-gate\}\}/g,
    (_, gateN, inner) => parseInt(gateN, 10) <= currentSeason ? inner : ''
  );
}

function renderPages(content, season) {
  // Strip frontmatter
  content = content.replace(/^<!--[\s\S]*?-->\s*/, '').replace(/^---[\s\S]*?---\s*/, '');
  // Apply season gates before rendering
  if (season != null) content = applySeasonGates(content, season);
  const pages = content.split(/^\\page\s*$/gm);
  return pages
    .filter(p => p.trim())
    .map((p, i) => {
      const html = hbRender
        ? hbRender(p)
        : `<pre style="white-space:pre-wrap">${esc(p)}</pre>`;
      return `<div class="page" id="p${i + 1}" key="${i}"><div class="columnWrapper">${html}</div></div>`;
    })
    .join('\n');
}

const FRAME_SCREEN_CSS = `
  /* Web-first overrides — strip rigid print dimensions, keep the D&D feel */
  html, body {
    margin: 0; padding: 0;
    background: #1a1a1a;
    overflow-x: hidden;
  }
  .brewRenderer, .frame-content, body > div { background: #1a1a1a; }

  .pages {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    padding: 28px 16px;
    box-sizing: border-box;
    width: 100%;
  }

  /* Kill fixed print page dimensions — high specificity to beat theme */
  .brewRenderer .pages .page {
    width: 100% !important;
    max-width: 800px !important;
    height: auto !important;
    min-height: unset !important;
    overflow: visible !important;
    padding: 28px 32px !important;
    box-sizing: border-box !important;
    box-shadow: 0 6px 32px rgba(0,0,0,.7) !important;
    border-radius: 2px;
  }

  /* Single-column layout for web scrolling — out-specifics .page .columnWrapper */
  .brewRenderer .pages .page .columnWrapper {
    height: auto !important;
    min-height: unset !important;
    overflow: visible !important;
    column-count: 1 !important;
    column-width: auto !important;
    column-gap: 0 !important;
  }

  /* Column breaks become no-ops in single-column */
  .brewRenderer .pages .page .columnWrapper .column-break,
  .brewRenderer .pages .page .columnWrapper .wide { break-before: auto !important; }

  /* Stat block and note boxes: don't force fixed sizes */
  .brewRenderer .pages .page .monster,
  .brewRenderer .pages .page .note,
  .brewRenderer .pages .page .descriptive,
  .brewRenderer .pages .page .classTable {
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    break-inside: avoid;
  }

  /* Images shouldn't overflow */
  img { max-width: 100%; height: auto; }
`;

function previewHtml(body) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700" rel="stylesheet">
  <link href="https://assets.dungeonsandmarkdown.spjak.com/bundle.css" rel="stylesheet">
</head>
<body>
  <div><div class="frame-content"><div class="brewRenderer">
    <link href="https://assets.dungeonsandmarkdown.spjak.com/themes/V3/Blank/style.css" rel="stylesheet">
    <link href="https://assets.dungeonsandmarkdown.spjak.com/themes/V3/5ePHB/style.css" rel="stylesheet">
    <style>${FRAME_SCREEN_CSS}</style>
    <div class="pages">${body}</div>
  </div></div></div>
  <script>
    // CSS alone can't beat async CDN stylesheets — force layout via JS after all resources load
    function fixLayout() {
      document.querySelectorAll('.page').forEach(el => {
        el.style.setProperty('height',     'auto',    'important');
        el.style.setProperty('min-height', 'unset',   'important');
        el.style.setProperty('overflow',   'visible', 'important');
      });
      document.querySelectorAll('.columnWrapper').forEach(el => {
        el.style.setProperty('column-count',  '1',       'important');
        el.style.setProperty('column-width',  'auto',    'important');
        el.style.setProperty('height',        'auto',    'important');
        el.style.setProperty('min-height',    'unset',   'important');
        el.style.setProperty('overflow',      'visible', 'important');
      });
    }
    // Run after DOM and again after all external CSS has loaded
    document.addEventListener('DOMContentLoaded', fixLayout);
    window.addEventListener('load', fixLayout);
  </script>
</body>
</html>`;
}

app.get('/preview', (req, res) => {
  try {
    const filePath = safePath(req.query.path);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      const entries = fs.readdirSync(filePath, { withFileTypes: true })
        .filter(showEntry)
        .sort((a, b) => (a.isDirectory() === b.isDirectory() ? a.name.localeCompare(b.name) : a.isDirectory() ? -1 : 1));
      const items = entries.map(e => {
        const rel = toRel(path.join(filePath, e.name));
        const icon = e.isDirectory() ? '📁' : IMAGE_EXTS.has(path.extname(e.name).toLowerCase()) ? '🖼' : '📄';
        return `<a href="/preview?path=${encodeURIComponent(rel)}" class="entry">${icon} ${esc(e.name)}</a>`;
      }).join('');
      res.send(`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
        body{background:#1e1e2e;margin:0;padding:16px;font-family:'Segoe UI',sans-serif;color:#cdd6f4}
        h3{margin:0 0 10px;color:#cba6f7;font-size:13px;font-weight:500}
        .entry{display:flex;align-items:center;gap:8px;padding:5px 10px;border-radius:6px;cursor:pointer;color:#cdd6f4;text-decoration:none;font-size:13px}
        .entry:hover{background:#313244}
      </style></head><body>
        <h3>${esc(path.basename(filePath) || 'Campaign Root')}</h3>${items}
      </body></html>`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    if (IMAGE_EXTS.has(ext)) {
      const rel = toRel(filePath);
      res.send(`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
        html,body{margin:0;padding:0;background:#1e1e2e;display:flex;align-items:center;justify-content:center;min-height:100vh;}
        img{max-width:100%;max-height:100vh;object-fit:contain;display:block;}
      </style></head><body>
        <img src="/raw?path=${encodeURIComponent(rel)}" alt="${esc(path.basename(filePath))}">
      </body></html>`);
      return;
    }
    if (ext === '.md') {
      const content = fs.readFileSync(filePath, 'utf8');
      const season = req.query.season != null ? parseInt(req.query.season, 10) : null;
      res.send(previewHtml(renderPages(content, season)));
    } else {
      const content = fs.readFileSync(filePath, 'utf8');
      res.send(`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
        body{background:#1e1e2e;color:#cdd6f4;margin:0;padding:16px;font-family:Consolas,monospace;font-size:12px}
        pre{white-space:pre-wrap;word-break:break-word}
      </style></head><body><pre>${esc(content)}</pre></body></html>`);
    }
  } catch (e) {
    res.status(400).send(`<html><body style="background:#1e1e2e;color:#f38ba8;padding:16px;font-family:sans-serif">${esc(e.message)}</body></html>`);
  }
});

// ─── Save image (clipboard paste) ─────────────────────────────────────────

app.post('/api/save-image', (req, res) => {
  try {
    const { data, ext } = req.body;
    if (!data) return res.status(400).json({ error: 'No image data' });
    const dir = path.join(CAMPAIGN_ROOT, 'temp');
    fs.mkdirSync(dir, { recursive: true });
    const filename = `img-${Date.now()}.${(ext || 'png').replace(/[^a-z0-9]/gi, '')}`;
    const fullPath = path.join(dir, filename);
    fs.writeFileSync(fullPath, Buffer.from(data, 'base64'));
    res.json({ path: toRel(fullPath), absPath: fullPath.replace(/\\/g, '/') });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── Search API ───────────────────────────────────────────────────────────

function walkMd(dir, results = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return results; }
  for (const e of entries) {
    if (e.name.startsWith('.') || e.name.startsWith('_') || EXCLUDE.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkMd(full, results);
    else if (path.extname(e.name).toLowerCase() === '.md') results.push(full);
  }
  return results;
}

app.get('/api/search', (req, res) => {
  const q = (req.query.q || '').trim();
  if (q.length < 2) return res.json([]);

  const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  const files = walkMd(CAMPAIGN_ROOT);
  const out = [];

  for (const file of files) {
    if (out.length >= 60) break;
    let text;
    try { text = fs.readFileSync(file, 'utf8'); } catch { continue; }
    if (!re.test(text)) continue;
    re.lastIndex = 0;

    const lines = text.split('\n');
    const snippets = [];
    for (let i = 0; i < lines.length && snippets.length < 3; i++) {
      if (re.test(lines[i])) {
        snippets.push({ line: i + 1, text: lines[i].slice(0, 120) });
        re.lastIndex = 0;
      }
    }
    out.push({ path: toRel(file), name: path.basename(file), snippets });
  }

  res.json(out);
});

// ─── WebSocket terminal ────────────────────────────────────────────────────

if (pty) {
  const crypto = require('crypto');
  const sessions = new Map(); // id → { proc, buf, ws, idleTimer }
  const BUF_LIMIT  = 100_000;
  const IDLE_TTL   = 60 * 60 * 1000; // 1 hour

  function scheduleIdle(id) {
    const s = sessions.get(id);
    if (!s) return;
    clearTimeout(s.idleTimer);
    s.idleTimer = setTimeout(() => {
      try { s.proc.kill(); } catch {}
      sessions.delete(id);
    }, IDLE_TTL);
  }

  function spawnSession() {
    const id   = crypto.randomBytes(8).toString('hex');
    const shell = process.platform === 'win32' ? 'powershell.exe' : (process.env.SHELL || 'bash');
    const proc  = pty.spawn(shell, [], {
      name: 'xterm-color', cols: 120, rows: 30,
      cwd: CAMPAIGN_ROOT, env: process.env,
    });
    const s = { proc, buf: '', ws: null, idleTimer: null };
    sessions.set(id, s);

    proc.onData(d => {
      const sess = sessions.get(id);
      if (!sess) return;
      if (sess.ws && sess.ws.readyState === WebSocket.OPEN) {
        sess.ws.send(JSON.stringify({ type: 'output', data: d }));
      } else {
        sess.buf += d;
        if (sess.buf.length > BUF_LIMIT) sess.buf = sess.buf.slice(-BUF_LIMIT);
      }
    });

    proc.onExit(() => {
      const sess = sessions.get(id);
      if (sess && sess.ws && sess.ws.readyState === WebSocket.OPEN) {
        sess.ws.send(JSON.stringify({ type: 'output', data: '\r\n[shell exited]\r\n' }));
      }
      sessions.delete(id);
    });

    return id;
  }

  const wss = new WebSocket.Server({ server, path: '/terminal' });

  wss.on('connection', ws => {
    let sessionId = null;

    function attachTo(id) {
      sessionId    = id;
      const s      = sessions.get(id);
      clearTimeout(s.idleTimer);
      s.ws = ws;
      // replay buffered output then clear
      if (s.buf) {
        ws.send(JSON.stringify({ type: 'output', data: s.buf }));
        s.buf = '';
      }
      ws.send(JSON.stringify({ type: 'session', sessionId: id }));
    }

    ws.on('message', raw => {
      try {
        const { type, data, cols, rows, sessionId: sid } = JSON.parse(raw);

        if (type === 'attach') {
          if (sid && sessions.has(sid)) {
            attachTo(sid);
          } else {
            let id;
            try { id = spawnSession(); }
            catch (e) {
              ws.send(JSON.stringify({ type: 'output', data: `\r\nTerminal error: ${e.message}\r\n` }));
              ws.close(); return;
            }
            attachTo(id);
          }
          return;
        }

        if (!sessionId) return;
        const s = sessions.get(sessionId);
        if (!s) return;
        if (type === 'input')  s.proc.write(data);
        if (type === 'resize') s.proc.resize(cols, rows);
      } catch {}
    });

    ws.on('close', () => {
      if (sessionId && sessions.has(sessionId)) {
        sessions.get(sessionId).ws = null;
        scheduleIdle(sessionId);
      }
    });
  });
}

const HOST = process.env.HOST || '0.0.0.0';
server.listen(PORT, HOST, () => {
  console.log(`\nDM Panel → http://${HOST}:${PORT}`);
  console.log(`Root: ${CAMPAIGN_ROOT}\n`);
});

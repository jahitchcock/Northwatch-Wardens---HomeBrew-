'use strict';

const express  = require('express');
const http     = require('http');
const WebSocket = require('ws');
const path     = require('path');
const fs       = require('fs');
const { marked } = require('marked');

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
  'temp', 'docs',
  // UI hidden — content accessible via Tools dropdown instead
  'tables', 'seasonal-event-calendar.md',
]);

// Directories rendered with marked (web-native markdown)
const WEB_DIRS = new Set([
  'adventures', 'npcs', 'locations', 'factions',
  'arcs', 'gm-lore', 'player-lore', 'timeline', 'tables',
]);

function isWebPath(filePath) {
  const rel = path.relative(CAMPAIGN_ROOT, filePath).replace(/\\/g, '/');
  return WEB_DIRS.has(rel.split('/')[0]);
}

function extractFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const result = {};
  for (const line of m[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon < 1) continue;
    const key = line.slice(0, colon).trim();
    const val = line.slice(colon + 1).trim().replace(/^["']|["']$/g, '');
    if (key) result[key] = val;
  }
  return result;
}

function preprocessMarkdown(raw) {
  let md = raw;

  // Strip frontmatter
  md = md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');

  // Strip HTML comment headers (old format)
  md = md.replace(/^<!--[\s\S]*?-->\s*\n/, '');

  // {{note ...}} blocks → callout div
  md = md.replace(/\{\{note[^\n]*\n([\s\S]*?)\n\}\}/g,
    (_, content) => `<div class="callout note">\n\n${content}\n\n</div>\n`);

  // {{descriptive ...}} blocks
  md = md.replace(/\{\{descriptive[^\n]*\n([\s\S]*?)\n\}\}/g,
    (_, content) => `<div class="callout descriptive">\n\n${content}\n\n</div>\n`);

  // {{wide ...}} blocks — strip wrapper, keep content
  md = md.replace(/\{\{wide[^\n]*\n([\s\S]*?)\n\}\}/g,
    (_, content) => `<div class="callout wide">\n\n${content}\n\n</div>\n`);

  // loc: links → modal anchors: [text](loc:path/to/file.md)
  md = md.replace(/\[([^\]]+)\]\(loc:([^)]+)\)/g,
    (_, text, locPath) =>
      `<a href="#" data-modal="${locPath.trim()}" class="link-loc">${esc(text)}</a>`);

  // 5etools: links → raw anchor with data-modal-5e
  md = md.replace(/\[([^\]]+)\]\(5etools:([\w.]+)#([\w_-]+)\)/g,
    (_, text, page, hash) =>
      `<a href="#" data-modal-5e="http://localhost:2014/${page}.html#${hash}" class="link-5e">${esc(text)}</a>`);

  // Strip any remaining {{...}} blocks — keep inner content
  md = md.replace(/\{\{[\w,\s]*\n([\s\S]*?)\n\}\}/g, (_, content) => content + '\n');
  md = md.replace(/\{\{[^}\n]*\}\}/g, '');

  return md;
}

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
    const isRoot = dir === CAMPAIGN_ROOT;
    const season = req.query.season ? parseInt(req.query.season, 10) : null;
    const entries = fs.readdirSync(dir, { withFileTypes: true })
      .filter(e => showEntry(e) && !(isRoot && e.isFile()))
      .filter(e => {
        // Hide season-N directories that don't match the selected season filter
        if (season == null || !e.isDirectory()) return true;
        const m = e.name.match(/^season-(\d+)$/i);
        return !m || parseInt(m[1], 10) === season;
      })
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

const WEB_CONTENT_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body {
    margin: 0; padding: 0;
    background: #f5f0e8;
    color: #1a1a1a;
    font-family: 'Palatino Linotype', Palatino, 'Book Antiqua', serif;
    font-size: 15px;
    line-height: 1.7;
  }
  .web-content { max-width: 760px; margin: 0 auto; padding: 28px 24px 60px; }
  h1 { font-size: 1.8em; color: #58180d; text-transform: uppercase;
       letter-spacing: 1px; border-bottom: 3px solid #c9ad6a; padding-bottom: 6px; margin-top: 0; }
  h2 { font-size: 1.35em; color: #58180d; border-bottom: 1px solid #c9ad6a; padding-bottom: 4px; }
  h3 { font-size: 1.1em; color: #58180d; font-variant: small-caps; }
  h4, h5 { font-size: 1em; color: #58180d; }
  a { color: #58180d; }
  a[data-modal], a[data-modal-5e] {
    color: #58180d; border-bottom: 1px dotted #58180d;
    text-decoration: none; cursor: pointer;
  }
  a[data-modal]:hover, a[data-modal-5e]:hover { border-bottom-style: solid; }
  .npc-modal-trigger {
    color: #58180d; border-bottom: 1px dotted #58180d;
    cursor: pointer; font-weight: bold;
  }
  .npc-modal-trigger:hover { border-bottom-style: solid; }
  table { border-collapse: collapse; width: 100%; margin: 1em 0; font-size: 0.9em; }
  th { background: #58180d; color: #f5f0e8; padding: 6px 10px; text-align: left; }
  td { padding: 5px 10px; border-bottom: 1px solid #ddd; }
  tr:nth-child(even) td { background: #ede8da; }
  hr { border: none; border-top: 2px solid #c9ad6a; margin: 1.8em 0; }
  code { background: #ede8da; padding: 2px 5px; border-radius: 3px; font-size: 0.88em; font-family: Consolas, monospace; }
  blockquote { border-left: 4px solid #c9ad6a; margin: 1em 0; padding: 8px 16px; background: #ede8da; }
  strong { color: #3b0d0d; }
  .callout { border-radius: 3px; padding: 12px 16px; margin: 1.2em 0; }
  .callout.note {
    background: #fdf6e3; border: 1px solid #c9ad6a; border-left: 4px solid #c9ad6a;
  }
  .callout.descriptive {
    background: #ede8da; border: 1px solid #8b7d5a; border-left: 4px solid #8b7d5a;
    font-style: italic;
  }
  .callout.wide {
    background: #f5f0e8; border-top: 2px solid #c9ad6a; border-bottom: 2px solid #c9ad6a;
    padding: 12px 0;
  }
  .callout h4, .callout h5 { margin-top: 0; }
  img { max-width: 100%; height: auto; }
  ul, ol { padding-left: 1.4em; }
  li { margin: 0.2em 0; }
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

function webPreviewHtml(title, bodyHtml) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${esc(title)}</title>
  <style>${WEB_CONTENT_CSS}</style>
</head>
<body data-title="${esc(title)}">
  <div class="web-content">${bodyHtml}</div>
</body>
</html>`;
}

function renderWebMarkdown(filePath, baseRel) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const fm = extractFrontmatter(raw);
  const title = fm.name || path.basename(filePath, '.md').replace(/[-_]/g, ' ');
  const preprocessed = preprocessMarkdown(raw);
  let html = marked.parse(preprocessed);
  // Post-process: inject data-modal on cross-reference links
  html = html.replace(
    /<a href="((?:npcs|locations|factions|arcs|gm-lore|player-lore|adventures|timeline)\/[^"]+)">/g,
    (_, p) => `<a href="#" data-modal="${esc(p)}">`
  );
  if (baseRel) {
    // Rewrite relative .md links to data-modal with full path
    html = html.replace(
      /<a href="([^"#/][^"]*\.md)">/g,
      (_, href) => `<a href="#" data-modal="${esc(baseRel + '/' + href)}">`
    );
    // Mark NPC tables (detected by Name/Voice/Wants/Key Secret header) for inline modals
    html = html.replace(
      /(<table>)([\s\S]*?<th>Name<\/th>[\s\S]*?<\/thead>)([\s\S]*?)(<\/table>)/g,
      (_, open, thead, tbody, close) => {
        const markedTbody = tbody.replace(
          /(<td>)<strong>([^<]+)<\/strong>(<\/td>)/g,
          '$1<span class="npc-modal-trigger" role="button" tabindex="0">$2</span>$3'
        );
        return `<table class="npc-table">${thead}${markedTbody}${close}`;
      }
    );
  }
  return { html, title };
}

app.get('/preview', (req, res) => {
  try {
    const filePath = safePath(req.query.path);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      const indexMd = path.join(filePath, 'index.md');
      if (isWebPath(filePath) && fs.existsSync(indexMd)) {
        const { html, title } = renderWebMarkdown(indexMd, toRel(filePath));
        res.send(webPreviewHtml(title, html));
        return;
      }
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
      if (isWebPath(filePath)) {
        const { html, title } = renderWebMarkdown(filePath);
        res.send(webPreviewHtml(title, html));
      } else {
        const content = fs.readFileSync(filePath, 'utf8');
        const season = req.query.season != null ? parseInt(req.query.season, 10) : null;
        res.send(previewHtml(renderPages(content, season)));
      }
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

// ─── Tables API ───────────────────────────────────────────────────────────────

// Parse a /tables/*.md file into rollable groups.
// Two strategies: markdown tables (d20/d12 rolls) and numbered-heading lists.
function parseTableFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  // Strip frontmatter and Homebrewery syntax
  let content = raw.replace(/^---[\s\S]*?---\n?/, '');
  content = content.replace(/\{\{\w[^\n}]*\n/g, '').replace(/^\}\}\s*$/gm, '');
  content = content.replace(/\\(page|column)/g, '');

  const groups = [];
  const lines = content.split('\n');
  let lastHeading = '';
  let die = 20;
  let inTable = false;
  let headerCells = null;
  let rows = [];

  function flush() {
    if (headerCells && rows.length > 0) {
      // Only treat as a rollable table if rows start with numbers
      if (/^\d/.test(rows[0]?.[0] || '')) {
        groups.push({ name: lastHeading, die, rows: rows.map(r => ({ roll: r[0], text: r.slice(1).join(' — ') })) });
      }
    }
    headerCells = null; rows = []; inTable = false;
  }

  for (const line of lines) {
    const t = line.trim();
    if (/^#{1,4}\s/.test(t)) {
      flush();
      lastHeading = t.replace(/^#{1,4}\s+/, '').replace(/\*\*/g, '').trim();
      const m = lastHeading.match(/\(d(\d+)\)/i);
      if (m) die = parseInt(m[1]);
      continue;
    }
    if (t.startsWith('|') && !t.match(/^\|[-: ]+\|/)) {
      if (!inTable) {
        headerCells = t.split('|').slice(1, -1).map(c => c.trim());
        inTable = true;
      } else {
        const cells = t.split('|').slice(1, -1).map(c => c.trim());
        if (cells.length >= 2 && /^\d/.test(cells[0])) rows.push(cells);
      }
    } else if (inTable) {
      if (!t.match(/^\|[-: ]+\|/)) flush(); // non-separator, non-pipe → end of table
    }
  }
  flush();

  // Fallback: numbered heading list (### N. Name + optional Setup line)
  if (groups.length === 0) {
    const fm = extractFrontmatter(raw);
    const entries = [];
    let current = null;
    for (const line of lines) {
      const m = line.match(/^#{2,4}\s+(\d+)\.\s+(.+)/);
      if (m) {
        if (current) entries.push(current);
        current = { roll: m[1], name: m[2].replace(/\*/g, '').trim(), setup: '' };
      } else if (current && !current.setup && line.includes('**Setup:**')) {
        current.setup = line.replace(/.*\*\*Setup:\*\*\s*/g, '').replace(/\*\*/g, '').trim();
      }
    }
    if (current) entries.push(current);
    if (entries.length > 0) {
      groups.push({
        name: fm.name || 'Encounters',
        die: entries.length,
        rows: entries.map(e => ({ roll: e.roll, text: `**${e.name}**${e.setup ? ' — ' + e.setup : ''}` })),
      });
    }
  }

  return groups;
}

app.get('/api/tables', (req, res) => {
  try {
    const dir = path.join(CAMPAIGN_ROOT, 'tables');
    if (!fs.existsSync(dir)) return res.json([]);
    const result = [];
    for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.md') && !f.startsWith('_'))) {
      const groups = parseTableFile(path.join(dir, file));
      const key = file.replace('.md', '');
      groups.forEach((g, idx) => result.push({ name: g.name, file: key, tableIdx: idx, die: g.die }));
    }
    result.sort((a, b) => a.name.localeCompare(b.name));
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/tools/roll-table', (req, res) => {
  const { file, tableIdx = '0' } = req.query;
  if (!file || !/^[\w-]+$/.test(file)) return res.status(400).send('<p>Invalid file</p>');
  const filePath = path.join(CAMPAIGN_ROOT, 'tables', file + '.md');
  if (!fs.existsSync(filePath)) return res.status(404).send('<p>Table not found</p>');
  try {
    const groups = parseTableFile(filePath);
    const group = groups[parseInt(tableIdx, 10)];
    if (!group?.rows.length) return res.send('<p style="padding:8px;color:#7a6050">No entries found</p>');
    const entry = group.rows[Math.floor(Math.random() * group.rows.length)];
    const html = entry.text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');
    res.send(`
      <div style="font-family:'Palatino Linotype',serif;padding:4px">
        <p style="margin:0 0 10px;font-size:11px;color:#7a6050;text-transform:uppercase;letter-spacing:.04em">
          ${esc(group.name)} &mdash; rolled ${esc(entry.roll)} on d${group.die}
        </p>
        <div style="font-size:14px;line-height:1.7;color:#2c1810">${html}</div>
      </div>`);
  } catch (e) {
    res.status(500).send(`<p style="color:#c0392b;padding:8px">${esc(e.message)}</p>`);
  }
});

// ─── Seasonal Calendar ────────────────────────────────────────────────────────

function parseSeasonalCalendar() {
  const filePath = path.join(CAMPAIGN_ROOT, 'gm-lore', 'seasonal-event-calendar.md');
  if (!fs.existsSync(filePath)) return [];
  let content = fs.readFileSync(filePath, 'utf8');
  // Strip HTML comment header, Homebrewery syntax
  content = content.replace(/^<!--[\s\S]*?-->\n?/, '');
  content = content.replace(/\{\{[^}]*\n[\s\S]*?\}\}/g, '').replace(/\{\{[^\n}]*\}\}/g, '');
  content = content.replace(/\\(page|column)/g, '').replace(/^:{1,2}\s*/gm, '');

  const months = [];
  const monthRe = /^## MONTH (\d+): ([^\n]+)/gm;
  const specialIdx = content.search(/^## SPECIAL EVENTS/m);
  let m;
  const found = [];
  while ((m = monthRe.exec(content)) !== null) found.push(m);

  for (let i = 0; i < found.length; i++) {
    const start = found[i].index;
    const end = i + 1 < found.length ? found[i + 1].index : (specialIdx > 0 ? specialIdx : content.length);
    const name = found[i][2].trim();
    const section = content.slice(start, end).trim();
    months.push({ num: parseInt(found[i][1]), name, section });
  }
  return months;
}

app.get('/tools/seasonal-calendar', (req, res) => {
  const months = parseSeasonalCalendar();
  if (!months.length) return res.status(404).send('<p>Calendar not found</p>');

  const monthNum = parseInt(req.query.month, 10);
  if (isNaN(monthNum)) {
    // Return month index
    return res.json(months.map(m => ({ num: m.num, name: m.name })));
  }

  const month = months.find(m => m.num === monthNum);
  if (!month) return res.status(404).send('<p>Month not found</p>');

  const html = marked.parse(month.section);
  res.send(`<div style="padding:16px 20px">${html}</div>`);
});

// ─── Tool endpoints ────────────────────────────────────────────────────────────

app.get('/tools/random-encounter', async (req, res) => {
  const cr = encodeURIComponent(req.query.cr || '1');
  try {
    const r = await fetch(`https://www.dnd5eapi.co/api/monsters?challenge_rating=${cr}`);
    const data = await r.json();
    if (!data.results?.length) {
      return res.send(`<p style="color:#888;font-family:sans-serif;padding:8px">No monsters found for CR ${esc(req.query.cr || '1')}</p>`);
    }
    const pick = data.results[Math.floor(Math.random() * data.results.length)];
    const detail = await fetch(`https://www.dnd5eapi.co${pick.url}`);
    const m = await detail.json();
    const ac = Array.isArray(m.armor_class) ? m.armor_class[0]?.value : m.armor_class;
    const speed = Object.entries(m.speed || {}).map(([k, v]) => `${k} ${v}`).join(', ');
    const actions = (m.actions || []).slice(0, 4).map(a => esc(a.name)).join(', ');
    res.send(`
      <div style="font-family:'Palatino Linotype',serif;padding:4px">
        <h3 style="margin:0 0 6px;color:#58180d;font-size:1.2em">${esc(m.name)}</h3>
        <p style="margin:3px 0;font-size:0.9em;color:#555;font-style:italic">${esc(m.size)} ${esc(m.type)}, CR ${m.challenge_rating}</p>
        <hr style="border:none;border-top:1px solid #c9ad6a;margin:8px 0">
        <p style="margin:3px 0"><strong>AC</strong> ${ac ?? '—'} &nbsp;&nbsp; <strong>HP</strong> ${m.hit_points} &nbsp;&nbsp; <strong>Speed</strong> ${esc(speed)}</p>
        <table style="width:100%;border-collapse:collapse;margin:8px 0;font-size:0.85em;text-align:center">
          <tr style="background:#58180d;color:#f5f0e8">
            <th style="padding:4px">STR</th><th style="padding:4px">DEX</th><th style="padding:4px">CON</th>
            <th style="padding:4px">INT</th><th style="padding:4px">WIS</th><th style="padding:4px">CHA</th>
          </tr>
          <tr>
            <td style="padding:4px">${m.strength}</td><td style="padding:4px">${m.dexterity}</td><td style="padding:4px">${m.constitution}</td>
            <td style="padding:4px">${m.intelligence}</td><td style="padding:4px">${m.wisdom}</td><td style="padding:4px">${m.charisma}</td>
          </tr>
        </table>
        ${actions ? `<p style="margin:4px 0;font-size:0.9em"><strong>Actions:</strong> ${actions}</p>` : ''}
      </div>`);
  } catch (e) {
    res.status(500).send(`<p style="color:red;font-family:sans-serif;padding:8px">${esc(e.message)}</p>`);
  }
});

app.get('/tools/treasure-hoard', (req, res) => {
  const level = Math.min(20, Math.max(1, parseInt(req.query.level, 10) || 1));
  const roll = (n, d) => Array.from({ length: n }, () => Math.ceil(Math.random() * d)).reduce((a, b) => a + b, 0);

  let coins, gems, art, magic;
  if (level <= 4) {
    coins = `${roll(6, 6)} cp, ${roll(3, 6) * 10} sp, ${roll(2, 6) * 10} gp`;
    gems  = roll(1, 6) >= 4 ? `${roll(2, 6)} × 10gp gems` : null;
    art   = null; magic = null;
  } else if (level <= 10) {
    coins = `${roll(2, 6) * 100} sp, ${roll(6, 6) * 100} gp`;
    gems  = `${roll(2, 4)} × 25gp gems`;
    art   = roll(1, 6) >= 4 ? `${roll(2, 4)} × 25gp art objects` : null;
    magic = roll(1, 6) >= 5 ? 'Roll on Magic Item Table A' : null;
  } else if (level <= 16) {
    coins = `${roll(4, 6) * 1000} gp, ${roll(5, 6) * 100} pp`;
    gems  = `${roll(2, 6)} × 500gp gems`;
    art   = `${roll(2, 4)} × 250gp art objects`;
    magic = `Roll on Magic Item Table ${['C', 'D', 'E'][roll(1, 3) - 1]}`;
  } else {
    coins = `${roll(12, 6) * 1000} gp, ${roll(8, 6) * 1000} pp`;
    gems  = `${roll(3, 6)} × 1000gp gems`;
    art   = `${roll(2, 4)} × 2500gp art objects`;
    magic = `Roll on Magic Item Tables ${['E', 'F', 'G', 'H', 'I'][roll(1, 5) - 1]}`;
  }

  const items = [coins, gems, art, magic].filter(Boolean);
  res.send(`
    <div style="font-family:'Palatino Linotype',serif;padding:4px">
      <h3 style="margin:0 0 8px;color:#58180d">Treasure Hoard — Level ${level}</h3>
      <ul style="margin:0;padding-left:20px;line-height:1.8">
        ${items.map(i => `<li>${esc(i)}</li>`).join('')}
      </ul>
      <p style="margin-top:12px;font-size:0.85em;color:#7a6050;font-style:italic">Roll again for a new hoard.</p>
    </div>`);
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

'use strict';

const express  = require('express');
const http     = require('http');
const WebSocket = require('ws');
const path     = require('path');
const fs       = require('fs');
const { marked } = require('marked');

const cookieParser = require('cookie-parser');
const crypto = require('crypto');

const DM_PASSWORD = process.env.DM_PASSWORD || 'TPK';
const COOKIE_SECRET = process.env.COOKIE_SECRET || crypto.randomBytes(32).toString('hex');
const COOKIE_NAME = 'dm_auth';

// Optional deps — degrade gracefully if missing
let pty;
try { pty = require('node-pty'); } catch { console.warn('node-pty not found — terminal disabled'); }

let hbRender;
try {
  const { render } = require('../homebrewery-renderer');
  hbRender = render;
} catch (e) { console.warn('homebrewery-renderer unavailable — raw fallback'); }

const pdfIndexer = require('./lib/pdf-indexer');

const CAMPAIGN_ROOT = path.resolve(__dirname, '..');
const PDF_DIRS = {
  core:    process.env.PDF_DIR_CORE    || 'C:/Users/joshu/OneDrive/Documents/dnd/01 - Core Books',
  setting: process.env.PDF_DIR_SETTING || 'C:/Users/joshu/OneDrive/Documents/dnd/02 - Setting Books',
};
const ANNOTATIONS_FILE = path.join(CAMPAIGN_ROOT, 'web/data/pdf-annotations.json');

const indexingNow = new Set(); // bookIds currently being indexed in background

function pdfPathForBook(book) {
  const baseDir = PDF_DIRS[book.bookId.startsWith('core') ? 'core' : 'setting'];
  const rel = book.bookId.split('/').slice(1).join(path.sep);
  return path.join(baseDir, rel);
}

function allBooksFlat() {
  const result = [];
  for (const [cat, dir] of Object.entries(PDF_DIRS)) {
    if (!fs.existsSync(dir)) continue;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.toLowerCase().endsWith('.pdf')) {
        result.push({ bookId: `${cat}/${entry.name}`, name: entry.name });
      } else if (entry.isDirectory()) {
        const subDir = path.join(dir, entry.name);
        try {
          for (const sub of fs.readdirSync(subDir, { withFileTypes: true })) {
            if (sub.isFile() && sub.name.toLowerCase().endsWith('.pdf')) {
              result.push({
                bookId: `${cat}/${entry.name}/${sub.name}`,
                name: sub.name,
                subcategory: entry.name,
              });
            }
          }
        } catch { /* skip unreadable subdirectory */ }
      }
    }
  }
  return result;
}

function triggerIndexBuild(book) {
  if (indexingNow.has(book.bookId)) return;
  if (pdfIndexer.isIndexed(book.bookId)) return;
  const pdfPath = pdfPathForBook(book);
  if (!fs.existsSync(pdfPath)) return;
  indexingNow.add(book.bookId);
  pdfIndexer.buildIndex(book.bookId, pdfPath)
    .catch(e => console.error(`[pdf-indexer] Failed ${book.bookId}:`, e.message))
    .finally(() => indexingNow.delete(book.bookId));
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function extractSnippet(text, q) {
  const lc  = text.toLowerCase();
  const lq  = q.toLowerCase();
  const idx = lc.indexOf(lq);
  if (idx === -1) return '';
  const start = Math.max(0, idx - 60);
  const end   = Math.min(text.length, idx + q.length + 80);
  const raw   = (start > 0 ? '…' : '') + escapeHtml(text.slice(start, end)) + (end < text.length ? '…' : '');
  return raw.replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
    m => `<mark>${m}</mark>`);
}

const MAPS_OUTPUT_DIR = path.resolve(process.env.MAPS_OUTPUT_DIR || 'f:/NewProject/image-gen/output/maps');
const MAPS_LIBRARY_DIR = path.resolve(process.env.MAPS_LIBRARY_DIR || 'C:/Users/joshu/OneDrive/Documents/dnd/07 - Maps');
const MAP_RESOURCES_FILE = path.join(CAMPAIGN_ROOT, 'docs/map-resources.json');
const COMFYUI_URL = process.env.COMFYUI_URL || 'http://127.0.0.1:8000';
const BATTLEMAP_WORKFLOWS_DIR = process.env.BATTLEMAP_WORKFLOWS_DIR || 'f:/NewProject/image-gen/workflows';
const BATTLEMAP_TOPDOWN_NEGATIVE = "isometric, perspective view, 3d render, people, tokens, figures, text, watermark, blurry, low quality, worst quality";
const BATTLEMAP_SCENE_NEGATIVE = "grid, top-down, map, overhead view, photorealistic, text, watermark, nsfw, low quality, worst quality";

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
  'arcs', 'gm-lore', 'player-lore', 'timeline', 'tables', 'player-characters', 'homebrew',
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

// SRD spell names (slug = lowercase, non-alpha stripped) for auto-linking to 5etools
const SRD_SPELLS = new Set([
  // Short spells
  'fly','web','aid','blight','bless','fear','geas','harm','heal','jump','knock',
  'slow','wish',
  // Cantrips
  'firebolt','light','magehand','prestidigitation','sacredflame','thaumaturgy',
  'shockinggrasp','rayoffrost','poisonspray','eldritchblast','tollhedead','produceflame',
  'druidcraft','shillelagh','minorillusion','dancinglights','message','viciousmockery',
  'chilltough','friends',
  // 1st level
  'burninghands','charmperson','command','comprehendlanguages','curewounds','detectmagic',
  'disguiseself','entangle','fairiefire','findfamiliar','fogcloud','guidingbolt',
  'healingword','hellishrebuke','hideouslaughter','huntersmark','identify','inflictwounds',
  'jump','longstrider','magearmor','magicmissile','protectionfromevil','sanctuary',
  'shield','shieldoffaith','sleep','speakwithanimals','thunderwave','witchbolt',
  'protectionfromeviilandgood',
  // 2nd level
  'aid','animalmessenger','barkskin','blindnessdeafness','blur','calmemotions',
  'darkness','darkvision','detectthoughts','enlargereduce','flamingsphere','holdperson',
  'invisibility','knock','lesserrestoration','levitate','mirrorimage','mistystep',
  'moonbeam','passwithouttrace','phantasmalforce','prayerofhealing','seeinvisibility',
  'shatter','silence','spiderclimb','spiritualweapon','suggestion','web',
  // 3rd level
  'animatedead','bestowcurse','blink','calllightning','clairvoyance','conjureanimals',
  'counterspell','createfoodandwater','daylight','dispelmagic','fear','fireball','fly',
  'gaseousform','haste','hypnoticpattern','lightningbolt','masshealingword',
  'meldintstone','nondetection','plantgrowth','protectionfromenergy','removecurse',
  'revivify','sending','sleetstorm','slow','speakwithdead','spiritguardians',
  'stinkingcloud','tongues','vampirictouch','waterbreathing','waterwalk','windwall',
  // 4th level
  'arcaneeye','banishment','blight','compulsion','confusion','controlwater','deathward',
  'dimensiondoor','divination','dominatebeast','fabricate','fireshield',
  'freedomofmovement','giantinsect','greaterinvisibility','guardianoffaith',
  'hallucinatoryterrain','icestorm','locatecreature','polymorph','stoneskin',
  'walloffire','otilukesresilientsphere','phantasmalkiller',
  // 5th level
  'animateobjects','cloudkill','coneofcold','conjureelemental','contagion','creation',
  'dispelevilandgood','dominateperson','dream','flamestrike','geas','greaterrestoration',
  'holdmonster','holyweapon','insectplague','legendlore','masscurewounds','mislead',
  'modifymemory','passwall','planarbinding','raisedead','reincarnate','scrying',
  'seeming','telepathicbond','teleportationcircle','wallofforce','wallofstone',
  // 6th level
  'arcanagate','bladebarrier','chainlightning','circleofdeath','contingency',
  'createundead','disintegrate','eyebite','findthepath','fleshetostone','forbiddance',
  'globeofinvulnerability','harm','heal','heroesfeast','masssuggestion','moveearth',
  'sunbeam','trueseeing','wallofice','wallofthorns',
  // 7th level
  'delayedblastfireball','divineword','etherealness','fingerofdeath','firestorm',
  'forcecage','planeshift','prismaticspray','projectimage','regenerate','resurrection',
  'reversegravity','simulacrum','symbol','teleport',
  // 8th level
  'antimagicfield','clone','controlweather','demiplane','dominatemonster','earthquake',
  'feeblemind','mindblank','powwordstun','sunburst','tsunami',
  // 9th level
  'astralproject','foresight','gate','imprisonment','massheal','meteorswarm',
  'powerwordkill','prismaticwall','shapechange','timestop','truepolymorph',
  'trueresurrection','weird','wish',
]);

const SRD_CONDITIONS = new Set([
  'blinded','charmed','deafened','exhaustion','frightened','grappled',
  'incapacitated','invisible','paralyzed','petrified','poisoned','prone',
  'restrained','stunned','unconscious',
]);

// Parse Homebrewery image curly-style shorthand into a CSS string.
// e.g. "width:130px,float:right,margin:0 0 10px 15px" → "width:130px;float:right;margin:0 0 10px 15px"
function parseHbImageStyles(rawStyles) {
  const boolMap = { wrapRight: 'float:right', wrapLeft: 'float:left' };
  return rawStyles.split(',').map(part => {
    part = part.trim();
    if (boolMap[part]) return boolMap[part];
    const i = part.indexOf(':');
    if (i === -1) return '';
    const key = part.substring(0, i).trim();
    const val = part.substring(i + 1).trim().replace(/"/g, '');
    return key && val ? `${key}:${val}` : '';
  }).filter(Boolean).join(';');
}

function preprocessMarkdown(raw) {
  let md = raw;

  // Strip frontmatter
  md = md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');

  // Convert Homebrewery image curly-style syntax to inline HTML before Marked escapes it.
  // e.g. ![alt](url) {width:130px,float:right,margin:"0 0 10px 15px"}
  md = md.replace(/!\[([^\]]*)\]\(([^)]+)\)\s*\{([^}]+)\}/g, (_, alt, src, rawStyles) => {
    const styles = parseHbImageStyles(rawStyles);
    return `<img src="${src}" alt="${alt.replace(/"/g, '&quot;')}"${styles ? ` style="${styles}"` : ''}>`;
  });

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

  // Auto-link SRD spell names and conditions in italic to 5etools
  md = md.replace(/\*([a-z][a-z '/-]+[a-z])\*/g, (full, name) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (SRD_SPELLS.has(slug)) {
      const url = `http://localhost:2014/spells.html#${slug}_phb`;
      return `<a href="#" data-modal-5e="${url}" class="link-5e">${name}</a>`;
    }
    if (SRD_CONDITIONS.has(slug)) {
      const url = `http://localhost:2014/conditionsdiseases.html#${slug}_phb`;
      return `<a href="#" data-modal-5e="${url}" class="link-5e">${name}</a>`;
    }
    return full;
  });

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
app.use(cookieParser());

// ─── Auth middleware ───────────────────────────────────────────────────────────

// Routes that bypass auth (player-facing + login itself)
const PUBLIC_PREFIXES = [
  '/login', '/api/login', '/api/logout',
  // Rulebook viewer — public so players can be given the link
  '/rulebooks', '/api/pdf', '/api/books', '/api/annotations',
  '/api/pdf-search',
];

function signValue(val) {
  return val + '.' + crypto.createHmac('sha256', COOKIE_SECRET).update(val).digest('hex');
}

function verifyValue(signed) {
  if (!signed) return null;
  const dot = signed.lastIndexOf('.');
  if (dot === -1) return null;
  const val = signed.slice(0, dot);
  const expected = signValue(val);
  const a = Buffer.from(signed);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return null;
  return crypto.timingSafeEqual(a, b) ? val : null;
}

function requireAuth(req, res, next) {
  // Always allow public routes
  if (PUBLIC_PREFIXES.some(p => req.path.startsWith(p))) return next();

  const token = verifyValue(req.cookies[COOKIE_NAME]);
  if (token === 'dm') return next();

  // API request → 401
  if (req.path.startsWith('/api/') || req.headers['accept']?.includes('application/json')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // HTML request → redirect to login
  res.redirect('/login');
}

app.use(requireAuth);

// ─── Login / logout routes ─────────────────────────────────────────────────────

app.get('/login', (req, res) => {
  // Already logged in → redirect home
  if (verifyValue(req.cookies[COOKIE_NAME]) === 'dm') return res.redirect('/');
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/api/login', express.json(), (req, res) => {
  const { password } = req.body || {};
  if (!password) return res.status(401).json({ error: 'Wrong password' });
  try {
    const a = Buffer.from(password);
    const b = Buffer.from(DM_PASSWORD);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return res.status(401).json({ error: 'Wrong password' });
    }
  } catch {
    return res.status(401).json({ error: 'Wrong password' });
  }
  const signed = signValue('dm');
  res.cookie(COOKIE_NAME, signed, {
    httpOnly: true,
    sameSite: 'lax',
    // No maxAge → session cookie (clears when browser closes)
  });
  res.json({ ok: true });
});

app.get('/api/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME, { httpOnly: true, sameSite: 'lax' });
  res.redirect('/login');
});

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

// ─── MANIFEST.md ordering ─────────────────────────────────────────────────

// Parse a MANIFEST.md (or index.md fallback) and return an ordered list of filenames/dirnames.
// Extracts link targets from lines like: - [Label](filename.md) — description
function getManifestOrder(dir) {
  for (const name of ['MANIFEST.md', 'index.md']) {
    const p = path.join(dir, name);
    try {
      const content = fs.readFileSync(p, 'utf8');
      const order = [];
      const re = /\[([^\]]*)\]\(([^)]+)\)/g;
      let m;
      while ((m = re.exec(content)) !== null) {
        const target = m[2].trim();
        if (!target.startsWith('http')) order.push(path.basename(target).replace(/\.md$/, ''));
      }
      if (order.length) return order;
    } catch {}
  }
  return [];
}

function manifestSort(entries, dir) {
  const order = getManifestOrder(dir);
  if (!order.length) {
    return entries.sort((a, b) =>
      a.type !== b.type ? (a.type === 'dir' ? -1 : 1) : a.name.localeCompare(b.name));
  }
  return entries.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
    const ai = order.indexOf(a.name);
    const bi = order.indexOf(b.name);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return a.name.localeCompare(b.name);
  });
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
      }));
    res.json(manifestSort(entries, dir));
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
  .npc-header {
    display: flex; gap: 20px; align-items: flex-start;
    margin-bottom: 20px; padding-bottom: 16px;
    border-bottom: 2px solid #c9ad6a;
  }
  .npc-portrait {
    width: 120px; height: 120px; object-fit: cover;
    border-radius: 4px; border: 2px solid #c9ad6a;
    flex-shrink: 0;
  }
  .npc-meta { display: flex; flex-direction: column; gap: 4px; padding-top: 4px; }
  .npc-role { font-size: 1em; font-weight: bold; color: #58180d; }
  .npc-affil { font-size: 0.85em; color: #6b4c2a; font-style: italic; }
  .npc-loc { font-size: 0.85em; color: #555; }
  .npc-status {
    display: inline-block; margin-top: 4px; padding: 2px 8px;
    border-radius: 10px; font-size: 0.75em; text-transform: uppercase;
    letter-spacing: 0.05em; font-weight: bold;
  }
  .status-ally    { background: #d4edda; color: #155724; }
  .status-enemy   { background: #f8d7da; color: #721c24; }
  .status-neutral { background: #fff3cd; color: #856404; }
  .status-deceased { background: #e2e3e5; color: #383d41; }
  /* ── Sound cue buttons ──────────────────────────────────────── */
  .sound-strip {
    font-size: 0.78rem; margin: 6px 0 10px;
    padding: 5px 10px; background: #f0ebf8;
    border-left: 3px solid #9b6ec8; border-radius: 0 4px 4px 0;
    color: #6b4c90; display: flex; align-items: center;
    gap: 6px; flex-wrap: wrap;
  }
  .snd-cue {
    background: #6b3fa0; border: 1px solid #8b5fc8; color: #fff;
    padding: 2px 9px; font-size: 0.72rem; border-radius: 3px;
    cursor: pointer; font-family: system-ui, sans-serif; line-height: 1.6;
  }
  .snd-cue:hover { background: #8b5fc8; }
  .snd-sfx {
    background: #2a6a2a; border: 1px solid #4a8a4a; color: #fff;
    padding: 2px 9px; font-size: 0.72rem; border-radius: 3px;
    cursor: pointer; font-family: system-ui, sans-serif; line-height: 1.6;
  }
  .snd-sfx:hover { background: #4a8a4a; }
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
  <script>
    document.addEventListener('click', e => {
      const ml = e.target.closest('[data-modal]');
      if (ml) { e.preventDefault(); try { window.parent.dmOpenModal(ml.dataset.modal); } catch {} return; }
      const e5 = e.target.closest('[data-modal-5e]');
      if (e5) { e.preventDefault(); try { window.parent.dmOpen5eModal(e5.getAttribute('data-modal-5e').replace('localhost', window.parent.location.hostname)); } catch {} return; }
      const npc = e.target.closest('.npc-modal-trigger');
      if (npc) {
        e.preventDefault();
        const row = npc.closest('tr'), table = npc.closest('table.npc-table');
        if (!row || !table) return;
        const headers = [...table.querySelectorAll('thead th')].map(th => th.textContent.trim());
        const cells = [...row.querySelectorAll('td')];
        const name = cells[0]?.textContent.trim() || npc.textContent.trim();
        let html = '<dl style="margin:0;padding:20px 24px;font-family:\\'Palatino Linotype\\',Georgia,serif">';
        headers.forEach((h, i) => {
          if (i === 0 || !cells[i]) return;
          html += \`<dt style="font-weight:700;color:#8b7355;margin-top:14px;font-size:11px;text-transform:uppercase;letter-spacing:.05em">\${h}</dt>\`;
          html += \`<dd style="margin:4px 0 0 0;color:#2c1810;font-size:14px;line-height:1.6">\${cells[i].textContent.trim()}</dd>\`;
        });
        html += '</dl>';
        try { window.parent.dmOpenModalRaw(name, html); } catch {}
        return;
      }
      const sc = e.target.closest('[data-scene]');
      if (sc) { e.preventDefault(); try { window.parent.SoundPlayer && window.parent.SoundPlayer.play(sc.dataset.scene); } catch {} return; }
      const sfxBtn = e.target.closest('[data-sfx]');
      if (sfxBtn) { e.preventDefault(); try { window.parent.SoundPlayer && window.parent.SoundPlayer.sfx(sfxBtn.dataset.sfx); } catch {} return; }
    });
  <\/script>
</body>
</html>`;
}

function renderWebMarkdown(filePath, baseRel) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const fm = extractFrontmatter(raw);
  const title = fm.name || fm.title || path.basename(filePath, '.md').replace(/[-_]/g, ' ');
  const preprocessed = preprocessMarkdown(raw);
  let html = marked.parse(preprocessed);

  // Inject NPC portrait + metadata header when frontmatter fields are present
  if (fm.role || fm.location || fm.status || fm.affiliation) {
    let header = '<div class="npc-header">';
    // Portrait is rendered inline in the ## Profile section (float:right), not duplicated here.
    header += '<div class="npc-meta">';
    if (fm.role)        header += `<div class="npc-role">${esc(fm.role)}</div>`;
    if (fm.affiliation) header += `<div class="npc-affil">${esc(fm.affiliation)}</div>`;
    if (fm.location)    header += `<div class="npc-loc">📍 ${esc(fm.location)}</div>`;
    if (fm.status) {
      const statusClass = { ally: 'status-ally', enemy: 'status-enemy', neutral: 'status-neutral', deceased: 'status-deceased' }[fm.status] || 'status-neutral';
      header += `<div class="npc-status ${statusClass}">${esc(fm.status)}</div>`;
    }
    header += '</div></div>';
    html = header + html;
  }
  // Post-process: inject data-modal on cross-reference links
  html = html.replace(
    /<a href="((?:npcs|locations|factions|arcs|gm-lore|player-lore|adventures|timeline|homebrew)\/[^"]+)">/g,
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

// ─── Maps generation ──────────────────────────────────────────────────────

app.use('/maps-output', requireAuth, (req, res) => {
  const fname = decodeURIComponent(req.path.replace(/^\//, ''));
  if (!/^[\w\-. ]+\.(png|jpg|webp)$/i.test(fname)) return res.status(400).end();
  const resolvedBase = path.resolve(MAPS_OUTPUT_DIR);
  const full = path.resolve(MAPS_OUTPUT_DIR, fname);
  if (!full.startsWith(resolvedBase)) return res.status(403).end();
  res.sendFile(full, { root: '/' });
});

// ─── Serve images from the 07-Maps library directory ─────────────────────

app.use('/maps-library', requireAuth, (req, res) => {
  const rel = decodeURIComponent(req.path.replace(/^\//, ''));
  const full = path.resolve(path.join(MAPS_LIBRARY_DIR, rel));
  if (!full.startsWith(MAPS_LIBRARY_DIR)) return res.status(403).end();
  if (!/\.(png|jpg|jpeg|webp)$/i.test(full)) return res.status(400).end();
  res.sendFile(full, { root: '/' });
});

// ─── Map library API (07-Maps + adventure image folders) ─────────────────

app.get('/api/map-library', requireAuth, (req, res) => {
  const maps = [];

  // Load metadata from map-resources.json for richer descriptions
  let meta = {};
  try {
    const raw = JSON.parse(fs.readFileSync(MAP_RESOURCES_FILE, 'utf8'));
    const digitalMaps = raw?.map_resources?.digital_maps?.maps || [];
    for (const m of digitalMaps) {
      meta[m.filename_base] = m;
    }
  } catch { /* metadata optional */ }

  // 1. Scan 07 - Maps top-level (numbered commercial maps, skip gridless + skip downloads/)
  try {
    const files = fs.readdirSync(MAPS_LIBRARY_DIR)
      .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f) && !f.includes('gridless'));
    for (const f of files) {
      const base = path.basename(f, path.extname(f)); // "130", "178" etc.
      const gridlessName = `${base} (gridless)${path.extname(f)}`;
      const m = meta[base] || {};
      maps.push({
        id: `lib-${base}`,
        name: m.description ? `Map ${base} — ${m.terrain}` : `Map ${base}`,
        filename: f,
        url: `/maps-library/${encodeURIComponent(f)}`,
        gridless_url: fs.existsSync(path.join(MAPS_LIBRARY_DIR, gridlessName))
          ? `/maps-library/${encodeURIComponent(gridlessName)}` : null,
        source: '07-maps',
        terrain: m.terrain || '',
        tags: m.tags || [],
        northwatch_uses: m.northwatch_uses || [],
        description: m.description || '',
      });
    }
  } catch { /* skip if inaccessible */ }

  // 2. Walk adventures/ directory recursively for any image files
  const adventuresRoot = path.join(CAMPAIGN_ROOT, 'adventures');
  function walkForImages(dir) {
    try {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
          walkForImages(full);
        } else if (e.isFile() && /\.(png|jpg|jpeg|webp)$/i.test(e.name)) {
          const rel = path.relative(CAMPAIGN_ROOT, full).replace(/\\/g, '/');
          // Derive a human-readable label from the path
          const parts = rel.split('/'); // adventures/season-1/the-pale-sickness/handouts/file.png
          const adventurePart = parts.length >= 3 ? parts[2].replace(/-/g, ' ') : '';
          maps.push({
            id: `adv-${rel.replace(/[^a-z0-9]/gi, '-')}`,
            name: adventurePart ? `${adventurePart} — ${e.name}` : e.name,
            filename: e.name,
            url: `/raw?path=${encodeURIComponent(rel)}`,
            source: 'adventure',
            adventure: adventurePart,
            terrain: '',
            tags: [],
            northwatch_uses: [],
          });
        }
      }
    } catch { /* skip unreadable dirs */ }
  }

  walkForImages(adventuresRoot);

  res.json(maps);
});

app.get('/api/maps', requireAuth, (req, res) => {
  try {
    if (!fs.existsSync(MAPS_OUTPUT_DIR)) return res.json([]);
    const files = fs.readdirSync(MAPS_OUTPUT_DIR)
      .filter(f => /\.(png|jpg|webp)$/i.test(f))
      .flatMap(f => {
        try {
          const full = path.join(path.resolve(MAPS_OUTPUT_DIR), f);
          const stat = fs.statSync(full);
          return [{ filename: f, url: `/maps-output/${encodeURIComponent(f)}`, mtime: stat.mtimeMs }];
        } catch { return []; }
      })
      .sort((a, b) => b.mtime - a.mtime);
    res.json(files);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/maps/generate', requireAuth, express.json(), async (req, res) => {
  const { style, prompt, negative_prompt, seed, steps, cfg, model } = req.body || {};
  if (!prompt) return res.status(400).json({ error: 'prompt required' });
  if (!['topdown', 'scene'].includes(style)) return res.status(400).json({ error: 'style must be topdown or scene' });

  const workflowFile = style === 'topdown'
    ? path.join(BATTLEMAP_WORKFLOWS_DIR, 'txt2img_battlemap_topdown_sdxl.json')
    : path.join(BATTLEMAP_WORKFLOWS_DIR, 'txt2img_battlemap_scene.json');

  let wf;
  try {
    wf = JSON.parse(fs.readFileSync(workflowFile, 'utf8'));
  } catch (e) {
    return res.status(500).json({ error: `Failed to load workflow: ${e.message}` });
  }

  const resolvedSeed = (seed != null && Number.isInteger(seed) && seed >= 0)
    ? seed
    : Math.floor(Math.random() * 2**32);
  const resolvedSteps = steps || 25;
  const resolvedCfg = cfg || (style === 'topdown' ? 3.0 : 8.0);

  const defaultNeg = style === 'topdown' ? BATTLEMAP_TOPDOWN_NEGATIVE : BATTLEMAP_SCENE_NEGATIVE;
  try {
    wf['3']['inputs']['text'] = prompt;
    wf['4']['inputs']['text'] = negative_prompt || defaultNeg;
    if (model) wf['1']['inputs']['ckpt_name'] = model;
    wf['6']['inputs']['seed'] = resolvedSeed;
    wf['6']['inputs']['steps'] = resolvedSteps;
    wf['6']['inputs']['cfg'] = resolvedCfg;
  } catch (e) {
    return res.status(500).json({ error: `Workflow schema mismatch: ${e.message}` });
  }

  const clientId = crypto.randomUUID();
  let promptId;
  try {
    const submitResp = await fetch(`${COMFYUI_URL}/prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: wf, client_id: clientId }),
    });
    if (!submitResp.ok) {
      const text = await submitResp.text();
      return res.status(502).json({ error: `ComfyUI rejected workflow: ${text}` });
    }
    const submitData = await submitResp.json();
    if (submitData.error) return res.status(502).json({ error: submitData.error });
    promptId = submitData.prompt_id;
  } catch (e) {
    return res.status(502).json({ error: `ComfyUI unreachable: ${e.message}` });
  }

  let imageInfo = null;
  const deadline = Date.now() + 120_000;
  while (Date.now() < deadline) {
    await new Promise(r => setTimeout(r, 2000));
    try {
      const histResp = await fetch(`${COMFYUI_URL}/history/${promptId}`);
      const hist = await histResp.json();
      if (hist[promptId]) {
        const entry = hist[promptId];
        if (entry.status?.status_str === 'error') {
          return res.status(502).json({ error: `ComfyUI error: ${JSON.stringify(entry.status.messages)}` });
        }
        for (const nodeOut of Object.values(entry.outputs || {})) {
          for (const img of (nodeOut.images || [])) {
            imageInfo = img;
          }
        }
        if (imageInfo) break;
      }
    } catch { /* keep polling */ }
  }

  if (!imageInfo) return res.status(504).json({ error: 'Generation timed out after 120s' });

  let imgBytes;
  try {
    const viewResp = await fetch(
      `${COMFYUI_URL}/view?filename=${encodeURIComponent(imageInfo.filename)}&subfolder=${encodeURIComponent(imageInfo.subfolder || '')}&type=${imageInfo.type || 'output'}`
    );
    if (!viewResp.ok) return res.status(502).json({ error: 'Failed to fetch image from ComfyUI' });
    imgBytes = Buffer.from(await viewResp.arrayBuffer());
  } catch (e) {
    return res.status(502).json({ error: `Failed to fetch image: ${e.message}` });
  }

  fs.mkdirSync(MAPS_OUTPUT_DIR, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${style}_${timestamp}_${resolvedSeed}.png`;
  const outPath = path.join(MAPS_OUTPUT_DIR, filename);
  fs.writeFileSync(outPath, imgBytes);

  res.json({ filename, url: `/maps-output/${encodeURIComponent(filename)}` });
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

// ─── Character sheet parser & API ────────────────────────────────────────────

function parseCharacterSheet(raw, filename) {
  function tableVal(block, key) {
    const re = new RegExp(`\\|\\s*\\*\\*${key}\\*\\*\\s*\\|\\s*([^|\\n]+?)\\s*\\|`);
    const m = block.match(re);
    return m ? m[1].trim() : '';
  }

  function getSection(name) {
    const re = new RegExp(`## ${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\n([\\s\\S]*?)(?=\\n## |$)`);
    const m = raw.match(re);
    return m ? m[1] : '';
  }

  const nameMatch = raw.match(/^# (.+)/m);
  const name = nameMatch ? nameMatch[1].trim() : filename.replace('.md', '');

  const infoBlock = getSection('Character Information');
  const classLevel = tableVal(infoBlock, 'Class & Level');
  const classMatch = classLevel.match(/^(\S+)\s+(\d+)/);
  const cls = classMatch ? classMatch[1] : classLevel;
  const level = classMatch ? parseInt(classMatch[2]) : 0;

  const abilityBlock = getSection('Ability Scores');
  const abilities = {};
  [['Strength','STR'],['Dexterity','DEX'],['Constitution','CON'],
   ['Intelligence','INT'],['Wisdom','WIS'],['Charisma','CHA']].forEach(([full, ab]) => {
    const re = new RegExp(`\\|\\s*\\*\\*${full}\\*\\*\\s*\\|\\s*(\\d+)\\s*\\|\\s*([+\\-]\\d+)\\s*\\|`);
    const m = abilityBlock.match(re);
    if (m) abilities[ab] = { score: m[1], mod: m[2] };
  });

  const combatBlock = getSection('Combat Statistics');
  const defenses = { resistances: [], immunities: [], advantages: [] };
  const resM = combatBlock.match(/\*\*Resistances:\*\*\s*([^\n]+)/);
  if (resM) defenses.resistances = resM[1].split(',').map(s => s.trim());
  const immM = combatBlock.match(/\*\*Immunities:\*\*\s*([^\n]+)/);
  if (immM) defenses.immunities = immM[1].split(',').map(s => s.trim());
  const advM = combatBlock.match(/\*\*Advantage\*\*\s*on\s*([^\n]+)/i);
  if (advM) defenses.advantages.push('Advantage on ' + advM[1].trim());

  const profBlock = getSection('Proficiencies');
  const savesM = profBlock.match(/### Saving Throws\n([\s\S]*?)(?=###|$)/);
  const savingThrows = [];
  if (savesM) {
    for (const line of savesM[1].split('\n')) {
      const m = line.match(/^-\s+(.+)/);
      if (m) savingThrows.push(m[1].trim());
    }
  }

  const skills = [];
  const skillsMatch = profBlock.match(/### Skills\n([\s\S]*?)(?=###|$)/);
  if (skillsMatch) {
    for (const line of skillsMatch[1].split('\n')) {
      const m = line.match(/^\|\s*([^|]+?)\s*\|\s*([+\-]\d+)\s*\|\s*([^|]+?)\s*\|\s*([+\-]\d+)\s*\|/);
      if (m && !m[1].includes('---') && !/skill/i.test(m[1])) {
        skills.push({ name: m[1].trim(), mod: m[2] });
        skills.push({ name: m[3].trim(), mod: m[4] });
      }
      // Single-entry row (Falcor's skills table)
      const m2 = line.match(/^\|\s*([^|]+?)\s*\|\s*([+\-]\d+)\s*\|$/);
      if (m2 && !m2[1].includes('---') && !/skill/i.test(m2[1])) {
        skills.push({ name: m2[1].trim(), mod: m2[2] });
      }
    }
  }

  const armorM  = profBlock.match(/\*\*Armor:\*\*\s*([^\n]+)/);
  const weaponM = profBlock.match(/\*\*Weapons:\*\*\s*([^\n]+)/);
  const toolM   = profBlock.match(/\*\*Tools:\*\*\s*([^\n]+)/);
  const langMatch = profBlock.match(/### Languages\n([\s\S]*?)(?=###|$)/);
  const languages = [];
  if (langMatch) {
    for (const line of langMatch[1].split('\n')) {
      const m = line.match(/^-\s+(.+)/);
      if (m) languages.push(m[1].trim());
    }
  }

  const sensesBlock = getSection('Senses & Passive Abilities');
  const passives = {};
  for (const line of sensesBlock.split('\n')) {
    const m = line.match(/\|\s*\*\*([^*]+)\*\*\s*\|\s*([^|]+?)\s*\|/);
    if (m) passives[m[1].trim()] = m[2].trim();
  }

  const featBlock = getSection('Special Abilities');
  const features = [];
  if (featBlock.trim()) {
    const parts = featBlock.split(/\n(?=### )/);
    for (const part of parts) {
      const lines = part.trim().split('\n');
      const featName = lines[0].replace(/^### /, '').trim();
      if (!featName) continue;
      let subtitle = '';
      const descLines = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!subtitle && /^\*\*[^*]+:\*\*/.test(line)) {
          subtitle = line.replace(/\*\*/g, '');
        } else if (line) {
          descLines.push(line);
        }
      }
      features.push({ name: featName, subtitle, description: descLines.join(' ').trim() });
    }
  }

  // Support both "Attacks" and "Attacks & Cantrips"
  const attacksRaw = raw.match(/## Attacks[^\n]*\n([\s\S]*?)(?=\n## |$)/);
  const attacks = [];
  if (attacksRaw) {
    const parts = attacksRaw[1].split(/\n(?=### )/);
    for (const part of parts) {
      const lines = part.trim().split('\n');
      const atkName = lines[0].replace(/^### /, '').trim();
      if (!atkName) continue;
      let bonus = '', damage = '', notes = '';
      for (const line of lines) {
        const bonusM2 = line.match(/\*\*Attack Bonus:\*\*\s*([^\n]+)/);
        if (bonusM2) bonus = bonusM2[1].trim();
        const dmgM2 = line.match(/\*\*Damage:\*\*\s*([^\n]+)/);
        if (dmgM2) damage = dmgM2[1].trim();
        const compM2 = line.match(/\*\*Components:\*\*\s*([^\n]+)/);
        if (compM2) notes = compM2[1].trim();
      }
      attacks.push({ name: atkName, bonus, damage, notes });
    }
  }

  // ── Spellcasting ──────────────────────────────────────────────────────────
  const spellBlock = getSection('Spellcasting');
  let spellcasting = null;
  if (spellBlock.trim()) {
    const attackM = spellBlock.match(/\*\*Spell Attack Modifier:\*\*\s*([^\n]+)/);
    const dcM     = spellBlock.match(/\*\*Spell Save DC:\*\*\s*([^\n]+)/);
    const abilM   = spellBlock.match(/\*\*Spellcasting Ability:\*\*\s*([^\n]+)/);

    // Spell slots: | Level | Total | Used |
    const slots = [];
    const slotSection = spellBlock.match(/### Spell Slots\n([\s\S]*?)(?=###|$)/);
    if (slotSection) {
      for (const line of slotSection[1].split('\n')) {
        const m = line.match(/^\|\s*(\d+(?:st|nd|rd|th)?)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|/i);
        if (m) slots.push({ level: m[1], total: m[2], used: m[3] });
      }
    }

    // Prepared spells: | Level | Spells |
    const prepared = [];
    const prepSection = spellBlock.match(/### Prepared Spells\n([\s\S]*?)(?=###|$)/);
    if (prepSection) {
      for (const line of prepSection[1].split('\n')) {
        const m = line.match(/^\|\s*(\d+(?:st|nd|rd|th)?|Cantrips?)\s*\|\s*([^|]+?)\s*\|/i);
        if (m && !/level/i.test(m[1]) && !m[1].includes('---')) {
          prepared.push({ level: m[1], spells: m[2].trim() });
        }
      }
    }

    // Cantrips: | Cantrip | ... | or ### Cantrips section
    const cantripSection = spellBlock.match(/### Cantrips?\n([\s\S]*?)(?=###|$)/);
    if (cantripSection) {
      const names = [];
      for (const line of cantripSection[1].split('\n')) {
        const m = line.match(/^-\s+(.+)/);
        if (m) names.push(m[1].trim());
      }
      if (names.length) prepared.unshift({ level: 'Cantrips', spells: names.join(', ') });
    }

    spellcasting = {
      attackMod: attackM ? attackM[1].trim() : '',
      saveDC:    dcM     ? dcM[1].trim()     : '',
      ability:   abilM   ? abilM[1].trim()   : '',
      slots,
      prepared,
      extraSpellLists: [],
    };
  }

  // Scan Special Abilities for any "### * Spells *" subsections with a Level|Spells table
  // (e.g. Oath Spells, Domain Spells, Expanded Spells)
  const spellListRe = /### ([^\n]*Spells[^\n]*)\n([\s\S]*?)(?=\n### |\n## |$)/gi;
  let slMatch;
  while ((slMatch = spellListRe.exec(featBlock)) !== null) {
    const title = slMatch[1].trim();
    const body  = slMatch[2];
    const entries = [];
    for (const line of body.split('\n')) {
      const m = line.match(/^\|\s*(\d+(?:st|nd|rd|th)?|Cantrips?)\s*\|\s*([^|]+?)\s*\|/i);
      if (m && !/level/i.test(m[1]) && !m[1].includes('---')) {
        entries.push({ level: m[1], spells: m[2].trim() });
      }
    }
    if (entries.length) {
      if (!spellcasting) {
        spellcasting = { attackMod: '', saveDC: '', ability: '', slots: [], prepared: [], extraSpellLists: [] };
      }
      spellcasting.extraSpellLists.push({ title, entries });
    }
  }

  return {
    name,
    player: tableVal(infoBlock, 'Player Name'),
    classLevel,
    class: cls,
    level,
    species: tableVal(infoBlock, 'Species'),
    background: tableVal(infoBlock, 'Background'),
    xp: tableVal(infoBlock, 'Experience Points'),
    ac: tableVal(combatBlock, 'Armor Class'),
    initiative: tableVal(combatBlock, 'Initiative'),
    maxHp: tableVal(combatBlock, 'Max HP'),
    hitDice: tableVal(combatBlock, 'Hit Dice'),
    speed: tableVal(combatBlock, 'Speed').replace(/\s*\(Walking\)/i, ''),
    profBonus: tableVal(combatBlock, 'Proficiency Bonus'),
    abilities, savingThrows, skills,
    armorProf: armorM ? armorM[1].trim() : '',
    weaponProf: weaponM ? weaponM[1].trim() : '',
    toolProf: toolM ? toolM[1].trim() : '',
    languages, passives, defenses, features, attacks, spellcasting,
    isCompanion: /falcor/i.test(filename),
  };
}

app.get('/api/characters', (req, res) => {
  try {
    const dir = path.join(CAMPAIGN_ROOT, 'player-characters');
    const files = fs.readdirSync(dir)
      .filter(f => f.endsWith('.md') && f !== 'MANIFEST.md' && f !== 'index.md');
    // Order: john, kuetis, perkia, falcor
    const ORDER = ['john-paladin.md', 'kuetis-grlevr.md', 'perkia-fali.md', 'falcor.md'];
    files.sort((a, b) => {
      const ai = ORDER.indexOf(a); const bi = ORDER.indexOf(b);
      return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
    });
    const characters = files.map(f => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8');
      return parseCharacterSheet(raw, f);
    });
    res.json(characters);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── Manifest editor API ──────────────────────────────────────────────────────

app.get('/api/manifest', (req, res) => {
  try {
    const dir = safePath(req.query.path);
    if (!fs.statSync(dir).isDirectory()) return res.status(400).json({ error: 'Not a directory' });
    const manifestPath = path.join(dir, 'MANIFEST.md');
    const content = fs.existsSync(manifestPath) ? fs.readFileSync(manifestPath, 'utf8') : '';
    res.json({ content, path: toRel(manifestPath) });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post('/api/manifest', express.text({ type: '*/*' }), (req, res) => {
  try {
    const dir = safePath(req.query.path);
    if (!fs.statSync(dir).isDirectory()) return res.status(400).json({ error: 'Not a directory' });
    const manifestPath = path.join(dir, 'MANIFEST.md');
    fs.writeFileSync(manifestPath, req.body, 'utf8');
    res.json({ ok: true, path: toRel(manifestPath) });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ─── Campaign Tracker API ─────────────────────────────────────────────────────

const TRACKER_SECTIONS = new Set(['party', 'contracts', 'npcs', 'clues', 'promises', 'treasure']);

app.get('/api/tracker', (req, res) => {
  const section = req.query.section;
  if (!TRACKER_SECTIONS.has(section)) return res.status(400).json({ error: 'Invalid section' });
  const filePath = path.join(CAMPAIGN_ROOT, 'timeline', `${section}.md`);
  try {
    const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
    res.json({ content });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/tracker', express.text({ type: '*/*' }), (req, res) => {
  const section = req.query.section;
  if (!TRACKER_SECTIONS.has(section)) return res.status(400).json({ error: 'Invalid section' });
  const filePath = path.join(CAMPAIGN_ROOT, 'timeline', `${section}.md`);
  try {
    fs.writeFileSync(filePath, req.body, 'utf8');
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/tracker/sessions', (req, res) => {
  const dir = path.join(CAMPAIGN_ROOT, 'timeline', 'sessions');
  try {
    if (!fs.existsSync(dir)) return res.json([]);
    const files = fs.readdirSync(dir)
      .filter(f => /^session-\d+\.md$/.test(f))
      .sort();
    const sessions = files.map(f => {
      const content = fs.readFileSync(path.join(dir, f), 'utf8');
      const fm = extractFrontmatter(content);
      const body = content.replace(/^---[\s\S]*?---\n?/, '');
      const preview = body.split('\n').find(l => l.trim() && !l.startsWith('#')) || '';
      return { id: f.replace('.md', ''), session: fm.session || '', date: fm.date || '',
               adventure: fm.adventure || '', level: fm.level || '',
               preview: preview.slice(0, 100) };
    });
    res.json(sessions);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/tracker/session', (req, res) => {
  const id = req.query.id;
  if (!/^session-\d+$/.test(id)) return res.status(400).json({ error: 'Invalid session id' });
  const filePath = path.join(CAMPAIGN_ROOT, 'timeline', 'sessions', `${id}.md`);
  try {
    const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
    res.json({ content });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/tracker/session', express.text({ type: '*/*' }), (req, res) => {
  const id = req.query.id;
  if (!/^session-\d+$/.test(id)) return res.status(400).json({ error: 'Invalid session id' });
  const filePath = path.join(CAMPAIGN_ROOT, 'timeline', 'sessions', `${id}.md`);
  try {
    fs.writeFileSync(filePath, req.body, 'utf8');
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/tracker/session/new', (req, res) => {
  const dir = path.join(CAMPAIGN_ROOT, 'timeline', 'sessions');
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const existing = fs.readdirSync(dir).filter(f => /^session-\d+\.md$/.test(f));
    const nums = existing.map(f => parseInt(f.match(/\d+/)[0], 10));
    const next = nums.length ? Math.max(...nums) + 1 : 1;
    const id = `session-${String(next).padStart(3, '0')}`;
    const content = `---\nsession: ${next}\ndate: \nadventure: \nlevel: \n---\n\n## Key Events\n\n\n## MVP Moment\n\n`;
    fs.writeFileSync(path.join(dir, `${id}.md`), content, 'utf8');
    res.json({ ok: true, id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── Print endpoint (handouts) ────────────────────────────────────────────────

app.get('/print', (req, res) => {
  try {
    const filePath = safePath(req.query.path);
    const raw = fs.readFileSync(filePath, 'utf8');
    const fm = extractFrontmatter(raw);
    const body = raw.replace(/^---[\s\S]*?---\n?/, '');
    const html = marked.parse(body);
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${esc(fm.title || 'Handout')}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Palatino Linotype', Palatino, 'Book Antiqua', serif;
      background: #f4e8c1;
      color: #1a0a00;
      max-width: 680px;
      margin: 40px auto;
      padding: 48px 56px;
      border: 1px solid #8b6914;
      outline: 3px double #c4a862;
      outline-offset: -8px;
      box-shadow: inset 0 0 60px rgba(139,105,20,0.06), 0 2px 12px rgba(0,0,0,0.15);
      min-height: calc(100vh - 80px);
    }
    h1, h2, h3 { font-weight: normal; margin-bottom: 0.75em; color: #3a1a00; }
    h1 { font-size: 1.4em; border-bottom: 1px solid #c4a862; padding-bottom: 0.4em; }
    h2 { font-size: 1.1em; }
    p { line-height: 1.75; margin-bottom: 0.85em; }
    pre {
      font-family: 'Courier New', Consolas, monospace;
      font-size: 0.82em; white-space: pre-wrap; line-height: 1.65;
      background: rgba(139,105,20,0.06); padding: 12px 16px;
      border-left: 3px solid #c4a862; margin-bottom: 0.85em;
    }
    ul, ol { margin: 0 0 0.85em 1.6em; line-height: 1.75; }
    hr { border: none; border-top: 1px solid #c4a862; margin: 1.2em 0; }
    .reveal-note {
      font-size: 0.78em; color: #7a5c1e; font-style: italic;
      margin-bottom: 1.8em; padding-bottom: 1em;
      border-bottom: 1px dashed #c4a862;
    }
    .print-btn {
      position: fixed; bottom: 24px; right: 24px;
      background: #58180d; color: #f5f0e8; border: none;
      padding: 10px 22px; font-family: inherit; font-size: 13px;
      cursor: pointer; border-radius: 3px; letter-spacing: 0.03em;
    }
    .print-btn:hover { background: #7a2010; }
    @media print {
      body { margin: 0; box-shadow: none; min-height: auto; }
      .reveal-note, .print-btn { display: none; }
    }
  </style>
</head>
<body>
  ${fm.when ? `<div class="reveal-note">⏱ Reveal when: ${esc(fm.when)}</div>` : ''}
  ${html}
  <button class="print-btn" onclick="window.print()">🖨 Print / Save PDF</button>
</body>
</html>`);
  } catch (e) {
    res.status(400).send(`<p style="color:red;font-family:sans-serif;padding:20px">${esc(e.message)}</p>`);
  }
});

// ─── Adventure monster extractor ─────────────────────────────────────────────

function extractMonstersFromAdventure(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const monsters = [];
  const seen = new Set();

  function add(name, ac, hp, cr, count) {
    name = name.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
    // Strip leading digit count (e.g. "4 zombies")
    const countPrefix = name.match(/^(\d+)\s+(.+)/);
    if (countPrefix) { count = count || parseInt(countPrefix[1]); name = countPrefix[2]; }
    // Strip word-number prefix ("One fanatical cultist" → "fanatical cultist")
    name = name.replace(/^(One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten)\s+/i, '');
    if (!name || ac < 1 || hp < 1) return;
    const key = `${name}|${ac}|${hp}`;
    if (seen.has(key)) return;
    seen.add(key);
    monsters.push({ name, ac: parseInt(ac), hp: parseInt(hp), cr: cr || null, count: count || 1 });
  }

  // Pattern 1: list item — "- Name: AC X, HP Y" (with optional bold, count prefix)
  const listRe = /^[-*]\s+(?:\d+\s+)?(?:\*{0,2})([^:(*\n]{2,50}?)(?:\*{0,2})\s*:\s+AC\s+(\d+),\s*HP\s+(\d+)(?:,\s*CR\s*([^\s,\-—\n)]+))?/gm;
  let m;
  while ((m = listRe.exec(raw)) !== null) {
    // Grab count if line starts like "- 5 cultists:"
    const countM = m[0].match(/^[-*]\s+(\d+)\s+/);
    add(m[1], m[2], m[3], m[4], countM ? parseInt(countM[1]) : 1);
  }

  // Pattern 2: parenthetical — "N name (AC X, HP Y[, ...])" — no closing paren required
  // Handles "4 zombie Dragonknights (AC 12, HP 11, slow...)" and "1 winged kobold (AC 13, HP 8, fly...)"
  const parenRe = /(?:^|[\s.!?,])(\d+\s+)?([A-Za-z][a-zA-Z '\/\-]{2,50}?)\s+\(AC\s+(\d+),\s*HP\s+(\d+)(?:,\s*CR\s*([^\s,\-—\n)]+))?/gm;
  while ((m = parenRe.exec(raw)) !== null) {
    add(m[2], m[3], m[4], m[5], m[1] ? parseInt(m[1]) : 1);
  }

  return monsters;
}

app.get('/api/adventure-monsters', (req, res) => {
  try {
    const filePath = safePath(req.query.path);
    if (!filePath.endsWith('.md')) return res.status(400).json({ error: 'Not a markdown file' });
    const monsters = extractMonstersFromAdventure(filePath);
    res.json(monsters);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── NPC list API ─────────────────────────────────────────────────────────────

function parseNpcFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const fm = extractFrontmatter(raw);
  if (!fm.name) return null;

  // AC from stat block table: | **Armor Class** | 17 (splint) |
  const acMatch = raw.match(/\|\s*\*\*Armor Class\*\*\s*\|\s*(\d+)/i);
  const ac = acMatch ? parseInt(acMatch[1]) : null;

  // HP from stat block table: | **Hit Points** | 58 (9d8 + 18) |
  const hpMatch = raw.match(/\|\s*\*\*Hit Points\*\*\s*\|\s*(\d+)/i);
  const hp = hpMatch ? parseInt(hpMatch[1]) : null;

  // DEX mod from ability scores row: | 16 (+3) | 13 (+1) | ...
  const abilityMatch = raw.match(/\|\s*\d+\s*\([^)]+\)\s*\|\s*\d+\s*\(([+-]?\d+)\)\s*\|/);
  const dexMod = abilityMatch ? parseInt(abilityMatch[1]) : null;

  // Speed from stat block table: | **Speed** | 30 ft. |
  const speedMatch = raw.match(/\|\s*\*\*Speed\*\*\s*\|\s*([^|\n]+)/i);
  const speed = speedMatch ? speedMatch[1].trim() : null;

  // Extract portrait: frontmatter first, then inline image in Profile section
  let portrait = fm.portrait || '';
  if (!portrait) {
    const inlineImg = raw.match(/## Profile[\s\S]*?!\[[^\]]*\]\(([^)]+)\)/);
    if (inlineImg) portrait = inlineImg[1];
  }

  // Extract synopsis: first non-image paragraph after ## Profile, first 2 sentences max
  const profileMatch = raw.match(/## Profile\s*\n+([\s\S]*?)(?=\n## |\n---|$)/);
  let synopsis = '';
  if (profileMatch) {
    for (const para of profileMatch[1].split(/\n\n+/)) {
      const cleaned = para.replace(/!\[[^\]]*\]\([^)]*\)(?:\s*\{[^}]*\})?/g, '').trim();
      if (cleaned) {
        // Strip all **Label:** bold prefixes, then take first sentence only
        const text = cleaned.replace(/\*\*[^*]+:\*\*\s*/g, '').trim();
        const firstSentence = text.match(/^[^.!?]+[.!?]+/);
        synopsis = (firstSentence ? firstSentence[0] : text.slice(0, 160)).trim();
        break;
      }
    }
  }

  return {
    name: fm.name,
    ac, hp, dexMod,
    role: fm.role || '',
    affiliation: fm.affiliation || '',
    location: fm.location || '',
    status: fm.status || '',
    introduced: fm.introduced || '',
    tags: fm.tags || '',
    synopsis,
    portrait,
    speed,
    path: path.relative(CAMPAIGN_ROOT, filePath).replace(/\\/g, '/')
  };
}

app.get('/api/npcs', (req, res) => {
  try {
    const dirs = [
      path.join(CAMPAIGN_ROOT, 'npcs', 'core'),
      path.join(CAMPAIGN_ROOT, 'npcs', 'season-1'),
    ];
    const npcs = [];
    for (const dir of dirs) {
      if (!fs.existsSync(dir)) continue;
      for (const file of fs.readdirSync(dir)) {
        if (!file.endsWith('.md') || file === 'index.md' || file === '_template.md') continue;
        try {
          const npc = parseNpcFile(path.join(dir, file));
          if (npc) npcs.push(npc);
        } catch { /* skip malformed files */ }
      }
    }
    npcs.sort((a, b) => a.name.localeCompare(b.name));
    res.json(npcs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── Location list API ─────────────────────────────────────────────────────────

function parseLocationFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const fm = extractFrontmatter(raw);
  if (!fm.name) return null;

  // Extract synopsis: strip all **Label:** prefixes, first sentence of Description
  const descMatch = raw.match(/## Description\s*\n+([\s\S]*?)(?=\n## |\n---|$)/);
  let synopsis = '';
  if (descMatch) {
    for (const para of descMatch[1].split(/\n\n+/)) {
      const cleaned = para.replace(/\*\*[^*]+:\*\*\s*/g, '').trim();
      if (cleaned) {
        const first = cleaned.match(/^[^.!?]+[.!?]+/);
        synopsis = (first ? first[0] : cleaned.slice(0, 160)).trim();
        break;
      }
    }
  }

  return {
    name: fm.name,
    type: fm.type || '',
    region: fm.region || '',
    introduced: fm.introduced || '',
    status: fm.status || '',
    tags: fm.tags || '',
    synopsis,
    path: path.relative(CAMPAIGN_ROOT, filePath).replace(/\\/g, '/')
  };
}

app.get('/api/locations', (req, res) => {
  try {
    const locationsRoot = path.join(CAMPAIGN_ROOT, 'locations');
    const results = [];
    if (!fs.existsSync(locationsRoot)) {
      res.json([]);
      return;
    }
    for (const region of fs.readdirSync(locationsRoot)) {
      const regionPath = path.join(locationsRoot, region);
      if (!fs.statSync(regionPath).isDirectory()) continue;
      for (const file of fs.readdirSync(regionPath)) {
        if (!file.endsWith('.md') || file === 'index.md' || file === '_template.md' || file === 'MANIFEST.md') continue;
        try {
          const loc = parseLocationFile(path.join(regionPath, file));
          if (loc) {
            loc.regionDir = region;
            results.push(loc);
          }
        } catch { /* skip malformed files */ }
      }
    }
    results.sort((a, b) => a.name.localeCompare(b.name));
    res.json(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── Combatant detail API ──────────────────────────────────────────────────────

function escHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function markdownToStatBlockHtml(raw) {
  // Mark separator rows (|:---:|) BEFORE processing table rows
  raw = raw.replace(/^---[\s\S]*?---\n?/, '');
  raw = raw.replace(/^\|[\s:|-]+\|$/gm, '[[HR]]');
  raw = raw.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  raw = raw.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
  raw = raw.replace(/^#{1,3}\s+(.+)$/gm, '<h4>$1</h4>');
  // Table rows → sb-row divs (detect ability score header row)
  const ABILITY_HEADERS = new Set(['STR','DEX','CON','INT','WIS','CHA']);
  raw = raw.replace(/^\|(.+)\|$/gm, (_, cells) => {
    const cols = cells.split('|').map(c => c.trim()).filter(Boolean);
    const isAbilityHeader = cols.length === 6 && cols.every(c => ABILITY_HEADERS.has(c.toUpperCase()));
    const cls = isAbilityHeader ? 'sb-row sb-row--ab-header' : 'sb-row';
    return `<div class="${cls}">${cols.map(c => `<span>${c}</span>`).join('')}</div>`;
  });
  raw = raw.replace(/\[\[HR\]\]/g, '<hr>');
  // Bullet items → li, then wrap consecutive li in ul
  raw = raw.replace(/^[-*]\s+(.+)$/gm, '<li>$1</li>');
  raw = raw.replace(/(<li>[^\n]*<\/li>\n?)+/g, m =>
    `<ul style="margin:4px 0 8px;padding-left:18px">${m.trim()}</ul>`);
  // Double newlines → paragraph break
  raw = raw.replace(/\n{2,}/g, '<br>');
  return raw.trim();
}

// Returns only the ## Stat Block Reference section of an NPC file as HTML
app.get('/api/npc-statblock', (req, res) => {
  const relPath = (req.query.path || '').replace(/\\/g, '/');
  const full = path.resolve(path.join(CAMPAIGN_ROOT, relPath));
  if (!full.startsWith(path.resolve(path.join(CAMPAIGN_ROOT, 'npcs')))) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const raw = fs.readFileSync(full, 'utf8');
    const m = raw.match(/## Stat Block Reference\s*\n+([\s\S]*?)(?=\n## |\n---|$)/);
    if (!m) return res.json({ html: '' });
    // Strip AC, HP, Speed rows — shown in the stat frames above the stat block
    const section = m[1].trim()
      .replace(/^\|[^|]*\*\*Armor Class\*\*[^|]*\|[^\n]*/gm, '')
      .replace(/^\|[^|]*\*\*Hit Points\*\*[^|]*\|[^\n]*/gm, '')
      .replace(/^\|[^|]*\*\*Speed\*\*[^|]*\|[^\n]*/gm, '');
    res.json({ html: markdownToStatBlockHtml(section) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Returns Description + Notable Features sections of a location file as HTML
app.get('/api/location-content', (req, res) => {
  const relPath = (req.query.path || '').replace(/\\/g, '/');
  const full = path.resolve(path.join(CAMPAIGN_ROOT, relPath));
  if (!full.startsWith(path.resolve(path.join(CAMPAIGN_ROOT, 'locations')))) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const raw = fs.readFileSync(full, 'utf8');
    // Extract Description and Notable Features sections
    const sections = [];
    for (const heading of ['Description', 'Notable Features', 'Key NPCs Present']) {
      const m = raw.match(new RegExp(`## ${heading}\\s*\\n+([\\s\\S]*?)(?=\\n## |\\n---|$)`));
      if (m) sections.push(`## ${heading}\n\n${m[1].trim()}`);
    }
    res.json({ html: sections.length ? markdownToStatBlockHtml(sections.join('\n\n')) : '' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── Homebrew API ──────────────────────────────────────────────────────────────

function parseHomebrewFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const fm = extractFrontmatter(raw);
  const name = fm.title || fm.name || '';
  if (!name || fm.type === 'index') return null;

  // Synopsis: first non-heading, non-divider, non-italic-subtitle paragraph
  const body = raw.replace(/^---[\s\S]*?---\n?/, '');
  let synopsis = '';
  for (const para of body.split(/\n\n+/)) {
    const t = para.trim();
    if (!t || t.startsWith('#') || t === '---' || /^\*[^*\n]+\*$/.test(t)) continue;
    const cleaned = t
      .replace(/!\[[^\]]*\]\([^)]*\)(?:\s*\{[^}]*\})?/g, '')
      .replace(/\*\*[^*]+:\*\*\s*/g, '')
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/{{[^}]*}}/g, '') // strip Homebrewery blocks
      .trim();
    if (cleaned) {
      const first = cleaned.match(/^[^.!?]+[.!?]+/);
      synopsis = (first ? first[0] : cleaned.slice(0, 160)).trim();
      break;
    }
  }

  return {
    name,
    type: fm.type || 'item',
    subtype: fm.subtype || '',
    rarity: fm.rarity || '',
    attunement: String(fm['requires-attunement']) === 'true',
    source: fm.source || '',
    tags: Array.isArray(fm.tags) ? fm.tags.join(', ') : (fm.tags || ''),
    synopsis,
    path: path.relative(CAMPAIGN_ROOT, filePath).replace(/\\/g, '/')
  };
}

app.get('/api/homebrew', (req, res) => {
  try {
    const homebrewRoot = path.join(CAMPAIGN_ROOT, 'homebrew');
    const results = [];
    function walk(dir) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) { walk(fullPath); continue; }
        if (!entry.name.endsWith('.md')) continue;
        if (['index.md', 'MANIFEST.md'].includes(entry.name) || entry.name.startsWith('_')) continue;
        try {
          const item = parseHomebrewFile(fullPath);
          if (item) results.push(item);
        } catch { /* skip malformed */ }
      }
    }
    walk(homebrewRoot);
    results.sort((a, b) => a.name.localeCompare(b.name));
    res.json(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Returns rendered HTML of a homebrew file's body (minus frontmatter + title heading)
app.get('/api/homebrew-content', (req, res) => {
  const relPath = (req.query.path || '').replace(/\\/g, '/');
  const full = path.resolve(path.join(CAMPAIGN_ROOT, relPath));
  if (!full.startsWith(path.resolve(path.join(CAMPAIGN_ROOT, 'homebrew')))) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const raw = fs.readFileSync(full, 'utf8');
    const body = raw
      .replace(/^---[\s\S]*?---\n?/, '')  // strip frontmatter
      .replace(/^#[^\n]*\n?/, '')          // strip title heading
      .replace(/{{note[\s\S]*?}}/g, m => {  // render Homebrewery note blocks
        const inner = m.replace(/^{{note\s*/, '').replace(/}}$/, '').trim();
        return `\n\n> **Note:** ${inner}\n\n`;
      })
      .trim();
    res.json({ html: markdownToStatBlockHtml(body) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Generate (or fetch) a homebrew stub for an unknown spell / ability
app.post('/api/homebrew/generate', (req, res) => {
  const { name, type, description, character } = req.body || {};
  if (!name) return res.status(400).json({ error: 'name required' });

  const typeDir = (type === 'spell') ? 'spells' : 'abilities';
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const relPath = `homebrew/${typeDir}/${slug}.md`;
  const fullPath = path.join(CAMPAIGN_ROOT, relPath);

  // Return existing file if already generated
  if (fs.existsSync(fullPath)) {
    try {
      const raw = fs.readFileSync(fullPath, 'utf8');
      const body = raw.replace(/^---[\s\S]*?---\n?/, '').replace(/^#[^\n]*\n?/, '').trim();
      return res.json({ path: relPath, html: markdownToStatBlockHtml(body) });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Build a clean markdown stub from whatever description we have
  const typeLabel = type === 'spell' ? 'Spell' : 'Ability';
  const sourceNote = character ? `*From the character sheet of **${character}**.*` : '*Source: Character sheet.*';
  const descSection = description
    ? description.trim()
    : '*No description available in character sheet.*';

  const content = `---
name: ${name}
type: homebrew-${type || 'ability'}
generated: true
---

# ${name}

*${typeLabel} — Homebrew / Custom*

${sourceNote}

${descSection}
`;

  try {
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf8');
    const body = content.replace(/^---[\s\S]*?---\n?/, '').replace(/^#[^\n]*\n?/, '').trim();
    res.json({ path: relPath, html: markdownToStatBlockHtml(body) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── Shops API ────────────────────────────────────────────────────────────────

const SHOPS_DIR = path.join(__dirname, 'data', 'shops');

app.get('/api/shops', (req, res) => {
  try {
    if (!fs.existsSync(SHOPS_DIR)) return res.json([]);
    const shops = fs.readdirSync(SHOPS_DIR)
      .filter(f => f.endsWith('.json'))
      .sort()
      .map(f => {
        try { return JSON.parse(fs.readFileSync(path.join(SHOPS_DIR, f), 'utf8')); }
        catch { return null; }
      })
      .filter(Boolean);
    res.json(shops);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/combatant-detail', async (req, res) => {
  const name = (req.query.name || '').trim();
  const type = (req.query.type || '').trim(); // 'npc' | 'player' | 'monster'
  if (!name) return res.status(400).json({ error: 'name required' });

  // 1. Try NPC files (npc or monster type)
  if (type !== 'player') {
    const dirs = [
      path.join(CAMPAIGN_ROOT, 'npcs', 'core'),
      path.join(CAMPAIGN_ROOT, 'npcs', 'season-1'),
    ];
    for (const dir of dirs) {
      if (!fs.existsSync(dir)) continue;
      for (const file of fs.readdirSync(dir)) {
        if (!file.endsWith('.md')) continue;
        try {
          const raw = fs.readFileSync(path.join(dir, file), 'utf8');
          const nameMatch = raw.match(/^name:\s*(.+)$/m);
          if (nameMatch && nameMatch[1].trim().toLowerCase() === name.toLowerCase()) {
            return res.json({ html: markdownToStatBlockHtml(raw), source: 'npc' });
          }
        } catch { /* skip */ }
      }
    }
  }

  // 2. Try player characters
  if (type === 'player' || type === '') {
    const pcDir = path.join(CAMPAIGN_ROOT, 'player-characters');
    if (fs.existsSync(pcDir)) {
      for (const file of fs.readdirSync(pcDir)) {
        if (!file.endsWith('.md')) continue;
        try {
          const raw = fs.readFileSync(path.join(pcDir, file), 'utf8');
          const nameMatch = raw.match(/^name:\s*(.+)$/m);
          if (nameMatch && nameMatch[1].trim().toLowerCase() === name.toLowerCase()) {
            return res.json({ html: markdownToStatBlockHtml(raw), source: 'player' });
          }
        } catch { /* skip */ }
      }
    }
  }

  // 3. Try 5etools bestiary cache (monsters)
  if (bestiaryCache) {
    const entry = bestiaryCache.find(m => m.name.toLowerCase() === name.toLowerCase());
    if (entry) {
      const html = `<h4>${escHtml(entry.name)}</h4>
        <div class="sb-row"><span><strong>AC</strong> ${entry.ac}</span><span><strong>HP</strong> ${entry.hp}</span><span><strong>CR</strong> ${entry.cr}</span></div>
        <p style="color:#888;font-size:11px;margin-top:8px">Full stat block available in 5etools at port 2014.</p>`;
      return res.json({ html, source: '5etools' });
    }
  }

  // 4. Fallback: show basic info from name alone
  const html = `<h4>${escHtml(name)}</h4><p style="color:#888">No stat block found for this combatant.</p>`;
  res.json({ html, source: 'none' });
});

// ─── Adventures list API ──────────────────────────────────────────────────────

function labelFromFilename(filename) {
  return filename
    .replace(/\.md$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

// Parse MANIFEST.md to extract adventure order for a given season directory
function parseManifestOrder(manifestPath) {
  try {
    const content = fs.readFileSync(manifestPath, 'utf8');
    // Find "## Adventure Order" section and extract numbered list items
    const match = content.match(/## Adventure Order\s*\n([\s\S]*?)(?=\n## |\n---|\Z)/);
    if (!match) return null;
    const lines = match[1].trim().split('\n');
    const order = [];
    for (const line of lines) {
      // Match: "1. [Label](target)" or "2. [Label](target.md)"
      const m = line.match(/^\s*\d+\.\s*\[.*?\]\(([^)]+)\)/);
      if (m) {
        // Strip .md to get the sort key (matches both file names and folder names)
        order.push(m[1].replace(/\.md$/, ''));
      }
    }
    return order.length ? order : null;
  } catch (e) {
    return null;
  }
}

// Parse adventure frontmatter with array support for tags
function parseAdventureFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const result = {};
  for (const line of m[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon < 1) continue;
    const key = line.slice(0, colon).trim();
    const val = line.slice(colon + 1).trim();
    // Handle arrays: tags: [a, b, c]
    const arrMatch = val.match(/^\[(.*)\]$/);
    if (arrMatch) {
      result[key] = arrMatch[1].split(',').map(s => s.trim()).filter(Boolean);
    } else {
      result[key] = val.replace(/^["']|["']$/g, '');
    }
  }
  return result;
}

// Extract the first paragraph after "## Quick Brief" as synopsis
function extractSynopsis(content) {
  const match = content.match(/## Quick Brief\s*\n+([\s\S]*?)(?=\n## |\n---|\Z)/);
  if (!match) return '';
  return match[1].split('\n\n')[0].trim();
}

// Determine adventure statuses by reading session logs
function getAdventureStatuses() {
  const sessionsDir = path.join(CAMPAIGN_ROOT, 'timeline', 'sessions');
  const statuses = {}; // normalized adventure name -> { completed: true, sessionDate: string }
  let latestSession = null;
  let latestDate = '';

  try {
    const files = fs.readdirSync(sessionsDir).filter(f => /^session-\d+\.md$/i.test(f));
    for (const file of files) {
      const content = fs.readFileSync(path.join(sessionsDir, file), 'utf8');
      const fm = extractFrontmatter(content);
      if (fm.adventure) {
        const date = fm.date || '';
        // Normalize adventure name for matching
        const norm = fm.adventure.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
        statuses[norm] = { completed: true, date, raw: fm.adventure };
        if (date > latestDate) {
          latestDate = date;
          latestSession = norm;
        }
      }
    }
  } catch (e) {
    // sessions dir may not exist
  }

  return { statuses, latestSession };
}

app.get('/api/adventures', (req, res) => {
  try {
    const adventuresRoot = path.join(CAMPAIGN_ROOT, 'adventures');
    const results = [];

    // Walk season subdirectories only
    const seasonDirs = fs.readdirSync(adventuresRoot)
      .filter(d => /^season-\d+$/i.test(d))
      .map(d => ({ season: d, full: path.join(adventuresRoot, d) }))
      .filter(d => fs.statSync(d.full).isDirectory());

    const SKIP = new Set(['index.md', '_template.md', 'MANIFEST.md', 'session-0-character-integration.md']);

    for (const { season, full } of seasonDirs) {
      for (const entry of fs.readdirSync(full)) {
        const entryPath = path.join(full, entry);
        const stat = fs.statSync(entryPath);

        if (stat.isFile() && entry.endsWith('.md') && !SKIP.has(entry) && !entry.endsWith('-handouts')) {
          const rel = path.relative(CAMPAIGN_ROOT, entryPath).replace(/\\/g, '/');
          const raw = fs.readFileSync(entryPath, 'utf8');
          const fm = parseAdventureFrontmatter(raw);
          const synopsis = extractSynopsis(raw);
          results.push({
            label: fm.name || labelFromFilename(entry),
            path: rel,
            season,
            sortKey: entry.replace(/\.md$/, ''),
            levels: fm.levels || '',
            sessions: fm.sessions || '',
            duration: fm.duration || '',
            type: fm.type || '',
            mysteryRating: fm['mystery-rating'] || '',
            arc: fm.arc || '',
            tags: fm.tags || [],
            synopsis
          });
        } else if (stat.isDirectory() && !entry.endsWith('-handouts') && entry !== 'general-handouts') {
          // Multi-part adventures: look for index.md inside
          const indexFile = path.join(entryPath, 'index.md');
          if (fs.existsSync(indexFile)) {
            const rel = path.relative(CAMPAIGN_ROOT, indexFile).replace(/\\/g, '/');
            const raw = fs.readFileSync(indexFile, 'utf8');
            const fm = parseAdventureFrontmatter(raw);
            const synopsis = extractSynopsis(raw);
            results.push({
              label: fm.name || labelFromFilename(entry),
              path: rel,
              season,
              sortKey: entry,
              levels: fm.levels || '',
              sessions: fm.sessions || '',
              duration: fm.duration || '',
              type: fm.type || '',
              mysteryRating: fm['mystery-rating'] || '',
              arc: fm.arc || '',
              tags: fm.tags || [],
              synopsis
            });
          }
        }
      }
    }

    // Determine statuses from session logs
    const { statuses, latestSession } = getAdventureStatuses();

    for (const adv of results) {
      const norm = adv.label.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
      // Also check if any session adventure field contains this adventure name
      let status = 'upcoming';
      for (const [sessionNorm, info] of Object.entries(statuses)) {
        if (sessionNorm.includes(norm) || norm.includes(sessionNorm)) {
          status = 'completed';
          if (sessionNorm === latestSession) {
            status = 'current';
          }
          break;
        }
      }
      adv.status = status;
    }

    results.sort((a, b) => {
      const seasonCmp = a.season.localeCompare(b.season);
      if (seasonCmp !== 0) return seasonCmp;
      // Load manifest order for this season if available
      const manifestPath = path.join(adventuresRoot, a.season, 'MANIFEST.md');
      const order = parseManifestOrder(manifestPath);
      if (order) {
        const idxA = order.indexOf(a.sortKey);
        const idxB = order.indexOf(b.sortKey);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
      }
      return a.label.localeCompare(b.label);
    });
    // Merge manual status overrides (override takes precedence over session-derived status)
    const overrides = loadAdventureStatusOverrides();
    for (const adv of results) {
      if (overrides[adv.path]) adv.status = overrides[adv.path];
    }

    res.json(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── Adventure status override ─────────────────────────────────────────────────

const ADVENTURE_STATUS_FILE = path.join(CAMPAIGN_ROOT, 'timeline', 'adventure-status.json');

function loadAdventureStatusOverrides() {
  try {
    if (fs.existsSync(ADVENTURE_STATUS_FILE)) {
      return JSON.parse(fs.readFileSync(ADVENTURE_STATUS_FILE, 'utf8'));
    }
  } catch { /* ignore */ }
  return {};
}

app.post('/api/adventures/status', express.json(), (req, res) => {
  const { path: advPath, status } = req.body || {};
  const VALID = new Set(['upcoming', 'current', 'completed']);
  if (!advPath || !VALID.has(status)) {
    return res.status(400).json({ error: 'path and status (upcoming|current|completed) required' });
  }
  try {
    const overrides = loadAdventureStatusOverrides();
    overrides[advPath] = status;
    fs.mkdirSync(path.dirname(ADVENTURE_STATUS_FILE), { recursive: true });
    fs.writeFileSync(ADVENTURE_STATUS_FILE, JSON.stringify(overrides, null, 2));
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── 5etools / open5e bestiary search API ─────────────────────────────────────

let bestiaryCache = null; // [{ name, ac, hp, cr }]

async function load5etoolsBestiary() {
  if (bestiaryCache) return bestiaryCache;
  // 5etools stores an index at /data/bestiary/index.json mapping source codes to filenames
  const indexRes = await fetch('http://localhost:2014/data/bestiary/index.json');
  const index = await indexRes.json();
  const files = Object.values(index);

  const fetches = files.map(f =>
    fetch(`http://localhost:2014/data/bestiary/${f}`)
      .then(r => r.json())
      .catch(() => null)
  );
  const results = await Promise.all(fetches);

  const monsters = [];
  for (const data of results) {
    if (!data || !Array.isArray(data.monster)) continue;
    for (const m of data.monster) {
      const ac = Array.isArray(m.ac) ? (m.ac[0]?.ac ?? m.ac[0] ?? 10) : (m.ac ?? 10);
      const hp = m.hp?.average ?? 0;
      const cr = m.cr?.cr ?? m.cr ?? '?';
      monsters.push({ name: m.name, ac: parseInt(ac) || 10, hp: parseInt(hp) || 0, cr: String(cr) });
    }
  }
  bestiaryCache = monsters;
  return monsters;
}

async function searchOpen5e(q) {
  const url = `https://api.open5e.com/v1/monsters/?search=${encodeURIComponent(q)}&limit=20`;
  const res = await fetch(url);
  const data = await res.json();
  return (data.results || []).map(m => ({
    name: m.name,
    ac: typeof m.armor_class === 'number' ? m.armor_class : 10,
    hp: m.hit_points ?? 0,
    cr: String(m.challenge_rating ?? '?'),
  }));
}

app.get('/api/5etools/search', async (req, res) => {
  const q = (req.query.q || '').trim().toLowerCase();
  if (q.length < 2) return res.json([]);

  // Try 5etools local first
  try {
    const all = await load5etoolsBestiary();
    const scored = [];
    for (const m of all) {
      const name = m.name.toLowerCase();
      if (name === q)                    scored.push({ m, score: 0 });        // exact
      else if (name.startsWith(q))       scored.push({ m, score: 1 });        // prefix
      else if (new RegExp(`\\b${q}`).test(name)) scored.push({ m, score: 2 }); // word boundary
      else if (name.includes(q))         scored.push({ m, score: 3 });        // substring
    }
    if (scored.length > 0) {
      scored.sort((a, b) => a.score - b.score || a.m.name.localeCompare(b.m.name));
      return res.json(scored.slice(0, 20).map(s => s.m));
    }
  } catch { /* fall through to open5e */ }

  // Fallback: open5e SRD API
  try {
    const results = await searchOpen5e(q);
    return res.json(results);
  } catch (e) {
    res.status(502).json({ error: 'Bestiary search unavailable: ' + e.message });
  }
});

// ─── 5etools item search API ──────────────────────────────────────────────────

let itemsCache = null; // [{ name, source, type, rarity }]

async function load5etoolsItems() {
  if (itemsCache) return itemsCache;
  try {
    const r = await fetch('http://localhost:2014/data/items.json');
    const data = await r.json();
    const items = (data.item || []).map(it => ({
      name: it.name,
      source: it.source || 'PHB',
      type: it.type || '',
      rarity: it.rarity || 'none',
    }));
    itemsCache = items;
    return items;
  } catch {
    itemsCache = [];
    return [];
  }
}

app.get('/api/5etools/item-search', async (req, res) => {
  const q = (req.query.q || '').trim().toLowerCase();
  if (q.length < 2) return res.json([]);
  try {
    const all = await load5etoolsItems();
    const scored = [];
    for (const it of all) {
      const name = it.name.toLowerCase();
      if (name === q)                           scored.push({ it, score: 0 });
      else if (name.startsWith(q))              scored.push({ it, score: 1 });
      else if (new RegExp(`\\b${q}`).test(name)) scored.push({ it, score: 2 });
      else if (name.includes(q))                scored.push({ it, score: 3 });
    }
    scored.sort((a, b) => a.score - b.score || a.it.name.localeCompare(b.it.name));
    res.json(scored.slice(0, 20).map(s => s.it));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── Encounter persistence API ────────────────────────────────────────────────

const ENCOUNTERS_DIR = path.join(CAMPAIGN_ROOT, 'encounters');

app.get('/api/encounters', (req, res) => {
  try {
    fs.mkdirSync(ENCOUNTERS_DIR, { recursive: true });
    const files = fs.readdirSync(ENCOUNTERS_DIR)
      .filter(f => f.endsWith('.json'))
      .map(f => {
        const name = f.replace(/\.json$/, '');
        const stat = fs.statSync(path.join(ENCOUNTERS_DIR, f));
        return { name, modified: stat.mtimeMs };
      })
      .sort((a, b) => b.modified - a.modified);
    res.json(files);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/encounters/:name', (req, res) => {
  const name = req.params.name.replace(/[^a-zA-Z0-9 _-]/g, '').trim();
  if (!name) return res.status(400).json({ error: 'Invalid name' });
  const filePath = path.join(ENCOUNTERS_DIR, `${name}.json`);
  try {
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Not found' });
    res.json(JSON.parse(fs.readFileSync(filePath, 'utf8')));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/encounters/:name', (req, res) => {
  const name = req.params.name.replace(/[^a-zA-Z0-9 _-]/g, '').trim();
  if (!name) return res.status(400).json({ error: 'Invalid name' });
  try {
    fs.mkdirSync(ENCOUNTERS_DIR, { recursive: true });
    fs.writeFileSync(path.join(ENCOUNTERS_DIR, `${name}.json`), JSON.stringify(req.body, null, 2), 'utf8');
    res.json({ ok: true, name });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/encounters/:name', (req, res) => {
  const name = req.params.name.replace(/[^a-zA-Z0-9 _-]/g, '').trim();
  if (!name) return res.status(400).json({ error: 'Invalid name' });
  try {
    const filePath = path.join(ENCOUNTERS_DIR, `${name}.json`);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/sounds/custom', (req, res) => {
  try {
    const dir = path.join(__dirname, 'public', 'sounds', 'custom');
    if (!fs.existsSync(dir)) return res.json([]);
    const files = fs.readdirSync(dir).filter(f => /\.(mp3|ogg|wav)$/i.test(f));
    res.json(files);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── PDF full-text search ─────────────────────────────────────────────────────

app.get('/api/pdf-search', (req, res) => {
  const q     = (req.query.q || '').trim();
  const scope = (req.query.scope || 'all').trim();

  if (q.length < 2) return res.json({ results: [], indexing: [] });

  const all  = allBooksFlat();
  let books;
  if (scope === 'all')          books = all;
  else if (scope === 'core')    books = all.filter(b => b.bookId.startsWith('core/') && !b.subcategory);
  else if (scope === 'setting') books = all.filter(b => b.bookId.startsWith('setting/'));
  else if (scope === 'ua')      books = all.filter(b => b.subcategory === 'Unearthed Arcana');
  else if (scope.startsWith('book:')) {
    const id = scope.slice(5);
    books = all.filter(b => b.bookId === id);
  } else books = all;

  const results  = [];
  const indexing = [];

  for (const book of books) {
    if (results.length >= 20) break;

    if (!pdfIndexer.isIndexed(book.bookId)) {
      triggerIndexBuild(book);
      if (indexingNow.has(book.bookId)) indexing.push(book.bookId);
      continue;
    }

    const index = pdfIndexer.loadIndex(book.bookId);
    if (!index) continue;

    const bookName = book.name.replace(/\.pdf$/i, '');

    for (const { page, text } of index.pages) {
      if (results.length >= 20) break;
      if (!text.toLowerCase().includes(q.toLowerCase())) continue;
      results.push({
        bookId:  book.bookId,
        bookName,
        page,
        snippet: extractSnippet(text, q),
      });
    }
  }

  res.json({ results, indexing });
});

// ─── Rulebook routes ─────────────────────────────────────────────────────────

app.get('/api/books', (req, res) => {
  try {
    const result = {};
    for (const [cat, dir] of Object.entries(PDF_DIRS)) {
      result[cat] = [];
      if (!fs.existsSync(dir)) continue;
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.isFile() && entry.name.toLowerCase().endsWith('.pdf')) {
          result[cat].push({ name: entry.name, bookId: `${cat}/${entry.name}` });
        } else if (entry.isDirectory()) {
          try {
            const subDir = path.join(dir, entry.name);
            for (const sub of fs.readdirSync(subDir, { withFileTypes: true })) {
              if (sub.isFile() && sub.name.toLowerCase().endsWith('.pdf')) {
                result[cat].push({
                  name: sub.name,
                  subcategory: entry.name,
                  bookId: `${cat}/${entry.name}/${sub.name}`,
                });
              }
            }
          } catch { /* skip unreadable subdirectory */ }
        }
      }
    }
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── PDF streaming route ───────────────────────────────────────────────────

app.get('/api/pdf/:category/*', (req, res) => {
  const category = req.params.category;
  const filename  = req.params[0]; // everything after /api/pdf/:category/

  if (!PDF_DIRS[category]) return res.status(400).send('Invalid category');
  if (!filename.toLowerCase().endsWith('.pdf')) return res.status(400).send('Invalid file type');

  const baseDir  = path.resolve(PDF_DIRS[category]);
  const fullPath = path.resolve(path.join(baseDir, filename));

  // Path traversal guard — resolved path must remain inside baseDir
  if (fullPath !== baseDir && !fullPath.startsWith(baseDir + path.sep)) {
    return res.status(403).send('Forbidden');
  }

  if (!fs.existsSync(fullPath)) return res.status(404).send('Not found');

  const stat = fs.statSync(fullPath);
  const fileSize = stat.size;
  const rangeHeader = req.headers.range;

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline');
  res.setHeader('Accept-Ranges', 'bytes');

  if (rangeHeader) {
    // Parse "bytes=start-end" (end is optional)
    const [, startStr, endStr] = /bytes=(\d+)-(\d*)/.exec(rangeHeader) || [];
    const start = parseInt(startStr, 10);
    const end   = endStr ? parseInt(endStr, 10) : fileSize - 1;

    if (isNaN(start) || start >= fileSize || end >= fileSize || start > end) {
      res.setHeader('Content-Range', `bytes */${fileSize}`);
      return res.status(416).send('Range Not Satisfiable');
    }

    res.setHeader('Content-Range',  `bytes ${start}-${end}/${fileSize}`);
    res.setHeader('Content-Length', end - start + 1);
    res.status(206);
    const stream = fs.createReadStream(fullPath, { start, end });
    stream.on('error', () => { if (!res.headersSent) res.status(500).send('Error reading file'); });
    stream.pipe(res);
  } else {
    res.setHeader('Content-Length', fileSize);
    const stream = fs.createReadStream(fullPath);
    stream.on('error', () => { if (!res.headersSent) res.status(500).send('Error reading file'); });
    stream.pipe(res);
  }
});

app.get('/api/annotations', (req, res) => {
  if (!fs.existsSync(ANNOTATIONS_FILE)) {
    return res.json({ collections: [], bookmarks: [], annotations: {} });
  }
  try {
    res.json(JSON.parse(fs.readFileSync(ANNOTATIONS_FILE, 'utf8')));
  } catch {
    res.json({ collections: [], bookmarks: [], annotations: {} });
  }
});

app.post('/api/annotations', express.json({ limit: '10mb' }), (req, res) => {
  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body) ||
      !('annotations' in body) || !('bookmarks' in body) || !('collections' in body)) {
    return res.status(400).json({ error: 'Invalid annotations shape' });
  }
  try {
    fs.mkdirSync(path.dirname(ANNOTATIONS_FILE), { recursive: true });
    fs.writeFileSync(ANNOTATIONS_FILE, JSON.stringify(body, null, 2), 'utf8');
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/rulebooks', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'rulebooks.html'));
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
    let proc;
    try {
      proc = pty.spawn(shell, [], {
        name: 'xterm-color', cols: 120, rows: 30,
        cwd: CAMPAIGN_ROOT, env: process.env,
      });
    } catch (e) {
      console.warn('Failed to spawn PTY:', e.message);
      return null;
    }
    const s = { proc, buf: '', ws: null, idleTimer: null };
    sessions.set(id, s);

    if (process.platform === 'win32') {
      proc.write('$env:PATH += \';C:\\Users\\joshu\\AppData\\Roaming\\npm\'\r\n');
    }
    proc.write('claude --resume "webportal"\r\n');

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
            if (!id) {
              ws.send(JSON.stringify({ type: 'output', data: '\r\nTerminal unavailable: PTY spawn failed\r\n' }));
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

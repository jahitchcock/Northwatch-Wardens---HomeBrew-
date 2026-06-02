'use strict';

// ── PDF.js setup ──────────────────────────────────────────────────────────────
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// ── State ─────────────────────────────────────────────────────────────────────
const state = {
  books: { core: [], setting: [] },
  currentBookId: null,
  pdfDoc: null,
  currentPage: 1,
  totalPages: 0,
  zoom: 1.0,
  highlightMode: false,
  noteMode: false,
  pendingHighlight: null,   // { rects:[{x,y,w,h} as 0-1 fractions], text:string }
  pendingNotePos: null,     // { x, y } as 0-1 fractions of canvas
  editingNoteId: null,
  annotations: { collections: [], bookmarks: [], annotations: {} },
  saveTimer: null,
};

// ── API ───────────────────────────────────────────────────────────────────────
async function apiLoadBooks() {
  const res = await fetch('/api/books');
  if (!res.ok) throw new Error('Failed to load books: ' + res.status);
  return res.json();
}

async function apiLoadAnnotations() {
  const res = await fetch('/api/annotations');
  if (!res.ok) throw new Error('Failed to load annotations: ' + res.status);
  return res.json();
}

async function apiSaveAnnotations() {
  await fetch('/api/annotations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state.annotations),
  });
}

function scheduleSave() {
  clearTimeout(state.saveTimer);
  state.saveTimer = setTimeout(apiSaveAnnotations, 500);
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function pageAnnotations() {
  const ba = state.annotations.annotations;
  if (!ba[state.currentBookId]) ba[state.currentBookId] = {};
  const key = String(state.currentPage);
  if (!ba[state.currentBookId][key]) ba[state.currentBookId][key] = [];
  return ba[state.currentBookId][key];
}

function addAnnotation(ann) { pageAnnotations().push(ann); }

function removeAnnotation(annId) {
  const anns = pageAnnotations();
  const i = anns.findIndex(a => a.id === annId);
  if (i !== -1) anns.splice(i, 1);
}

// ── Library panel ─────────────────────────────────────────────────────────────
function renderLibrary(filter = '') {
  const panel = document.getElementById('library-panel');
  panel.innerHTML = '';
  const lf = filter.toLowerCase();

  const cats = [
    { key: 'core',    label: 'Core Books' },
    { key: 'setting', label: 'Setting Books' },
  ];

  for (const { key, label } of cats) {
    const books = (state.books[key] || []).filter(b => b.name.toLowerCase().includes(lf));
    if (!books.length) continue;

    // Group by subcategory
    const groups = {};
    for (const book of books) {
      const g = book.subcategory || '__main__';
      (groups[g] = groups[g] || []).push(book);
    }

    const catDiv = document.createElement('div');
    catDiv.className = 'library-category';

    const header = document.createElement('div');
    header.className = 'library-category-header';
    header.innerHTML = `<span class="arrow">▾</span> ${label}`;

    const ul = document.createElement('ul');
    ul.className = 'library-books';

    header.addEventListener('click', () => {
      header.classList.toggle('collapsed');
      ul.classList.toggle('hidden');
    });

    const appendBooks = (bookList) => {
      for (const book of bookList) {
        const li = document.createElement('li');
        li.className = 'library-book' + (book.bookId === state.currentBookId ? ' active' : '');
        li.textContent = book.name.replace(/\.pdf$/i, '');
        li.title = book.name;
        li.addEventListener('click', () => openBook(book.bookId));
        ul.appendChild(li);
      }
    };

    if (groups['__main__']) appendBooks(groups['__main__']);

    for (const [sub, subBooks] of Object.entries(groups)) {
      if (sub === '__main__') continue;
      const subLabel = document.createElement('li');
      subLabel.className = 'sub-label';
      subLabel.textContent = sub;
      ul.appendChild(subLabel);
      appendBooks(subBooks);
    }

    catDiv.appendChild(header);
    catDiv.appendChild(ul);
    panel.appendChild(catDiv);
  }
}

async function openBook(bookId) {
  state.currentBookId = bookId;
  state.currentPage = 1;
  renderLibrary();

  document.getElementById('empty-state').style.display = 'none';
  document.getElementById('page-container').style.display = 'inline-block';

  ['prev-btn','next-btn','zoom-in-btn','zoom-out-btn','highlight-btn','note-btn','bookmark-btn','page-input']
    .forEach(id => { const el = document.getElementById(id); if (el) el.disabled = false; });

  saveLocalState();
  await loadPdf(bookId);
}

// ── PDF rendering ─────────────────────────────────────────────────────────────
async function loadPdf(bookId) {
  const parts = bookId.split('/');
  const category = parts[0];
  const fileParts = parts.slice(1);
  const url = `/api/pdf/${encodeURIComponent(category)}/${fileParts.map(encodeURIComponent).join('/')}`;

  state.pdfDoc = await pdfjsLib.getDocument(url).promise;
  state.totalPages = state.pdfDoc.numPages;
  document.getElementById('page-total').textContent = state.totalPages;
  document.getElementById('page-input').max = state.totalPages;

  await renderPage(state.currentPage);
}

async function renderPage(pageNum) {
  if (!state.pdfDoc) return;
  pageNum = Math.max(1, Math.min(pageNum, state.totalPages));
  state.currentPage = pageNum;

  const page = await state.pdfDoc.getPage(pageNum);
  const viewport = page.getViewport({ scale: state.zoom * 1.5 });

  const canvas = document.getElementById('pdf-canvas');
  const ctx    = canvas.getContext('2d');
  canvas.width  = viewport.width;
  canvas.height = viewport.height;

  await page.render({ canvasContext: ctx, viewport }).promise;

  document.getElementById('page-input').value = pageNum;
  document.getElementById('prev-btn').disabled = pageNum <= 1;
  document.getElementById('next-btn').disabled = pageNum >= state.totalPages;

  await buildTextLayer(page, viewport);
  renderAnnotations();
  saveLocalState();
}

function goToPage(num) {
  renderPage(Number(num));
}

function setZoom(delta) {
  state.zoom = Math.max(0.5, Math.min(3.0, Math.round((state.zoom + delta) * 100) / 100));
  document.getElementById('zoom-display').textContent = Math.round(state.zoom * 100) + '%';
  renderPage(state.currentPage);
}

// ── Text layer ────────────────────────────────────────────────────────────────
async function buildTextLayer(page, viewport) {
  const div = document.getElementById('text-layer');
  div.innerHTML = '';
  div.style.width  = viewport.width  + 'px';
  div.style.height = viewport.height + 'px';

  const textContent = await page.getTextContent();

  if (pdfjsLib.renderTextLayer) {
    const render = pdfjsLib.renderTextLayer({
      textContentSource: textContent,
      container: div,
      viewport,
    });
    await render.promise;
  }
}

// ── Annotations (stub — full impl in Task 9) ──────────────────────────────────
function renderAnnotations() {
  const layer  = document.getElementById('annotation-layer');
  const canvas = document.getElementById('pdf-canvas');
  layer.style.width  = canvas.width  + 'px';
  layer.style.height = canvas.height + 'px';
  layer.innerHTML = '';
  // Full implementation in Task 9
}

// ── Stub functions (implemented in later tasks) ───────────────────────────────
function renderBookmarksPanel(){ /* Task 11 */ }
function saveLocalState() { /* Task 13 */ }
function loadLocalState()  { /* Task 13 */ }
function bindEvents() {
  document.getElementById('book-search').addEventListener('input', e => renderLibrary(e.target.value));
  document.getElementById('prev-btn').addEventListener('click', () => goToPage(state.currentPage - 1));
  document.getElementById('next-btn').addEventListener('click', () => goToPage(state.currentPage + 1));
  document.getElementById('page-input').addEventListener('change', e => goToPage(e.target.value));
  document.getElementById('zoom-in-btn').addEventListener('click',  () => setZoom(0.25));
  document.getElementById('zoom-out-btn').addEventListener('click', () => setZoom(-0.25));
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goToPage(state.currentPage + 1);
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goToPage(state.currentPage - 1);
  });
  // More events wired in Tasks 8-13
}

// ── Init ──────────────────────────────────────────────────────────────────────
async function init() {
  try {
    const [books, annotations] = await Promise.all([apiLoadBooks(), apiLoadAnnotations()]);
    state.books = books;
    state.annotations = annotations;
  } catch (e) {
    console.error('Rulebooks init error:', e);
  }
  renderLibrary();
  renderBookmarksPanel();
  loadLocalState();
  bindEvents();
}

init();

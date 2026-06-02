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

// ── Annotations ───────────────────────────────────────────────────────────────
function renderAnnotations() {
  const layer  = document.getElementById('annotation-layer');
  const canvas = document.getElementById('pdf-canvas');
  const W = canvas.width;
  const H = canvas.height;
  layer.style.width  = W + 'px';
  layer.style.height = H + 'px';
  layer.innerHTML = '';

  for (const ann of pageAnnotations()) {
    if (ann.type === 'highlight') {
      for (const r of ann.rects) {
        const div = document.createElement('div');
        div.className = 'highlight-rect';
        div.dataset.color = ann.color;
        div.dataset.annId = ann.id;
        div.style.left   = (r.x * W) + 'px';
        div.style.top    = (r.y * H) + 'px';
        div.style.width  = (r.w * W) + 'px';
        div.style.height = (r.h * H) + 'px';
        div.title = ann.selectedText ? `"${ann.selectedText}"\n(Shift+click to remove)` : 'Shift+click to remove';
        div.addEventListener('click', e => {
          e.stopPropagation();
          if (e.shiftKey) { removeAnnotation(ann.id); renderAnnotations(); scheduleSave(); }
        });
        layer.appendChild(div);
      }
    } else if (ann.type === 'note') {
      const pin = document.createElement('div');
      pin.className = 'note-pin';
      pin.textContent = '📝';
      pin.style.left = (ann.x * W) + 'px';
      pin.style.top  = (ann.y * H) + 'px';
      pin.title = ann.text;
      pin.addEventListener('click', e => {
        e.stopPropagation();
        state.editingNoteId = ann.id;
        state.pendingNotePos = { x: ann.x, y: ann.y };
        openNoteEditor(ann.text, true);
      });
      layer.appendChild(pin);
    }
  }
}

// ── Highlight mode ────────────────────────────────────────────────────────────
function toggleHighlightMode() {
  state.highlightMode = !state.highlightMode;
  if (state.highlightMode) state.noteMode = false;
  document.body.classList.toggle('highlight-mode', state.highlightMode);
  document.body.classList.toggle('note-mode', false);
  document.getElementById('highlight-btn').classList.toggle('active', state.highlightMode);
  document.getElementById('note-btn').classList.remove('active');
}

function handleTextSelection() {
  if (!state.highlightMode) return;
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed || !sel.toString().trim()) return;

  const text = sel.toString();
  const container = document.getElementById('page-container');
  const cr0 = container.getBoundingClientRect();
  const W = document.getElementById('pdf-canvas').width;
  const H = document.getElementById('pdf-canvas').height;

  const rects = [];
  for (let i = 0; i < sel.rangeCount; i++) {
    for (const r of sel.getRangeAt(i).getClientRects()) {
      if (r.width < 1 || r.height < 1) continue;
      rects.push({
        x: (r.left - cr0.left) / W,
        y: (r.top  - cr0.top)  / H,
        w: r.width  / W,
        h: r.height / H,
      });
    }
  }

  if (!rects.length) return;
  state.pendingHighlight = { rects, text };
  sel.removeAllRanges();
  document.getElementById('color-picker-overlay').classList.remove('hidden');
}

function saveHighlight(color) {
  if (!state.pendingHighlight || !state.currentBookId) return;
  document.getElementById('color-picker-overlay').classList.add('hidden');

  addAnnotation({
    id: crypto.randomUUID(),
    type: 'highlight',
    color,
    rects: state.pendingHighlight.rects,
    selectedText: state.pendingHighlight.text,
  });
  state.pendingHighlight = null;

  renderAnnotations();
  scheduleSave();
}

function cancelHighlight() {
  state.pendingHighlight = null;
  document.getElementById('color-picker-overlay').classList.add('hidden');
}

// ── Notes ─────────────────────────────────────────────────────────────────────
function toggleNoteMode() {
  state.noteMode = !state.noteMode;
  if (state.noteMode) state.highlightMode = false;
  document.body.classList.toggle('note-mode', state.noteMode);
  document.body.classList.toggle('highlight-mode', false);
  document.getElementById('note-btn').classList.toggle('active', state.noteMode);
  document.getElementById('highlight-btn').classList.remove('active');
}

function handlePageClick(e) {
  if (!state.noteMode) return;
  if (e.target.classList.contains('note-pin') || e.target.classList.contains('highlight-rect')) return;

  const container = document.getElementById('page-container');
  const rect = container.getBoundingClientRect();
  const W = document.getElementById('pdf-canvas').width;
  const H = document.getElementById('pdf-canvas').height;

  state.pendingNotePos = {
    x: (e.clientX - rect.left) / W,
    y: (e.clientY - rect.top)  / H,
  };
  state.editingNoteId = null;
  openNoteEditor('', false);
}

function openNoteEditor(text, showDelete) {
  document.getElementById('note-editor-title').textContent = showDelete ? 'Edit Note' : 'Add Note';
  document.getElementById('note-textarea').value = text;
  document.getElementById('delete-note-btn').classList.toggle('hidden', !showDelete);
  document.getElementById('note-editor-overlay').classList.remove('hidden');
  setTimeout(() => document.getElementById('note-textarea').focus(), 50);
}

function saveNote() {
  const text = document.getElementById('note-textarea').value.trim();
  if (!text) { cancelNote(); return; }

  if (state.editingNoteId) {
    const ann = pageAnnotations().find(a => a.id === state.editingNoteId);
    if (ann) ann.text = text;
  } else {
    addAnnotation({
      id: crypto.randomUUID(),
      type: 'note',
      x: state.pendingNotePos.x,
      y: state.pendingNotePos.y,
      text,
    });
  }
  state.editingNoteId = null;
  state.pendingNotePos = null;
  cancelNote();
  renderAnnotations();
  scheduleSave();
}

function deleteNote() {
  if (state.editingNoteId) removeAnnotation(state.editingNoteId);
  state.editingNoteId = null;
  cancelNote();
  renderAnnotations();
  scheduleSave();
}

function cancelNote() {
  document.getElementById('note-editor-overlay').classList.add('hidden');
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

  document.getElementById('highlight-btn').addEventListener('click', toggleHighlightMode);
  document.getElementById('text-layer').addEventListener('mouseup', handleTextSelection);
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => saveHighlight(swatch.dataset.color));
  });
  document.getElementById('cancel-highlight-btn').addEventListener('click', cancelHighlight);

  document.getElementById('note-btn').addEventListener('click', toggleNoteMode);
  document.getElementById('page-container').addEventListener('click', handlePageClick);
  document.getElementById('save-note-btn').addEventListener('click', saveNote);
  document.getElementById('delete-note-btn').addEventListener('click', deleteNote);
  document.getElementById('cancel-note-btn').addEventListener('click', cancelNote);
  // More events wired in Tasks 11-13
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

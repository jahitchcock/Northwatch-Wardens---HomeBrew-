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

// ── Stub functions (implemented in later tasks) ───────────────────────────────
function renderLibrary()       { /* Task 6 */ }
function renderBookmarksPanel(){ /* Task 11 */ }
function loadLocalState()      { /* Task 13 */ }
function bindEvents()          { /* Tasks 6-13 */ }

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

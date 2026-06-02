'use strict';

const fs      = require('fs');
const path    = require('path');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

// Disable worker — not needed for text-only extraction in Node.js
pdfjsLib.GlobalWorkerOptions.workerSrc = false;

const INDEX_DIR = path.join(__dirname, '../data/search-index');

function safeId(bookId) {
  return bookId.replace(/[^a-z0-9]/gi, '_') + '.json';
}

function getIndexPath(bookId) {
  return path.join(INDEX_DIR, safeId(bookId));
}

function isIndexed(bookId) {
  return fs.existsSync(getIndexPath(bookId));
}

async function buildIndex(bookId, pdfPath) {
  fs.mkdirSync(INDEX_DIR, { recursive: true });

  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc  = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;

  const pages = [];
  for (let i = 1; i <= doc.numPages; i++) {
    try {
      const page    = await doc.getPage(i);
      const content = await page.getTextContent();
      // Join text items, collapse runs of whitespace to a single space
      const text = content.items
        .map(item => item.str)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
      if (text.length > 0) pages.push({ page: i, text });
    } catch {
      // Skip unreadable pages (image-only, corrupted, etc.)
    }
  }

  const index = { bookId, builtAt: new Date().toISOString(), pages };
  const finalPath = getIndexPath(bookId);
  const tempPath  = finalPath + '.tmp';
  fs.writeFileSync(tempPath, JSON.stringify(index));
  fs.renameSync(tempPath, finalPath);
  return index;
}

function loadIndex(bookId) {
  const p = getIndexPath(bookId);
  if (!fs.existsSync(p)) return null;
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return null; }
}

module.exports = { buildIndex, loadIndex, isIndexed, getIndexPath };

#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { chunkMarkdown } from './chunk.mjs';
import { REPO_ROOT, API, COLLECTIONS } from './config.mjs';

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full));
    else if (e.isFile() && e.name.toLowerCase().endsWith('.md')) out.push(full);
  }
  return out;
}

async function postIndex(collection, items, replace_paths = true) {
  const res = await fetch(`${API}/index`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ collection, items, replace_paths }),
  });
  if (!res.ok) throw new Error(`index ${collection}: ${res.status} ${await res.text()}`);
  return res.json();
}

const only = process.argv[2]; // optional: 'campaign' | 'novels'
let total = 0;
const failures = [];
for (const { dir, collection } of COLLECTIONS) {
  if (only && only !== collection) continue;
  const abs = path.join(REPO_ROOT, dir);
  const files = walk(abs);
  for (const f of files) {
    const rel = path.relative(REPO_ROOT, f).replace(/\\/g, '/');
    let chunks;
    try {
      chunks = chunkMarkdown(fs.readFileSync(f, 'utf8'), rel);
    } catch (err) {
      failures.push({ rel, error: err.message });
      process.stderr.write(`  [SKIP] ${rel}: ${err.message}\n`);
      continue;
    }
    if (!chunks.length) continue;
    // replace_paths only on the first batch of a file; a file's later batches
    // must append, or they'd wipe the paths cleared+inserted by earlier batches.
    for (let i = 0; i < chunks.length; i += 64) {
      const r = await postIndex(collection, chunks.slice(i, i + 64), i === 0);
      total += r.indexed;
    }
    process.stdout.write(`  [${collection}] ${rel} (${chunks.length})\n`);
  }
}
console.log(`Indexed ${total} chunks.`);
if (failures.length) {
  console.log(`\n${failures.length} file(s) failed to chunk:`);
  for (const { rel, error } of failures) console.log(`  - ${rel}: ${error}`);
}

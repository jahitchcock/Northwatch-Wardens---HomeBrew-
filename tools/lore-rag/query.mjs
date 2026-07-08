#!/usr/bin/env node
import { API } from './config.mjs';

const argv = process.argv.slice(2);
let collection = 'campaign', k = 6, ask = false;
const terms = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--collection' || argv[i] === '-c') collection = argv[++i];
  else if (argv[i] === '--k') k = Number(argv[++i]);
  else if (argv[i] === '--ask') ask = true;
  else terms.push(argv[i]);
}
const query = terms.join(' ');
if (!query) {
  console.error('usage: node query.mjs "question" [--collection campaign|novels] [--k 6] [--ask]');
  process.exit(1);
}

const endpoint = ask ? 'ask' : 'search';
const res = await fetch(`${API}/${endpoint}`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ collection, query, k }),
});
if (!res.ok) { console.error(await res.text()); process.exit(1); }
const data = await res.json();

if (ask) {
  console.log('\n' + data.answer + '\n');
  console.log('sources: ' + (data.sources || []).map(s => s.source_path).join(', '));
} else {
  for (const r of data.results) {
    console.log(`\n─── ${r.source_path}  (${r.score.toFixed(3)})`);
    if (r.heading) console.log(`    ${r.heading}`);
    console.log(r.text.replace(/^/gm, '    ').slice(0, 800));
  }
}

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chunkMarkdown } from '../chunk.mjs';

const SAMPLE = `---
name: waystone-inn
title: The Waystone Inn
type: location
---

# The Waystone Inn

Guild HQ in Northreach. The mission board hangs by the hearth.

## The Common Room

Long tables, a roaring fire, and Steward Mara behind the bar.

## The Cellar

Cold storage and a locked door nobody talks about.
`;

test('splits by heading and carries frontmatter metadata', () => {
  const chunks = chunkMarkdown(SAMPLE, 'locations/waystone.md');
  assert.ok(chunks.length >= 2, 'expected multiple chunks');
  for (const c of chunks) {
    assert.equal(c.source_path, 'locations/waystone.md');
    assert.equal(c.metadata.name, 'waystone-inn');
    assert.equal(c.metadata.type, 'location');
  }
  const cellar = chunks.find(c => /Cellar/.test(c.heading || ''));
  assert.ok(cellar, 'expected a Cellar chunk');
  assert.match(cellar.chunk_text, /locked door/);
});

test('heading trail includes ancestor h1', () => {
  const chunks = chunkMarkdown(SAMPLE, 'x.md');
  const common = chunks.find(c => /Common Room/.test(c.heading || ''));
  assert.match(common.heading, /Waystone Inn/);
});

test('empty/frontmatter-only file yields no chunks', () => {
  assert.equal(chunkMarkdown('---\nname: x\n---\n', 'e.md').length, 0);
});

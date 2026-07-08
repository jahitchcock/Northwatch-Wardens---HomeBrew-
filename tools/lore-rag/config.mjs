import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = path.resolve(here, '..', '..');
export const API = process.env.LORE_RAG_API || 'http://10.10.6.56:8100';

// dir (repo-relative) -> collection. First match wins.
export const COLLECTIONS = [
  { dir: 'Novels',      collection: 'novels' },
  { dir: 'gm-lore',     collection: 'campaign' },
  { dir: 'npcs',        collection: 'campaign' },
  { dir: 'adventures',  collection: 'campaign' },
  { dir: 'locations',   collection: 'campaign' },
  { dir: 'factions',    collection: 'campaign' },
  { dir: 'arcs',        collection: 'campaign' },
  { dir: 'timeline',    collection: 'campaign' },
  { dir: 'player-lore', collection: 'campaign' },
  { dir: 'tables',      collection: 'campaign' },
  { dir: 'homebrew',    collection: 'campaign' },
];

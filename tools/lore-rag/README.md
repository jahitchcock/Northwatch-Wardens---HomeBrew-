# Aevorian Lore RAG

Semantic search + retrieve-then-generate over the campaign lore and (separately) the *Old Songs of Aevoria* novels. Retrieval is grounded in the actual `.md` source; generation is done by the local LM Studio writing models.

## Architecture

```
repo markdown ──chunk by heading (chunk.mjs)──► POST /index ─┐
                                                              ▼
   GPU box 10.10.6.56 (Docker, infra/lore-rag/)
   ├─ lore-db      pgvector/pgvector:pg16   (table: chunks, vector(384))
   └─ lore-rag-api FastAPI on :8100
        • fastembed BAAI/bge-small-en-v1.5 (CPU) for search embeddings
        • /search  → top-k chunks
        • /ask     → chunks + LM Studio (10.10.6.56:1234) completion
```

- **Embeddings** run on CPU (fastembed/ONNX) — deliberately decoupled from LM Studio so search keeps working regardless of which model `llama-swap` currently has loaded.
- **Generation** (`/ask`) calls LM Studio at `10.10.6.56:1234`: `qwen/qwen3-14b` for campaign, `lumimaid-v0.2-12b` for novels (override per request with `model`).

## Canon firewall (critical)

Two collections: `campaign` and `novels`. `collection` is a **required** parameter on every endpoint. The `novels` collection contains only native deep-time Aevoria lore and **cannot** retrieve campaign material — this keeps Aeor / the Calamity / the Aeorian Echo / the Northwatch Wardens out of novel prose structurally, not just by convention. **Never** map a campaign directory to `novels` in `config.mjs`.

Directory → collection mapping lives in `config.mjs`. `Novels/` → `novels`; everything else lore-bearing (`gm-lore`, `npcs`, `adventures`, `locations`, `factions`, `arcs`, `timeline`, `player-lore`, `tables`, `homebrew`) → `campaign`.

## Operating the box service

```bash
# from the box (ssh joshua@10.10.6.56), in /home/joshua/docker/lore-rag
docker compose up -d            # start db + api
docker compose up -d --build rag-api   # rebuild after editing app.py
docker logs lore-rag-api --tail 50
curl -s http://10.10.6.56:8100/health   # {"ok":true,...}
curl -s http://10.10.6.56:8100/stats    # {"counts":{"campaign":N,"novels":M}}
```
The compose file + service source are version-controlled at `infra/lore-rag/`.

## Indexing (run after editing lore)

```bash
cd tools/lore-rag
npm install                 # first time only
node indexer.mjs            # full reindex (campaign + novels)
node indexer.mjs campaign   # campaign only
node indexer.mjs novels     # novels only
```
Re-indexing a file replaces its previous chunks (`replace_paths`). New/edited `.md` under the mapped dirs is picked up on the next run.

## Querying

**CLI:**
```bash
node query.mjs "what is the Pale Sickness" -c campaign
node query.mjs "Elowen and the Quiet" -c novels --k 4
node query.mjs "a rumor overheard at the Waystone Inn" -c campaign --ask   # LM Studio draft
```

**MCP** (registered in `.vscode/mcp.json` and `~/.claude/mcp.json` as `aevorian-lore`):
- `search_lore(query, collection, k)` — returns source chunks; use when *you* will write.
- `ask_lore(query, collection, k, model)` — returns a local-model draft grounded in the chunks.

**DM Panel:** the 🔮 **Lore** button (top nav) opens a search modal; tick **Write** for a grounded LM Studio draft. Backed by `/api/lore-search` and `/api/lore-ask` (auth-gated proxies to the box).

## Config / env

- `LORE_RAG_API` — override the API base (default `http://10.10.6.56:8100`); honored by `config.mjs` and the DM Panel proxy.
- Box service env (compose): `DB_DSN`, `EMBED_MODEL`, `LM_API`.

## Notes / limitations

- `/ask` needs free VRAM on the P40. If a standalone `llama-server` is holding the GPU, `llama-swap` can't load a writing model and `/ask` returns a 502; search is unaffected. Free VRAM on the box to enable generation.
- MythoMax (Llama-2, ~4K ctx) can overflow with `k=6`; use `k=2–3` for it. Lumimaid (large ctx) is the default for novels.
- Chunking is heading-aware with a soft `MAX_CHARS` split (`chunk.mjs`). bge-small is a 512-token model; very long single paragraphs are truncated at embed time.

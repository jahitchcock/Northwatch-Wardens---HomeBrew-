import os, hashlib, urllib.request, json
from typing import Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import psycopg
from pgvector.psycopg import register_vector
from fastembed import TextEmbedding

DB_DSN = os.environ["DB_DSN"]
EMBED_MODEL = os.environ.get("EMBED_MODEL", "BAAI/bge-small-en-v1.5")
LM_API = os.environ.get("LM_API", "http://10.10.6.56:1234/v1")
DEFAULT_MODEL = {"campaign": "qwen/qwen3-14b", "novels": "lumimaid-v0.2-12b"}
VALID = {"campaign", "novels"}

app = FastAPI(title="Aevorian Lore RAG")
_embedder = TextEmbedding(model_name=EMBED_MODEL)

def embed(texts, query=False):
    if query:
        texts = ["Represent this sentence for searching relevant passages: " + t for t in texts]
    return [v.tolist() for v in _embedder.embed(texts)]

def db():
    conn = psycopg.connect(DB_DSN)
    register_vector(conn)
    return conn

class IndexItem(BaseModel):
    source_path: str
    heading: Optional[str] = None
    chunk_text: str
    metadata: dict = Field(default_factory=dict)

class IndexReq(BaseModel):
    collection: str
    items: list[IndexItem]
    replace_paths: bool = True

class SearchReq(BaseModel):
    collection: str
    query: str
    k: int = 6

@app.get("/health")
def health():
    with db() as c:
        c.execute("SELECT 1")
    return {"ok": True, "model": EMBED_MODEL}

@app.get("/stats")
def stats():
    with db() as c:
        rows = c.execute("SELECT collection, count(*) FROM chunks GROUP BY collection").fetchall()
    return {"counts": {r[0]: r[1] for r in rows}}

@app.post("/index")
def index(req: IndexReq):
    if req.collection not in VALID:
        raise HTTPException(400, f"collection must be one of {VALID}")
    if not req.items:
        return {"indexed": 0}
    vecs = embed([it.chunk_text for it in req.items])
    with db() as c:
        if req.replace_paths:
            paths = list({it.source_path for it in req.items})
            c.execute("DELETE FROM chunks WHERE collection=%s AND source_path = ANY(%s)", (req.collection, paths))
        for it, v in zip(req.items, vecs):
            h = hashlib.sha256(it.chunk_text.encode()).hexdigest()
            c.execute(
                """INSERT INTO chunks (collection, source_path, heading, chunk_text, metadata, content_hash, embedding)
                   VALUES (%s,%s,%s,%s,%s,%s,%s)
                   ON CONFLICT (collection, source_path, content_hash) DO NOTHING""",
                (req.collection, it.source_path, it.heading, it.chunk_text,
                 psycopg.types.json.Jsonb(it.metadata), h, v))
        c.commit()
    return {"indexed": len(req.items)}

def _search_rows(collection, query, k):
    qv = embed([query], query=True)[0]
    with db() as c:
        return c.execute(
            """SELECT source_path, heading, chunk_text, 1 - (embedding <=> %s::vector) AS score
               FROM chunks WHERE collection=%s ORDER BY embedding <=> %s::vector LIMIT %s""",
            (qv, collection, qv, k)).fetchall()

@app.post("/search")
def search(req: SearchReq):
    if req.collection not in VALID:
        raise HTTPException(400, f"collection must be one of {VALID}")
    rows = _search_rows(req.collection, req.query, req.k)
    return {"results": [
        {"source_path": r[0], "heading": r[1], "text": r[2], "score": float(r[3])} for r in rows]}

class AskReq(BaseModel):
    collection: str
    query: str
    k: int = 6
    model: Optional[str] = None
    system: Optional[str] = None

@app.post("/ask")
def ask(req: AskReq):
    if req.collection not in VALID:
        raise HTTPException(400, f"collection must be one of {VALID}")
    rows = _search_rows(req.collection, req.query, req.k)
    context = "\n\n---\n\n".join(f"[{r[0]}{(' — ' + r[1]) if r[1] else ''}]\n{r[2]}" for r in rows)
    default_sys = (
        "You are a fantasy-fiction writing assistant for the Old Songs of Aevoria. "
        "Use ONLY the provided lore excerpts as canon. Never invent locations or names. "
        "Never reference Aeor, the Calamity, the Aeorian Echo, Eclipse Day, or the Northwatch Wardens."
        if req.collection == "novels" else
        "You are a D&D campaign assistant for Northwatch Wardens. Ground every claim in the provided "
        "lore excerpts; if the answer is not in them, say so plainly.")
    model = req.model or DEFAULT_MODEL[req.collection]
    payload = {"model": model,
        "messages": [{"role": "system", "content": req.system or default_sys},
                     {"role": "user", "content": f"Lore excerpts:\n\n{context}\n\n---\n\nRequest: {req.query}"}],
        "temperature": 0.7 if req.collection == "novels" else 0.3}
    r = urllib.request.Request(f"{LM_API}/chat/completions",
        data=json.dumps(payload).encode(), headers={"content-type": "application/json"})
    try:
        with urllib.request.urlopen(r, timeout=180) as resp:
            data = json.loads(resp.read())
    except Exception as e:
        raise HTTPException(502, f"LM Studio error: {e}")
    answer = data["choices"][0]["message"]["content"]
    return {"answer": answer, "model": model,
            "sources": [{"source_path": x[0], "heading": x[1], "score": float(x[3])} for x in rows]}

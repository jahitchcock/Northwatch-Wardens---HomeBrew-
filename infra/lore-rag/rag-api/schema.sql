CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS chunks (
  id           BIGSERIAL PRIMARY KEY,
  collection   TEXT NOT NULL,
  source_path  TEXT NOT NULL,
  heading      TEXT,
  chunk_text   TEXT NOT NULL,
  metadata     JSONB NOT NULL DEFAULT '{}',
  content_hash TEXT NOT NULL,
  embedding    vector(384) NOT NULL,
  UNIQUE (collection, source_path, content_hash)
);

CREATE INDEX IF NOT EXISTS chunks_collection_idx ON chunks (collection);
CREATE INDEX IF NOT EXISTS chunks_path_idx ON chunks (collection, source_path);
CREATE INDEX IF NOT EXISTS chunks_embedding_idx
  ON chunks USING hnsw (embedding vector_cosine_ops);

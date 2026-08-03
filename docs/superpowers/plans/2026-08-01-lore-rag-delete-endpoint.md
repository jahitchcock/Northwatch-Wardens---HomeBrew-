# lore-rag Delete + Paths Endpoints Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `POST /delete` and `GET /paths` to the lore-rag service so indexed chunks can be removed and reconciled, not only overwritten.

**Architecture:** Request validation and SQL building live in a new pure module `selectors_lore.py`, unit-tested without a database. `app.py` gains two thin endpoints that call those helpers and run one statement each. No schema change; purely additive to the API.

**Tech Stack:** Python 3.11, FastAPI, pydantic, psycopg 3, PostgreSQL + pgvector, Docker Compose (deployed to the R730 over an SSH docker context).

**Spec:** `docs/superpowers/specs/2026-08-01-lore-rag-delete-endpoint-design.md`

---

## Background for the implementer

`lore-rag` is a small semantic-search service at `10.10.6.56:8100`. It stores text chunks with
embeddings in one Postgres table and serves three collections: `campaign` and `novels` (a D&D
campaign) and `homehub` (a home-automation hub). All three share one table, distinguished by a
`collection` column.

Today it can index and search but **cannot delete**. `POST /index` accepts `replace_paths=True`,
which deletes the paths in the batch and immediately re-inserts them — so a chunk can only be
replaced, never removed. This task adds real deletion.

**Two things make this riskier than it looks, and drive the whole design:**

1. **The service has no authentication and deletes real user data across three collections.** A
   bug that widens a selector destroys campaign lore. Validation is therefore structural and
   tested, not a convention.
2. **`app.py` cannot be imported in a unit test.** Line 9 is `DB_DSN = os.environ["DB_DSN"]` (raises
   without a database configured) and line 16 is `_embedder = TextEmbedding(...)` at module scope,
   which downloads and loads an embedding model. That is why the logic being tested lives in a
   separate module with no imports beyond the standard library.

### Working directory

All paths are relative to the repo root:
`C:/Users/joshu/OneDrive/Documents/dnd/00 - Campaigns/Northwatch Wardens - (HomeBrew)`

The service source is in `infra/lore-rag/rag-api/`.

## File Structure

| File | Responsibility |
| --- | --- |
| `infra/lore-rag/rag-api/selectors_lore.py` | **Create.** Pure validation + SQL building. No DB, no network, stdlib only. |
| `infra/lore-rag/rag-api/tests/test_selectors.py` | **Create.** Unit tests for the above. |
| `infra/lore-rag/rag-api/pytest.ini` | **Create.** Points pytest at `tests/`. |
| `infra/lore-rag/rag-api/requirements-dev.txt` | **Create.** `pytest` only; not installed into the image. |
| `infra/lore-rag/rag-api/app.py` | **Modify.** Add `DeleteReq`, `POST /delete`, `GET /paths`. |
| `infra/lore-rag/rag-api/Dockerfile` | **Modify.** `COPY selectors_lore.py .` — currently copies only `app.py`. |

⚠️ **The Dockerfile edit is not optional and is easy to miss.** Line 7 is `COPY app.py .`. If
`selectors_lore.py` is not copied, the image builds successfully and then crashes on startup with
`ModuleNotFoundError: No module named 'selectors_lore'` — after the old container has already been
replaced. Task 6 covers it; do not skip it.

> Note: the module is named `selectors_lore.py`, **not** `selectors.py`. Python's standard library
> already owns the name `selectors` (I/O multiplexing), and a bare `selectors.py` beside `app.py`
> would shadow it for everything in that directory — a latent trap the moment any dependency
> imports the stdlib one. Keep the `_lore` suffix everywhere.

---

### Task 1: Test scaffolding

**Files:**

- Create: `infra/lore-rag/rag-api/requirements-dev.txt`
- Create: `infra/lore-rag/rag-api/pytest.ini`
- Create: `infra/lore-rag/rag-api/tests/__init__.py`

- [ ] **Step 1: Create the dev requirements file**

`infra/lore-rag/rag-api/requirements-dev.txt`:

```text
pytest==8.3.4
```

This is deliberately separate from `requirements.txt`. The Dockerfile installs only
`requirements.txt`, so pytest never ships in the production image.

- [ ] **Step 2: Create the pytest config**

`infra/lore-rag/rag-api/pytest.ini`:

```ini
[pytest]
testpaths = tests
```

- [ ] **Step 3: Create the tests package marker**

Create an empty file `infra/lore-rag/rag-api/tests/__init__.py` (zero bytes).

- [ ] **Step 4: Install pytest**

Run from `infra/lore-rag/rag-api`:

```bash
pip install -r requirements-dev.txt
```

Expected: `Successfully installed pytest-8.3.4` (or "already satisfied").

- [ ] **Step 5: Commit**

```bash
git add infra/lore-rag/rag-api/requirements-dev.txt infra/lore-rag/rag-api/pytest.ini infra/lore-rag/rag-api/tests/__init__.py
git commit -m "test: add pytest scaffolding for lore-rag"
```

---

### Task 2: `like_escape` — literal prefix matching

A `source_path` may legally contain `%` or `_`, which are SQL `LIKE` wildcards. Unescaped, a prefix
of `note_1/` would also match `noteX1/` — deleting the wrong rows.

**Files:**

- Create: `infra/lore-rag/rag-api/selectors_lore.py`
- Test: `infra/lore-rag/rag-api/tests/test_selectors.py`

- [ ] **Step 1: Write the failing test**

Create `infra/lore-rag/rag-api/tests/test_selectors.py`:

```python
import sys
from pathlib import Path

# The module under test sits one directory up, beside app.py. It is imported
# directly rather than as a package because the Docker image has a flat /app
# layout with no package structure.
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from selectors_lore import like_escape


def test_like_escape_leaves_ordinary_text_alone():
    assert like_escape("insight/") == "insight/"


def test_like_escape_escapes_percent():
    assert like_escape("50%off/") == "50\\%off/"


def test_like_escape_escapes_underscore():
    assert like_escape("note_1/") == "note\\_1/"


def test_like_escape_escapes_backslash_first_so_it_is_not_doubled():
    # The backslash must be escaped before % and _, otherwise the escapes
    # themselves get escaped and the pattern is wrong.
    assert like_escape("a\\b_c") == "a\\\\b\\_c"
```

⚠️ **Naming decision:** the module is `selectors_lore.py`, **not** `selectors.py`. Python's standard
library already has a `selectors` module, and a bare `selectors.py` beside `app.py` shadows it for
anything in that directory. That is a latent trap for a future dependency. Use `selectors_lore.py`
everywhere in this plan.

- [ ] **Step 2: Run the test to verify it fails**

Run from `infra/lore-rag/rag-api`:

```bash
pytest tests/test_selectors.py -v
```

Expected: FAIL — `ModuleNotFoundError: No module named 'selectors_lore'`

- [ ] **Step 3: Write the minimal implementation**

Create `infra/lore-rag/rag-api/selectors_lore.py`:

```python
"""Pure request-validation and SQL-building helpers for /delete and /paths.

Deliberately free of database, network and model imports so it can be unit
tested directly. app.py cannot be imported in a test: it reads DB_DSN from the
environment at import time and constructs the embedding model at module scope.

Named selectors_lore rather than selectors so it never shadows the standard
library module of that name.
"""

# Backslash MUST come first. Escaping it after % and _ would also escape the
# backslashes just inserted, producing a wrong pattern.
_LIKE_SPECIALS = ("\\", "%", "_")


def like_escape(value: str) -> str:
    """Escape LIKE wildcards so a prefix matches literally.

    A source_path containing % or _ is perfectly legal. Without this, a prefix
    of "note_1/" would also match "noteX1/" and delete rows the caller never
    named.
    """
    out = value
    for ch in _LIKE_SPECIALS:
        out = out.replace(ch, "\\" + ch)
    return out
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
pytest tests/test_selectors.py -v
```

Expected: PASS — 4 passed

- [ ] **Step 5: Commit**

```bash
git add infra/lore-rag/rag-api/selectors_lore.py infra/lore-rag/rag-api/tests/test_selectors.py
git commit -m "feat(rag): add like_escape for literal prefix matching"
```

---

### Task 3: `validate_delete` — reject blast-radius-widening requests

**Files:**

- Modify: `infra/lore-rag/rag-api/selectors_lore.py`
- Test: `infra/lore-rag/rag-api/tests/test_selectors.py`

- [ ] **Step 1: Write the failing tests**

Append to `infra/lore-rag/rag-api/tests/test_selectors.py`:

```python
from selectors_lore import validate_delete

VALID = {"campaign", "novels", "homehub"}


def test_validate_accepts_explicit_paths():
    assert validate_delete("homehub", ["insight/a"], None, VALID) is None


def test_validate_accepts_prefix():
    assert validate_delete("homehub", [], "insight/", VALID) is None


def test_validate_accepts_paths_and_prefix_together():
    assert validate_delete("homehub", ["insight/a"], "note/", VALID) is None


def test_validate_rejects_unknown_collection():
    assert validate_delete("nope", ["a"], None, VALID) is not None


def test_validate_rejects_request_with_no_selector():
    # Must never be read as "delete everything".
    assert validate_delete("homehub", [], None, VALID) is not None


def test_validate_rejects_empty_string_prefix():
    # An uninitialised caller variable arriving as "" would match every path
    # in the collection.
    assert validate_delete("homehub", [], "", VALID) is not None


def test_validate_rejects_empty_prefix_even_alongside_paths():
    # The paths would succeed, but the empty prefix would widen the delete to
    # the whole collection, so the whole request is refused.
    assert validate_delete("homehub", ["insight/a"], "", VALID) is not None
```

- [ ] **Step 2: Run the tests to verify they fail**

```bash
pytest tests/test_selectors.py -v
```

Expected: FAIL — `ImportError: cannot import name 'validate_delete'`

- [ ] **Step 3: Write the minimal implementation**

Append to `infra/lore-rag/rag-api/selectors_lore.py`:

```python
def validate_delete(collection, source_paths, prefix, valid) -> str | None:
    """Return an error message, or None when the request is safe to run.

    Rejects the two shapes that would silently widen the delete beyond what the
    caller named. This service has no auth and holds three collections of real
    user data, so the guard is structural rather than conventional.
    """
    if collection not in valid:
        return f"collection must be one of {sorted(valid)}"
    if prefix is not None and prefix == "":
        return "prefix must not be empty — it would match the entire collection"
    if not source_paths and prefix is None:
        return "supply source_paths and/or prefix"
    return None
```

- [ ] **Step 4: Run the tests to verify they pass**

```bash
pytest tests/test_selectors.py -v
```

Expected: PASS — 11 passed

- [ ] **Step 5: Commit**

```bash
git add infra/lore-rag/rag-api/selectors_lore.py infra/lore-rag/rag-api/tests/test_selectors.py
git commit -m "feat(rag): validate delete requests against blast-radius widening"
```

---

### Task 4: `build_delete` — the DELETE statement

**Files:**

- Modify: `infra/lore-rag/rag-api/selectors_lore.py`
- Test: `infra/lore-rag/rag-api/tests/test_selectors.py`

- [ ] **Step 1: Write the failing tests**

Append to `infra/lore-rag/rag-api/tests/test_selectors.py`:

```python
from selectors_lore import build_delete


def test_build_delete_by_paths():
    sql, params = build_delete("homehub", ["insight/a", "insight/b"], None)
    assert "source_path = ANY(%s)" in sql
    assert "LIKE" not in sql
    assert params == ["homehub", ["insight/a", "insight/b"]]


def test_build_delete_by_prefix():
    sql, params = build_delete("homehub", [], "insight/")
    assert "LIKE %s ESCAPE" in sql
    assert "ANY" not in sql
    assert params == ["homehub", "insight/%"]


def test_build_delete_by_both_is_a_union():
    sql, params = build_delete("homehub", ["note/a"], "insight/")
    assert " OR " in sql
    assert params == ["homehub", ["note/a"], "insight/%"]


def test_build_delete_always_scopes_to_collection():
    # Every collection is in one table. A delete that forgot this clause would
    # cross from homehub into the campaign's lore.
    sql, _ = build_delete("homehub", ["insight/a"], None)
    assert "collection=%s" in sql


def test_build_delete_escapes_wildcards_in_prefix():
    _, params = build_delete("homehub", [], "note_1/")
    assert params[1] == "note\\_1/%"
```

- [ ] **Step 2: Run the tests to verify they fail**

```bash
pytest tests/test_selectors.py -v
```

Expected: FAIL — `ImportError: cannot import name 'build_delete'`

- [ ] **Step 3: Write the minimal implementation**

Append to `infra/lore-rag/rag-api/selectors_lore.py`:

```python
def build_delete(collection, source_paths, prefix) -> tuple[str, list]:
    """(sql, params) for a delete. Selectors are OR'd — their union is removed.

    Callers must run validate_delete first; this assumes at least one selector
    is present and would otherwise build a clauseless statement.
    """
    clauses, params = [], [collection]
    if source_paths:
        clauses.append("source_path = ANY(%s)")
        params.append(list(source_paths))
    if prefix:
        clauses.append("source_path LIKE %s ESCAPE '\\'")
        params.append(like_escape(prefix) + "%")
    sql = (
        "DELETE FROM chunks WHERE collection=%s AND ("
        + " OR ".join(clauses)
        + ")"
    )
    return sql, params
```

- [ ] **Step 4: Run the tests to verify they pass**

```bash
pytest tests/test_selectors.py -v
```

Expected: PASS — 16 passed

- [ ] **Step 5: Commit**

```bash
git add infra/lore-rag/rag-api/selectors_lore.py infra/lore-rag/rag-api/tests/test_selectors.py
git commit -m "feat(rag): build collection-scoped delete statements"
```

---

### Task 5: `build_paths` and `build_paths_count` — the listing queries

`GET /paths` returns distinct paths (a document indexed as several chunks shares one path), ordered
so the output is stable and diffable, capped by a limit, with the **true** total always reported so a
caller can tell it was truncated.

**Files:**

- Modify: `infra/lore-rag/rag-api/selectors_lore.py`
- Test: `infra/lore-rag/rag-api/tests/test_selectors.py`

- [ ] **Step 1: Write the failing tests**

Append to `infra/lore-rag/rag-api/tests/test_selectors.py`:

```python
from selectors_lore import build_paths, build_paths_count


def test_build_paths_is_distinct_and_ordered():
    sql, params = build_paths("homehub", None, 1000)
    assert "SELECT DISTINCT source_path" in sql
    assert "ORDER BY source_path" in sql
    assert params == ["homehub", 1000]


def test_build_paths_filters_by_prefix():
    sql, params = build_paths("homehub", "insight/", 1000)
    assert "LIKE %s ESCAPE" in sql
    assert params == ["homehub", "insight/%", 1000]


def test_build_paths_escapes_wildcards_in_prefix():
    _, params = build_paths("homehub", "note_1/", 50)
    assert params[1] == "note\\_1/%"


def test_build_paths_count_counts_distinct_paths():
    sql, params = build_paths_count("homehub", None)
    assert "COUNT(DISTINCT source_path)" in sql
    assert params == ["homehub"]


def test_build_paths_count_respects_prefix_and_has_no_limit():
    # The count must be the true total, so it is never limited.
    sql, params = build_paths_count("homehub", "insight/")
    assert "LIMIT" not in sql
    assert params == ["homehub", "insight/%"]
```

- [ ] **Step 2: Run the tests to verify they fail**

```bash
pytest tests/test_selectors.py -v
```

Expected: FAIL — `ImportError: cannot import name 'build_paths'`

- [ ] **Step 3: Write the minimal implementation**

Append to `infra/lore-rag/rag-api/selectors_lore.py`:

```python
def _prefix_clause(prefix, params) -> str:
    """Shared by the listing and its count so the two can never diverge."""
    if not prefix:
        return ""
    params.append(like_escape(prefix) + "%")
    return " AND source_path LIKE %s ESCAPE '\\'"


def build_paths(collection, prefix, limit) -> tuple[str, list]:
    """(sql, params) listing distinct paths, ordered so output is diffable."""
    params = [collection]
    sql = (
        "SELECT DISTINCT source_path FROM chunks WHERE collection=%s"
        + _prefix_clause(prefix, params)
        + " ORDER BY source_path LIMIT %s"
    )
    params.append(limit)
    return sql, params


def build_paths_count(collection, prefix) -> tuple[str, list]:
    """(sql, params) for the true total, deliberately unlimited.

    Reported alongside a limited listing so a caller can detect truncation.
    """
    params = [collection]
    sql = (
        "SELECT COUNT(DISTINCT source_path) FROM chunks WHERE collection=%s"
        + _prefix_clause(prefix, params)
    )
    return sql, params
```

- [ ] **Step 4: Run the tests to verify they pass**

```bash
pytest tests/test_selectors.py -v
```

Expected: PASS — 21 passed

- [ ] **Step 5: Commit**

```bash
git add infra/lore-rag/rag-api/selectors_lore.py infra/lore-rag/rag-api/tests/test_selectors.py
git commit -m "feat(rag): build distinct-path listing and count queries"
```

---

### Task 6: Wire the endpoints into `app.py` and fix the Dockerfile

**Files:**

- Modify: `infra/lore-rag/rag-api/app.py`
- Modify: `infra/lore-rag/rag-api/Dockerfile:7`

- [ ] **Step 1: Import the helpers**

In `infra/lore-rag/rag-api/app.py`, find line 7:

```python
from fastembed import TextEmbedding
```

Add immediately after it:

```python
from selectors_lore import build_delete, build_paths, build_paths_count, validate_delete
```

- [ ] **Step 2: Add the request model**

In `app.py`, find the `SearchReq` class (around line 39):

```python
class SearchReq(BaseModel):
    collection: str
    query: str
    k: int = 6
```

Add immediately after it:

```python
class DeleteReq(BaseModel):
    collection: str
    source_paths: list[str] = Field(default_factory=list)
    prefix: Optional[str] = None
```

`Field` and `Optional` are already imported at the top of the file — no import change needed.

- [ ] **Step 3: Add both endpoints**

In `app.py`, find the end of the `index` function — the line `return {"indexed": len(req.items)}`
(around line 76). Add these two endpoints immediately after it:

```python
_PATHS_LIMIT_DEFAULT = 1000


@app.post("/delete")
def delete(req: DeleteReq):
    """Remove chunks by explicit path and/or prefix.

    Deliberately not DELETE-with-body: request bodies on DELETE are poorly
    supported by intermediaries, and every other endpoint here is already POST.
    """
    err = validate_delete(req.collection, req.source_paths, req.prefix, VALID)
    if err:
        raise HTTPException(400, err)
    sql, params = build_delete(req.collection, req.source_paths, req.prefix)
    with db() as c:
        deleted = c.execute(sql, params).rowcount
        c.commit()
    return {"deleted": deleted}


@app.get("/paths")
def paths(collection: str, prefix: Optional[str] = None, limit: int = _PATHS_LIMIT_DEFAULT):
    """List distinct source_paths so a consumer can reconcile its own records.

    Delete alone cannot keep a caller consistent: if a delete fails, the caller
    has already dropped its record and will never name that path again, so the
    orphan becomes permanent and invisible. Listing closes that loop.

    An empty prefix is harmless here (listing is not destructive), so unlike
    /delete it is simply treated as "no filter".
    """
    if collection not in VALID:
        raise HTTPException(400, f"collection must be one of {sorted(VALID)}")
    sql, params = build_paths(collection, prefix, limit)
    count_sql, count_params = build_paths_count(collection, prefix)
    with db() as c:
        rows = c.execute(sql, params).fetchall()
        total = c.execute(count_sql, count_params).fetchone()[0]
    return {"collection": collection, "paths": [r[0] for r in rows], "count": total}
```

- [ ] **Step 4: Fix the Dockerfile**

In `infra/lore-rag/rag-api/Dockerfile`, find line 7:

```dockerfile
COPY app.py .
```

Replace it with:

```dockerfile
COPY app.py selectors_lore.py ./
```

The trailing slash is required: the classic builder rejects a multi-source COPY whose
destination is not a directory, and BuildKit is disabled for this host. Without copying the file
at all, the image builds fine and then crashes on startup with
`ModuleNotFoundError: No module named 'selectors_lore'`, *after* the running container has been
replaced.

- [ ] **Step 5: Verify the file parses and the helpers still pass**

Run from `infra/lore-rag/rag-api`:

```bash
python -m py_compile app.py selectors_lore.py && pytest -v
```

Expected: no output from `py_compile`, then `21 passed`.

(`app.py` is only compiled, not imported — importing it requires `DB_DSN` and downloads the
embedding model.)

- [ ] **Step 6: Commit**

```bash
git add infra/lore-rag/rag-api/app.py infra/lore-rag/rag-api/Dockerfile
git commit -m "feat(rag): add POST /delete and GET /paths endpoints"
```

---

### Task 7: Deploy and verify against the live service

Unit tests cover validation and SQL construction. They cannot prove the statements do the right
thing against a real table, so this task verifies behaviour end-to-end — including the property that
matters most: **`homehub` deleting its own data must be incapable of touching `campaign`.**

**Files:** none modified.

- [ ] **Step 1: Record the pre-deploy state**

```bash
curl -s http://10.10.6.56:8100/stats
```

Expected: JSON like `{"counts":{"campaign":1234,"homehub":56,"novels":789}}`.

**Write these numbers down.** Step 7 compares against them.

- [ ] **Step 2: Rebuild and restart the service**

Run from `infra/lore-rag` (PowerShell, per the R730 convention — BuildKit over SSH drops the
connection):

```powershell
$env:DOCKER_BUILDKIT=0
docker --context r730 compose up -d --build rag-api
```

Expected: build output ending in `Container lore-rag-api  Started`.

- [ ] **Step 3: Confirm the service came back up**

```bash
curl -s http://10.10.6.56:8100/health
```

Expected: `{"ok":true,"model":"BAAI/bge-small-en-v1.5"}`

If this returns nothing, check for the Dockerfile mistake from Task 6 Step 4:

```powershell
docker --context r730 logs lore-rag-api --tail 30
```

- [ ] **Step 4: Verify the guard rails reject unsafe requests**

```bash
curl -s -X POST http://10.10.6.56:8100/delete -H 'content-type: application/json' \
  -d '{"collection":"homehub"}'
curl -s -X POST http://10.10.6.56:8100/delete -H 'content-type: application/json' \
  -d '{"collection":"homehub","prefix":""}'
curl -s -X POST http://10.10.6.56:8100/delete -H 'content-type: application/json' \
  -d '{"collection":"nope","source_paths":["a"]}'
```

Expected: all three return HTTP 400 with a `detail` message. **None deletes anything.**

- [ ] **Step 5: Index a disposable test chunk, then list it**

```bash
curl -s -X POST http://10.10.6.56:8100/index -H 'content-type: application/json' \
  -d '{"collection":"homehub","items":[{"source_path":"zzdeletetest/1","heading":"delete me","chunk_text":"temporary row for verifying the delete endpoint"}]}'

curl -s 'http://10.10.6.56:8100/paths?collection=homehub&prefix=zzdeletetest/'
```

Expected: `{"indexed":1}`, then
`{"collection":"homehub","paths":["zzdeletetest/1"],"count":1}`

- [ ] **Step 6: Delete it by prefix and confirm it is gone**

```bash
curl -s -X POST http://10.10.6.56:8100/delete -H 'content-type: application/json' \
  -d '{"collection":"homehub","prefix":"zzdeletetest/"}'

curl -s 'http://10.10.6.56:8100/paths?collection=homehub&prefix=zzdeletetest/'
```

Expected: `{"deleted":1}`, then `{"collection":"homehub","paths":[],"count":0}`

- [ ] **Step 7: Confirm no collateral damage**

```bash
curl -s http://10.10.6.56:8100/stats
```

Expected: `campaign` and `novels` counts **identical** to Step 1. `homehub` is also back to its
Step 1 value, since the only row added was the one just deleted.

⚠️ If `campaign` or `novels` changed, the collection scoping is broken. Stop and re-check
`build_delete` — the `collection=%s` clause in Task 4.

- [ ] **Step 8: Confirm the working tree is clean**

Deployment changes no files, so nothing should be pending:

```bash
git status --short
```

Expected: no output. If anything is listed, it is an uncommitted change from an earlier task —
commit it before moving on.

---

## Done when

- [ ] `pytest -v` in `infra/lore-rag/rag-api` reports 21 passed
- [ ] `POST /delete` removes chunks by explicit path, by prefix, and by both
- [ ] `POST /delete` returns 400 for: unknown collection, no selector, empty-string prefix
- [ ] `GET /paths` returns distinct ordered paths with a true total count
- [ ] `campaign` and `novels` chunk counts are unchanged across the whole exercise
- [ ] The deployed container is healthy at `10.10.6.56:8100/health`

## Follow-on

HomeHub consumes these endpoints — see `2026-07-31-assistant-whats-happening-design.md` in the
HomeHub repo. Do not start that work until Task 7 passes; the HomeHub reconcile sweep cannot be
tested against a service that lacks these endpoints.

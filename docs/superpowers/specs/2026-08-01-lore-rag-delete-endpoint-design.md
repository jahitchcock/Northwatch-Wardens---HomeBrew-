# lore-rag Delete + Paths Endpoints — Design

**Date:** 2026-08-01
**Status:** Approved design, ready for implementation planning
**Scope:** Two additive endpoints on the shared lore-rag service: `POST /delete` and `GET /paths`.

## Problem

lore-rag can index and search, but it **cannot forget**.

`POST /index` with `replace_paths=True` issues
`DELETE FROM chunks WHERE collection=%s AND source_path = ANY(%s)` — but only over the paths present
in the submitted batch, and `/index` returns early on an empty item list. So a chunk can only be
removed by overwriting it with a replacement. There is no way to say "this no longer exists."

Every consumer hits this eventually:

- **HomeHub** is adding triaged email facts as `source="insight"`. Dismissing an insight removes it
  from `/data/email_insights.json`, but its vector stays permanently searchable — the assistant
  would keep surfacing something the user explicitly dismissed.
- **The campaign** has the same shape whenever lore is deleted or renamed rather than edited: a
  deleted NPC or a renamed location leaves its old chunks answering questions forever, which is
  exactly the "never invent locations or names" failure the `/ask` system prompts try to prevent.

A stale vector is worse than a missing one. It is confidently wrong.

## Decisions

| Decision | Choice |
| --- | --- |
| Delete granularity | Explicit `source_paths` list **and** optional `prefix` |
| Reconciliation support | `GET /paths` lists distinct paths, so callers can compute their own orphan set |
| HTTP shape | `POST /delete`, matching the all-POST style of `/index`, `/search`, `/ask` |
| Auth | **None** — matches the existing posture; see below |
| Empty-selector request | **Rejected (400)**, never interpreted as "delete everything" |
| Collection scope | Always required, always validated against `VALID` |

### Why `POST /delete` rather than `DELETE /chunks`

The request carries a list, and request bodies on `DELETE` are poorly supported by intermediaries
and some HTTP clients. Every existing mutating and querying endpoint here is already `POST` with a
JSON body (`/index`, `/search`, `/ask`), so `POST /delete` is both the safer and the more
consistent choice.

### Why `GET /paths` is part of this, not a follow-up

Delete alone is not enough to keep a consumer consistent. If a delete call fails — service
restarting, network blip — the caller has removed its own record and will never mention that path
again, so no future `/index` can clean it up. The orphan is permanent and invisible.

Listing paths is what closes that loop: a consumer can periodically ask "what do you hold under
`insight/`", diff against its own live records, and delete the difference. That turns deletion from
a fire-and-forget call into a **reconcilable** one, which is the difference between eventually
consistent and eventually wrong.

It is also the debugging tool this service currently lacks. `/stats` reports only per-collection
counts, so today the only way to find out what is actually indexed is to search for it and hope.

### Why no auth

Consistent with the service's existing posture, deliberately.

`/index` is *already* destructive: `replace_paths=True` is the default, so any LAN client can
overwrite any path in any collection today. Protecting `/delete` while leaving `/index` open would
not raise the security floor, it would just make the API inconsistent — an attacker who can
overwrite every chunk with garbage does not need a delete endpoint.

The service binds to `10.10.6.56:8100` on a trusted LAN. If that assumption ever stops holding, the
fix is auth on **all** write endpoints plus coordinated redeployment of every consumer, which is a
deliberate, separate piece of work — not something to half-do here.

**This is a known and accepted posture, recorded so it is a choice rather than an oversight.**

### Guard rails

The blast radius is bounded by construction, not by convention:

- `collection` is required and validated against `VALID`, exactly as the other endpoints do.
- A request with neither `source_paths` nor `prefix` is a **400**, never "delete everything."
- An empty-string `prefix` is a **400**. It would match every path in the collection, and a
  whole-collection wipe should require deliberately enumerating what you mean, not a falsy value
  arriving from a caller's uninitialised variable.
- `source_paths` and `prefix` may be combined; the result is their union.
- The response reports `deleted`, the true row count, so a caller can detect a no-op.

## API

### `POST /delete`

```json
{
  "collection": "homehub",
  "source_paths": ["insight/18f3a2b", "insight/18f3a2c"],
  "prefix": null
}
```

```json
{ "deleted": 2 }
```

Prefix form:

```json
{ "collection": "homehub", "prefix": "insight/" }
```

Deletes every chunk in `homehub` whose `source_path` starts with `insight/`.

| Condition | Response |
| --- | --- |
| `collection` not in `VALID` | 400 |
| Neither `source_paths` nor `prefix` supplied | 400 |
| `prefix` supplied but empty string | 400 |
| Nothing matched | 200, `{"deleted": 0}` |

### `GET /paths`

`GET /paths?collection=homehub&prefix=insight/`

```json
{
  "collection": "homehub",
  "paths": ["insight/18f3a2b", "insight/18f3a2c"],
  "count": 2
}
```

`prefix` is optional here — unlike delete, listing everything is harmless. Returns **distinct**
`source_path` values (a document indexed as several chunks shares one path), ordered, so the output
is stable and diffable.

`limit` defaults to a sane cap with the true `count` always reported, so a caller can tell it was
truncated.

## Implementation Notes

Both endpoints are a handful of lines in `rag-api/app.py`, following the existing style: a pydantic
request model, a `VALID` check, one SQL statement inside `with db() as c`, and `c.commit()` for the
mutating one.

**Indexing.** `chunks_path_idx ON chunks (collection, source_path)` already makes exact-path deletes
cheap. Left-anchored `LIKE 'insight/%'` will *not* use that btree index under a non-C collation, so
prefix delete degrades to a scan — irrelevant at this table's size, and noted here so it isn't
mistaken for a bug later. If it ever matters, the fix is a `text_pattern_ops` index, not a schema
redesign.

**Escaping.** A prefix containing `%` or `_` would otherwise be interpreted as a LIKE wildcard.
Prefixes are matched with `LIKE` against an escaped pattern so `source_path` values containing those
characters behave literally.

**No schema change.** Both endpoints work against the existing table.

**Backward compatible.** Purely additive — no existing endpoint changes shape, so campaign tooling
and HomeHub continue working untouched until they choose to adopt these.

## Testing

| Case | Expectation |
| --- | --- |
| Delete by explicit paths | Only those rows go; other collections untouched |
| Delete by prefix | All matching rows go; non-matching siblings survive |
| Paths + prefix together | Union deleted |
| Invalid collection | 400 |
| No selector | 400, nothing deleted |
| Empty-string prefix | 400, nothing deleted |
| Prefix containing `%` | Treated literally, not as a wildcard |
| Delete then search | Deleted content no longer returned |
| `GET /paths` | Distinct, ordered; reflects deletions immediately |

The cross-collection isolation cases matter most: `homehub` deleting its own orphans must be
provably incapable of touching `campaign` or `novels`.

## Deployment

`docker --context r730 compose ...` against `infra/lore-rag`, rebuilding `rag-api`. `DOCKER_BUILDKIT=0`
per the usual R730 constraint. No database migration, so the `lore-pgdata` volume is untouched and
no reindex is required.

Consumers to notify: HomeHub (adopting immediately — see
`2026-07-31-assistant-whats-happening-design.md` in that repo) and campaign tooling (no change
required).

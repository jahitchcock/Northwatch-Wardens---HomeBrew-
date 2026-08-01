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

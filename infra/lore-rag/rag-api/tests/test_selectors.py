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

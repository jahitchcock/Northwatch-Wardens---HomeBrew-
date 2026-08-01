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

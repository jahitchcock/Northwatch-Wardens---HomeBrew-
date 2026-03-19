#!/usr/bin/env python3
"""Compare DM guide build output against a Homebrewery export.

This is a repo-local helper for the iterative sync workflow:
- Treat the Homebrewery export as the canonical baseline (except watercolors).
- Allow optionally ignoring page footer blocks (pageNumber/footnote), since those
  are build/script-generated and may be missing in the export.
"""

from __future__ import annotations

import argparse
import difflib
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, List, Sequence


DEFAULT_BUILD = Path("build/A-DMs-guide-to-aevoria.txt")
DEFAULT_EXPORT = Path("build/HB-ADMundefinedsGuidetoAevoria.txt")


def is_watercolor(line: str) -> bool:
    return line.lstrip().startswith("{{watercolor")


def is_footer_line(line: str) -> bool:
    # DM guide footers are inserted by tooling as these lines.
    if "{{pageNumber" in line:
        return True
    if "{{footnote" in line:
        return True
    if "**🚀 New DM?**" in line:
        return True
    return False


def strip_lines(
    lines: Sequence[str],
    *,
    strip_watercolors: bool,
    strip_footers: bool,
    strip_blank_lines: bool,
    collapse_blank_lines: bool,
) -> List[str]:
    out: List[str] = []
    for ln in lines:
        if strip_watercolors and is_watercolor(ln):
            continue
        if strip_footers and is_footer_line(ln):
            continue
        if strip_blank_lines and ln.strip() == "":
            continue
        out.append(ln)

    if collapse_blank_lines:
        collapsed: List[str] = []
        last_was_blank = False
        for ln in out:
            is_blank = ln.strip() == ""
            if is_blank and last_was_blank:
                continue
            collapsed.append(ln)
            last_was_blank = is_blank
        return collapsed

    return out


def count_marker(lines: Sequence[str], marker: str) -> int:
    return sum(1 for ln in lines if ln.strip() == marker)


def unified_diff(a: Sequence[str], b: Sequence[str], *, a_name: str, b_name: str) -> str:
    # Keep line endings consistent for diff display.
    a_lines = [ln + "\n" for ln in a]
    b_lines = [ln + "\n" for ln in b]
    return "".join(
        difflib.unified_diff(
            a_lines,
            b_lines,
            fromfile=a_name,
            tofile=b_name,
            n=3,
        )
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Compare DM guide build vs HB export")
    parser.add_argument("--build", type=Path, default=DEFAULT_BUILD)
    parser.add_argument("--export", type=Path, default=DEFAULT_EXPORT)
    parser.add_argument("--out", type=Path, default=Path("build/dmguide.unified.diff"))
    parser.add_argument("--strip-watercolors", action="store_true", default=True)
    parser.add_argument("--keep-watercolors", dest="strip_watercolors", action="store_false")
    parser.add_argument("--strip-footers", action="store_true", default=False)
    parser.add_argument(
        "--strip-blank-lines",
        action="store_true",
        default=False,
        help="Ignore blank-only lines (treat whitespace-only diffs as acceptable).",
    )
    parser.add_argument(
        "--collapse-blank-lines",
        action="store_true",
        default=False,
        help="Collapse consecutive blank-only lines to a single blank line.",
    )
    args = parser.parse_args()

    build_text = args.build.read_text(encoding="utf-8")
    export_text = args.export.read_text(encoding="utf-8")
    build_lines_raw = build_text.splitlines()
    export_lines_raw = export_text.splitlines()

    build_lines = strip_lines(
        build_lines_raw,
        strip_watercolors=args.strip_watercolors,
        strip_footers=args.strip_footers,
        strip_blank_lines=args.strip_blank_lines,
        collapse_blank_lines=args.collapse_blank_lines,
    )
    export_lines = strip_lines(
        export_lines_raw,
        strip_watercolors=args.strip_watercolors,
        strip_footers=args.strip_footers,
        strip_blank_lines=args.strip_blank_lines,
        collapse_blank_lines=args.collapse_blank_lines,
    )

    sm = difflib.SequenceMatcher(a=build_lines, b=export_lines, autojunk=False)

    print(f"Build:  {args.build} ({len(build_lines_raw)} raw → {len(build_lines)} filtered)")
    print(f"Export: {args.export} ({len(export_lines_raw)} raw → {len(export_lines)} filtered)")
    print(f"Delta (filtered build-export): {len(build_lines) - len(export_lines):+d}")
    print(f"Similarity (filtered): {sm.ratio():.6f}")
    # In the files, these markers typically appear as a single leading backslash.
    page_single = "\\page"
    page_double = "\\\\page"
    col_single = "\\column"
    col_double = "\\\\column"
    print(
        "\\page count:   build={} export={} (double-slash build={} export={})".format(
            count_marker(build_lines, page_single),
            count_marker(export_lines, page_single),
            count_marker(build_lines, page_double),
            count_marker(export_lines, page_double),
        )
    )
    print(
        "\\column count: build={} export={} (double-slash build={} export={})".format(
            count_marker(build_lines, col_single),
            count_marker(export_lines, col_single),
            count_marker(build_lines, col_double),
            count_marker(export_lines, col_double),
        )
    )

    diff_text = unified_diff(
        build_lines,
        export_lines,
        a_name=str(args.build),
        b_name=str(args.export),
    )
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(diff_text, encoding="utf-8")
    print(f"Wrote unified diff: {args.out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

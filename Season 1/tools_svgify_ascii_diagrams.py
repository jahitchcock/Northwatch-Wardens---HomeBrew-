#!/usr/bin/env python3
"""Scan Markdown for ASCII-diagram fenced blocks.

Goal: identify *untyped* fenced code blocks that are likely ASCII diagrams (trees,
relationship maps, box drawings), which Homebrewery renderers/previews often
mangle.

This script is conservative: it tries hard to avoid flagging real code/commands.

Usage:
    python "Season 1/tools_svgify_ascii_diagrams.py" scan --root "World Building"
    python "Season 1/tools_svgify_ascii_diagrams.py" scan --root "Season 1"

    python "Season 1/tools_svgify_ascii_diagrams.py" apply --root "World Building"
    python "Season 1/tools_svgify_ascii_diagrams.py" apply --root "Season 1"

Notes:
- 'apply' modifies markdown files and writes SVGs to:
    World Building/Campaign Assets/Diagrams
- The conversion is conservative and only targets *untyped* fences that look
    like ASCII diagrams.
"""

from __future__ import annotations

import argparse
import os
import re
import hashlib
import urllib.parse
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, List, Optional, Tuple


FENCE_RE = re.compile(r"^```(?P<lang>[^`]*)$", re.IGNORECASE)

CODE_LANGS = {
    "bash",
    "sh",
    "zsh",
    "powershell",
    "ps1",
    "cmd",
    "batch",
    "json",
    "yaml",
    "yml",
    "toml",
    "xml",
    "html",
    "css",
    "javascript",
    "js",
    "typescript",
    "ts",
    "python",
    "py",
    "markdown",
    "md",
}

EXCLUDE_DIR_NAMES = {
    ".git",
    "node_modules",
    ".venv",
    "venv",
}

EXCLUDE_TOP_LEVEL = {
    "Examples",
}

DIAGRAMS_DIR = Path("World Building") / "Campaign Assets" / "Diagrams"


@dataclass(frozen=True)
class Block:
    file: Path
    start_line: int  # 1-based
    end_line: int  # 1-based (inclusive)
    lang: str
    text: str
    score: int
    reason: str


def iter_markdown_files(root: Path) -> Iterable[Path]:
    for dirpath, dirnames, filenames in os.walk(root):
        path = Path(dirpath)

        # Skip excluded dirs
        dirnames[:] = [
            d
            for d in dirnames
            if d not in EXCLUDE_DIR_NAMES and not d.startswith(".")
        ]

        # Skip excluded top-level folders entirely
        rel = path.relative_to(root)
        if rel.parts and rel.parts[0] in EXCLUDE_TOP_LEVEL:
            dirnames[:] = []
            continue

        for name in filenames:
            if name.lower().endswith(".md"):
                yield path / name


def diagram_score(text: str) -> Tuple[int, str]:
    lines = text.splitlines()
    if len(lines) < 4:
        return 0, "too few lines"

    joined = "\n".join(lines)

    score = 0
    reasons: List[str] = []

    # Strong indicators
    if any(ch in joined for ch in "│┌┐└┘─┬┴┼═║╔╗╚╝"):
        score += 6
        reasons.append("box-drawing")

    if any(ch in joined for ch in "←→↑↓↔"):
        score += 5
        reasons.append("unicode-arrows")

    if re.search(r"<->|<-|->|=>|<=", joined):
        score += 3
        reasons.append("ascii-arrows")

    # Layout-ish patterns
    if sum(1 for ln in lines if ln.startswith(" ") or ln.startswith("\t")) >= max(2, len(lines) // 2):
        score += 3
        reasons.append("many-indented-lines")

    if any(re.search(r" {4,}", ln) for ln in lines):
        score += 2
        reasons.append("wide-spacing")

    if any(ln.count("|") >= 2 for ln in lines):
        score += 2
        reasons.append("pipe-columns")

    if any(ln.count("-") >= 6 for ln in lines):
        score += 1
        reasons.append("rule-like-lines")

    # Negative indicators (likely real code or commands)
    negative = 0

    if re.search(r"\b(import|from|def|class|return|const|let|function|await|async)\b", joined):
        negative += 6

    if re.search(r"[{};]", joined):
        negative += 3

    if re.search(r"</?\w+", joined):  # XML/HTML-ish
        negative += 4

    if re.search(r"\b(npm|node|python|pip|git|cd\s+|New-Item|Copy-Item|Move-Item)\b", joined):
        negative += 5

    if re.search(r"\b[A-Za-z]:\\", joined):  # Windows paths
        negative += 4

    if re.search(r"^\s*\$\s+", joined, flags=re.MULTILINE):
        negative += 3

    score -= negative

    return score, ",".join(reasons) if reasons else ""


def find_untyped_fenced_blocks(md: str) -> List[Tuple[int, int, str, str]]:
    """Return list of (startLine, endLine, lang, bodyText) for all fenced blocks."""
    lines = md.splitlines()
    blocks: List[Tuple[int, int, str, str]] = []

    i = 0
    while i < len(lines):
        m = FENCE_RE.match(lines[i])
        if not m:
            i += 1
            continue

        lang = (m.group("lang") or "").strip().lower()
        start = i

        # Find closing fence
        i += 1
        body_lines: List[str] = []
        while i < len(lines) and not lines[i].startswith("```"):
            body_lines.append(lines[i])
            i += 1

        if i >= len(lines):
            break  # unclosed fence

        end = i
        blocks.append((start + 1, end + 1, lang, "\n".join(body_lines)))
        i += 1

    return blocks


HEADING_RE = re.compile(r"^(?P<level>#{1,6})\s+(?P<title>.+?)\s*$")


def nearest_heading(lines: List[str], start_index_0: int) -> Optional[str]:
    for i in range(start_index_0 - 1, max(-1, start_index_0 - 60), -1):
        m = HEADING_RE.match(lines[i])
        if m:
            return m.group("title")
    return None


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"(^-+|-+$)", "", value)
    return value or "diagram"


def escape_xml_text(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def render_svg(diagram_text: str, title: str) -> str:
    lines = diagram_text.rstrip("\n").splitlines()
    if not lines:
        lines = [""]

    longest = max((len(ln) for ln in lines), default=0)
    # Approx metrics for 14px monospace
    char_w = 8
    pad_x = 20
    pad_top = 46
    line_h = 18
    width = max(520, min(1200, pad_x * 2 + longest * char_w))
    height = pad_top + len(lines) * line_h + 24

    safe_title = escape_xml_text(title)
    tspans = []
    y0 = pad_top
    for idx, ln in enumerate(lines):
        y = y0 + idx * line_h
        tspans.append(
            f"<tspan x=\"{pad_x}\" y=\"{y}\">{escape_xml_text(ln)}</tspan>"
        )

    tspans_joined = "\n      ".join(tspans)

    return (
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
        f"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"{width}\" height=\"{height}\" viewBox=\"0 0 {width} {height}\" role=\"img\" aria-label=\"{safe_title}\">\n"
        "  <defs>\n"
        "    <style>\n"
        "      .bg { fill: #fbf4e6; }\n"
        "      .title { font: 600 18px 'Georgia', 'Times New Roman', serif; fill: #5a3b1e; }\n"
        "      .mono { font: 14px 'Courier New', monospace; fill: #1f1a14; }\n"
        "    </style>\n"
        "  </defs>\n\n"
        f"  <rect class=\"bg\" x=\"0\" y=\"0\" width=\"{width}\" height=\"{height}\"/>\n"
        f"  <text class=\"title\" x=\"{pad_x}\" y=\"30\">{safe_title}</text>\n"
        "  <text class=\"mono\" xml:space=\"preserve\">\n"
        f"      {tspans_joined}\n"
        "  </text>\n"
        "</svg>\n"
    )


def detect_newline_style(raw: bytes) -> str:
    return "\r\n" if b"\r\n" in raw else "\n"


def read_text_preserve_newlines(path: Path) -> Tuple[str, str]:
    raw = path.read_bytes()
    newline = detect_newline_style(raw)
    text = raw.decode("utf-8", errors="replace")
    return text, newline


def write_text_preserve_newlines(path: Path, text: str, newline: str) -> None:
    if newline != "\n":
        text = text.replace("\n", newline)
    path.write_text(text, encoding="utf-8")


def workspace_root_from(process_root: Path) -> Path:
    """Best-effort workspace root detection.

    Supports passing:
    - workspace root
    - 'World Building'
    - 'Season 1'
    - subfolders within the workspace (e.g. 'World Building/Regions')
    """
    resolved = process_root.resolve()

    # Walk up from the provided root looking for a folder that contains
    # the canonical 'World Building' directory.
    for candidate in [resolved, *resolved.parents]:
        if (candidate / "World Building").is_dir():
            return candidate

    # Fallback: preserve previous behavior (but using the resolved path).
    if resolved.name in {"World Building", "Season 1"} and (resolved.parent / "World Building").is_dir():
        return resolved.parent
    return resolved


def apply_conversion(process_root: Path, threshold: int = 5) -> int:
    workspace_root = workspace_root_from(process_root)
    diagrams_dir = workspace_root / DIAGRAMS_DIR
    diagrams_dir.mkdir(parents=True, exist_ok=True)

    changed_files = 0

    for file in iter_markdown_files(process_root):
        text, newline = read_text_preserve_newlines(file)
        lines = text.splitlines()
        blocks = find_untyped_fenced_blocks(text)
        if not blocks:
            continue

        # Build edits from bottom to top so offsets don't shift.
        edits: List[Tuple[int, int, str]] = []  # startLine, endLine, replacement

        for start_line, end_line, lang, body in blocks:
            if lang and lang in CODE_LANGS:
                continue
            if lang and lang not in ("",) and lang not in CODE_LANGS:
                continue

            score, _reason = diagram_score(body)
            if score < threshold:
                continue

            start_i0 = start_line - 1
            heading = nearest_heading(lines, start_i0) or file.stem

            digest = hashlib.sha1(body.encode("utf-8", errors="replace")).hexdigest()[:8]
            base = slugify(f"{file.stem}-{heading}")
            svg_name = f"{base}-l{start_line}-{digest}.svg"
            svg_path = diagrams_dir / svg_name

            svg_content = render_svg(body, heading)
            if not svg_path.exists() or svg_path.read_text(encoding="utf-8", errors="replace") != svg_content:
                svg_path.write_text(svg_content, encoding="utf-8")

            # Relative link from markdown file to diagrams dir.
            rel_link = os.path.relpath(svg_path, start=file.parent).replace("\\", "/")
            rel_link = urllib.parse.quote(rel_link, safe="/()_-.")
            replacement_lines = [
                "",  # ensure blank line
                f"![Diagram: {heading}]({rel_link})",
                "",
                "<!-- ASCII diagram source (converted to SVG):",
                *[ln.rstrip() for ln in body.splitlines()],
                "-->",
                "",
            ]
            replacement = "\n".join(replacement_lines).rstrip("\n")

            edits.append((start_line, end_line, replacement))

        if not edits:
            continue

        # Apply edits bottom-up
        new_lines = text.splitlines()
        for start_line, end_line, replacement in sorted(edits, key=lambda t: t[0], reverse=True):
            start_i = start_line - 1
            end_i = end_line - 1
            before = new_lines[:start_i]
            after = new_lines[end_i + 1 :]
            rep_lines = replacement.splitlines()
            new_lines = before + rep_lines + after

        new_text = "\n".join(new_lines)
        if new_text != text:
            write_text_preserve_newlines(file, new_text, newline)
            changed_files += 1

    return changed_files


def scan(root: Path, threshold: int = 5) -> List[Block]:
    candidates: List[Block] = []

    for file in iter_markdown_files(root):
        try:
            md = file.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            md = file.read_text(encoding="utf-8", errors="replace")

        for start, end, lang, body in find_untyped_fenced_blocks(md):
            if lang and lang in CODE_LANGS:
                continue
            if lang and not lang.strip():
                pass
            # Only consider untyped / unknown language blocks
            if lang and lang not in ("",) and lang not in CODE_LANGS:
                # Unknown language tag: likely intended as code; skip.
                continue

            score, reason = diagram_score(body)
            if score >= threshold:
                candidates.append(
                    Block(
                        file=file,
                        start_line=start,
                        end_line=end,
                        lang=lang,
                        text=body,
                        score=score,
                        reason=reason,
                    )
                )

    return sorted(candidates, key=lambda b: (str(b.file).lower(), b.start_line))


def main() -> None:
    parser = argparse.ArgumentParser()
    sub = parser.add_subparsers(dest="cmd", required=True)

    scan_p = sub.add_parser("scan", help="Scan for ASCII-diagram fenced blocks")
    scan_p.add_argument("--root", default=".", help="Workspace root")
    scan_p.add_argument("--threshold", type=int, default=5, help="Score threshold for diagram detection")

    apply_p = sub.add_parser("apply", help="Convert likely ASCII-diagram fences to SVG + embed")
    apply_p.add_argument("--root", default=".", help="Folder to process (e.g., 'World Building' or 'Season 1')")
    apply_p.add_argument("--threshold", type=int, default=5, help="Score threshold for diagram detection")

    args = parser.parse_args()

    root = Path(args.root).resolve()

    if args.cmd == "scan":
        results = scan(root, threshold=args.threshold)
        print(f"Found {len(results)} likely diagram blocks.\n")
        for b in results:
            rel = b.file.relative_to(root)
            preview = (b.text.splitlines()[0].strip() if b.text.strip() else "(empty)")
            print(
                f"- {rel}:{b.start_line}-{b.end_line} score={b.score} [{b.reason}] :: {preview}"  # noqa: E501
            )

    if args.cmd == "apply":
        changed = apply_conversion(root, threshold=args.threshold)
        print(f"Updated {changed} markdown file(s).")


if __name__ == "__main__":
    main()

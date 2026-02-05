from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import ssl
import sys
import urllib.parse
import urllib.request
from dataclasses import dataclass
from datetime import UTC, datetime
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageOps

IMG_EXTS = {"png", "jpg", "jpeg", "gif", "webp"}


@dataclass(frozen=True)
class ImgurAsset:
    original_url: str
    sanitized_url: str
    status: int | None
    content_type: str | None
    byte_count: int | None
    sha256: str | None
    error: str | None
    file_path: str | None


@dataclass(frozen=True)
class Reference:
    md_file: str
    kind: str  # 'markdown' | 'html'
    original_target: str
    resolved_local_path: str


@dataclass(frozen=True)
class PerceptualHashes:
    ahash: int
    dhash: int


def sanitize_imgur_url(url: str) -> str:
    """Strip the literal 'undefined' suffix sometimes appended before the extension."""
    url = url.strip()
    m = re.match(
        r"^(https?://i\.imgur\.com/)([A-Za-z0-9]+)undefined\.(png|jpg|jpeg|gif|webp)$",
        url,
    )
    if not m:
        return url
    return f"{m.group(1)}{m.group(2)}.{m.group(3)}"


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def _ahash(image: Image.Image, hash_size: int = 8) -> int:
    img = ImageOps.exif_transpose(image).convert("L").resize(
        (hash_size, hash_size), Image.Resampling.LANCZOS
    )
    pixels = list(img.getdata())
    avg = sum(pixels) / len(pixels)
    bits = 0
    for p in pixels:
        bits = (bits << 1) | (1 if p >= avg else 0)
    return bits


def _dhash(image: Image.Image, hash_size: int = 8) -> int:
    img = ImageOps.exif_transpose(image).convert("L").resize(
        (hash_size + 1, hash_size), Image.Resampling.LANCZOS
    )
    pixels = list(img.getdata())
    bits = 0
    for row in range(hash_size):
        row_start = row * (hash_size + 1)
        for col in range(hash_size):
            left = pixels[row_start + col]
            right = pixels[row_start + col + 1]
            bits = (bits << 1) | (1 if left > right else 0)
    return bits


def perceptual_hashes_from_path(path: Path) -> PerceptualHashes | None:
    try:
        with Image.open(path) as im:
            return PerceptualHashes(ahash=_ahash(im), dhash=_dhash(im))
    except Exception:
        return None


def hamming_distance(a: int, b: int) -> int:
    return (a ^ b).bit_count()


def iter_markdown_files(root: Path, include_roots: list[Path], exclude_dirnames: set[str]) -> Iterable[Path]:
    for base in include_roots:
        if not base.exists():
            continue
        for md in base.rglob("*.md"):
            rel_parts = md.relative_to(root).parts
            if any(p in exclude_dirnames for p in rel_parts):
                continue
            yield md


MD_IMG_RE = re.compile(r"!\[[^\]]*\]\(([^)]+)\)")
HTML_IMG_RE = re.compile(
    r"<img\s+[^>]*?src=(?:\"([^\"]+)\"|'([^']+)')[^>]*?>",
    re.IGNORECASE,
)


def split_md_target(target: str) -> tuple[str, str]:
    """Split markdown ( ... ) target into (path_part, rest), preserving any title text."""
    t = target.strip()
    if t.startswith("<") and t.endswith(">"):
        t = t[1:-1].strip()

    m = re.match(r"^(\S+)(\s+.*)$", t)
    if m:
        return m.group(1), m.group(2)
    return t, ""


def resolve_local_image(root: Path, md_path: Path, target_path_part: str) -> Path | None:
    lower = target_path_part.strip().lower()
    if lower.startswith(("http://", "https://", "data:")):
        return None

    cleaned = target_path_part.strip()
    cleaned = cleaned.split("#", 1)[0].split("?", 1)[0]
    cleaned = urllib.parse.unquote(cleaned)
    cleaned = cleaned.replace("/", os.sep)

    candidate = (md_path.parent / cleaned).resolve()
    if candidate.exists() and candidate.is_file():
        return candidate

    if cleaned.startswith(os.sep):
        candidate2 = (root / cleaned.lstrip("\\/")).resolve()
        if candidate2.exists() and candidate2.is_file():
            return candidate2

    return None


def extract_references(root: Path, md_files: Iterable[Path]) -> tuple[list[Reference], dict[str, list[Reference]]]:
    refs: list[Reference] = []
    by_local: dict[str, list[Reference]] = {}
    for md in md_files:
        try:
            text = md.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            text = md.read_text(encoding="utf-8", errors="replace")

        for m in MD_IMG_RE.finditer(text):
            original = m.group(1)
            path_part, _rest = split_md_target(original)
            local = resolve_local_image(root, md, path_part)
            if local is None:
                continue
            ext = local.suffix.lower().lstrip(".")
            if ext not in IMG_EXTS:
                continue
            r = Reference(str(md), "markdown", original, str(local))
            refs.append(r)
            by_local.setdefault(str(local), []).append(r)

        for m in HTML_IMG_RE.finditer(text):
            original = (m.group(1) or m.group(2) or "").strip()
            local = resolve_local_image(root, md, original)
            if local is None:
                continue
            ext = local.suffix.lower().lstrip(".")
            if ext not in IMG_EXTS:
                continue
            r = Reference(str(md), "html", original, str(local))
            refs.append(r)
            by_local.setdefault(str(local), []).append(r)

    return refs, by_local


def download_imgur_assets(root: Path, urls: list[str]) -> list[ImgurAsset]:
    out_dir = root / ".tmp" / "imgur_downloads"
    out_dir.mkdir(parents=True, exist_ok=True)

    ctx = ssl.create_default_context()
    assets: list[ImgurAsset] = []
    for idx, original in enumerate(urls, 1):
        sanitized = sanitize_imgur_url(original)
        name = sanitized.split("/")[-1]
        safe_name = re.sub(r"[^A-Za-z0-9._-]+", "_", name)
        out_path = out_dir / f"{idx:02d}_{safe_name}"
        try:
            req = urllib.request.Request(
                sanitized,
                headers={"User-Agent": "Mozilla/5.0"},
            )
            with urllib.request.urlopen(req, timeout=60, context=ctx) as resp:
                status = getattr(resp, "status", 200)
                content_type = resp.getheader("Content-Type")
                data = resp.read()
            out_path.write_bytes(data)
            sha = sha256_bytes(data)
            assets.append(
                ImgurAsset(
                    original_url=original,
                    sanitized_url=sanitized,
                    status=status,
                    content_type=content_type,
                    byte_count=len(data),
                    sha256=sha,
                    error=None,
                    file_path=str(out_path),
                )
            )
        except Exception as e:
            assets.append(
                ImgurAsset(
                    original_url=original,
                    sanitized_url=sanitized,
                    status=None,
                    content_type=None,
                    byte_count=None,
                    sha256=None,
                    error=str(e),
                    file_path=None,
                )
            )
    return assets


def rewrite_files(
    refs: list[Reference],
    local_to_imgur: dict[str, str],
    apply: bool,
) -> dict[str, dict[str, int]]:
    per_file: dict[str, dict[str, int]] = {}
    refs_by_file: dict[str, list[Reference]] = {}
    for r in refs:
        if r.resolved_local_path not in local_to_imgur:
            continue
        refs_by_file.setdefault(r.md_file, []).append(r)

    for md_file, file_refs in refs_by_file.items():
        md_path = Path(md_file)
        try:
            text = md_path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            text = md_path.read_text(encoding="utf-8", errors="replace")

        replaced = 0
        skipped = 0

        seen: set[tuple[str, str, str]] = set()
        for r in file_refs:
            new_url = local_to_imgur[r.resolved_local_path]
            key = (r.kind, r.original_target, new_url)
            if key in seen:
                continue
            seen.add(key)

            if r.kind == "markdown":
                _path_part, rest = split_md_target(r.original_target)
                old = r.original_target
                new = f"{new_url}{rest}"
            else:
                old = r.original_target
                new = new_url

            if old in text:
                count = text.count(old)
                text = text.replace(old, new)
                replaced += count
            else:
                skipped += 1

        per_file[md_file] = {"replacements": replaced, "skipped": skipped}
        if replaced > 0 and apply:
            backup = md_path.with_suffix(md_path.suffix + ".bak")
            if not backup.exists():
                backup.write_text(
                    md_path.read_text(encoding="utf-8", errors="replace"),
                    encoding="utf-8",
                )
            md_path.write_text(text, encoding="utf-8")

    return per_file


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Rewrite local markdown image links to provided Imgur URLs via content hashing."
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Write changes to files (creates .bak backups once).",
    )
    parser.add_argument(
        "--urls-file",
        type=str,
        required=True,
        help="Path to a text file containing one Imgur URL per line.",
    )
    parser.add_argument(
        "--root",
        type=str,
        default=None,
        help="Repo root (default: auto-detected two levels up from this script).",
    )
    args = parser.parse_args()

    script_path = Path(__file__).resolve()
    root = Path(args.root).resolve() if args.root else script_path.parents[2]

    url_file = Path(args.urls_file).resolve()
    urls = [line.strip() for line in url_file.read_text(encoding="utf-8").splitlines() if line.strip()]
    if not urls:
        print("ERROR: no URLs found in urls file", file=sys.stderr)
        return 2

    include_roots = [
        root / "Season 1",
        root / "World Building",
        root / "Characters",
        root / "Premade PCs",
    ]
    exclude_dirnames = {"build", ".github", "node_modules", ".venv", "__pycache__"}

    md_files = list(iter_markdown_files(root, include_roots, exclude_dirnames))
    refs, by_local = extract_references(root, md_files)

    imgur_assets = download_imgur_assets(root, urls)
    imgur_by_hash: dict[str, list[ImgurAsset]] = {}
    for a in imgur_assets:
        if a.sha256:
            imgur_by_hash.setdefault(a.sha256, []).append(a)

    local_hashes: dict[str, str] = {}
    for local_path_str in by_local.keys():
        p = Path(local_path_str)
        try:
            local_hashes[local_path_str] = sha256_file(p)
        except Exception:
            continue

    local_to_imgur: dict[str, str] = {}
    collisions: dict[str, dict[str, list[str]]] = {}
    for local_path_str, sha in local_hashes.items():
        matches = imgur_by_hash.get(sha)
        if not matches:
            continue
        local_to_imgur[local_path_str] = matches[0].sanitized_url
        if len(matches) > 1:
            collisions[sha] = {
                "local": [local_path_str],
                "imgur_urls": [m.sanitized_url for m in matches],
            }

    # Fallback: perceptual hash matching (Imgur often re-encodes uploads).
    # We only attempt this for local images not already matched by SHA256.
    perceptual_matches: dict[str, dict[str, object]] = {}
    unmatched_local_paths = [p for p in by_local.keys() if p not in local_to_imgur]
    if unmatched_local_paths:
        imgur_phashes: list[tuple[ImgurAsset, PerceptualHashes]] = []
        for a in imgur_assets:
            if a.file_path is None:
                continue
            ph = perceptual_hashes_from_path(Path(a.file_path))
            if ph is None:
                continue
            imgur_phashes.append((a, ph))

        local_phashes: dict[str, PerceptualHashes] = {}
        for local_path_str in unmatched_local_paths:
            ph = perceptual_hashes_from_path(Path(local_path_str))
            if ph is None:
                continue
            local_phashes[local_path_str] = ph

        # Conservative thresholds to reduce false positives.
        max_dhash = 6
        max_ahash = 10
        min_margin = 3

        for local_path_str, lph in local_phashes.items():
            best: tuple[int, int, ImgurAsset] | None = None
            second: tuple[int, int, ImgurAsset] | None = None
            for asset, aph in imgur_phashes:
                dd = hamming_distance(lph.dhash, aph.dhash)
                ad = hamming_distance(lph.ahash, aph.ahash)
                if best is None or (dd, ad) < (best[0], best[1]):
                    second = best
                    best = (dd, ad, asset)
                elif second is None or (dd, ad) < (second[0], second[1]):
                    second = (dd, ad, asset)

            if best is None:
                continue
            best_dd, best_ad, best_asset = best
            if best_dd > max_dhash or best_ad > max_ahash:
                continue

            if second is not None:
                second_dd, second_ad, _second_asset = second
                margin = (second_dd + second_ad) - (best_dd + best_ad)
                if margin < min_margin:
                    continue

            local_to_imgur[local_path_str] = best_asset.sanitized_url
            perceptual_matches[local_path_str] = {
                "local": local_path_str,
                "imgur": best_asset.sanitized_url,
                "dhash_distance": best_dd,
                "ahash_distance": best_ad,
            }

    per_file = rewrite_files(refs, local_to_imgur, apply=args.apply)

    report_dir = root / ".tmp"
    report_dir.mkdir(exist_ok=True)
    report_path = report_dir / "imgur_migration_report.json"
    report = {
        "timestamp": datetime.now(UTC).isoformat(),
        "apply": bool(args.apply),
        "root": str(root),
        "markdown_files_scanned": len(md_files),
        "references_found": len(refs),
        "unique_local_images_referenced": len(by_local),
        "imgur_urls_input": len(urls),
        "imgur_assets": [a.__dict__ for a in imgur_assets],
        "imgur_download_errors": [a.__dict__ for a in imgur_assets if a.error],
        "imgur_non_image": [a.__dict__ for a in imgur_assets if a.content_type and not a.content_type.lower().startswith("image/")],
        "local_images_hashed": len(local_hashes),
        "local_to_imgur_mapped": len(local_to_imgur),
        "perceptual_matches": perceptual_matches,
        "hash_collisions": collisions,
        "files_modified": {k: v for k, v in per_file.items() if v.get("replacements", 0) > 0},
        "files_touched": per_file,
    }
    report_path.write_text(json.dumps(report, indent=2), encoding="utf-8")

    modified_count = sum(1 for v in per_file.values() if v.get("replacements", 0) > 0)
    total_repls = sum(v.get("replacements", 0) for v in per_file.values())

    print(f"Markdown files scanned: {len(md_files)}")
    print(f"References found: {len(refs)}")
    print(f"Unique referenced local images: {len(by_local)}")
    print(f"Imgur URLs: {len(urls)} (sanitized where applicable)")
    print(f"Imgur download errors: {len([a for a in imgur_assets if a.error])}")
    print(f"Local->Imgur mapped by hash: {len(local_to_imgur)}")
    print(f"Files modified: {modified_count}")
    print(f"Total replacements: {total_repls}")
    print(f"Report: {report_path}")

    if len(local_to_imgur) == 0:
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

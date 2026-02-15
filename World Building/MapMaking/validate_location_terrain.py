import argparse
import csv
import os
from typing import List, Tuple

WATER_SYMBOLS = {"~", "≋"}


def load_grid(map_path: str) -> List[str]:
    with open(map_path, "r", encoding="utf-8") as handle:
        lines = [line.rstrip("\n") for line in handle.readlines()]
    width = max((len(line) for line in lines), default=0)
    return [line.ljust(width) for line in lines]


def get_symbol(grid: List[str], x: int, y: int) -> str:
    if y < 0 or y >= len(grid):
        return ""
    row = grid[y]
    if x < 0 or x >= len(row):
        return ""
    return row[x]


def is_exempt(name: str, region: str = "") -> bool:
    name_lower = name.strip().lower()
    region_lower = region.strip().lower()
    if name_lower == "sunken dominion":
        return True
    if "sea" in name_lower or "ocean" in name_lower:
        return True
    # Arctic/Far North locations on frozen ocean are valid
    if "far north" in region_lower or "arctic" in region_lower:
        return True
    return False


def find_nearest_land(grid: List[str], x: int, y: int, max_radius: int) -> Tuple[int, int, str] | None:
    best = None
    for radius in range(1, max_radius + 1):
        for dy in range(-radius, radius + 1):
            for dx in range(-radius, radius + 1):
                nx = x + dx
                ny = y + dy
                symbol = get_symbol(grid, nx, ny)
                if not symbol or symbol in WATER_SYMBOLS:
                    continue
                dist = abs(dx) + abs(dy)
                if best is None or dist < best[0]:
                    best = (dist, nx, ny, symbol)
        if best is not None:
            break
    if best is None:
        return None
    return best[1], best[2], best[3]


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate location placement against map terrain")
    parser.add_argument(
        "--map",
        default="aevoria_map_viewable.txt",
        help="ASCII map path (default: aevoria_map_viewable.txt)",
    )
    parser.add_argument(
        "--labels",
        default="aevoria_key_locations.csv",
        help="Locations CSV path (default: aevoria_key_locations.csv)",
    )
    parser.add_argument(
        "--max-radius",
        type=int,
        default=6,
        help="Max radius to search for nearest non-water tile",
    )
    args = parser.parse_args()

    if not os.path.exists(args.map):
        raise FileNotFoundError(f"Map file not found: {args.map}")
    if not os.path.exists(args.labels):
        raise FileNotFoundError(f"Labels file not found: {args.labels}")

    grid = load_grid(args.map)

    total = 0
    flagged = []

    with open(args.labels, "r", encoding="utf-8-sig") as handle:
        reader = csv.DictReader(handle)
        for row in reader:
            name = (row.get("Location") or row.get("Name") or "").strip()
            if not name:
                continue
            region = (row.get("Region") or "").strip()
            try:
                x = int(row.get("X") or row.get("x") or 0)
                y = int(row.get("Y") or row.get("y") or 0)
            except ValueError:
                continue
            total += 1
            symbol = get_symbol(grid, x, y)
            if not symbol:
                flagged.append((name, x, y, "OUT_OF_BOUNDS", None))
                continue
            if symbol in WATER_SYMBOLS and not is_exempt(name, region):
                suggestion = find_nearest_land(grid, x, y, args.max_radius)
                flagged.append((name, x, y, symbol, suggestion))

    print(f"Total locations checked: {total}")
    print(f"Flagged locations: {len(flagged)}")
    if not flagged:
        return 0

    print("\nFlagged:")
    for name, x, y, symbol, suggestion in flagged:
        if suggestion is None:
            suggestion_text = "(no land found within radius)"
        else:
            sx, sy, ss = suggestion
            suggestion_text = f"suggest {sx},{sy} (symbol '{ss}')"
        print(f"- {name}: {x},{y} on '{symbol}' -> {suggestion_text}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

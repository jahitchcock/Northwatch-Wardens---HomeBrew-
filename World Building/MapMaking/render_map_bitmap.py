import argparse
import csv
from PIL import Image, ImageDraw, ImageFont

# Color palette mapping for ASCII symbols
PALETTE = {
    "~": (31, 119, 180, 255),       # Ocean / Sea
    "≈": (75, 163, 199, 255),       # River / Flowing Water
    "≋": (11, 61, 145, 255),        # Deep Ocean
    "❄": (215, 249, 251, 255),      # Ice / Arctic
    ".": (159, 210, 126, 255),      # Grassland / Plains
    ",": (205, 220, 57, 255),       # Farmland
    "♣": (46, 125, 50, 255),        # Dense Forest
    "♠": (56, 142, 60, 255),        # Pine Forest
    "^": (158, 158, 158, 255),      # Mountains
    "░": (214, 162, 63, 255),       # Rocky Coast
    "▓": (139, 0, 0, 255),          # Volcanic Terrain
    "█": (211, 47, 47, 255),        # Major City / Capital
    "▒": (245, 124, 0, 255),        # Outlaw City / Special Settlement
    "†": (106, 27, 154, 255),       # Temple / Holy Site
    "◊": (121, 85, 72, 255),        # Ruins / Ancient Site
    "═": (66, 66, 66, 255),         # Major Highway
    "─": (117, 117, 117, 255),      # Road / Path
}

# Marker color per location type
TYPE_COLOR = {
    "Major City": (255, 255, 255, 255),
    "Town": (255, 235, 59, 255),
    "Outlaw City": (255, 152, 0, 255),
    "Holy Site": (156, 39, 176, 255),
    "Ruins": (121, 85, 72, 255),
    "Forest": (76, 175, 80, 255),
    "Landmark": (33, 150, 243, 255),
}

def render_ascii_to_bitmap(input_path: str, scale: int = 2, background=(0, 0, 0, 255)) -> Image.Image:
    # Read ASCII map
    with open(input_path, "r", encoding="utf-8") as f:
        lines = [line.rstrip("\n") for line in f.readlines()]

    height = len(lines)
    width = max(len(line) for line in lines) if lines else 0
    if width == 0 or height == 0:
        raise ValueError("Empty ASCII map input")

    img = Image.new("RGBA", (width * scale, height * scale), background)
    pixels = img.load()

    for y, line in enumerate(lines):
        # Pad line to fixed width
        line = line.ljust(width)
        for x, ch in enumerate(line):
            color = PALETTE.get(ch)
            if color is None:
                # Ignore ASCII letters/digits and common punctuation (they are labels in source)
                if ch == " " or ch.isalnum() or ch in "'`\".,!?:;()[]{}|/\\":
                    continue  # leave background
                # Otherwise, default to background (avoid magenta noise)
                color = background
            # Fill scaled block
            base_x, base_y = x * scale, y * scale
            for dy in range(scale):
                for dx in range(scale):
                    pixels[base_x + dx, base_y + dy] = color

    return img


def draw_labels(img: Image.Image, labels_csv: str, scale: int, coord_mul: int = 1, font_path: str | None = None, font_size: int | None = None):
    draw = ImageDraw.Draw(img)
    # Fallback to system font if none provided
    font = None
    if font_size is None:
        font_size = max(10, int(6 * scale))
    try:
        if font_path:
            font = ImageFont.truetype(font_path, font_size)
        else:
            # Try common Windows fonts
            for fp in [
                "C:/Windows/Fonts/Consolas.ttf",
                "C:/Windows/Fonts/arial.ttf",
                "C:/Windows/Fonts/segoeui.ttf",
            ]:
                try:
                    font = ImageFont.truetype(fp, font_size)
                    break
                except Exception:
                    continue
    except Exception:
        font = None
    if font is None:
        font = ImageFont.load_default()

    # Read labels CSV
    with open(labels_csv, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            name = row.get("Location") or row.get("Name") or row.get("label") or ""
            try:
                x = int(row.get("X") or row.get("x") or row.get("lon") or 0)
                y = int(row.get("Y") or row.get("y") or row.get("lat") or 0)
            except ValueError:
                continue
            loc_type = (row.get("Type") or row.get("type") or "").strip()

            px = x * coord_mul * scale
            py = y * coord_mul * scale

            # Bounds check
            w, h = img.size
            if not (0 <= px < w and 0 <= py < h):
                continue

            # Draw marker (small circle)
            mc = TYPE_COLOR.get(loc_type, (255, 255, 255, 255))
            r = max(2, int(scale))
            draw.ellipse([(px - r, py - r), (px + r, py + r)], fill=mc, outline=(0, 0, 0, 255))

            # Draw text slightly offset
            tx, ty = px + r + 2, py - r - 2
            # Stroke for readability
            draw.text((tx, ty), name, fill=(255, 255, 255, 255), font=font, stroke_width=1, stroke_fill=(0, 0, 0, 255))


def main():
    parser = argparse.ArgumentParser(description="Render ASCII map to PNG bitmap")
    parser.add_argument("--input", required=True, help="Path to ASCII map file")
    parser.add_argument("--output", required=True, help="Output PNG path")
    parser.add_argument("--scale", type=int, default=2, help="Pixels per ASCII cell (default 2)")
    parser.add_argument("--labels", help="Optional CSV with columns Location,Type,X,Y to overlay labels")
    parser.add_argument("--coord-mul", type=int, default=1, help="Multiply label coordinates to match input grid (e.g., 4 for 1280×1040 when labels are 320×260)")
    parser.add_argument("--font", help="Optional font file path (TTF)")
    parser.add_argument("--font-size", type=int, help="Override font size")
    args = parser.parse_args()

    img = render_ascii_to_bitmap(args.input, scale=args.scale)
    if args.labels:
        draw_labels(img, args.labels, scale=args.scale, coord_mul=args.coord_mul, font_path=args.font, font_size=args.font_size)
    img.save(args.output)


if __name__ == "__main__":
    main()

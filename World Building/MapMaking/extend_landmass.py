#!/usr/bin/env python3
"""Add landmass around Vharoxis by converting nearby water to land/coast."""

import argparse


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", default="aevoria_ascii_map.txt")
    parser.add_argument("--output", default="aevoria_ascii_map.txt")
    parser.add_argument("--center-x", type=int, default=952)
    parser.add_argument("--center-y", type=int, default=552)
    parser.add_argument("--radius", type=int, default=25)
    args = parser.parse_args()

    with open(args.input, "r", encoding="utf-8") as f:
        lines = [line.rstrip("\n") for line in f.readlines()]

    # Ensure all lines are same width
    width = max(len(line) for line in lines)
    lines = [line.ljust(width) for line in lines]

    # Convert water in radius around Vharoxis to land
    for y in range(len(lines)):
        if abs(y - args.center_y) > args.radius:
            continue
        
        row = list(lines[y])
        for x in range(len(row)):
            if abs(x - args.center_x) > args.radius:
                continue
            
            char = row[x]
            if char not in ("~", "≋"):  # Skip if not water
                continue
            
            # Calculate distance from center
            dist = ((x - args.center_x) ** 2 + (y - args.center_y) ** 2) ** 0.5
            
            if dist <= args.radius:
                # Inner = land, outer = rocky coast
                if dist < args.radius * 0.6:
                    row[x] = "."  # Grassland
                else:
                    row[x] = "░"  # Rocky coast
        
        lines[y] = "".join(row)

    with open(args.output, "w", encoding="utf-8", newline="\n") as f:
        for line in lines:
            f.write(line + "\n")

    print(f"Extended landmass around ({args.center_x},{args.center_y}) with radius {args.radius}")


if __name__ == "__main__":
    main()

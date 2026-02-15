#!/usr/bin/env python3
"""Regenerate viewable map by downsampling the full map."""

import argparse


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", default="aevoria_ascii_map.txt")
    parser.add_argument("--output", default="aevoria_map_viewable.txt")
    parser.add_argument("--sample-rate", type=int, default=4)
    args = parser.parse_args()

    with open(args.input, "r", encoding="utf-8") as f:
        lines = [line.rstrip("\n") for line in f.readlines()]

    # Sample every Nth row and column
    sampled = []
    for y in range(0, len(lines), args.sample_rate):
        row = lines[y]
        sampled_row = "".join(row[x] for x in range(0, len(row), args.sample_rate))
        sampled.append(sampled_row)

    with open(args.output, "w", encoding="utf-8", newline="\n") as f:
        for line in sampled:
            f.write(line + "\n")

    print(f"Regenerated viewable map: {len(sampled)} rows x {len(sampled[0]) if sampled else 0} cols")


if __name__ == "__main__":
    main()

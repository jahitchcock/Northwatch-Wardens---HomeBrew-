from __future__ import annotations

from datetime import datetime
from pathlib import Path

PATH = Path(
    r"c:\Users\joshu\OneDrive\Documents\dnd\00 - Campaigns\Northwatch Wardens - (HomeBrew)\Season 1\Northwatch Wardens_ Season One.xml"
)


def main() -> None:
    raw = PATH.read_bytes()
    stamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
    backup = PATH.with_suffix(PATH.suffix + f".bak-{stamp}")
    backup.write_bytes(raw)

    before = raw.count(b"</<combatant>")
    raw = raw.replace(b"</<combatant>", b"<combatant>")
    after = raw.count(b"</<combatant>")

    PATH.write_bytes(raw)

    print(f"Backup created: {backup.name}")
    print(f"Fixed '</<combatant>' occurrences: {before} -> {after}")


if __name__ == "__main__":
    main()

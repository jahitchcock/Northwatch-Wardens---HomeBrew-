from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from pathlib import Path


@dataclass(frozen=True)
class NpcDef:
    uid: str
    label: str
    name: str
    text: str


@dataclass(frozen=True)
class EncounterRoster:
    encounter_uid: str
    npc_uids: tuple[str, ...]


ENC_PATH = Path(
    r"c:\Users\joshu\OneDrive\Documents\dnd\00 - Campaigns\Northwatch Wardens - (HomeBrew)\Season 1\Northwatch Wardens_ Season One.xml"
)

NPC_DEFS: tuple[NpcDef, ...] = (
    NpcDef(
        uid="1129",
        label="Westly",
        name="Human",
        text=(
            "Welton shepherd and local leader. Practical, protective of the village, and quick "
            "to blame himself for losses at the farms."
        ),
    ),
    NpcDef(
        uid="1130",
        label="Tillus Merrion",
        name="Halfling",
        text=(
            "Welton council member (Growers and Buyers' Association). Pragmatist with a sharp "
            "tongue and a deep fear of economic collapse."
        ),
    ),
    NpcDef(
        uid="1131",
        label="Leanor Slatebeard",
        name="Dwarf",
        text=(
            "Welton tracker and hunter. Suspicious of outsiders but respects competence; favors "
            "clear plans and decisive action."
        ),
    ),
    NpcDef(
        uid="1132",
        label="Tulgi Lutan",
        name="Human",
        text=(
            "Palebank healer. Anxious and defensive under pressure, but ultimately wants the sickness "
            "stopped and her family protected."
        ),
    ),
    NpcDef(
        uid="1133",
        label="Urgon",
        name="Dwarf",
        text=(
            "Palebank blacksmith. Sturdy, blunt, and well-liked; his death is the spark that draws the "
            "Wardens into the Frozen Sick investigation."
        ),
    ),
    NpcDef(
        uid="1134",
        label="Finethir Shinebright",
        name="Elf",
        text=(
            "A flamboyant elven mage with an unfortunate polymorphing problem. Dramatic, grateful, "
            "and prone to overpromising."
        ),
    ),
)

# These are the encounters that previously had 0 combatants but benefit from a roster in-app.
ROSTERS: tuple[EncounterRoster, ...] = (
    # Guild ceremony
    EncounterRoster("1013", ("1066", "1067", "1068")),
    # Wolves of Welton planning
    EncounterRoster("1017", ("1129", "1130", "1131", "1069", "1070")),
    # Frozen Sick kickoff
    EncounterRoster("1020", ("1133", "1074", "1132")),
    # Tulgi scene
    EncounterRoster("1022", ("1132", "1088", "1089")),
    # Syrinlya outpost
    EncounterRoster("1028", ("1093",)),
    # Return / resolution
    EncounterRoster("1037", ("1074", "1132", "1093")),
    # Wild Sheep Chase aftermath
    EncounterRoster("1057", ("1134",)),
)


def _ascii(s: str) -> bytes:
    return s.encode("ascii")


def _find_encounter_block(raw: bytes, encounter_uid: str) -> tuple[int, int]:
    token = _ascii(f"<uid>{encounter_uid}</uid>")
    uid_idx = raw.find(token)
    if uid_idx < 0:
        raise RuntimeError(f"Encounter uid {encounter_uid} not found")

    start = raw.rfind(b"<encounter>", 0, uid_idx)
    if start < 0:
        raise RuntimeError(f"Could not find <encounter> start for uid {encounter_uid}")

    end = raw.find(b"</encounter>", uid_idx)
    if end < 0:
        raise RuntimeError(f"Could not find </encounter> end for uid {encounter_uid}")

    end += len(b"</encounter>")
    return start, end


def _has_npc_label(raw: bytes, label: str) -> bool:
    needle = _ascii(f"<label>{label}</label>")
    # Ensure it's in an <npc> block (cheap check: label exists and <npc> before it)
    idx = raw.find(needle)
    if idx < 0:
        return False
    prev_npc = raw.rfind(b"<npc>", 0, idx)
    prev_adv = raw.rfind(b"<adventure>", 0, idx)
    return prev_npc > prev_adv


def _append_npc_before_campaign_end(raw: bytes, npc: NpcDef) -> tuple[bytes, bool]:
    if _has_npc_label(raw, npc.label):
        return raw, False

    insert_at = raw.rfind(b"</campaign>")
    if insert_at < 0:
        raise RuntimeError("Missing </campaign>")

    block = (
        f"<npc><uid>{npc.uid}</uid><label>{npc.label}</label><name>{npc.name}</name>"
        f"<abilities>10,10,10,10,10,10,</abilities><hd>1d8</hd><text>{npc.text}</text></npc>"
    )
    block_b = block.encode("ascii")

    return raw[:insert_at] + block_b + raw[insert_at:], True


def _ensure_combatant(raw: bytes, encounter_uid: str, npc_uid: str) -> tuple[bytes, bool]:
    start, end = _find_encounter_block(raw, encounter_uid)
    block = raw[start:end]

    # Idempotency: skip if already present
    if _ascii(f"<monster><uid>{npc_uid}</uid></monster>") in block:
        return raw, False

    insert_at = block.rfind(b"</encounter>")
    if insert_at < 0:
        raise RuntimeError(f"Encounter uid {encounter_uid} missing </encounter>")

    combatant = f"<combatant><hidden>0</hidden><monster><uid>{npc_uid}</uid></monster></combatant>"
    combatant_b = combatant.encode("ascii")

    block2 = block[:insert_at] + combatant_b + block[insert_at:]
    return raw[:start] + block2 + raw[end:], True


def main() -> None:
    raw = ENC_PATH.read_bytes()

    stamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
    backup = ENC_PATH.with_suffix(ENC_PATH.suffix + f".bak-{stamp}")
    backup.write_bytes(raw)

    npc_added = []
    for npc in NPC_DEFS:
        raw, added = _append_npc_before_campaign_end(raw, npc)
        if added:
            npc_added.append(npc.label)

    combat_added = []
    for roster in ROSTERS:
        for npc_uid in roster.npc_uids:
            raw, added = _ensure_combatant(raw, roster.encounter_uid, npc_uid)
            if added:
                combat_added.append((roster.encounter_uid, npc_uid))

    ENC_PATH.write_bytes(raw)

    print(f"Backup created: {backup.name}")
    print(f"NPCs added: {len(npc_added)} -> {npc_added}")
    print(f"Combatants added: {len(combat_added)}")
    if combat_added:
        print("Combatants sample:", combat_added[:10])


if __name__ == "__main__":
    main()

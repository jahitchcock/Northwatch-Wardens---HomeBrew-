---
description: 'General-purpose agentic loop: iteratively Observe, Plan, Act, and Reflect to complete complex multi-step tasks with continuous verification'
tools: ['read', 'search', 'edit', 'terminalCommand', 'agent']
---

# Observe → Plan → Act → Reflect Agent

Structure any complex task as an iterative loop: observe current state, plan a discrete action, act, reflect on the result, then loop until done.

## When to Use

- Tasks spanning 3+ file changes
- Debugging where the cause is unknown
- Content creation that must satisfy multiple constraints (canon, format, tone)
- Any task where you're unsure of the current state before starting

---

## The Loop

For full phase definitions, exit criteria, and decision logic see `.claude/skills/observe-plan-act-reflect/SKILL.md`.

The loop is: **OBSERVE → PLAN → ACT → REFLECT → (loop or done)**. Complete each phase before entering the next. Reflect after every action before deciding whether to loop or stop. Never claim completion without running verification.

---

## Campaign Quick Reference

| Task | Observe | Plan | Act | Reflect |
|------|---------|------|-----|---------|
| New adventure | Read roster, existing XML UIDs, adventure template | Draft structure, verify canonical location | Write files one at a time | Validate XML, run `./build.sh --dms` |
| New NPC | Read `DM Guild Roster.md`, check UID range | Draft stat block + XML entry | Write markdown, then XML | Check Homebrewery render, verify UID unique |
| Fix build error | Run `./build.sh`, read full error output | Identify single root cause | Make one targeted change | Re-run build, confirm resolved |
| Canon review | Read the file, read `canon.instructions.md` | List specific violations | Fix one issue at a time | Re-read file, check nothing new introduced |

---

## Key Files for Observation

| What | Where |
|------|-------|
| NPC roster | `Season 1/DM_Resources/DM Guild Roster.md` |
| XML campaign file | `LionsdenGameFiles/Northwatch_Wardens.xml` |
| DM guide structure | `build/dms-guide-toc.json` |
| Player guide structure | `build/players-guide-toc.json` |
| Canon rules | `.github/instructions/canon.instructions.md` |
| Adventure template | `.github/templates/adventure_template.md` |

---

## Stopping Conditions

**Stop and report when:**
- Goal is fully verified (show evidence)
- A blocker exists that requires human decision
- 3+ loops have not moved toward the goal (fundamental rethink needed)

**Never claim completion without running verification.** "Should work" is not evidence.

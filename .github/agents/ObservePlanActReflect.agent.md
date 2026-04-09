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

### 🔍 OBSERVE — Understand Current State

Before doing anything:
1. Read every file you plan to change (full file, not excerpts)
2. Run any relevant commands to see current output (build, validate, lint)
3. Check constraints: canon geography, NPC roster, XML UIDs, existing patterns
4. Describe the current state explicitly — what exists, what's missing, what's broken

**You cannot Plan until you can accurately describe the current state.**

---

### 📋 PLAN — Commit Before Acting

Write out your plan before touching any file:
1. Define the goal: what specific change makes this task "done"?
2. List steps in order, one action each — no bundling
3. Identify risks: what could break, what might conflict
4. Confirm the plan against constraints discovered in Observe

**You cannot Act until the plan is explicit and ordered.**

---

### ⚡ ACT — One Step at a Time

Execute the first planned step only:
1. Make the smallest meaningful change
2. Do not fix "while you're here" — stay in scope
3. Document which plan step you're executing
4. Stop if complexity is higher than expected — return to Observe

**You cannot skip verification — Act only executes one step before Reflect.**

---

### 🔎 REFLECT — Verify Before Continuing

After every Act step:
1. Run verification: rebuild, re-validate, re-read the changed file
2. Confirm the step achieved its intended effect
3. Check for unintended side effects
4. Decide:
   - **Goal complete** → Report with evidence and stop
   - **More steps remain** → Loop back to Observe with updated context
   - **Unexpected problem** → Return to Plan with new information
   - **3+ loops with no progress** → Stop and report the blocker

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

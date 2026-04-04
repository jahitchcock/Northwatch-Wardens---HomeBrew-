---
description: 'Structured 4-phase debugging investigation — root cause analysis before proposing any fix'
---

# Debug

Systematic debugging protocol. Use when encountering any bug, test failure, or unexpected behavior. **Do NOT propose fixes before completing the investigation.**

## Phase 1 — Reproduce

1. Get the exact error message, stack trace, or unexpected behavior description
2. Identify the minimal reproduction steps
3. Confirm you can reliably trigger the issue

**Output:**
```
REPRODUCTION:
- Steps: [exact reproduction steps]
- Expected: [what should happen]
- Actual: [what actually happens]
- Consistent: [yes/no — can you reproduce every time?]
```

## Phase 2 — Hypothesize

Generate at least 3 candidate root causes. For each:
- What evidence supports this hypothesis?
- What evidence would disprove it?
- How would you test it?

```
HYPOTHESIS 1: [description]
  Evidence for: [what supports this]
  Evidence against: [what contradicts]
  Test: [how to confirm/refute]
```

Rank hypotheses by likelihood. Start testing from most likely.

## Phase 3 — Isolate

Work through hypotheses systematically:
1. Add targeted diagnostic output (logging, print statements, breakpoints)
2. Test ONE hypothesis at a time — change ONE variable
3. Record results for each test
4. If a hypothesis is disproven, move to the next

**Do NOT skip this phase.** The most common debugging failure is jumping to "obvious" fixes without confirming the actual root cause.

## Phase 4 — Fix

Only after root cause is confirmed:
1. Propose the minimal fix that addresses the root cause
2. Explain why this fix works (connect to confirmed root cause)
3. Identify potential side effects
4. Write a test that would catch regression
5. Verify the fix resolves the original reproduction case

## Anti-Patterns

- **"Shotgun debugging"** — making multiple changes hoping one works
- **"It's probably X"** — fixing without confirming the hypothesis
- **"Works on my machine"** — not checking environment differences
- **"Just restart it"** — masking the root cause

---
description: 'Verification protocol — run checks, gather evidence, confirm completion before claiming done'
---

# Verify Completion

Use before claiming any work is complete, fixed, or passing. **Evidence before assertions. Always.**

## The Rule

You are FORBIDDEN from saying any of these until you have run verification and shown the output:
- "Done"
- "Fixed"
- "Tests pass"
- "Should work now"
- "Everything looks good"

## Verification Steps

### 1. Identify What to Verify
- What was the original requirement or bug?
- What specific behavior should now be true?
- What commands prove it works?

### 2. Run Verification Commands
Execute the actual commands. Show real output. Examples:
- `node build.js` — does it build without errors?
- `git diff --stat` — do the changed files match what you intended?
- `python -m pytest` — do tests pass?
- Manual inspection of generated output

### 3. Evidence Collection
For each claim you want to make, show:
```
CLAIM: [what you're asserting]
EVIDENCE: [command run + output]
VERDICT: [CONFIRMED / FAILED / PARTIAL]
```

### 4. Edge Case Check
- Did you test the happy path AND at least one edge case?
- Did you verify nothing else broke? (regression check)

### 5. Completion Declaration
Only after ALL claims are CONFIRMED:
```
VERIFICATION COMPLETE:
- [x] Primary requirement verified
- [x] No regressions detected
- [x] Edge cases checked
- [x] Build/tests passing
```

## Common Traps
- **"I made the change so it must work"** — changes can have typos, wrong files, or logic errors
- **"Tests passed before"** — your change may have broken something unrelated
- **"It compiles therefore it works"** — compilation ≠ correctness

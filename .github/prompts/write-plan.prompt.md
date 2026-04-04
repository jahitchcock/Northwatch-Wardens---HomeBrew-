---
description: 'Write a comprehensive implementation plan with bite-sized tasks before touching code'
---

# Write Implementation Plan

Create a detailed implementation plan assuming the engineer has zero context for the codebase. Document everything: which files to touch, code samples, testing strategy, how to verify.

## Principles

- **DRY** — Don't repeat yourself
- **YAGNI** — You ain't gonna need it
- **TDD** — Tests before implementation
- **Frequent commits** — Small, atomic changes

## Plan Structure

### Header (required)

```markdown
# [Feature Name] Implementation Plan

**Goal:** [One sentence describing what this builds]
**Architecture:** [2–3 sentences about approach]
**Tech Stack:** [Key technologies/libraries]
```

### File Map

Before defining tasks, map out all files that will be created or modified:
- Design units with clear boundaries and focused responsibilities
- Files that change together should live together
- Follow existing codebase patterns

### Tasks

Each task is a self-contained unit with bite-sized steps (2–5 minutes each):

```markdown
### Task N: [Component Name]

**Files:**
- Create: `exact/path/to/file.py`
- Modify: `exact/path/to/existing.py`
- Test: `tests/path/to/test.py`

- [ ] Step 1: Write the failing test
- [ ] Step 2: Run to confirm it fails
- [ ] Step 3: Implement minimal code to pass
- [ ] Step 4: Run tests to confirm green
- [ ] Step 5: Commit
```

## Scope Check

If the spec covers multiple independent subsystems, suggest breaking into separate plans — one per subsystem. Each plan should produce working, testable software on its own.

## Save Location

Save to: `docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md`

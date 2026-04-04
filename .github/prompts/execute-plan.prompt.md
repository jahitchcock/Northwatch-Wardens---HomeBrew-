---
description: 'Load and execute an existing implementation plan with review checkpoints between tasks'
---

# Execute Plan

Load an existing implementation plan and execute it task by task with verification at each step.

## Step 1 — Load the Plan

Read the plan file from `docs/superpowers/plans/` (or wherever the user specifies). Parse out:
- All tasks and their subtasks
- File paths to create/modify
- Testing requirements
- Dependencies between tasks

## Step 2 — Review Before Starting

Present a summary:
- Total tasks and estimated scope
- Any concerns, ambiguities, or outdated assumptions
- Proposed execution order

Get user approval before proceeding.

## Step 3 — Execute Tasks

For each task:

### Before
- Mark task as **in-progress**
- State what you're about to do
- Confirm prerequisites from previous tasks are met

### During
- Follow the plan's steps exactly
- If the plan says "write test first" → write test first
- If you discover the plan is wrong or outdated, **STOP and discuss** — don't silently deviate

### After Each Task
- Run any specified verification commands
- Show test results / build output
- Mark task as **complete** only after verification passes
- Brief checkpoint: "Task N complete. Moving to Task N+1."

## Step 4 — Plan Deviations

If you need to deviate from the plan:
1. Explain what's different and why
2. Propose the alternative
3. Wait for user approval before proceeding

## Step 5 — Completion

After all tasks:
- Run full verification suite
- Generate summary of what was built
- Note any remaining follow-up items

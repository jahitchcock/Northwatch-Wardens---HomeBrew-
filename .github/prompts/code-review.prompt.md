---
description: 'Dispatch a structured code review with git SHAs, change summary, and deviation analysis'
---

# Code Review

Perform a thorough code review of recent changes. Use before merging branches, after implementing features, or when you want verification that work meets requirements.

## Step 1 — Gather Context

1. Run `git log --oneline -20` to see recent commits
2. Identify the commit range to review (ask user if unclear)
3. Run `git diff <base>..<head> --stat` for change overview
4. Read the relevant spec, plan, or issue for requirements

## Step 2 — Change Summary

For each modified file:
- What changed and why
- Whether the change aligns with the spec/plan/issue

## Step 3 — Multi-Lens Review

### Correctness
- Does the code do what the spec requires?
- Are edge cases handled?
- Are there off-by-one errors, race conditions, or logic gaps?

### Quality
- Does the code follow existing patterns in the codebase?
- Are there unnecessary abstractions or missing ones?
- Is naming clear and consistent?

### Security
- Input validation at system boundaries?
- No hardcoded secrets or credentials?
- No injection vulnerabilities?

### Testing
- Do tests cover the new behavior?
- Are tests testing behavior (not implementation details)?
- Would a regression be caught?

## Step 4 — Deviations & Gaps

List anything that:
- Was in the spec but not implemented
- Was implemented but not in the spec
- Changed behavior of existing functionality

## Step 5 — Verdict

Rate: **APPROVE**, **REQUEST CHANGES**, or **NEEDS DISCUSSION**

Provide:
- Summary of findings
- Blocking issues (if any)
- Non-blocking suggestions

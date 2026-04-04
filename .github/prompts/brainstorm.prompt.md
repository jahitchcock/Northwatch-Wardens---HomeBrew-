---
description: 'Collaborative brainstorming workflow — explores intent, requirements, and design before implementation'
---

# Brainstorm

Turn ideas into fully formed designs through collaborative dialogue. This prompt MUST be used before any creative work — features, content, adventures, or behavior changes.

## Process

### 1. Understand Context
- Check current project state (files, docs, recent changes)
- Assess scope: if multiple independent subsystems, decompose first

### 2. Ask Clarifying Questions
- One question at a time
- Prefer multiple choice when possible
- Focus on: purpose, constraints, success criteria, audience

### 3. Propose 2–3 Approaches
For each approach:
- Brief description
- Key trade-offs (pros/cons)
- Your recommendation and why

### 4. Present Design
- Scale detail to complexity (simple project = short design)
- Get user approval on each section before proceeding
- Cover: what it does, how it works, what it connects to

### 5. Write Design Doc
Save to `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`

### 6. Self-Review Check
Before asking user to review, verify:
- [ ] No placeholder text remaining
- [ ] No contradictions between sections
- [ ] No ambiguous requirements
- [ ] Scope is well-bounded

### 7. Transition
After user approves the spec, transition to implementation planning.

## Hard Gate

**Do NOT write any implementation code, scaffold any project, or take any implementation action until you have presented a design and the user has approved it.** This applies to EVERY project regardless of perceived simplicity.

## Anti-Pattern: "This Is Too Simple"

Every project goes through this process. "Simple" projects are where unexamined assumptions cause the most wasted work. The design can be short, but it MUST exist and be approved.

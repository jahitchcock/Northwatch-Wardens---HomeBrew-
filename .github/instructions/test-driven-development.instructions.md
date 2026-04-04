---
applyTo: '**/*.{js,ts,py,sh}'
description: 'Always-on coding practice: write tests before implementation code'
---

# Test-Driven Development

When implementing features or fixing bugs in code files:

1. **Write the failing test first** — define expected behavior before writing code
2. **Run the test** — confirm it fails for the right reason
3. **Implement minimal code** — just enough to make the test pass
4. **Run again** — confirm green
5. **Refactor** — clean up with confidence, tests catch regressions

Do not write implementation code without a corresponding test unless the user explicitly opts out.

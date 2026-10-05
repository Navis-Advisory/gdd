---
argument-hint: "[alternative framing, e.g. 'build it around the risk case']"
arguments: [framing]
description: Synthesize surviving findings into a pyramid-principle storyline
allowed-tools: Read, Write, Edit, Grep, Agent, AskUserQuestion
---

<objective>
Synthesis. Build the deliverable's storyline from findings that survived
triangulation and red-team: a governing thought (the answer), a key line
of 3–5 supporting claims, and supports beneath each — every support
traceable to a numbered LEDGER.md finding, every number carrying its
citation. Findings marked CONTESTED cannot carry key-line claims.
</objective>

<execution_context>
@RESOURCE_ROOT/gdd-core/references/engagement-root.md
@RESOURCE_ROOT/gdd-core/workflows/storyline.md
</execution_context>

<context>
Requires a passing (or explicitly waived) triangulation gate. ARGUMENTS
may request an alternative framing ("build it around the risk case").
</context>

<process>
1. Spawn `gdd-storyliner` in draft mode (the engagement root — absolute
   path ENGAGEMENT_ROOT — LEDGER.md, the hypothesis tree, both
   reports) to propose only the governing thought.
2. Check the governing thought with the user directly before expanding —
   the answer is the client's decision support, not a surprise.
3. On approval, spawn `gdd-storyliner` in build mode with the approved
   governing thought to write .diligence/reports/STORYLINE.md with the
   finding-ID trace map; update STATE.md.
</process>

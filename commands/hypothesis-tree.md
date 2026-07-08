---
name: hypothesis-tree
description: Decompose the investment thesis into a MECE hypothesis tree and per-module briefs
argument-hint: "[thesis angle to prioritize, optional]"
allowed-tools: Read, Write, Edit, Agent, AskUserQuestion
---

<objective>
Turn the engagement's investment thesis into a testable, MECE hypothesis
tree: what must be true for the thesis to hold, decomposed into the
standard diligence modules (market, competition, customers, company/moat,
risks). Write one module brief per branch so modules can execute in
parallel with fresh context.
</objective>

<execution_context>
@${CLAUDE_PLUGIN_ROOT}/gdd-core/workflows/hypothesis-tree.md
</execution_context>

<context>
Requires a scoped engagement (`.diligence/ENGAGEMENT.md`). $ARGUMENTS may
narrow to a single branch to (re)build.
</context>

<process>
1. Spawn `gdd-planner` per the workflow.
2. Planner reads ENGAGEMENT.md + TAXONOMY.md, drafts the tree, and checks
   MECE-ness against the locked segment definitions.
3. Each leaf hypothesis gets: the claim, what evidence would confirm or
   kill it, and which module owns it.
4. Write `.diligence/modules/<name>/BRIEF.md` per module from the template; register
   the tree in STATE.md.
5. Suggest `/gdd:workplan` next.
</process>

---
description: Decompose the investment thesis into a MECE hypothesis tree and per-module briefs
argument-hint: "[thesis angle to prioritize, optional]"
arguments: [angle]
allowed-tools: Read, Write, Edit, Glob, Bash, Agent, AskUserQuestion
---

<objective>
Turn the engagement's investment thesis into a testable, MECE hypothesis
tree: what must be true for the thesis to hold, decomposed into the
standard diligence modules (market, competition, customers, company/moat,
risks). Write briefs for modules with thesis leaves or active SOW questions,
including descriptive work with no thesis leaf. Research may use fresh
contexts; shared evidence promotion stays serial.
</objective>

<execution_context>
@RESOURCE_ROOT/gdd-core/references/engagement-root.md
@RESOURCE_ROOT/gdd-core/references/sow-register.md
@RESOURCE_ROOT/gdd-core/workflows/hypothesis-tree.md
</execution_context>

<context>
Requires a scoped engagement (`.diligence/ENGAGEMENT.md`). ARGUMENTS may
narrow to a single branch to (re)build.
</context>

<process>
1. Select file-access or proposal-only planner mode per the workflow/runtime
   contract, then spawn gdd-planner with the absolute ENGAGEMENT_ROOT. In
   proposal-only mode supply current inputs/templates in the conversation after
   approved parent reads; the planner uses no tools and saves nothing.
2. Planner uses ENGAGEMENT.md, TAXONOMY.md and current QUESTIONS.md if present
   to draft the tree and check MECE-ness against the locked definitions.
3. Each leaf hypothesis gets: the claim, what evidence would confirm or
   kill it, and which module owns it.
4. Prepare a brief for every module owning leaves or active Q-ids, with criterion,
   analysis, evidence instrument and dependency/blocker mappings. Q-only modules
   use `hypotheses: 0` in state.json; STATE.md projects that existing module state.
   TREE.md remains the thesis tree, not a replacement question register.
5. In proposal-only mode show the concrete tree/briefs, then after acceptance
   recheck input freshness, save through approved parent tools and verify the
   artifact/state readback. Refused or unclear access remains a stop.
   After acceptance and verified saves, checkpoint exact changed files under the shared
   Local Git checkpoints contract; report the SHA or limitation. Suggest
   `/gdd:workplan` next.
</process>

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
@${CLAUDE_PLUGIN_ROOT}/gdd-core/references/engagement-root.md
@${CLAUDE_PLUGIN_ROOT}/gdd-core/references/sow-register.md
@${CLAUDE_PLUGIN_ROOT}/gdd-core/workflows/hypothesis-tree.md
</execution_context>

<context>
Requires a scoped engagement (`.diligence/ENGAGEMENT.md`). $ARGUMENTS may
narrow to a single branch to (re)build.
</context>

<process>
1. Spawn `gdd-planner` per the workflow, passing the engagement root
   (resolved absolute path ENGAGEMENT_ROOT) in the spawn prompt.
2. Planner reads ENGAGEMENT.md, TAXONOMY.md and current QUESTIONS.md if present, drafts the tree, and checks
   MECE-ness against the locked segment definitions.
3. Each leaf hypothesis gets: the claim, what evidence would confirm or
   kill it, and which module owns it.
4. Write a brief for every module owning leaves or active Q-ids, with criterion,
   analysis, evidence instrument and dependency/blocker mappings. Q-only modules
   use `hypotheses: 0` in state.json; STATE.md projects that existing module state.
   TREE.md remains the thesis tree, not a replacement question register.
5. After acceptance, checkpoint exact changed planning files under the shared
   Local Git checkpoints contract; report the SHA or limitation. Suggest
   `/gdd:workplan` next.
</process>

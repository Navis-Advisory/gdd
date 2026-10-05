---
argument-hint: "[plan adjustment, e.g. 'compress to 2 weeks']"
arguments: [adjustment]
description: Lay the modules across the engagement timeline as a dependency-ordered workplan
allowed-tools: Read, Write, Edit, Glob, Bash, Agent, AskUserQuestion
---

<objective>
Produce `.diligence/WORKPLAN.md`: modules × weeks against the engagement
deadline, dependency-ordered (market sizing before competitive share math;
scoping before everything), with explicit review checkpoints (interim
readout, IC pre-read, final readout).
</objective>

<execution_context>
@${CLAUDE_PLUGIN_ROOT}/gdd-core/references/engagement-root.md
@${CLAUDE_PLUGIN_ROOT}/gdd-core/references/sow-register.md
@${CLAUDE_PLUGIN_ROOT}/gdd-core/workflows/workplan.md
</execution_context>

<context>
Requires module briefs from /gdd:hypothesis-tree. $ARGUMENTS may adjust an
existing plan ("compress to 2 weeks", "move customers module earlier").
</context>

<process>
1. Read ENGAGEMENT.md (deadline), module briefs, current QUESTIONS.md if present,
   STATE.md and state.json. Schedule Q-only modules as well as hypothesis work.
2. Order modules by dependency, then fit to the timeline; flag anything
   that does not fit rather than silently thinning scope.
3. Show the proposed plan/diff before writing and confirm it per the workflow.
   Then write `.diligence/WORKPLAN.md` with each active Q-id's analysis, scheduled
   output or explicit dependency/blocker. Update STATE.md Position/session log;
   preserve existing module/question statuses and evidence.
4. After acceptance, the orchestrator follows the shared Local Git checkpoints
   contract and reports the actual SHA or limitation.
</process>

---
argument-hint: "[plan adjustment, e.g. 'compress to 2 weeks']"
arguments: [adjustment]
description: Lay the modules across the engagement timeline as a dependency-ordered workplan
allowed-tools: Read, Write, Edit, Agent, AskUserQuestion
---

<objective>
Produce `.diligence/WORKPLAN.md`: modules × weeks against the engagement
deadline, dependency-ordered (market sizing before competitive share math;
scoping before everything), with explicit review checkpoints (interim
readout, IC pre-read, final readout).
</objective>

<execution_context>
@${CLAUDE_PLUGIN_ROOT}/gdd-core/workflows/workplan.md
</execution_context>

<context>
Requires module briefs from /gdd:hypothesis-tree. $ARGUMENTS may adjust an
existing plan ("compress to 2 weeks", "move customers module earlier").
</context>

<process>
1. Read ENGAGEMENT.md (deadline), module briefs, and STATE.md.
2. Order modules by dependency, then fit to the timeline; flag anything
   that does not fit rather than silently thinning scope.
3. Write `.diligence/WORKPLAN.md` from the template; update STATE.md.
</process>

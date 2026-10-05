---
description: Choose the right first GDD action for this folder (new deal vs resume vs tour)
allowed-tools: Read, Glob
---

<objective>
Route the user to the right first action for the selected deal folder. Never
modifies files — it only inspects and recommends.
</objective>

<execution_context>
@${CLAUDE_PLUGIN_ROOT}/gdd-core/references/engagement-root.md
@${CLAUDE_PLUGIN_ROOT}/gdd-core/references/sow-register.md
@${CLAUDE_PLUGIN_ROOT}/gdd-core/workflows/start.md
</execution_context>

<process>
1. Classify ENGAGEMENT_ROOT using the shared SOW register contract.
2. For an absent root, recommend `/gdd:ingest-sow` when an SOW is supplied
   or `/gdd:scope-deal` for interview intake. For source-only incomplete intake,
   report the missing register and recommend finishing `/gdd:ingest-sow`.
3. For staged intake, summarize QUESTIONS.md and any handoff; route per the
   workflow. For a full engagement, read STATE.md and recommend `/gdd:resume-work`.
4. Report malformed or unsupported state precisely. Never write or repair.
</process>

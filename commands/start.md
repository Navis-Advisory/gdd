---
description: Choose the right first GDD action for this folder (new deal vs resume vs tour)
allowed-tools: Read, Glob
---

<objective>
Route the user to the right first action for the current folder. Never
modifies files — it only inspects and recommends.
</objective>

<execution_context>
@${CLAUDE_PLUGIN_ROOT}/gdd-core/workflows/start.md
</execution_context>

<process>
1. Check for a `.diligence/` directory in the current folder.
2. If absent: this folder has no engagement. Recommend `/gdd:scope-deal`
   to start one, or `/gdd:tour` for a read-only walkthrough first.
3. If present: read `.diligence/STATE.md` and summarize the position, then
   recommend `/gdd:resume-work`.
4. If `.diligence/` exists but is malformed or empty, say exactly what is
   missing rather than guessing.
</process>

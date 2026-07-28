---
description: Reload engagement state and continue where the last session stopped
allowed-tools: Read, Glob, Edit
---

<objective>
Session continuity. Reload the engagement from `.diligence/` — STATE.md
position, workplan status, gate results, open questions — summarize where
things stand in a few sentences, and recommend the single next command.
</objective>

<execution_context>
@${CLAUDE_PLUGIN_ROOT}/gdd-core/workflows/resume-work.md
</execution_context>

<process>
1. Read STATE.md first; then WORKPLAN.md and the newest report if any.
2. Summarize: engagement, deadline, modules done/in-flight/blocked, last
   session's handoff note.
3. Recommend exactly one next action. Do not start it unprompted.
4. If state files disagree (e.g. STATE.md stale vs module findings),
   report the discrepancy explicitly instead of picking a side.
</process>

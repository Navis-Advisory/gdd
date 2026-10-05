---
description: Read saved intake or engagement state and recommend the next action
allowed-tools: Read, Glob
---

<objective>
Read-only session continuity. Reload the staged register or full engagement
from ENGAGEMENT_ROOT, summarize the saved handoff and blockers, and recommend
one next command. Preserve all files, including the handoff on confirmed resume.
</objective>

<execution_context>
@${CLAUDE_PLUGIN_ROOT}/gdd-core/references/engagement-root.md
@${CLAUDE_PLUGIN_ROOT}/gdd-core/references/sow-register.md
@${CLAUDE_PLUGIN_ROOT}/gdd-core/workflows/resume-work.md
</execution_context>

<process>
Any host-approved shell access in this command is for read-only boundary metadata, not writes
or Git. Host permissions remain authoritative.

0. Complete the root contract's mandatory metadata preflight before inventory
   or content access. If blocked, report the exact check and return without
   engagement reads/writes.
1. Classify the root with the shared contract; report absent, incomplete,
   malformed or unsupported state and return without repair.
2. For staged intake, summarize QUESTIONS.md coverage, criteria and intake
   handoff, recommend one next command and return immediately.
3. For a full engagement, read STATE.md/state.json, QUESTIONS.md and
   WORKPLAN.md if present, and the newest report if any. Summarize where work
   stopped, open decisions and blockers; report discrepancies without repair.
4. Recommend exactly one next action. Do not start it or mutate any file.
</process>

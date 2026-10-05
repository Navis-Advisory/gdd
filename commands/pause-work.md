---
description: Save an intake or engagement handoff before stepping away
allowed-tools: Read, Write, Edit, Glob
---

<objective>
Clean pause. Capture the stopping point, in-flight work, pending decisions
and next step in the existing staged register or full engagement state, so
/gdd:resume-work can restore context without creating partial core state.
</objective>

<execution_context>
@${CLAUDE_PLUGIN_ROOT}/gdd-core/references/engagement-root.md
@${CLAUDE_PLUGIN_ROOT}/gdd-core/references/runtime-contract.md
@${CLAUDE_PLUGIN_ROOT}/gdd-core/references/sow-register.md
@${CLAUDE_PLUGIN_ROOT}/gdd-core/workflows/pause-work.md
</execution_context>

<process>
Any host-approved shell access in this command is for read-only boundary metadata, not writes
or Git. Host permissions remain authoritative.

Follow the loaded pause-work workflow in order. Its visible draft is a separate
assistant message before the first Edit/Write call, including any writer-stamp
change. A tool payload does not display that draft. Existing save authorization
allows proceeding immediately after the message; it does not skip the message.
Use the workflow's staged/full destination and preservation rules, then read back
and report the observed result. A skipped preview or failed check is an incomplete
pause to disclose, not an event to claim after saving.
</process>

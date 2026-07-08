---
name: pause-work
description: Write an explicit handoff into STATE.md before stepping away mid-module
allowed-tools: Read, Write, Edit
---

<objective>
Clean pause. Capture exactly where work stopped — module, analysis in
flight, decisions pending, next concrete step — into STATE.md's handoff
section so /gdd:resume-work can restore context in a fresh session without
re-deriving anything.
</objective>

<execution_context>
@${CLAUDE_PLUGIN_ROOT}/gdd-core/workflows/pause-work.md
</execution_context>

<process>
1. Summarize the current session's progress from the conversation and
   modified artifacts.
2. Write the handoff block in STATE.md (template section "Handoff"):
   position, in-flight work, open decisions, next step.
3. Confirm the handoff text to the user before ending.
</process>

---
description: Show SOW coverage, reconcile evidence-linked question status, or amend scope while preserving question IDs
argument-hint: "[optional amendment or status update]"
arguments: [change]
allowed-tools: Read, Write, Edit, Glob, Bash, AskUserQuestion
---

<execution_context>
@RESOURCE_ROOT/gdd-core/references/engagement-root.md
@RESOURCE_ROOT/gdd-core/workflows/sow-status.md
</execution_context>

<process>
With no change requested, read QUESTIONS.md and report coverage without
writing. With a requested change (ARGUMENTS), follow the amendment and
evidence rules in the workflow. Keep updates serial and checkpoint only the
files changed for this engagement.
</process>

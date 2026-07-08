---
name: help
description: Show the GDD command index and where each command fits in a diligence engagement
argument-hint: "[command name for detail]"
allowed-tools: Read
---

<objective>
Print a compact, accurate index of the installed GDD commands, grouped by
where they sit in an engagement. With an argument, show that command's
detail (purpose, inputs, artifacts written) instead.
</objective>

<execution_context>
@${CLAUDE_PLUGIN_ROOT}/gdd-core/workflows/help.md
</execution_context>

<context>
Requested command: $ARGUMENTS
</context>

<process>
1. Read the workflow file above; it contains the canonical command index.
2. If $ARGUMENTS names a command, print its detail block only.
3. Otherwise print the grouped index, then the startup ladder:
   help → start → tour → scope-deal → resume-work.
4. Read-only: write no files.
</process>

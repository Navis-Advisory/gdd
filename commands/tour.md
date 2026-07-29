---
description: Read-only guided walkthrough of the GDD workflow and its artifacts
allowed-tools: Read
---

<objective>
This is a read-only tour of the main GDD commands. It will not change your
files. Walk the user through how an engagement runs: scope → taxonomy lock
→ hypothesis tree → module execution → triangulation → red team →
storyline, and which persistent artifacts each step writes to
`.diligence/`.
</objective>

<execution_context>
@${CLAUDE_PLUGIN_ROOT}/gdd-core/workflows/tour.md
</execution_context>

<process>
1. Follow the tour script in the workflow file, one stage per section.
2. Show the artifact each stage produces (from the templates), with a
   two-line example, not the full template.
3. Close with the startup ladder and the honest verification claim: GDD
   verifies consistency and traceability, not ground truth.
4. Write no files, run no analysis.
</process>

---
description: Update GDD to the latest published version, preserving your local edits
allowed-tools: Read, Bash, Edit, WebFetch
---

<objective>
Bring this GDD install up to the latest published version. Check what's
installed against what's on npm, show what changed, and — on your
confirmation — reinstall in place, backing up and merging any files you
edited locally. Never touches a `.diligence/` engagement; this maintains
the GDD install itself.
</objective>

<execution_context>
@${CLAUDE_PLUGIN_ROOT}/gdd-core/workflows/update.md
</execution_context>

<process>
1. Read the workflow file above and follow it in order.
2. Fail closed: if the install manifest is missing or records no install
   provenance, stop and tell the user to re-run the installer by hand.
3. Do not reinstall without an explicit confirmation from the user.
</process>

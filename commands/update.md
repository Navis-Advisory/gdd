---
description: Route an approved GDD update through its existing native plugin or CLI installation
allowed-tools: Read, Bash, Edit, WebFetch
---

<objective>
Identify how this GDD copy is installed and use that same route for an
explicitly approved update. Native plugins use the host's plugin management;
portable candidates use an identified replacement bundle. Only an established
CLI-owned installation is eligible for the guarded CLI path. Report observed
results and unresolved local edits. Do not read or write engagement artifacts.
</objective>

<execution_context>
@${CLAUDE_PLUGIN_ROOT}/gdd-core/references/runtime-contract.md
@${CLAUDE_PLUGIN_ROOT}/gdd-core/workflows/update.md
</execution_context>

<process>
1. Read the workflow file above and follow it in order.
2. Establish the active installation route before choosing an updater. Missing
   CLI ownership metadata never authorizes an npm installation or a new target.
3. Do not update without explicit user approval for the identified route,
   target and version/bundle. Respect host permissions and await its result.
</process>

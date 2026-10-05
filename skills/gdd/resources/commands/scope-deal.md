---
description: Interview the user to scope a new diligence engagement, then write the engagement brief and lock the deal taxonomy
argument-hint: "[target company or deal codename]"
arguments: [target]
allowed-tools: Read, Write, Edit, Glob, Bash, AskUserQuestion, Agent, WebSearch, WebFetch
---

<objective>
Start a new engagement. Interview the user to pin down target, client
context, investment thesis, key questions, deadline, and scope boundaries;
then initialize `.diligence/` with the engagement brief (`ENGAGEMENT.md`),
the deal taxonomy lock (`TAXONOMY.md` + `state.json.taxonomy_lock`), and an
empty findings ledger and source registry.

The taxonomy lock is GDD's convention lock: segment definitions, geography,
currency/units/FX, time basis (CY vs FY), and the source hierarchy are
fixed here, before any analysis, so later work cannot drift.
</objective>

<execution_context>
@RESOURCE_ROOT/gdd-core/references/engagement-root.md
@RESOURCE_ROOT/gdd-core/references/sow-register.md
@RESOURCE_ROOT/gdd-core/workflows/scope-deal.md
</execution_context>

<context>
Target: ARGUMENTS

Use the shared intake/core classification before scoping. If a full engagement
already exists, point at /gdd:resume-work. Staged intake is allowed; preserve
QUESTIONS.md, its intake handoff/history and all source snapshots. Complete
source-only intake through /gdd:ingest-sow first; stop on malformed/unsupported
state rather than initializing missing core.
</context>

<process>
1. Read the existing SOW register, or run /gdd:ingest-sow if supplied.
   Interview the user directly (AskUserQuestion, four batches) per the
   workflow — target/client, thesis/questions, deliverable/constraints,
   taxonomy.
2. Spawn `gdd-scoper` with the engagement root (resolved absolute path
   ENGAGEMENT_ROOT — the folder it must create) and the collected
   answers to draft `ENGAGEMENT.md` and `TAXONOMY.md` from the
   templates and write the machine lock into `.diligence/state.json`.
3. Review both artifacts with the user before declaring the engagement
   scoped; check feasibility per active Q-id and accepted criterion, including
   descriptive questions without hypotheses. Unresolved taxonomy fields and
   missing evidence instruments remain explicit, never silently defaulted.
4. At scope sign-off, the orchestrator follows the Local Git checkpoints
   contract in the SOW register reference, reports the SHA or limitation,
   and suggests `/gdd:hypothesis-tree` as the next step.
</process>

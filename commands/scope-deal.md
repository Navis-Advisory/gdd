---
description: Interview the user to scope a new diligence engagement, then write the engagement brief and lock the deal taxonomy
argument-hint: "[target company or deal codename]"
arguments: [target]
allowed-tools: Read, Write, Edit, Glob, AskUserQuestion, Agent, WebSearch, WebFetch
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
@${CLAUDE_PLUGIN_ROOT}/gdd-core/workflows/scope-deal.md
</execution_context>

<context>
Target: $ARGUMENTS

If `.diligence/` already exists, stop and point at /gdd:resume-work — one
engagement per folder.
</context>

<process>
1. Interview the user directly (AskUserQuestion, four batches) per the
   workflow — target/client, thesis/questions, deliverable/constraints,
   taxonomy.
2. Spawn `gdd-scoper` with the engagement root (absolute path of
   `<CWD>/.diligence` — the folder it must create) and the collected
   answers to draft `ENGAGEMENT.md` and `TAXONOMY.md` from the
   templates and write the machine lock into `.diligence/state.json`.
3. Review both artifacts with the user before declaring the engagement
   scoped; unresolved taxonomy fields are flagged OPEN, never silently
   defaulted.
4. Suggest `/gdd:hypothesis-tree` as the next step.
</process>

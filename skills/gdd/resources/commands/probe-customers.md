---
description: Gather customer evidence — retention, satisfaction, purchase criteria — up the evidence ladders
argument-hint: "[claim type to focus on, e.g. retention]"
arguments: [focus]
allowed-tools: Read, Write, Edit, Agent, WebSearch, WebFetch, AskUserQuestion
---

<objective>
The customers module. Customer claims are where diligence most often
ships unfalsifiable mush; this module climbs the evidence ladders in
references/customer-evidence.md instead — every claim type (retention,
satisfaction, purchase criteria, willingness to pay, buying cycle,
concentration) has a best-to-worst ladder, the rung reached is recorded,
and confidence is capped by the rung, not by how confident the prose
sounds. Headline output: the customer-evidenced KPC table that the
competition module's positioning axes must consume.
</objective>

<execution_context>
@RESOURCE_ROOT/gdd-core/references/engagement-root.md
@RESOURCE_ROOT/gdd-core/workflows/probe-customers.md
</execution_context>

<context>
Focus: ARGUMENTS (default: every claim type the module brief names).
Requires the taxonomy lock; retention/churn claims additionally require
defined_terms to fix the churn basis (gross logo vs net revenue) — an
undefined basis blocks that claim type and routes back to scoping.
</context>

<process>
First apply the workflow's SOW coverage/dependency preflight. Include assigned
active Q-ids, accepted criteria and analyses in the prompt; execute descriptive
questions even without a thesis leaf. Missing coverage or a named required input
blocks affected work; a generic default brief or exploratory fallback cannot
replace it. After serial evidence promotion, only the orchestrator reconciles
QUESTIONS.md. Record substantive Q answers/gaps with evidence, not forced
hypothesis verdicts.

1. Spawn `gdd-analyst` with the engagement root (resolved absolute path
   ENGAGEMENT_ROOT) and the module brief; heavy evidence gathering
   delegates to `gdd-researcher` in fresh context (root passed along),
   parallel per claim type where independent.
2. Every testimony unit records who / channel / selection mechanism;
   tier-6 testimony carries direction only (D4 tally rule); ladder
   rungs unreachable at the engagement's access level are reported as
   gaps, never simulated from lower-rung material.
3. Write `.diligence/modules/customers/FINDINGS.md`; promote headliners
   (retention, satisfaction, KPCs — one claim per finding) to LEDGER.md
   with rung-capped confidence; file the unreachable-rung gaps as open
   questions.
</process>

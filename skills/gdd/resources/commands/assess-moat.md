---
description: Test the target's moat claims — mechanism by mechanism, with kill-tests run at build time
argument-hint: "[mechanism to focus on, e.g. switching-costs]"
arguments: [mechanism]
allowed-tools: Read, Write, Edit, Agent, WebSearch, WebFetch
---

<objective>
Test the target's moat claims mechanism by mechanism against the
taxonomy in references/moat-evidence.md: switching costs, network
effects, scale economies, brand/category ownership, regulatory/
licensing, IP, data/workflow depth. A moat claim needs a named mechanism;
descriptive company Qs remain in scope under their accepted criteria without
a moat mechanism. Every mechanism carries confirming
AND killing evidence, run at build time so the red team has nothing new
to ask; product-feature moats also answer the one-release-cycle test.
Retention and switching evidence already established in the customers
module is cited by finding id, never re-derived here — that's the
circularity the red team kills first.
</objective>

<execution_context>
@RESOURCE_ROOT/gdd-core/references/engagement-root.md
@RESOURCE_ROOT/gdd-core/workflows/assess-moat.md
</execution_context>

<context>
Mechanism: ARGUMENTS (default: every mechanism the target claims).
Requires the taxonomy lock; runs best after /gdd:probe-customers (KPC
rows) and /gdd:map-competitors (the competitive set) — both consumed by
finding id. If either hasn't run, the workflow falls back and flags the
re-check in STATE.md. Such exploratory fallback must meet the accepted criterion;
Qs requiring a missing named upstream finding remain blocked.
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
   one researcher per mechanism, parallel where independent.
2. Every moat claim names its mechanism, carries confirming AND killing
   evidence, and — for product-feature moats — the one-release-cycle
   answer; target-sourced evidence alone caps confidence at M.
3. Write `.diligence/modules/company/FINDINGS.md`; promote key findings to
   LEDGER.md with confidence levels; log open questions.
</process>

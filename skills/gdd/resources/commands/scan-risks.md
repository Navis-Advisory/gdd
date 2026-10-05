---
description: Run the standing risk screens — trip conditions, bounded deep dives, evidence-of-search for the rest
argument-hint: "[screen name to focus]"
arguments: [screen]
allowed-tools: Read, Write, Edit, Agent, WebSearch, WebFetch, AskUserQuestion
---

<objective>
The risks module. Screen first, escalate on trip: cheap tests against
customer concentration, supplier/input concentration, platform
dependency, regulatory/licensing, key person, and market-structure
exposure, each with a falsifiable trip condition. A tripped screen
escalates to a bounded deep dive; an untripped screen records evidence
of the search, never a bare "no issues found" — that's how the one
deal-killer nobody looked at gets caught before the readout.
</objective>

<execution_context>
@RESOURCE_ROOT/gdd-core/references/engagement-root.md
@RESOURCE_ROOT/gdd-core/workflows/scan-risks.md
</execution_context>

<context>
Screen focus: ARGUMENTS (default: all screens, seeded per the
reference). Requires the taxonomy lock. Runs best after
/gdd:size-market and the customers module — customer concentration and
market-structure intake cite their findings by F-id and run degraded,
flagged as such, without them. This does not satisfy a Q whose accepted criterion
requires the missing upstream finding; keep that dependency blocked explicitly.
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
   ENGAGEMENT_ROOT), the module brief (a default six-screen brief is allowed
   only without assigned SOW Qs, noted in STATE.md) and `references/risk-screens.md`; heavy
   evidence gathering goes to `gdd-researcher` in fresh context (root
   passed along), parallel per screen where screens don't share an
   input.
2. Every screen resolves tripped or clear. Clear screens carry an
   evidence-of-search line. A trip whose deep dive would consume
   material timeline is surfaced to the user first — trip evidence plus
   proposed scope — so the user chooses chase vs record-as-open.
3. Write `.diligence/modules/risks/FINDINGS.md`; promote per the
   reference's promotion rules to LEDGER.md; update STATE.md.
</process>

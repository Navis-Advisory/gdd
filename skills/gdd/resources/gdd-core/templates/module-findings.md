---
template: module-findings
template_version: 3
---

# Module findings — {MODULE} ({DEAL_NAME})

<!-- Written by the executing agent (gdd-analyst, or the size-market
workflow for the market module). This file is the evidence behind the
ledger: LEDGER.md rows point into sections here, so headings must be
stable anchors (don't rename after findings land).

House rules:
- Every number: taxonomy units, source ids inline, arithmetic shown
  where computed.
- Verdicts before findings — the reader checks the contract first.
- Contradictory evidence is reported as contradiction, with both sides
  cited; picking the convenient side is a D4/D7 magnet.
- ESTIMATE label wherever the agent filled a gap, with the basis. -->

## Verdicts

| Hypothesis | Verdict | Basis (one line) |
|------------|---------|------------------|
<!-- Verdict ∈ confirmed / refuted / unresolved(+what's missing).
For a Q-only module, say there are no assigned hypotheses; do not invent one. -->

## SOW responses

<!-- If the brief assigns Q-ids, include every one: substantive answer or
explicit gap, which accepted criterion is supported/remaining, and traceable
findings/source links. This is analytical support, not a duplicate question
status register. Descriptive questions do not need confirmed/refuted verdicts.
The orchestrator reconciles completion serially in QUESTIONS.md. -->

| Q-id / criterion reference | Answer or explicit gap | Supporting finding / source links | Remaining evidence or dependency |
|----------------------------|------------------------|-----------------------------------|----------------------------------|

## Findings

<!-- Numbered within the module (M1, M2… — ledger promotion assigns
F-ids), each: the claim · the evidence and reasoning · source ids ·
confidence · which H-id and/or Q-id it answers.

For market-sizing work — mandatory structure (do not invent sizing outputs
for a descriptive-only market brief):
### Top-down estimate
(full filter chain table, anchor sources, range)
### Bottom-up estimate
(full units × penetration × price build, range)
### Reconciliation
(gap vs tolerance, reconciled figure + basis, residual-gap driver —
this section is what F-ids cite)
### Market risk register
(structural risks rated better-than-remote: saturation, substitution,
technology shift, demand-driver decay — the risks module's
market-structure screen cites this section) -->

## Unprompted observations

<!-- Interesting but outside the brief. Assigned descriptive Q-ids are in
scope, never unprompted observations. The planner may propose new scope through
the accepted-amendment contract; observations do not silently become a new task. -->

## Open questions

<!-- What this module could not settle and why, with affected Q-id/analysis,
missing evidence/dependency and next action; mirrored into STATE.md by the
orchestrator. Never invent missing evidence to close a criterion. -->

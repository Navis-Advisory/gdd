---
template: module-findings
template_version: 2
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
<!-- Verdict ∈ confirmed / refuted / unresolved(+what's missing). -->

## Findings

<!-- Numbered within the module (M1, M2… — ledger promotion assigns
F-ids), each: the claim · the evidence and reasoning · source ids ·
confidence · which hypothesis it answers.

Market module only — mandatory structure:
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

<!-- Interesting but outside the brief. Kept separate so the brief
stays auditable; the planner decides whether any of it becomes a new
hypothesis. -->

## Open questions

<!-- What this module could not settle and why; mirrored into STATE.md
by the orchestrator. -->

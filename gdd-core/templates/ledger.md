---
template: ledger
template_version: 2
---

# Findings ledger — {DEAL_NAME}

<!-- The engagement's evidence spine: the single place a number or claim
becomes citable by everything downstream (storyline claims trace to
finding ids, finding ids trace to source ids). Module agents append;
gdd-librarian keeps hygiene; gdd-red-teamer may change ONLY the status
field — except when it runs as the risks module (no separate risks
analyst), where it also appends risk-leaf verdict rows (module=risks),
the one sanctioned exception.

Rules:
- Append-only. Text of a finding never changes after it lands;
  corrections are new findings whose Notes point back ("supersedes F7").
- Ids sequential, never reused. One claim per finding — "market is $1.1B
  and growing 11%" is two findings.
- Claim states units/currency/period per the taxonomy lock.
- Evidence is a pointer into a module findings file (file#section), not
  a restatement.
- Confidence: H = multiple independent tier≤3 sources or reconciled
  estimate; M = single good source or corroborated estimate; L =
  single weak source, unreconciled estimate, or contested logic.
- Status: OPEN (landed, not yet through a gate) · SUPPORTED (survived
  triangulation) · CONTESTED (red-team kill, disposition pending) ·
  RETIRED (conceded/superseded — kept for the audit trail).

Worked example row (Project Kestrel):
| F1 | NA pest-control FSM software spend was $1.1B in CY2025 (USD, $M basis) | .diligence/modules/market/FINDINGS.md#reconciliation | S3, S7, S12 | USD $M, CY2025 | H | SUPPORTED | market |
-->

Statuses: OPEN · SUPPORTED · CONTESTED · RETIRED

| ID | Claim | Evidence | Sources | Units/basis | Confidence | Status | Module |
|----|-------|----------|---------|-------------|------------|--------|--------|

## Notes

<!-- Cross-references, merge notes ("F9 duplicates F4, merged"),
supersessions ("F15 supersedes F7: FX corrected"), and D8 disposition
records for CONTESTED findings (revived by …, retired because …,
declared dispute — see REDTEAM.md §…). -->

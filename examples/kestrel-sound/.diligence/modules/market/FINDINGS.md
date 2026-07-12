---
template: module-findings
template_version: 2
---

# Module findings — market (Kestrel Sound)

Written by the size-market orchestration (independent legs by
gdd-sizer-topdown / gdd-sizer-bottomup, reconciliation by the
orchestrator), 2026-07-08. All figures USD $M, CY2025, per taxonomy
lock v1; precision reported at what inputs support (3 s.f. cap).

## Verdicts

| Hypothesis | Verdict | Basis (one line) |
|------------|---------|------------------|
| H-mkt-1 (CY2025 spend ≥ ~$200M) | **refuted** (in spend terms) | Every defensible construction from both independent legs lands below $200M; highest defensible high is $167M (TD). defined_terms OPEN → stated in spend terms only, no ARR≈spend equivalence claimed. |
| H-mkt-2 (spend CAGR ≥8%) | unresolved | Growth evidence collected but unadjudicated: services base +1.4% to +6.0% (S3 vs S5 conflict); software CAGRs only from tier-6 report mills (5.6–12.5%, global scope). Needs dedicated growth work. |
| H-mkt-3 (penetration runway ≥30% not on purpose-built FSM) | directionally supported, unresolved | BU penetration inference: 40–53% of operators on ANY FSM → runway exists; purpose-built split not yet isolated. |
| H-mkt-4 (demand base flat-to-growing) | supported | US structural services +6.0% 2025 (S3); Canada ~2–3% (S11/S13); no contraction evidence in any source. |

## Findings

### Top-down estimate (leg run blind to bottom-up)

Chain A (primary; spend-share): $13,416M US structural pest services
CY2025 [S3, t5] × 1.10 Canada [E1; S13,S11] × 0.60 ex-in-house giants
[E2; S7,S9] × 0.70 paid-FSM penetration of remaining revenue [E3; S19]
× 1.2% spend intensity [E4 revised; see reconciliation] = **$74.4M
base**; at pure list-price intensity (0.9%) = $55.8M (leg low).

Chain B (bounding only, per source-hierarchy carry rule): vendor
revenue gross-up = $110M base ($72.2–167M) after re-derivation of
PestPac from tier-4/5 inputs (E5′: $25–35–55M; the original getlatka
figure S21 is rejected as load-bearing — tier 6, payments-blurred).

Leg headline: **low $55.8M · base $74.4M · high $167M**, confidence
LOW-MED. Construction history: first return used a geometric mean of
Chains A and B ($96.5M) — reconciliation re-run demoted Chain B per the
carry rule. Full chains, anchor candidates (incl. rejected IBISWorld
$24.5B and report-mill sizings), and ESTIMATE register: sizer return,
preserved in the sources registry notes.

### Bottom-up estimate (leg run blind to top-down)

Universe: 17.9k/19.0k/22.2k NA operators (S4 Specialty Consultants
16,565 US firms; S6 census 13.5–15.8k; S12 StatCan Canada 1,368→~1,484;
registry plausibility check via TX licenses S10). Size mix ESTIMATE
from S4/S12 distributions. Penetration per tier (micro 40%, small 70%,
mid 90%, large 97% — ESTIMATES; overall ≈54%, consistent with vendor-
count inference 40–53%). Price per operator-year from observed price
points only (GorillaDesk/Fieldwork/FieldRoutes/PestPac; S22–S28).

Build: 11,800×40%×$0.9k + 5,400×70%×$4.0k + 1,520×90%×$14k +
280×97%×$60k = **$54.8M base**; low $27.2M, high $116M. Supplier-side
cross-check (same leg, no analyst figures): $55–70M after haircuts.
Confidence LOW-MED. Giants (Orkin/Terminix) excluded as in-house, both
legs.

### Reconciliation

- Tolerance: 30% (taxonomy lock). Gap at first return: |96.5−54.8|/54.8
  = **76.1%** → outside → diagnosis per method (definition ✓ aligned,
  penetration ✓ consistent once size-weighted, unit/period ✓ clean;
  culprit = TD Chain B tier-6 input given co-equal weight). One re-run
  of the TD leg with diagnosis, other leg withheld.
- Gap after re-run: |74.4−54.8|/54.8 = **35.8%** → still outside →
  **irreconciled per protocol**; no averaging performed.
- **Residual gap driver (named):** the list-price bias question. Both
  legs' cheapest defensible constructions are list-price-based and
  agree within 2% (TD Chain A @0.9% = $55.8M; BU = $54.8M; BU supplier
  cross-check $55–70M). The entire remaining base gap is TD's E4
  recalibration (+33% intensity for negotiated/add-on pricing that
  list prices miss, corroborated by its re-derived vendor build).
  If that recalibration is right, BU's price inputs are ~25–35% low
  for the same reason. The truth plausibly sits at or above both
  bases; it does not approach $200M in any construction.
- Working span for downstream use: **$55–116M** (overlap of leg
  ranges' central mass), point-free by design, confidence L.

## Unprompted observations

- The target's teaser ARR (~$40M, ~90% NA) is large against every
  in-segment spend construction (55–116M span) — either the teaser
  overstates, ARR ≠ in-segment spend (OPEN defined_terms), or the
  target's revenue includes out-of-segment lines (payments, other
  verticals). Flagged for competition module (H-comp-2) and red team.
- S3 (+6.0%) vs S5 (+1.41%) services-growth conflict is itself a
  finding-grade discrepancy; recorded for H-mkt-2 work.

## Open questions

- H-mkt-2 needs dedicated growth evidence above press tier (none found
  for software-spend growth specifically).
- defined_terms (ARR vs spend; operator unit) still OPEN — blocks any
  ARR-based restatement of H-mkt-1 and sharpens the teaser tension.
- List-price bias magnitude (the residual gap driver) — an expert call
  or vendor disclosure would settle; out of reach this engagement
  (tier-3 access: none).

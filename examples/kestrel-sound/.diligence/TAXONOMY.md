---
template: taxonomy
template_version: 2
---

# Deal taxonomy — Kestrel Sound

<!-- Human projection of state.json.taxonomy_lock — NOT the source of
truth (agents read the machine lock first). Append-only: changes arrive
as supersession entries written by gdd-librarian after user sign-off,
never edits in place. -->

## Lock status

taxonomy_version: 1 · 2026-07-07

- **Locked:** segments (primary market, with boundary cases and test
  value), geography, currency/units/FX, time basis, source hierarchy
  (defaults, no overrides), reconciliation tolerance (default 30%).
- **OPEN:** defined_terms — ARR vs revenue, "operator", unit of account
  ("location" vs "truck"), churn (gross logo vs net revenue) were not
  settled in the scoping interview. Would settle: CIM/management
  definitions plus user confirmation. Any analysis leaning on these
  terms is blocked until they are locked.

## Market & segment definitions

**Primary market — NA pest-control FSM software spend.**
Software spend by North American (US + Canada) pest-control operators on
field-service-management software: scheduling, routing, billing, and
chemical-compliance logging.

Excludes:
- Generic horizontal FSM revenue earned from other trades (that is the
  competitive displacement pool, not the market).
- Hardware.
- Pest-control services revenue itself.

Boundary cases decided:
- Lawn-care / wildlife-control operators: OUT unless pest control is
  ≥50% of the operator's revenue.
- Consumer/residential DIY apps: OUT (consumer, not operator spend).

Test value: "A 20-truck termite specialist using ServiceTitan" → IN
market, competitor-supplied.

## Geography

US + Canada only. "NA revenue"-style claims are tested against this
two-country definition; Mexico and the Caribbean are out.

## Currency, units, FX

- Reporting currency: USD. Magnitude unit: $M. Rounding: 3 significant
  figures in the ledger (storyline may round further; D5 tolerates
  rounding only).
- FX: **CAD→USD 0.7025 as of 2026-07-06** (Wise mid-market daily close
  0.702469, S1; corroborated by Trading Economics USD/CAD 1.4208 on
  2026-07-07 ≈ 0.7038 CAD→USD, S2 — agreement within 0.2%).
- Caveat: the preferred source, Bank of Canada daily indicative rate
  (tier 2), was unreachable from this research environment (egress-proxy
  403 on bankofcanada.ca and its Valet API; federalreserve.gov H.10
  likewise blocked). When BoC becomes reachable, re-verify and, if it
  differs, supersede via gdd-librarian — do not edit this entry in place.

## Time basis

CY. Base year CY2025; forecast horizon CY2025–CY2030 (5 years). Every
growth rate states its period.

## Source hierarchy

Adopt `references/source-hierarchy.md` tiers 1–6 unchanged; **no
overrides**. Tier-3 paid-source access: **none** (no PitchBook, Capital
IQ, Gartner/IDC, or expert-call transcripts available) — recorded here
and in ENGAGEMENT.md Constraints, not worked around.

Reconciliation tolerance: default **30%** (top-down vs bottom-up sizing).

## Defined terms

OPEN — see Lock status. Nothing is defined yet; do not assume ARR =
revenue or an operator unit of account until this section is locked.

## Supersessions

<!-- Dated, appended by gdd-librarian only. Format:
YYYY-MM-DD · field · old → new · reason · affected finding ids ·
taxonomy_version bump. -->

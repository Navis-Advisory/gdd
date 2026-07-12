---
template: workplan
template_version: 2
---

# Workplan — Kestrel Sound

Deadline 2026-07-28 (final readout, IC memo). Planned 2026-07-08.
~15 working days remain; the synthesis window (gates + storyline,
2026-07-21 → 07-24, ~4 days ≈ 25% of the timeline) is protected —
modules do not eat it. In-scope modules: market, competition, risks
(KQ3 customers and KQ4 company/moat are scoped out per ENGAGEMENT.md).
Long-lead check: no expert calls, data room, or paid data exist on
this engagement — there are no human-dependent items to front-load.

## Timeline

| Week | Market | Competition | Risks (red-team) | Gates & synthesis |
|------|--------|-------------|------------------|-------------------|
| 1 (Jul 8–10) | TD + BU sizing legs launched in parallel (independence protocol) | set construction + survivorship check; pricing benchmark started | — | interim readout Fri Jul 10 (working session) |
| 2 (Jul 13–17) | reconcile legs; growth + penetration + demand-base leaves (H-mkt-2..4); promote size F-id by Wed Jul 15 | share build vs market F-id (H-comp-1, -2); switching tally (H-comp-3); horizontal feature audit (H-comp-4); pricing verdict (H-comp-5) | leaf evidence gathering starts (H-risk-1..4 scans) — sweep itself waits on the ledger | triangulate dry run Fri Jul 17 |
| 3 (Jul 20–24) | verdicts closed Mon Jul 20 | verdicts closed Tue Jul 21 | red-team sweep Wed–Thu Jul 22–23 (after triangulate) | triangulate Tue Jul 21 · storyline Wed–Fri Jul 22–24 · IC pre-read Fri Jul 24 |
| Final (Jul 27–28) | — | — | kill dispositions logged | pre-read revisions Mon Jul 27 · final readout Tue Jul 28 |

## Dependencies

- taxonomy defined_terms lock → H-mkt-1 headroom clause, H-comp-2 /
  H-comp-5 ARR framing (TAXONOMY.md blocks analysis on OPEN terms; the
  briefs carry a labeled interim assumption — see Capacity notes).
- size-market → competition share math (shares cite the ledger
  denominator by F-id; started before it exists, they are labeled
  "of estimated market (unsized)" and D5 flags them).
- market + competition findings in LEDGER.md → red-team sweep
  (precondition: ledger non-empty).
- triangulate → red-team (workflow: best after triangulate) →
  storyline (kills and dispositions feed the memo's risk section).
- market operator-universe finding → H-risk-2 roll-up denominator.

## Checkpoints

- 2026-07-10 · interim readout (working session) · sizing method +
  both legs' early anchors, competitive set draft, risk long-list.
  Honest commitment: only ~3 working days in — NOT reconciled numbers.
  Date assumed from "end of week 1"; confirmation still open (see
  Capacity notes).
- 2026-07-17 · triangulate dry run · reconciled market size, draft
  shares, gate-check on what's promoted so far.
- 2026-07-24 · IC pre-read · full storyline draft, triangulation gate
  run, red-team kills with disposition status.
- 2026-07-28 · final readout · IC memo.

## Capacity notes

- Week 1 is 3 working days (scoping consumed Jul 6–7). The interim
  readout commitment is scoped down accordingly (method + early
  anchors, not reconciled findings). If the client expects reconciled
  numbers on Jul 10, that does not fit — user's call to move the
  readout or accept the thinner content.
- defined_terms still OPEN (ARR vs revenue, operator unit, churn
  basis). If the client cannot supply CIM/management definitions by
  end of week 2 (Jul 17), H-mkt-1's headroom clause and H-comp-2's
  ARR framing resolve as 'unresolved' or carry the labeled assumption
  into the memo — user's call which.
- Red-team lands in week 3 by construction (needs the ledger). If
  market reconciliation slips past ~Jul 17, the sweep compresses; the
  plan protects the synthesis window by cutting depth on H-comp-4 /
  H-comp-5 first — flagged now so the cut, if needed, is the user's
  call, not a silent thinning.
- No tier-3 sources and no data room: several leaves (esp. H-comp-2,
  H-risk-2) may finish 'unresolved' at lower confidence than typical
  CDD. That is a scope reality accepted at scoping, restated here; the
  memo will state confidence caps explicitly.
- Everything else fits the 3-week window as planned.

## Revisions

- 2026-07-11 · Scope extension (ENGAGEMENT.md amendment): customers +
  company modules and the standing risk screens added to week 2;
  gates + storyline rebuild move to the protected synthesis window
  (unchanged, ~20% of timeline); final readout date unchanged
  (2026-07-28). Order: probe-customers → assess-moat ∥ scan-risks →
  triangulate → red-team → storyline v2.

- 2026-07-08 · initial plan (3-week shape interpolated from the 2- and
  4-week heuristics: week 1 market + competition set in parallel,
  week 2 share math + leaf verdicts + risk evidence, week 3 gates,
  red-team, storyline, readouts).

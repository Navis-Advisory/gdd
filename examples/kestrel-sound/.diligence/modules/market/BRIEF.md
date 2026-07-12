---
template: module-brief
template_version: 2
---

# Module brief — market (Kestrel Sound)

Tree branch: C1 — "the NA pest-control FSM software market is big and
growing enough to carry the market-growth leg of the ARR-doubling
thesis" (KQ1). Taxonomy: primary market as locked in TAXONOMY.md v1
(NA pest-control FSM software spend; boundary cases and test value per
the lock). Time basis CY, base year CY2025, horizon CY2025–CY2030.
Access constraints: public web only, WebSearch snippets only (direct
page fetch blocked); no tier-3 paid data; no data room.

## Hypotheses under test

**H-mkt-1.** NA pest-control FSM software spend (locked segment,
CY2025) is at least ~$200M — large enough that a ~$40M-ARR-band player
could double without exceeding roughly 40% in-segment share.
- Confirms: top-down and bottom-up sizing legs (independence protocol
  per workflows/size-market.md) reconcile within the locked 30%
  tolerance at ≥$200M.
- Kills: both legs reconcile below ~$120M (doubling would require
  >2/3 in-segment share — not credible for a #2 player).
- FLAG: the ARR-vs-spend comparison leans on the OPEN defined_terms
  field (ARR vs revenue). Per TAXONOMY.md, analysis leaning on OPEN
  terms is blocked. Until locked, the size verdict stands alone in
  spend terms; the headroom clause carries the explicit assumption
  "ARR ≈ in-segment recurring software revenue", labeled as such.
  Open question filed in STATE.md.

**H-mkt-2.** Segment spend grows at ≥8%/yr CAGR CY2025–CY2030 —
roughly the pace needed for the market-growth lever to carry a
material fraction of the ~14.9%/yr composite growth the thesis needs.
- Confirms: ≥2 independent sources (different root sources and
  methods; tiers per the locked hierarchy) at ≥8%/yr, or driver math
  (operator counts × penetration trend × ARPU trend) implying it.
- Kills: best-available independent evidence puts growth at ≤~3%/yr
  (GDP-like), or every ≥8% figure traces to vendor-sponsored material
  with no independent corroboration.

**H-mkt-3.** Penetration runway exists: ≥30% of NA pest-control
operators (per the locked operator boundary) are not yet on any
purpose-built FSM — running on paper, spreadsheets, or generic tools.
- Confirms: operator universe (Census/BLS, NAICS 561710; state
  pesticide-licensee counts) vs summed vendor customer counts implies
  FSM penetration ≤~70%.
- Kills: credible vendor customer counts sum to ≈ the operator
  universe (saturation) — growth would then be ARPU-only, weakening
  both the growth and share-gain legs.

**H-mkt-4.** The underlying demand base is stable or growing: NA
pest-control services industry operator counts and services revenue
are flat-to-growing CY2020–CY2025 with no forecast contraction.
- Confirms: official statistics / trade-association data show
  operator counts and services revenue flat or growing over the
  period.
- Kills: sustained multi-year contraction in operator counts or
  services revenue.

Structure note: H-mkt-3 and H-mkt-4 decompose the *mechanism* of
H-mkt-2 (guard against vendor-sponsored growth numbers); they are
nested under the growth claim in the tree, not siblings of it, so the
partial evidence overlap with H-mkt-2 is by design and declared.

## Analyses planned

- Top-down sizing leg (anchor + slice per references/sizing-methods.md)
  → H-mkt-1, H-mkt-2. Run per the size-market independence protocol.
- Bottom-up sizing leg (operators × FSM penetration × ARPU) →
  H-mkt-1, H-mkt-3. Same protocol; legs never see each other.
- Reconciliation at the locked 30% tolerance; gap driver named →
  H-mkt-1.
- Growth-driver decomposition (penetration vs ARPU vs operator-base
  growth) → H-mkt-2, H-mkt-3, H-mkt-4.
- Operator-universe build from official statistics and state
  pesticide-licensing counts → H-mkt-3, H-mkt-4.

## Sources to hit

- Census County Business Patterns / BLS, NAICS 561710 (exterminating
  and pest control services) — tier 2. Egress caveat: some .gov hosts
  are proxy-blocked from this environment; register fallbacks with the
  caveat, per existing SOURCES.md practice (S1/S2 precedent).
- State pesticide regulator licensee counts (e.g. CA DPR, TX SPCS,
  Florida DACS) — tier 2.
- Public-company filings touching the space: Rollins 10-K, Rentokil
  annual report (services-side demand base); ServiceTitan S-1/10-K
  (horizontal FSM economics) — tier 1.
- Vendor pricing pages and customer-count claims (FieldRoutes,
  WorkWave/PestPac, GorillaDesk, Briostack, Jobber, Housecall Pro) —
  tier 4.
- Trade press: PCT Magazine, PMP Magazine — tier 5.
- Market-report figures only as reported in public summaries/press —
  tier 5, weight capped accordingly (no tier-3 access; recorded, not
  worked around).

## Dependencies

- Consumes: taxonomy lock v1 (segment, geography, CY basis, FX
  CAD→USD 0.7025); defined_terms is OPEN — see H-mkt-1 flag.
- Consumed by: competition module (headline market size F-id is the
  share denominator); risks/red-team (anchor provenance and growth
  sourcing are named attack surfaces); storyline (market-growth leg of
  the doubling math).

## Done means

- Each of H-mkt-1..4: verdict recorded (confirmed / refuted /
  unresolved + what's missing) in modules/market/FINDINGS.md.
- Headline market size + range and growth rate promoted to LEDGER.md
  with confidence and source tiers; both sizing legs shown in full.
- Unresolved is acceptable; an invented resolution is not. Given
  no tier-3 access, H-mkt-2 may cap at MEDIUM confidence — say so.
- Open questions (incl. the defined_terms exposure) filed in STATE.md.

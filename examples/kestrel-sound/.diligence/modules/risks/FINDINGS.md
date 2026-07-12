---
template: module-findings
template_version: 2
---

# Module findings — risks (Kestrel Sound)

Written by gdd-analyst, 2026-07-11, per /gdd:scan-risks (v2: six standing
screens + deal-breaker seeding). v1: leaves H-risk-1..4 ran inside the
2026-07-08 red-team sweep, verdicts F14–F17 — cited by id, never redone
(BRIEF.md untouched). Access: outside-in, no data room; target fictional —
screens ran on real segment evidence (live fetches, S90–S117); target rungs
UNREACHABLE, recorded open, not simulated. Seeding audit: all three
ENGAGEMENT.md breakers map to a screen (1 → customer-concentration; 2 →
ad-hoc disposition row citing the company module; 3 → ad-hoc screen on the
F8 trilemma) — **no scoping defect**. Evidence: three parallel
gdd-researcher spawns. Chase-vs-record gate: headless session under
orchestrator pre-authorization delivered in advance — (a) data-room deep
dives → record-as-open automatically; (b) outside-in chases ≤ ~1
researcher-day → proceed bounded, log; (c) larger → record + flag.

## Verdicts

| Screen | Verdict | Basis (one line) |
|---|---|---|
| Customer concentration (breaker 1) | tripped-unchaseable, recorded open | F22 cited (segment ESTIMATE: long-tail more likely); the >15%-of-ARR breaker rung UNREACHABLE outside-in → pre-auth (a): open question with trip evidence, priority data-room item (RK1 → F29) |
| Supplier / input concentration | clear | Five inputs on live vendor disclosures: each ≥3 credible in-use alternates; no sole source, no ≤2-supplier input, no chokepoint; three near-misses recorded (RK2 → F30) |
| Platform dependency | clear | No >30% demand/delivery via a platform whose terms a vendor doesn't set, on four angles; two watch items (app-store location policy; review-pool ownership consolidation) (RK3 → F31) |
| Regulatory / licensing | clear on reachable evidence | No vendor-side license exists to be "under review" (F24); the enacted change is engaged (F14 → F28); litigation/IP quick-confirm zero hits, trail recorded (RK4 → F32) |
| Key person | tripped at segment tier, unchaseable at target | Trip live at independent tier (GorillaDesk ↔ founder/CEO, thin bench); founder-exit precedent real, disruption unevidenced; target rung UNREACHABLE — retention flag to deal team (RK5 → F33) |
| Market-structure intake | tripped, already escalated | Record names structural risks better-than-remote (F4/F5 growth gap; F15 roll-up; F16 foreclosure caveat; F17 AI; F14/F28 decay) — each already carries a worked leaf/verdict (RK6 → F34) |
| Breaker 2 — moat cosmetic (ad-hoc) | not triggered on segment evidence | Disposition by citation: F23 (one-release-cycle NO), F27 (narrow wedge, KPC #4), F28 (decay-gated); conditional on target depth class, UNREACHABLE (RK7 → F35) |
| Breaker 3 — in-segment ARR < ½ teaser (ad-hoc) | cannot clear, recorded open | Standing leg of F8's trilemma; new bound: class-max non-subscription mix ≈22–29% (ServiceTitan, 2 vintages) ⇒ sub-half needs ~2× class max; CIM item (RK8 → F36) |

## Findings

### RK1 — customer-concentration screen · breaker 1 (promoted F29)
Cheap test cites F22, not re-derived: long-tail more likely — Rollins/
Terminix in-house (S63/S64; S107 sharpens S63 at tier 1: "majority of
Rollins' business" on proprietary BOSS); ServiceTitan filed all-trades
top-10 ≈10% (S65); implied ARPU in the regional band (F8/F13). Neither the
trip condition (top >10%, top-10 >40%) nor the >15% breaker rung is
evaluable against the target outside-in. Trip-you-cannot-chase: the deep
dive is data-room work → pre-auth (a), recorded open. L.

### RK2 — supplier/input-concentration screen (promoted F30)
Inputs tested on the comp set: (1) cloud — ServiceTitan on AWS (S90), ≥3
hyperscalers (S91); (2) payments — four distinct processor relationships
across seven vendors: Stripe (Jobber S93, HCP S94, GorillaDesk option S95),
Adyen (ServiceTitan S92), in-house PayFac (WorkWave S96), Fiserv-attributed
(Briostack, tier-6 unverified, S96 note); (3) SMS/CPaaS — Twilio confirmed
at Housecall Pro (S97, direct fetch), ≥4 commercial alternates;
(4) mapping — GorillaDesk on Google Maps (S98), ≥4 alternates; (5) chemical
data — EPA registry free/authoritative (S99), ≥2 commercial re-packagers
(S100); vendors capture EPA reg numbers as user-entered fields, no licensed
feed required (S101, S79). Would have tripped: sole-source input, ≤2
suppliers, geographic chokepoint. Nearest misses: Stripe clustering (3 of
7), CPaaS backend confirmed 1 of 7 only, Google-Maps default. Clear, M.

### RK3 — platform-dependency screen (promoted F31)
(a) App stores: technician apps delivery-critical at all 4 verticals (S103)
but free-download/no-IAP B2B pattern → no fee mediation; watch item: Apple
Guideline 2.5.4 employee-tracking rejections (S105) + Google Play's
2026-04-15 background-location policy, enforcement ~Oct 2026 (S104), vs
marketed GPS tracking — real terms-they-don't-set exposure, below the >30%
demand bar. (b) Marketplaces: QuickBooks et al. are back-office syncs, not
acquisition channels. (c) Trade/franchise: NPMA partner tier plural,
non-exclusive (WorkWave AND FieldRoutes both "Strategic", S106); largest
franchisor bypasses the comp set (Rollins BOSS, S107); FDD mandate text
unretrievable (open); no distributor bundling found. (d) Review/lead-gen: no >30% origination evidence; ServiceTitan's
filed GTM is direct-sales, no app-store/marketplace risk factor in
retrievable excerpts (S109, snippet-limited); watch item: G2 acquired
Capterra/Software Advice/GetApp, closed 2026-02-05 (S108) — F18's one-pool
finding extends to single OWNERSHIP of the review-discovery layer. S66
re-encountered, re-rejected. Clear, M.

### RK4 — regulatory/licensing screen (promoted F32)
License-under-review leg structurally empty: no license attaches to
compliance-logging software (F24). Pending-rule leg: the one enacted change
is the federal RUP rescission, already refuted into H-risk-1 (F14) and
worked into decay-gated durability (F28); nothing new surfaced.
Litigation/IP quick-confirm (gate-exempt): zero active/recent-5y IP or
product disputes touching any segment vendor's compliance/FSM product
across 9 query families + docket checks; corroborated by parent filings
(EverCommerce FY2022/FY2025 10-K — one named matter is a governance suit,
out of scope; ServiceTitan 10-Q Oct-2024 no-material-litigation — S116);
patent scan negative (S115). Nearest miss, out of scope for this trip: In
re WorkWave Data Breach Litigation, D.N.J. 3:24-cv-10592, $1.5M settlement
prelim-approved 2025-07-07 (S117) — data-security negligence, not IP;
product not confirmed PestPac (WorkWave also owns TEAM). Clear, M.

### RK5 — key-person screen (promoted F33)
Segment scan: trip condition live at the independent tier — GorillaDesk's
brand/community presence attaches to founder/CEO Chris Moreschi (S110),
functional leads but thin public bench (S111). Precedent: Briostack's
founder-CEO exited ~4 months post-EverCommerce close (S112, S40) — real
departure, disruption NOT reliably evidenced (sole narrative source
date-inconsistent, see observations); ServiceTitan-side deals retained
leadership (S113, S114). No single-inventor IP exposure
(S115). Consolidator peers show corporate benches — the pattern
concentrates in the independent tier where a ~$40M independent target sits
(F6). Target rung UNREACHABLE; retention-terms deep dive is legal-DD's
lane per the reference → flagged, not analyzed. L per tripped-and-unchased.

### RK6 — market-structure intake (promoted F34)
Degraded-mode note per workflow: market FINDINGS have no formal risk-
register section — intake read from verdicts/observations. Named structural
risks better-than-remote: headroom refuted + growth gap vs the 14.9%/yr
need (F4, F5, H-mkt-2 open); roll-up composition (F15); foreclosure
structure assembled, conduct clean (F16 caveat); AI velocity (F17);
regulatory demand decay (F14/F28). Trip met — and every named risk already
carries a worked leaf/verdict, so the deep-dive rule ("named risk becomes
a hypothesis leaf") is discharged by construction. Nothing new unworked. M.

### RK7 — breaker 2 disposition: moat cosmetic (promoted F35)
Disposition by citation, no re-analysis: NOT closable in one release cycle
at segment depth tier — ≥8 cycles, zero pest-compliance entries, revealed
buy-not-build (F23); wedge real but narrow, KPC #4 (F27); durability
decay-gated, zero growth tailwind (F28). NOT triggered on segment evidence;
CONDITIONAL on target depth class — UNREACHABLE (standing open question,
data-room item). M.

### RK8 — breaker 3: in-segment ARR under half of teaser (promoted F36)
Threshold: in-segment ARR < ~$20M (½ × teaser $40M; NA basis $18M). F8
shows the full-in-segment premise survives only at simultaneous extremes;
the breaker's scenario IS trilemma escape hatch (b) / red-team dispute #2
reading A. New bound: ServiceTitan (most payments-forward comparable) runs
non-subscription at ~22–29% of total across two vintages ~18 months apart
(S-1 LTM Jul-2024 ≈70/25/5; TTM Apr-2026 recomputed 74.3/22.4/3.6 — S102).
At class-max mix, in-segment subscription ≈ 0.71–0.78 × teaser ≫ ½ —
tripping requires out-of-segment share ~2× class max. Not confirmable, not
excludable outside-in (defined_terms OPEN; no CIM) → recorded open. L.

## Unprompted observations

- G2's acquisition of Capterra/Software Advice/GetApp (S108) retro-affects
  F18: one pool, now one OWNER — category-level lead-gen watch item.
- S62 reliability degraded: dates the EverCommerce/Briostack close "May
  2026" vs S40's corroborated Jan-2021 — librarian note suggested.
- WorkWave breach settlement (S117): cyber/data-privacy is a distinct memo
  risk line — vendors hold operator PII at scale; settled precedent exists.
- Recipe: Rollins 10-K direct-fetchable from its company IR mirror (S107,
  tier 1) despite the sec.gov block — company mirrors are a working tier-1
  path; retro-upgrades the S63 access pattern.

## Open questions

- Breaker 1 (F29): target top-10 share, single-customer share vs 15%,
  contract terms/renewals — priority data-room request · owner: user/client
  post-LOI.
- Key person (F33): founder/rainmaker map, retention terms — legal-DD +
  management meeting · owner: user/client post-LOI.
- Breaker 3 (F36): ARR composition + defined_terms — CIM · owner:
  user/client (sharpens the F8 question with the 22–29% bound).
- Target technician-app location-permission posture vs Google Play
  2026-04-15 policy (enf. ~Oct 2026) / Apple 2.5.4 — product walkthrough ·
  owner: user/client post-LOI.
- Lower priority: franchisor FDD Item-11 software-mandate text unpulled;
  SMS/CPaaS backends unconfirmed for 5 of 7 comps; ServiceTitan 424B4
  full-text check owed when sec.gov or a mirror is reachable.

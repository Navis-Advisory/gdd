---
template: module-findings
template_version: 2
---

# Module findings — company (Kestrel Sound)

Written by gdd-analyst, 2026-07-11. Access level: outside-in, no data room. The target is fictional/unobservable:
mechanism tests ran on the real vertical/horizontal vendor evidence; every target-specific claim rests on ENGAGEMENT.md
teaser premises, labeled, confidence capped at M by source. Evidence delegated to three parallel gdd-researcher spawns
(compliance present-state + release velocity + regulatory precision; switching/data-lock + kill-test; pricing ladder +
grid cells) — all genuinely fetched live vendor, regulator, and review pages (23 new sources, S67–S89). F10/F11
re-verified as present-state 2026-07-11 (S35/S37 re-fetched: unchanged/detail-sharpened; new detail under S67–S68).
web.archive.org blocked — pricing ladder graded on reachable rungs only (vintage limitation, CO6).

## Verdicts

| Hypothesis | Verdict | Basis (one line) |
|------------|---------|------------------|
| H-co-1 (switching costs material at the vertical/horizontal boundary) | confirmed (M) | Data lock + workflow depth confirmed at the deep-compliance tier: all 4 verticals run formal migration services, export is lossy exactly at the compliance layer, FieldRoutes' CEO calls data withholding industry practice; kill-test partial hit at entry tier only (HCP ships turnkey import FROM GorillaDesk). Largest-peer friction partly contractual (F19) — annuity caveat. |
| H-co-2 (compliance capability durable beyond one release cycle) | confirmed, decay-gated (M) | One-release-cycle answer NO on cadence evidence (≥8 observed cycles across 3 horizontals, zero pest-compliance entries; ServiceTitan bought the capability in 2021–22 and ~16 quarters later still hasn't ported it to core). Mechanism reclassified data/workflow depth — no vendor-side license exists (CO3); durability decay-gated on state regimes (F14 engaged, CO7). |
| H-co-3 (vertical peers hold pricing power) | refuted on reachable rungs (L) | Kill clause triggered: the only documented vertical repricing (PestPac Oct-2024, F19) was contract-monetized with a churn-direction cluster — switching-cost annuity, not brand power; entry-tier vertical prices at parity with horizontals; archived list-price vintages UNREACHABLE. |

## Findings

### Mechanism table

**CO1 — full taxonomy sweep, 7 rows (→ all three leaves).** Rows without a target-relevant claim recorded as not-claimed.

| Mechanism | Claimed? | Verdict (test outcome) |
|---|---|---|
| Switching costs | yes (H-co-1) | CONFIRMED at deep-compliance tier, stratified by tier; partly contractual at the largest peer (CO4 → F25) |
| Network effects | not claimed | No cross-side value mechanism observed in segment (per-operator FSM tools, no counterparty side); nothing to test |
| Scale economies | not claimed | Killing-side note: sub-scale entrant (GorillaDesk) matches horizontal price points at entry tier (S59 vs S84/S85) — no scale moat in either direction |
| Brand / category ownership | not claimed (tested via H-co-3) | NOT HELD: no sustained premium demonstrable (CO6); vendor brand absent from top buyer criteria — F20's top-3 are price/support/ease-of-use |
| Regulatory / licensing | claimed by label ("compliance moat") | FAILS the mechanism test: no scarce, enforced, vendor-held license exists (CO3 → F24); reclassified to data/workflow depth |
| IP | not claimed | No patents surfaced mapping to revenue-carrying features in the segment scan; not pursued further |
| Data / workflow depth | yes (the real mechanism) | CONFIRMED at segment depth tier (CO2/CO4); the target's own possession of depth-tier capability is UNREACHABLE outside-in — teaser premise, cap M |

### One-release-cycle test

**CO2 (→ H-co-2; promoted F23).** What stops a funded incumbent shipping this in one release cycle? Cited answer:
(a) **Release velocity, same window all players:** ServiceTitan runs an explicit quarterly seasonal cadence (named
releases ST-69 Spring-2024 → ST-78 current; point releases every 2–4 weeks; S69); Housecall Pro ships ~quarterly bundles
of 10–20+ features (Fall-2025 / Feb-2026 / May-2026; S70); Jobber runs a continuous changelog (S71; primary feed
403-blocked — cadence from the dated Academy bulletin, weaker leg, flagged). Across ≥8 observed cycles (~24 months),
**zero pest-compliance entries** in any of the three release channels — the "already announced?" check came back empty.
(b) **Revealed build-vs-buy:** ServiceTitan acquired the capability first-party (ServSuite 2021, FieldRoutes 2022 — F11,
cited) and ~16 quarterly cycles later still routes pest demand to FieldRoutes as a separately branded product rather
than porting depth into core (S68; S37 re-fetch: the pest page is a FieldRoutes referral). (c) **The asset is maintained
content, not a feature:** PestPac's depth is enumerated state-format logic — NPMA-33, NPMA-99-A/B, CA Material/Cal-Ag,
AZ TARF as built-in report types (S79) — against state regimes that persist (S46): a rules-and-content maintenance
obligation, not one sprint. (d) **Observed closing velocity:** Jobber moved from bare custom forms to a named
settings-level Chemical Tracking module (licensing info, applicator numbers, chemicals list — S89; S35 re-verified) but
still has no EPA product database, state formats, WDI/WDO or bait-station structures, and no mobile capture (S89) — one
structural increment in ~2 years. **Answer: NO — not closable in one release cycle at the depth tier.** Confidence M.

### Mechanism reclassification

**CO3 (→ H-co-2; promoted F24).** The moat is not regulatory/licensing in the taxonomy sense. No license or
certification attaches to compliance-logging software: federal applicator certification is person-scoped ("any person
who applies or supervises…", S72); USDA prescribes no standard record form — records integrate into the applicator's own
systems (S73); the closest analog found anywhere is WSDA's record-FORM content approval under WAC 16-228-1320 — a
template check, not a software/vendor certification (S74). Enforcement sweep (federal + CA/DC/WA + a 2025 FIFRA
enforcement roundup): every action found targets operators; zero actions against a software vendor, ever (S75;
searched-and-not-found trail in the source note). Consequence: the taxonomy row's test (license required, scarce,
enforced — against the VENDOR) fails; the moat is data/workflow depth whose demand is regulation-derived — which is
exactly what makes F14 a direct decay vector (CO7) rather than background noise.

### Switching costs at the boundary

**CO4 (→ H-co-1; promoted F25).** Confirming: all four verticals operate formal migration/data services — GorillaDesk
imports free but "complete past service or billing history cannot be imported" (S59); PestPac runs a dedicated Data
Services team (S76); FieldRoutes publishes a Data Rights Declaration committing to comprehensive extracts "in the
context of migrating to a competitor" (S77); Briostack maintains a dedicated data-migration page (S78). Export fidelity
is lossy exactly at the compliance layer: PestPac exports every report to CSV but its state compliance formats are
built-in, non-configurable report types that don't travel (S79 — non-portability of the format logic is inference from
the vendor's own export list, flagged); FieldRoutes' self-serve CSV is thin (names/addresses/emails/balances) vs a
vendor-gated "comprehensive" extract (S77); GorillaDesk lists ~47 export report types with no named chemical/compliance
report among them (S80). Industry testimony against category interest: FieldRoutes' CEO — operators "routinely" face
data withholding and delays when switching (S81). Kill test run: Housecall Pro publishes named turnkey import FROM
GorillaDesk (40+ source list; PestPac/FieldRoutes/Briostack absent) plus a MAX-plan paid migration team (S82); Jobber's
sole pest-vertical comparison page (vs PestPac) contains no migration tooling, and HCP's comparison hub has zero
pest-vertical pages (S83). Observed friction cited by id, never re-derived: F19 (PestPac 3-channel contract/billing
cluster), F12 (one-way switching direction; CONTESTED, weight capped). Reading: mechanism CONFIRMED at the
deep-compliance tier; STRATIFIED (the one turnkey path targets the entry tier); at the largest peer a material share of
the friction is contractual (F19) — an annuity component that decays at contract end, distinct from product data-lock.

### KPC comparison grid

**CO5 (→ H-co-1/2; promoted F27).** Rows are F20's ranked KPCs by id — not vendor feature lists; rows preceded cells.
Empty cells stay empty ("—" = not determinable outside-in). Target column rests on teaser premises only.

| KPC (F20 rank) | GorillaDesk | PestPac | FieldRoutes | Jobber | Housecall Pro | ServiceTitan core | KestrelSoft |
|---|---|---|---|---|---|---|---|
| 1 Price/cost | $49–149/route published (S59) | quote-gated, 3 tiers (S60) | quote-gated, active-customer billing (S61) | $29–499 published (S84) | $59–299 published (S85) | quote-gated per-tech (S86) | — |
| 2 Support/service | win-direction testimony (F20) | loss-direction testimony (F19/F20) | — | — | — | — | — |
| 3 Ease of use | win: "simplicity" (F20) | loss: "not flexible enough" (F20) | — | — | — | — | — |
| 4 Chemical/compliance | native per-ticket logging; report depth thinner than PestPac (S80, S36) | deepest: NPMA-33/99-A/B, CA Material/Cal-Ag, AZ TARF built-in (S79) | native (vertical; F11) | named settings module; no EPA DB, state formats, WDI/WDO, bait-station; desktop-only (S89, S35) | none (S67) | none native; routes to FieldRoutes (S68, S37) | teaser premise only, cap M |
| 5 Feature completeness at scale | entry tier; up-market moves run vertical→vertical away from it (F20/S44) | Enterprise tier: branches/locations (S60) | Corporate tier (S61) | Plus/Enterprise, 16+ techs (S84) | MAX ≤8 users (S85) | enterprise, all-trades | — |

Grid consequence: compliance is the ONLY row where verticals categorically beat horizontals — and it ranks #4 by buyer
frequency (F20). The moat wedge sits below all three battleground rows, where horizontals are at parity or advantaged
(published transparent pricing). Real moat, narrow wedge — the thesis's share-gain arithmetic cannot assume the wedge
decides most deals.

### Pricing-power ladder

**CO6 (→ H-co-3; promoted F26).** Ladder walked rung by rung. **Rung 1** (realized prices): UNREACHABLE — no data room.
**Rung 2** (list-price history): archived vintages UNREACHABLE (web.archive.org egress-blocked); substituted dated
current list pricing, all six vendor pages direct-fetched 2026-07-11 (S84/S85/S86 horizontals; S59/S60/S61 verticals),
plus an in-page change-signal sweep: none found on any of the six — only annual-billing discounts (HCP "$59 vs $79, save
$20/mo" pairs; GorillaDesk's uniform 8.3% annual-prepay discount), explicitly distinguished from was/now repricing
signals. Level check: the entry-tier vertical prices at parity with horizontals' published tiers — no vertical premium;
mid/upper tiers are quote-gated on BOTH sides, so a premium is not observable from list. **Rung 3** (repricing
testimony): vertical side — PestPac's Oct-2024 hike was monetized through contract lock with a churn-direction cluster
(F19, cited); horizontal side — ServiceTitan carries a BBB termination-fee cluster ($39,375 / $21,870.62 / $67,230
items, 2025–26; S87) and stayed-despite-friction review items across all three horizontals (S88). No clean "raised
price and customers stayed by preference" story found on either side. Per the reference's distinction: what is
observable survives because migration hurts and contracts bind — a **switching-cost annuity with a decay date, not
brand power**. Verdict: REFUTED on reachable rungs; confidence L (the vintage rung is the honest gap).

### Regulatory decay

**CO7 (→ H-co-2 kill leg; promoted F28).** F14 engaged, not waved off: the federal RUP recordkeeping rule is rescinded
effective 2025-07-11 under an explicit deregulation posture (F14/S45, cited). Tested reading — is the moat a decaying
asset? **Partially.** The rescinded layer is NOT where the depth driver lives: the driver is multi-state heterogeneity
(CA Material/Cal-Ag, AZ TARF, WDI/WDO formats are state/industry artifacts — S79/S46), state commercial-applicator
regimes persist present-state, and WSDA actively administers form approval today (S74). But the direction runs one way
against the moat: demand for compliance depth is wholly derivative of operator obligations (CO3 — the vendor holds no
license of its own), the federal layer has already decayed, and state regimes are "no longer trending up" (F14).
Adopted reading: NOT cosmetic, but a decaying-DEMAND asset — durable in-horizon (CY2030) on present-state evidence,
zero evidenced growth tailwind, live tail-risk if states follow the federal posture. Any thesis lever priced off
"compliance burden rising" is unsupported (consistent with F14 and F20's #4 rank).

### Strategy stated vs revealed

**CO8 (no promotion).** N-A for a fictional target: stated-vs-revealed requires the target's job postings, release
notes, and pricing-page changes over time — none exist. Recorded honestly per the brief; no finding fabricated. The
method's target-side artifacts go on the post-LOI list.

## Unprompted observations

- ServiceTitan's own termination-fee cluster (S87) shows involuntary-retention contracting is a category norm at scale,
  not a vertical-specific vice — extends F19's category-wide billing-friction read.
- "Vertical" is not one tier: GorillaDesk's compliance depth is visibly thinner than PestPac's (S80 vs S79); the depth
  moat belongs to the PestPac/FieldRoutes class — which class KestrelSoft sits in is this module's key unverifiable fact.
- Jobber's chemical tracking cannot be recorded from the mobile app (desktop-only, S89) — an under-marketed
  field-workflow gap; a grid-cell fact for the pending C2 axes re-check.
- New egress blocks: productupdates.getjobber.com, help.getjobber.com (403); ecfr.gov/federalregister.gov redirect-block.

## Open questions

- Target rungs UNREACHABLE outside-in (seed the data-room request): KestrelSoft's state-format coverage (depth class),
  realized prices/discounts, renewal-repricing history, its own export fidelity, win/loss internals.
- Deal-breaker, plain terms: the compliance moat is NOT closable in one release cycle at the segment depth tier —
  breaker not triggered on segment evidence; CONDITIONAL on the target actually possessing depth-tier capability.
- Archived pricing vintages blocked (web.archive.org) — the premium-trajectory rung stays open; retry future session.
- Jobber cadence rests on a secondary bulletin (primary changelog 403) — retry; ST-75 date anomaly unresolved
  (immaterial); Reddit-relayed ServiceTitan renewal-escalation claims unverifiable (Reddit blocked) — not used.

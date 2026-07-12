---
template: ledger
template_version: 2
---

# Findings ledger — Kestrel Sound

<!-- The engagement's evidence spine: the single place a number or claim
becomes citable by everything downstream (storyline claims trace to
finding ids, finding ids trace to source ids). Module agents append;
gdd-librarian keeps hygiene; gdd-red-teamer may change ONLY the status
field.

Rules:
- Append-only. Text of a finding never changes after it lands;
  corrections are new findings whose Notes point back ("supersedes F7").
- Ids sequential, never reused. One claim per finding — "market is $1.1B
  and growing 11%" is two findings.
- Claim states units/currency/period per the taxonomy lock.
- Evidence is a pointer into a module findings file (file#section), not
  a restatement.
- Confidence: H = multiple independent tier<=3 sources or reconciled
  estimate; M = single good source or corroborated estimate; L =
  single weak source, unreconciled estimate, or contested logic.
- Status: OPEN (landed, not yet through a gate) · SUPPORTED (survived
  triangulation) · CONTESTED (red-team kill, disposition pending) ·
  RETIRED (conceded/superseded — kept for the audit trail).
-->

Statuses: OPEN · SUPPORTED · CONTESTED · RETIRED

| ID | Claim | Evidence | Sources | Units/basis | Confidence | Status | Module |
|----|-------|----------|---------|-------------|------------|--------|--------|
| F1 | NA pest-control FSM software spend CY2025 sits in a $55–116M working span; top-down and bottom-up legs did not reconcile within the 30% tolerance after one re-run (TD base $74.4M vs BU base $54.8M, gap 35.8%); residual driver = list-price bias on spend intensity | .diligence/modules/market/FINDINGS.md#reconciliation | S3, S4, S7, S9, S15, S19, S22, S24, S26, S28 | USD $M, CY2025 | L | OPEN | market |
| F2 | Top-down leg: low $55.8M / base $74.4M / high $167M via spend-share chain off the $13.4B US structural services anchor; vendor gross-up chain used as bound only | .diligence/modules/market/FINDINGS.md#top-down-estimate-leg-run-blind-to-bottom-up | S3, S7, S9, S13, S19 | USD $M, CY2025 | L | OPEN | market |
| F3 | Bottom-up leg: low $27.2M / base $54.8M / high $116M via 17.9–22.2k NA operators × tiered penetration × observed price points | .diligence/modules/market/FINDINGS.md#bottom-up-estimate-leg-run-blind-to-top-down | S4, S6, S10, S12, S22, S24, S26, S28 | USD $M, CY2025 | L | OPEN | market |
| F4 | H-mkt-1 is refuted in spend terms: CY2025 in-segment spend is below the ~$200M headroom bar in every defensible construction from either independent leg (max defensible high $167M) | .diligence/modules/market/FINDINGS.md#verdicts | S3, S4, S19 | USD $M, CY2025, spend basis (defined_terms OPEN: no ARR equivalence) | M | OPEN | market |
| F5 | The underlying services demand base is flat-to-growing: US structural pest services +6.0% in 2025 (with a conflicting +1.4% count-basis source recorded); Canada ~2–3% | .diligence/modules/market/FINDINGS.md#verdicts | S3, S5, S11, S13 | % YoY, CY2025, services revenue | M | OPEN | market |
| F6 | The NA pest-FSM vertical supply side is consolidator-owned at the top: FieldRoutes+ServSuite under ServiceTitan (2021–22), PestPac under WorkWave/IFS, Briostack under EverCommerce (2021); no independent vertical vendor at ~$40M-ARR scale is publicly visible | .diligence/modules/competition/FINDINGS.md#competitive-set-and-survivorship | S23, S37, S40, S41, S21 | vendor set, CY2026 present state | M | OPEN | competition |
| F7 | Displacement pool exists but its size straddles the H-comp-1 bar: horizontal FSM tools hold est 20–48% (central ~25–35%, ESTIMATE — normalized vendor counts + review-volume proxy calibrated on PestPac's tracked 2,500) of the ~10.2k digitized NA pest operators; the <10% kill condition is excluded in every construction | .diligence/modules/competition/FINDINGS.md#share-build-and-closure-cross-check | S35, S38, S42, S30, S17, S18, S40 | % of digitized operators (denominator basis F3), CY2025/26 | L | CONTESTED | competition |
| F8 | H-comp-2 joint contradiction: teaser ~$40M ARR (~90% NA ⇒ ~$36M) implies a 31–65% share of the $55–116M span (F1, L, IRRECONCILED); jointly with a #2 rank and the observed vendor set (PestPac est $25–55M alone), consistent only at simultaneous extremes — at most two of {teaser ARR in-segment, #2 rank, F1 span} plausibly hold (ARR≈in-segment spend is a labeled assumption; defined_terms OPEN) | .diligence/modules/competition/FINDINGS.md#share-build-and-closure-cross-check | S28, S30, S18, S26 (+F1, F3) | USD $M, CY2025, share of F1 span | M | OPEN | competition |
| F9 | Closure cross-check violation: vendor-claimed pest customer counts (verticals 7.6–10.1k) plus estimated horizontal presence (2.5–7.0k) exceed the ~10.2k digitized-operator universe in all but minimum constructions; named drivers = multi-vertical/worldwide counts, seats-vs-companies ambiguity (S25 "3,700 users" vs S40 "650 companies"), stale vintages, possible F3 penetration underestimate | .diligence/modules/competition/FINDINGS.md#share-build-and-closure-cross-check | S17, S18, S25, S30, S40, S35, S38 | operator counts, CY2025/26 | M | OPEN | competition |
| F10 | No major horizontal FSM vendor ships native pest-compliance logging functionally comparable to the verticals' as of CY2026: Jobber's marketed "chemical tracking" is a generic custom-forms layer (no state report formats, WDI/WDO, bait-station, or EPA-registration structures); Housecall Pro ships none; ServiceTitan core relies on forms/integrations | .diligence/modules/competition/FINDINGS.md#horizontal-feature-audit | S35, S36 | feature present-state, CY2026 | M | OPEN | competition |
| F11 | H-comp-4's acquisition kill clause is literally triggered: ServiceTitan (largest horizontal) owns pest-compliance capability first-party via FieldRoutes (2022) and ServicePro/ServSuite (2021) — the "share gain from generic tools" leg is therefore partly a contest with a consolidator-owned direct vertical, not an underfeatured generic; contradiction with the brief's set construction reported, not resolved | .diligence/modules/competition/FINDINGS.md#horizontal-feature-audit | S23, S37 | ownership present-state, CY2026 | M | OPEN | competition |
| F12 | Observable switching testimony runs one-way toward verticals: n=4 dated items (3 generic→vertical, 1 vertical→vertical, 0 vertical→generic), chemical-compliance tracking cited in 3 of 4 — direction only; small-n and destination-channel bias preclude magnitude claims | .diligence/modules/competition/FINDINGS.md#switching-testimony-tally | S39, S36, S44 | testimony tally as of 2026-07-08 | L | CONTESTED | competition |
| F13 | Pricing-headroom tension: if teaser scale is real and in-segment, implied target ARPU (~$36M NA ÷ est 1,500–3,000 customers = $12–24k/yr ≈ $1,000–2,000/mo, ESTIMATE) sits at/above vertical-peer mid-market pricing (FieldRoutes ~$350+/mo, PestPac ~$560–1,050/mo @7 users) — the priced-below-peers headroom premise is unsupported and in tension with the scale claim; absorption (KQ3) untested by scope | .diligence/modules/competition/FINDINGS.md#pricing-benchmark | S26, S28, S22, S24, S15, S43 | USD/operator-yr, CY2025/26 list prices | L | OPEN | competition |
| F14 | H-risk-1 split verdict: the federal regulatory record-keeping driver is REFUTED — USDA rescinded the RUP recordkeeping rule effective 2025-07-11 under an explicit deregulation posture; the driver survives only at the state level, where regimes persist but are no longer trending up | .diligence/reports/REDTEAM.md#risk-leaf-verdicts | S45, S46 | regulatory present-state, CY2025-26 | M | OPEN | risks |
| F15 | H-risk-2 holds at the count bar: operator roll-up absorption runs ~1%/yr of the universe (Rollins 26 deals in 2025; ~22 PE platforms tracked), far below the 20%-of-pool kill threshold in-horizon; revenue-weighted composition unresolved | .diligence/reports/REDTEAM.md#risk-leaf-verdicts | S47, S48 | deals/yr vs ~19k universe, CY2025-26 | M | OPEN | risks |
| F16 | H-risk-3 holds on present-state evidence: no observed foreclosure conduct by a funded consolidator (ServiceTitan/FieldRoutes ships cross-vendor integrations; no exclusivity terms surfaced) | .diligence/reports/REDTEAM.md#risk-leaf-verdicts | S47, S49 | conduct present-state, CY2026 | L | OPEN | risks |
| F17 | H-risk-4 holds in-horizon: AI feature motion in pest FSM is incumbent-led (FieldRoutes/PestPac/ServiceTitan paid releases); no AI-native entrant with in-segment traction surfaced | .diligence/reports/REDTEAM.md#risk-leaf-verdicts | S49 | vendor present-state, CY2026 | L | OPEN | risks |
| F18 | Review corpus: Capterra and Software Advice share one review pool (confirmed identical n/rating for GorillaDesk and PestPac) — not additive; G2 is separate but fetch-blocked (snippet only). Volume: verticals 71–402/vendor; horizontals 335–2,742/vendor, zero pest-tagged reviewers in sampled subsets. Window 2014–2026 | .diligence/modules/customers/FINDINGS.md#review-corpus | S51, S52, S53, S54, S55, S57 | review-platform corpus, accessed 2026-07-11 | M | RETIRED | customers |
| F19 | Tenure-direction testimony (n=13) ≈ churn-direction testimony (n=11) across the pest-tagged review corpus — doesn't clear a "dominates" bar. PestPac carries 6 of 11 churn items, cross-corroborated across 3 channels: contract lock-in, a documented Oct-2024 price hike, post-cancellation billing. Direction only, no rate claimed | .diligence/modules/customers/FINDINGS.md#tenure-and-churn-direction-tally | S51, S52, S53, S56 | tier-6 testimony tally, direction-only per D4, as of 2026-07-11 | L | OPEN | customers |
| F20 | Ranked KPC table: price (n≥8) > support (n≥6) > ease-of-use (n≥5) > chemical-compliance logging (n=3–4) > feature completeness (n≥3). Compliance is a clean win-driver (zero counter-evidence) but ranks #4, not top-3 — refutes H-cust-2's frequency bar; triggers C2's axes re-check | .diligence/modules/customers/FINDINGS.md#kpc-table | S51, S52, S53, S54, S58 (+S36, S39, S44, S50) | buyer-language tally, segment-only, as of 2026-07-11 | M | OPEN | customers |
| F21 | Expansion mechanism confirmed: GorillaDesk (per-route, +$50/schedule, SMS/VoIP add-ons), PestPac (branch/size tiers + 5 named modules), FieldRoutes (active-customer-count billing + 2 named add-on products) all price on expandable units with attachable modules. Attach/upgrade testimony present but thin (n=3) | .diligence/modules/customers/FINDINGS.md#expansion-mechanism-scan | S53, S58, S59, S60, S61, S62 (+S15, S22, S24, S26, S28, S43) | pricing present-state, CY2026; testimony as of 2026-07-11 | M | OPEN | customers |
| F22 | Customer-concentration ESTIMATE (risks screen): segment structure favors long-tail/low concentration — Rollins/Terminix run in-house systems (removes the largest whales from 3rd-party pools); ServiceTitan's all-trades top-10 ≈10% of revenue; implied target ARPU ($13.3–26.7k/yr) fits regional-operator pricing tiers. Target-specific share UNREACHABLE outside-in | .diligence/modules/customers/FINDINGS.md#customer-concentration-estimate | S63, S64, S65 (+S30; ARPU basis F8, F13) | USD/customer-yr, CY2025/26, ESTIMATE | L | CONTESTED | customers |
| F23 | One-release-cycle test fails for the horizontals (mechanism: data/workflow depth): across ≥8 observed release cycles (~24 mo — ServiceTitan explicit quarterly cadence ST-69→ST-78 with 2–4-wk point releases; Housecall Pro ~quarterly 10–20-feature bundles; Jobber continuous channel) zero pest-compliance entries and no announced native build; ServiceTitan, owning the capability first-party since 2021–22 (F11), still routes pest demand to FieldRoutes rather than porting depth to core; Jobber's measured closing velocity is one structural increment (bare forms → named settings module; still no EPA DB, state formats, WDI/WDO, bait-station, or mobile capture) in ~2 yrs | .diligence/modules/company/FINDINGS.md#one-release-cycle-test | S68, S69, S70, S71, S89 (+S35, S37, S67; F10, F11) | release-cadence present-state, CY2024–26 | M | OPEN | company |
| F24 | The "compliance moat" is not a regulatory/licensing mechanism: no license or certification attaches to compliance-logging software (EPA applicator certification is person-scoped; USDA prescribes no standard record form; the closest analog, WSDA's WAC 16-228-1320 approval, is a record-FORM content check, not a vendor certification) and no enforcement action against a software vendor was found (2025 FIFRA roundup + federal/CA/DC actions all target operators) — mechanism reclassified to data/workflow depth with regulation-derived demand | .diligence/modules/company/FINDINGS.md#mechanism-reclassification | S72, S73, S74, S75 | regulatory present-state, CY2025–26 | M | OPEN | company |
| F25 | Switching-cost mechanism (data lock + workflow depth) confirmed at the deep-compliance tier, stratified: all 4 verticals run formal migration/data services; export fidelity lossy at the compliance layer (PestPac state-format report logic built-in/non-portable vs raw-CSV data; FieldRoutes thin self-serve CSV vs vendor-gated comprehensive extract; GorillaDesk import excludes service/billing history); FieldRoutes CEO on record that data withholding/delays are industry practice; kill-test partial hit at entry tier only (Housecall Pro ships named turnkey import FROM GorillaDesk; none exists for PestPac/FieldRoutes/Briostack) | .diligence/modules/company/FINDINGS.md#switching-costs-at-the-boundary | S59, S76, S77, S78, S79, S80, S81, S82, S83 (+F19 friction cluster, F12 direction — cited, not re-derived) | vendor present-state, CY2026 | M | OPEN | company |
| F26 | Vertical pricing power refuted on reachable rungs — what exists is switching-cost annuity: entry-tier vertical (GorillaDesk) prices at parity with horizontals' published tiers; mid/upper tiers quote-gated on both sides (premium unobservable from list); the only documented vertical repricing event (PestPac Oct-2024, F19) was contract-monetized with a churn-direction cluster; horizontal side carries its own termination-fee cluster (ServiceTitan BBB, $21.9–67.2k items); no in-page price-change/grandfathering signal on any of 6 pricing pages; archived list-price vintages UNREACHABLE (web.archive.org blocked) | .diligence/modules/company/FINDINGS.md#pricing-power-ladder | S84, S85, S86, S87, S88 (+S59, S60, S61; F13, F19) | USD list prices as of 2026-07-11; testimony direction-only per D4 | L | OPEN | company |
| F27 | Grid consequence — the moat wedge is real but narrow: on F20's KPC rows, chemical/compliance is the only row where verticals categorically beat horizontals (Jobber structured-but-shallow, desktop-only; Housecall Pro none; ServiceTitan-core none native), and that row ranks #4 by buyer frequency — below the three battleground criteria (price/support/ease-of-use) where horizontals are at parity or advantaged; intra-vertical stratification: GorillaDesk's compliance-report depth is thinner than PestPac's | .diligence/modules/company/FINDINGS.md#kpc-comparison-grid | S67, S79, S80, S89 (+S35, S36, S37, S68; F10, F20) | KPC grid present-state, CY2026 | M | OPEN | company |
| F28 | Compliance-moat durability is decay-gated, not dissolving: the rescinded federal RUP recordkeeping layer (F14) is not where the depth driver lives — the driver is multi-state heterogeneity (CA Material/Cal-Ag, AZ TARF, WDI/WDO are state/industry artifacts; state regimes persist present-state, WSDA actively administers form approval) — but demand for compliance depth is wholly derivative of operator obligations (F24), the federal layer has already decayed, and states are no longer trending up: durable in-horizon (CY2030) on present-state evidence, zero evidenced growth tailwind, live tail-risk if states follow the federal posture | .diligence/modules/company/FINDINGS.md#regulatory-decay | S45, S46, S74, S79 (+F14, F24) | regulatory present-state, CY2025–26 | M | OPEN | company |
| F29 | Customer-concentration screen (deal breaker 1) is tripped-unchaseable: the >15%-of-ARR single-customer test cannot be evaluated outside-in; segment evidence (F22 ESTIMATE: Rollins/Terminix self-host removing the largest whales — S107 tier-1 sharpens S63; ServiceTitan filed all-trades top-10 ≈10%; implied ARPU in the regional band) favors long-tail but cannot clear the breaker — recorded as open question with trip evidence, priority data-room item | .diligence/modules/risks/FINDINGS.md#rk1--customer-concentration-screen--breaker-1-promoted-f29 | S63, S64, S65, S107 (+F22, F8, F13) | share of target ARR, CY2025/26 | L | OPEN | risks |
| F30 | Supplier/input-concentration screen clear: five inputs (cloud, payments, SMS/CPaaS, mapping, chemical-compliance data) each show ≥3 credible in-use alternates across the comp set — four distinct payment-processor relationships observed (Stripe, Adyen, in-house PayFac, Fiserv-attributed); chemical data rests on the free EPA registry + ≥2 commercial re-packagers + user-entered EPA-number capture; no sole-source, ≤2-supplier, or chokepoint condition met; near-misses: Stripe clustering (3 of 7), CPaaS backend confirmed at 1 of 7 only, Google-Maps default | .diligence/modules/risks/FINDINGS.md#rk2--supplierinput-concentration-screen-promoted-f30 | S90, S91, S92, S93, S94, S95, S96, S97, S98, S99, S100, S101 (+S79) | vendor present-state, CY2026 | M | OPEN | risks |
| F31 | Platform-dependency screen clear: no >30% demand/delivery concentration through a platform whose terms a vendor doesn't set on any of four angles — technician apps delivery-critical but free/no-IAP (no fee mediation); NPMA channel plural/non-exclusive; largest franchisor self-hosts (BOSS); no lead-gen origination concentration evidenced; watch items carried: app-store background-location policy (Google Play 2026-04-15, enforcement ~Oct 2026; Apple 2.5.4 practice) vs marketed GPS features, and G2's acquisition of Capterra/Software Advice/GetApp (closed 2026-02-05) consolidating the review-discovery pool under one owner | .diligence/modules/risks/FINDINGS.md#rk3--platform-dependency-screen-promoted-f31 | S103, S104, S105, S106, S107, S108, S109 | platform present-state, CY2026 | M | OPEN | risks |
| F32 | Regulatory/licensing screen clear on reachable evidence: no vendor-side license exists to be under review (F24); the enacted rule change is already engaged (F14, worked into F28 decay-gating); litigation/IP quick-confirm across 6 vendors + 9 query families finds zero IP/product disputes touching compliance/FSM products, corroborated by parent-filing self-disclosures (EverCommerce FY2022/FY2025 10-K; ServiceTitan 10-Q Oct-2024) and a negative patent scan; nearest miss out-of-scope: WorkWave data-breach class action, $1.5M settlement prelim-approved 2025-07-07 (data-security, not IP; product not confirmed PestPac) | .diligence/modules/risks/FINDINGS.md#rk4--regulatorylicensing-screen-promoted-f32 | S115, S116, S117 (+F14, F24, F28) | regulatory/litigation present-state, CY2021–26 | M | OPEN | risks |
| F33 | Key-person screen tripped at segment tier, unchaseable at target: the trip condition is live at the comp set's independent tier (GorillaDesk brand/community attached to founder/CEO Chris Moreschi, thin public bench) and a real founder-exit precedent exists (Briostack founder-CEO out ~4 months post-EverCommerce close) though customer/product disruption is not reliably evidenced (ServiceTitan-side deals retained leadership); no single-inventor IP exposure; target rung UNREACHABLE outside-in — retention-terms flag routed to deal team (legal DD's lane), management-meeting/data-room item | .diligence/modules/risks/FINDINGS.md#rk5--key-person-screen-promoted-f33 | S110, S111, S112, S113, S114, S115 (+S40, F6) | segment present-state, CY2020–26 | L | OPEN | risks |
| F34 | Market-structure intake tripped and already escalated: the engagement record names structural risks better-than-remote — headroom refuted/growth gap (F4, F5 vs the 14.9%/yr need), roll-up composition shift (F15), assembled foreclosure structure (F16 caveat), incumbent-led AI velocity (F17), regulatory demand decay (F14/F28) — and every named risk already carries a worked hypothesis leaf or verdict; no new unworked structural risk; degraded-mode note: market FINDINGS have no formal risk-register section, intake read from verdicts/observations per workflow fallback | .diligence/modules/risks/FINDINGS.md#rk6--market-structure-intake-promoted-f34 | (+F4, F5, F14, F15, F16, F17, F28) | cross-module intake, CY2025/26 | M | OPEN | risks |
| F35 | Deal-breaker 2 disposition (compliance moat cosmetic / closable in one release cycle): NOT triggered on segment evidence — one-release-cycle answer NO on cadence evidence (F23), wedge real but narrow at KPC rank #4 (F27), durability decay-gated with zero growth tailwind (F28); CONDITIONAL on the target's own depth class, UNREACHABLE outside-in (teaser premise; standing data-room item) — disposition by citation, no re-analysis | .diligence/modules/risks/FINDINGS.md#rk7--breaker-2-disposition-moat-cosmetic-promoted-f35 | (+F23, F27, F28) | disposition record, CY2026 | M | CONTESTED | risks |
| F36 | Deal-breaker 3 screen (in-segment ARR under half of teaser ARR) cannot clear: the trip scenario is a standing leg of F8's trilemma (escape hatch b / red-team dispute #2 reading A); new comparable-class bound — ServiceTitan non-subscription revenue ≈22–29% of total across two vintages ~18 months apart (S-1 LTM Jul-2024 ≈70/25/5; TTM Apr-2026 recomputed 74.3/22.4/3.6) — so sub-half in-segment ARR requires out-of-segment share ~2× the class maximum; neither confirmable nor excludable outside-in (defined_terms OPEN, no CIM) — recorded open, CIM item | .diligence/modules/risks/FINDINGS.md#rk8--breaker-3-in-segment-arr-under-half-of-teaser-promoted-f36 | S102 (+F8, F13) | USD share of teaser ARR, CY2024–26 comparable basis | L | OPEN | risks |
| F37 | Review-corpus methodology: Capterra and Software Advice expose one shared review pool (identical review counts and ratings observed for GorillaDesk and PestPac, 2026-07-11; both platforms G2-owned per F31 watch item) — volumes are never additive across the pair. Per-vendor counts are platform-reported catalog metadata, used as corpus description only, not market magnitudes | .diligence/modules/customers/FINDINGS.md#review-corpus | S51, S52, S53, S54, S55, S57 | review counts, platform metadata, as-of 2026-07-11 | M | OPEN | customers |

## Notes

- F29–F36 (risks module, v2 standing screens, 2026-07-11): all three
  ENGAGEMENT.md deal breakers mapped to screens — no scoping defect.
  Breaker answers, plain terms: (1) single-customer >15% — UNRESOLVABLE
  outside-in, priority data-room item (F29, L); (2) moat cosmetic — NOT
  triggered on segment evidence, conditional on target depth class (F35,
  citing F23/F27/F28); (3) in-segment ARR < ½ teaser — neither confirmed
  nor excluded; comparable-class bound says it requires ~2× the observed
  class-max out-of-segment mix (F36, L, CIM item). F29/F33 promote at L
  per the tripped-and-unchased rule with open questions cross-referenced
  in STATE.md. S107 retro-sharpens S63 (same Rollins 10-K, now tier-1 via
  company IR mirror — recipe generalizes). S108 (G2 bought Capterra/
  Software Advice/GetApp, closed 2026-02-05) retro-affects F18's
  one-pool methodology engagement-wide. S62 reliability flag: dates the
  Briostack/EverCommerce close "May 2026" vs S40's corroborated Jan-2021
  — librarian review suggested; its narrative claims were not used.

- F23–F28 (company module): mechanism table run across all 7 taxonomy rows —
  4 rows recorded not-claimed (network effects, scale, brand, IP), and the
  regulatory/licensing row FAILS its test (F24), so the engagement-wide label
  "compliance moat" should be read as data/workflow depth from here on.
  Deal-breaker "moat cosmetic / closable in one release cycle": NOT triggered
  on segment evidence (F23), conditional on the target's own depth class
  (UNREACHABLE outside-in — teaser premise, cap M). S35/S37 were re-fetched
  2026-07-11 under their existing ids (append-only; new detail registered as
  S67–S68). F26 confidence L: the archived-vintage rung of the pricing ladder
  is environment-blocked — direction rests on level parity + testimony.

- F18–F22 (customers module): the Capterra=Software Advice shared-review-pool
  finding (F18) generalizes engagement-wide — any future module citing both
  platforms' review counts for the same vendor as additive volume should
  treat them as one pool, not two. G2 was fetch-blocked this session (S57,
  snippet-only) — retry direct fetch in a future session before assuming it
  stays blocked. F20's compliance-ranks-#4 result revises the working
  assumption behind the competition module's positioning axes (see STATE.md
  open questions, axes re-check flag).

- F1 confidence L per size-market protocol (irreconciled after one
  re-run; no averaging). F4 confidence M despite F1's L: the sub-$200M
  read is robust across both independent legs and all constructions —
  the irreconciliation is about WHERE below $200M, not whether.
- S21 (getlatka/WorkWave) is registered but non-load-bearing after the
  TD re-run (rejected input, kept for audit); librarian note pending.
- Sources registry currently carries the odd(td)/even(bu) id scheme
  from the parallel legs (pre-fix toolchain workaround); librarian
  normalization pending. Competition-module sources resume sequential
  ids at S35 (odd/even scheme retired).
- All competition shares cite F1's $55–116M span (L, IRRECONCILED) —
  none carries a point denominator. F8 and F9 are cross-check
  violations promoted as findings per workflows/map-competitors.md
  step 4; F11 records the H-comp-4 kill-clause/set-construction
  contradiction unresolved by design (both readings carried to
  triangulate/red-team).
- F12/F13 confidence L: review-platform and estimate-chain evidence
  (tier 6-heavy per brief's calibration-only rule); direction/tension
  claims only, no magnitudes.

- 2026-07-08 · red-team (gdd-red-teamer): F7 marked CONTESTED,
  disposition pending — the "<10% kill condition excluded in every
  construction" clause rests on the uncalibrated Jobber floor (module's
  own "single weakest input"), and the engagement's own closure check
  (F9) leaves a closure-consistent horizontal share of 1–25%, placing
  the kill condition inside the evidenced range. Revive: disclosed
  horizontal pest-vertical counts, tier-3 data, calibrated horizontal
  review-proxy, or F9 resolution restoring headroom. See
  .diligence/reports/REDTEAM.md kill list; disposition tracked in STATE.md (D8
  enforces).
- 2026-07-08 · red-team (gdd-red-teamer): F12 marked CONTESTED,
  disposition pending — tier-6 sole support (locked hierarchy:
  categorical, never sole support; triangulation advisory A3), and the
  channel is structurally one-way (destination-tool review pages +
  vendor content arm cannot surface reverse flow; the zero-reverse cell
  is uninformative). Revive: one tier-4/5 corroborating item per A3, or
  neutral win/loss channel; alternatively demote to module observation
  (= retire). See .diligence/reports/REDTEAM.md; disposition tracked in STATE.md.
- 2026-07-08 · red-team: H-risk-1 trend clause refuted (federal RUP
  recordkeeping rescission eff. 2025-07-11, S45) — no ledger row exists
  for risk leaves by design, so the refutation is recorded in
  .diligence/reports/REDTEAM.md and STATE.md only; noted here so the ledger's
  audit trail points at it.
- 2026-07-11 · v2 red-team (gdd-red-teamer): F22 marked CONTESTED,
  disposition pending — the "long-tail/low concentration more likely"
  read tests only the top of the market (Rollins/Terminix self-hosting)
  and never examines the PE roll-up-platform channel (F15: ~22 active
  platforms), which counter-research confirms standardizes acquired
  branches onto one vendor as a matter of playbook; at F22's own implied
  ARPU, 225–451 consolidated locations on one vendor clears breaker 1's
  15%-of-ARR bar. Revive: named roll-up-platform vendor-choice
  disclosure (either direction). See .diligence/reports/REDTEAM.md
  v2 sweep kill list; disposition tracked in STATE.md (D8 enforces).
- 2026-07-11 · v2 red-team (gdd-red-teamer): F35 marked CONTESTED,
  disposition pending — the citation chain (F23/F27/F28) tests
  one-release-cycle catch-up against PestPac's depth, the segment's
  deepest vertical; the only segment comparable matching the target's
  stated *independent* ownership (F6) is GorillaDesk, whose depth F27
  itself calls "thinner than PestPac's" — the disposition's reassuring
  headline was never tested against the reference class the target
  actually belongs to. Revive: a segment comparable that is both
  independent-owned and PestPac-deep (none currently exists), or direct
  target evidence of depth class. See .diligence/reports/REDTEAM.md
  v2 sweep kill list; disposition tracked in STATE.md (D8 enforces).

<!-- Cross-references, merge notes, supersessions, and D8 disposition
records for CONTESTED findings. -->

- F37 supersedes F18 (triangulate D4 FAIL 2026-07-11: review-volume
  magnitudes framed as market quantities on tier-6 sole support, outside
  the tally-of-testimony carve-out). Reworded so the platform metadata is
  the OBJECT of the claim (corpus description), per the carve-out's
  logic; F18 RETIRED, audit trail intact.
- F36 bound recomputed at triangulate 2026-07-11: ServiceTitan
  non-subscription mix re-derives to ≈26–30% (vs the row's 22–29%);
  direction and the ~2×-class-max trip requirement unchanged. Advisory
  only; the row stands with this note as the corrected bound.
- 2026-07-11 · F7/F12 disposition review at v2 red-team (orchestrator
  record of the sweep's rulings): F7 stands CONTESTED, unrevived — no
  new evidence calibrates the Jobber floor or resolves F9's closure
  violation. F12 stands CONTESTED but sharpened toward revival: S82/S83
  (tier 4, in-record) show Housecall Pro's migration marketing omits
  the verticals — a revealed-preference signal free of the original
  destination-channel bias, one rung short of A3's revive bar. Both
  remain declared disputes for storyline v2 unless a module revives.

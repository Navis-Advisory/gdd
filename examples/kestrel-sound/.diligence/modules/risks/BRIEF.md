---
template: module-brief
template_version: 2
---

# Module brief — risks (Kestrel Sound)

Tree branch: C5 — "nothing structural kills the thesis" (KQ5).
Execution note: this module is answered via the red-team sweep
(/gdd:red-team), whose preconditions are a non-empty ledger and,
preferably, a completed triangulation — so the sweep itself lands in
week 3 per WORKPLAN.md. Evidence gathering for the four leaves below
can and should start earlier (week 2) as ordinary research. The leaves
are the FLOOR of the sweep, not its ceiling: the red-teamer also
attacks market/competition findings per its attack-pattern library and
builds the thesis-level counter-thesis ("what plausible world makes
the deal bad with every number right"). Access constraints: public web
only, WebSearch snippets only; no tier-3 data; no data room.

## Hypotheses under test

Convention: each leaf is phrased as the survival condition; the
red-team's job is to try to refute it. A refuted leaf is a candidate
deal-killer, marked CONTESTED in LEDGER.md with a disposition tracked
in STATE.md.

**H-risk-1.** The regulatory driver holds: chemical-use record-keeping
obligations on NA pest-control operators (EPA/FIFRA framework plus
state rules) remain in force or tighten through CY2030; no enacted or
advanced-stage deregulation, federal preemption, or free
government-provided compliance tooling that removes the paid
compliance-workflow value driver.
- Confirms: current obligations in force across major states; recent
  trend stable or tightening; no advanced legislative/agency proposals
  to remove record-keeping burdens or provide free state tooling.
- Kills: enacted or advanced measures removing record-keeping
  obligations, or a free government-run compliance/reporting system
  live or funded in one or more major states.

**H-risk-2.** Customer-base consolidation does not gut the addressable
pool: the observed roll-up pace of NA pest-control operators (Rollins,
Rentokil/Terminix, Anticimex et al.) does not imply ≥20% of the
independent operator base moving onto acquirer-standardized systems
within the CY2025–CY2030 horizon.
- Confirms: acquisition counts vs the operator universe imply <20%
  absorption at the observed pace, or acquirers demonstrably keep
  acquired branches on third-party FSM.
- Kills: observed pace plus acquirer tech-standardization disclosures
  imply ≥20% of the pool leaving third-party SMB FSM in-horizon.
- MECE note vs H-mkt-4: mkt-4 tests the aggregate base (counts and
  revenue); this leaf tests the *composition* shift (independent →
  consolidator-owned). Evidence here is M&A announcements and acquirer
  tech-stack disclosures, not aggregate counts.

**H-risk-3.** No foreclosure by a funded consolidator: no larger FSM
player (e.g. WorkWave/FieldRoutes under PE ownership, ServiceTitan
post-IPO) is executing bundling, below-market pricing, or
exclusive-channel conduct (franchise networks, distributor deals) that
structurally forecloses a #2 vertical player from the segment.
- Confirms: no evidence of loss-leader bundles, exclusivity
  arrangements with franchises/distributors, or sustained below-market
  pricing moves by a materially larger player.
- Kills: documented foreclosure conduct by a materially larger player
  (bundle pricing that makes standalone vertical FSM uneconomic,
  channel exclusives covering a large share of operators).

**H-risk-4.** No AI-native commoditization in-horizon: AI-driven
scheduling/routing/compliance entrants — or horizontal vendors' AI
features — are not on a funded, shipping trajectory that commoditizes
the core pest-FSM workflow by CY2030.
- Confirms: no funded AI-native FSM entrant with a live product
  winning pest operators; horizontals' AI features additive to paid
  plans rather than substitutive/free.
- Kills: funded entrants with shipping products taking pest-control
  customers, or credible evidence core scheduling/compliance workflows
  are being given away as AI features by players with distribution.

## Analyses planned

- Regulatory scan: EPA/FIFRA record-keeping requirements, major-state
  rules and pending changes → H-risk-1.
- Roll-up pace build: acquisition counts by major consolidators vs
  operator universe (consumes the market module's operator-universe
  work by F-id where available) → H-risk-2.
- Conduct scan: pricing moves, bundle announcements, channel/franchise
  deals of larger FSM players → H-risk-3.
- Entrant scan: funding announcements and product launches in
  AI-for-field-service; horizontal AI feature releases → H-risk-4.
- Thesis-level counter-thesis per the red-team attack-pattern library
  (multiple paid at ~6× ARR, channel shift, platform risk) — built
  from whatever the modules found, not limited to these leaves.

## Sources to hit

- EPA (FIFRA record-keeping), state pesticide regulators — tier 2.
  Egress caveat: some .gov hosts proxy-blocked from this environment;
  register fallbacks with the caveat, per SOURCES.md practice.
- Rollins 10-K, Rentokil annual report (roll-up pace, strategy
  language), ServiceTitan S-1/10-K — tier 1.
- Company press releases, investor decks, pricing pages — tier 4.
- Trade press (PCT/PMP M&A trackers, consolidation coverage) — tier 5.
- Funding press (AI-FSM entrants) — tier 5.

## Dependencies

- Consumes: LEDGER.md market and competition findings (sweep
  precondition: ledger non-empty; scheduled after triangulate per
  workflows/red-team.md); market operator-universe finding for the
  H-risk-2 denominator, by F-id.
- Consumed by: storyline (risk section of the IC memo); STATE.md open
  questions (every kill needs a disposition: revive / retire /
  declared dispute — D8 enforces at the next triangulate).

## Done means

- Each of H-risk-1..4: verdict recorded (survives / refuted-candidate-
  killer / unresolved + what's missing) in .diligence/reports/REDTEAM.md per its
  template (this module writes REDTEAM.md, not a FINDINGS.md — it
  executes as the red-team sweep).
- Kills marked CONTESTED in LEDGER.md (status field only); each kill's
  disposition tracked as a STATE.md open question.
- state.json.gates.red_team and STATE.md gates updated by the
  orchestrator on completion.
- Unresolved is acceptable; an invented resolution is not.

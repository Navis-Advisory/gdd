---
template: module-brief
template_version: 2
---

# Module brief — competition (Kestrel Sound)

Tree branches: C2 — "share gain from generic/horizontal FSM tools is
credible" (KQ2) — and C3a, the supply-side half of the pricing lever
(relative price headroom). C2's implicit enabler ("the compliance moat
is real and durable", KQ4) is OUT OF SCOPE this run: this module tests
only the observable present state of competitors, never moat
durability. The demand-side half of pricing (customers absorb
increases without churn, KQ3) is likewise OUT OF SCOPE. Taxonomy:
locked segment definition incl. boundary cases (horizontal FSM revenue
from other trades is the displacement pool, not the market; test
value: 20-truck termite specialist on ServiceTitan → IN market,
competitor-supplied). Access constraints: public web only, WebSearch
snippets only; no tier-3 data; no data room; no expert calls.

## Hypotheses under test

**H-comp-1.** The displacement pool exists: generic/horizontal FSM
tools (e.g. Jobber, Housecall Pro, ServiceTitan) supply ≥25% of
*digitized* NA pest-control operators today.
- Confirms: share build per the estimation ladder (customer counts ×
  ARPU where disclosed; review-volume proxies calibrated against a
  player with known revenue, labeled ESTIMATE) puts horizontals at
  ≥25% of digitized in-segment presence.
- Kills: vertical specialists (FieldRoutes, WorkWave/PestPac,
  GorillaDesk, Briostack, Fieldwork et al.) collectively hold nearly
  all digitized share, leaving <10% with generics — the "share gain
  from generic tools" leg then has almost nothing to displace.

**H-comp-2.** KestrelSoft is the #2 FSM vendor by in-segment presence
among NA pest-control operators (client's prior, stated in
ENGAGEMENT.md — tested, not assumed).
- Confirms: share build puts exactly one vertical or horizontal
  player ahead of KestrelSoft in-segment.
- Kills: ≥2 players each clearly larger in-segment.
- FLAG (access): the target is private and its public footprint may
  be thin; 'unresolved' is an acceptable verdict. Any ARR-based share
  framing leans on the OPEN defined_terms field — same handling as
  H-mkt-1 (explicit labeled assumption until locked).

**H-comp-3.** Observable switching runs generic → vertical, for
vertical-fit reasons: public switching testimony (review-site "switched
from X", forum/community posts) shows generic-to-vertical moves
outnumbering the reverse among pest operators, with chemical-compliance
logging among the stated reasons.
- Confirms: a dated tally of public switching testimony, both
  directions counted, with generic→vertical dominant and compliance
  named as a driver in a material fraction.
- Kills: the reverse flow dominates, or compliance never appears among
  stated switching reasons — the thesis's share-gain *mechanism* is
  then unsupported even if the pool (H-comp-1) exists.

**H-comp-4.** Horizontal incumbents have not closed the vertical gap
(present-state check): as of CY2026 no major horizontal FSM vendor
ships chemical-application/compliance logging functionally comparable
to the vertical tools'.
- Confirms: feature pages, release notes, help-center docs, and
  integration marketplaces show no such native capability.
- Kills: a major horizontal has shipped or formally announced
  pest-compliance features (incl. via first-party acquisition).
- Boundary: whether the gap would *survive* a determined incumbent
  (the one-release-cycle test) is KQ4 moat durability — OUT OF SCOPE;
  the red-team may still attack the dismissal from the risks side.

**H-comp-5.** Relative pricing headroom exists: KestrelSoft's
like-for-like list pricing is at or below comparable vertical FSM
peers for equivalent tiers/seat counts.
- Confirms: public pricing pages / disclosed price points put
  KestrelSoft at or below the vertical-peer median, like-for-like.
- Kills: KestrelSoft already prices at a clear premium to vertical
  peers — the pricing lever is likely already spent.
- Boundary: whether customers would *absorb* increases (churn
  response) is KQ3 — OUT OF SCOPE this run; the memo must carry the
  headroom finding with that caveat attached.

## Analyses planned

- Set construction from taxonomy boundary cases: direct verticals,
  adjacent horizontals selling into the segment, substitutes
  (spreadsheets/paper — competition while penetration <100%).
  Survivorship check via customer testimony and job postings, not
  "top N" listicles → H-comp-1, H-comp-2.
- Positioning grid on segment buying criteria (compliance depth ×
  operator size served — derived from win/loss evidence, and said so,
  since the taxonomy does not imply axes) → H-comp-1, H-comp-4.
- Share build per the estimation ladder, every share citing the
  market module's ledger denominator by finding id → H-comp-1,
  H-comp-2. Cross-check: named shares + fringe ≈ 100% of the sized
  market; violations are findings, not footnotes.
- Switching-testimony tally, dated, both directions → H-comp-3.
- Pricing benchmark table, like-for-like tiers → H-comp-5.
- Horizontal feature audit (release notes, docs) → H-comp-4.

## Sources to hit

- Vendor pricing/feature pages, release notes, customer-count claims —
  tier 4.
- ServiceTitan S-1/10-K (horizontal economics, vertical strategy
  statements) — tier 1.
- Review platforms (Capterra, G2, Software Advice) — tier 6: leads and
  calibration input only, never sole support for a ledger finding.
- Job postings (vendor GTM focus; operator tech stacks) — tier 4.
- Trade press (PCT/PMP vendor coverage, funding news) — tier 5.

## Dependencies

- Consumes: market module headline size finding (share denominator, by
  F-id). If share math starts before that F-id exists, shares are
  labeled "of estimated market (unsized)" per workflows/map-competitors.md.
- Consumes: taxonomy lock v1; defined_terms OPEN affects ARR-framed
  share math (see H-comp-2 flag).
- Consumed by: risks/red-team (set survivorship and the
  horizontal-dismissal are named attack patterns); storyline (share-gain
  and pricing legs of the doubling math).

## Done means

- Each of H-comp-1..5: verdict recorded (confirmed / refuted /
  unresolved + what's missing) in modules/competition/FINDINGS.md.
- Competitive set, positioning, and share estimates promoted to
  LEDGER.md with confidence, tiers, and the denominator F-id.
- Review-proxy shares carry the ESTIMATE label and their calibration.
- Unresolved is acceptable (esp. H-comp-2 given a thin public
  footprint); an invented resolution is not.
- Open questions filed in STATE.md.

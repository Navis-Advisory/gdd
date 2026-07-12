---
template: redteam-report
template_version: 2
---

# Red-team report — Kestrel Sound · 2026-07-08

Written by gdd-red-teamer (full sweep, no $ARGUMENTS scope). The risks
module (H-risk-1..4, `.diligence/modules/risks/BRIEF.md`) executes
inside this sweep per its brief; its verdicts are recorded in the
"Risks-module sweep" section below. Targeted counter-research ran under
the same environment constraint as the modules (WebSearch snippets
only, WebFetch blocked; tiers registered conservatively); new sources
S45–S50 appended to `.diligence/SOURCES.md`. Target-specific
counter-research is impossible (fictional target, no public footprint)
— the attack surface is the engagement's own evidence and logic, plus
the real landscape the risk leaves point at.

## Counter-thesis

The sponsor is being asked to pay ~6× ARR — roughly $240M — for a
company whose entire addressable segment spends $55–116M a year on
software (F1), i.e. 2–4× the total annual spend of the market the
thesis says it will grow into. The engagement's own arithmetic (F8)
shows the three headline claims — teaser ARR in-segment, #2 rank, and
the sized market — cannot jointly hold except at simultaneous extremes,
so at least one is wrong, and every branch of that trilemma is bad for
the deal: if the ARR is real and in-segment, KestrelSoft already holds
31–65% of a small market and "doubling" means taking most of what
remains from consolidator-backed incumbents; if the ARR includes
payments or other verticals, the compliance-moat thesis does not cover
the revenue being bought and the 6× is priced on the wrong asset; if
the market is really much bigger than sized, the client is relying on
the one leg of the diligence its own two independent constructions
contradict. Every stated growth lever then fails on the record: market
growth — H-mkt-1 is refuted in spend terms (F4) and the demand base
grows at 1.4–6.0%/yr against the 14.9%/yr the thesis needs; share gain
from generics — the displacement pool's ≥25% floor rests on an invented
Jobber estimate that the engagement's own closure check (F9)
contradicts (F7 killed below), and the largest "generic" is
ServiceTitan, which did not leave the vertical gap open but bought it
(F11) and is now shipping AI features off a $961M-revenue R&D base
(S49); pricing — the implied ARPU already sits at or above vertical-peer
mid-market levels (F13), so the lever is spent before absorption (KQ3,
out of scope) is even asked. Even the regulatory tailwind is moving the
wrong way: the federal RUP recordkeeping rule was rescinded effective
July 2025 under an explicit "err on the side of deregulation" policy
(S45), refuting the "stable or tightening" premise of H-risk-1's
confirm clause. The most plausible world consistent with every number
in this ledger: a small, GDP-growth, consolidator-owned segment in
which the target is already the market rather than a challenger in it,
bought at a multiple that only retention economics could justify — and
retention is the one thing the client scoped out.

## Kill list

| Finding | Why it dies | What would revive it |
|---------|-------------|----------------------|
| F7 (horizontals hold est 20–48% of digitized operators; "<10% kill condition excluded in every construction") | The exclusion clause rests entirely on the Jobber floor (2,000 = 2% of its >100k all-trades base), which the module itself calls a "pure ESTIMATE" and its open questions call "the single weakest input in M2" — no calibration exists for any horizontal (the stated calibration anchor, PestPac's tracked 2,500, validates verticals only). Worse, the engagement's own closure check (F9, confidence M) contradicts the clause: if vendor-claimed vertical counts (7.6–10.1k) are near-true against the ~10.2k digitized universe, residual room for horizontals is 0.1–2.6k → 1–25% of digitized operators — the <10% kill condition sits INSIDE the closure-consistent range, not excluded by evidence but by the choice of an uncalibrated floor. (If instead the universe is undersized — F9's alternative driver — F7's stated range is wrong for that reason.) Either way the finding as written cannot carry H-comp-1. | Any one of: a disclosed Jobber/Housecall Pro pest-vertical customer count; tier-3 data (none this engagement); a review-proxy calibration against a horizontal with a known pest count; or resolution of F9's closure violation in a direction that restores headroom for the 2.5–7.0k horizontal estimate. |
| F12 (switching testimony runs one-way generic→vertical, compliance cited in 3 of 4) | Two independent defects. (1) Tier: rests solely on tier-6 sources (S39, S36, S44) — the locked hierarchy is categorical ("never sole support for a ledger finding"); triangulation already carried this as advisory A3 and it does not survive a hostile partner review as a ledger row. (2) Structure: the channel can only see one direction — 3 of 4 items come from the destination tool's own review page and a competing vendor's content arm; leavers of a category stop reviewing, and the "zero reverse items" cell was searched in vendor-SEO-saturated space, so even the direction claim is generated by the channel's geometry, not by the market. n=4 cannot distinguish a real one-way flow from a one-way lens. | One tier-4/5 corroborating item (trade-press coverage of switching, a vendor case study registered at tier 4 with incentive note) — per A3's remediation — or neutral-channel data (win/loss, expert calls; unobtainable this engagement). Alternatively: demote to a module-findings observation cited as color, which is retirement, not revival. |

CONTESTED markers set on F7 and F12 in LEDGER.md (status field only);
disposition-pending notes appended in the ledger Notes section;
dispositions tracked as STATE.md open questions (D8 enforces at the
next triangulate).

Risk-leaf kill with no ledger row to mark: **H-risk-1's trend clause is
refuted** (see Risks-module sweep) — recorded here and in STATE.md, not
in LEDGER.md, because the risks module produces no findings rows by
design.

## Risks-module sweep (H-risk-1..4 verdicts)

Per `.diligence/modules/risks/BRIEF.md` done-means, verdicts recorded
here (this module writes REDTEAM.md, not a FINDINGS.md).

| Leaf | Verdict | Basis |
|------|---------|-------|
| H-risk-1 (regulatory driver holds through CY2030) | **refuted in part — candidate deal-killer at the trend level** | The kill clause ("enacted … measures removing record-keeping obligations") is literally satisfied at the federal level: USDA rescinded the 7 CFR 110 restricted-use-pesticide recordkeeping regulations, final rule effective 2025-07-11, with an explicit stated policy to "err on the side of deregulation" and that enforcement of these rules is "not a priority" (S45, tier 2). The confirm clause ("recent trend stable or tightening") is therefore false. The leaf does not die whole: the operator compliance burden is mostly state-level and remains in force (CA/WA 2-yr, NY 3-yr retention; state application-record and client-disclosure rules persist — S46), general FIFRA label obligations stand, and no free state-run compliance tooling surfaced. But the value driver the thesis calls a moat now rests on state regimes alone while the federal direction of travel through the horizon is deregulatory — the CY2030 durability premise is weakened by an enacted, not hypothetical, event. Disposition required (STATE.md). |
| H-risk-2 (roll-ups don't move ≥20% of the pool off third-party FSM) | survives at the count bar; unresolved revenue-weighted | Observed pace: Rollins 26 acquisitions in 2025, 94 over three years (S48); ~22 active PE roll-up platforms with the most active at 5–7 disclosed deals/yr each; PE = 60% of pest M&A 2024–25 and H2-2025 volume +12% YoY (S47, tier 6, directional). Order of magnitude: low hundreds of operators/yr absorbed against a 16.5–19k universe ≈ ~1%/yr by count — ≥20% of the pool in 5y is not implied. BUT acquirers systematically take the largest, ARPU-richest operators (the target's implied customer class per F13), and count-basis absorption materially understates revenue-basis absorption. What's missing: acquirer tech-standardization disclosures (does an acquired branch leave third-party FSM?) — unobtainable snippet-only. |
| H-risk-3 (no foreclosure conduct by a funded consolidator) | survives on present-state conduct evidence | Conduct scan found no loss-leader bundles, franchise/distributor exclusives, or sustained below-market pricing by a materially larger player; FieldRoutes' 2025 "Bundles" release is customer-facing service bundling (pest+termite+mosquito on one invoice), not vendor bundle-pricing (S49). Confirms clause met. Carried caveat: the *structure* for future foreclosure is fully assembled — all three large vertical platforms consolidator-owned (F6), the largest horizontal owns the leading vertical first-party (F11) — so this survives as a present-state check, not as comfort about the horizon. |
| H-risk-4 (no AI-native commoditization in-horizon) | survives in-horizon | No funded AI-native FSM entrant with a live product winning pest operators surfaced; AI capability is arriving as paid-plan features of the incumbents themselves — FieldRoutes AI route optimization (Ignite 2025), PestPac "WAIve" (Jan 2026), ServiceTitan's Atlas platform on $961M FY2026 revenue (S49) — additive, not substitutive/free. Confirms clause met. Corollary that feeds the counter-thesis rather than the leaf: the AI feature race is being run by consolidator-owned platforms with public-company R&D scale, raising the velocity bar a ~$40M independent must match through CY2030. |

## Survivors of note

- **F4 (H-mkt-1 refuted in spend terms) — attacked from the
  thesis-defender's side and held.** Steelman: "the $55–116M span is
  too low; the real market clears $200M." Failed on three counts: the
  two legs' cheapest defensible constructions agree within 2% ($55.8M
  vs $54.8M) from disjoint price inputs; the BU leg's own supplier-side
  cross-check ($55–70M) lands in the same place; and even granting the
  full residual-gap driver (list-price bias, +25–35% on both legs) the
  market does not approach $200M in any construction. Also attacked
  from my side: S3 (TD anchor) and S4 (BU counts) share a root study
  (Specialty Consultants), partially compromising leg independence —
  but the BU count is independently triangulated (census S6, PCT S8,
  TX registry S10) and the shared study contributes different figure
  classes to each leg, disclosed in D2. The deal-negative core of the
  market work is the sturdiest thing in this ledger.
- **F8 (joint-contradiction trilemma) — every escape hatch tested,
  none opens.** (a) "F1's span-top understates": see F4 above — and an
  F1 big enough to dissolve F8 (~$250M+ for a 15% share at #2 behind
  one larger player) requires BOTH legs wrong by >2× in the same
  direction against their own cross-checks. (b) "ARR includes
  out-of-segment lines": concedes the counter-thesis — the moat thesis
  then doesn't cover the revenue being bought. (c) "#2 rank is wrong":
  concedes the client's prior. The trilemma is load-bearing for the
  counter-thesis and survives.
- **F10 (no horizontal ships comparable native compliance) — attacked
  and inadvertently corroborated.** Attack: a negative existence claim
  built on what snippets did not show, in an environment where product
  docs could not be opened, should not carry M. Counter-research aimed
  at reviving the horizontal threat instead surfaced independent 2026
  audits stating the absence positively: Jobber "lacks a built-in
  chemical log or regulatory compliance module … no FIFRA chemical
  tracking," job forms "not FIFRA-structured" (S50, agreeing with S35's
  own marketing framing). The claim now rests on positive third-party
  statements of absence plus the vendor's own feature framing, not on
  silence. Residual caveat stands: corroboration is tier-6/snippet-
  grade; the D4 fetch-capable re-audit remains owed.
- **F5 (demand base flat-to-growing) — attacked on the +6.0% figure,
  held on the claim as written.** The +6.0% is single-root (Specialty
  Consultants via NPMA, survey-based, member-skewed) and conflicts 4×
  with S5's +1.41%; but the ledger claim is directional
  ("flat-to-growing") and holds under either source. Any storyline use
  of the +6.0% magnitude — as opposed to the direction — would not
  survive this attack; the conflict is already recorded for H-mkt-2.
- **F13 (pricing-headroom tension) — robustness-tested before being
  relied on.** The 1,500–3,000 customer base is invented, so I stressed
  it: even at 5,000 customers implied ARPU is ~$600/mo, and at the
  absurd limit of the entire 10.2k digitized universe it is ~$300/mo —
  still at or above small-vertical list levels and far above the
  micro-tier price points. The tension direction is invariant to the
  estimate; it holds anywhere in the plausible range.

## Unresolvable disputes

| Dispute | Reading A | Reading B | What would settle it |
|---------|-----------|-----------|----------------------|
| Where the true CY2025 market sits in/above the $55–116M span (F1's residual list-price-bias driver) | List-price constructions are right; market ≈ $55–70M | Negotiated/add-on pricing runs 25–35% above list on both legs; market ≈ $75–116M, possibly slightly above | Vendor revenue disclosure or an expert call on realized-vs-list FSM pricing (tier 3 — no access this engagement). Note: neither reading rescues H-mkt-1 or dissolves F8. |
| Which leg of the F8 trilemma fails (teaser ARR in-segment · #2 rank · F1 span) | ARR is largely out-of-segment (payments/other verticals) — teaser overstates the in-segment asset | Rank or span claim fails — target is either not #2 or holds an implausibly dominant share | CIM revenue composition + management definitions (defined_terms lock); data-room access. Owner: user/client. Until then no storyline claim may treat teaser ARR as in-segment. |
| F11 dual reading: is H-comp-4 confirmed (native-core check) or killed (acquisition clause literally triggered)? | The brief's set construction is right: FieldRoutes is a direct vertical, so no "horizontal closed the gap" — H-comp-4 stands | The kill clause means what it says ("incl. via first-party acquisition"): the largest horizontal owns the capability outright, so C2's displacement leg is partly a contest with a consolidator, not a generic | A client/IC ruling on what C2's "share gain from generic tools" is meant to include — definitional, not evidentiary; re-inclusion of KQ4 would force the question. Both readings must appear in the storyline risks section. |
| H-risk-2 revenue-weighted composition shift (count-basis survives; revenue-basis unknown) | ~1%/yr count absorption ⇒ the pool is intact through CY2030 | Acquirers take exactly the large, ARPU-rich accounts F13 implies the target lives on; revenue-weighted absorption is a multiple of count-weighted | Acquirer tech-stack standardization disclosures or churn-by-cohort data from the target (data room / KQ3 — out of scope and out of reach). |

## Toolchain notes for the orchestrator

- D8 becomes runnable: two CONTESTED rows (F7, F12) + one risk-leaf
  refutation (H-risk-1, no ledger row) need dispositions.
- The storyline may not rest key lines on F7 or F12; H-comp-1 and
  H-comp-3 currently have no un-contested ledger support.
- Mandatory carry-forwards: F11 dual reading and the F8 trilemma into
  the storyline risks section (storyliner checks this list).

---

## v2 sweep 2026-07-11 (F18–F37 + screens + breakers)

Written by gdd-red-teamer, v2 sweep, no `$ARGUMENTS` scope. Covers every
load-bearing finding that landed since the 2026-07-08 v1 sweep (F18–F37),
the six standing risk screens plus the two ad-hoc breaker rows (F29–F36),
and the three ENGAGEMENT.md deal breakers, per the mandatory attack list.
`/gdd:scan-risks` already ran and `.diligence/modules/risks/FINDINGS.md`
exists, so per `red-team.md` step 3 the risk-leaf-verdict ledger exception
does **not** apply this sweep — the screens are attacked like any other
module's findings (status-field edits only), not re-derived as new ledger
rows. No "Risk-leaf verdicts" section below for that reason.

Targeted counter-research (WebSearch/WebFetch) ran this session against
the real segment (target counter-research remains impossible — fictional
target, no public footprint, unchanged from v1). Environment: g2.com,
web.archive.org, sec.gov confirmed still blocked; Capterra=Software
Advice reconfirmed as one shared pool via a fresh direct fetch (below).
**Deviation, flagged for the librarian:** this sweep's write scope per
its task brief is REDTEAM.md + LEDGER.md status fields + STATE.md +
state.json only — narrower than v1's own practice of registering new
sources (S45–S50). Fresh evidence below is cited inline by URL/quote
instead; none of it is yet in SOURCES.md. If any of it gets promoted to
a formal finding, it needs S-numbering first.

### Counter-thesis — strengthened

The v1 counter-thesis stands and is **strengthened** by the five-module
record, not merely carried forward. Its arithmetic core (F1–F13,
untouched by the scope extension) is unchanged: ~6× ARR against a
$55–116M segment, the F8 trilemma, H-mkt-1 refuted. What the v2 modules
add is almost uniformly corroborating for the counter-thesis, not
balancing: (1) the one NEW customer-facing lever the client named
(compliance-driven share gain) is **refuted on its own frequency bar** —
F20 ranks compliance #4 behind price/support/ease-of-use, triggering the
C2 axes re-check; (2) the "moat" the client's thesis rests on is
confirmed to exist but **reclassified as a decaying-demand asset with a
switching-cost-annuity monetization pattern, not brand power** — F24 (no
vendor-side license), F28 (federal layer already rescinded, state regimes
"no longer trending up," zero growth tailwind), F26/H-co-3 (pricing power
refuted; the one documented vertical repricing event triggered a
churn-direction cluster, not a stayed-and-paid-more story); (3) retention
itself, the client's own named "opaque from outside" concern
(ENGAGEMENT.md deal objective), comes back genuinely unresolved rather
than reassuring — F19 finds tenure-direction testimony merely
**approximately equal to** churn-direction testimony, with the segment's
largest named peer (PestPac) carrying a cross-corroborated
contract-lock-in/billing cluster that reads as involuntary retention, not
loyalty. The only new pro-thesis data point is H-cust-3 (expansion
mechanism confirmed) — real but thin (n=3 testimony) and structural only
(pricing models permit expansion; nothing shows it's actually happening
at scale). This sweep's own work adds two further threads that sharpen
the counter-thesis specifically: the risk-module's breaker-2 "not
triggered" disposition (F35) rests on a citation chain built from the
segment's *deepest* vertical, not a comparable that matches the target's
stated *independent* ownership profile (killed below); and the
breaker-3 comparable-class ceiling (F36) is plausibly conservative once a
real in-segment vertical's payments-monetization aggressiveness is
examined (below), not merely the all-trades ServiceTitan comparable.
Structurally, the record's own gates already say this: D6 currently
FAILs because no rebuilt storyline has yet answered TREE.md's v2
GATE-OWNED sufficiency condition net of F18–F36 — and on the balance of
what those 22 findings actually show, a rebuild is more likely to harden
the "No — and not marginally" v1 answer than to soften it.

### Kill list

| Finding | Why it dies | What would revive it |
|---------|-------------|----------------------|
| F22 (customer-concentration ESTIMATE: "long-tail/low concentration more likely than concentrated") | Survivorship in the analysis: the directional read tests only the *top* of the market — Rollins/Terminix self-hosting (S63/S64), ServiceTitan's all-trades top-10 ≈10% (S65) — and never examines the PE roll-up-platform channel, which the engagement's own F15 documents as active (~22 platforms tracked, most active 5–7 disclosed deals/yr) and which fresh counter-research (WebSearch, 2026-07-11, ctacquisitions.com PE roll-up materials) confirms follows a deliberate "standardize on one vendor" post-acquisition integration playbook — cited rationale: uniform tooling across acquired branches "makes a business more attractive to potential investors." At F22's own implied ARPU band ($13.3–26.7k/yr), a single roll-up platform consolidating **225–451 acquired locations onto one third-party FSM vendor** clears 15% of a $40M-ARR target's ARR (recomputed, executed below) — a materially more plausible concentration mechanism for a company this size than "whales self-host" rules out, and one F22's four cited sources never touch. This is not a magnitude claim (I don't know whether any actual platform reaches that count on one vendor) — it is a gap in the finding's own survivorship: the segment's most active, fastest-growing consolidation channel is absent from a "who's the biggest customer" analysis. | Named-roll-up-platform vendor-choice disclosure (does a real platform run 200+ acquired pest locations on one FSM vendor, and which one) — settles via trade press, data room, or vendor case-study naming; alternatively, evidence that pest PE platforms standardize on in-house/enterprise systems (Rollins-style) rather than third-party FSM at consolidation scale, which would restore the "whales self-host" logic to cover this channel too. |
| F35 (breaker 2 disposition: moat cosmetic/one-release-cycle — NOT triggered on segment evidence) | Hedge-clause attack, unexamined reference-class assumption: "disposition by citation, no re-analysis" cites F23/F27/F28, all of which run the one-release-cycle and durability tests against the *deep* end of the vertical spectrum — PestPac's NPMA-33/99-A/B, CA Material/Cal-Ag, AZ TARF built-in report types (F23, S79). But the only segment comparable that actually shares KestrelSoft's stated profile — **independent ownership**, not consolidator-backed (F6: "no independent vertical at ~$40M-ARR scale is publicly visible") — is GorillaDesk, and F27 states outright that "GorillaDesk's compliance-report depth is thinner than PestPac's." The one-release-cycle test was never run against the shallower depth an independent vendor is more likely to hold; Jobber's own measured closing velocity (F23: "bare forms → named settings module… one structural increment in ~2 yrs") is closing on *that* bar, not PestPac's. The citation chain answers "can a horizontal catch PestPac" (no) while the breaker asks "can a horizontal catch KestrelSoft" — a materially easier question if the target's true depth resembles the segment's only ownership-comparable rather than its deepest incumbent. The qualifying clause ("CONDITIONAL on the target's own depth class, UNREACHABLE outside-in") is already disclosed in F35's own text, but the citation chain's headline reassurance outruns what F23/F27/F28 can actually support for the target's likely reference class — the hedge doesn't just narrow the claim, on inspection it removes most of its value. | A segment comparable that is *both* independent-owned *and* holds PestPac-class depth — none currently exists in the record, per F6 — or direct evidence of KestrelSoft's own state-format coverage/depth tier from a data room or product walkthrough (already the open question F35 itself names as a standing item). |

Executed check (F22 kill, roll-up scale needed to trip breaker 1):

```
$ python3
15% of $40M teaser ARR = $6,000,000
at ARPU $13,300/yr -> 451 locations needed
at ARPU $26,700/yr -> 225 locations needed
-> 225-451 acquired locations on one vendor clears the breaker; plausible
   for an active multi-year roll-up platform, not examined by F22
```

### Deal-breaker attack log (mandatory, all three)

| Breaker | Attack attempted | Result |
|---|---|---|
| 1. Single customer >15% of ARR | PE-roll-up-platform concentration mechanism (new, sourced above) | **Kills F22's directional lean** (→ CONTESTED). F29 itself already said "cannot clear the breaker… recorded as open" (not a clean pass), so its ledger disposition is unchanged — but the narrative comfort it borrowed from F22 ("favors long-tail") is undercut. This breaker is now the *least* reassured of the three, not merely "open." |
| 2. Compliance moat cosmetic / closable in one release cycle | Reference-class mismatch / hedge-clause attack (above) | **Kills F35** (→ CONTESTED). The citation chain is sound *for PestPac*; it was never extended to cover the target's actual (independent-vendor) reference class. |
| 3. In-segment ARR < half of teaser ARR | Comparable-class ceiling test: is ServiceTitan (all-trades, enterprise, public) the right ceiling, or does an in-segment *vertical* run non-subscription monetization even harder? Fresh direct fetch, workwave.com/fintech/faq (same URL as S96), 2026-07-11: **"WorkWave Payments is the exclusive integrated payment processing option for WorkWave customers, as WorkWave will no longer be supporting the integration of any outside payment processing or gateway solutions."** — stronger and more recent-sounding than S96's already-registered "only integrated processing option" language; WorkWave (PestPac's owner) has moved to mandatory in-house payments with zero customer choice, a more aggressive non-subscription-monetization posture than anything documented at ServiceTitan. | F36 **survives** as a ledger row — it was already honestly hedged ("cannot clear… not confirmable, not excludable outside-in"). But the attack sharpens the counter-thesis: the class-max non-subscription ceiling triangulate corrected to 26.0–30.0% (advisory A11) is plausibly *conservative* for a vertical specifically, meaning the ~1.67–1.93× out-of-segment multiple F36/A11 says breaker 3 would need is, if anything, an *undercount* of how close a real vertical's mix could plausibly run. Feeds the counter-thesis without changing F36's status. |

### Survivors of note

- **F19 (tenure≈churn, n=13 vs n=11) — attacked and held, with new
  evidence added, not subtracted.** Hypothesis tested: does churn's
  n=11 double-count Capterra and Software Advice testimony, given the
  engagement's own F37 establishes these are one shared review pool
  (byte-identical for PestPac specifically)? Direct fetch,
  capterra.com/p/23130/PestPac/reviews/, 2026-07-11, checked against the
  four fact-patterns F19 cites: found **four distinct, individually
  dated/named reviewers** — Traci V. (2024-08-07, "$1,200 to get out of
  this contract"), a Dec-2022 Verified Reviewer ("$40k to leave"), plus
  two items **not quoted in F19's own text** — Pat M. (2025-12-10,
  contract-deadline misrepresentation) and Ron H. (2025-07-03, "insist
  on continuing to bill me for the entire contract"). No duplication
  found; if anything the tally is conservative (undercounts by at least
  the two unquoted items). The October-2024 price-hike item cited in
  F19 was not located on this specific fetch (pagination-limited, not
  disconfirmed) — minor open item, not a defect. Attack failed cleanly.
- **F20 (KPC ranking, compliance #4) — the specific top-3 exclusion
  holds; the #4-vs-#5 ordering does not, and doesn't need to.** Tested
  whether small, closely-spaced counts (n≥8 > n≥6 > n≥5 > n=3–4 > n≥3)
  can support a strict total order. They can't at the bottom: compliance
  (n=3–4) and feature-completeness (n≥3) overlap and could tie or flip.
  But the claim that actually carries H-cust-2's refutation — compliance
  is *not top-3* — survives, and survives more robustly than it looks:
  price/support/ease-of-use are stated as open-ended floors ("≥N",
  true counts could be much higher) while compliance is stated as a
  closed interval ("n=3–4… unchanged since F12 despite a dedicated
  search") — i.e. the weaker three criteria's counts are *understated*
  relative to compliance's, not overstated, so the gap between rank 3
  (≥5) and rank 4 (3–4) is if anything conservative. The #4-vs-#5
  ordering is cosmetic; nothing downstream (F27's grid consequence) uses
  it.
- **F23/F10/F24 — attacked with fresh, independently-run hostile
  searches; all three held, via the negative-existence pattern's "hunt
  for positive evidence of X and for third-party positive statements of
  absence" test.** Fresh WebSearch, 2026-07-11: "Jobber pest control
  chemical compliance tracking feature update 2026," "ServiceTitan
  native pest compliance EPA chemical tracking 2026 announcement,"
  "Housecall Pro pest control chemical compliance EPA feature 2026" —
  no dated 2026 announcement of any horizontal shipping deeper
  pest-compliance capability found; independent aggregator commentary
  again states the absence positively ("Housecall Pro does not have
  native FIFRA-structured chemical tracking… no native WDI templates, no
  bait station tracking"; Jobber "does not include a built-in
  EPA-approved pesticide product database"), corroborating rather than
  contradicting F10/F23. Separately, "state pesticide applicator
  recordkeeping software approval certification requirement 2026" found
  nothing beyond WA's already-registered form-content check (S74) —
  corroborates F24's "no vendor-side license exists anywhere" claim
  under a fresh, more state-exhaustive-sounding query.
- **F30 (supplier/input concentration, clear) — attacked on its
  weakest-flagged input; the payments finding sharpens but does not
  flip the verdict, and the CPaaS gap remains genuinely open.** Direct
  fetch of workwave.com/fintech/faq (quote above) confirms PestPac's
  payments are mandatory in-house with zero third-party alternative —
  real, and stronger than the registered S96 language — but this is
  vendor-owned infrastructure lock-in for WorkWave's *own* customers,
  not a third-party chokepoint *risk to* a vendor; F30's text already
  correctly classes it as the "in-house PayFac" relationship type among
  four distinct payment paths across the comp set, so the screen's
  "≥3 credible alternates across the comp set" test still clears. (The
  finding this new fact actually sharpens is F25/H-co-1, switching
  costs — a mandatory proprietary-payments relationship is a lock-in
  mechanism F25's data-export-only analysis doesn't currently examine;
  noted for whoever next revises the company module, not actionable
  here under this sweep's status-only ledger remit.) Fresh hostile
  search on the screen's own flagged weakest input ("PestPac OR
  GorillaDesk OR FieldRoutes SMS text messaging provider Twilio
  integration") found nothing that resolves it either way — the
  5-of-7-unconfirmed CPaaS gap F30 already flags stays open, not
  upgraded to a kill.
- **F31/F32/F33 — attacked with fresh hostile searches; all three held.**
  "NPMA pest control franchise software mandate exclusive vendor
  requirement" and a franchise-brand-specific follow-up found no
  exclusivity condition — corroborates F31's "plural, non-exclusive"
  read. A PestPac/GorillaDesk/FieldRoutes/WorkWave litigation/breach
  hostile search surfaced nothing beyond the already-registered WorkWave
  settlement (S117) — corroborates F32. A GorillaDesk-founder search
  found no 2026 succession, co-founder, or departure news — corroborates
  F33's "thin bench, unresolved at target" read (and does not resolve
  it, since the trip condition was always about the independent tier in
  general, not a specific departure event).
- **F26/F27 — attacked on a "table-stakes underweighting" theory;
  held.** Tested whether frequency-tallied KPCs systematically undercount
  gating criteria (something so assumed-necessary that satisfied buyers
  never mention it) relative to perennial SaaS complaint categories
  (price/support, which dominate any software category's review corpus
  regardless of vertical). Real methodological tension, but F27's own
  language already stops short of the overclaim this would refute —
  "the thesis's share-gain arithmetic cannot assume the wedge decides
  most deals" is a modest, correctly-scoped conclusion, not "compliance
  doesn't matter." F26 similarly already scopes its refutation to
  "reachable rungs" with confidence L. Both hold.
- **H-cust-3/F21 (expansion mechanism, confirmed) — attacked on a
  confidence-labeling-asymmetry theory; held.** Checked whether F21's
  clean "confirmed" verdict sits on a double standard next to F19/F20's
  more hedged "unresolved"/"refuted" verdicts in the same module, given
  its own upgrade-testimony is thinner (n=3) than either. It doesn't:
  H-cust-3 is an *existence* hypothesis ("an expansion mechanism is
  observable"), tested and cleanly confirmed on objective, first-party,
  directly-fetched pricing-page structure (3 of 3 vendors checked show
  expandable units + named add-ons) — a categorically stronger evidence
  class than testimony tallies. The thin testimony is disclosed as a
  separate caveat about whether the mechanism is *used*, not folded
  into the existence verdict. No inconsistency once the hypotheses'
  different claim types are accounted for.
- **F4/F8/F10/F13 (v1 survivors) — not re-attacked, but independently
  re-corroborated by v2 evidence without new effort.** F10 was
  re-verified present-state by the company module itself (S67/S68,
  2026-07-11) before this sweep even started. F13's implied-ARPU
  tension ($12–24k/yr) is now independently reproduced by F22's
  concentration build ($13.3–26.7k/yr) via a wholly different
  construction (concentration/ARPU-implied vs peer-pricing-implied) —
  two unrelated methods landing in the same band strengthens rather
  than merely repeats the v1 finding.

### F7 / F12 — standing v1 CONTESTED dispositions, revisited

Per instructions, no ledger-row edits on these two — ruling stated here
for the orchestrator/user to record.

**F7 (horizontals hold est 20–48% of digitized operators): STANDS
CONTESTED, unrevived.** None of F18–F37 supplies the specific evidence
the v1 disposition named as a revive path (a disclosed horizontal
pest-vertical customer count, tier-3 data, a calibrated review-proxy, or
resolution of F9's closure violation). The nearest candidate — F18/F37's
"zero pest-tagged reviewers in sampled subsets" of Jobber/HCP/
ServiceTitan review corpuses — is genuinely ambiguous: consistent with
either a small real horizontal pest footprint (which would tighten
toward F7's kill condition, not away from it) or a sampling/
detection-power artifact against Jobber's large, mostly-non-pest
customer base. It doesn't calibrate the Jobber floor either way, and F9's
count-closure violation is untouched by any new module. Standing dispute
continues into the next sweep unchanged.

**F12 (switching runs one-way generic→vertical): STANDS CONTESTED, but
materially closer to partial revival than at v1 — the customers/company
corpus is exactly the kind of evidence the disposition was waiting for,
and it delivers a genuinely new datum, one rung short of the stated bar.**
Two 2026-07-11 re-checks (CU3's "3 searches"; CU4's kill-test) both
re-confirm zero reverse-flow items, but from the *same* categorically-
blocked neutral channels (Reddit, mypmp.net) the original CONTESTED
critique already named as unreached — re-confirming an absence from a
still-blocked channel does not newly satisfy "one tier-4/5 corroborating
item." But S82/S83 (tier 4, direct-fetched, already in the record for a
different purpose — F25's switching-cost kill-test) supply something
categorically different: Housecall Pro's own 40+-source migration-FROM
marketing list names GorillaDesk but omits PestPac/FieldRoutes/Briostack
entirely. This is a **revealed-preference signal from a horizontal's own
competitive-poaching investment**, not self-selected reviewer testimony —
it does not share the "destination-channel bias" defect the original
CONTESTED critique identified, because Housecall Pro has every incentive
to market a switch-from-PestPac path if it believed one existed and chose
not to. This corroborates F12's "0 vertical→generic" cell specifically
(it says nothing about the "compliance-driven" causal claim on the other
three cells). Ruling: **does not clear A3's stated bar** — the
remediation text's own examples ("trade-press coverage of switching, a
vendor case study… with incentive note") describe a *direct account of an
actual switching event*, and S82/S83 is an *inference from a marketing
list's omission*, one step more indirect. CONTESTED stands, but flag
S82/S83 to whoever makes the eventual revive/retire call as the strongest
non-tier-6-adjacent evidence found on this question since the v1 kill.

### Unresolvable disputes (new, added this sweep)

| Dispute | Reading A | Reading B | What would settle it |
|---------|-----------|-----------|----------------------|
| Does the segment contain a reference class for "$40M-ARR independent vertical vendor" at all, or only "small+shallow independent" and "large+deep consolidator-owned" (feeds the F35 kill) | KestrelSoft is *sui generis* in the segment (F6 already flags no comparable exists) — its depth class is genuinely unknowable outside-in, and F35's "not triggered" should be read as silent, not reassuring, on the target | The independent-scale/deep-compliance combination is simply rare, not impossible — KestrelSoft could plausibly be the segment's first instance, in which case PestPac's depth (not GorillaDesk's) is the right benchmark for a $40M vendor's serious investment level | A data-room state-format coverage list / product walkthrough (already the standing F35/company-module open question) — no outside-in construction resolves this |
| Does the pest-control PE roll-up channel (F15) create real single-customer concentration risk for a $40M independent third-party FSM vendor, or does roll-up scale itself eventually push platforms toward in-house systems (Rollins/Terminix precedent), capping any one platform's third-party spend before it reaches 15% of a $40M vendor's ARR (feeds the F22 kill) | Roll-ups are still building; several platforms plausibly run 200+ locations on a single third-party vendor today, well within F22's arithmetic | The Rollins/Terminix precedent shows the *end state* of consolidation is in-house — any platform approaching the scale needed to trip 15% is also approaching the scale at which it would rationally build/buy its own system, self-limiting the risk before it materializes | Named roll-up-platform vendor-choice disclosure at scale (data room or trade press) — currently absent from the record on both sides |

### Dogfood friction (attack-pattern library gaps)

- **The "hedge clauses" pattern doesn't distinguish a hedge that
  properly narrows a true claim from one that silently swallows the
  entire disposition.** F35's qualifying clause ("CONDITIONAL on target
  depth class, UNREACHABLE") is disclosed exactly as the pattern
  prescribes, yet the kill required a further step the pattern doesn't
  name: checking whether *any* evidence in the citation chain actually
  covers the qualifying condition's true range, or only its most
  favorable case. A worked example distinguishing "hedge that narrows a
  claim" (fine) from "hedge that reveals no cited evidence covers the
  subject's likely case" (kill) would make this pattern reproducible
  without reinventing it per-engagement.
- **The "moat claims" one-release-cycle test doesn't flag reference-class
  matching when it's run on a stand-in comparable because the target is
  unreachable.** The company module correctly ran the test against
  PestPac (the best available benchmark); nothing in the pattern's
  wording prompts checking whether PestPac is the *right* stand-in for
  the target's actual scale+ownership profile before the disposition
  reuses the test's answer. This bit both the module and, initially, this
  red-team pass. Suggested addition: "when proxying a target with a
  segment comparable, confirm the comparable matches the target's stated
  scale/ownership class, not just its category, before citing the test's
  result as the target's answer."
- **No named pattern for "a structural defect discovered in one finding
  propagating to sibling findings built the same way."** F18/F37
  discovered Capterra=Software Advice is one shared pool; a natural next
  step is checking every OTHER testimony tally sourced from the same two
  platforms (F19, F20) for the same double-count risk. I did this by
  hand (direct fetch) and it happened to survive — but the library
  currently leaves "does a discovered defect propagate to siblings" to
  red-teamer initiative rather than naming it as a required check once
  triggered.
- **The "deal breakers" negative-existence sub-clause doesn't cover
  "disposition by citation, no re-analysis" rows.** F35 explicitly
  declines to re-derive evidence and just cites F23/F27/F28 — the
  relevant failure mode here isn't "no search trail" (there is one,
  upstream) but "does the cited evidence's scope actually generalize to
  the disposition's subject." This is really a third, distinct pattern
  (call it *citation-chain / proxy-evidence scope mismatch*) that the
  current three module-level patterns (evidence/logic/thesis) don't
  cleanly name, even though this sweep's strongest kill (F35) is exactly
  that pattern.
- **No workflow guidance on whether a v2 sweep should re-attack a prior
  sweep's risk-leaf verdicts (H-risk-1..4, v1, no ledger rows) or treat
  them as superseded by the v2 standing screens.** I treated H-risk-1..4
  as out of this sweep's remit (F14–F17 are cited-by-id, never redone,
  by the risks module's own v1/v2 split) and focused on F29–F36 instead
  — reasonable, but the workflow text doesn't say so explicitly, and a
  differently-reasoned red-teamer could plausibly have re-opened
  H-risk-1..4 too.

### Deviations from the shipped workflow, this sweep

- Wrote SOURCES.md-eligible evidence (WorkWave FAQ quote, Capterra
  reviewer names/dates, PE roll-up characterization) inline in this
  report rather than registering new S-ids, per this sweep's narrower
  stated write scope (REDTEAM.md + LEDGER.md status + STATE.md +
  state.json only) — a deliberate narrowing versus v1's own practice
  (S45–S50). Flagged above and here so a librarian pass can promote/
  register these if the kills stand.
- No "Risk-leaf verdicts" section: correctly omitted per red-team.md
  step 3's own conditional (`/gdd:scan-risks` already produced
  risks/FINDINGS.md this engagement).
- Two ledger rows moved to CONTESTED (F22, F35) — outside the two
  findings (F7, F12) the task's read-first briefing named as "standing"
  disputes; both are new-this-sweep kills within the explicitly named
  attack-target list (F22/F29 concentration structure; F35 breaker-2
  citation-chain soundness), not scope creep.

### Toolchain notes for the orchestrator (v2)

- D8 becomes runnable again: ledger CONTESTED set is now {F7, F12, F22,
  F35} — two carried, two new. Both new kills need eventual dispositions
  (revive/retire/declared dispute) tracked as STATE.md open questions,
  same as F7/F12.
- The rebuilt storyline (owed per D6's FAIL) may not rest key lines on
  F22 or F35 any more than it may on F7/F12; F29 (customer concentration,
  breaker 1) and F35's own breaker-2 disposition now read as *less*
  reassuring than their pre-sweep text, not more — the storyline rebuild
  should reflect that, not just re-import the module text verbatim.
- Mandatory carry-forwards into the storyline risks section: both new
  unresolvable disputes above, plus the existing four from v1 (unchanged,
  still standing) and the F7/F12 rulings above (both stand, F12 sharpened
  toward — not at — revival).

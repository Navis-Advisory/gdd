---
template: triangulation-report
template_version: 2
---

# Triangulation report — Kestrel Sound · 2026-07-08

> These checks establish internal consistency and traceability of the
> work product. They do not establish that the estimates are true.

Taxonomy lock: **present** — `state.json.taxonomy_lock` v1 read as the
authority (TAXONOMY.md cross-checked, consistent). Full sweep, no
$ARGUMENTS scope: gate-eligible.

Environment constraint, stated up front: WebFetch is blocked in this
environment, so no web source could be re-opened at verification time.
All engagement sources were originally gathered via WebSearch snippets
(recorded per source row), so the D4 says-what-claimed spot-check ran
against registry-recorded locator figures, not live pages, and link
liveness could not be tested. Impact stated under D4.

## Gate result

**PASS** — checks D1, D2, D3, D4, D5, D7 run and passed; D6 and D8 N-A
with reasons (structurally unrunnable before storyline and red-team
respectively — see those sections). No FAILs. No waiver requested or
recorded.

Scope of this PASS: it covers internal consistency and traceability of
F1–F13 and their artifacts as of 2026-07-08. It does **not** cover
thesis sensitivity (D6) or red-team disposition (D8) — **a re-run of D6
is mandatory after /gdd:storyline and of D8 after /gdd:red-team**; this
gate does not certify either. Six advisory (non-gating) defects are
listed after the checks for the owning modules/librarian.

## Checks

### D1 Units, currency, time basis — PASS

- Walked all 13 ledger rows: every quantitative finding carries units,
  currency, and period in the Units/basis column; no bare numbers
  (F1–F4, F8 USD $M CY2025; F5 % YoY CY2025; F7 % of digitized
  operators CY2025/26 with denominator basis named; F13
  USD/operator-yr; F6/F10/F11 dated present-state; F12 dated tally).
  Module findings headers state "USD $M, CY2025, per taxonomy lock v1".
- Time basis: CY throughout, matching the lock (CY base 2025). CY2026
  "present state" labels on feature/ownership claims are dated
  explicitly — no FY/CY mixing found.
- One currency pair in play (CADUSD, locked 0.7025 @ 2026-07-06, S1).
  Recomputed the one conversion in the record (executed block below):
  CAD 2.8B × 0.7025 = US$1.967B vs recorded "≈US$1.97B" ✓; S2
  corroboration 1/1.4208 = 0.7038, 0.19% off the lock, matching the
  recorded "within 0.2%" ✓.
- No unexplained conversions; the TAXONOMY.md FX caveat (BoC tier-2
  source unreachable, tier-5 substitute recorded, supersession path
  named) is carried on S1/S2 correctly.

### D2 Top-down / bottom-up reconciliation — PASS

- Both legs exist and were run blind (module findings record the
  independence protocol; reconciliation done by the orchestrator).
- Recomputed both legs (executed block below):
  TD Chain A 13,416 × 1.10 × 0.60 × 0.70 × 1.2% = **$74.4M** ✓ (low
  @0.9% = $55.8M ✓); BU 11,800×40%×$0.9k + 5,400×70%×$4.0k +
  1,520×90%×$14k + 280×97%×$60k = **$54.8M** ✓.
- Gaps recomputed: first return |96.5−54.8|/54.8 = **76.1%** ✓; after
  the one protocol re-run |74.4−54.8|/54.8 = **35.8%** ✓ — outside the
  30% tolerance (taxonomy_lock.reconciliation_tolerance_pct = 30).
- The >tolerance outcome is handled exactly per the size-market
  protocol's outside-tolerance branch: ordered diagnosis recorded
  (definition ✓ / penetration ✓ / culprit = tier-6 Chain B weight),
  one re-run of the weaker leg with the other withheld, then
  **irreconciled as a ledger finding at LOW confidence with both legs
  shown (F1) and no averaging** (the $96.5M geomean was within-TD
  across its own chains and was demoted on re-run, not a cross-leg
  average). Residual-gap driver named (list-price bias on spend
  intensity), with the two legs' list-price constructions agreeing
  within 2% ($55.8M vs $54.8M — recomputed ✓).
- Independence: ledger source sets for F2 (S3, S7, S9, S13, S19) and
  F3 (S4, S6, S10, S12, S22–S28) are disjoint by id; no
  cross-references between leg sections. Noted honestly: S3 (TD
  revenue anchor) and S4 (BU firm/technician counts) are the same
  underlying Specialty Consultants study using **different figures**,
  registered separately with the BU row recording that revenue figures
  were not used — disclosed, disjoint-figure use of a shared anchor
  study; not contamination under the "shared non-anchor sources"
  clause, but recorded here so no one discovers it later.
- Registry note: the FAIL clause fires on a gap beyond tolerance
  "without a recorded divergent-assumption diagnosis." The diagnosis
  is recorded, the irreconciled state is itself a protocol-conforming
  ledger finding (F1, L), and no averaging occurred — so this check
  passes on process while the market remains **irreconciled**, which
  every downstream consumer sees via F1's confidence L and the
  point-free $55–116M span.

### D3 MECE audit — PASS

- Taxonomy segment walked against the lock: exclusions (horizontal FSM
  revenue from other trades, hardware, services revenue) applied in
  both legs and in the competition set. Boundary cases tested:
  the locked test value (20-truck termite specialist on ServiceTitan →
  IN, competitor-supplied) is honored — ServiceTitan core sits in the
  set as an in-segment adjacent horizontal; lawn-care ≥50% rule applied
  as pest-share adjustments (GorillaDesk ~55–60% pest, FieldRoutes
  count haircut for lawn); consumer DIY exclusion applied (S27 rejected
  partly for possible consumer-app inclusion).
- Hypothesis tree (TREE.md v1): 13 leaves, each with one owning module;
  out-of-scope branches (C4, moat enabler, C3 demand half) named
  rather than silently dropped; the H-mkt-4 / H-risk-2 near-overlap is
  explicitly sharpened to distinct evidence classes; the C3 split
  across two modules is declared. No unowned leaf, no silent gap.
- Leaf sums recomputed (executed block below): BU size-mix
  11,800+5,400+1,520+280 = 19,000 = the claimed 19.0k universe ✓;
  weighted penetration 53.4% ≈ claimed ~54% ✓; digitized 10.14k ≈
  claimed ~10.2k ✓ (rounding); micro digitized 4.72k ≈ 4.7k ✓;
  M2 vertical totals 7,600–10,100 ✓ and horizontal totals 2,500–7,000 ✓
  sum exactly from their rows; F7's normalized 20–48% recomputed
  (19.8–47.9%) ✓.
- The one genuine partition defect in the record — vendor counts
  exceeding the digitized universe (10.1–17.1k vs ~10.2k, recomputed ✓)
  — is not a hidden MECE failure: it is promoted as finding **F9** with
  named drivers, per the map-competitors closure rule ("violations are
  findings, not footnotes"). FieldRoutes' dual nature (vertical product,
  horizontal owner) is likewise carried as the reported F11
  contradiction, not a silent overlap: the set partitions by product,
  each product appears exactly once.

### D4 Citation coverage & tier adequacy — PASS

- Trace stats (executed block below): **13 findings → 41 registered
  sources; 66 citation instances; dangling: 0; unregistered: 0.**
- Tier adequacy: every finding except F12 has ≥1 tier-4-or-better
  source. Load-bearing weak inputs are flagged in-row where they exist
  (S21 tier 6 flagged as "single weakest load-bearing input" and
  demoted to bound-only on the TD re-run; S42 tier 6 registered as a
  documented bad-input candidate, "directional only"). Tier discipline
  is conservative and consistent: paywalled/officially-sourced figures
  reached only via snippets were capped (census-grade S6 → 5, 10-K
  S7 → 4), with S12 kept at 2 defensibly (official StatCan page text
  quoted directly in-snippet vs S6's third-party re-hosts).
- **F12 judgment call, recorded openly:** F12 rests solely on tier-6
  sources (S39, S36, S44). D4's FAIL clause fires on tier inadequacy
  *without* a flag; F12 is heavily flagged (confidence L,
  direction-only, no-magnitude, channel-bias caveats in the row, the
  ledger notes, and the module). The claim is itself a tally of what
  tier-6 channels say, so no higher-tier support can exist for it in
  principle. Verdict: not a FAIL under the registry clause — but this
  sits in tension with the locked hierarchy's categorical "tier 6 …
  never sole support for a ledger finding," so it is carried as
  advisory defect A3 with a remediation for the competition module and
  ultimately the user's call.
- Spot-check (sample = max(3, 20% of 13) = 3, selected by weight; no
  storyline exists yet so "key-line-load-bearing" was proxied by
  gate-relevance: F4, F8, F1):
  - F4 · S3/S4/S19 · consistent — the $13,416M anchor, 16,565-firm
    count, and penetration claims recorded in those rows are the leg
    inputs from which the sub-$200M conclusion re-derives ✓.
  - F8 · S28/S30/S18/S26 · consistent — every arithmetic step
    re-derived (executed block below): $36M NA; 31–65% of span;
    top-2 floor $72M = 129%/85%/62% of span low/mid/top; named-set
    floor $105M ≈ span top ✓.
  - F1 · S15/S22/S24/S26/S28 pricing rows · consistent — recorded
    price points bracket the BU tier prices ($0.9k–$60k/operator-yr)
    and the recomputed gap/span match the row ✓.
  - **Constraint:** these are registry-internal checks (claim vs
    recorded locator figure). Fetch-level says-what-claimed
    verification and link-liveness could not run (WebFetch blocked) —
    the same constraint under which the sources were gathered. A
    misquote *of the original snippet into the registry row* cannot be
    ruled out from inside this environment. Verdict impact: PASS
    stands on what was checkable; a fetch-capable re-run should
    re-execute this spot-check before final readout.
- Hygiene (advisory, not FAIL conditions): registry id gaps S29/S31/
  S33 from the retired odd/even scheme (librarian normalization already
  pending per ledger note); 32 source rows' Supports columns carry
  chain-role text but no F-ids (including S43, which F13 cites);
  9 sources not yet cited by any ledger finding (S1/S2 FX lock plus
  S8, S14, S16, S20, S27, S32, S34 — module build inputs; end-of-
  engagement librarian sweep applies).

### D5 Cross-artifact consistency — PASS

- Grepped headline quantities across all of `.diligence/` (LEDGER,
  both module FINDINGS, STATE.md, TREE.md, TAXONOMY.md, WORKPLAN.md,
  state.json, briefs): $55–116M span (7 artifacts/11 sites), 35.8%
  gap (3), TD $74.4M / BU $54.8M (all sites agree), teaser $40M → $36M
  NA (consistent incl. ENGAGEMENT.md's "~$40M ARR band"), 31–65%
  share (3), ~10.2k digitized / ≈54% penetration / ≈46% substitutes
  (complementary ✓), FX 0.7025 (4 + state.json), tolerance 30 (4 +
  both json), ~$200M bar (TREE/BRIEF/FINDINGS/LEDGER), $167M high,
  PestPac $25–55M (E5′ basis matches F8's use). **No two artifacts
  state materially different values for any quantity.**
- STATE.md agrees with state.json on gates and module statuses
  (pre-update).
- Rounding note (tolerated per check text): the working span's low
  edge is $55.8M by construction, written "$55–116M" — 1.4% down-round
  on the edge label; F8's 65% derives correctly from 55.8. Advisory A6
  suggests stating the edge at the ledger's own 3 s.f.
- The workplan's forward-looking dependency ("shares started before
  the size F-id are labeled 'of estimated market (unsized)' and D5
  flags them") has no instances: every competition share cites F1
  by id. ✓

### D6 Thesis sensitivity — N-A

**Reason it could not run:** no sensitivity analysis exists yet — no
sensitivity table, no storyline (the check's run step verifies the
table, recomputes a flex, and checks flip points "are reflected in
risk language," i.e. in storyline artifacts that do not exist).
`/gdd:storyline` has not run and is itself gated on this gate.

Reasoning for N-A rather than FAIL, since the registry's FAIL clause
reads "no sensitivity analysis": (1) on a first full sweep the
workflow order (triangulate → red-team → storyline) makes D6
structurally unrunnable — the same class as D8, whose pre-red-team
N-A the execution notes call expected and fine; (2) reading it as FAIL
would deadlock the pipeline (FAIL blocks storyline; the storyline is
where the sensitivity artifact lives); (3) the report template's own
example wording endorses exactly this disposition: "D6 N-A: no
sensitivity table exists yet" — which is itself the remediation.
**A FAIL reading becomes correct on any sweep run *after* the
storyline exists; D6 must be re-run then, and this gate's PASS does
not certify sensitivity.**

Carried forward explicitly: TREE.md assigns the GATE-OWNED sufficiency
check ("do evidenced lever magnitudes compound to ≥2× ARR in 5y net of
retention") to "triangulate (D6) and … the storyline." It cannot be
answered pre-storyline either; noting for the record what the evidence
currently shows: the thesis needs 14.9%/yr compounded (recomputed
below); H-mkt-1 is refuted in spend terms (F4), H-mkt-2 is unresolved
with base rates of 1.4–6.0% (services) and tier-6-only software CAGRs,
and F8/F13 contradict the share/pricing levers' joint headroom —
the sufficiency question lands at the storyline with no evidenced
lever currently carrying its required magnitude. This is context, not
a check verdict.

### D7 Plausibility & base rates — PASS

- Implied ratios computed in the executed block below:
  1. Implied spend per digitized operator: $54.8M / 10.14k = **$5.4k/yr
     ≈ $450/mo** — inside the cited price-point band (GorillaDesk
     $49–245/mo per route through PestPac $560–1,050/mo), not absurd.
  2. Implied software intensity: $5.4k against $810k average services
     revenue per US firm ≈ **0.67%**, same order as the TD leg's
     0.9–1.2% intensity assumption — the two legs imply mutually
     plausible intensities.
  3. Top-operator concentration: Rollins $3,761M ≈ 25% of the $14.8B
     NA services market; with Rentokil NA (~$4B order, distribution
     to be excluded per S9's note) the top-2 lands ~40–50%, so the TD
     leg's 40% in-house exclusion (E2 = 0.60) is the right order.
  4. Implied share vs named competitors (the classic absurdity check):
     teaser $36M vs PestPac est $25–55M implies the target must exceed
     the incumbent leader's midpoint to hold #2 — **an implausibility
     the findings themselves surface and work (F8, F13)** rather than
     bury; likewise revenue closure ($58–135M named set vs $55–116M
     span) is surfaced as F9.
  5. Growth vs base rates: thesis needs 14.9%/yr; cited bases are
     +1.4% to +6.0% (services, S5-vs-S3 conflict itself recorded) and
     5.6–12.5% (software, tier-6 global) — gap acknowledged (H-mkt-2
     unresolved, ledger note).
- No implied ratio is absurd *and* unacknowledged — the FAIL condition.
  The record's distinctive property is that its implausibilities are
  its findings.

### D8 Red-team disposition — N-A

**Reason:** `.diligence/reports/REDTEAM.md` does not exist; the red-team gate is
not-run (state.json); the risks module is pending by design ("executes
as red-team sweep"). Per the execution notes, N-A before the first
red-team run is expected. No CONTESTED finding exists in the ledger
(all F1–F13 are OPEN), so there is nothing to diff. Re-run after
/gdd:red-team.

## Failures & remediations

**No FAILs — gate PASS.** Advisory defects (non-gating; would not
survive a stricter reading and are cheap to fix now), with owners:

| # | Defect (artifact + site) | Owner | Remediation |
|---|---|---|---|
| A1 | SOURCES.md id gaps S29/S31/S33 from the retired odd/even (td)/(bu) scheme — violates "ids sequential" | gdd-librarian | Complete the pending normalization note: either register tombstone rows for the three gap ids ("never issued — scheme artifact") or renumber with a dated mapping table; do not silently reuse the ids |
| A2 | 32 source rows' Supports columns carry chain-role text but no F-ids (incl. S43, which F13 cites) | gdd-librarian | Backfill F-ids into Supports as they now stand (F1–F13 mapping is fully derivable from the ledger's Sources column) |
| A3 | F12 (LEDGER.md) rests solely on tier-6 sources (S39, S36, S44) — flagged, but the locked hierarchy says tier 6 is never sole support for a ledger finding | competition | Either corroborate with ≥1 tier-4/5 item (e.g., trade-press coverage of switching, a vendor case study registered at 4 with incentive note) or demote F12 to a module-findings observation cited by the memo as color; user's call which |
| A4 | Canada uplift bound: S11's implied +14.7% exceeds the E1 range used (+8–12%) while S11 is described as setting the upper bound (market FINDINGS #top-down / SOURCES S11, S13) | market | One-line reconciliation in the module file: state why the used upper bound is 12% (currency ambiguity haircut on S11), or widen to 14.7% high — TD base moves ~4%, immaterial to any verdict, but the words and the range should agree |
| A5 | M9 revenue-closure span "$58–135M" (competition FINDINGS #share-build) has no itemized derivation, unlike the operator-count closure beside it | competition | Add the constituent line items (per-vendor revenue ranges) so the span recomputes the way the count closure does |
| A6 | Working span written "$55–116M" while the constructed low edge is $55.8M (3 s.f. per lock units) | market / gdd-librarian | State the edge at 3 s.f. ("$55.8–116M") or add a one-word "rounded" label; F8's derived 65% already uses 55.8, so only the label changes |

Mandatory re-runs (not defects): **D6 after /gdd:storyline** (with the
GATE-OWNED sufficiency check), **D8 after /gdd:red-team**, and the D4
fetch-level spot-check if a fetch-capable environment becomes
available before final readout.

## Executed computations

All arithmetic below was executed, not asserted (external-oracle rule).

Block 1 — D1 FX + D2 legs and gaps:

```
$ python3 (D1/D2 recomputation)
D1 FX: lock 0.7025 | S1 0.702469 | S2 implied 0.703829 | S1-S2 divergence 0.19%
D1 conv: CAD 2.8B x 0.7025 = US$1.967B (recorded ~US$1.97B)

D2 TD Chain A: addressable = $6198.2M
  base @1.2% intensity = $74.4M (recorded 74.4)
  low  @0.9% intensity = $55.8M (recorded 55.8)
D2 BU tiers ($M): [4.25, 15.12, 19.15, 16.3] sum = 54.8 (recorded 54.8)
D2 BU universe: 19000 operators (recorded 19.0k)
D2 gap first return: |96.5-54.8|/54.8 = 76.1% (tolerance 30%)
D2 gap after re-run: |74.4-54.8|/54.8 = 35.8% (tolerance 30%)
D2 span: TD [55.8,167] n BU [27.2,116] overlap = [55.8,116] -> recorded '55-116' (low edge rounded down 1.4%)
```

Block 2 — D3 leaf sums / closure + F8 share arithmetic + F13 ARPU +
tree decision rule:

```
$ python3 (D3/F8/F13 recomputation)
D3 universe sum: 19000 (=19.0k claimed)
D3 overall penetration: 53.4% (claimed ~54%); digitized 10.14k (claimed ~10.2k; 19.0x0.54=10.26k)
D3 micro digitized: 4.72k (claimed ~4.7k)
D3 verticals total: 7600-10100 (claimed 7,600-10,100)
D3 horizontals total: 2500-7000 (claimed 2,500-7,000)
F7 share lo: 19.8%  hi: 47.9% (claimed 20-48%)
F9 closure: 10.1-17.1k named vs ~10.2k universe (claimed 10.1-17.1k)

F8 NA in-segment: $36M; implied share 31% (span top 116) - 65% (span low 55.8)
F8 top-2 floor $72M = 129% of 55.8 / 85% of 85 / 62% of 116
F8 named-set floor total: 72+33 = $105M vs span top 116 (claimed >=105, ~span top)
F13 ARPU @ 1500 customers: $24000/yr = $2000/mo
F13 ARPU @ 3000 customers: $12000/yr = $1000/mo

Tree: 2x in 5y = 14.9%/yr (stated ~14.9%)
```

Block 3 — D7 implied ratios:

```
$ python3 (D7 plausibility ratios)
D7-1 implied spend/digitized operator: $5405/yr = $450/mo
      cited comparables: GorillaDesk $49-245/mo, Fieldwork $59-99/tech, FieldRoutes ~$350+, PestPac $560-1,050 -> in-band, not absurd
D7-2 US services revenue/firm: $810k; software 0.67% of revenue (digitized-op basis)
      TD intensity assumption 0.9-1.2% of addressable revenue -> same order, consistent
D7-3 NA services market $14758M; Rollins global $3,761M = 25% of NA if fully NA;
      Rollins+Rentokil-NA(~$4B order, incl. distribution to be excluded) ~ 53% -> E2's 40% in-house exclusion is the right order
D7-4 teaser $36M vs PestPac est $25-55M: target > PestPac midpoint (40) is required for #2 -> tension IS acknowledged (F8/F13 exist as findings)
D7-5 thesis needs 14.9%/yr; cited base rates: services +1.4% to +6.0% (S5 vs S3), software CAGR 5.6-12.5% (tier-6, global) -> gap acknowledged (H-mkt-2 unresolved)
```

Block 4 — D4 citation trace:

```
$ python3 (D4 trace)
Registered ids: 41, S1..S44; gaps: [29, 31, 33]
Finding -> sources trace:
  F1: 10 sources, missing: none    F8:  4 sources, missing: none
  F2:  5 sources, missing: none    F9:  7 sources, missing: none
  F3:  8 sources, missing: none    F10: 2 sources, missing: none
  F4:  3 sources, missing: none    F11: 2 sources, missing: none
  F5:  4 sources, missing: none    F12: 3 sources, missing: none
  F6:  5 sources, missing: none    F13: 6 sources, missing: none
  F7:  7 sources, missing: none
Dangling citations TOTAL: 0
Supports column without any F-id: S1,S2,S3,S5,S7,S9,S11,S13,S15,S17,S19,S21,
  S23,S25,S27,S4,S6,S8,S10,S12,S14,S16,S18,S20,S22,S24,S26,S28,S30,S32,S34,S43
Registered but never cited by a ledger finding: S1,S2,S8,S14,S16,S20,S27,S32,S34
```

---

# Scoped re-run — 2026-07-08 · `/gdd:triangulate D6 D8`

> These checks establish internal consistency and traceability of the
> work product. They do not establish that the estimates are true.

Scoped sweep per $ARGUMENTS (D6, D8) — the two mandatory re-runs the
2026-07-08 full sweep recorded (D6 post-storyline, D8 post-red-team),
both now runnable: `.diligence/reports/STORYLINE.md` and `.diligence/reports/REDTEAM.md`
exist. **D5 re-run added per the re-runs rule** ("plus D5 — fixes
ripple"): the storyline is a new number-bearing artifact, and the
ledger gained F14–F17 since the full sweep. Taxonomy lock still
present, v1, unchanged. Prior PASSes (D1–D4, D7, 2026-07-08 full
sweep) carried forward with their dates; not re-run here.

## Re-run result

**D6 PASS · D8 PASS · D5 PASS (re-run).** The two mandated re-runs are
discharged; gate remains **PASS** (status confirmed, note updated in
state.json/STATE.md). No waiver requested or recorded. Two new
advisory defects (A7, A8) appended to the advisory table's numbering.

## Checks

### D6 Thesis sensitivity — PASS (re-run of full-sweep N-A)

- **Sensitivity table exists:** STORYLINE.md §"Risks & sensitivities"
  carries a 6-row table (S-1…S-6) — F1 span position, growth rate,
  ARR-in-segment fraction, F13 customer base, F7-revived, retention —
  ≥ the registry's default top-5, each with evidenced flex range,
  effect, and an explicit Flips? verdict.
- **Flexes recomputed (executed Block 5):** every derived cell
  reproduces from ledgered inputs — S-1 shares 31%/65% ✓; S-2
  multipliers 1.07×/1.34× (and 1.80× at the tier-6 12.5% high, still
  <2.00×) ✓; S-4 ARPU $2,000/$1,000/$600/~$294→"~$300"/mo ✓; S-5 pool
  spend $37.8M→"~$38M" high edge (≈95% capture to add $36M —
  storyline's "~100%" is the conservative read) and $0.54–14.1M
  closure-consistent ✓; sufficiency arithmetic 14.9%/yr required,
  $167M×1.06⁵=$223.5M→"~$224M", 32% share of grown market vs 22%
  implied today, residual lever multiple 1.49× ✓. No recomputed flex
  crosses a flip point the storyline fails to state.
- **Flip points reflected in risk language:** each row states its flip
  threshold explicitly (S-1: dissolving F8 needs ~$250M+, matching
  REDTEAM.md; S-2: flip needs ≥14.9%/yr, no source supports it; S-3:
  no branch flips to proceed — and this row is correctly wired to the
  governing thought's revisit condition and unresolvable dispute 2);
  the net verdict ("no single evidenced flex … flips; overdetermined
  by the surviving cells") is consistent with the recomputation. S-6
  correctly refuses to treat the retention blind spot as a flexable
  cell (downside-only).
- **GATE-OWNED conditions (TREE.md) answered explicitly:** the
  sufficiency check has its own storyline section, answers **"No —
  and not marginally"** lever-by-lever with executed arithmetic
  (recomputed ✓, Block 5), states the answer as a gross-of-retention
  ceiling, and the memo states the KQ3 retention blind spot verbatim
  per TREE.md's requirement. No other GATE-OWNED condition exists in
  TREE.md.
- FAIL clause tested: no assumption's plausible range flips a key-line
  claim unstated — the one range that crosses anything (S-1 Reading B
  "possibly slightly above" the span top) is stated in-table and flips
  nothing (bar is ~$200M; max defensible high $167M).

### D8 Red-team disposition — PASS (re-run of full-sweep N-A)

- **Kill list diffed mechanically (executed Block 6):** ledger
  CONTESTED set = {F7, F12} = red-team kill list exactly; plus the
  declared no-ledger-row kill (H-risk-1 trend clause). Nothing
  CONTESTED outside the kill list; no kill missing a status marker.
- **Dispositions:** F7 and F12 — **standing dispute declared in the
  storyline's risks section** (registry's third disposition class):
  each appears there labeled CONTESTED with the kill reasoning, named
  revive conditions matching REDTEAM.md's "what would revive it"
  verbatim in substance, and the carried consequence (H-comp-1/H-comp-3
  have no un-contested support; key-line claim 3 asserts non-support).
  H-risk-1 — refutation promoted to the ledger as F14 (M) and carried
  in key line 5 itself with the enacted rescission date; the STATE.md
  open-question requirement (memo states the deregulatory federal
  direction) is met in the storyline's risks/blind-spots text.
  All four REDTEAM.md unresolvable disputes appear in the storyline,
  none omitted, both readings each (checked side-by-side).
- **No key-line claim rests on a CONTESTED id (trace map diffed
  mechanically, Block 6):** F7/F12 appear in zero of {governing
  thought row, KL-1…KL-5 rows and their support rows}; F12 appears
  only in its Risks row; F7 appears in its Risks row and **once in the
  GATE-OWNED sufficiency row** — inspected: the cell labels it
  "F7-CONTESTED at its own high edge" and the use is arguendo
  (granted at its most favorable edge to show the share lever still
  cannot carry the required magnitude — the "No" holds a fortiori if
  F7 retires). That is adversarial bounding, not reliance; not a FAIL.
  Mandatory carry-forwards from REDTEAM.md's toolchain notes (F11 dual
  reading, F8 trilemma) both present in the risks section.
- Recorded openly: the ledger's "D8 disposition records" placeholder
  is still empty — the standing-dispute disposition lives in the
  storyline; the user's eventual revive/retire ruling on F7/F12 must
  be recorded there verbatim. Advisory A7, not a FAIL (the registry's
  disposition requirement is satisfied by the declared standing
  dispute).

### D5 Cross-artifact consistency — PASS (re-run; ripple rule)

- Grepped 18 headline quantities across all artifacts including the
  new STORYLINE.md and the post-sweep ledger rows F14–F17 (executed
  Block 7): span $55–116M (24 sites/7 artifacts), TD $74.4M / BU
  $54.8M, gap 35.8%, high $167M, NA teaser $36M, share 31–65%, growth
  1.4–6.0%, required 14.9%/yr, digitized ~10.2k, F7 20–48%,
  closure-consistent 1–25%, PestPac $25–55M, $5.4k/yr per operator,
  roll-up ~1%/yr, rescission 2025-07-11 — **no two artifacts state
  materially different values for any quantity.** Two grep flags
  inspected and cleared as distinct quantities (TRIANGULATION's 14.7%
  = A4's Canada-uplift bound, not the 14.9% rule; "10.1k" = the
  7.6–10.1k vertical-count closure top, not the 10.2k universe).
- Storyline trace-map source columns recomputed as set-unions of the
  cited findings' ledger Sources cells: governing thought, KL-1…KL-5
  all reproduce exactly.
- Rounding notes (tolerated per check text): "~$224M" for a computed
  $223.5M (0.2%); S-4's "~$300/mo" for $294; the A6 span-edge label
  ($55.8M written "$55–116M") persists into the storyline but is
  self-disclosed in its header comment — A6 remains open with the
  same remediation.
- F14–F17 courtesy trace (not a D1/D4 certification): all four rows
  carry units/basis and dated periods; cited sources S45–S49 resolve
  to registered SOURCES.md rows; 0 dangling. The full-sweep D1 walk
  and D4 spot-check discipline have not been applied to F14–F17 under
  any sweep — advisory A8.

## New advisories (appended; A1–A6 unchanged and still open)

| # | Defect (artifact + site) | Owner | Remediation |
|---|---|---|---|
| A7 | LEDGER.md "D8 disposition records" placeholder empty — F7/F12 standing-dispute disposition currently lives only in the storyline risks section | user / orchestrator | Record the eventual revive/retire ruling verbatim in the ledger Notes disposition block at (or before) final readout; until ruled, the declared standing dispute stands |
| A8 | F14–F17 promoted after the full sweep; D1 walk and D4 spot-check discipline never applied to them (this re-run ran only a mechanical units+trace pass, clean) | gdd-verifier (next full sweep) / orchestrator | Fold F14–F17 into the owed fetch-capable D4 re-check before final readout, or run a scoped D1+D4 pass over F14–F17 |

Still owed before final readout (carried, unchanged): fetch-capable D4
says-what-claimed re-check (WebFetch remained blocked this session);
A1–A6 remediations; defined_terms OPEN (blocks F8/F13 resolution).

## Executed computations (re-run)

Block 5 — D6 flex + sufficiency recomputation:

```
$ python3 (D6 recomputation)
D6-0 decision rule: 2x in 5y = 14.9%/yr (storyline: 14.9%)
D6 S-2: 1.4%/yr -> 5y multiplier 1.07x (<2.00x required)
D6 S-2: 6.0%/yr -> 5y multiplier 1.34x (<2.00x required)
D6 S-2: 5.6%/yr -> 5y multiplier 1.31x (<2.00x required)
D6 S-2: 12.5%/yr -> 5y multiplier 1.80x (<2.00x required)
D6 S-1: implied share 36/116 = 31% ; 36/55.8 = 65% (storyline: 31% -> 65%)
D6 S-5: implied spend/digitized op = $5,404/yr (D7-1: $5,405)
D6 S-5: high edge 7.0k ops x $5.4k = $37.8M (storyline: ~$38M); capture needed to add $36M = 95%
D6 S-5: closure-consistent 0.1-2.6k ops -> $0.54M - $14.1M (storyline: ~$0.5-14M)
D6 S-4: 36M NA / 1500 = $24,000/yr = $2,000/mo ; /3000 = $1,000/mo ; /5000 = $600/mo ; /10200 = $294/mo
D6 suff: $167M x 1.06^5 = $223M by CY2030 (storyline: ~$224M)
D6 suff: 2x NA ARR = $72M -> share of grown mkt = 32% (storyline: ~32%); implied today 36/167 = 22% (storyline: ~22%)
D6 suff: best evidenced growth 1.06^5 = 1.34x -> residual lever multiple needed = 1.49x (storyline: 1.49x)
```

Block 6 — D8 mechanical kill-list + trace-map diff:

```
$ python3 (D8 trace diff)
D8a ledger CONTESTED: {F7, F12} == red-team kill list {F7, F12} + H-risk-1 (no ledger row, by design) -> sets match
D8b F7 in trace rows: [GATE-OWNED sufficiency] cell "pool arithmetic F7-CONTESTED at its own high edge" (arguendo, labeled)
                      [Risks: F7 CONTESTED (displacement pool)]
D8b F12 in trace rows: [Risks: F12 CONTESTED (switching testimony)] only
D8c F7 mentions in key-line body (governing thought + key line + supports 1-5): 0
D8c F12 mentions in key-line body: 0
D8d F7: declared CONTESTED in Risks section: True; revive path named: True
D8d F12: declared CONTESTED in Risks section: True; revive path named: True
D8d H-risk-1: refutation carried as ledger F14 + storyline KL-5: True; rescission date 2025-07-11 present: True
```

Block 7 — D5 re-run grep (18 headline quantities, all artifacts):

```
$ python3 (D5 grep-diff)
span $55-116M: 24 sites / 7 artifacts, conflicts none | TD 74.4: 13/4 | BU 54.8: 25/5 | gap 35.8%: 8/5
$167M: 11/4 | $36M NA: 17/4 | 31-65%: 9/6 | growth 1.4-6.0%: 35/5 | 14.9%/yr: 15/5 (14.7% flag = A4 quantity, cleared)
~10.2k: 19/5 (10.1k flag = closure-top 7.6-10.1k, cleared) | 20-48%: 8/5 | 1-25%: 4/3 | $25-55M: 7/4
$5.4k/yr: 5/2 | ~1%/yr: 6/3 | 2025-07-11: 8/4 | ~$224M: 2/2
-> no two artifacts state materially different values for any quantity
```

---

# Full sweep 2026-07-11 (F1–F36)

> These checks establish internal consistency and traceability of the
> work product. They do not establish that the estimates are true.

First full D1–D8 sweep since F18–F36 landed (customers, company, and
risks-v2 modules; scope extension per ENGAGEMENT.md's 2026-07-11
amendment). Taxonomy lock: **present** — `state.json.taxonomy_lock` v1
read as authority (unchanged since 2026-07-08; defined_terms still
OPEN). Run order per workflow: D1→D5 first, then D3/D4, then
D2/D6/D7, D8 last. Re-run rule applied: re-ran every check fresh
against the full F1–F36 ledger rather than only the delta, because D1
(units/basis walk) and D4 (citation trace) are ledger-wide by
construction and the "ripple" from five new modules touches D3/D5/D7
as well; D2's inputs (F1–F3) are untouched, so that leg arithmetic is
carried forward from 2026-07-08 **and reconfirmed by fresh
recomputation this sweep** (identical output). Environment note: unlike
2026-07-08, WebFetch **was reachable this session** for most hosts —
15 live fetches executed (see Executed computations, Block 8); g2.com,
web.archive.org, and sec.gov remained blocked exactly as recorded;
federalregister.gov redirect-blocked (new pattern, matches STATE.md's
2026-07-11 note) but a **govinfo.gov mirror worked** (second instance
of the S107 "company/government mirror bypasses the primary-host
block" recipe — generalizes further); bankofcanada.ca and
federalreserve.gov, both recorded blocked at scoping, were **reachable
this session** (see D1 and advisory A13) — a material environment-state
change worth flagging to the librarian.

## Gate result

**FAIL** — D4 and D6 fail; D1, D2, D3, D5, D7, D8 pass. Per the
registry, one FAIL fails the gate; no waiver was requested or recorded
this session. This is the expected shape of a sweep run mid-expansion,
before the storyline has been rebuilt on the five-module record — see
D6 below and state.json's own `continuation.next_step` ("triangulate
… then storyline rebuild"), which already anticipated this order.

Scope of this sweep: full, no `$ARGUMENTS` scope — covers F1–F36 and
every artifact in `.diligence/` as of 2026-07-11, including the three
new module FINDINGS files (customers, company, risks-v2), TREE.md v2,
and the ENGAGEMENT.md 2026-07-11 amendment. The two FAILs below are
independent findings, not one defect counted twice.

## Checks

### D1 Units, currency, time basis — PASS

- Re-walked all 36 ledger rows. F1–F13 unchanged since the 2026-07-08
  PASS (reconfirmed, not re-derived from scratch a second time). **F14–F36
  walked fresh this sweep** (discharges part of advisory A8's owed
  re-check): every row carries units/currency/period in the Units/basis
  column, none bare (executed check, Block 1 below — 23 rows printed,
  zero missing). Time basis: CY throughout; CY2026 "present-state" /
  "accessed" labels are dated explicitly on every review-platform,
  vendor-page, and regulatory finding (F18/F19/F20/F21 "as of
  2026-07-11"; F23/F25 "CY2024–26" release-cadence window; F32
  "CY2021–26" litigation window) — no FY/CY mixing, no silent-vintage
  reuse.
- FX: still the one currency pair (CAD→USD, locked 0.7025 @
  2026-07-06). Re-derived the S1/S2 divergences (unchanged, Block 8)
  **and** cross-checked against a newly-reachable tier-2 source this
  session: Federal Reserve H.10 (2026-07-02 observation, 1.4182
  CAD/USD → implied CAD→USD 0.70512, 0.37% off the lock — within the
  same corroboration band as S2). Federal Reserve H.10 was recorded
  blocked at scoping (ENGAGEMENT.md Constraints, TAXONOMY.md FX
  caveat); it answered this session. Not a defect — an opportunity
  (advisory A13) to upgrade the FX lock's citation from tier 5 to
  tier 2 before final readout, now that a live official-statistics
  source is reachable.
- No unexplained conversions anywhere in F14–F36; every $ figure
  (F22 ARPU, F26/F84–88 list prices, F29 concentration, F36's ARR
  bound) is USD, CY-dated, matching the lock.

### D2 Top-down / bottom-up reconciliation — PASS (carried forward 2026-07-08, reconfirmed)

- F1–F3 (market module) are untouched by the scope extension — no new
  market-sizing work landed. Re-derived both legs fresh this sweep
  regardless (external-oracle rule; Block 1 below): TD Chain A
  base **$74.4M** ✓, low **$55.8M** ✓; BU tiers sum **$54.8M** ✓; gap
  **35.7–35.8%** ✓ (rounding), still outside the 30% tolerance,
  irreconciled per protocol, no averaging — identical to the
  2026-07-08 sweep's numbers.
- Independence and residual-gap-driver notes from the prior sweep
  stand unchanged (no new market evidence to contaminate or corroborate
  the legs). Carrying forward D2's PASS with its 2026-07-08 date per
  the re-run rule ("carry forward prior PASSes with dates noted"),
  reconfirmed by this sweep's fresh recomputation.

### D3 MECE audit — PASS (one advisory)

- **Hypothesis tree v2** (TREE.md, 19 leaves: market 4 / competition 5
  / customers 3 / company 3 / risks 4) — leaf count recomputed and
  matches the header claim exactly (Block 2). Every leaf has one owning
  module; no leaf appears under two modules.
- **Risk-screens partition** (references/risk-screens.md): the six
  standing screens (customer concentration, supplier/input, platform
  dependency, regulatory/licensing, key person, market-structure
  intake) plus two ad-hoc breaker rows (moat cosmetic, ARR composition)
  = 8 screen rows = F29–F36 exactly (Block 2). All three ENGAGEMENT.md
  deal breakers map to a screen — no scoping defect, confirmed
  independently of the module's own audit note.
- **Moat mechanism table** (company module CO1): the 7 rows used
  (switching costs, network effects, scale economies, brand/category
  ownership, regulatory/licensing, IP, data/workflow depth) match
  `references/moat-evidence.md`'s canonical 7-row taxonomy exactly —
  none added, none dropped, none merged (Block 2).
- **KPC ranking** (F20) and **review-corpus dedup** (F18): ranking is
  ordinal (frequency-ranked, not a leaf-sum), no arithmetic-sum defect
  applicable; the Capterra=Software Advice dedup finding was
  cross-verified on 2 of 6 vendors (PestPac, GorillaDesk — byte-
  identical n/rating on both platforms) and correctly generalized as a
  forward-looking methodology caution for the other 4, not asserted as
  fact for them — no MECE violation (the other 4 vendors were only
  ever fetched from one platform each in this ledger, so no
  double-counting occurred).
- **Boundary cases**: the locked test value (20-truck termite
  specialist on ServiceTitan → IN, competitor-supplied) and the
  ≥50%-pest-revenue lawn-care rule continue to be honored across the
  new modules' vendor treatment (ServiceTitan core, Housecall Pro,
  Jobber all classed adjacent-horizontal-in-segment consistently in
  F18/F20/F23/F27).
- **Advisory (new, A9) — not a FAIL**: TREE.md's body text contains a
  **duplicate "C4" node id** left over from the v1→v2 rewrite: an
  orphaned stub "C4. Customers stay — KQ3 OUT-OF-SCOPE (named so the
  memo states the blind spot)" (zero children) sits between C3 and C5,
  alongside the real v2 "C4. Customers stay (KQ3 → customers) [in
  scope as of v2]" node (leaves H-cust-1..3) at the bottom of the tree.
  C3's own bracket note "[demand half: absorption without churn — KQ3
  OUT-OF-SCOPE]" is now stale in the same way (KQ3 is partially
  in-scope via H-cust-1's renewal-direction testimony, target-rung
  magnitude still out of reach). **Why this is an advisory, not a D3
  FAIL:** the registry's FAIL clause is scoped to "overlap, gap, or a
  leaf-sum mismatch beyond rounding" — the orphan stub has no leaves,
  so no leaf is double-counted or missing, and the 19-leaf sum is
  unaffected (verified, Block 2). But a human reader (or the IC) hitting
  a duplicate, contradictory "C4" while reading the canonical tree
  artifact is a real defect the registry's specific wording doesn't
  quite have a slot for — see dogfood friction, below.

### D4 Citation coverage & tier adequacy — **FAIL**

- **Trace stats** (executed Block 3): **36 findings → 114 registered
  sources (S1–S117, less 3 never-issued gap ids S29/S31/S33, carried
  from A1); 184 citation instances; dangling: 0; unregistered: 0.**
  104 of 114 registered sources are cited by ≥1 finding; 10 are
  registered-but-uncited (S1, S2 — FX-lock support, not finding-cited
  by design; S8, S14, S16, S20, S27, S32, S34 — carried from the
  2026-07-08 advisory A2 list; **S66 new** — the rejected
  go-to-market-playbook candidate, correctly never cited since its own
  row labels it "REJECTED candidate — not used to support any claim").
- **Tier-adequacy sweep, all 36 findings** (Block 3): three findings
  rest solely on tier-6 sources — **F12, F18, F19**. D4's
  tally-of-testimony carve-out applies cleanly to two of them: **F12**
  ("switching testimony runs one-way… direction only") and **F19**
  ("tenure-direction testimony (n=13) ≈ churn-direction (n=11)…
  Direction only, no rate claimed") are both direction-of-testimony
  tallies with the channel bias flagged in-row — exactly the
  registry's own worked example ("review testimony runs 3:1 in
  direction X") — both PASS the carve-out.
- **F18 does not.** F18's claim bundles (a) the platform-pool-identity
  finding (Capterra = Software Advice, byte-identical n/rating,
  cross-verified on 2 platforms — a mechanically-verified structural
  fact, not testimony) with (b) **review-volume magnitude figures**
  ("verticals 71–402/vendor; horizontals 335–2,742/vendor") resting on
  the same six, all-tier-6 sources (S51–S55, S57). The registry's own
  precedence clause is explicit: within the tally-of-testimony class,
  "a direction-only claim … passes; **any magnitude claim on the same
  evidence fails**." 71–402 and 335–2,742 are stated counts, not a
  direction/ratio — they do not fit the carve-out's "direction-only"
  requirement, and no non-tier-6 source corroborates them anywhere in
  the citation set. Read strictly (per this sweep's brief: do not
  contort to avoid a FAIL), this is the categorical tier-6-never-
  sole-support rule firing on a magnitude claim, unrescued by a flag
  (the rule is explicit that a flag does not rescue the categorical
  case — only the narrower tally exception does, and only for
  direction). **D4 FAILS on F18.**
  - This is a genuinely close call and is called out in the dogfood
    friction section: the registry's carve-out language ("tally of
    testimony … direction-only") was clearly written with
    sentiment/reason tallies in mind (F12, F19, F20's KPC ranking);
    it does not explicitly address raw platform metadata (review
    *counts*, as opposed to what the reviews *say*), which carries a
    different, arguably lower reliability risk (a platform
    misreporting its own review count is a different failure mode
    than a self-selected reviewer's testimony being unrepresentative).
    Reading the check as written, however, "magnitude claim… fails"
    is unqualified — it does not carve out platform metadata, so the
    verdict stands as FAIL, with the ambiguity flagged for whoever
    owns the registry text.
  - **F20** (KPC table) is also all-tier-6-adjacent by source list but
    is a clean fit for the carve-out (ranked frequency of *stated
    reasons* — a direction/ranking claim, "no rate claimed" language
    absent but the ranking itself carries no magnitude beyond ordinal
    position and n-counts per row, consistent with the worked
    example) — not flagged as a second FAIL, but noted as adjacent to
    the same ambiguity.
- **Spot-check** (sample = max(3, 20% of 36 = 7.2) → **8**, selected by
  weight; key-line-load-bearing findings always included). Sample run
  this sweep, **with live fetches** (discharging most of the owed
  fetch-capable re-check, advisory A8, and satisfying the ≥2-new-
  finding-with-real-fetch requirement several times over):
  - **F4** (carried, key-line) · S3 · **live-fetched, CONFIRMED** —
    npmapestworld.org press release matches the $13.416B / +6% /
    109,384 technicians / 85.4% residential-recurring figures exactly,
    plus two uncited-but-consistent bonus data points (13.29M
    residential customers; "2.7× US real GDP growth").
  - **F8** (carried, key-line trilemma) · arithmetic re-derived, Block
    4 · consistent (unchanged since 2026-07-08).
  - **F14** · S45 · **live-fetched via a govinfo.gov mirror**
    (federalregister.gov itself redirect-blocked; second instance of
    the S107-style government-mirror bypass) — CONFIRMED: effective
    date 2025-07-11 ✓, USDA AMS ✓, "err on the side of deregulation"
    quote verbatim ✓. · S46 · **live-fetched, both cited URLs** —
    CONFIRMED: general state-persistence claim on the first URL, and
    the specific CA-2yr/WA-2yr/NY-3yr figures on the second
    (onlinepestcontrolcourses.com) — the compound citation checks out
    exactly as registered. **Discharges F14's D1/D4 debt (advisory A8)
    in full.**
  - **F18/F19** · S52 · **live-fetched** — Capterra PestPac page shows
    3.9★/255 reviews, matching S52's registration and F18's "255"
    figure exactly; see D4 FAIL above for the volume-magnitude issue
    this same check surfaced.
  - **F22/F29** · S107 · **live-fetched** (the Rollins IR-mirror
    recipe) — CONFIRMED verbatim: "the majority of Rollins' business
    runs on our proprietary Branch Operating Support System ('BOSS')"
    and "131 domestic franchise agreements … 66 international" —
    exact match to the SOURCES.md registration.
  - **F23/F25/F27** · S79 · **live-fetched** — PestPac's reporting page
    CONFIRMED: NPMA-33, NPMA-99-A/B, California/New York Material
    Reports, Arizona TARF (FAQ), and "every report… exported to CSV" —
    matches the cited built-in-report-type and CSV-export claims.
  - **F36** · S102 · **live-fetched** (tanayj.com) — CONFIRMED the
    underlying quote ("Subscription ~70%, Usage ~25%, services is the
    rest") **but see D7 below**: re-deriving F36's own stated "22–29%"
    bound from these confirmed figures does not reproduce — flagged as
    advisory A11, not a second D4 FAIL (the source is quoted
    correctly; the ledger's own downstream arithmetic is what's off).
  - **F15** · S48 · **live-fetched, both locators** — one (privsource.com)
    is alive but is a single-deal page that does not state the
    "26 acquisitions 2025 / 94 over 3yr" aggregate anywhere on the
    page; the other (ad-hoc-news.de) returned **HTTP 410 Gone** —
    dead at verification time, 3 days after its 2026-07-08
    registration. Per the registry's own D4 note ("a dead link at
    verification time downgrades D4"), this is recorded as advisory
    A10, not folded into the F18 FAIL (different finding, different
    mechanism — link rot, not a tier/magnitude problem).
- Environment checks (Block 8): g2.com, web.archive.org, and sec.gov
  **confirmed still blocked** this session (403 / tool-level refusal /
  403 respectively) — consistent with every prior session's record; no
  change to report.
- Hygiene (advisory, carried, unchanged): A1 (SOURCES.md id gaps
  S29/S31/S33), A2 (Supports column F-id backfill).

### D5 Cross-artifact consistency — PASS

- Grepped 26 headline quantities across every `.diligence/` artifact
  including the three new module FINDINGS files, TREE.md, STATE.md,
  and state.json (Block 5): the carried F1–F17 quantities ($55–116M
  span, $74.4M/$54.8M legs, 35.8% gap, $36M NA teaser, 31–65% share,
  10.2k digitized, 14.9%/yr, 2025-07-11 rescission date, etc.) **plus
  new quantities specific to F18–F36** (review counts 255/402/277,
  71–402 and 335–2,742 volume ranges, 1,500–3,000 customer base,
  $13.3–26.7k ARPU, 131 domestic/66 international franchise
  agreements, 26 acquisitions/94-over-3yr, $961M ServiceTitan revenue,
  22–29% non-subscription bound, the 2026-02-05 G2 acquisition date,
  the 2026-04-15 Google Play policy date) — **no two artifacts state
  materially different values for any quantity checked.** The 22–29%
  bound is a good example of exactly what D5 is and isn't: it is
  perfectly *consistent* everywhere it appears (LEDGER, SOURCES,
  STATE.md, risks FINDINGS, state.json all repeat the same figure) —
  D5 PASSes on consistency — even though D7/re-derivation below finds
  the figure itself is not quite right. That is precisely the
  boundary the fixed disclaimer exists to mark.
- STATE.md and state.json agree on all five modules' statuses and on
  the pre-update gate values.

### D6 Thesis sensitivity — **FAIL**

- The registry's "first-sweep N-A" carve-out ("on a sweep run before
  the storyline exists") does **not** apply here — a storyline
  artifact exists (`.diligence/reports/STORYLINE.md`, 2026-07-08). Per
  the brief for this sweep, the honest disposition when a check's
  natural answer is "rebuild the storyline, then re-run" is to say
  exactly that, not to manufacture an N-A the registry's own wording
  doesn't support.
- **What actually fails:** the check's run step includes "D6 also owns
  any GATE-OWNED conditions recorded in TREE.md … verify the storyline
  answers them explicitly." TREE.md was superseded to v2 on
  2026-07-11 and its GATE-OWNED sufficiency-check text now reads: "The
  GATE-OWNED sufficiency check now runs net of evidenced retention
  direction (still not cohort-grade — the memo keeps stating the
  data-room gap)" — i.e., the current, authoritative version of the
  question the storyline must answer explicitly now expects retention-
  *direction* evidence (which exists as of this sweep: F19/H-cust-1's
  tenure≈churn testimony tally) to be incorporated. The only existing
  answer — STORYLINE.md's GATE-OWNED section — answers the **v1**
  question instead: "Net of retention: unanswerable — retention is
  untested (KQ3 scoped out by the client)," treating retention purely
  as a downside-only blind spot (sensitivity row S-6), because when it
  was written KQ3 genuinely was out of scope. It does not, and could
  not, address F18–F36 at all (11 of the sensitivity table's and
  trace map's inputs simply did not exist yet). Verifying "the
  storyline answers [the current GATE-OWNED condition] explicitly"
  therefore fails on its own terms: it answers a superseded version of
  the condition.
- Consequence, stated for the storyline's rebuild: the sensitivity
  table needs new rows for at minimum — F29 (customer-concentration
  breaker, tripped-unchaseable — currently absent from S-1…S-6
  entirely), F35/F36 (breaker 2/3 dispositions), F20's axes-re-check
  trigger, and F21's confirmed expansion mechanism (a potentially new
  pro-thesis lever the v1 table never modeled). None of this is
  assessed here — that is precisely the rebuild's job, not this
  gate's.
- **This is not a re-statement of the F18/D4 FAIL** — it is
  independent: even if F18 were fully remediated, D6 would still fail
  today, because the artifact D6 checks (the storyline) has not been
  rebuilt since 23 of the ledger's 36 findings landed.
- Remediation: **rebuild the storyline on the full five-module record
  (F1–F36), answering the v2 GATE-OWNED sufficiency condition
  explicitly (net of evidenced retention direction, not merely
  gross-of-retention), then re-run D6.** This is already state.json's
  own stated `continuation.next_step` — this gate's FAIL confirms
  rather than discovers that ordering.

### D7 Plausibility & base rates — PASS

- Re-derived the five 2026-07-08 ratios fresh (Block 6, unchanged
  since the market/competition legs are untouched): implied spend/op
  $5.4k/yr (in-band), software intensity 0.67% (same order as the TD
  leg's 0.9–1.2%), top-2 concentration ~order-of-40–50% (validates the
  TD leg's 0.60 in-house-exclusion factor), teaser-vs-PestPac
  implausibility (acknowledged as F8/F13, not buried), growth-vs-base-
  rate gap (acknowledged, H-mkt-2 unresolved).
- **New ratios computed over F18–F36** (Block 6, satisfying this
  sweep's requirement for D7 coverage of the new findings):
  1. **F22 concentration ARPU vs F13's peer-pricing table:** implied
     target ARPU $12.0–24.0k/yr (recomputed from $36M NA ÷ 1,500–3,000
     customers; F22 states $13.3–26.7k/yr off the $40M gross teaser —
     both readings land in the same band) sits **between** PestPac's
     7-user tier (~$6.7–12.6k/yr) and its 100-user tier (~$60–120k/yr)
     — a "regional operator" read is plausible, not absurd, and
     matches F22's own characterization exactly.
  2. **F21/F19's PestPac Oct-2024 repricing** ($250→$600/mo, +140%) is
     9–28× a typical SaaS annual price-increase benchmark (5–15%/yr) —
     a large ratio, but the finding cites it *as* an outlier event
     that drove the churn-direction cluster, not as typical behavior —
     acknowledged, not buried; the D7 FAIL condition (absurd **and**
     unacknowledged) does not fire.
  3. **F30's cloud-alternates base rate:** AWS 28% + Azure 21% + GCP
     14% = 63% of the worldwide market (S91) — leaves 37% for smaller
     providers, consistent with a "≥3 credible alternates, no
     chokepoint" verdict.
  4. **F36's ServiceTitan non-subscription bound** — re-derived from
     the same cited dollar/percentage figures (Block 6): S-1 vintage
     30.0% (100 − 70), TTM vintage 25.9% (22.4 + 3.6) → **26.0–30.0%**,
     not the stated "22–29%." Not an absurd ratio (D7's >3× threshold
     is nowhere close) and the qualitative disposition — breaker 3
     "cannot clear," in-segment ARR would need an implausible
     out-of-segment share — is unchanged either way (recomputed
     multiple ≈1.7× the corrected class max vs. the stated "~2×"). Not
     a D7 FAIL; recorded as advisory A11 (arithmetic-precision defect,
     owner risks module) rather than folded into an absurdity finding
     it doesn't meet.
- No implied ratio this sweep is both absurd (>3×) and unacknowledged.

### D8 Red-team disposition — PASS (carried forward 2026-07-08, reconfirmed)

- Ledger CONTESTED set is still exactly **{F7, F12}** — confirmed by
  re-scanning the Status column of all 36 rows (Block 3); none of the
  22 new findings (F15–F36... i.e. F18–F36 specifically) introduced a
  new CONTESTED marker.
- **No new key-line reliance on a CONTESTED id.** F12 is cited by three
  new findings (F19, F20, F25) — in every case explicitly capped, not
  load-bearing: F25 states outright "F12 (…CONTESTED, weight capped)";
  F20 says its own reverse-flow re-check is "corroborating but not
  resolving F12's CONTESTED status"; F19 notes "no vertical→horizontal
  departure (corroborates F12)" as a citation, not a reliance. This is
  the same arguendo/capped pattern the 2026-07-08 D8 re-run accepted
  for the GATE-OWNED sufficiency row's F7 mention — consistent
  handling, not a new violation. F7 is not cited by any new finding.
- Dispositions (standing dispute for F7/F12 in STORYLINE.md's risks
  section; H-risk-1 disposed via F14) are unchanged and still present.
  Carrying D8's PASS forward from 2026-07-08, reconfirmed this sweep.
- **Scope note, not a defect:** D8's remit here is narrowly the
  existing kill list's disposition — it does not, and cannot yet,
  cover any contestable material *within* F18–F36, because no
  red-team sweep has run over them (per this engagement's own stated
  plan: red-team is scheduled after this gate). Expect D8 to be
  re-run again once that sweep lands, same as D6.

## Failures & remediations

| # | Check | What exactly failed | Owning module | Remediation |
|---|---|---|---|---|
| FAIL-1 | D4 | F18 (LEDGER.md) states review-volume magnitudes ("71–402/vendor; 335–2,742/vendor") resting solely on 6 tier-6 sources (S51–S55, S57); does not fit D4's tally-of-testimony direction-only carve-out (magnitude, not direction) | customers | Split F18 per LEDGER.md's one-claim-per-finding rule: keep the platform-pool-identity claim (cross-verified, mechanically strong) as its own finding; either (a) corroborate the volume figures with ≥1 non-tier-6 source, (b) restate them as order-of-magnitude/qualitative rather than specific counts, or (c) demote the volume sub-claim to a module-level observation (retire from the ledger), per the F12 precedent's "demote to observation" option |
| FAIL-2 | D6 | The only existing sensitivity table / GATE-OWNED answer (STORYLINE.md, 2026-07-08) is built on F1–F17 and answers TREE.md's **v1** GATE-OWNED condition text; TREE.md v2 (2026-07-11) now requires the condition answered "net of evidenced retention direction," which the existing storyline does not do and structurally cannot (it predates F18–F36 entirely) | orchestrator / gdd-storyliner | Rebuild the storyline on the full five-module record (F1–F36); answer the v2 GATE-OWNED sufficiency condition explicitly, incorporating F19's retention-direction testimony, F21's expansion-mechanism confirmation, and the F29/F35/F36 breaker dispositions into new/revised sensitivity rows; then re-run D6 (this is already state.json's stated next_step) |

Advisory defects (non-gating), carried + new, all owners as stated:

| # | Defect | Owner | Remediation | Status |
|---|---|---|---|---|
| A1 | SOURCES.md id gaps S29/S31/S33 (retired odd/even scheme) | gdd-librarian | Tombstone or renumber with a dated mapping | still open |
| A2 | 32+ source rows' Supports columns lack F-ids | gdd-librarian | Backfill from the ledger's Sources column | still open |
| A3 | F12 tier-6 sole support (flagged; tally-of-testimony exception applies, confirmed again this sweep) | competition | Corroborate ≥1 tier-4/5 item or demote to observation | still open (re-confirmed exception, not resolved) |
| A4 | Canada uplift bound wording (S11 vs the E1 range used) | market | One-line reconciliation in module FINDINGS | still open |
| A5 | M9 revenue-closure span has no itemized derivation | competition | Add constituent line items | still open |
| A6 | Working span written "$55–116M" vs constructed low edge $55.8M | market / gdd-librarian | State at 3 s.f. or label "rounded" | still open |
| A7 | LEDGER.md "D8 disposition records" placeholder still empty | user / orchestrator | Record F7/F12's eventual ruling verbatim | still open |
| A8 | F14–F17 D1/D4 discipline | gdd-verifier | Fetch-capable D1 walk + D4 spot-check on F14 (S45 via govinfo.gov mirror, S46 both locators) run and CONFIRMED this sweep; F15's S48 partially checked (surfaced A10); F16/F17 (S49) not independently re-fetched this session | **partially discharged** — F14 fully discharged; F15 discharged-with-new-finding (A10); F16/F17 still owed |
| A9 | TREE.md duplicate "C4" node id + stale "KQ3 OUT-OF-SCOPE" text under C3, orphaned from the v1→v2 rewrite | gdd-planner | Delete the orphan C4 stub; update C3's bracket note to reflect KQ3's current in-scope (direction-only) status | new this sweep |
| A10 | S48's second locator (ad-hoc-news.de) returns HTTP 410 Gone at verification time (3 days after registration); the surviving locator (privsource.com) doesn't itself state the "26/94" aggregate cited by F15 | risks / gdd-librarian | Re-source the aggregate acquisition-pace figures, or soften F15's citation to rest on S47 alone with the count re-labeled unconfirmed | new this sweep |
| A11 | F36's stated "22–29%" ServiceTitan non-subscription bound and "~2×" multiple do not reproduce from re-deriving S102's own cited figures (correct: ≈26.0–30.0%, ≈1.7×); qualitative disposition (breaker 3 cannot clear) unchanged | risks / gdd-librarian | Correct the stated range/multiple in F36 and RK8, or show the derivation so "22" and "29" are auditable | new this sweep |
| A12 | F30's "≥4 commercial [SMS/CPaaS] alternates" claim is cited to a source (S97's apiscout.dev comparison) that names exactly 3 | risks | Cite a source naming ≥4, or soften to "≥3"; does not change the screen's clear verdict | new this sweep, low priority |
| A13 | bankofcanada.ca and federalreserve.gov, both recorded blocked at scoping, were reachable this session; Fed H.10 returned a live, current CAD/USD rate corroborating the FX lock within 0.37% (BoC's endpoint returned stale/wrong-window data absent a date-range query parameter) | gdd-librarian / market | Re-attempt the BoC rung with a properly-scoped query before final readout; consider upgrading the FX lock's citation from tier 5 (S1/S2) to tier 2 now that Fed H.10 is reachable | new this sweep, opportunistic |

Mandatory re-runs (not defects, per the registry's own rules): **D4 and
D6 after remediation**, plus **D5 re-run per the ripple rule** once the
storyline is rebuilt (new number-bearing artifact). **D8 re-run
mandatory after the next red-team sweep** (scheduled post-gate,
per plan). Still owed, lower priority: F16/F17's fetch-capable D1/D4
check (S49); the broader F1–F13 fetch-capable D4 spot-check beyond
what this sweep's sample covered (F8/F9/F13's specific vendor-pricing
sources S15/S17/S22–S30 were re-derived arithmetically but not
re-fetched at the source level this session — the hosts involved
[itqlick.com, tooleduppro.com, quo.com] were not tested and may well
be reachable given this session's generally-open WebFetch access, but
were not actually attempted).

## Dogfood friction (for whoever owns the registry / workflow text)

- **D4's tally-of-testimony carve-out doesn't cleanly address platform
  metadata vs. testimony content.** The exception's wording and worked
  example ("review testimony runs 3:1 in direction X") are clearly
  about *what reviews say*; F18's review-*count* figures are a
  different kind of tier-6-sourced number (what a platform *reports
  about itself*, not what a reviewer *opines*), plausibly a lower
  reliability risk than testimony content, but the registry text as
  written doesn't carve that out — "any magnitude claim… fails" reads
  unqualified. This sweep took the strict reading (FAIL) per this
  sweep's own instruction not to contort around a FAIL, but a
  two-generation ledger is exactly where this ambiguity first bites in
  practice (F1–F17 never produced a magnitude-shaped tier-6-only
  claim; F18 is the first).
- **D3's FAIL clause (overlap/gap/leaf-sum mismatch) has no slot for
  "stale duplicate node id with contradictory content that doesn't
  affect the leaf count."** The TREE.md v1→v2 rewrite left real,
  reader-facing debris (a dead "C4 OUT-OF-SCOPE" stub sitting next to
  the live "C4 in scope" node) that no leaf-counting check catches,
  because it isn't a leaf. A cheap addition to D3's run instructions —
  "check for duplicate/orphaned node ids, not just leaf-level
  overlap" — would have caught this mechanically instead of by eyeball.
- **D6's "first-sweep N-A" carve-out is worded for the *literal
  absence* of a storyline, not for a storyline that exists but has
  gone stale relative to a ledger that grew underneath it.** This
  sweep is the first time that distinction mattered (the storyline
  existed the whole time in the 2026-07-08 re-runs, just current with
  the ledger then). The registry would benefit from an explicit
  "storyline exists but predates ≥N new findings / a TREE.md
  supersession" rule alongside the first-sweep rule, so a future
  verifier doesn't have to reconstruct the same reasoning from first
  principles (or, worse, wrongly reach for N-A by analogy to the
  first-sweep carve-out, which this sweep's brief specifically warned
  against).
- **The re-run rule ("re-run failed checks plus D5") doesn't say what
  happens to D1/D4 on a sweep where the ledger tripled in size but the
  earlier findings didn't change.** This sweep chose to re-walk D1
  fully (cheap, mechanical) but treat D2 as carry-forward-plus-
  reconfirm and D4 as a fresh full trace (since the trace stats
  themselves are ledger-wide, not finding-scoped) — a reasonable
  reading, but the registry doesn't say so explicitly, and a
  differently-reasoned verifier could plausibly have carried forward
  more (or less) of D1/D4 than this sweep did.
- **Findings that cite only other findings, not source ids directly**
  (F34, F35 — "disposition by citation, no re-analysis") aren't
  explicitly addressed by D4's "traces to SOURCES.md entries that
  resolve" language. This sweep treated them as transitively
  resolvable (their cited F-ids each have real source traces) and not
  dangling — but a stricter reading could call a direct-citation-free
  finding row a bare dangling-by-omission. Worth a one-line registry
  clarification either way.

## Executed computations

All arithmetic below was executed, not asserted (external-oracle rule).
Blocks 1–7 are fresh Python re-derivations run this sweep (2026-07-11);
Block 8 is the session's live WebFetch log (15 real fetches — sources
confirmed, dead links found, environment blocks reconfirmed/updated).

Block 1 — D1 FX (incl. new live Fed H.10 point) + D2 legs and gap:

```
$ python3
lock=0.7025
S1=0.702469  divergence from lock: 0.004%
S2 implied (1/1.4208)=0.703829  divergence from lock: 0.189%
NEW Fed H.10 implied (1/1.4182, 2026-07-02, fetched live this session)=0.705119  divergence from lock: 0.373%
CAD 2.8B x lock = US$1.967B (recorded ~US$1.97B)

TD Chain A addressable = 6198.2
TD base @1.2% = 74.4 (recorded 74.4)
TD low @0.9% = 55.8 (recorded 55.8)
BU tiers ($k, count x pen x price$k): [4248.0, 15120.0, 19152.0, 16296.0]
BU base = sum/1000 = 54.8 $M (recorded 54.8)
D2 gap TD 74.4 vs BU 54.8 = 35.7-35.8% (recorded 35.8%, tolerance 30%) -> MATCH
First-return gap 96.5 vs BU 54.8 = 76.0% (recorded 76.1%)
```

Block 2 — D3 leaf sums / partition checks:

```
$ python3
Declared per-module leaf counts: {market:4, competition:5, customers:3, company:3, risks:4} sum=19 (TREE.md header claims 19) -> MATCH
Risk screens: 6 standing + 2 ad-hoc = 8 = F29..F36 count (8) -> MATCH; all 3 ENGAGEMENT.md breakers mapped
Moat mechanism table (CO1): 7 rows used == 7 canonical rows in moat-evidence.md -> MATCH, none added/dropped
BU universe sum: 19000 (claimed 19.0k) -> MATCH
Weighted penetration: 53.4% (claimed ~54%); digitized 10,140 (claimed ~10.2k)
Vertical total range: 7600-10100 (claimed 7,600-10,100) -> MATCH
Horizontal total range: 2500-7000 (claimed 2,500-7,000) -> MATCH
F7 share: lo 19.8% hi 47.9% (claimed 20-48%) -> MATCH
TREE.md: TWO "C4" node ids found (1 orphan/stale, 1 live w/ leaves H-cust-1..3) -> advisory A9, leaf-sum unaffected
```

Block 3 — D4 full citation trace, F1–F36:

```
$ python3
Registered source ids: 114 (S1..S117), gap ids never issued: [29, 31, 33]
Parsed 36 ledger finding rows
Dangling citation instances: 0
Total citation instances (F->S edges): 184
Unique sources cited by >=1 finding: 104 of 114 registered
Registered but never cited: S1,S2,S8,S14,S16,S20,S27,S32,S34,S66 (10)

Findings resting on citations that are ALL tier 6:
  F12: [S39,S36,S44] tiers=[6,6,6]  -> tally-of-testimony exception applies (direction-only) -> OK
  F18: [S51,S52,S53,S54,S55,S57] tiers=[6,6,6,6,6,6]  -> magnitude claim (review volumes), exception does NOT apply -> D4 FAIL
  F19: [S51,S52,S53,S56] tiers=[6,6,6,6]  -> tally-of-testimony exception applies (direction-only, "no rate claimed") -> OK

Findings with ZERO direct S-id citations (cite only other F-ids): F34, F35 -> transitively resolvable via their cited F-ids' own sources, not dangling; see dogfood friction

CONTESTED status scan, all 36 rows: {F7, F12} only -- no new CONTESTED marker introduced by F13..F36
```

Block 4 — F8/F13 arithmetic (carried, re-derived):

```
$ python3
F8 NA in-segment: $36M; implied share 31% (span top 116) - 65% (span low 55.8)
F8 top-2 floor $72M = 129% of 55.8 / 85% of 85 / 62% of 116
F8 named-set floor total: 72+33 = $105M vs span top 116
F13 ARPU @ 1500 customers: $24,000/yr = $2,000/mo ; @3000: $12,000/yr = $1,000/mo
Tree decision rule: 2x in 5y = 14.9%/yr
-> all unchanged from 2026-07-08
```

Block 5 — D5 grep, 26 headline quantities incl. new F18-F36 figures:

```
$ python3 (grep-diff over LEDGER/SOURCES/STATE/state.json/TREE/all module FINDINGS/all reports)
$55-116M span, 74.4, 54.8, 35.8%, $167M, $36M, 31-65%, 10.2k, 20-48%, $25-55M, 14.9%, 2025-07-11,
22-29%, 71-402, 335-2,742, 255, 402, 277, 1,500-3,000, $13.3-26.7k, ~10%, 131 domestic,
66 international, 26 acquisitions, 94 over, $961M, 2026-02-05, 2026-04-15
-> zero conflicting values found across LEDGER/SOURCES/STATE.md/state.json/TREE.md/all 5 module
   FINDINGS files/all 3 reports; 22-29% is consistent everywhere it appears (D5 PASS) despite being
   arithmetically imprecise (D7/A11 catches that separately -- the two checks are doing different jobs)
```

Block 6 — D7 new-finding ratios + F36 re-derivation:

```
$ python3
F22 implied ARPU: $12,000-$24,000/yr (claimed $13.3-26.7k/yr) -> sits between PestPac 7-user
  (~$6.7-12.6k/yr) and 100-user (~$60-120k/yr) tiers -> plausible, not absurd
F19/F21 PestPac repricing: $250->$600/mo = +140% = 9-28x a 5-15%/yr SaaS benchmark -> acknowledged
  in-finding as an outlier event, not asserted as typical -> D7 FAIL condition does not fire
F30 cloud alternates: AWS 28%+Azure 21%+GCP 14% = 63% -> 37% residual for smaller providers,
  consistent with ">=3 credible alternates, no chokepoint"

F36 re-derivation from S102's own confirmed figures:
  S-1 vintage: sub 70 / usage 25 / svc 5 -> non-subscription = 25+5 = 30.0%
  TTM vintage: sub 751.61/1011.71=74.29% / usage 226.39/1011.71=22.38% / svc 36.10/1011.71=3.57%
    -> non-subscription = 22.38+3.57 = 25.9%
  Re-derived range: 25.9%-30.0% (stated in ledger: "22-29%") -> DOES NOT MATCH, advisory A11
  Breaker-3 multiple at corrected class-max (30.0%): required out-of-segment share = 0.5/0.30 = 1.67x
    (stated in ledger: "~2x class max") -> also does not precisely match, same advisory
  Qualitative disposition (breaker 3 cannot clear) UNCHANGED under either the stated or corrected figures
```

Block 7 — D1 units/basis walk, F14–F36 (owed re-check, A8):

```
$ python3 (printed all 23 Units/basis cells for F14..F36)
-> zero bare/missing cells; every row dated (CY-basis or explicit "as of 2026-07-11" / access date);
   no FY/CY mixing found
```

Block 8 — Live WebFetch log, 2026-07-11 (15 fetches; ✓ = confirms the registered claim):

```
1.  rollins.com IR mirror (S107)              -> ✓ BOSS quote + 131 domestic/66 intl franchise agreements, verbatim match
2.  pestpac.com/features/...-reporting (S79)  -> ✓ NPMA-33/99-A/99-B, CA/NY Material Reports, AZ TARF, CSV export
3.  tanayj.com S-1 breakdown (S102)           -> ✓ ~70/25/5 quote verbatim match
4.  capterra.com PestPac reviews (S52)        -> ✓ 3.9*/255 reviews, exact match
5.  g2.com/products/gorilladesk (S57)         -> BLOCKED (403) -- confirmed still blocked
6.  web.archive.org (Wayback)                 -> BLOCKED (tool-level refusal) -- confirmed still blocked
7.  sec.gov/cgi-bin/browse-edgar               -> BLOCKED (403) -- confirmed still blocked
8.  bankofcanada.ca Valet API                 -> REACHABLE but stale/wrong-window data (2020, no date-range
                                                   param supplied) -- environment-state change, advisory A13
9.  federalregister.gov (S45 direct)          -> BLOCKED (redirect to unblock.federalregister.gov) -- new
                                                   block class, matches STATE.md's 2026-07-11 note
10. federalreserve.gov H.10                   -> REACHABLE, live current-dated rate (1.4182 CAD/USD,
                                                   2026-07-02) -- environment-state change, advisory A13
11. govinfo.gov mirror of the same rule (S45) -> ✓ effective 2025-07-11, USDA AMS, "err on the side of
                                                   deregulation" quote verbatim -- mirror bypass works (2nd
                                                   instance of the S107 recipe), discharges F14's D4 debt
12. pesticidestewardship.org (S46, url 1)     -> ✓ general state-persistence claim confirmed
13. npmapestworld.org press release (S3)      -> ✓ $13.416B/+6%/109,384 technicians/85.4% residential-
                                                   recurring, all exact matches
14. privsource.com Rollins deal page (S48)    -> REACHABLE but does not itself state the "26/94" aggregate
15. onlinepestcontrolcourses.com (S46, url 2) -> ✓ CA 2yr / WA 2yr / NY 3yr, exact match
16. ad-hoc-news.de (S48, second locator)      -> HTTP 410 GONE -- dead link at verification time, advisory A10
```


---

## Scoped re-run 2026-07-11 (post-remediation, post-red-team-v2)

> These checks establish internal consistency and traceability of the
> work product. They do not establish that the estimates are true.

Scoped sweep per the read-first brief: re-run the two checks that failed
at the 2026-07-11 full sweep (**D4**, **D6**), plus **D5** per the
standard re-run rule ("plus D5 — fixes ripple"), plus **D8** per the
brief's explicit instruction (a new red-team sweep — the v2 sweep — has
run since the last D8 verdict, so it is re-run fresh against the updated
kill list rather than merely carried forward). Taxonomy lock: unchanged,
v1, `defined_terms` still OPEN. **D1, D2, D3, D7 are carried forward**
from the 2026-07-11 full sweep, dated, not re-executed here — see
"Carried forward," below.

Inputs new since the full sweep: F18 RETIRED / F37 promoted (customers +
librarian remediation), TREE.md's stale v1 "C4 OUT-OF-SCOPE" node removed
(A9 remediation), S48's dead-link note appended, and the v2 red-team
sweep (`.diligence/reports/REDTEAM.md#v2-sweep-2026-07-11-f18f37--screens--breakers`)
— two new ledger kills (F22, F35), F7/F12 rulings reaffirmed. No other
artifact changed; in particular **`.diligence/reports/STORYLINE.md` is
byte-identical to the full sweep's copy — still dated 2026-07-08,
still answering TREE.md's superseded v1 GATE-OWNED text** — which is
the central fact this re-run's D6 ruling turns on.

## Re-run result

**Gate remains FAIL.** D4 now PASSES (remediation verified) and D5/D8
PASS (fresh runs), but **D6 FAILS again** on the same substantive
defect the full sweep found — the storyline artifact itself has not
changed, so re-running the check against it reproduces the same
verdict. Per the registry, one FAIL fails the gate; this re-run
narrows the gate's outstanding blocker from two independent defects to
one (D6 only), but does not clear it. No waiver requested or recorded.
This is a scoped re-run that covers every check that failed at the
2026-07-11 full sweep, but per the workflow's own rule ("a scoped PASS
never updates the gate to PASS — gate status changes only on full
sweeps") the inverse also holds by the same logic once any covered
check still fails: the gate cannot be marked PASS while D6 stands.

## Checks

### D4 Citation coverage & tier adequacy — **PASS** (remediation verified)

- **F37's row mechanically checked** (executed Block 9): sources
  `S51, S52, S53, S54, S55, S57` all resolve to registered SOURCES.md
  rows (0 dangling); F18's status field reads `RETIRED`; F37's status
  field reads `OPEN`; the supersession Notes entry ("F37 supersedes
  F18 …") is present in LEDGER.md.
- **The claim no longer rests tier-6-as-authority for a market
  magnitude.** F37's wording was checked programmatically for the
  specific numeral-pattern that triggered the full sweep's FAIL
  (`\d[\d,]*-\d[\d,]*/vendor`, i.e. "71–402/vendor," "335–2,742/vendor"):
  **not found** — those figures were dropped from the claim text
  entirely, not merely re-labeled. What remains is (a) the
  platform-pool-identity fact (Capterra = Software Advice,
  byte-identical n/rating, cross-verified on 2 platforms — a
  mechanically-verified structural fact, not testimony) and (b) an
  explicit self-disclaiming clause: "Per-vendor counts are
  platform-reported catalog metadata, used as corpus description only,
  not market magnitudes." Read against D4's carve-out logic: the
  tier-6 material (the platforms' self-reported counts) is now the
  *object* being described (what kind of corpus this is, and an
  explicit warning against reading it as a magnitude), not the
  authority for a magnitude claim about the underlying market or
  vendor scale — the same structural move the tally-of-testimony
  carve-out makes for direction-only claims, extended here (per this
  sweep's brief) to platform-reported metadata rather than reviewer
  sentiment. This is remediation option (b)/(c) from the full sweep's
  own FAIL-1 remediation list ("restate as qualitative… or demote the
  volume sub-claim"), executed as a genuine reword rather than a
  cosmetic one.
- **Quick scan, F19–F36 (+ F37), for the same failing pattern**
  (executed Block 9): re-ran the full sweep's "all-citations-tier-6"
  scan across every finding from F19 through F37. Result: **only F19
  and F37 rest solely on tier-6 sources** — identical in kind to the
  full sweep's own finding of {F12, F18, F19} as the complete
  all-tier-6 set (F18 has simply been replaced by its successor F37 in
  that set; nothing else joined it). F19 was already explicitly labeled
  direction-only in its own Units/basis cell ("tier-6 testimony tally,
  direction-only per D4") at promotion time and is unaffected by this
  remediation. No other finding in F20–F36 rests solely on tier-6 —
  every one of them carries at least one tier-1–5 source (verified per
  finding in Block 9's output). **No finding inherited F18's failing
  pattern.**
- Verdict on the check as scoped: **PASS.** The remediation is
  substantive (numerals removed, not just re-flagged), mechanically
  verifiable, and does not leave a second finding exposed to the same
  defect.
- Minor hygiene observation, not gating: `modules/customers/FINDINGS.md`
  §Review corpus and `modules/risks/FINDINGS.md` still back-reference
  "F18" by id in prose ("CU1 — corpus build … promoted F18";
  "F18: one pool, now one OWNER") rather than F37. This is a stale
  id-reference, not a conflicting value (D5's FAIL condition is about
  materially different *values*, not back-reference currency), and
  falls under the same hygiene class as open advisory A2
  (Supports-column F-id backfill) — folding it there rather than
  minting a new advisory id, flagged for gdd-librarian.

### D5 Cross-artifact consistency — **PASS** (re-run; ripple rule)

- Ripple scope: the remediation touched LEDGER.md (F18 RETIRED/F37
  promoted, supersession note), TREE.md (stale C4 node removed),
  SOURCES.md (S48 note already carried the dead-link caveat from the
  full sweep, unchanged), and STATE.md/state.json (session log,
  gate note). Re-grepped headline quantities across every
  `.diligence/` artifact focused on this delta (executed Block 10).
- **TREE.md duplicate-node advisory (A9) is remediated**, confirmed
  with one grep: exactly one `C4` node now exists in TREE.md (the live
  "C4. Customers stay (KQ3 → customers) [in scope as of v2]" leaf node
  at line 44); the orphaned v1 "C4 … KQ3 OUT-OF-SCOPE" stub is gone.
  The only other "C4" hit is the unrelated "v2 changes" prose note
  listing which node ids were added — not a second node definition.
- **F36's "22–29%" row text vs. the "≈26–30%" corrected-by-note value:
  both are present, and this is the append-only design working as
  intended, not a D5 conflict.** LEDGER.md's F36 row still states the
  original "≈22–29%" (as promoted by the risks module); LEDGER.md's
  Notes section separately records "F36 bound recomputed at triangulate
  2026-07-11: ServiceTitan non-subscription mix re-derives to ≈26–30%
  (vs the row's 22–29%); direction and the ~2×-class-max trip
  requirement unchanged. Advisory only; the row stands with this note
  as the corrected bound." Every artifact that repeats the figure
  (SOURCES.md S102, `modules/risks/FINDINGS.md`, STATE.md's Position
  and session-log text) consistently carries the *original* row value,
  while STATE.md's 2026-07-11 session-log entries consistently carry
  the *corrected* value with dates — the two numbers never collide
  undocumented in the same artifact; each occurrence is traceable to
  whether it predates or postdates the correction. This is D5's own
  "rounding is allowed; divergence is not" principle applied one level
  up: a superseding *note* coexisting with an unedited append-only
  *row* is exactly the ledger's designed mechanism (same pattern as
  F37 superseding F18), not the "two artifacts silently disagree"
  condition D5 exists to catch. Relying on this reading explicitly, per
  the brief's instruction.
- No new quantity introduced by the remediation conflicts anywhere:
  F37's wording introduces no new numeral; the supersession note's
  prose is consistent between LEDGER.md and STATE.md's session log.
- **PASS.**

### D6 Thesis sensitivity — **FAIL** (re-run; ruling below)

**The candidate reading, considered and rejected: N-A ("storyline v2
pending — sensitivity table and GATE-OWNED answers are its mandated
deliverables, post-storyline D6 re-run mandatory").** This re-run
weighed that reading seriously — the registry's first-sweep rule exists
precisely to prevent a FAIL from deadlocking the artifact that would fix
it, and on its face this looks like the same shape: D6 FAIL blocks
`/gdd:storyline` (per `triangulate.md` step 4), and the storyline is
where D6's own remediation must land. **Ruling: FAIL stands. The
deadlock rationale does not apply here, for four reasons:**

1. **D6 was actually run, not blocked from running.** The first-sweep
   carve-out's own text is "on a sweep run *before the storyline
   exists*" — describing literal absence, where the check's run step
   (verify the table exists, recompute a flex, check flip points) has
   nothing to execute against. That is not this case: `STORYLINE.md`
   exists, its sensitivity table (S-1…S-6) is real and was
   successfully recomputed (2026-07-08's D6 PASS, reconfirmed at the
   full sweep), and the GATE-OWNED section was checked against the
   current TREE.md text and found to answer a retired version of the
   question. That is a completed run with a substantive negative
   verdict — the category N-A exists for ("could not actually run"),
   not the category this is.
2. **The first-sweep rule is a bootstrap rule, not a staleness rule.**
   Its stated rationale is about the very first pass through a pipeline
   that has never produced a storyline — "the pipeline order …
   makes a first-sweep FAIL a deadlock." Here the pipeline has already
   completed one full cycle (storyline → triangulate D6 PASS → red-team
   → this gate) before the scope extension. What's live now is a
   mid-engagement staleness problem created by adding KQ3/KQ4 and 23
   new findings underneath an existing, already-gated artifact — a
   different failure mode the registry's own dogfood-friction note
   (full sweep, this file) explicitly says the rule "is worded for the
   literal absence of a storyline, not for a storyline that exists but
   has gone stale."
3. **The registry already names the correct escape valve for exactly
   this shape of problem, and it is not verifier reclassification.**
   `triangulate.md` step 4: "The user may waive: record the waiver
   verbatim … gate becomes WAIVED." If D6's FAIL is genuinely blocking
   necessary forward motion (the storyline rebuild), the honest,
   transparent fix is to ask the user for a scoped waiver on D6
   specifically so `/gdd:storyline` can run — not to recharacterize a
   check that ran and failed as one that couldn't run. Recasting as
   N-A would produce the same practical unblock as a waiver but without
   the verbatim record a waiver requires — a worse outcome for
   auditability, not a better one.
4. **Nothing changed about the object D6 checks.** The remediation this
   session touched F18/F37, TREE.md's stale node, and S48's note — none
   of it touched `STORYLINE.md`, which is confirmed byte-for-byte
   unchanged since the full sweep (still dated 2026-07-08, still
   answering "retention is untested (KQ3 out)" verbatim, its trace map
   still citing only F1–F13). The full sweep's own FAIL-2 reasoning
   said this explicitly: "even if F18 were fully remediated, D6 would
   still fail today, because the artifact D6 checks … has not been
   rebuilt." That remains true, unchanged, this session. The full
   sweep's own brief warned against reaching for N-A "by analogy to the
   first-sweep carve-out" precisely to head off this move once the
   temptation to close the gate arrived — the temptation arrived this
   session (D4 now clean, D6 the only holdout), and the same warning
   applies with undiminished force.

Consequence, unchanged from the full sweep: the sensitivity table needs
new rows for at minimum F29 (customer-concentration breaker), F35/F36
(breaker 2/3 dispositions — now including the v2 red-team's kills), F20's
axes-re-check trigger, and F21's expansion mechanism, and the GATE-OWNED
sufficiency answer must be given net of F19's retention-direction
testimony rather than treating retention as purely downside-only. None of
this is assessed here; it is the rebuild's job.

**Remediation (updated):** rebuild the storyline on the full five-module
record (still owed, unchanged) — **or**, if the user wants to unblock
`/gdd:storyline` before that rebuild happens, a scoped user waiver on D6
specifically, recorded verbatim per the registry's waiver mechanism, is
the registry-sanctioned way to do it. Either path, D6 must be re-run
against the rebuilt (or waived) artifact before final readout.

### D8 Red-team disposition — **PASS** (fresh run against the v2 kill list, with a flagged caveat)

- **Kill-list diff** (executed Block 11): `LEDGER.md` Status column scan
  confirms CONTESTED = **{F7, F12, F22, F35}** exactly — matching the
  brief's stated set (F7/F12 v1, standing disputes with recorded
  rulings; F22/F35 v2, dispositions pending). No CONTESTED id outside
  this set; no kill missing a status marker.
- **Every kill has a disposition, or a pending-disposition open
  question tracked for storyline declaration:**
  - **F7** — standing dispute, declared in `STORYLINE.md`'s Risks
    section (line 106), unrevived per the v2 sweep's fresh ruling
    ("F7 stands, unrevived" — REDTEAM.md). The v2 ruling refreshes the
    *reasoning*, not the disposition *type*; the existing storyline
    declaration remains the operative disposition.
  - **F12** — standing dispute, declared in `STORYLINE.md`'s Risks
    section (line 107), "stands but sharpened toward — not at —
    revival" per the v2 sweep. Same treatment as F7.
  - **F22, F35** — **new kills, postdating `STORYLINE.md` by
    definition** (v2 red-team ran 2026-07-11, after the storyline was
    last touched 2026-07-08) — **not yet declared in any storyline
    risk section, because no post-kill storyline exists to declare
    them in.** Both are tracked as STATE.md open questions with named
    revive paths ("F22 CONTESTED … disposition needed … D8 enforces at
    next triangulate"; "F35 CONTESTED … disposition needed … D8
    enforces at next triangulate") and REDTEAM.md's kill-list table
    entries state what would revive each. Reading the brief's own
    framing of what satisfies this check for a scoped re-run — "a
    disposition or a pending-disposition open question tracked for
    storyline declaration" — both conditions are met for F22/F35 via
    the second branch.
- **No key-line claim currently rests on a CONTESTED id** (executed
  Block 11 — full-text scan of `STORYLINE.md` against all four
  CONTESTED ids): F7 appears twice — once in the Risks section
  (declared dispute) and once in the GATE-OWNED sufficiency row, labeled
  "F7-CONTESTED at its own high edge" and used arguendo (granted at its
  most favorable edge to show the share lever still can't carry the
  required magnitude — adversarial bounding, not reliance; this is the
  same pattern the 2026-07-08 and full-sweep D8 PASSes already accepted,
  unchanged). F12 appears once, in the Risks section only. **F22 and F35
  appear zero times anywhere in `STORYLINE.md`** — not because they were
  checked and excluded, but because the artifact predates their
  existence and cannot reference them. This is the literal condition
  the check's FAIL clause tests for ("a CONTESTED id appears in the
  key-line trace") and it is clean: none of the four appears in a
  key-line row (governing thought, KL-1…KL-5, or their support rows).
- **Caveat, flagged rather than gating (new, minor):** a mechanically
  clean trace-map diff for F22/F35 is a *negative* result produced by
  the storyline's staleness (the same underlying defect D6 fails on),
  not a *positive* verification that the eventual storyline will
  correctly avoid resting on them. This D8 PASS is exactly as fragile
  as D6's own carry-forward PASSes have historically been flagged to
  be: **mandatory re-run once storyline v2 exists**, at which point the
  rebuilt artifact must explicitly declare F22 and F35 (not just
  F7/F12) in its risk section — if it omits them, or worse, if it
  drafts a key line that assumes away customer concentration or the
  breaker-2 disposition without citing their CONTESTED status, D8 must
  fail then. Recording this now so the next verifier isn't surprised by
  a PASS-to-FAIL flip that isn't actually new information.
- **PASS**, scoped to what a mechanical kill-list/trace-map diff can
  establish today.

## Carried forward (not re-run this session)

- **D1** Units, currency, time basis — PASS, 2026-07-08 (full walk),
  reconfirmed 2026-07-11 (full sweep, F14–F36 walked fresh). Unaffected
  by this session's remediation (no new/changed quantities).
- **D2** Top-down/bottom-up reconciliation — PASS, 2026-07-08, carried
  forward and reconfirmed 2026-07-11 (full sweep; F1–F3 untouched by
  the scope extension or this remediation).
- **D3** MECE audit — PASS, 2026-07-08, reconfirmed 2026-07-11 (full
  sweep) with one advisory (A9, TREE.md duplicate C4 node). **A9 is now
  remediated** — verified above under D5 with a direct grep (one live
  C4 node, orphan stub gone). D3's PASS carries forward with the
  advisory closed, not merely open.
- **D7** Plausibility & base rates — PASS, 2026-07-08, reconfirmed
  2026-07-11 (full sweep, five new ratios computed over F18–F36).
  Unaffected by this session's remediation.

## Executed computations

Blocks continue the full sweep's numbering (that report ends at Block 8).

Block 9 — D4 remediation check (F37 row + tier-adequacy quick scan, F19–F37):

```
$ python3
F37 status field: OPEN
F37 sources field: S51, S52, S53, S54, S55, S57
F37 claim text contains raw vendor review-count numerals ('N-N/vendor' pattern)? -> none found
F37 source tiers: [('S51','6'),('S52','6'),('S53','6'),('S54','6'),('S55','6'),('S57','6')]
All tier 6? True  (unchanged from F18 -- the remediation is wording, not sourcing)
Supersession note present ("F37 supersedes F18" in LEDGER.md): True
F18 status field: RETIRED

Tier-adequacy scan, F19-F37 (all-citations-tier-6 findings only):
  F19  [S51,S52,S53,S56]                 tiers=[6,6,6,6]  ALL-TIER-6=True  -> direction-only, D4-labeled at promotion, OK (unchanged)
  F20  [S51,S52,S53,S54,S58,...]         tiers=[6,6,6,6,4,...]           ALL-TIER-6=False
  F21  [S53,S58,S59,S60,S61,S62,...]     tiers=[6,4,4,4,4,6,...]         ALL-TIER-6=False
  F22  [S63,S64,S65,...]                 tiers=[4,4,5,...]               ALL-TIER-6=False
  F23  [S68,S69,S70,S71,S89,...]         tiers=[4,4,4,4,4,...]           ALL-TIER-6=False
  F24  [S72,S73,S74,S75]                 tiers=[2,2,2,5]                 ALL-TIER-6=False
  F25  [S59,S76..S83,...]                tiers=[4,4,4,4,4,4,5,4,4]       ALL-TIER-6=False
  F26  [S84,S85,S86,S87,S88,...]         tiers=[4,4,4,6,6,...]           ALL-TIER-6=False
  F27  [S67,S79,S80,S89,...]             tiers=[4,4,4,4,...]             ALL-TIER-6=False
  F28  [S45,S46,S74,S79]                 tiers=[2,5,2,4]                 ALL-TIER-6=False
  F29  [S63,S64,S65,S107,...]            tiers=[4,4,5,1,...]             ALL-TIER-6=False
  F30  [S90..S101,...]                   tiers mixed 2/4/5               ALL-TIER-6=False
  F31  [S103..S109]                      tiers mixed 1/4/5/6             ALL-TIER-6=False
  F32  [S115,S116,S117]                  tiers=[1,4,5]                   ALL-TIER-6=False
  F33  [S110..S115,...]                  tiers mixed 1/4/5/6             ALL-TIER-6=False
  F36  [S102]                            tiers=[5]                       ALL-TIER-6=False
  F37  [S51,S52,S53,S54,S55,S57]         tiers=[6,6,6,6,6,6]             ALL-TIER-6=True  -> carve-out applies (object-of-claim, corpus-descriptive), see D4 above
  (F34, F35 cite only other F-ids, no direct S-ids -- transitively resolvable, unchanged from full sweep's treatment)

-> Only {F19, F37} rest solely on tier-6 among F19-F37; both accounted for. No other finding inherited F18's pattern.
```

Block 10 — D5 ripple grep:

```
$ grep -n "C4" TREE.md
44:└─ C4. Customers stay (KQ3 → customers) [in scope as of v2]
67:C4 (customers) and C6 (company/moat) added with leaves H-cust-1..3 and
-> one live node definition (line 44); "v2 changes" prose mention (line 67) is not a second node. A9 remediated.

$ grep -rn "22–29%\|26.0–30.0%\|26–30%" LEDGER.md SOURCES.md STATE.md modules/risks/FINDINGS.md
LEDGER.md:69 (F36 row): "...≈22–29% of total..."                     <- original, unedited (append-only)
LEDGER.md:184 (Notes):  "...re-derives to ≈26–30% (vs the row's 22–29%)..." <- corrected-by-note, dated 2026-07-11
STATE.md:33/183 (Position/open-Qs): "...22–29%..."                   <- pre-correction language, consistent w/ row
STATE.md:344/365-6 (session log): "...(≈26–30%)..." / "re-derives to ≈26–30%" <- post-correction language, dated
SOURCES.md:126 (S102 Supports): "...≈22–29%..."                      <- pre-correction, consistent w/ row
modules/risks/FINDINGS.md: "...≈22–29%..." (x2)                       <- pre-correction, consistent w/ row
-> every occurrence is traceable to row-value vs note-value; no undocumented collision. Not a D5 conflict.

$ grep -c "F18 RETIRED\|F37 supersedes F18" LEDGER.md
2  -> supersession recorded exactly once each, consistent
```

Block 11 — D8 CONTESTED-set diff + STORYLINE.md trace-map scan:

```
$ python3 (ledger status scan)
CONTESTED ledger rows: ['F7', 'F12', 'F22', 'F35']  -- matches brief's stated kill set exactly

$ grep -n "F7\b" reports/STORYLINE.md
12:  ...no key-line claim rests on F7 or F12 (CONTESTED, risks
80:  Share gain: ... Even reviving CONTESTED F7 at its high edge...
97:  | S-5 | F7 disposition (CONTESTED — if revived) | ...
106: - F7 — CONTESTED (L): ... [Risks section]
150: | GATE-OWNED sufficiency check ... F7-CONTESTED at its own high edge ... | <- arguendo, labeled, not key-line reliance
151: | Risks: F7 CONTESTED (displacement pool) | ...

$ grep -n "F12\b" reports/STORYLINE.md
12, 107, 152  -- Risks section only, no key-line reliance

$ grep -n "F22\b" reports/STORYLINE.md   -> (no output: zero hits)
$ grep -n "F35\b" reports/STORYLINE.md   -> (no output: zero hits)

-> F7/F12: Risks-section declarations + one labeled arguendo use (accepted pattern, unchanged since 2026-07-08).
-> F22/F35: zero mentions anywhere -- storyline predates both kills, cannot reference them.
-> No CONTESTED id in any key-line row (governing thought / KL-1..KL-5 / their support rows). D8's FAIL
   clause ("a CONTESTED id appears in the key-line trace") does not fire. Caveat: F22/F35's clean trace
   is an artifact of staleness, not a verified-safe storyline -- flagged above, mandatory re-run at storyline v2.
```

Block 12 — F22 kill arithmetic re-derivation (external-oracle recomputation):

```
$ python3
15% of $40,000,000 teaser ARR = $6,000,000
Locations needed at ARPU $13,300/yr: 451.1 -> recorded '451'
Locations needed at ARPU $26,700/yr: 224.7 -> recorded '225'
Recomputed range: 225-451 locations on one vendor trips breaker 1
Matches REDTEAM.md's stated "225-451 acquired locations"? True
-> F22 kill arithmetic reproduces exactly; not a magnitude claim about any real platform's actual
   count (REDTEAM.md's own framing) -- a survivorship-gap finding (F22's own four sources never
   examine the PE roll-up-platform channel at all), correctly not asserted as fact.
```

## Deviations & friction notes

- No deviations from the shipped workflow this session — read-only over
  `.diligence/` findings/reports, write scope held to
  `.diligence/reports/TRIANGULATION.md`, `state.json.gates.triangulation`,
  and STATE.md's Gates/session-log lines, per the verifier's remit.
- Dogfood friction (new): D8's registry text has no explicit provision
  for "a kill postdates the only existing storyline and therefore cannot
  appear in its trace map" — the check's mechanical FAIL clause reads
  this as trivially clean, but the honest state is "not yet tested,"
  not "tested and safe." The same gap D6 already surfaces (stale
  storyline vs. a genuinely absent one) recurs here one check over; a
  future registry revision could usefully note that a kill newer than
  the referenced storyline is a distinct disposition state from either
  "disposed" or "no disposition," carrying its own mandatory-re-run flag
  rather than reading as a silent PASS.
- Friction (new): the registry's D4 tally-of-testimony carve-out was
  written for "what reviews say" (sentiment/direction tallies); this
  session's F37 remediation extends its logic to "what a platform
  reports about itself" (catalog metadata) by analogy, per this task's
  explicit brief. The extension is defensible (same object-vs-authority
  structure) but is a second instance of the same registry-wording gap
  the full sweep already flagged for F18 — worth folding into a future
  registry clarification rather than re-deriving the analogy per
  engagement.

### Waiver — 2026-07-11 (post scoped re-run)

Gate moves FAIL → WAIVED on the remaining blocker (D6) per the report
rules (waivers are the user's, quoted verbatim):

> "Waive D6 for the storyline-v2 build only: the FAIL is staleness of the superseded v1 storyline, and storyline v2's mandated deliverables (v2 sensitivity table, v2 GATE-OWNED answers, CONTESTED declarations for F22/F35) are the remediation itself. D6 and D8 re-run mandatory immediately post-storyline; the waiver lapses at that re-run." — scripted waiver, synthetic validation engagement, orchestrator for the maintainer, 2026-07-11

Scope: unblocks /gdd:storyline only. D4/D5/D8 verdicts unaffected; the
post-storyline D6/D8 re-run is the waiver's expiry condition.

---

## Post-storyline scoped re-run 2026-07-11 (D6, D8, D5 ripple — waiver lapse)

> These checks establish internal consistency and traceability of the
> work product. They do not establish that the estimates are true.

This is the waiver's own expiry condition, run against its own text:
"D6 and D8 re-run mandatory immediately post-storyline; the waiver
lapses at that re-run." `.diligence/reports/STORYLINE.md` v2 landed
2026-07-11 (supersedes the byte-identical-since-2026-07-08 copy that
caused the D6 FAIL this waiver covers). Scope per the read-first brief:
**D6** (the real check, not the N-A/deadlock reasoning — the storyline
now exists and is the object being checked), **D8** (fresh, against the
current kill list {F7, F12, F22, F35}), and **D5** per the standard
ripple rule (the storyline is a new number-bearing artifact). Taxonomy
lock unchanged, v1, `defined_terms` still OPEN. **D1, D2, D3, D4, D7 are
carried forward**, dated — see "Carried forward," below; not re-run
here.

Registry note: this run applies `verification-checks.md` **as amended
2026-07-11** (D6 staleness rule now codified in the registry text
itself rather than reasoned from first principles per-run; D8's
stale-trace-fragility note; D4's citation-chain clause). Where the
fold-back changed a ruling from how the prior scoped re-run reasoned it
manually, that is called out below.

## Re-run result

**D6 PASS · D8 PASS · D5 clean (one new advisory, non-gating).** Both
mandated re-runs are discharged **on their own merits** — the check
actually verified the v2 sensitivity table and the v2 GATE-OWNED
answer, not merely confirmed the storyline exists. **Gate moves WAIVED
→ PASS**: the waiver's mandates were met, the FAIL it covered
(storyline staleness) no longer exists, and no new FAIL was found
re-deriving the v2 artifact from scratch. Two new advisories (A14, A15)
opened, neither gating.

## Checks

### D6 Thesis sensitivity — **PASS** (real run, not carried/waived)

- **Sensitivity table exists and covers the top assumptions of the
  five-module record:** 11 rows (S-1…S-11), confirmed by direct count
  (executed Block 13) — more than double the registry's default
  top-5. Coverage spans all five modules: market (S-1, S-2), share/
  displacement (S-5, S-8), pricing/customer-base (S-4), KPC-rank
  robustness (S-6), the new expansion lever (S-7), the two new
  CONTESTED-if-revived breaker scenarios (S-8, S-9), the F36 breaker-3
  bound correction (S-10), and retention direction (S-11, the
  GATE-OWNED tie-in).
- **Flexes recomputed independently in executed code (Block 13),
  load-bearing rows selected per the brief:**
  - **S-1 (F1-span edge):** implied share at span top ($116M) = **31.0%**
    (storyline: 31%) ✓; at span low ($55.8M) = **64.5%** (storyline:
    65%, rounds correctly) ✓. Reading B uplift (+25–35% on both legs)
    recomputed independently: $69.8–75.3M low edge / $145.0–156.6M high
    edge depending on which end of the 25–35% band is applied — the
    storyline's prose gloss "~$75–116M, possibly slightly above" is
    carried verbatim from REDTEAM.md's v1 dispute language (not a v2
    computation) and is imprecise about which edge moves how much, but
    it does not affect the Flips? verdict: every construction in both
    my recomputation and the storyline's stays under the $200M bar and
    the $167M max-defensible-high. **No flip**, confirmed independently.
  - **S-8 (F22-revived concentration scenario):** 15% of $40M = $6.0M;
    at ARPU $13,300/yr → **451.1 → 451** locations; at ARPU $26,700/yr →
    **224.7 → 225** locations (executed Block 13) — both reproduce the
    storyline's "451 / 225" exactly. **No flip to the governing
    thought**, confirmed; breaker 1's narrative status genuinely moves
    from lean-favorable to open, matching the row's stated effect.
  - **S-2 (growth rate):** 1.4%/yr → 1.072×; 6.0%/yr → 1.338×; 5.6%/yr
    (tier-6 low) → 1.313×; 12.5%/yr (tier-6 high) → 1.802× — all < the
    required 2.00× (14.87%/yr required, recomputed independently,
    matches the tree's stated ~14.9%). **No flip at any evidenced or
    calibration-only rate.**
  - **S-10 (F36 corrected bound):** re-derived the two ServiceTitan
    vintages independently from first principles (not just re-typing
    the stated figures): S-1 vintage 100−70=**30.0%**; TTM vintage
    22.38+3.57=**25.9%** → corrected range **25.9–30.0%**, matching the
    storyline's stated "26.0–30.0%" (rounds up from 25.9). Trip
    multiples recomputed: stated bound → 50/22=2.27×, 50/29=1.72×;
    corrected bound → 50/26=1.92×, 50/30=1.67× — matches the storyline's
    "1.92x, 1.67x" exactly, and the claim-5 body's "~1.7–1.9×" rounds
    correctly from it. **Confirmed:** the correction is a "modest
    tightening, not a reversal," as stated — both bounds support the
    same "cannot clear" disposition.
  - **S-11 / GATE-OWNED "net of evidenced retention direction":**
    tenure_share = 13/24 = **0.542**, churn_share = 11/24 = **0.458**
    (near-parity, doesn't clear a "dominates" bar, matches storyline);
    PestPac's share of churn = 6/11 = **0.545** (matches storyline).
    Confirmed independently: this is a genuine incorporation of
    direction *evidence* (F19), not a restatement of v1's pure
    blind-spot framing — the arithmetic exists and the conclusion it
    supports ("cannot rescue, because gross already assumes zero
    churn") is a correct implication of the other, already-negative
    gross-of-retention figures (all < 2.00×). **No flip.**
  - **One genuine defect found by independent recomputation, not
    matched by any prior session's figure:** the storyline's Gate-owned
    "share gain" sub-block computes `capture_needed = (2 ×
    teaser_NA_ARR) / pool_spend` = 72/37.8 = **1.90 (~190%)**, labeled
    "unchanged from v1, since F7/F9/D7-1 are untouched by the scope
    extension." Recomputing the actual v1 figure from the same inputs
    (Block 13): the *increment* needed to double ($72M − $36M = $36M)
    as a fraction of the same $37.8M pool is **95.2%** — this is the
    figure both `TRIANGULATION.md`'s 2026-07-08 recomputation ("capture
    needed to add $36M = 95%") and `STATE.md`'s 2026-07-08 session log
    ("~$38M/95–100% capture") independently and consistently record,
    unchanged since, with no supersession note. **95% ≠ 190%; the "
    unchanged from v1" claim is not accurate** — v2 switched from an
    increment-based formula to a total-target-based formula without
    disclosing the reframing. This does **not** change the Flips?
    verdict (both readings support "cannot be rescued via displacement
    alone" — 190% is, if anything, a *stronger* statement, since it is
    mathematically impossible to capture more than 100% of a pool) and
    is confined to a hedged, non-key-line, arguendo sub-computation
    (Gate-owned + sensitivity row S-5 only — confirmed via the D8 trace
    scan below). Ruled **advisory, not a FAIL**, on the same basis the
    engagement has used before for confirmed-but-non-dispositive
    arithmetic misses (A11 precedent: "qualitative disposition …
    unchanged either way"). Logged as **A14**.
- **Flip points:** across all 11 rows, independent recomputation
  reproduces the storyline's "No" verdict in every case actually
  checked (S-1, S-2, S-5/Gate-owned, S-8, S-10, S-11 recomputed in full;
  S-3/S-6/S-7/S-9 are qualitative-only by their own text — no arithmetic
  exists to re-derive, correctly flagged as such in the table itself).
  **The storyline's claim of "no flips" is confirmed, not merely
  asserted.**
- **GATE-OWNED conditions from TREE.md v2 answered explicitly with
  executed arithmetic — the "net of evidenced retention direction"
  wording specifically:** confirmed. `STORYLINE.md`'s "Gate-owned
  conditions" section states the question in v2 wording verbatim
  ("net of evidenced retention direction … superseding v1's 'net of
  retention'") and answers it with a dedicated executed block (F19's
  tenure/churn shares, independently reproduced above) rather than only
  restating the v1 blind-spot language — this is the specific defect
  the full-sweep and prior scoped re-run's D6 FAILs were about, and it
  is now cured.
  - **Dogfood friction (new):** `TREE.md` itself is internally
    inconsistent about which wording is canonical. Its formal
    "GATE-OWNED" block (the artifact's own authoritative-looking
    section, lines 56–60) still reads the **literal v1 text** — "net of
    retention (retention itself untested — KQ3 out)" — verbatim,
    unedited since v1. Only the separate "v2 changes" narrative note
    below it (lines 66–72) states the updated wording ("now runs net of
    evidenced retention direction"). `TREE.md` calls itself the
    "Canonical tree artifact" yet a reader hitting the formal block
    first (as this run's read-first brief pointed at) sees stale text.
    This run followed the same resolution the full-sweep D6 FAIL
    already used (treating the dated "v2 changes" note as authoritative
    over the unedited formal block), and the storyline's own header
    comment does the same ("v2 wording (TREE.md, superseding v1's 'net
    of retention')") — so the *substance* of this check is unaffected —
    but the underlying `TREE.md` hygiene defect is unremediated,
    structurally identical in kind to the already-fixed A9 (duplicate
    C4 node). Logged as **A15**, owner gdd-planner.
- **Risk language reflects the flip-point findings:** confirmed — the
  Risks & sensitivities section's sensitivity table, the "Net" summary
  paragraph, the deregulatory decay vector subsection, and the six
  unresolvable disputes are mutually consistent with every recomputed
  figure above; no row's "Flips?" verdict is contradicted by its own
  "Effect on conclusions" cell or by independent recomputation.
- **FAIL clause tested:** no assumption's plausible range flips a
  key-line claim unstated. **PASS.**

### D8 Red-team disposition — **PASS** (fresh run against {F7, F12, F22, F35}, no longer fragile)

- **Kill-list diff** (executed Block 14): `LEDGER.md` Status column scan
  confirms CONTESTED = **{F7, F12, F22, F35}** exactly, matching the
  current red-team kill list. No CONTESTED id outside this set.
- **Every kill has a disposition or a declared standing dispute in the
  v2 storyline's risk section, labeled with disposition status** — the
  waiver's explicit mandate, verified directly (grep, Block 14) rather
  than inferred:
  - **F7** — "CONTESTED, standing dispute, ruling: stands, unrevived."
  - **F12** — "CONTESTED, standing dispute, ruling: stands, sharpened
    toward but not at revival."
  - **F22** — "CONTESTED, new kill, disposition pending," full kill
    reasoning and revive path restated.
  - **F35** — "CONTESTED, new kill, disposition pending," full kill
    reasoning and revive path restated.
  All four are labeled with an explicit disposition-status phrase
  (not just cited) exactly as the waiver required.
- **No CONTESTED id appears in the key-line trace** (executed full-text
  scan of `STORYLINE.md` against all four ids, Block 14): F7 and F12
  occur only in the header comment, the Risks section, the
  GATE-OWNED row (F7 once, labeled arguendo), and the trace map's
  Risks/GATE-OWNED rows — zero occurrences in the governing thought,
  KL-1…KL-5, or their support bullets. **F22 and F35 occur zero times
  in the key-line body and zero times anywhere outside the Risks
  section, the sensitivity table (S-8/S-9, both explicitly
  "CONTESTED — if revived"), and the trace map's Risks rows** — same
  clean result, but this time a *positive* verification (the storyline
  postdates both kills and was built with them in view), not the
  staleness-derived artifact the prior scoped re-run flagged as fragile.
  **This discharges that exact flagged mandate**: "the rebuilt artifact
  must explicitly declare F22 and F35 … if it omits them … D8 must fail
  then" — it does not omit them.
- **Arguendo-F7 ruling, under the registry as now written:** F7 appears
  once in the GATE-OWNED sufficiency row, explicitly labeled "F7-CONTESTED
  at its own high edge" and used to grant the disputed reading its most
  favorable case in order to show the share lever *still* cannot carry
  the required magnitude — adversarial bounding, not reliance. **Ruling:
  not a FAIL.** The 2026-07-11 fold-backs to `verification-checks.md`
  (D6 staleness rule, D8 stale-trace-fragility note, D4 citation-chain
  clause) do not touch the GATE-OWNED-vs-key-line-trace boundary this
  ruling turns on — D8's FAIL clause is scoped to "the key-line trace,"
  and this engagement's own prior three D8 PASSes (2026-07-08 scoped
  re-run, 2026-07-11 full sweep, 2026-07-11 scoped re-run) have
  consistently and explicitly excluded the GATE-OWNED row from that
  scope when the CONTESTED use there is labeled arguendo. This run
  applies the same reading for the same reason, unchanged by the
  fold-backs. Consistent with the previously-accepted pattern.
- **PASS**, no caveat this time — the prior run's flagged fragility
  (clean trace by staleness, not by verification) is resolved: this is
  now a clean trace by construction.

### D5 Cross-artifact consistency — **PASS** (ripple; new artifact)

- Grepped 11 headline quantities across `.diligence/` including the new
  `STORYLINE.md` (executed Block 15): $55–116M span, $167M, $36M NA
  teaser, 31–65% share, 14.9%/yr, ~10.2k digitized, $74.4M/$54.8M legs,
  35.8% gap, 20–48% F7 range, $25–55M PestPac — **no two artifacts
  state materially different values for any of these.** Tenure/churn
  counts (n=13/n=11), their derived shares (0.542/0.458), and PestPac's
  churn share (0.545) all reproduce exactly against independent
  recomputation and are internally consistent between `LEDGER.md` (F19)
  and `STORYLINE.md`.
- **F36 corrected-by-note bound:** confirmed the storyline uses — and
  says it uses — the **corrected** value. `STORYLINE.md`'s claim-5 body
  and sensitivity row S-10 both state "corrected to 26.0–30.0%" with
  the derivation shown and the stated-vs-corrected multiples both
  given; `LEDGER.md`'s F36 row still carries the original "≈22–29%" per
  the append-only rule, with the correction living in the Notes section
  — the same append-only-row-plus-superseding-note pattern the prior
  scoped re-run already ruled is D5's intended mechanism, not a
  violation, applied consistently here.
- **New finding this run, not caught by any prior sweep:** the
  "capture needed" figure (F7-revived-pool arguendo scenario) diverges
  between `STORYLINE.md` v2 ("~190%") and both `TRIANGULATION.md`'s
  2026-07-08 block and `STATE.md`'s 2026-07-08 session log (both
  "~95–100%") for what the storyline's own text calls the same,
  unchanged scenario — no supersession note bridges the two. On
  inspection (D6 above) the two figures answer differently-formulated
  questions (increment-capture vs. total-target-capture), so this is
  narrower than a textbook "same quantity, different value" — the
  formulas genuinely differ — but the storyline's "unchanged from v1"
  framing asserts an identity that does not hold. **Ruled advisory
  (A14, shared with D6 above), not a FAIL**: it is not the *same*
  computed quantity by formula (so D5's FAIL clause — "the same
  quantity … materially different value" — does not cleanly fire), the
  divergence does not touch any key-line claim, and it does not reverse
  any conclusion. Flagged prominently rather than silently passed,
  consistent with this engagement's practice of surfacing exactly this
  class of defect (cf. A11).
- **PASS**, with A14 carried as the one open item.

## Carried forward (not re-run this session)

- **D1** Units, currency, time basis — PASS, 2026-07-08 (full walk),
  reconfirmed 2026-07-11 (full sweep, F14–F36 walked fresh). Unaffected
  by the storyline landing (no new priced quantity outside what D1
  already covers).
- **D2** Top-down/bottom-up reconciliation — PASS, 2026-07-08, carried
  forward and reconfirmed 2026-07-11 (full sweep). F1–F3 untouched.
- **D3** MECE audit — PASS, 2026-07-08, reconfirmed 2026-07-11 (full
  sweep and post-remediation scoped re-run; A9 duplicate-node advisory
  closed at the latter).
- **D4** Citation coverage & tier adequacy — PASS, 2026-07-11
  post-remediation scoped re-run (F37 remediation verified: no
  magnitude numerals, sources resolve, supersession recorded; only
  {F19, F37} rest solely on tier-6 among F19–F37, both under the
  carve-out). Unaffected by the storyline landing — D4 covers
  `LEDGER.md`, not `STORYLINE.md`.
- **D7** Plausibility & base rates — PASS, 2026-07-08, reconfirmed
  2026-07-11 (full sweep, five new ratios computed over F18–F36).

## New advisories (A14, A15; A1–A13 unchanged and still open except A9, closed)

| # | Defect | Owner | Remediation |
|---|---|---|---|
| A14 | `STORYLINE.md` v2's Gate-owned "share gain" F7-arguendo block computes capture-needed as `(2×teaser_NA_ARR)/pool_spend` ≈ 190%, labeled "unchanged from v1"; the actual v1-consistent (increment-based) figure, independently re-derived from the same inputs, is ≈95–100% (matches `TRIANGULATION.md` 2026-07-08 and `STATE.md` 2026-07-08 exactly) — a different formula silently substituted for a claimed-identical one. Does not affect any Flips? verdict or key-line claim (190% is, if anything, a stronger statement than 95%) | gdd-storyliner (next revision) | Either revert to the increment-based ~95% figure for continuity, or keep the total-target framing but drop "unchanged from v1" and state explicitly that the question being asked changed |
| A15 | `TREE.md`'s formal "GATE-OWNED" block (lines 56–60) still states the literal v1 sufficiency-check wording ("net of retention … KQ3 out") verbatim; only the separate "v2 changes" narrative note (lines 66–72) states the current wording ("net of evidenced retention direction"). The canonical artifact contradicts itself on which wording is current | gdd-planner | Rewrite the formal GATE-OWNED block's own text to state the v2 wording directly; retire the need to cross-reference the changelog note to find the live question — same class of defect as the already-remediated A9 |

Still owed before final readout (carried, unchanged): A1–A8, A10–A13
remediations; defined_terms OPEN (blocks F8/F13/F36 resolution); the
ledger's "D8 disposition records" placeholder (A7) should now be filled
per this run's confirmed dispositions.

## Executed computations

Block numbering continues from the prior sections (last used: Block 12).

Block 13 — D6 independent flex recomputation (F1-span, F22-concentration, growth, F36-bound, retention-direction, and the capture-needed diagnostic):

```
$ python3
Decision rule: 2^(1/5)-1 = 0.1487 (14.87%/yr, matches TREE.md's ~14.9%); 1.149^5 = 2.003

S-1 (F1 span): share at $116M top = 31.0% ; share at $55.8M low = 64.5% (storyline: 31% / 65%) -> MATCH
  Reading B independent recompute: +25% -> $69.8-145.0M ; +35% -> $75.3-156.6M (storyline prose "~$75-116M,
  possibly slightly above" is carried v1 dispute language, imprecise on which edge moves how much, but
  every construction stays under $167M/$200M -> Flips? No, confirmed either way)

S-2 (growth): 1.4%/yr->1.072x | 6.0%/yr->1.338x | 5.6%/yr->1.313x | 12.5%/yr->1.802x (all <2.00x required)

S-8 (F22 concentration): 15% of $40M = $6.0M; @ARPU $13,300 -> 451.1 locations; @ARPU $26,700 -> 224.7
  locations (storyline: 451 / 225) -> MATCH

S-10 (F36 bound): S-1 vintage 100-70=30.0%; TTM vintage 22.38+3.57=25.9% -> corrected range 25.9-30.0%
  (storyline: 26.0-30.0%, rounds correctly)
  trip multiples: stated 50/22=2.27x,50/29=1.72x | corrected 50/26=1.92x,50/30=1.67x (storyline: MATCH exactly)

S-11 / GATE-OWNED retention direction: tenure_share=13/24=0.542, churn_share=11/24=0.458,
  PestPac_share_of_churn=6/11=0.545 (storyline: MATCH exactly)

CAPTURE-NEEDED DIAGNOSTIC (F7-revived pool, Gate-owned "share gain" block):
  pool_spend @ F7 high edge = 7000 * 5400 = $37,800,000
  storyline's formula: 2*36M/37.8M = 1.905 (~190%) -- "to double NA ARR purely from displacement"
  v1-consistent formula: (72-36)/37.8 = 0.952 (~95.2%) -- "capture needed to ADD $36M" (increment)
  TRIANGULATION.md 2026-07-08: "capture needed to add $36M = 95%"  <- matches the increment formula
  STATE.md 2026-07-08 session log: "~$38M/95-100% capture"          <- matches the increment formula
  -> storyline's "~190%" and "unchanged from v1" are internally correct arithmetic but an inaccurate
     continuity claim: the FORMULA changed (total-target vs increment), not just rounding. Flagged A14.
```

Block 14 — D8 kill-list diff + trace-map scan:

```
$ python3 (ledger status scan)
CONTESTED ledger rows: ['F7', 'F12', 'F22', 'F35']  -- exact match to current kill list

$ grep -n "\bF7\b" reports/STORYLINE.md   -> header(1), Gate-owned share-gain para(1x3 lines), S-5 row(1),
   Net summary(1), CONTESTED declarations para(1), F7 disposition bullet(1), GATE-OWNED trace row(1),
   Risks trace row(1)  -- zero occurrences in governing thought / KL-1..5 / support bullets
$ grep -n "\bF12\b" reports/STORYLINE.md  -> header(1), CONTESTED declarations para(1), F12 disposition
   bullet(1), Risks trace row(1)  -- zero occurrences in key-line body
$ grep -n "\bF22\b" reports/STORYLINE.md  -> header(1), S-4 corroboration note(1), S-8 row(1), Net summary(1),
   CONTESTED declarations para(1), F22 disposition bullet(1), unresolvable dispute 6(1), breaker-1 blind-spot
   bullet(1), F15 cross-ref(1), Risks trace row(1), unresolvable-disputes trace row(1)  -- zero in key-line body
$ grep -n "\bF35\b" reports/STORYLINE.md  -> header(1), S-9 row(1), CONTESTED declarations para(1), F35
   disposition bullet(1), unresolvable dispute 5(1), breaker-2 blind-spot bullet(1), Risks trace row(1),
   unresolvable-disputes trace row(1)  -- zero in key-line body

-> No CONTESTED id in governing thought, KL-1..KL-5, or their support rows. F7's single GATE-OWNED
   appearance is labeled arguendo, consistent with the pattern accepted at every prior D8 run
   (2026-07-08 scoped re-run, 2026-07-11 full sweep, 2026-07-11 scoped re-run).
-> F22/F35 now appear IN the storyline (Risks section, sensitivity rows S-8/S-9, disputes, trace map) --
   the "mandatory declaration" flagged as owed at the prior scoped re-run is discharged.
```

Block 15 — D5 ripple grep (11 headline quantities + tenure/churn figures):

```
$ python3 (regex count, storyline vs ledger)
$55-116M: storyline=6 ledger=3 | $167M: 5/2 | $36M: 5/2 | 31-65%: 3/1 | 14.9%: 7/1 | ~10.2k: 5/2
$74.4M: 2/2 | $54.8M: 2/2 | 35.8%: 1/1 | 20-48%: 1/1 | $25-55M: 1/1
n=13: 2 | n=11: 2 | "6 of 11": 1 | 0.542: 1 | 0.458: 1
S-row count in sensitivity table: 11 (S-1 .. S-11)
-> present and consistent everywhere checked; no conflicting values found
```

## Gate ruling

**Gate moves WAIVED → PASS.** The 2026-07-11 waiver's expiry condition
— "D6 and D8 re-run mandatory immediately post-storyline; the waiver
lapses at that re-run" — is this run. Both mandated checks were run for
real (not reasoned as N-A, not carried forward unchecked) and both
PASS on independent re-derivation; D5's ripple check is clean modulo
one non-gating advisory (A14). The waiver is **discharged**, not merely
expired: its specific mandates (v2 sensitivity table, v2 GATE-OWNED
answer net of evidenced retention direction, CONTESTED declarations for
F22/F35 with disposition status) were each independently verified
present and correct above, not just asserted present.

**What this gate now certifies:** internal consistency and
traceability of the full five-module record (F1–F37) and
`STORYLINE.md` v2 — specifically: D1–D8 all PASS (D1–D4, D7 carried
forward with their dates; D6, D8 freshly re-run and PASS; D5 re-run and
PASS) as of 2026-07-11. It does **not** certify that KestrelSoft's
thesis is true, that the $55–116M market span or any other estimate is
correct, or that the CONTESTED findings (F7, F12, F22, F35) are wrongly
killed — those remain open disputes and standing red-team kills,
correctly carried as such. Two non-gating advisories (A14, A15) and the
pre-existing advisory backlog (A1–A8, A10–A13) remain open, none
blocking.

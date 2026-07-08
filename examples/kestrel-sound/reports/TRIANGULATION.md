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

**Reason:** `reports/REDTEAM.md` does not exist; the red-team gate is
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
both now runnable: `reports/STORYLINE.md` and `reports/REDTEAM.md`
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

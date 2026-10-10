# Market sizing methods

Method reference for the sizer agents. Each sizer reads ONLY its own
section plus Common rules — independence between the legs is enforced by
the size-market workflow, and this file is structured so a leg never
sees the other's method section.

## Common rules (both sizers)

- The segment definition in the taxonomy lock IS the market. Sizing a
  more convenient adjacent definition and adjusting later is a D3/D5
  defect.
- Every figure: units/currency/period per the lock, source id inline,
  original figure retained beside any conversion.
- Ranges come from real uncertainty (anchor spread, filter bounds, count
  bounds), not ±X% decoration. State what drives low vs high.
- Label ESTIMATE anything not directly sourced, with its basis. An
  unlabeled estimate found later poisons the whole leg's credibility.
- Growth: size the base year first, then growth separately. A "2030
  market size" without a sourced base-year build is forecast fan
  fiction.
- Precision: the taxonomy's significant-figures rule is a cap, not a
  target — report at the precision your inputs support and say so
  ("~$100M, defensibly $60–230M" beats a false-precision $96.5M).

## Top-down

Anchor → successive filters → segment.

**Anchor selection.** Find 2–3 candidates; prefer the highest tier;
justify the choice (coverage of the right universe beats precision of
the wrong one). Good anchors: national industry revenue (official
stats), category spend from a tier-3 sizing with a published
methodology, the aggregate revenue of the universe's public players
grossed up by their known share. Record rejected anchors and why.

**Filter chains.** Each step: what it cuts, the ratio, the source or
ESTIMATE basis. Canonical chain shapes:
- *Spend-share chain*: industry revenue → % spent on the category
  (e.g. services revenue → software spend as % of revenue, from
  operator P&L disclosures or vertical benchmarks).
- *Geography/segment cuts*: apply locked boundaries; the ratio's
  denominator definition must match the anchor's (mismatch here is the
  most common silent error).
- *Layer-cake check*: if two chains from different anchors exist, run
  both; their spread feeds the range.

**Failure modes to avoid:** citing a sizing that itself cites your
other anchor (fake corroboration — trace to the root); using a TAM
slide from any interested party as an anchor (tier 4 cap); filters
whose product is precise ($1.137B) while inputs are ranges.

## Bottom-up

Units × penetration × price from the buyer side.

**Unit of account.** Take it from the locked segment definition
(operators? locations? trucks? seats?). If the definition doesn't
imply one, that's an OPEN taxonomy field — stop and report, don't pick
silently.

**Counts.** Registry/census-grade first: business census codes,
license registries (pest control is licensed in most US states),
association memberships (with coverage rate), review-platform listing
counts (with dedup basis). Triangulate two count sources before
trusting either.

**Penetration.** The share of units that buy ANY solution in the
category (vs paper/spreadsheets). This is usually the weakest input —
source it from adoption surveys or infer from vendors' disclosed
customer counts vs the universe (show the inference), and give it the
widest range.

**Price.** Observed price points only: published pricing pages (record
tier and date), ARPU from filings, procurement disclosures. Map price
to the unit of account explicitly (per-truck/month vs per-location/
year). NEVER back price out of a market-size report — that contaminates
the leg (D2 checks for exactly this).

**Failure modes:** double-counting multi-state operators in license
registries; penetration and price both taken from the same vendor's
profile (correlated optimism); seats-based price applied to
location-based counts.

## Reconciliation (run by the orchestrating command, not the sizers)

1. Recompute both legs' arithmetic (executed code block — the
   verifier will re-run it anyway).
2. Gap = |TD − BU| / min(TD, BU); tolerance from the taxonomy lock
   (default 30%).
3. **Within tolerance:** record both legs, the reconciled figure with
   its basis (midpoint only if legs are equally strong; otherwise
   weight toward the stronger leg and say why), and name the residual
   gap's driver.
4. **Outside tolerance:** no averaging — the gap is information.
   Diagnosis order (most common culprits first):
   a. *Definition mismatch* — the legs quietly sized different
      universes (check each leg's boundary handling against the lock).
   b. *Penetration* — BU's weakest input; check the inference.
   c. *Spend-share ratio* — TD's weakest input; check the cohort it
      came from resembles the locked segment.
   d. *Unit/period slips* — monthly×annual, per-truck×per-operator.
   Re-run the weaker leg with the diagnosis in its prompt (fresh
   agent; other leg still withheld). One re-run; if still outside
   tolerance, record irreconciliation as a ledger finding (confidence
   L) with both legs shown — that is an honest, useful result.
5. The reconciliation section of .diligence/modules/market/FINDINGS.md is what
   ledger F-ids cite; it must stand alone: both legs summarized, gap,
   verdict, driver.

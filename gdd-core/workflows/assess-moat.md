# Workflow: assess-moat

Preconditions: taxonomy lock. Best after probe-customers (KPC rows) and
map-competitors (the competitive set); if either hasn't run, grid rows
fall back to the taxonomy's buying criteria and the competitive set
falls back to taxonomy boundary cases, and STATE.md flags the re-check —
mirrors how map-competitors handles a missing market denominator.

1. Spawn `gdd-analyst` with `.diligence/modules/company/BRIEF.md` (or a
   default brief if the tree didn't produce one — note that in
   STATE.md), plus `references/moat-evidence.md`.
2. Analyst tests each claimed mechanism against the taxonomy in
   moat-evidence.md: confirming evidence, killing evidence, verdict —
   built now, not left for the red team to surface later.
3. Heavy evidence gathering delegates to `gdd-researcher` fresh-context,
   one researcher per mechanism, parallel where independent (mechanisms
   don't share evidence bases — switching-cost testimony doesn't inform
   the IP check).
4. Cross-check inline: product-feature moats answer the one-release-
   cycle test; grid rows are customer-evidenced KPCs (cite by finding
   id) and precede cells; retention/switching evidence already
   established in the customers module is cited by finding id, never
   re-derived (circularity rule).
5. Write `.diligence/modules/company/FINDINGS.md`; promote headliners to
   LEDGER.md; update STATE.md (module row, Position, session-log line).
   UNREACHABLE rungs (cohort retention, win/loss internals) seed the
   open questions.

## Method notes (for the analyst prompt)

- Mechanism taxonomy (full tests in moat-evidence.md): switching costs,
  network effects, scale economies, brand/category ownership,
  regulatory/licensing, IP, data/workflow depth. A claim without a named
  mechanism from this list is not a finding — rewrite or drop it.
- One-release-cycle test: every product-feature moat states what stops a
  funded incumbent from shipping it in one release cycle, cited to a
  release-velocity comparison, the incumbent's public roadmap/changelog,
  or a third-party-sourced architectural reason. "They haven't yet"
  without checking whether they already announced it caps confidence
  at L.
- Grid: rows are customer-evidenced KPCs from the customers module, not
  the union of vendor feature lists — rows precede cells. Cells cite
  public artifacts (docs, changelogs, review complaints); a cell filled
  from the vendor's own comparison page is tier 4 and marked; empty
  cells stay empty ("not determinable outside-in") rather than default
  to the target's favor.
- Circularity rule: retention evidence belongs to the customers module —
  cite its finding id, don't re-derive "high retention proves switching
  costs, switching costs explain retention" here.
- Confidence: H needs third-party-observable confirming evidence AND a
  survived kill-test; target-sourced evidence (decks, blogs, the CIM)
  alone caps at M.
- Strategy consistency (stated vs revealed), pricing power, GTM engine,
  innovation capacity, and organization signal follow moat-evidence.md's
  method sections directly — no separate distillation needed here.

Artifacts: .diligence/modules/company/FINDINGS.md, LEDGER.md entries, SOURCES.md
entries, STATE.md update.

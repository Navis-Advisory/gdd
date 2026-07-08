# Workflow: size-market

Preconditions: taxonomy lock covers the segment ($ARGUMENTS or primary
market). If the segment is undefined or OPEN in the lock: stop, route to
scoping — never size an undefined segment.

## Independence protocol (load-bearing — do not weaken)

- Spawn `gdd-sizer-topdown` and `gdd-sizer-bottomup` IN PARALLEL, each
  prompt containing only: ENGAGEMENT.md, TAXONOMY.md, the market module
  BRIEF.md, and its own section of references/sizing-methods.md.
- Neither prompt mentions the other leg, prior sizing work, LEDGER.md,
  or any market-size figure.
- Each sizer registers its sources in a per-leg scratch registry —
  `.diligence/modules/market/SOURCES-topdown.md` /
  `SOURCES-bottomup.md` (same columns as SOURCES.md, ids TD1…/BU1…).
  Sizers never write the shared SOURCES.md: parallel appends to it leak
  one leg's anchors and chain structure to the other mid-run. At
  reconciliation the orchestrator merges both scratch registries into
  SOURCES.md with sequential ids, records the id mapping in the merge
  note, and deletes the scratch files.

## Reconciliation (orchestrator, after both return)

1. Recompute both legs' arithmetic; read tolerance from
   `state.json.taxonomy_lock.reconciliation_tolerance_pct` (default 30).
2. Gap = |TD − BU| / min(TD, BU).
3. Within tolerance: record both legs, the reconciled figure (state the
   basis: midpoint, weighted by source tier, or the stronger leg), and
   the named driver of the residual gap.
4. Outside tolerance: NO averaging. Diagnose in the order given in
   references/sizing-methods.md §Reconciliation (definition mismatch →
   penetration → spend-share ratio → unit/period slips); re-run the
   weaker leg once with the diagnosis (fresh agent, diagnosis included,
   other leg still withheld); if still irreconcilable, that is itself a
   ledger finding with LOW confidence, both legs shown.
5. Write `.diligence/modules/market/FINDINGS.md` from
   `${CLAUDE_PLUGIN_ROOT}/gdd-core/templates/module-findings.md` (both legs in full +
   the reconciliation block); promote the headline size + range to
   LEDGER.md; update STATE.md — all three owned sections: the module
   row, the Position paragraph, and a session-log line.

Artifacts: .diligence/modules/market/FINDINGS.md, LEDGER.md entries, SOURCES.md
entries, STATE.md update.

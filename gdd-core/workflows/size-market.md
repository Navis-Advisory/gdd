# Workflow: size-market

Engagement root: `<CWD>/.diligence` — it exists at exactly that path or
the engagement does not exist here. Never search parent or sibling
directories for `.diligence/`; never read or write another folder's
engagement. Full contract: references/engagement-root.md.

Preconditions: taxonomy lock covers the segment ($ARGUMENTS or primary
market). If the segment is undefined or OPEN in the lock: stop — never
size an undefined segment. Once a lock exists `/gdd:scope-deal` refuses,
so the fix is a taxonomy-lock supersession by gdd-librarian (define or
close the segment, version-bump the lock); then re-run.

## Independence protocol (load-bearing — do not weaken)

- Spawn `gdd-sizer-topdown` and `gdd-sizer-bottomup` IN PARALLEL, each
  prompt containing only: the engagement root (absolute path), ENGAGEMENT.md,
  TAXONOMY.md, the market module BRIEF.md, and its own section (Top-down
  or Bottom-up) plus §Common rules of references/sizing-methods.md.
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
6. Compile the **Market risk register** section of that FINDINGS.md
   (structural risks rated better-than-remote: saturation, substitution,
   technology shift, demand-driver decay), and promote each entry to
   LEDGER.md with an F-id. This section is mandatory: `/gdd:scan-risks`'
   market-structure screen cites it by F-id, so an empty or missing
   register leaves that screen with nothing to reference.

## Completion gate

The command is not complete until the module postconditions hold on
disk: `.diligence/modules/market/FINDINGS.md` exists non-empty, the
promoted LEDGER.md rows exist, STATE.md carries the module row, and
`state.json.modules.market` is written. Lifecycle: set
`status: "in-progress"` when the module starts, `"done"` on completion
or `"blocked"` with the reason (statuses are the schema enum, nothing
else). Verify each before yielding the turn. Never yield with a promise to "report back": subagent calls
are synchronous — if one has not returned, wait for it; if it failed,
re-run it once or execute the work inline and say so in the session
log.

Artifacts: .diligence/modules/market/FINDINGS.md, LEDGER.md entries, SOURCES.md
entries, STATE.md + state.json.modules.market update.

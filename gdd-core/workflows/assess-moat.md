# Workflow: assess-moat

Engagement root: `<CWD>/.diligence` — it exists at exactly that path or
the engagement does not exist here. Never search parent or sibling
directories for `.diligence/`; never read or write another folder's
engagement. Full contract: references/engagement-root.md.

Preconditions: taxonomy lock. Best after probe-customers (KPC rows) and
map-competitors (the competitive set); if either hasn't run, grid rows
fall back to the taxonomy's buying criteria and the competitive set
falls back to taxonomy boundary cases, and STATE.md flags the re-check —
the same graceful degradation the other modules use when an upstream
dependency hasn't run yet.

1. Spawn `gdd-analyst` with the engagement root (absolute path) and
   `.diligence/modules/company/BRIEF.md` (or a
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

## Completion gate

The command is not complete until the module postconditions hold on
disk: `.diligence/modules/company/FINDINGS.md` exists non-empty, the
promoted LEDGER.md rows exist, STATE.md carries the module row, and
`state.json.modules.company` is written. Lifecycle: set
`status: "in-progress"` when the module starts, `"done"` on completion
or `"blocked"` with the reason (statuses are the schema enum, nothing
else). Verify each before yielding the turn. Never yield with a promise to "report back": subagent calls
are synchronous — if one has not returned, wait for it; if it failed,
re-run it once or execute the work inline and say so in the session
log.

Artifacts: .diligence/modules/company/FINDINGS.md, LEDGER.md entries, SOURCES.md
entries, STATE.md + state.json.modules.company update.

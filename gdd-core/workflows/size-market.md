# Workflow: size-market

Resolve ENGAGEMENT_ROOT per `references/engagement-root.md` before any
engagement access. Use that same absolute path throughout this workflow;
never search parent/sibling engagements or derive the root from the install.

Preconditions: taxonomy lock covers the segment ($ARGUMENTS or primary
market). If the segment is undefined or OPEN in the lock: stop — never
size an undefined segment. Once a lock exists `/gdd:scope-deal` refuses,
so the fix is a taxonomy-lock supersession by gdd-librarian (define or
close the segment, version-bump the lock); then re-run.

## Independence protocol (load-bearing — do not weaken)

First apply the SOW coverage preflight below. A market brief may own descriptive
questions with zero hypotheses. If the approved brief requests only descriptive
work and no sizing analysis, use `gdd-analyst` for those Q analyses, retain their
criteria/dependencies, write the normal market FINDINGS.md responses and promote
evidence serially. Apply the completion gate below, then return. Do not launch
sizers, invent market-size figures or claim independent sizing was performed.
If a later analysis needs an unproduced size/risk-register finding, show that
dependency as missing. An explicit sizing request still follows the full protocol.

- Spawn `gdd-sizer-topdown` and `gdd-sizer-bottomup` IN PARALLEL, each
  prompt containing only: the engagement root (absolute path), ENGAGEMENT.md,
  TAXONOMY.md, the market module BRIEF.md, and its own section (Top-down
  or Bottom-up) plus §Common rules of references/sizing-methods.md.
- Neither prompt mentions the other leg, prior sizing work, LEDGER.md,
   or any market-size figure.
  Pass only the sizing-relevant Q wording/criteria and constraints in each leg's
  brief; do not pass the full register's answers/evidence or other prior results.
  Hold non-sizing Q analyses until both independent legs return.
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
7. Complete remaining assigned descriptive Q analyses with the existing analyst
   after both sizing legs have returned, using current criteria and dependencies.
   Add their responses/evidence to FINDINGS.md while preserving the sizing and
   reconciliation sections and stable anchors. If an input is missing, record
   the exact Q/criterion gap. The sizing estimates do not answer unrelated Qs.

## Completion gate

> **Ledger promotion is serial.** Do not run this module concurrently with
> another module command: `LEDGER.md` and `SOURCES.md` are unlocked shared
> tables, and concurrent appends lose rows silently (GDD-BUG-22). If an
> orchestrator is running modules back-to-back this is automatic; if it is
> tempted to fan them out, the research may overlap but the promotion step
> must not.


The command is not complete until the module postconditions hold on
disk: `.diligence/modules/market/FINDINGS.md` exists non-empty, the
promoted LEDGER.md rows exist, STATE.md carries the module row, and
`state.json.modules.market` is written. Lifecycle: set
`status: "in-progress"` when the module starts, `"done"` on completion
or `"blocked"` with the reason (statuses are the schema enum, nothing
else). Follow references/runtime-contract.md: await the actual host completion result,
check failure status, and verify this run's named output and state. A prior
report or launch acknowledgement is not success. On failure, apply its bounded
transient retry rule or report incomplete/blocked; do not fabricate output or
silently substitute an inline run. Independent sizing never falls back to a
shared-context inline result.

Artifacts: .diligence/modules/market/FINDINGS.md, LEDGER.md entries, SOURCES.md
entries, STATE.md + state.json.modules.market update.

## SOW coverage

Before research, read current QUESTIONS.md if present and compare this module's
assigned active Q-ids (all except out-of-scope) with its brief. Pass accepted
wording/criteria, planned analyses, constraints and exact dependency inputs in
the execution prompt. Q-only scope is valid. Missing/stale coverage, criteria or
upstream evidence blocks the affected analysis: name the Q-id, missing input
and next action; do not invent evidence or silently use a default brief.
Independent planned work may proceed with that boundary visible.

Execute descriptive Q analyses as well as hypothesis tests. Record a substantive
answer or explicit criterion gap for every assigned Q in FINDINGS.md with actual
F/S links; descriptive answers need no hypothesis verdict. Reuse current evidence
where it meets the criterion instead of redoing answered work. These responses
are analytical support, not a second question-status store. After serial evidence
promotion, the orchestrator alone reconciles QUESTIONS.md under
`references/sow-register.md`; module done does not mean Q answered. Scope changes
use its accepted-amendment contract, not an analyst's unilateral reframing.
Checkpoint changed workpapers and QUESTIONS.md under its Local Git checkpoints
contract; report actual saved outputs, remaining blockers and checkpoint result.

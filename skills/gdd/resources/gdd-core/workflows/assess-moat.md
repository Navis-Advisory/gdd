# Workflow: assess-moat

Resolve ENGAGEMENT_ROOT per `references/engagement-root.md` before any
engagement access. Use that same absolute path throughout this workflow;
never search parent/sibling engagements or derive the root from the install.

Preconditions: taxonomy lock. Best after probe-customers (KPC rows) and
map-competitors (the competitive set); if either hasn't run, grid rows
fall back to the taxonomy's buying criteria and the competitive set
falls back to taxonomy boundary cases, and STATE.md flags the re-check —
the same graceful degradation the other modules use when an upstream
dependency hasn't run yet. These fallbacks support exploratory/planned work
only where they satisfy the accepted criterion and do not replace a named
required input. An affected Q with a missing required upstream finding remains
blocked; taxonomy defaults are not evidence that its SOW criterion was met.

1. Spawn `gdd-analyst` with the engagement root (absolute path) and
   `.diligence/modules/company/BRIEF.md`, plus `references/moat-evidence.md`.
   A default brief is allowed only when no SOW Q-ids are assigned; note it in
   STATE.md. Assigned Qs with no brief are a planning blocker, not permission
   to replace their scope with a generic moat review.
2. Analyst executes assigned descriptive Q analyses as well as testing each
   claimed mechanism against the taxonomy in
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

> 🔴 **If delegation is unavailable, say so — do not silently inline it.**
> The fresh-context split is GDD's central design claim: it is why module
> briefs exist and why analyst and researcher are separate roles. When no
> subagent tool is exposed, research collapses to a single inline pass with
> materially lower recall, and **nothing fails** — every postcondition still
> closes on a well-formed ledger, so the degradation is invisible in the
> artifacts (GDD-BUG-23).
> Before starting research, check whether a subagent tool is actually
> available. If it is not: set `state.json.modules.<name>.status` to
> `blocked` **or** record `delegation: unavailable` in the module's STATE.md
> row with the reason, proceed inline, and label the module's recall as
> degraded in FINDINGS.md. A run that inlined its research is not comparable
> to one that delegated — the same graceful-degradation-plus-flag pattern the
> workflows already use for a missing upstream module.


## Method notes (for the analyst prompt)

- Mechanism taxonomy (full tests in moat-evidence.md): switching costs,
  network effects, scale economies, brand/category ownership,
  regulatory/licensing, IP, data/workflow depth. A moat claim without a named
  mechanism from this list is not a supported moat finding. Descriptive
  company Qs use their accepted criteria; do not discard them for lacking
  a moat mechanism or silently rewrite accepted scope.
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

> **Ledger promotion is serial.** Do not run this module concurrently with
> another module command: `LEDGER.md` and `SOURCES.md` are unlocked shared
> tables, and concurrent appends lose rows silently (GDD-BUG-22). If an
> orchestrator is running modules back-to-back this is automatic; if it is
> tempted to fan them out, the research may overlap but the promotion step
> must not.


The command is not complete until the module postconditions hold on
disk: `.diligence/modules/company/FINDINGS.md` exists non-empty, the
promoted LEDGER.md rows exist, STATE.md carries the module row, and
`state.json.modules.company` is written. Lifecycle: set
`status: "in-progress"` when the module starts, `"done"` on completion
or `"blocked"` with the reason (statuses are the schema enum, nothing
else). Follow references/runtime-contract.md: await the actual host completion result,
check failure status, and verify this run's named output and state. A prior
report or launch acknowledgement is not success. On failure, apply its bounded
transient retry rule or report incomplete/blocked; do not fabricate output or
silently substitute an inline run. Independent sizing never falls back to a
shared-context inline result.

Artifacts: .diligence/modules/company/FINDINGS.md, LEDGER.md entries, SOURCES.md
entries, STATE.md + state.json.modules.company update.

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

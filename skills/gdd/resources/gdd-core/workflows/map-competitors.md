# Workflow: map-competitors

Resolve ENGAGEMENT_ROOT per `references/engagement-root.md` before any
engagement access. Use that same absolute path throughout this workflow;
never search parent/sibling engagements or derive the root from the install.

Preconditions: taxonomy lock. Best after size-market (denominator for
shares); if no sized market exists, shares are labeled "of estimated
market (unsized)" and D5 will flag them. This fallback is only for planned or
exploratory work whose accepted criterion allows it. A Q requiring a sized
denominator or named upstream finding remains blocked until that input exists;
an estimated share does not silently satisfy the stronger criterion.

1. Spawn `gdd-analyst` with the engagement root (absolute path) and
   `.diligence/modules/competition/BRIEF.md`. A default brief is allowed only
   when no SOW Q-ids are assigned; note it in STATE.md. Assigned Qs with no
   brief are a planning blocker, never silently replaced by the default.
2. Analyst executes the brief's assigned Q analyses, including descriptive
   questions; applicable competition methods build the set (direct / adjacent /
   substitutes, per taxonomy
   boundary cases), positioning against segment axes, share estimates
   citing the ledger's market size by finding id.
3. Heavy evidence gathering delegates to `gdd-researcher` fresh-context
   (one researcher per competitor cluster, parallel where independent —
   await each host completion result per references/runtime-contract.md
   before the analyst uses it; launch acknowledgements are not results).
4. Cross-check inline: named shares + fringe ≈ 100% of the sized market;
   competitors' reported revenues consistent with their claimed shares.
   Violations are findings, not footnotes.
5. Write `.diligence/modules/competition/FINDINGS.md`; promote headliners to
   LEDGER.md; update STATE.md (module row, Position, session-log line).
   Denominator labeling: shares cite the ledger market finding by id at
   its recorded status — a point figure if reconciled, "share of the
   $X–Y span (F#, confidence, irreconciled per protocol)" if not, "of estimated
   market (unsized)" if sizing hasn't run. Never invent a point
   denominator to make shares look cleaner.

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

- Set construction: start from the taxonomy boundary cases (who
  supplies the entities decided IN), then add adjacents (horizontal
  players selling into the segment) and substitutes (spreadsheets/
  paper count as competition when penetration <100%). Survivorship
  check: search for players by customer testimony and job postings,
  not just "top N" listicles.
- Positioning axes come from the segment definition's buying criteria,
  not a generic 2×2; if the taxonomy doesn't imply axes, derive them
  from win/loss evidence and say so.
- Share estimation ladder (best first): disclosed revenue in-segment >
  customer counts × ARPU (state both sources) > review-volume proxies
  (label ESTIMATE, calibrate against a player with known revenue).
  Every share cites the ledger denominator by finding id.

## Completion gate

> **Ledger promotion is serial.** Do not run this module concurrently with
> another module command: `LEDGER.md` and `SOURCES.md` are unlocked shared
> tables, and concurrent appends lose rows silently (GDD-BUG-22). If an
> orchestrator is running modules back-to-back this is automatic; if it is
> tempted to fan them out, the research may overlap but the promotion step
> must not.


The command is not complete until the module postconditions hold on
disk: `.diligence/modules/competition/FINDINGS.md` exists non-empty,
the promoted LEDGER.md rows exist, STATE.md carries the module row,
and `state.json.modules.competition` is written. Lifecycle: set
`status: "in-progress"` when the module starts, `"done"` on completion
or `"blocked"` with the reason (statuses are the schema enum, nothing
else). Follow references/runtime-contract.md: await the actual host completion result,
check failure status, and verify this run's named output and state. A prior
report or launch acknowledgement is not success. On failure, apply its bounded
transient retry rule or report incomplete/blocked; do not fabricate output or
silently substitute an inline run. Independent sizing never falls back to a
shared-context inline result.

Artifacts: .diligence/modules/competition/FINDINGS.md, LEDGER.md entries, SOURCES.md
entries, STATE.md + state.json.modules.competition update.

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

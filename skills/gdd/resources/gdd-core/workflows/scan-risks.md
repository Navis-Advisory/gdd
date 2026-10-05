# Workflow: scan-risks

Resolve ENGAGEMENT_ROOT per `references/engagement-root.md` before any
engagement access. Use that same absolute path throughout this workflow;
never search parent/sibling engagements or derive the root from the install.

Preconditions: taxonomy lock. Runs best after size-market and the
customers module: customer concentration cites the customers module's
top-10 share by F-id, market-structure intake cites the market module's
risk register by F-id. If either is absent, that screen runs degraded
(outside-in ESTIMATE in place of the F-id) and FINDINGS.md says so. A degraded
screen may support planned/exploratory work only if its accepted criterion
allows that evidence. A Q requiring the named upstream finding stays blocked;
the estimate must not silently replace its dependency or close its criterion.

## Seeding (per references/risk-screens.md §Seeding)

1. Deal breakers named in ENGAGEMENT.md — each maps to a screen
   (existing or ad-hoc); a deal breaker with no mapped screen is a
   scoping defect, reported to the user, not silently dropped.
2. Risk leaves in TREE.md (module=risks).
3. Active SOW Q-ids assigned to risks, including descriptive exposure
   questions without a thesis leaf; retain their criteria and planned analyses.
4. The six standing screens (customer concentration, supplier/input
   concentration, platform dependency, regulatory/licensing, key
   person, market-structure intake) — run every engagement regardless.

## Flow

1. Spawn `gdd-analyst` with the engagement root (absolute path) and
   `.diligence/modules/risks/BRIEF.md` plus references/risk-screens.md.
   If there is no brief and no assigned SOW Q, use the six standing screens
   and note that default in STATE.md. Missing briefs for assigned Qs are
   planning blockers; the screens cannot silently replace descriptive scope.
2. Heavy evidence gathering delegates to `gdd-researcher` fresh-context,
   one per screen, parallel where independent (market-structure intake
   and customer concentration each wait on their source module's F-id,
   not on each other).
3. Each screen resolves per its own trip condition, falsifiable on the
   cheap test's output:
   - Untripped: an evidence-of-search line — what was searched
     (sources, terms, window), what would have tripped it, the nearest
     miss. No bare "no issues found"; the search trail is the evidence
     for the negative (D4).
   - Tripped: before committing to a bounded deep dive that would
     consume material timeline (a day-plus workstream), surface the
     trip and the proposed scope to the user and let them choose chase
     vs record-as-open. A quick confirming follow-up search doesn't
     need this gate — only the deep-dive commitment does.
4. Deep dives answer the trip's hypothesis only, same falsifiability
   bar as tree leaves (references/risk-screens.md §Deep-dive rules); an
   unchased trip is recorded as an open question with the trip evidence
   attached — surfacing it is the deliverable, burying it is a defect.
5. Write `.diligence/modules/risks/FINDINGS.md`; promote per the
   reference's promotion rules — one screen verdict per finding
   (`screen · tripped/clear/unreachable · basis`), tripped-and-unchased items at
   confidence L with the open question cross-referenced; update
   STATE.md (module row, Position, session-log line).

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


## Interplay with red-team

The red-team workflow's sanctioned exception — the risks module
executing as the red-team sweep when no separate risks analysis ran —
applies only when scan-risks has NOT run. Once this command has
produced FINDINGS.md, that exception is unnecessary: the red team
attacks the screens like any other module's output, with the
evidence-of-search lines on untripped screens as its primary target
("passed because nobody looked"). A later red-team run always picks up
scan-risks findings normally, whether or not it also served as the
sweep on an earlier pass.

## Completion gate

> **Ledger promotion is serial.** Do not run this module concurrently with
> another module command: `LEDGER.md` and `SOURCES.md` are unlocked shared
> tables, and concurrent appends lose rows silently (GDD-BUG-22). If an
> orchestrator is running modules back-to-back this is automatic; if it is
> tempted to fan them out, the research may overlap but the promotion step
> must not.


The command is not complete until the module postconditions hold on
disk: `.diligence/modules/risks/FINDINGS.md` exists non-empty, the
promoted LEDGER.md rows exist, STATE.md carries the module row, and
`state.json.modules.risks` is written. Lifecycle: set
`status: "in-progress"` when the module starts, `"done"` on completion
or `"blocked"` with the reason (statuses are the schema enum, nothing
else). Follow references/runtime-contract.md: await the actual host completion result,
check failure status, and verify this run's named output and state. A prior
report or launch acknowledgement is not success. On failure, apply its bounded
transient retry rule or report incomplete/blocked; do not fabricate output or
silently substitute an inline run. Independent sizing never falls back to a
shared-context inline result.

Artifacts: .diligence/modules/risks/FINDINGS.md, LEDGER.md entries,
SOURCES.md entries, STATE.md + state.json.modules.risks update.

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

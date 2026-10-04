# Workflow: map-competitors

Engagement root: `<CWD>/.diligence` — it exists at exactly that path or
the engagement does not exist here. Never search parent or sibling
directories for `.diligence/`; never read or write another folder's
engagement. Full contract: references/engagement-root.md.

Preconditions: taxonomy lock. Best after size-market (denominator for
shares); if no sized market exists, shares are labeled "of estimated
market (unsized)" and D5 will flag them.

1. Spawn `gdd-analyst` with the engagement root (absolute path) and
   `.diligence/modules/competition/BRIEF.md` (or a default
   brief if the tree didn't produce one — note that in STATE.md).
2. Analyst builds: the set (direct / adjacent / substitutes, per taxonomy
   boundary cases), positioning against segment axes, share estimates
   citing the ledger's market size by finding id.
3. Heavy evidence gathering delegates to `gdd-researcher` fresh-context
   (one researcher per competitor cluster, parallel where independent —
   "parallel" means multiple synchronous calls in one message, not
   fire-and-forget; all researchers return before the analyst
   proceeds).
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
else). Verify each before yielding the turn. Never yield with a promise to "report back":
subagent calls are synchronous — if one has not returned, wait for it;
if it failed, re-run it once or execute the work inline and say so in
the session log.

Artifacts: .diligence/modules/competition/FINDINGS.md, LEDGER.md entries, SOURCES.md
entries, STATE.md + state.json.modules.competition update.

# Workflow: workplan

Preconditions: module briefs exist.

## Timeline-fitting heuristics

- Count BACK from the deadline: final readout ← IC pre-read ← a
  protected synthesis window (gates + storyline ≈ 20% of the timeline;
  never let modules eat it) ← modules.
- 2-week shape: week 1 market + competition in parallel, week 2
  customers/moat compressed + gates + storyline; interim readout is a
  working session mid-week-1.
- 3-week shape: week 1 market legs + competition set construction
  (interim readout end of week 1 commits to method + early anchors,
  not reconciled numbers); week 2 reconciliation + shares + remaining
  modules; week 3 verdicts closed, gates, storyline, readouts.
- 4-week shape: week 1 scope/market, week 2 competition + customer
  evidence launch, week 3 moat + synthesis of calls, week 4 gates,
  storyline, readouts.
- 6-week shape: as 4-week plus a second evidence round after the
  interim readout (the interim's open questions become week-4 work).
- Long-lead items start earliest regardless of logical order: anything
  involving other humans (expert calls, data-room requests).

1. Spawn `gdd-planner` (workplan mode) with ENGAGEMENT.md (deadline),
   all module briefs, STATE.md, and the workplan template path.
2. Order modules by hard dependencies (market sizing before share math;
   customer evidence before moat conclusions where briefs say so), then
   fit to the timeline; insert checkpoints (interim readout, IC pre-read,
   final readout) counting back from the deadline.
3. Anything that does not fit is listed under Capacity notes for the
   user to cut or extend — never silently thinned.
4. Write WORKPLAN.md; update STATE.md module statuses to pending.
5. $ARGUMENTS adjustments ("compress to 2 weeks") re-run step 2 with the
   constraint and show the diff before writing.

Artifacts: WORKPLAN.md, STATE.md update.

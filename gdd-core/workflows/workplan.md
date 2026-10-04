# Workflow: workplan

Engagement root: `<CWD>/.diligence` — it exists at exactly that path or
the engagement does not exist here. Never search parent or sibling
directories for `.diligence/`; never read or write another folder's
engagement. Full contract: references/engagement-root.md.

Preconditions: module briefs exist.

## Timeline-fitting heuristics

> 🔴 **"In parallel" below means the WORK overlaps in the calendar. It does
> NOT authorise dispatching two module commands concurrently.**
> `LEDGER.md` and `SOURCES.md` are shared append-only tables with no locking,
> no ownership window and no per-module staging. Two modules writing them at
> once interleave rows and collide on ids, and the files stay syntactically
> valid — so the loss is silent and only surfaces as an id gap a human
> happens to notice. The ledger is the spine that triangulation, the red team
> and the storyline all read, so a dropped row propagates into the verdict.
> **Research may overlap; ledger promotion is serial.** (GDD-BUG-22.)


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

1. Spawn `gdd-planner` (workplan mode) with the engagement root
   (absolute path), ENGAGEMENT.md (deadline),
   all module briefs, STATE.md, and the workplan template path.
2. Order modules by hard dependencies (market sizing before share math;
   customer evidence before moat conclusions where briefs say so), then
   fit to the timeline; insert checkpoints (interim readout, IC pre-read,
   final readout) counting back from the deadline.
3. Anything that does not fit is listed under Capacity notes for the
   user to cut or extend — never silently thinned.
4. Write `.diligence/WORKPLAN.md`; update STATE.md module statuses to pending.
5. $ARGUMENTS adjustments ("compress to 2 weeks") re-run step 2 with the
   constraint and show the diff before writing.

Artifacts: .diligence/WORKPLAN.md, STATE.md update.

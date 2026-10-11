# Workflow: workplan

Resolve ENGAGEMENT_ROOT per `references/engagement-root.md` before any
engagement access. Use that same absolute path throughout this workflow;
never search parent/sibling engagements or derive the root from the install.

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

If QUESTIONS.md exists, pass its current accepted scope and criteria to the
planner. Every Q-id not marked out-of-scope must map to an existing module
brief, named analysis and scheduled output, or an explicit blocker naming the
missing input, owner/decision needed and next action. Include Q-only modules
with zero hypotheses. Preserve coverage of answered Q-ids by linking their
existing supporting work; do not reset their status or schedule needless repeats.
WORKPLAN.md holds this plan, not a copy of question statuses. If a brief or
criterion is missing, expose the gap and route its repair through planning or
the accepted-amendment contract; never fabricate one to claim complete coverage.

1. Select and state file-access or proposal-only planner mode using the same
   runtime-contract.md planning contract as hypothesis-tree. File-access mode
   requires a verified authorized delegate route and its own preflight. For
   proposal-only mode the orchestrator reads the required inputs through its
   approved root route, then supplies their contents in the dispatch context:
   ENGAGEMENT.md (deadline), TAXONOMY.md, all module briefs, QUESTIONS.md if present,
   STATE.md, state.json, current WORKPLAN.md if any, the workplan template and
   relevant workflow/runtime/register rules. Pass the absolute ENGAGEMENT_ROOT
   in both modes. No missing-input guesses, scratch copies or delegate I/O in
   proposal-only mode; refused/unclear parent access remains a stop.
   Spawn gdd-planner in workplan mode and await its actual proposal. Workplan
   mode schedules existing briefs; it does not rebuild TREE.md or overwrite briefs.
2. Order modules by hard dependencies (market sizing before share math;
   customer evidence before moat conclusions where briefs say so), then
   fit to the timeline; insert checkpoints (interim readout, IC pre-read,
   final readout) counting back from the deadline. Apply ARGUMENTS adjustments
   ("compress to 2 weeks") to the proposed plan before presenting it.
3. Anything that does not fit is listed by Q-id/analysis under Capacity notes
   for the user to cut or extend — never silently thinned. Changes to accepted
   scope/criteria use `references/sow-register.md` before the changed plan is
   accepted; a planning constraint alone does not authorize dropping a Q.
4. Show the proposed plan and, for an adjustment, its concrete diff before
   writing. Resolve scope/criterion changes through the amendment contract;
   reuse an exact approval already supplied. The planner returns an unapproved
   proposal without writes; after acceptance the orchestrator saves it through
   its approved route, or re-dispatches a planner with verified file access and
   that exact approved plan. Proposal-only mode always remains no-I/O, including
   on re-dispatch. Re-read inputs and check freshness before saving per the runtime
   contract; changed scope, criteria, briefs or state require refreshed review. Then write
   `.diligence/WORKPLAN.md` with complete Q coverage and dependencies;
   update STATE.md Position/session log. Preserve existing module statuses in
   both STATE.md and state.json; replanning alone does not reset work to pending.
5. After the accepted plan is saved, the orchestrator follows the Local Git checkpoints
   contract in `references/sow-register.md`; report the actual SHA or limitation.

Artifacts: .diligence/WORKPLAN.md, STATE.md update.

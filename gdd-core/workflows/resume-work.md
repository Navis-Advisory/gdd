# Workflow: resume-work

Complete the mandatory boundary metadata preflight in
`references/engagement-root.md` before source-document reads, engagement
inventory or content access. Stop if any required check or approval is missing. Use that same absolute path throughout this workflow;
never search parent/sibling engagements or derive the root from the install.

Read-only summary, then a recommendation. Never write, clear or archive a
handoff, update writer stamps, reconcile state, or make a Git checkpoint here,
including after the user confirms resuming. After preflight, a host-approved
connected-folder tool, including a shell, may perform only the inventory and
reads below. No Git, writes, repairs or out-of-root staging. Missing access or
a refused/unclear result stops dependent work; do not switch routes to bypass
it. These limits also apply to direct workflow invocation.

Use the current handoff and explicit review state for the saved position;
interpret session-log entries as dated history, not current authorization or
checkpoint status. Git remains the checkpoint authority. Do not infer that a
commit exists or is absent from an old log entry, missing SHA or planned
checkpoint. This workflow does not run Git: if discussing checkpoint status,
say it was not checked in this resume. Attribute any recorded historical claim
to its entry rather than presenting it as verified current state. Do not add a
second checkpoint store or change the saved log to compensate.

Order matters:

1. Read `references/sow-register.md` and use its Intake and core-state
   classification. For absent, incomplete, malformed or unsupported state,
   report exact missing/invalid paths and one narrow next action, then return
   without continuing into the full-engagement branch.
2. **Staged intake:** read QUESTIONS.md including Intake handoff/session log
   if present and the recorded extraction metadata. Summarize coverage,
   draft/confirmed criteria, blocked Q-ids and the saved stopping point.
   Recommend exactly one next command: `/gdd:ingest-sow` when extraction or
   coverage review needs finishing, otherwise `/gdd:scope-deal <target>`.
   Explain the reason and return immediately. Do not invent module/gate state
   or read absent STATE.md, state.json, WORKPLAN.md or reports.
3. **Full engagement:** read STATE.md (Position, Module status, Gates,
   Handoff, Open questions) and state.json. Include QUESTIONS.md coverage and
   blocked Q-ids if a register exists; its absence in a legacy interview-based
   engagement is not an error. Read WORKPLAN.md if present (the schedule;
   module statuses live in STATE.md) and the newest report if any. Report a
   missing workplan as an outstanding planning step, not corrupted core.
4. Consistency scan (cheap): STATE.md module statuses vs. existing
   `.diligence/modules/*/FINDINGS.md`; gates in STATE.md vs. `state.json.gates`.
   Disagreements are reported verbatim — never silently reconciled here
   (that's a librarian job).
5. Summarize in ≤6 sentences: engagement + deadline, where things stand,
   what the handoff said, what's blocked.
6. Recommend exactly ONE next command with a one-line reason. Do not
   start it.

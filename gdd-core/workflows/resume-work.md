# Workflow: resume-work

Engagement root: `<CWD>/.diligence` — it exists at exactly that path or
the engagement does not exist here. Never search parent or sibling
directories for `.diligence/`; never read or write another folder's
engagement. Full contract: references/engagement-root.md.

Read-only summary, then a recommendation. Order matters:

1. Read STATE.md (Position, Module status, Gates, Handoff, Open
   questions).
2. Read WORKPLAN.md (the week-by-module schedule — module statuses live
   in STATE.md, not here) and the newest file in `.diligence/reports/` if
   any.
3. Consistency scan (cheap): STATE.md module statuses vs. existing
   `.diligence/modules/*/FINDINGS.md`; gates in STATE.md vs. `state.json.gates`.
   Disagreements are reported verbatim — never silently reconciled here
   (that's a librarian job).
4. Summarize in ≤6 sentences: engagement + deadline, where things stand,
   what the handoff said, what's blocked.
5. Recommend exactly ONE next command with a one-line reason. Do not
   start it.
6. Clear the Handoff section only after the user confirms the resume
   (move its content to the Session log).

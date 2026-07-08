# Workflow: storyline

Governing-thought patterns per decision type and key-line construction
rules live in references/pyramid-principle.md — the storyliner loads it;
this workflow owns only the mechanics.

Preconditions: triangulation gate PASS or WAIVED (check
`state.json.gates`). FAIL → stop with the failing checks listed.

1. Spawn `gdd-storyliner` with LEDGER.md, `.diligence/TREE.md`, both
   reports, ENGAGEMENT.md (the decision question), the storyline
   template, and references/pyramid-principle.md. GATE-OWNED conditions
   in TREE.md (e.g. thesis sufficiency) must be answered explicitly in
   the storyline, not inherited silently.
2. Storyliner drafts the governing thought; orchestrator checks it with
   the user (AskUserQuestion) BEFORE expansion — the answer is decision
   support, not a reveal. $ARGUMENTS may request an alternative framing.
3. On approval: build key line + supports; CONTESTED ids only in the
   risks section, labeled; numbers verbatim from the ledger.
4. Write `.diligence/reports/STORYLINE.md` with the trace map (claim → finding ids
   → source ids); storyliner adds the session-log line, then the
   orchestrator sets STATE.md Position to "storyline drafted" and
   schedules the mandatory D6/D8 re-run before the final readout.

Artifacts: .diligence/reports/STORYLINE.md, STATE.md update.

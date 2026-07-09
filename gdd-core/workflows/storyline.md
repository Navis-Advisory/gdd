# Workflow: storyline

Governing-thought patterns per decision type and key-line construction
rules live in references/pyramid-principle.md — the storyliner loads it;
this workflow owns only the mechanics.

Preconditions: triangulation gate PASS or WAIVED (check
`state.json.gates`). FAIL → stop with the failing checks listed.

1. Spawn `gdd-storyliner` in **draft mode**: LEDGER.md, `.diligence/TREE.md`,
   both reports, ENGAGEMENT.md (the decision question), and
   references/pyramid-principle.md; ask it to return ONLY a drafted
   governing thought (a direct answer to the client's decision question)
   and, if $ARGUMENTS requests an alternative framing, a framing note —
   it must not expand into the key line or write any file yet.
2. Orchestrator checks the governing thought with the user directly
   (AskUserQuestion) BEFORE expansion — the answer is decision support,
   not a reveal. Loop back to a re-drafted governing thought if rejected.
3. On approval, spawn `gdd-storyliner` in **build mode** with the
   approved governing thought plus the same inputs from step 1, the
   storyline template, and GATE-OWNED conditions from TREE.md that must
   be answered explicitly. It builds the key line + supports (CONTESTED
   ids only in the risks section, labeled; numbers verbatim from the
   ledger), constructs the sensitivity table if none exists yet (D6 was
   N-A — flex the top assumptions, show which conclusions flip, with
   arithmetic executed, not asserted), writes
   `.diligence/reports/STORYLINE.md` with the trace map (claim → finding
   ids → source ids), and adds the session-log line.
4. Orchestrator sets STATE.md Position to "storyline drafted" and
   schedules the mandatory D6/D8 re-run before the final readout.

Artifacts: .diligence/reports/STORYLINE.md, STATE.md update.

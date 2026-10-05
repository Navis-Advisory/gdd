# Workflow: storyline

Resolve ENGAGEMENT_ROOT per `references/engagement-root.md` before any
engagement access. Use that same absolute path throughout this workflow;
never search parent/sibling engagements or derive the root from the install.

Governing-thought patterns per decision type and key-line construction
rules live in references/pyramid-principle.md — the storyliner loads it;
this workflow owns only the mechanics.

If QUESTIONS.md exists, read it and include an SOW coverage appendix in
the readout: every active Q-id, answer/evidence or unresolved gap, plus dated
exclusions. Do not claim the full SOW is answered when any active Q is open.

Preconditions: triangulation gate PASS or WAIVED (check
`state.json.gates`). Any other status, including `not-run` after a material
scope amendment, stops with the required check/recheck listed. An old report
or invalidated waiver is not current approval. Preserve the existing first-draft
D6/D8 exception; it does not exempt changed scope from re-verification.

Check STATE.md's current stale-report notes and `state.json.gates.red_team`
before forwarding REDTEAM.md. A red-team gate invalidated by a material scope
change requires a new completed red-team run against that scope; a fresh
triangulation PASS alone does not make the old report current. Stop with that
rerun as the next action while it remains not-run/stale. Do not pass a historical
report to the storyliner as current evidence. After red-team changes the ledger,
re-verify the changed evidence before synthesis. Retain historical reports/notes.

1. Spawn `gdd-storyliner` in **draft mode**: the engagement root
   (absolute path), LEDGER.md, `.diligence/TREE.md`,
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
3b. **Promotion round-trip:** if the storyliner returns items flagged
   `needs-promotion` (new arithmetic or anomalies its build produced
   that exist in no ledger row), do NOT accept an unledgered figure
   into the deliverable: route each through gdd-librarian to land as a
   proper ledger row (claim, evidence pointer, sources, confidence),
   then re-invoke build mode so the storyline cites the new F-ids.
   The final storyline contains no number outside the ledger.
4. Orchestrator sets STATE.md Position to "storyline drafted" and
   schedules the mandatory D6/D8 re-run before the final readout.
   Sanity check before accepting: disposition count in the storyline
   equals `grep -c '| CONTESTED |' LEDGER.md` (count status cells, not the
   word — a bare `grep -c CONTESTED` also matches the template's legend
   comments) — a mismatch goes back to the storyliner, not into the
   deliverable.

Artifacts: .diligence/reports/STORYLINE.md, STATE.md update.

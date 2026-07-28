# Workflow: triangulate

Engagement root: `<CWD>/.diligence` — it exists at exactly that path or
the engagement does not exist here. Never search parent or sibling
directories for `.diligence/`; never read or write another folder's
engagement. Full contract: references/engagement-root.md.

Preconditions: at least one module has findings; ledger non-empty.

1. Spawn `gdd-verifier` fresh-context with: the engagement root
   (absolute path), all of `.diligence/`,
   references/verification-checks.md, and the triangulation-report
   template. $ARGUMENTS may scope to one module or one check id.
2. Verifier runs D1–D8 per the registry. Non-negotiables:
   - re-derive, don't trust: arithmetic recomputed in executed Bash
     blocks (external-oracle rule: ≥1 executed computation per report);
   - `state.json.taxonomy_lock` is the authority; missing lock → loud
     warning in the report header;
   - PASS only for checks actually run; otherwise N-A with reason.
3. Verifier writes `.diligence/reports/TRIANGULATION.md` and sets
   `state.json.gates.triangulation` + STATE.md gate line.
4. Orchestrator summarizes: gate result, FAILs with owning modules;
   then refreshes STATE.md Position and state.json
   continuation.next_step (the verifier's remit excludes both).
   FAIL blocks /gdd:storyline. The user may waive: record the waiver
   verbatim in the report and state.json, gate becomes WAIVED.
5. Suggest next: fix the failing module, or /gdd:red-team when green.

## Execution notes (for the verifier prompt)

- Run order: D1 and D5 first (cheap, mechanical, and their failures
  invalidate later checks), then D3/D4, then D2/D6/D7 (computational),
  D8 last (needs the red-team report; N-A before the first red-team
  run OR before the first storyline is expected and fine — dispositions
  live in the storyline, so a post-red-team pre-storyline sweep records
  D8 N-A "awaiting storyline dispositions", never FAIL, and needs no
  waiver).
- D4 sampling: spot-check max(3, 20% of findings), selected by weight —
  every load-bearing key-line finding is always in the sample.
- Partial sweeps ($ARGUMENTS scoped): the report says exactly what was
  and wasn't checked; a scoped PASS never updates the gate to PASS —
  gate status changes only on full sweeps.
- Re-runs after remediation: re-run failed checks plus D5 (fixes
  ripple); carry forward prior PASSes with their dates noted.

## Completion gate

The command is not complete until the postconditions hold on disk:
`.diligence/reports/TRIANGULATION.md` exists non-empty and
`state.json.gates.triangulation` + STATE.md's gate line reflect this
sweep's result. Verify before yielding the turn. Never yield with a
promise to "report back": the verifier call is synchronous — if it has
not returned, wait for it; if it failed, re-run it once or run the
checks inline and say so in the session log.

Artifacts: .diligence/reports/TRIANGULATION.md, state.json gates, STATE.md update.

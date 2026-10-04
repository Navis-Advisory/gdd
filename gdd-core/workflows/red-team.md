# Workflow: red-team

Engagement root: `<CWD>/.diligence` — it exists at exactly that path or
the engagement does not exist here. Never search parent or sibling
directories for `.diligence/`; never read or write another folder's
engagement. Full contract: references/engagement-root.md.

Preconditions: ledger non-empty; best after triangulate.

1. Spawn `gdd-red-teamer` fresh-context with: the engagement root
   (absolute path), `.diligence/TREE.md`,
   LEDGER.md, module findings, both reports if present, and the
   redteam-report template. $ARGUMENTS may target one branch.
2. Red-teamer attacks evidence / logic / thesis (per its agent
   definition), with targeted counter-research allowed; writes
   `.diligence/reports/REDTEAM.md`; marks kills CONTESTED in LEDGER.md (status field
   only on existing rows).
3. When the engagement's risks module executes as this sweep (no
   separate risks analyst ran), the red-teamer ALSO appends new ledger
   rows for the risk-leaf verdicts (module=risks) — the one sanctioned
   exception to its status-only ledger remit — so refuted or supported
   risk hypotheses live in the evidence spine, not only in the report.
   The report gets a "Risk-leaf verdicts" section in that case. When
   `/gdd:scan-risks` has already produced
   `.diligence/modules/risks/FINDINGS.md`, this exception does not
   apply — attack the screens like any other module, starting with the
   evidence-of-search lines on untripped screens.
4. Orchestrator updates `state.json.gates.red_team` (status values:
   not-run | run — red team informs, it does not pass/fail) and
   STATE.md; summarizes the counter-thesis and kill list to the user.
5. Each kill needs an eventual disposition (revive / retire / declared
   dispute) — tracked as open questions in STATE.md; D8 enforces at the
   next triangulate.

## Attack-pattern library (for the red-teamer prompt)

- **Market findings**: anchor provenance (does the anchor's universe
  match the lock?); penetration inference circularity; growth rates
  sourced from vendor-sponsored material; "reconciled" figures whose
  legs share a root source.
- **Competition findings**: set survivorship (who's missing because
  they don't market loudly?); shares built on review-count proxies
  without calibration; positioning axes chosen to flatter the target;
  the horizontal-player dismissal ("too generic") tested against their
  actual roadmap/releases.
- **Customer findings**: testimony selection (who volunteered?);
  retention claims from management without cohort data; NPS-style
  numbers with no base.
- **Risk screens**: an untripped screen died of not looking — re-run
  its cheap test with hostile search terms; a recorded trip nobody
  chased must surface in the storyline's risks, check it does.
- **Deal breakers**: every deal breaker in ENGAGEMENT.md's deal
  objective gets an explicit attack attempt; "not observed" with no
  search trail is not an answer (negative-existence pattern applies).
- **Citation-record rows**: a disposition that only cites other
  findings is attacked at the chain's reference class — does the cited
  evidence's object actually match the disposed claim's object (right
  comparable, right ownership/depth class, right universe)?
- **Structural-defect propagation**: when an attack uncovers a
  structural defect in an instrument (a shared review pool, a
  double-counted registry), sweep sibling findings built on the same
  instrument before closing the attack.
- **Moat claims**: the one-release-cycle test (what stops a funded
  incumbent from shipping this feature?); switching-cost claims tested
  against observed switching in the evidence; regulatory moats checked
  for actual enforcement.
- **Thesis level**: what plausible world makes the deal bad with every
  number right (multiple paid, integration, channel shift, platform
  risk)? That world, evidenced, is the counter-thesis.
- **Negative-existence claims**: findings of the form "X does not
  exist / has not shipped" gathered under access constraints are
  attacked by hunting for positive evidence of X AND for third-party
  positive statements of absence — the latter can corroborate rather
  than kill; say which you found.
- **Hedge clauses**: attack a finding's qualifying clause, not just
  its headline — exclusion clauses ("the kill condition is excluded in
  every construction") often rest on the finding's single weakest
  input and die before the headline does.

## Completion gate

The command is not complete until the postconditions hold on disk:
`.diligence/reports/REDTEAM.md` exists non-empty, every kill is marked
CONTESTED in LEDGER.md, and `state.json.gates.red_team` + STATE.md
reflect the run. Verify before yielding the turn. Never yield with a
promise to "report back": the red-teamer call is synchronous — if it
has not returned, wait for it; if it failed, re-run it once or execute
the work inline and say so in the session log.

Artifacts: .diligence/reports/REDTEAM.md, LEDGER.md status changes, state.json,
STATE.md update.

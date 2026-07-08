# Workflow: scope-deal

Preconditions: `.diligence/` must not exist (one engagement per folder);
refuse with a pointer to /gdd:resume-work otherwise.

1. Spawn `gdd-scoper` with: the target from $ARGUMENTS, paths to the
   engagement/taxonomy/state templates and the state-json schema, and the
   source-hierarchy reference.
2. Scoper interviews in four batches, then drafts and writes. Interview
   script (AskUserQuestion, one batch per call; multiple-choice options
   proposed from light desk research, "Other" always available):

   **Batch A — target & client.** What does the target sell, to whom,
   where (propose a one-line answer from desk research for confirmation)?
   Who is the client and what transaction? What has the client already
   seen (CIM, management calls, prior DD)?

   **Batch B — thesis & questions.** The thesis in the client's words
   (capture verbatim — do not improve it). Then propose 4–6 key
   questions derived from the thesis and let the user edit; each KQ must
   be evidence-answerable within the timeline.

   **Batch C — deliverable & constraints.** Format, audience, deadline,
   interim checkpoints. Data access: which paid databases exist, is
   there a data room, confidentiality rules (codename? no target
   contact?).

   **Batch D — taxonomy.** For each lock field (segments, geography,
   currency/units/FX, time basis, source hierarchy, defined terms):
   propose a default from desk research + the source-hierarchy
   reference, ask the user to confirm/edit. Push for boundary cases on
   segment definitions ("where does X fall?") and a test value per
   segment. Fields the user can't settle → open_fields with what would
   settle them.

   **Document intake.** If the folder contains deal documents (CIM,
   teaser, spreadsheets), list them, confirm each is in scope as input,
   and register them in SOURCES.md at their tier (a CIM is tier 4 —
   company self-disclosure via bankers — note the incentive).

   Then write:
   - `.diligence/ENGAGEMENT.md`, `.diligence/TAXONOMY.md`
   - `.diligence/state.json` (schema v1, `taxonomy_lock` populated,
     unknowns in `open_fields`)
   - empty `.diligence/LEDGER.md`, `.diligence/SOURCES.md`, and
     `.diligence/STATE.md` from `${CLAUDE_PLUGIN_ROOT}/gdd-core/templates/ledger.md`,
     `${CLAUDE_PLUGIN_ROOT}/gdd-core/templates/sources.md`, and
     `${CLAUDE_PLUGIN_ROOT}/gdd-core/templates/state.md`
   - `.diligence/config.json` from the template
3. Orchestrator presents both artifacts section-by-section for user
   sign-off; edits loop back through the scoper.
4. On sign-off the orchestrator (not the scoper) writes STATE.md's
   first entries: position = "scoped", and the opening Session log line
   (date · "engagement scoped"). Suggest `/gdd:hypothesis-tree`.

Artifacts: ENGAGEMENT.md, TAXONOMY.md, state.json, LEDGER.md, SOURCES.md,
STATE.md, config.json.

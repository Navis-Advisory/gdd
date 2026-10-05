# Workflow: scope-deal

Resolve ENGAGEMENT_ROOT per `references/engagement-root.md` before any
engagement access. Use that same absolute path throughout this workflow;
never search parent/sibling engagements or derive the root from the install.

Preconditions: read `references/sow-register.md` and apply its Intake and
core-state classification. An absent root or staged intake is allowed; retain
the register, its intake continuity sections and every source snapshot while
initializing core. Complete source-only intake through `/gdd:ingest-sow` first.
Stop and report malformed/unsupported or partial core; never fill its missing
files as an implicit repair. If a full engagement exists, point to
`/gdd:resume-work`. Ignore parent/sibling engagements.

SOW-first intake: if an SOW is supplied but no register exists, run
/gdd:ingest-sow before the interview. Read existing QUESTIONS.md and its
recorded SOW extraction(s), including any Intake handoff and session log;
pre-fill supplied facts, ask only missing/ambiguous items in batches A–D,
and preserve all Q-ids. The register is the scope anchor. A few summary KQs
may group many Q-ids; never replace the SOW with a generic question list.

1. Orchestrator reads the target from $ARGUMENTS and the source-hierarchy
   reference (`${CLAUDE_PLUGIN_ROOT}/gdd-core/references/source-hierarchy.md`,
   Batch D depends on it).
2. Orchestrator interviews the user directly in four batches (AskUserQuestion,
   one batch per call; multiple-choice options proposed from light desk
   research via WebSearch, "Other" always available):

   **Batch A — target & client.** What does the target sell, to whom,
   where (propose a one-line answer from desk research for confirmation)?
   Who is the client and what transaction? What has the client already
   seen (CIM, management calls, prior DD)?

   **Batch B — thesis, objective & questions.** The thesis in the
   client's words (capture verbatim — do not improve it). Then the
   deal-objective quad, also verbatim: strategic intent (why this
   target, for this buyer, now), key concerns (what already worries the
   client), value-creation levers (where the return is supposed to come
   from), deal breakers (what kills it regardless of everything else).
   If QUESTIONS.md exists, group its questions under summary KQs with an
   explicit KQ-to-Q-id map; review only gaps rather than re-asking the SOW.
   Otherwise propose 4–6 key questions derived from thesis + quad and let
   the user edit; each KQ must be evidence-answerable within the
   timeline, and every key concern must map to a KQ — an unmapped
   concern is a scoping defect to fix before sign-off. Deal breakers
   seed the risks screens and the red team's mandatory attack list
   downstream.

   **KQ/Q feasibility check (once Batch C constraints are set, before
   sign-off):** for each KQ and every active Q-id beneath it, name the
   evidence instrument that can satisfy its accepted answer criterion UNDER
   the recorded constraints (data-room contents, contact rules, paid databases).
   Active Q-ids are those not marked out-of-scope. Descriptive questions remain
   in scope without a thesis hypothesis; cite their current criterion in
   QUESTIONS.md rather than inventing a kill test. A grouped KQ is not feasible
   merely because one child Q has an instrument. Record missing instruments,
   dependencies and the next action per affected Q in ENGAGEMENT.md's feasibility
   table; unresolved coverage must stay visibly DEGRADED, never signed clean.
   Proposed reframing, criterion changes or transfer out of scope follow the
   accepted-amendment contract in `references/sow-register.md`; do not silently
   narrow a question to the evidence available. With no register, keep the
   existing per-KQ check and do not manufacture Q-ids.

   **Batch C — deliverable & constraints.** Format, audience, deadline,
   interim checkpoints. Data access: which paid databases exist, is
   there a data room, confidentiality rules (codename? no target
   contact?). If codename discipline is requested, record its SCOPE
   explicitly — "deliverables only" (internal workpapers may use the
   real name) vs "all artifacts". If all-artifacts: the real-name ↔
   codename mapping lives ONLY in `.diligence/IDENTITY.md` (suggest
   gitignoring it), every artifact uses the codename, and research
   agents resolve the mapping at query time. Never record a codename
   rule and then ignore it — an unworkable rule is renegotiated at
   scoping, not silently dropped.

   **Batch D — taxonomy.** For each lock field (segments, geography,
   currency/units/FX, time basis, source hierarchy, defined terms):
   propose a default from desk research + the source-hierarchy
   reference, ask the user to confirm/edit. Push for boundary cases on
   segment definitions ("where does X fall?") and a test value per
   segment. Fields the user can't settle → open_fields with what would
   settle them.

   **Document intake.** If the folder contains deal documents (CIM,
   teaser, spreadsheets), list them and confirm each is in scope as
   input (plain conversation, not a form).

3. Spawn `gdd-scoper` with: the engagement root (absolute path of
   `<ENGAGEMENT_ROOT>` — the folder it must create), the target, the
   full set of batch A–D answers
   collected above (including open_fields), the document-intake list,
   the SOW/register if present (preserve them and cover all active Q-ids),
   the KQ/Q-to-criterion/instrument mapping and exact feasibility blockers,
   the staged-intake classification and saved intake handoff/history,
   paths to the engagement/taxonomy/state templates and the state-json
   schema, and the source-hierarchy reference. The scoper does not ask
   the user anything — it writes from what it is given.
4. Scoper drafts and writes:
   - `.diligence/ENGAGEMENT.md`, `.diligence/TAXONOMY.md`
   - `.diligence/state.json` (schema v1, `taxonomy_lock` populated,
     unknowns in `open_fields`)
   - empty `.diligence/LEDGER.md`, `.diligence/SOURCES.md`, and
     `.diligence/STATE.md` from `${CLAUDE_PLUGIN_ROOT}/gdd-core/templates/ledger.md`,
     `${CLAUDE_PLUGIN_ROOT}/gdd-core/templates/sources.md`, and
     `${CLAUDE_PLUGIN_ROOT}/gdd-core/templates/state.md`
   - `.diligence/config.json` from the template
   - registers intake documents in SOURCES.md at their tier (a CIM is
     tier 4 — company self-disclosure via bankers — note the incentive)
   - carries a saved intake handoff into STATE.md Handoff and
     `state.json.continuation`, retaining QUESTIONS.md's original as history
5. Orchestrator presents both artifacts section-by-section for user
   sign-off. Edit handling (this IS the spec — behavior must match):
   the orchestrator may apply section-level wording/content edits
   directly, tracking each to fold into the session log at sign-off
   (STATE.md's scope sign-off entries are written in step 6; any transferred
   intake handoff is retained before that); STRUCTURAL
   changes — adding/removing sections or KQs, any change to the
   taxonomy lock or `state.json` — re-spawn the scoper with the
   corrected input, the same ENGAGEMENT_ROOT and an explicit same-review
   draft-edit request. The scoper rewrites only affected sections, preserving
   all other core/register/history content; it does not reinitialize the full
   draft. This exception does not permit repair of partial/malformed core.
   No re-interview is needed.
6. On sign-off the orchestrator (not the scoper) writes STATE.md's
   position = "scoped" and a dated "engagement scoped" Session log entry.
   Preserve any transferred intake stopping point and open decisions in the
   handoff/history; record the transition and set the handoff's next step and
   `state.json.continuation.next_step` to `/gdd:hypothesis-tree`, keeping the
   mirrored handoff consistent. Do not clear the register's intake history.
   Follow the Local Git checkpoints contract in `references/sow-register.md`
   for the agreed scope milestone, with the orchestrator owning the checkpoint.
   Report the actual SHA or limitation; suggest `/gdd:hypothesis-tree`.

Artifacts: ENGAGEMENT.md, TAXONOMY.md, state.json, LEDGER.md, SOURCES.md,
STATE.md, config.json.

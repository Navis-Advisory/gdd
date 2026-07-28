# Workflow: scope-deal

Engagement root: `<CWD>/.diligence` — this command CREATES it, at
exactly that path and nowhere else. Never search parent or sibling
directories for `.diligence/`; never read or write another folder's
engagement. Full contract: references/engagement-root.md.

Preconditions: `.diligence/` must not exist in the current working
directory (one engagement per folder); refuse with a pointer to
/gdd:resume-work otherwise. A `.diligence/` in a parent or sibling
folder is a different engagement and no obstacle — ignore it.

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
   Then propose 4–6 key questions derived from thesis + quad and let
   the user edit; each KQ must be evidence-answerable within the
   timeline, and every key concern must map to a KQ — an unmapped
   concern is a scoping defect to fix before sign-off. Deal breakers
   seed the risks screens and the red team's mandatory attack list
   downstream.

   **KQ feasibility check (executed once Batch C constraints are set,
   just before sign-off — described here with the KQs it gates):** for each
   KQ, name the evidence instrument that answers it UNDER the Batch C
   constraints as recorded (data-room contents, contact rules, paid
   databases). A KQ with no available instrument must be (a) reframed
   to what is answerable, (b) marked DEGRADED with the missing
   instrument named, or (c) moved to another workstream — an
   unanswerable KQ may not be signed. The KQ × instrument table goes in
   ENGAGEMENT.md (see the template) so week 0 owns this conversation,
   not the readout.

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
   `<CWD>/.diligence` — the folder it must create), the target, the
   full set of batch A–D answers
   collected above (including open_fields), the document-intake list,
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
5. Orchestrator presents both artifacts section-by-section for user
   sign-off. Edit handling (this IS the spec — behavior must match):
   the orchestrator may apply section-level wording/content edits
   directly, tracking each to fold into the session log at sign-off
   (STATE.md's first entries are written in step 6, not before); STRUCTURAL
   changes — adding/removing sections or KQs, any change to the
   taxonomy lock or `state.json` — re-spawn the scoper with the
   corrected input (plain conversation — no re-interview needed, the
   scoper rewrites the affected section).
6. On sign-off the orchestrator (not the scoper) writes STATE.md's
   first entries: position = "scoped", and the opening Session log line
   (date · "engagement scoped"). Suggest `/gdd:hypothesis-tree`.

Artifacts: ENGAGEMENT.md, TAXONOMY.md, state.json, LEDGER.md, SOURCES.md,
STATE.md, config.json.

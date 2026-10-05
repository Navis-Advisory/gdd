# Workflow: hypothesis-tree

Resolve ENGAGEMENT_ROOT per `references/engagement-root.md` before any
engagement access. Use that same absolute path throughout this workflow;
never search parent/sibling engagements or derive the root from the install.

Preconditions: scoped engagement (ENGAGEMENT.md exists and signed off).

## Decomposition guidance (for the planner prompt)

- First-order conditions come from the thesis's own logic, not a
  generic checklist. "Double ARR via market growth + share gain +
  pricing" decomposes into exactly those three multiplicative claims,
  plus the implicit ones every thesis carries (customers stay; the
  moat that enables share gain exists; nothing structural kills it).
- The deal objective in ENGAGEMENT.md seeds the tree: value-creation
  levers are candidate first-order conditions (the thesis usually
  compounds through them), and every deal breaker must land as a risk
  leaf or a GATE-OWNED condition — a breaker the tree ignores is a
  decomposition defect.
- A good leaf passes three tests: falsifiable (names the evidence that
  kills it), decidable this engagement (within access constraints from
  ENGAGEMENT.md), and owned (exactly one module).
- Baseline-check every kill clause before it ships: a kill condition
  that is already true at brief-writing time (e.g. "unless a horizontal
  acquires a vertical" when one already has) makes the hypothesis dead
  on arrival — rewrite it against the known baseline so the leaf tests
  change, not history.
- Rewrite vague virtues into testable claims: "strong management" →
  "the team has done a comparable integration before" or drop it.
- Cross-module conditions (typically the root's quantitative
  sufficiency check: "do the evidenced levers compound to the thesis
  magnitude?") belong to no module by design. Record them in TREE.md
  marked GATE-OWNED and as a STATE.md open question; D6 (thesis
  sensitivity) owns them at triangulate, and the storyline must answer
  them explicitly.
- Standard module mapping: demand-side claims → market; supply-side
  relative claims → competition; behavior/retention claims →
  customers; capability/moat claims → company; deal-killers and
  structural exposures → risks. A leaf that needs two modules is two
  leaves.
- MECE audit mechanics: at each level ask (a) does any pair overlap —
  same evidence would move both? then merge or sharpen; (b) if every
  sibling were true, is the parent necessarily true? if not, name the
  missing sibling. Audit against the locked definitions — if MECE-ness
  is undecidable because a term is loose, that's a taxonomy gap to
  report, not a judgment call to bury.

If QUESTIONS.md exists, pass its current accepted scope and criteria to the
planner. Active means every Q-id not marked out-of-scope, including answered
questions whose evidence may be reused. Every active Q-id must map to an owning
module brief and named analysis, or a visible blocker with the missing input
and next action. Descriptive questions need no thesis leaf: do not invent a
hypothesis to accommodate them. QUESTIONS.md alone owns question status;
briefs hold the execution plan and criterion references, not a second register.

1. Spawn `gdd-planner` with the engagement root (absolute path),
   ENGAGEMENT.md, TAXONOMY.md, STATE.md, state.json, QUESTIONS.md if present, and the
   module-brief template path.
2. Planner builds thesis → 3–6 first-order conditions → falsifiable
   leaves; audits MECE against locked segment definitions; assigns each
   leaf an owning module (market / competition / customers / company /
   risks). Create briefs for the union of modules owning leaves and active
   Q-ids. A Q-only module is valid and has a hypothesis count of zero. Keep
   uncovered or unmapped Q-ids visible as planning blockers; do not invent an
   owner, evidence instrument or accepted criterion.
3. Planner writes `.diligence/TREE.md` — the full tree as an indented
   outline, one line per node, leaves carrying their id and owning
   module (falsifiability detail lives in the briefs). TREE.md is the
   canonical tree artifact that red-team and storyline consume; STATE.md
   gets only a one-line position update, not a copy of the tree. Then
   `.diligence/modules/<name>/BRIEF.md` per assigned module. After the
   briefs are written, write `state.json.modules.<name> =
   {status: "pending", brief: ".diligence/modules/<name>/BRIEF.md",
   hypotheses: <leaf count>}` for EVERY module that got a brief —
   including `hypotheses: 0` for Q-only modules. This initializes NEW module
   entries only. On existing entries, update affected brief/count metadata while
   preserving status and evidence unless an accepted material change reopens
   them under `references/sow-register.md`.
   STATE.md's module table is a projection of this machine state, never
   the other way round. A brief on disk with no state.json.modules
   entry is an incomplete step.
4. Orchestrator shows the tree to the user; branch disputes loop back;
   ARGUMENTS may scope a rebuild to one branch. Preserve unrelated briefs and
   all active Q-id coverage, including descriptive work in the affected module.
   Record a dated revision; scope/criterion changes and completion invalidation
   follow `references/sow-register.md`, never an implicit rewrite of the register.
5. After the tree/briefs are accepted, the orchestrator follows the Local Git
   checkpoints contract in `references/sow-register.md` for exact changed
   planning files; report the actual SHA or limitation. Suggest `/gdd:workplan`.

Artifacts: .diligence/TREE.md, .diligence/modules/*/BRIEF.md, STATE.md +
state.json.modules update.

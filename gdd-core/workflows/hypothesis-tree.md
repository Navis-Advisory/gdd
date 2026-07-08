# Workflow: hypothesis-tree

Preconditions: scoped engagement (ENGAGEMENT.md exists and signed off).

## Decomposition guidance (for the planner prompt)

- First-order conditions come from the thesis's own logic, not a
  generic checklist. "Double ARR via market growth + share gain +
  pricing" decomposes into exactly those three multiplicative claims,
  plus the implicit ones every thesis carries (customers stay; the
  moat that enables share gain exists; nothing structural kills it).
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

1. Spawn `gdd-planner` with ENGAGEMENT.md, TAXONOMY.md, STATE.md, and the
   module-brief template path.
2. Planner builds thesis → 3–6 first-order conditions → falsifiable
   leaves; audits MECE against locked segment definitions; assigns each
   leaf an owning module (market / competition / customers / company /
   risks — only modules with leaves get briefs).
3. Planner writes `.diligence/TREE.md` — the full tree as an indented
   outline, one line per node, leaves carrying their id and owning
   module (falsifiability detail lives in the briefs). TREE.md is the
   canonical tree artifact that red-team and storyline consume; STATE.md
   gets only a one-line position update, not a copy of the tree. Then
   `.diligence/modules/<name>/BRIEF.md` per assigned module.
4. Orchestrator shows the tree to the user; branch disputes loop back;
   $ARGUMENTS may scope a rebuild to one branch (re-derive only that
   module's brief; supersede, don't edit).
5. Suggest `/gdd:workplan`.

Artifacts: .diligence/TREE.md, .diligence/modules/*/BRIEF.md, STATE.md
update.

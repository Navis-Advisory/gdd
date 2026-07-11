# Workflow: probe-customers

Preconditions: taxonomy lock. Retention/churn claims require the churn
basis in defined_terms (gross logo vs net revenue); if undefined, that
claim type is blocked — report it, route to scoping for a supersession,
run the other claim types meanwhile. Check
`state.json.taxonomy_lock.defined_terms` first.

1. Spawn `gdd-analyst` with `.diligence/modules/customers/BRIEF.md` (or
   a default brief if the tree didn't produce one — note that in
   STATE.md) plus references/customer-evidence.md.
2. Analyst works the claim types in the brief up their evidence ladders
   (retention, satisfaction, KPCs, willingness to pay, buying cycle,
   concentration); heavy evidence gathering delegates to
   `gdd-researcher` fresh-context, parallel per claim type where
   independent (review mining serves several — dedup once, reuse the
   corpus, per-claim discipline still applies).
3. Ladder discipline, per the reference:
   - the rung reached is recorded in each finding's basis and caps its
     confidence (no H retention findings outside-in);
   - every testimony unit carries who / channel / selection mechanism —
     blank selection concedes the red team's first attack;
   - tier-6 testimony (reviews, forums) is direction-only per the D4
     tally rule; magnitude needs a higher rung;
   - rungs unreachable at the engagement's access level are marked
     UNREACHABLE in FINDINGS.md and filed as open questions — they seed
     the data request; never simulate a high rung from low-rung
     material.
4. KPC table is the headline: ranked purchase criteria in buyer
   language, each row with source ids, segment, and direction
   (win-driver / loss-driver / both). The competition module's
   positioning axes consume this table — if map-competitors already ran
   on analyst-derived axes, flag the axes re-check in STATE.md.
5. Write `.diligence/modules/customers/FINDINGS.md`; promote headliners
   to LEDGER.md (one claim per finding — retention, satisfaction, and
   KPC headliners promote separately); update STATE.md (module row,
   Position, session-log line). Customer-concentration output (top-10
   share, or its outside-in ESTIMATE) is what the risks module's
   concentration screen will cite — promote it even when unremarkable.

## Method notes (for the analyst prompt)

- Full ladders and hygiene in references/customer-evidence.md; the
  non-negotiables: review-mining discipline (platform mix, window,
  volume, dedup basis recorded; incentivized-review and burst flags;
  competitor reviews get identical treatment or no comparison),
  case-study forensics (logo diffing between deck vintages is churn
  signal — tier 4, absence corroborated before it carries weight),
  NPS-style numbers with no base are prohibited at build time.
- Out-of-segment testimony is recorded but flagged OUT-OF-SEGMENT and
  never load-bearing.
- Mystery shop and customer-service probes are single data points —
  color, not findings, unless corroborated.
- B2C engagements follow the reference's B2C branch (repeat-purchase
  cohort logic, panel data where tier-3 access exists).

Artifacts: .diligence/modules/customers/FINDINGS.md, LEDGER.md entries,
SOURCES.md entries, STATE.md update.

# Workflow: probe-customers

Engagement root: `<CWD>/.diligence` — it exists at exactly that path or
the engagement does not exist here. Never search parent or sibling
directories for `.diligence/`; never read or write another folder's
engagement. Full contract: references/engagement-root.md.

Preconditions: taxonomy lock. Retention/churn claims require the churn
basis in defined_terms (gross logo vs net revenue); if undefined, that
claim type is blocked — report it, request a taxonomy-lock supersession
from gdd-librarian to define the churn basis (`/gdd:scope-deal` refuses
once a lock exists), and run the other claim types meanwhile. Check
`state.json.taxonomy_lock.defined_terms` first.

1. Spawn `gdd-analyst` with the engagement root (absolute path) and
   `.diligence/modules/customers/BRIEF.md` (or
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

> 🔴 **If delegation is unavailable, say so — do not silently inline it.**
> The fresh-context split is GDD's central design claim: it is why module
> briefs exist and why analyst and researcher are separate roles. When no
> subagent tool is exposed, research collapses to a single inline pass with
> materially lower recall, and **nothing fails** — every postcondition still
> closes on a well-formed ledger, so the degradation is invisible in the
> artifacts (GDD-BUG-23).
> Before starting research, check whether a subagent tool is actually
> available. If it is not: set `state.json.modules.<name>.status` to
> `blocked` **or** record `delegation: unavailable` in the module's STATE.md
> row with the reason, proceed inline, and label the module's recall as
> degraded in FINDINGS.md. A run that inlined its research is not comparable
> to one that delegated — the same graceful-degradation-plus-flag pattern the
> workflows already use for a missing upstream module.


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

## Completion gate

> **Ledger promotion is serial.** Do not run this module concurrently with
> another module command: `LEDGER.md` and `SOURCES.md` are unlocked shared
> tables, and concurrent appends lose rows silently (GDD-BUG-22). If an
> orchestrator is running modules back-to-back this is automatic; if it is
> tempted to fan them out, the research may overlap but the promotion step
> must not.


The command is not complete until the module postconditions hold on
disk: `.diligence/modules/customers/FINDINGS.md` exists non-empty, the
promoted LEDGER.md rows exist, STATE.md carries the module row, and
`state.json.modules.customers` is written. Lifecycle: set
`status: "in-progress"` when the module starts, `"done"` on completion
or `"blocked"` with the reason (statuses are the schema enum, nothing
else). Verify each before yielding the turn. Never yield with a promise to "report back": subagent calls
are synchronous — if one has not returned, wait for it; if it failed,
re-run it once or execute the work inline and say so in the session
log.

Artifacts: .diligence/modules/customers/FINDINGS.md, LEDGER.md entries,
SOURCES.md entries, STATE.md + state.json.modules.customers update.

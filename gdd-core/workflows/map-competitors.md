# Workflow: map-competitors

Preconditions: taxonomy lock. Best after size-market (denominator for
shares); if no sized market exists, shares are labeled "of estimated
market (unsized)" and D5 will flag them.

1. Spawn `gdd-analyst` with `.diligence/modules/competition/BRIEF.md` (or a default
   brief if the tree didn't produce one — note that in STATE.md).
2. Analyst builds: the set (direct / adjacent / substitutes, per taxonomy
   boundary cases), positioning against segment axes, share estimates
   citing the ledger's market size by finding id.
3. Heavy evidence gathering delegates to `gdd-researcher` fresh-context
   (one researcher per competitor cluster, parallel where independent).
4. Cross-check inline: named shares + fringe ≈ 100% of the sized market;
   competitors' reported revenues consistent with their claimed shares.
   Violations are findings, not footnotes.
5. Write `.diligence/modules/competition/FINDINGS.md`; promote headliners to
   LEDGER.md; update STATE.md (module row, Position, session-log line).
   Denominator labeling: shares cite the ledger market finding by id at
   its recorded status — a point figure if reconciled, "share of the
   $X–Y span (F#, confidence, IRRECONCILED)" if not, "of estimated
   market (unsized)" if sizing hasn't run. Never invent a point
   denominator to make shares look cleaner.

## Method notes (for the analyst prompt)

- Set construction: start from the taxonomy boundary cases (who
  supplies the entities decided IN), then add adjacents (horizontal
  players selling into the segment) and substitutes (spreadsheets/
  paper count as competition when penetration <100%). Survivorship
  check: search for players by customer testimony and job postings,
  not just "top N" listicles.
- Positioning axes come from the segment definition's buying criteria,
  not a generic 2×2; if the taxonomy doesn't imply axes, derive them
  from win/loss evidence and say so.
- Share estimation ladder (best first): disclosed revenue in-segment >
  customer counts × ARPU (state both sources) > review-volume proxies
  (label ESTIMATE, calibrate against a player with known revenue).
  Every share cites the ledger denominator by finding id.

Artifacts: .diligence/modules/competition/FINDINGS.md, LEDGER.md entries, SOURCES.md
entries, STATE.md update.

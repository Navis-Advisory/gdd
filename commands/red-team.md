---
name: red-team
description: Build the strongest case against the thesis and stress-test the findings ledger
allowed-tools: Read, Write, Agent
---

<objective>
Adversarial pass. A fresh-context agent argues the strongest available
case AGAINST the investment thesis using only the engagement's own
evidence plus targeted counter-research, and flags every ledger finding
that would not survive a skeptical partner review. Output is
`.diligence/reports/REDTEAM.md`: the counter-thesis, kill-list of fragile findings,
and what evidence would settle each dispute.
</objective>

<execution_context>
@${CLAUDE_PLUGIN_ROOT}/gdd-core/workflows/red-team.md
</execution_context>

<context>
$ARGUMENTS may target a single hypothesis branch. Runs best after
/gdd:triangulate and before /gdd:storyline.
</context>

<process>
1. Spawn `gdd-red-teamer` with the ledger, module findings, and
   hypothesis tree — instructed to refute, not to balance.
2. Findings it kills are marked CONTESTED in LEDGER.md (never silently
   deleted); the storyline may not rest a key-line claim on a CONTESTED
   finding.
3. Write .diligence/reports/REDTEAM.md; update STATE.md.
</process>

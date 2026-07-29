---
description: Build the competitive map — set, positioning, and share estimates with citations
argument-hint: "[segment or competitor to focus on]"
arguments: [focus]
allowed-tools: Read, Write, Edit, Agent, WebSearch, WebFetch
---

<objective>
Map the competitive landscape for the locked market definition: the
competitive set (direct, adjacent, substitutes), positioning against the
segment axes in the taxonomy, share estimates consistent with the market
sizing, and where the target wins or loses. Share estimates must sum
sensibly against the sized market — that cross-check is run here, not
deferred to triangulation.
</objective>

<execution_context>
@${CLAUDE_PLUGIN_ROOT}/gdd-core/workflows/map-competitors.md
</execution_context>

<context>
Focus: $ARGUMENTS. Requires the taxonomy lock; runs best after
/gdd:size-market so shares have a denominator.
</context>

<process>
1. Spawn `gdd-analyst` with the engagement root (absolute path of
   `<CWD>/.diligence`) and the module brief; heavy evidence gathering
   goes to `gdd-researcher` in fresh context (root passed along).
2. Every competitor claim (size, share, positioning) carries a citation
   registered in SOURCES.md at the appropriate source tier.
3. Write `.diligence/modules/competition/FINDINGS.md`; promote key findings to
   LEDGER.md with confidence levels; log open questions.
</process>

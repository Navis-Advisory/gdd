---
name: size-market
description: Size the target market with independent top-down and bottom-up estimates, then reconcile them
argument-hint: "[segment name, defaults to the primary market]"
arguments: [segment]
allowed-tools: Read, Write, Edit, Agent, WebSearch, WebFetch, AskUserQuestion
---

<objective>
The flagship module. Produce a defensible market size by running TWO
independent estimates in fresh-context subagents — top-down (anchor
sources, successive filters) and bottom-up (unit economics × counts) — and
then reconciling them. The sizers must not see each other's work; the
reconciliation gap is the signal, and hiding it destroys the method.

This is GDD's dimensional-analysis moment: two estimates built from
disjoint evidence that land within tolerance are worth more than either
alone.
</objective>

<execution_context>
@${CLAUDE_PLUGIN_ROOT}/gdd-core/workflows/size-market.md
</execution_context>

<context>
Segment: $ARGUMENTS (default: the primary market as defined in
TAXONOMY.md). Requires the taxonomy lock — refuse to size an undefined
segment; route to /gdd:scope-deal to lock definitions first.
</context>

<process>
1. Spawn `gdd-sizer-topdown` and `gdd-sizer-bottomup` in parallel, each
   with only ENGAGEMENT.md, TAXONOMY.md, and its own method reference —
   never the other's output or prior sizing work.
2. Each sizer returns an estimate with explicit assumptions, units per the
   taxonomy lock, and citations registered in SOURCES.md.
3. Reconcile per the workflow: within tolerance → record both, the
   reconciled figure, and the driver of the residual gap; outside
   tolerance → do NOT average — identify the divergent assumption and
   re-run the weaker leg.
4. Write findings to `.diligence/modules/market/FINDINGS.md` and promote headline
   numbers to LEDGER.md with confidence levels.
</process>

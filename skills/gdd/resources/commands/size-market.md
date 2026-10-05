---
description: Size the target market with independent top-down and bottom-up estimates, then reconcile them
argument-hint: "[segment name, defaults to the primary market]"
arguments: [segment]
allowed-tools: Read, Write, Edit, Agent, Bash, WebSearch, WebFetch, AskUserQuestion
---

<objective>
The flagship module. Produce a defensible market size by running TWO
independent estimates in fresh-context subagents — top-down (anchor
sources, successive filters) and bottom-up (unit economics × counts) — and
then reconciling them. The sizers must not see each other's work; the
reconciliation gap is the signal, and hiding it destroys the method.

This is GDD's dimensional-analysis moment: two estimates built from
disjoint evidence that land within tolerance are worth more than either
alone. A market brief containing only descriptive Qs and no requested sizing
uses the workflow's existing-analyst route; do not manufacture a sizing exercise
or claim independent estimates for that route.
</objective>

<execution_context>
@RESOURCE_ROOT/gdd-core/references/engagement-root.md
@RESOURCE_ROOT/gdd-core/workflows/size-market.md
</execution_context>

<context>
Segment: ARGUMENTS (default: the primary market as defined in
TAXONOMY.md). Requires the taxonomy lock — refuse to size an undefined
segment; route to /gdd:scope-deal to lock definitions first.
</context>

<process>
First apply the workflow's SOW coverage/dependency preflight. If the accepted
brief is descriptive-only and sizing was not requested, dispatch the existing
analyst for those Qs, preserve their criteria, save/promote evidence serially
and report answers/gaps, then return through the workflow's completion gate.
Otherwise follow the sizing steps below. Missing briefs for assigned Qs or
named required inputs are blockers; never substitute generic coverage.

1. Spawn `gdd-sizer-topdown` and `gdd-sizer-bottomup` in parallel, each
   with only the engagement root (resolved absolute path ENGAGEMENT_ROOT),
   ENGAGEMENT.md, TAXONOMY.md, sizing-relevant brief/accepted Q criteria and its
   own method reference — never the other leg's output, prior sizing work or
   the register's answers/evidence. Hold non-sizing analyses until both return.
2. Each sizer returns an estimate with explicit assumptions, units per the
   taxonomy lock, and citations registered in its own per-leg scratch
   registry — never shared SOURCES.md (the orchestrator merges both
   registries into SOURCES.md at reconciliation, per the independence
   protocol).
3. Reconcile per the workflow: within tolerance → record both, the
   reconciled figure, and the driver of the residual gap; outside
   tolerance → do NOT average — identify the divergent assumption and
   re-run the weaker leg.
4. Write findings to `.diligence/modules/market/FINDINGS.md` and promote headline
   numbers to LEDGER.md with confidence levels.
5. Complete remaining assigned descriptive Q analyses per the workflow,
   preserving sizing sections/anchors. Report substantive answers or explicit
   criterion gaps; only the orchestrator reconciles QUESTIONS.md after serial
   promotion. A market-size finding does not answer unrelated Qs.
</process>

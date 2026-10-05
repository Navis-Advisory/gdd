---
argument-hint: "[module or check ID to scope to, defaults to the full sweep]"
arguments: [scope]
description: Run the verification gate — consistency and traceability checks across all findings
allowed-tools: Read, Write, Edit, Agent, Bash
---

<objective>
GDD's verification gate. Run the check registry (D1–D8: units/currency/
time-basis, top-down/bottom-up reconciliation, MECE audit, citation
coverage, cross-artifact consistency, sensitivity, plausibility, red-team
survival status) against the findings ledger and module outputs, and write
`.diligence/reports/TRIANGULATION.md`.

The honest claim, stated verbatim in the report: these checks establish
that the work product is internally consistent and fully traceable — not
that the numbers are true. That is the QA a good engagement manager runs.
</objective>

<execution_context>
@RESOURCE_ROOT/gdd-core/references/engagement-root.md
@RESOURCE_ROOT/gdd-core/workflows/triangulate.md
</execution_context>

<context>
ARGUMENTS may scope to one module or one check ID. Default: full sweep.
</context>

<process>
1. Spawn `gdd-verifier` in fresh context with the engagement root
   (resolved absolute path ENGAGEMENT_ROOT), read access to all of
   `.diligence/`, and the check registry reference.
2. Verifier runs each applicable check, showing its work — arithmetic
   re-done in an executed code block, not asserted (the external-oracle
   rule: at least one executed computation per report).
3. Each check gets PASS / FAIL / NOT-APPLICABLE with evidence; failures
   get a specific remediation pointing at the owning module.
4. Write .diligence/reports/TRIANGULATION.md; update STATE.md gate status. A FAIL
   blocks /gdd:storyline until resolved or explicitly waived by the user
   (waiver recorded in the report).
</process>

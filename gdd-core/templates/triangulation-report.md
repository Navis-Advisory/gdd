---
template: triangulation-report
template_version: 3
---

# Triangulation report — {DEAL_NAME} · {DATE}

engagement_root: {ABSOLUTE_PATH_TO}/.diligence
written_by: gdd-verifier / {DATE}

<!-- Provenance stamp (mandatory): engagement_root is the absolute path
of the engagement this report belongs to — the root passed in the
verifier's prompt. A report whose stamp does not match the root it sits
under is a foreign artifact; D5 fails it. -->

> These checks establish internal consistency and traceability of the
> work product. They do not establish that the estimates are true.

<!-- Written by gdd-verifier per references/verification-checks.md. The
blockquote above is fixed wording — it appears verbatim in every report;
softening or omitting it is a defect.

Report discipline:
- PASS only for checks actually run; anything else is N-A with the
  reason ("D6 N-A: no sensitivity table exists yet" — which is itself
  the remediation).
- Evidence is shown, not asserted: cite the artifact lines checked,
  include the executed computations.
- If state.json.taxonomy_lock was missing, the warning goes HERE, in
  the header, not buried. -->

## Gate result

<!-- PASS / FAIL (list failing check ids) / WAIVED.
Waiver format: user's words verbatim, quoted, dated. e.g.:
WAIVED — "Accept D2 gap at 38%, both legs weak on penetration, flagged
in risks" — EM, 2026-07-21. -->

## Checks

<!-- One section per check, D1–D8, format:

### D2 Top-down / bottom-up reconciliation — PASS
- Legs: TD $1.21B (F2), BU $0.94B (F3); recomputed below.
- Gap: 28.7% of min — within 30% tolerance (taxonomy_lock).
- Independence: source sets disjoint above tier 4 ✓; no cross-references ✓.
- Residual-gap driver recorded in .diligence/modules/market/FINDINGS.md#reconciliation ✓.

Keep each check's evidence to what makes the verdict auditable. -->

### D1 Units, currency, time basis —
### D2 Top-down / bottom-up reconciliation —
### D3 MECE audit —
### D4 Citation coverage & tier adequacy —
<!-- Include the trace stats (n findings → n sources, dangling: 0) and
the spot-check list (finding id · source id · says-what-claimed?). -->
### D5 Cross-artifact consistency —
### D6 Thesis sensitivity —
### D7 Plausibility & base rates —
### D8 Red-team disposition —

## Failures & remediations

<!-- One row per FAIL: check id · what exactly failed (artifact + line) ·
owning module · the specific fix. A remediation must be actionable by
the owning module without further diagnosis. -->

## Executed computations

<!-- The external-oracle blocks: the actual commands run and their
actual output (≥1 mandatory). Recomputed leg arithmetic, FX
conversions, implied-ratio checks belong here. -->

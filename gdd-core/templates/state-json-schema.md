---
template: state-json-schema
template_version: 1
---

# `.diligence/state.json` schema (v1)

Machine authority for taxonomy, module/gate state and full-session continuation;
QUESTIONS.md remains the SOW question-status authority. Written by
gdd-scoper at init; taxonomy_lock amended only by gdd-librarian.

```json
{
  "gdd_state_version": 1,
  "engagement": {
    "name": "",
    "deadline": "YYYY-MM-DD",
    "thesis": ""
  },
  "taxonomy_lock": {
    "taxonomy_version": 1,
    "segments": [
      { "name": "", "definition": "", "boundary_cases": [], "test_value": "" }
    ],
    "geography": [],
    "currency": { "reporting": "", "fx": [{ "pair": "", "rate": 0, "as_of": "", "source": "S#" }], "units": "" },
    "time_basis": { "kind": "CY|FY", "base_year": 0, "end_year": 0 },
    "source_hierarchy_overrides": [],
    "reconciliation_tolerance_pct": 30,
    "defined_terms": {},
    "open_fields": [{ "field": "", "note": "what would settle it" }],
    "supersessions": []
  },
  "gates": {
    "triangulation": { "status": "not-run|pass|fail|waived", "as_of": null, "waiver": null },
    "red_team": { "status": "not-run|run", "as_of": null }
  },
  "modules": {
    "<name>": { "status": "pending|in-progress|done|blocked", "brief": ".diligence/modules/<name>/BRIEF.md", "hypotheses": 0 }
  },
  "continuation": { "handoff": null, "next_step": null }
}
```

Rules:
- Unknown-at-scoping fields go in `open_fields` (element shape as
  above), not guessed defaults.
- `time_basis.end_year` is the horizon's final year (e.g. base_year
  2025, end_year 2030); prose renderings like "2025–2030" must match.
- Every `fx` entry carries the SOURCES.md id of its rate (`source`).
- `supersessions` entries: `{date, field, old, new, reason,
  affected_findings, new_version}`.
- Agents read the lock from here first; TAXONOMY.md is fallback with a
  loud warning (see gdd-verifier).

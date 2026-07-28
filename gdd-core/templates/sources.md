---
template: sources
template_version: 3
---

# Source registry — {DEAL_NAME}

<!-- Every source used anywhere in the engagement, registered at first
use by whichever agent used it. Append-only; gdd-librarian dedupes by
cross-reference.

Rules:
- Ids sequential (S1…), never reused.
- Tier per the hierarchy locked in TAXONOMY.md — recorded at
  registration, argued later if wrong (librarian fixes with a note).
- "Supports" lists finding ids as they accrue, or a taxonomy-lock field
  reference (e.g. `taxonomy_lock.currency.fx`) for sources backing the
  lock itself — a source supporting nothing by engagement end is noise
  the librarian flags.
- Locator must let a colleague find the exact figure: URL + section/
  page/exhibit, or data-room path. "Company website" is not a locator.
  The Locator cell is REQUIRED on every row: when the source was only
  reachable as a search snippet (document not retrievable), write
  `UNVERIFIED (snippet)` — never leave it blank. D4 counts tier-1/2
  claims resting on UNVERIFIED locators.
- One tier per row: a bundled source (report + press coverage) gets
  one row per underlying source, each at its own tier — split tiers
  ("4/5") are illegal.
- Accessed date matters: web sources drift; a dead link at verification
  time downgrades D4.
- Reliability notes capture the caveat you'd say out loud: vintage,
  methodology quirk, incentive ("vendor-sponsored study"), definitional
  mismatch with our taxonomy.

Worked example rows (Project Kestrel):
| S3 | IBISWorld Pest Control in the US (2026 ed.) | ibisworld.com/…/pest-control, §Industry Revenue | 3 | 2026-07-02 | F1, F4 | Services revenue, not software — used only as anchor denominator |
| S7 | ServiceTitan S-1 | SEC EDGAR, S-1 p.114 | 1 | 2026-07-02 | F1, F8 | FSM ARPU disclosure; horizontal FSM, pest share not broken out |
-->

| ID | Source | Locator | Tier | Accessed | Supports | Reliability notes |
|----|--------|---------|------|----------|----------|-------------------|

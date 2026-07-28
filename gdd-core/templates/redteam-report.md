---
template: redteam-report
template_version: 3
---

# Red-team report — {DEAL_NAME} · {DATE}

engagement_root: {ABSOLUTE_PATH_TO}/.diligence
written_by: gdd-red-teamer / {DATE}

<!-- Provenance stamp (mandatory): engagement_root is the absolute path
of the engagement this report belongs to — the root passed in the
red-teamer's prompt. A report whose stamp does not match the root it
sits under is a foreign artifact; D5 fails it. -->

<!-- Written by gdd-red-teamer. Refutation, not balance: this report is
the strongest case AGAINST, built from the engagement's own evidence
plus targeted counter-research. Its quality is measured by kills that
stand up and by attacks the findings survived — not by length.

Every kill triggers a CONTESTED status in LEDGER.md (status field only)
and eventually needs a disposition; D8 enforces. -->

## Counter-thesis

<!-- One page max: the most plausible world in which this deal is bad.
Not a list of quibbles — a coherent alternative reading of the same
evidence, e.g. "the vertical niche is a feature gap horizontal FSM
closes in one release cycle, and the 'moat' is switching inertia that
repricing at renewal will monetize away." Evidence-backed throughout. -->

## Kill list

| Finding | Why it dies | What would revive it |
|---------|-------------|----------------------|
<!-- Finding id · the specific defect (weak tier doing load-bearing
work, single-source, stale vintage, unexamined assumption, survivorship
in the set) · the concrete evidence that would restore it. Assertion-only
attacks get cut before writing. -->

## Survivors of note

<!-- Attacks attempted that failed, and why the finding held. This
section strengthens the readout — "we tried to kill it and couldn't"
is the strongest support a claim can carry. -->

## Risk-leaf verdicts

<!-- Only when the risks module executes as this sweep: one row per
H-risk leaf — verdict (holds / refuted / partial) · evidence · the
ledger row appended for it (module=risks). -->

## Unresolvable disputes

<!-- Genuinely undecidable on current evidence and access. Each: the
dispute · both readings · what data would settle it (even if
unobtainable this engagement). These MUST surface in the storyline's
risks section — the storyliner checks this list. -->

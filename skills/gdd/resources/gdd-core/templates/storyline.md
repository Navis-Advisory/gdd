---
template: storyline
template_version: 3
---

# Storyline — {DEAL_NAME} · {DATE}

engagement_root: {ABSOLUTE_PATH_TO}/.diligence
written_by: gdd-storyliner / {DATE}

<!-- Provenance stamp (mandatory): engagement_root is the absolute path
of the engagement this storyline belongs to — the root passed in the
storyliner's prompt. A report whose stamp does not match the root it
sits under is a foreign artifact; D5 fails it. -->

<!-- Written by gdd-storyliner after the gates (triangulation PASS or
WAIVED). Pyramid principle per references/pyramid-principle.md.

Hard rules the template enforces:
- Governing thought = the answer to ENGAGEMENT.md's decision question,
  approved by the user before expansion. "It depends" is not a
  governing thought; a conditioned answer is ("Attractive at ≤5x ARR;
  the thesis breaks above that on any sensitivity").
- Every support cites finding ids; numbers verbatim from the ledger
  (rounding per taxonomy rule only).
- CONTESTED ids appear only under Risks, labeled CONTESTED.
- The trace map is part of the deliverable, not an appendix nicety —
  it is what makes the readout defensible in the room. -->

## Governing thought

<!-- One sentence. -->

## Key line

<!-- 3–5 claims, MECE over the governing thought, each with its finding
ids in brackets. Typical diligence key line: market supports it ·
competitive position supports it · customer evidence supports it ·
risks are priced/bounded. Order by what the audience challenges first. -->

## Supports

<!-- One subsection per key-line claim: the findings beneath it, each
with id, the number as ledgered, and one line of "so what". Vertical
logic check: each subsection answers "why is the claim above true?";
horizontal check: siblings are same-kind and ordered. -->

## Gate-owned conditions

<!-- One subsection per GATE-OWNED condition in TREE.md (typically the
thesis-sufficiency check): the explicit answer, the arithmetic executed
(not asserted), and stated blind spots (e.g. out-of-scope retention).
Mandatory whenever TREE.md carries GATE-OWNED entries. -->

## Risks & sensitivities

<!-- Mandatory contents:
- flip points from D6 (which plausible assumption ranges flip which
  key-line claims)
- every CONTESTED ledger row, labeled, with disposition status
- every unresolvable dispute from REDTEAM.md (the storyliner checks
  that list; omitting one is a defect) -->

## Trace map

| Claim | Finding ids | Source ids |
|-------|-------------|------------|
<!-- Every key-line claim and load-bearing support, traced end-to-end.
This table is the audit trail the client can walk. -->

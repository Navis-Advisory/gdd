---
template: engagement
template_version: 2
---

# Engagement brief — Kestrel Sound

<!-- Written 2026-07-07 by gdd-scoper from the scoping interview.
Amend only via dated notes in the Amendments section. -->

## Target

KestrelSoft, Inc. (fictional; synthetic validation engagement) — vertical
field-service-management (FSM) SaaS for pest-control operators:
scheduling, routing, billing, and chemical-compliance logging. ~$40M ARR
band per the teaser; ~90% of revenue in North America.

## Client context

PE sponsor evaluating a control buyout at ~6× ARR. The client has the CIM
and one management call; no prior third-party DD noted. Client's prior:
the pest-control FSM vertical is under-penetrated and KestrelSoft is the
#2 player.

## Investment thesis

Client's words, verbatim (not improved):

> "Pest-control FSM is a growing niche where KestrelSoft can double ARR
> in 5 years via market growth, share gain from generic FSM tools, and
> pricing; the moat is vertical-specific compliance workflow."

## Key questions

KQ1. Is the addressable market big and growing enough to support the
     growth plan? (market)
KQ2. Is share gain from horizontal/generic FSM incumbents credible?
     (competition)
KQ3. What is renewal/expansion behavior and why? (customers) —
     **scoped OUT of this run by the client** (see Out of scope)
KQ4. Is the compliance moat real and durable? (company/moat) —
     **scoped OUT of this run by the client** (see Out of scope)
KQ5. What kills this deal? (risks — answered via red-team)

In-scope KQs for this run: KQ1, KQ2, KQ5. KQ3/KQ4 keep their numbers so
that any later re-inclusion does not renumber the tree.

## Deliverable & deadline

- Format: IC readout **memo**. Audience: investment committee.
- Final deadline: **2026-07-28** (3 weeks from scoping, 2026-07-07).
- Interim checkpoint: interim readout at **end of week 1** (taken as
  Fri 2026-07-10; client said "end of week 1" — confirm exact date at
  sign-off).

## Scope

### In scope
- Market module — size and growth of NA pest-control FSM software spend
  (KQ1), per the locked taxonomy.
- Competition module — competitive map and credibility of share gain
  from horizontal FSM tools (KQ2).
- Red-team — deal-killer sweep (KQ5).

### Out of scope
- KQ3 renewal/expansion (customers) — client scoped it out of this run.
- KQ4 compliance-moat durability — client scoped it out of this run.
- Any analysis requiring a data room or paid databases — no such access
  exists (see Constraints).
- Document intake — no deal documents (CIM, teaser, spreadsheets) are
  present in this folder; the client's CIM was not provided. If documents
  arrive later, register them in SOURCES.md at tier 4 before use.

## Constraints

- Paid databases (source-hierarchy tier 3): **none** — recorded per
  references/source-hierarchy.md; absence is not worked around.
- No data room.
- Public web only.
- Confidentiality: codename **mandatory**. Working codename "Kestrel
  Sound" (from the deal folder); client did not specify a codename —
  confirm at sign-off. Do not use the target's real name in externally
  visible artifacts.
- Environment note: several official-statistics hosts (bankofcanada.ca,
  federalreserve.gov) are unreachable from this research environment
  (egress-proxy policy denial); source registrations note where this
  forced a lower-tier source.

## Amendments

<!-- Dated notes only; never edit the sections above in place.
Format: YYYY-MM-DD · what changed · why · who approved. -->

2026-07-11 · **Scope extension**: KQ3 (customers) and KQ4 (company/moat)
brought IN scope; risks module upgraded from red-team-sweep execution to
the standing screens (`/gdd:scan-risks`). Access level unchanged
(outside-in, no data room) — target-specific evidence rungs stay
UNREACHABLE and are reported as such. Why: Phase-1 validation of the
five-module family on the same engagement. Approved: maintainer
(synthetic validation engagement).

2026-07-11 · **Deal objective recorded** (tool now captures this quad at
scoping; client supplied it on extension, verbatim):
- Strategic intent: "platform asset for a pest-software consolidation
  play — we'd bolt on route/chem adjacencies."
- Key concerns: "churn is opaque from outside; the teaser ARR looks big
  against your segment numbers; ServiceTitan or Jobber moving
  down-market." (→ KQ3, KQ2/F8, KQ2/KQ4.)
- Value-creation levers: "pricing headroom; share gain on the
  compliance wedge; bolt-on M&A."
- Deal breakers: "any single customer >15% of ARR; the compliance moat
  proving cosmetic (closable in one release cycle); in-segment ARR
  turning out under half of teaser ARR."
Each breaker maps to a risk screen or module hypothesis; the red team's
mandatory attack list picks all three up.

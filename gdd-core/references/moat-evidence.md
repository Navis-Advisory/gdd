# Moat evidence methods

Method reference for the company module (executed by `gdd-analyst` with
`gdd-researcher` delegation). Moat claims are the most assertion-prone
artifact in CDD — "sticky", "defensible", "hard to replicate" — because
the null hypothesis is unfalsifiable as usually stated. This module's
discipline: **every moat claim names its mechanism, and every mechanism
has a test it must survive at build time** — before the red team asks,
not after. Commercial lens only: pricing power and revenue quality are
in scope; capital structure, QoE, and legal DD are not.

## Common rules

- A moat claim without a named mechanism from the taxonomy below is not
  a finding; it's a hope. Rewrite or drop.
- Every mechanism test states its killing evidence alongside its
  confirming evidence — symmetric with hypothesis-tree leaves.
- Evidence about the target from the target (decks, blogs, the CIM)
  is tier 4 with the incentive noted; the mechanism tests below are
  designed to run on third-party-observable evidence wherever possible.
- Access-level honesty as in customer-evidence.md: cohort-grade rungs
  (win/loss internals, retention by cohort) are marked UNREACHABLE
  outside-in and seed the data request.

## Moat taxonomy and mechanism tests

| Mechanism | Confirming evidence (test) | Killing evidence |
|---|---|---|
| Switching costs | **observed** switching friction: migration horror stories in reviews/forums, paid-migration line items, multi-year contracts renewing at flat-or-up price | frequent observed switching in testimony; competitors advertising turnkey migration FROM the target (they only build that against real demand) |
| Network effects | value metric that rises with the network's size, cross-side pull evidenced (e.g. counterparties join because customers are there) | flat per-user value; "network" is actually a customer list |
| Scale economies | unit-cost or coverage advantage a sub-scale entrant measurably can't match (density of routes, data coverage, support hours) | competitors at a fraction of the scale matching price and SLA |
| Brand / category ownership | sustained price premium vs functional comparables; unprompted first-mention in practitioner forums | premium explained by lock-in, not preference; brand absent from buyer language in KPC evidence |
| Regulatory / licensing | the license or certification is required, scarce, and **actually enforced** (enforcement actions on record) — **against the vendor**: ask enforced-against-whom first; if the license attaches to the customer (usual for B2B compliance software), the claim belongs in the data/workflow-depth row, not here | requirement on paper, enforcement absent; competitors operating fine without it; no vendor-side license exists at all |
| IP | patents that map to the revenue-carrying feature (claims read against the product, not just counted); litigation record of defending them | patent thicket orthogonal to what customers buy; feature shipped by others un-sued |
| Data / workflow depth | the workflow is the system of record and export is lossy (test: what leaves in a CSV?); proprietary data no competitor can assemble | full-fidelity export exists; the "proprietary" data is licensable or public |

## The one-release-cycle test (build-time obligation)

Every product-feature moat answers, in FINDINGS.md, the question: *what
stops a funded incumbent from shipping this in one release cycle?* The
answer must cite evidence — release-velocity comparison, the
incumbent's public roadmap/changelog, an architectural reason with a
third-party basis — or the claim's confidence caps at L. "They haven't
yet" is not an answer; check whether they already announced it
(the red-team library's horizontal-dismissal attack, run on yourself
first). When the target itself is unreachable and a peer proxies the
test, the proxy must match the target's ownership and depth class —
a depth test passed by the segment's deepest player proves nothing
about an independent mid-depth target; name the mismatch if no true
comparable exists.

## Strategy consistency (stated vs revealed)

The playbook question "is strategy aligned with market trends"
operationalized: compare **stated** strategy (deck, CIM, interviews)
against **revealed** allocation — job postings by function over time,
release notes by product area, pricing-page changes, M&A record.
Divergence is a finding either way: stated-but-not-resourced means the
plan is decorative; resourced-but-not-stated means the real strategy is
elsewhere. Worked sketch (illustrative "Project Marlin", placeholder
ids): `stated: "win enterprise chains" [CIM, Sx2 tier 4] vs revealed:
9 of 11 open roles are SMB inside sales [Sx5 postings, 6-mo window]` →
finding: enterprise motion unresourced, confidence M.

## Product portfolio and comparison grid

Feature/price grid vs the competition module's set (consume its
FINDINGS by id; don't rebuild the set): rows are **customer-evidenced
KPCs** from the customers module — not the union of everyone's feature
lists (vendor taxonomies flatter whoever wrote them). Cells cite public
artifacts: docs, changelogs, review complaints ("missing X"), teardown
where physical. Grid discipline: a cell filled from the vendor's own
comparison page is tier 4 and marked; empty cells stay empty ("not
determinable outside-in") rather than defaulting to the target's favor.

## Pricing power

Ladder: realized-price history (data room) → list-price history
(archived pricing pages, dated; if archives are unreachable, dated
current pricing plus in-page change signals and repricing testimony,
confidence capped one level, vintage limitation recorded) + discount
testimony → renewal repricing stories in reviews (both directions: successful raises =
power; "repriced me so I left" = monetizing inertia, which is
switching-cost erosion, not brand). Distinguish the mechanisms: a
premium that survives a competitor's discounting is power; a premium
that survives because migration hurts is a switching-cost annuity with
a decay date.

## Go-to-market engine

Channel map (direct / partner / PLG mix) from job titles, partner
directories, and buyer-side testimony on how they bought. Efficiency
proxies, outside-in: sales-headcount share of total (LinkedIn), review
velocity per sales-FTE vs competitors (crude, label ESTIMATE), digital
footprint trajectory. The question is not "is GTM good" but "does the
GTM shape match the thesis's growth arithmetic" — a land-grab thesis on
a high-touch motion with flat sales hiring is a contradiction to
report.

## Innovation capacity

Release velocity from changelogs/release notes (same window for target
and comparators), engineering-hiring trajectory, patent flow **mapped
to revenue features** (see taxonomy row). Cheap and decisive relative
to its cost; a "product-led" thesis with a stale changelog dies here.

## Organization signal

Glassdoor and equivalent, with the customer-evidence review-mining
discipline transplanted (dedup, window, volume, disgruntled-skew:
direction-only, never magnitude). Leadership churn from announcements
and LinkedIn tenure patterns. Comparable-integration test for roll-up
theses: has this team done one before (deal record, named operators)?
"Strong management" without that rewrite stays out of the ledger.

## Failure modes

- Moat asserted at the company level when the mechanism only covers one
  product line or segment (D3: scope the claim to the lock).
- Circular moats: "high retention proves switching costs" + "switching
  costs explain retention" — retention evidence belongs to the
  customers module; cite its finding id, don't re-derive it here.
- Grid rows chosen after seeing where the target wins (KPC provenance
  is the fix — rows precede cells).
- Enforcement-free regulatory moats; un-litigated patent counts;
  "proprietary data" that is a scrape.

## Promotion rules

- One mechanism per finding; the claim names mechanism + test outcome +
  the one-release-cycle answer where applicable.
- Findings that consume customers-module or competition-module numbers
  cite those finding ids (D5 will diff them).
- Confidence: H requires third-party-observable confirming evidence AND
  a survived kill-test; target-sourced evidence alone caps at M.

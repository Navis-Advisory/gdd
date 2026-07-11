# Risk screens

Method reference for the risks module. Design: **screen first, escalate
on trip.** Full supplier or regulatory workstreams are a day-plus each
and out of scope on most CDDs — but skipping them silently is how the
one deal-killer nobody looked at survives to the readout. So the risks
module runs cheap screens with explicit trip conditions; a tripped
screen escalates to a bounded deep dive, an untripped screen records
**evidence of the search** (what was checked, where), never a bare
"no issues found".

Interplay with the red team: when no screen trips and no separate risks
analysis runs, the risks module may execute as the red-team sweep (the
sanctioned exception in the red-team workflow). When screens run as
analysis, the risks module writes a real FINDINGS.md and the red team
attacks it like any other module — including attacking the screens
("passed because nobody looked" — the evidence-of-search requirement is
the defense).

## Screen table

Each screen: the cheap test (≤ a few researcher searches), the trip
condition, and the deep dive it escalates to. Trip conditions are
falsifiable on the cheap test's output — a screen whose trip condition
can't be evaluated from its own test is misdesigned; fix the test.

| Screen | Cheap test | Trips when | Deep dive (if tripped) |
|---|---|---|---|
| Customer concentration | top-10 share from the customers module (cite its F-id; don't re-derive) | top customer >10% of revenue, or top-10 >40%, or any customer is also a competitor/platform | contract terms and renewal dates for the concentrated logos (data room), dependency direction, pricing history on those accounts |
| Supplier / input concentration | name the target's critical inputs (COGS drivers, key components, data feeds, carrier/channel dependencies) from filings, teardowns, job postings; count credible alternates per input | any sole-source input; any input with ≤2 credible suppliers; any input crossing one geographic chokepoint | supplier segmentation, contract exposure (term, exclusivity, price-escalation), negotiation-power read (who needs whom more), observed disruption history, import-records check on the chokepoint |
| Platform dependency | where do customers, traffic, or distribution actually come from (app stores, marketplaces, one cloud, one channel partner)? | >30% of demand or delivery through one platform whose terms the target doesn't set | platform's policy trajectory and take-rate history, precedent enforcement against similar vendors, de-platforming stories in the segment |
| Regulatory / licensing | what licenses/certifications does operating require (per jurisdiction in the lock); any pending rule changes, enforcement actions, or IP disputes naming the target or segment | operation depends on a license under review; a pending rule changes the segment's economics; active litigation/IP dispute touches the revenue-carrying product | regulatory-trajectory read (proposed rules, comment dockets, enforcement climate), compliance-cost delta, incentive/subsidy exposure BOTH directions — a subsidy the thesis silently assumes is a risk finding too |
| Key person | founder/rainmaker dependence: who is named in the customer relationships, the patents, the community presence? | revenue or product materially attached to ≤2 individuals; no comparable-role bench visible in hiring history | retention terms in scope for the deal team (flag, don't analyze — legal DD's lane), succession evidence, what churned when comparable firms lost the comparable person |
| Market-structure risks (intake) | the market module's risk register: saturation, substitution, technology shift, demand-driver decay | the market FINDINGS name a structural risk rated better-than-remote | the named risk becomes a hypothesis leaf: evidence for arrival timing and magnitude, per the market module's methods |

## Deep-dive rules

- A deep dive is bounded: it answers the trip, not the whole playbook
  chapter. Scope it as hypotheses ("sole-source input X can be
  resourced within a year at <15% cost penalty — confirms/kills"), same
  falsifiability bar as tree leaves.
- Deep-dive findings promote to LEDGER.md (module=risks) with normal
  confidence rules; the screen row cites them.
- A trip the engagement cannot chase (no access, no time) is recorded
  as an open question with the trip evidence attached — surfacing an
  unchased trip is a deliverable; burying it is a defect the red team
  is instructed to find.

## Evidence-of-search standard

An untripped screen records: what was searched (sources, terms,
window), what would have tripped it, and the nearest miss found. One
line per screen minimum. "No regulatory issues found" with no search
trail fails D4 (the claim has no evidence) — the search trail IS the
evidence for a negative finding, same logic as the red-team library's
negative-existence pattern.

## Seeding

The screens are seeded from, in order:
1. **Deal breakers** named in ENGAGEMENT.md (the scoping interview's
   deal-objective answers) — each maps to at least one screen or gets
   its own ad-hoc screen row; a deal breaker with no screen is a
   scoping defect to report.
2. Risk leaves in TREE.md (module=risks).
3. The standing six screens above — run on every engagement regardless,
   because the embarrassing misses are the ones nobody hypothesized.

## Promotion rules

- One screen verdict per finding: `screen · tripped/clear · basis`,
  with the search trail or deep-dive F-ids as evidence.
- Tripped-and-unchased items promote at confidence L with the open
  question cross-referenced.
- The storyline's risks section consumes this module's findings plus
  the red team's unresolvable disputes — between them, every deal
  breaker from ENGAGEMENT.md gets an explicit answer (D6's GATE-OWNED
  discipline applies).

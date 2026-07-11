# Customer evidence methods

Method reference for the customers module (executed by `gdd-analyst`
with `gdd-researcher` delegation). Customer claims are where diligence
most often ships unfalsifiable mush — "customers love the product",
"churn is low", "sticky workflows" — so this module's discipline is the
evidence ladder: every claim type has a best-to-worst ladder, the rung
you reached is recorded, and confidence is capped by the rung, not by
how confident the prose sounds.

## Common rules

- **Unit of testimony.** Every piece of customer evidence records: who
  (segment per the lock, size band), channel (review platform, call,
  forum, case study), and **selection mechanism** — who chose that this
  voice be heard (self-selected reviewer, vendor-curated case study,
  interviewer-recruited). Selection is the field the red team attacks
  first; leaving it blank concedes the attack.
- **Direction vs magnitude.** Tier-6 testimony (reviews, forums) may
  carry direction-only claims with the channel bias flagged ("review
  testimony runs 3:1 toward X") — never magnitude (D4
  tally-of-testimony rule governs). Magnitude needs a rung higher on
  the ladder.
- **Segment per the lock.** "Customers" means the locked segment's
  buyers. Testimony from adjacent-segment users is recorded but flagged
  OUT-OF-SEGMENT and never load-bearing (D3/D4 catch this).
- **Access-level honesty.** The top rungs of most ladders (cohort data,
  system-of-record metrics) need target cooperation. On an outside-in
  engagement those rungs are marked UNREACHABLE in findings — the gap
  itself is reported, and it seeds the post-LOI data request. Never
  simulate a high rung from low-rung material.
- ESTIMATE labeling and units per the taxonomy lock, as everywhere.

## Evidence ladders

The rung reached caps the finding's confidence (H needs the top two
rungs or multiple independent mid-rungs; the module cannot promote H
retention/churn findings on an outside-in engagement).

| Claim type | Best → worst | Notes |
|---|---|---|
| Retention / churn | cohort or renewal data (data room) → vendor-disclosed NRR/GRR with definition stated → named-customer renewal testimony → review sentiment (direction only) | "churn" per defined_terms (gross logo vs net revenue) — an undefined churn basis is an OPEN taxonomy field, stop and report |
| Satisfaction | NPS/CSAT with base size + method disclosed → review-platform aggregate with volume, recency, and dedup shown → individual anecdotes (color only) | an NPS-style number with no base is prohibited at build time, not just attackable later |
| Key purchasing criteria | win/loss and switching testimony → structured review mining ("switched from/to X because…") → practitioner forums → vendor marketing (what they THINK buyers want — tier 4, incentive noted) | see KPC section — this ladder's output steers the competition module |
| Willingness to pay | realized prices (procurement records, disclosed ARPU) → price-mention testimony ("worth it at $X", "dropped it at renewal repricing") → list-price acceptance inferred from tenure | never from the target's own price-increase deck alone |
| Buying cycle / decision unit | procurement and tender records with dates → sales-cycle testimony from both sides → job titles in case studies and review bylines (who evaluates, who signs) | cycle length and DMU size are workplan inputs for any expert-call program |
| Concentration / mix | revenue-by-customer schedule (data room) → disclosed named-customer dependencies (filings, case-study weight) → logo-count distribution by size band (ESTIMATE) | top-10 share feeds the risk screens (references/risk-screens.md) |

## KPC elicitation

Key purchasing criteria are this module's headline output because the
competition module consumes them: **positioning axes must come from
customer-evidenced KPCs, not the analyst's imagination** (declare the
dependency in both briefs; an axes-before-KPCs run gets flagged in
STATE.md).

Method: gather switching stories (review mining for "switched from",
"replaced", "moved off"; win/loss testimony where calls exist), extract
the stated reason, normalize to criteria, rank by frequency **within
the locked segment**, and record the counter-evidence (criteria named
in churn stories rank too — a KPC that appears on both sides is a
battleground, not a strength). Output: ranked KPC table, each row with
source ids, segment, and direction (win-driver / loss-driver / both).

Failure modes: criteria harvested from vendor comparison pages
(marketing's guess, tier 4); ranking dominated by one loud platform
(dedup and name the platform mix); criteria phrased so the target wins
by construction ("vertical-specific compliance" as a criterion when no
buyer said those words — quote the buyer language).

## Review-mining discipline

Review platforms are the outside-in workhorse and the easiest place to
poison a module. Mandatory hygiene, every time:

- Record platform mix, volume per platform, date window, and dedup
  basis (same author cross-posting; vendor-seeded review bursts —
  check date clustering around funding/launch events).
- Incentivized-review programs flagged when the platform discloses
  them ("gift card for review" era skews positive AND recent).
- Survivorship: churned customers stop reviewing; platforms
  over-sample current, engaged users. Direction-only, always.
- Competitor reviews get identical treatment or the comparison is
  garbage — same platforms, same window, same dedup.

Worked sketch (illustrative "Project Marlin", US car-wash software —
deliberately not your deal; placeholder ids): `G2+Capterra, 2024-26
window, n=214 after dedup [Sx8]: reliability named in 41% of negative
reviews vs 12% for the category median [Sx8, Sx9 — ESTIMATE, review
tally, direction-only per D4]` → finding: "review testimony runs
against the reliability claim," confidence M, magnitude not claimed.

## Outside-in toolkit

Beyond review mining (recipes with tiers and failure modes live in
references/research-recipes.md — consult it first):

- **Mystery shop** the target and one competitor: request a demo/quote
  as a segment-typical buyer; record responsiveness, pricing posture,
  qualification questions (what they ask reveals who they think buys).
- **Customer-service probe**: one support request, response time and
  quality logged — a single data point, color only, but cheap.
- **Practitioner forums / communities** where the segment's operators
  talk shop: unprompted tool mentions are less selected than reviews.
- **Case-study forensics**: the target's own case studies date-stamped
  and counted — logos that quietly disappear between deck vintages are
  churn evidence (tier 4, incentive noted, but the *absence* is the
  signal).
- **Job-posting language** on the buyer side: segment operators hiring
  for roles that name a tool have deployed it — deployment evidence,
  not satisfaction evidence.

## B2C branch

When the taxonomy locks a consumer segment: cohort logic still governs
(repeat-purchase rate replaces NRR), review scale changes the math
(thousands of reviews support tighter direction calls — but the same
dedup/incentive discipline), marketing efficiency proxies (visible ad
intensity vs review growth) replace sales-cycle work, and return/refund
chatter is the churn analog. Panel data, where the engagement has
tier-3 access, outranks all of it.

## Promotion rules

- Findings promote to LEDGER.md with the ladder rung stated in the
  claim's basis; confidence per the rung caps above.
- Retention, satisfaction, and KPC headliners each promote separately
  (one claim per finding).
- UNREACHABLE-rung gaps promote as open questions in STATE.md and
  seed the data request — an honest "cannot know outside-in" is a
  deliverable, not a failure.

# Research recipes

Recipe book for `gdd-researcher` (and any agent doing its own light
desk research). Indexed by **question shape, not source** — consult
before searching: the expensive failure in desk research is not bad
sources but the reflex of answering every question with generic web
search when a sharper instrument exists. Tiers per the locked
hierarchy; a recipe's tier is where its evidence usually lands, the
lock wins. Recipes are leads and instruments — registration, locators,
and reliability notes in SOURCES.md apply as everywhere.

## Company shape, strategy, organization

| Question | Recipe | Tier | Watch out |
|---|---|---|---|
| Headcount, mix, trajectory | LinkedIn employee list by function; snapshot counts over time where discoverable | 4 | profiles lag reality; contractors invisible |
| What they're really investing in | job postings over a dated window: functions, seniority, locations, tech named | 4 | posting ≠ hire; evergreen reqs inflate |
| Org health, attrition signal | Glassdoor/kununu patterns over time — trend and theme, with review-mining discipline (dedup, window, skew) | 6 | disgruntled-skew: direction only, never magnitude |
| Revenue clues in private cos | job descriptions ("manage $XM book"), award submissions, local-press milestones, filed accounts where the jurisdiction publishes | 2–5 | vintage; puffery in awards |
| Leadership quality/churn | announcement archaeology + LinkedIn tenure patterns; litigation/press record | 4–5 | absence of news ≠ stability |

## Pricing and unit economics

| Question | Recipe | Tier | Watch out |
|---|---|---|---|
| List price, packaging | pricing pages NOW + archived versions (Wayback), dated; changelog of tiers | 4 | list ≠ realized; regional variants |
| Realized price | ARPU from filings (divide disclosed revenue by disclosed customers — show the arithmetic); public-procurement award amounts | 1–2 | segment mix inside the average |
| Discount behavior | mystery shop: request a quote as a segment-typical buyer; renewal-repricing stories in reviews | 4–6 | one quote is one data point; label ESTIMATE |
| Price sensitivity | tender records where losing bids are published; "dropped it at $X" review testimony (direction only) | 2–6 | survivorship of the vocal |

## Customers and sentiment

Full method discipline in references/customer-evidence.md; the recipes:

| Question | Recipe | Tier | Watch out |
|---|---|---|---|
| Satisfaction, complaints | review platforms (G2/Capterra/Trustpilot/app stores) with dedup, window, volume, platform mix recorded | 6 | tally rule: direction only |
| Who actually buys | case-study forensics (titles, company sizes, dates); review bylines; buyer-side job postings naming the tool | 4 | vendor-curated selection |
| Churn signal outside-in | case-study logo diffing between deck vintages; "migrated off" forum threads; competitor migration-tooling existence | 4–6 | absence-of-logo has innocent explanations — corroborate |
| Support quality | customer-service probe (one ticket, response logged); support-forum response latency visible in public threads | 4–6 | single data point; color only |
| Real buyer language (KPCs) | switching stories mined from reviews/forums verbatim; win/loss testimony where calls exist | 3–6 | quote the buyer's words, don't paraphrase into your axes |

## Competitors and market structure

| Question | Recipe | Tier | Watch out |
|---|---|---|---|
| Who competes (the set) | review-platform category + **buyer impersonation** (search as a procurement manager would: "best X for Y", directories that surface) + industry-directory listings | 4–6 | listicle survivorship — cross-check via customer testimony |
| Who competed historically | archived conference exhibitor lists (2–5 years back) — exits, renames, and acquisitions surface here | 5 | booth ≠ traction |
| Where innovation is heading | patent/trademark filings by segment players read against products; new-entrant filings | 1 | patent count ≠ product; read claims |
| Relative momentum | review-velocity and job-posting trajectories, same window all players | 4–6 | crude proxy — label ESTIMATE, calibrate on a player with known revenue |

## Physical and operational

| Question | Recipe | Tier | Watch out |
|---|---|---|---|
| Footprint, capacity | Google Maps satellite/street view of named facilities; building permits; local business registries | 2–4 | imagery vintage — record capture date |
| Product build quality, COGS clues | product teardown (buy it, open it, identify components/suppliers); for software: trial-account teardown (stack fingerprinting, export fidelity) | 4 | one unit/one tenant; version drift — record version/date |
| Channel presence | store checks / product-locator tools / marketplace listings vs claimed distribution | 4 | regional sampling bias |

## Demand, flows, government

| Question | Recipe | Tier | Watch out |
|---|---|---|---|
| Universe counts | business census codes, license registries, association memberships (with coverage rate), review-platform listing counts (dedup basis stated) | 2–4 | multi-state double counting; NAICS/SIC boundary vs the lock |
| Trade flows, supply chokepoints | import/export records (bill-of-lading databases) by shipper/consignee | 2 | HS-code mapping to the lock's segment |
| Government demand | contract-award databases (SAM/TED/provincial portals): awards by vendor, values, dates | 2 | award ≠ recognized revenue timing |
| Filing/regulation text when the official host is blocked | company investor-relations mirrors serve filings verbatim (tier stays 1); gov mirror hosts (e.g. govinfo) for regulation text | 1–2 | verify the mirror is verbatim/complete; record both locators |
| Local color, formation rates | chamber-of-commerce and economic-development data; trade-association stats | 4–5 | boosterism in the denominator |

## Rules of use

- **Two instruments per load-bearing number.** A count or price that
  will carry a ledger finding gets a second, different-shaped recipe
  before it's trusted (the sizing-methods triangulate-two-counts rule,
  generalized).
- **Interested-party cap.** Anything authored by a player with a stake
  (vendor content, sponsored studies, the CIM) is tier 4 regardless of
  polish; the CIM's assumptions are objects to test, not sources to
  cite (register at intake, tier 4, incentive noted).
- **Recipes compose.** "Is the enterprise motion real?" = job postings
  (functions) + case-study forensics (titles) + procurement records
  (deal sizes) — three cheap instruments beat one expensive report.
- **Record the instrument.** SOURCES.md reliability notes name the
  recipe used (e.g. "review-velocity proxy, calibrated on X") so the
  verifier and red team can attack the method, not just the number.
- A recipe that comes back empty is reported as searched-and-not-found
  with the trail — negative space is evidence (see risk-screens.md
  evidence-of-search standard).

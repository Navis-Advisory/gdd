# Source hierarchy (default tiers)

The default source-tier ladder, locked per engagement in TAXONOMY.md
(engagements may reorder or refine; the lock wins). Higher tier = more
load-bearing weight a claim may rest on.

| Tier | Class | Examples | Notes |
|---|---|---|---|
| 1 | Regulatory / statutory filings | 10-K/10-Q, S-1, annual reports, court records, patent filings | Audited or sworn; still check the period and segment definitions |
| 2 | Official statistics & regulators | Census, BLS/Eurostat, central banks (ECB, Fed, Riksbank — tier 2 even for FX reference rates, not tier 1), sector regulators | Definitional mismatch with the deal taxonomy is the main hazard |
| 3 | Paid primary data | PitchBook, Capital IQ, Gartner/IDC sizing, expert-call transcripts | Record the vintage and methodology note, not just the number |
| 4 | Company self-disclosure (unaudited) | Pricing pages, press releases, investor decks, job postings | Directionally useful; incentives noted |
| 5 | Reputable press & sell-side | FT/WSJ/trade press, broker notes | Secondary; trace to their underlying source when load-bearing |
| 6 | Blogs, forums, generic web | Substack, Reddit, SEO content | Color and leads only; never sole support for a ledger finding |

Rules of use:
- Record the tier on every SOURCES.md entry at registration time.
- ONE tier per SOURCES.md row. A bundled source (a report plus its
  press coverage, a filing plus a database mirror) gets one row per
  underlying source, each at its own tier — split tiers ("4/5") are
  illegal; they make the tier-cap rule unenforceable.
- A claim's weight caps at its best source's tier; D4 enforces adequacy.
- Down-tier evidence can corroborate but not carry a key-line claim.
- Paid-data access varies by user; absence of tier-3 access is recorded in
  ENGAGEMENT.md constraints, not silently worked around.

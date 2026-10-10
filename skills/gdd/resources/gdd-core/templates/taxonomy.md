---
template: taxonomy
template_version: 2
---

# Deal taxonomy — {DEAL_NAME}

<!-- Human projection of state.json.taxonomy_lock — NOT the source of
truth (agents read the machine lock first). Append-only: changes arrive
as supersession entries written by gdd-librarian after user sign-off,
never edits in place.

Why this file exists: every diligence blow-up traceable to process is a
definition drift — "the market" quietly changing size mid-engagement
because two analyses used two segment boundaries. Locking definitions
BEFORE analysis is what keeps every later number comparable. -->

## Lock status

<!-- taxonomy_version: N · date · list locked fields and OPEN fields.
An OPEN field says what would settle it and blocks any analysis that
needs it (the sizers refuse OPEN segments). -->

## Market & segment definitions

<!-- Each segment: name, definition tight enough to classify boundary
cases, the boundary cases actually decided, and a test value — a
concrete classification the verifier can re-run mechanically. -->

## Geography

<!-- Which countries/regions are in the market definition; how
"NA revenue" style claims are tested. -->

## Currency, units, FX

<!-- Reporting currency; FX rates WITH date and source for each pair
that will occur; magnitude units ($M vs $B); rounding rule (e.g. 3
significant figures in the ledger, storyline may round further but D5
tolerates rounding only). -->

## Time basis

<!-- CY or FY (whose FY?), base year, forecast horizon. Every growth
rate states its period; "grows 12%" with no basis fails D1. -->

## Source hierarchy

<!-- The tier ladder for this engagement. Default: adopt
references/source-hierarchy.md tiers 1–6 unchanged; record overrides
here (e.g. "expert-call transcripts promoted to tier 2 for
churn/renewal claims — direct operator testimony"). Also record which
tier-3 paid sources the user actually has access to. -->

## Defined terms

<!-- Deal-specific glossary used consistently in every artifact: ARR vs
revenue, "operator", "location" vs "truck" as the unit of account,
"churn" (gross logo vs net revenue). If two artifacts could plausibly
mean different things by a word, define it here. -->

## Supersessions

<!-- Dated, appended by gdd-librarian only. Format:
YYYY-MM-DD · field · old → new · reason · affected finding ids ·
taxonomy_version bump. The affected-findings list is mandatory — a
definition change without a re-check list is how drift sneaks back. -->

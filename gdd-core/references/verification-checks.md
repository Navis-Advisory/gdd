# GDD verification check registry

The canonical checks run by `gdd-verifier` at the `/gdd:triangulate` gate.
Stable IDs — commands, reports, and remediation notes reference checks by
ID. Extend by appending; never renumber.

**The claim these checks support, verbatim in every report:** "These
checks establish internal consistency and traceability of the work
product. They do not establish that the estimates are true."

## D1 — Units, currency, and time-basis consistency

Every number in LEDGER.md and module findings carries units, currency, and
period, and they match the taxonomy lock (or show an explicit conversion
with the original figure retained). Catches the classic diligence defects:
FY mixed with CY, EUR anchor filtered by USD ratios, monthly price ×
annual count.

Run: walk every quantitative finding; recompute one conversion per
currency pair in an executed code block.
FAIL if: any bare number, any unexplained conversion, any basis mismatch.

## D2 — Top-down / bottom-up reconciliation

The two independent sizing legs exist, were built without contamination
(check: no shared non-anchor sources doing load-bearing work, no
references to each other), and land within the engagement tolerance
(default ±30%; taxonomy lock may override). The reconciled figure and the
residual-gap driver are recorded.

Run: recompute both legs' arithmetic in an executed code block; compute
the gap.
FAIL if: a leg is missing, contamination is evident, the gap exceeds
tolerance without a recorded divergent-assumption diagnosis, or the
"reconciliation" is an average of irreconciled legs.
Explicitly a PASS: an irreconciled-per-protocol outcome — gap beyond
tolerance after the one permitted re-run, diagnosis recorded, no
averaging, promoted to the ledger at confidence L with a point-free
span. D2 verifies the process, not that the legs agreed.

## D3 — MECE audit

Segment trees (market segmentation, hypothesis tree, competitive set
partitions) are mutually exclusive and collectively exhaustive against
TAXONOMY.md definitions.

Run: walk each tree level; test boundary cases named in the taxonomy
(where does X fall?); check leaf sums against parent totals where sums
are claimed.
FAIL if: overlap, gap, or a leaf-sum mismatch beyond rounding.

## D4 — Citation coverage and source-tier adequacy

Every ledger finding traces to SOURCES.md entries that resolve; the tier
of the supporting source matches the weight of the claim (a key-line-load-
bearing number cannot rest solely on a blog-tier source without an
explicit flag).

Run: trace every finding id → source ids → registry entries; sample-check
that cited sources actually say what the finding claims (spot-check 3
findings or 20% of the ledger, whichever is larger; key-line
load-bearing findings always in the sample).
FAIL if: dangling citation, unregistered source, tier inadequate to claim
weight without flag, or a spot-check misquote.
Tier-adequacy precedence: the source hierarchy's categorical rule
governs — tier-6 sources may never be the sole support of a ledger
finding, flag or no flag — EXCEPT the tally-of-testimony class, where
tier-6 material is the *object* of the claim rather than its authority
(e.g. "review testimony runs 3:1 in direction X"): there a
direction-only claim with the channel bias flagged passes; any
magnitude claim on the same evidence fails.
The same object-of-claim logic covers platform-reported metadata
(review counts, listing tallies): usable as corpus description or
methodology basis, never as the sole support of a market magnitude.
Citation-record findings (rows whose evidence is other findings, e.g.
a breaker disposition) trace THROUGH the cited finding ids to their
sources — D4 follows the chain and applies tier adequacy at its end.

## D5 — Cross-artifact consistency

The same quantity has the same value everywhere it appears (ledger, module
findings, storyline, workplan assumptions). Rounding is allowed;
divergence is not.

Run: grep headline numbers across `.diligence/`; diff occurrences.
FAIL if: two artifacts state materially different values for one quantity
without a supersession note.

## D6 — Thesis sensitivity

The top assumptions (default: 5, by influence on the governing thought)
have been identified and flexed; the storyline records which conclusions
flip within plausible ranges.

Run: verify the sensitivity table exists, recompute one flex in an
executed code block, check flip points are reflected in risk language.
D6 also owns any GATE-OWNED conditions recorded in TREE.md (e.g. the
thesis-sufficiency check): verify the storyline answers them
explicitly.
FAIL if: no sensitivity analysis, an assumption's plausible range flips a
key-line claim without the storyline saying so.
First-sweep rule: on a sweep run before the storyline exists, D6 is
N-A ("no storyline yet"), recorded with a mandatory post-storyline
re-run — the pipeline order (triangulate gates storyline; the storyline
holds the sensitivity table) makes a first-sweep FAIL a deadlock, which
is never the intended reading.
Staleness is not absence: a storyline that predates a scope extension
or a superseded tree makes D6 FAIL (remediation: rebuild), and the
sanctioned unblock is a recorded user waiver scoped to the rebuild —
verifier reclassification to N-A is not.

## D7 — Plausibility and base rates

Order-of-magnitude sanity: implied per-capita/per-firm spend, implied
growth vs. historical base rates, implied share vs. named competitors'
reported revenues. The cheap check that catches the embarrassing errors.

Run: compute 2–3 implied ratios in an executed code block; compare to
cited reference points.
FAIL if: an implied ratio is absurd (>3× a cited comparable) with no
acknowledgment in the findings.

## D8 — Red-team disposition

Every CONTESTED finding from `.diligence/reports/REDTEAM.md` has a disposition:
revived with new evidence, conceded and retired, or standing dispute
declared in the storyline's risk section. No key-line claim rests on a
CONTESTED finding.

Run: diff the red-team kill list against ledger statuses and the
storyline trace map.
FAIL if: a kill has no disposition, or a CONTESTED id appears in the
key-line trace.
Kills that postdate the current storyline cannot appear in its trace
by construction — that clean trace is fragile, not safe: PASS only
with the mandatory declaration recorded for the next storyline build.

## Report rules

- Each check: PASS / FAIL / N-A (with the reason it could not run).
- At least one executed code block with real output per report — the
  external-oracle rule; asserted arithmetic is not verification.
- One FAIL fails the gate. Waivers are the user's, quoted verbatim.
- When the ledger has grown materially since the last full sweep
  (guideline: >50% new rows), D1 and D4 walk every NEW row fully and
  spot-check the carried rows; a carry-forward without that walk is
  not a PASS.

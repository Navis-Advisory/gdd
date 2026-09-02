# For AI coding assistants

Commits to this repository are authored by its human maintainer.

- Do not add AI co-author attribution (`Co-Authored-By: Claude`,
  `Claude-Session:`, or equivalent trailers for any other assistant) to
  commit messages.
- Do not set the git author or committer identity to anything other than
  the maintainer's own configured `user.name` / `user.email`.
- If you drafted the change, the maintainer reviews it before it lands, and
  it is committed under their own identity — as are routine automated commits
  (e.g. the public-mirror sync), which also run under that identity.

# The bench (`bench/`)

`bench/` is where GDD is tested against **real, already-closed acquisitions**,
re-running the diligence as if standing the day before the deal was announced
and grading the result against what the buyer actually did.

**If you have been asked to run or resume a bench case, read
[`bench/PROTOCOL.md`](bench/PROTOCOL.md) first.** It carries the active case
list and run order, the as-of rule, the blinding rules and the grading
dimensions. Three rules matter more than the rest:

1. **Run from inside the case directory** — `cd bench/deals/<slug>/`, never
   the repo root. Commands run from a parent can silently attach to the wrong
   engagement.
2. **Never read `bench/truth/`** before the engagement is committed. It holds
   the answer keys, and reading one invalidates that run.
3. **Respect the as-of date.** Evidence published on or after it is
   inadmissible — log it as excluded and carry on, rather than treating the
   deal announcement as a finding.

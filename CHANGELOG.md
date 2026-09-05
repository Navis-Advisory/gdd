# Changelog

Notable changes to GDD, loosely following [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Version corresponds to `"version"` in `.claude-plugin/plugin.json`.

## [Unreleased]

## [0.2.2] - 2026-08-20

### Fixed

- **Concurrent module dispatch could silently lose ledger rows
  (GDD-BUG-22).** The workplan heuristics describe modules running "in
  parallel", meaning the work overlaps in the calendar — but this was read
  as authorisation to dispatch two module commands concurrently.
  `LEDGER.md` and `SOURCES.md` are shared append-only tables with no
  locking, no ownership window and no per-module staging, so concurrent
  appends interleave rows and collide on ids while leaving the file
  syntactically valid. The loss is silent: it surfaces only as a finding-id
  gap someone happens to notice, and the ledger is the spine that
  triangulation, the red team and the storyline all read. The planner
  heuristics now state the distinction, and every module's completion gate
  repeats it at the point of the write — research may overlap, ledger
  promotion is serial.

- **Missing delegation degraded research invisibly (GDD-BUG-23).** When no
  subagent tool is exposed to a module agent, the fresh-context research
  split collapses to a single inline pass at materially lower recall — and
  nothing fails, because every postcondition still closes on a well-formed
  ledger. The four delegating workflows now require a capability check
  before research begins; where delegation is unavailable the module must
  record it (`blocked`, or a `delegation: unavailable` note) and mark its
  recall degraded, rather than proceeding silently.

### Changed

- **Sources template v4 adds a `Published` column (GDD-BUG-25).** The
  registry previously recorded only `Accessed` — when a source was
  *retrieved*. Any cutoff or vintage rule evaluated against that date is
  meaningless, because retrieval necessarily post-dates the analysis
  window. `Published` is now required on every row, with `UNDATED` as an
  explicit and countable category: a page whose publication date cannot be
  established cannot be shown to pre-date a cutoff, so it cannot carry a
  date-sensitive claim on its own.

## [0.2.1] - 2026-07-22

### Fixed

- **Vestigial `name:` command frontmatter:** removed the `name:` key from
  all 17 `commands/*.md` templates. Nothing downstream read it — the Claude
  Code (nested) layout copies command files through verbatim, so the field
  only landed in the installed copy and tripped Claude Code's autocomplete;
  the skills layout (Codex/Antigravity) already synthesizes its own
  `gdd-<name>` and ignored the source field. A pure subtraction, no logic
  change. `/gdd:update` users should re-pull. `tests/check-references.mjs`
  now fails if any shipped command reintroduces a `name:` key.

## [0.2.0] - 2026-07-20

Feature-and-fix release. It completes the five-module CDD set (three new
commands), adds the `/gdd:update` maintenance path plus a batch of installer
hardening, and folds in the WS1-WS5 fixes from the v0.1.0 autonomous
end-to-end test. Feature requests from that test are deferred (see
[`ROADMAP.md`](ROADMAP.md)). Ids like `GDD-BUG-N` and `WS-N` below are
internal test-log references, kept as a traceable paper trail.

### Changed

- Installer: `gdd --version`/`-v`; `files` whitelist narrowed so the npm
  tarball no longer ships publishing tooling; uninstall is contained to the
  config dir; install provenance recorded in the manifest; clearer messages
  on corrupt/partial installs and first-install collisions.

### Fixed

- **Engagement isolation (GDD-BUG-2, P1):** the engagement root is
  `<CWD>/.diligence` — at exactly that path or not at all. New
  `references/engagement-root.md` contract, a preamble in all 16
  workflows, an ISOLATION rule in all 10 agents, the root passed as an
  absolute path in every spawn prompt, provenance stamps
  (`engagement_root` + `written_by`) on STATE.md and the three report
  templates, and a D5 "foreign artifact" FAIL on stamp mismatch. Fleet-
  verified: all 16 commands refuse/route in an empty folder beside a
  full sibling engagement, zero sibling reads, sibling byte-identical.
- **Subagent dispatch (GDD-BUG-1, P1):** dispatch/return contracts in
  the agent specs (synchronous spawns only, postconditions verified on
  disk before returning) and completion gates in the five module
  workflows + triangulate + red-team — a command is not complete until
  its artifacts exist on disk; no "report back later" turns.
- **Machine state integrity (GDD-BUG-3/4/6/11, P2/P3):**
  hypothesis-tree registers every briefed module in
  `state.json.modules`; module workflows drive the
  pending→in-progress→done/blocked lifecycle; STATE.md's status column
  is constrained to the schema enum; gdd-scoper maps every interview
  boundary rule and test value into the machine lock; fx conversions
  must be registered in `taxonomy_lock.currency.fx`; D1/D3/D5 enforce
  all of the above.
- **Workflow logic (GDD-BUG-5/8/9/14, P2/P3):** D8 is N-A (not FAIL)
  before the first storyline, killing the built-in waiver deadlock;
  scope-deal runs a KQ feasibility check against the recorded
  constraints (unanswerable KQs are reframed or DEGRADED, never signed
  clean) with a KQ × instrument table in ENGAGEMENT.md; the storyliner
  may not mint unledgered numbers (needs-promotion round-trip through
  gdd-librarian) and must enumerate every CONTESTED row; artifacts are
  client-facing (no interview residue; amendment impact claims need a
  cited basis).
- **Hygiene (GDD-BUG-7/10/12/13/15/16, P2/P3):** the installer no
  longer silently clobbers locally modified files (sha256 manifest
  baseline, warn + skip, `--force` to overwrite) and the manifest lists
  itself; scope-deal's edit loop spec matches behavior (orchestrator
  applies section edits, scoper re-spawned for structural changes);
  codename discipline records its scope with an all-artifacts
  IDENTITY.md mode; one tier per SOURCES.md row with central banks
  pinned to tier 2; locators required (`UNVERIFIED (snippet)` for
  snippet-only access, counted by D4); rejected sources cited as
  `(audit: S#)` only; ledger table integrity; start's summary cap
  raised honestly to ≤8 sentences.

### Added

- **`/gdd:update`** — update an install to the latest published version.
  Checks the installed version against npm, shows the changelog delta,
  confirms, then reinstalls in place. Locally modified files are backed up
  to `gdd-patches/` and merged back; files a new version drops are pruned.
- Dogfood fold-backs from the kestrel-sound five-module run: D4
  platform-metadata and citation-chain clauses, D6 staleness rule
  (waiver, not reclassification), D8 stale-trace fragility note, and a
  grown-ledger re-run rule in the check registry; `unreachable`
  screen-verdict state and citation-record promotion rule in
  risk-screens; enforced-against-whom test, proxy reference-class rule,
  and archived-pricing fallback in moat-evidence; platform-pool
  independence check in customer-evidence; filing-mirror recipe in
  research-recipes; market-risk-register anchor in the module-findings
  template; citation-chain and structural-defect-propagation red-team
  patterns; parallel-researcher source-registration protocol
  (researcher + analyst specs) and the report-filename write-guardrail
  fallback note.

- Three new module commands completing CDD's five-module set:
  `/gdd:probe-customers` (customer evidence up the evidence ladders —
  retention, satisfaction, KPCs), `/gdd:assess-moat` (moat claims tested
  mechanism by mechanism, with kill-tests run at build time), and
  `/gdd:scan-risks` (the standing risk screens — trip conditions, bounded
  deep dives, evidence-of-search for the rest). All three spawn
  `gdd-analyst` with `gdd-researcher` delegation, same pattern as the
  existing modules.
- Four new method references backing the modules above:
  `customer-evidence.md` (evidence ladders, KPC elicitation,
  review-mining discipline), `moat-evidence.md` (mechanism taxonomy, the
  one-release-cycle test, the circularity rule), `risk-screens.md` (the
  six standing screens, trip conditions, the evidence-of-search
  standard), and `research-recipes.md` (question-shape → recipe → tier
  index).
- Deal-objective quad in `/gdd:scope-deal`'s Batch B interview: strategic
  intent, key concerns, value-creation levers, and deal breakers,
  captured verbatim into `ENGAGEMENT.md`; deal breakers seed
  `/gdd:scan-risks`'s screens and the red team's mandatory attack list.
- `gdd-researcher` now matches each research question to an instrument
  in `research-recipes.md` before falling back to generic search,
  recording the recipe used in `SOURCES.md`'s reliability notes.
- Red-team attack-pattern library extended with risk-screen and
  deal-breaker patterns: re-run an untripped screen's cheap test with
  hostile search terms; every deal breaker in the deal objective gets an
  explicit attack attempt.

## [0.1.3] - 2026-07-09

### Added

- CLI install support for Codex and Antigravity CLI (replaces the disabled
  `gemini` catalog stub — GDD targets Antigravity CLI as its Gemini-family
  runtime). Both runtimes previously had `"enabled": false` entries in
  `runtime-catalog.json` with no working converter.
  - Commands install as `SKILL.md` directories (`skills/gdd-<name>/`) for
    both runtimes, with each command's `<execution_context>@...</execution_context>`
    include resolved and inlined — neither runtime auto-inlines
    `${CLAUDE_PLUGIN_ROOT}` references the way Claude Code does, so a
    straight copy would have installed a dangling reference.
  - Agents install as standalone TOML (`agents/gdd-<name>.toml`,
    `developer_instructions` inline) for Codex, matching its native
    custom-agent format, and as flat markdown with Claude tool names mapped
    to the Gemini/Antigravity vocabulary (`Read`→`read_file`, etc.) for
    Antigravity.
  - `/gdd:` prefixes in prose are rewritten to each runtime's actual
    invocation syntax (`$gdd-` / `/gdd-`) so cross-references between
    commands and agents read correctly post-install.
  - `tests/smoke-install-codex.mjs` and `tests/smoke-install-antigravity.mjs`
    added, wired into `npm test`.

## [0.1.2] - 2026-07-09

### Fixed

- `AskUserQuestion` interview steps that ran inside spawned subagents
  (`gdd-scoper`, `gdd-storyliner`) never rendered as native forms to the
  user — a subagent's interactive tool calls are headless, the form
  channel belongs only to the top-level command turn. Matches the
  pattern GSD already uses: orchestrators ask, agents write.
  - `/gdd:scope-deal` now runs the four-batch interview directly in the
    command; `gdd-scoper` is spawned afterward as a headless writer with
    the collected answers (tool grant narrowed accordingly).
  - `/gdd:storyline` now spawns `gdd-storyliner` twice: once to draft the
    governing thought, which the orchestrator confirms with the user
    directly, then again to build the full storyline from the approved
    thought (tool grant narrowed accordingly).
  - `gdd-planner`'s `AskUserQuestion` grant was dead (no described use in
    either `hypothesis-tree` or `workplan`) and is removed; the branch/tree
    review in those workflows was already plain orchestrator conversation,
    not a form.

## [0.1.1] - 2026-07-08

### Fixed

- `plugin.json` now declares `commands` explicitly instead of relying on
  implicit discovery, and the five intake commands pair `argument-hint` with
  a named `arguments:` field — working theory for Cowork's fill-in-the-blank
  form rendering not applying to GDD's commands. Unconfirmed live; verify in
  Cowork.

## [0.1.0] - 2026-07-08

### Added

- Initial release: 13 commands, 10 agents, `gdd-core` (workflows, templates,
  references), installer, tests.

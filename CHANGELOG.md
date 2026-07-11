# Changelog

Notable changes to GDD, loosely following [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Version corresponds to `"version"` in `.claude-plugin/plugin.json`.

## [Unreleased]

### Added

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
  `gemini` catalog stub — Google sunset Gemini CLI on 2026-06-18 in favor of
  Antigravity). Both runtimes previously had `"enabled": false` entries in
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

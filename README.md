# GDD — Get Diligence Done

An agentic workflow system for commercial due diligence: scope the deal,
lock the taxonomy, run the modules in fresh-context agents, triangulate,
red-team, tell the story. Built on the process-encoding pattern proven by
GSD in software development: a deterministic engagement spine with
open-ended analytical leaves, persistent state in markdown + a machine
lock, and a verification gate whose honest claim is **consistency and
traceability, not truth**.

Claude Code, Codex, and Antigravity CLI are supported runtimes; opencode /
copilot are catalogued but gated. See [`docs/design.md`](docs/design.md) for the full
design, [`docs/install.md`](docs/install.md) for every install path, and
[`examples/kestrel-sound/`](examples/) for a complete engagement run.

## Install

**Get the repo.** GDD installs from a clone — there's no package to fetch
and nothing to build. Requires Node.js >= 20; the installer is a single
file with no dependencies, so there is no `npm install` step.

```bash
git clone https://github.com/Navis-Advisory/gdd.git
cd gdd
```

**CLI install (recommended).** From that clone,
`node bin/install.js --claude --global`
projects GDD into `~/.claude`, so `/gdd:` works from any deal folder — the
tool's normal per-engagement usage pattern. The same installer targets
Codex and Antigravity CLI. `npm test` verifies the install round-trip and
reference integrity. Full details in [`docs/install.md`](docs/install.md).

The clone is only the source you install *from*; once installed, GDD runs
out of `~/.claude` and you can put the clone wherever you keep tools.
Engagement state lives in a `.diligence/` folder inside each deal folder,
never in the clone — so updating GDD is `git pull` + re-run the installer.

**Claude Code plugin (secondary).** `/plugin marketplace add
Navis-Advisory/gdd` then `/plugin install gdd@gdd` works, but registers at
local scope pinned to the project you ran it in — `/gdd:` won't follow you
into other deal folders, and it can't reach Antigravity CLI. Use the CLI
install above unless you're staying in one project folder for the whole
engagement.

**Claude Cowork.** Install **GDD — Get Diligence Done** from the plugin
browser once it's listed in the community catalog. The intake commands
render as fill-in-the-blank forms.

## The loop

```
scope-deal → hypothesis-tree → workplan
  → size-market / map-competitors / probe-customers / assess-moat / scan-risks (modules, fresh-context, independent)
  → triangulate (verification gate) → red-team → storyline
```

GDD is a scalpel, not an autopilot: trust the execution, verify like an
engagement manager. The verifier's promise is consistency and traceability —
it confirms the TAM math checks out, top-down and bottom-up reconcile, every
number traces to a cited source, and the segment tree is MECE. It never
claims the market is *actually* $X.

## Layout

| Path | What |
|---|---|
| `.claude-plugin/` | Plugin manifest (`plugin.json`) and private marketplace (`marketplace.json`) — the no-terminal install surface |
| `bin/install.js` | Single-file CLI installer; runtimes data-defined in `runtime-catalog.json` (Claude Code, Codex, Antigravity CLI enabled; opencode/copilot catalogued, gated) |
| `commands/` | The 16 slash commands — flat `.md` files (plugin skills → `/gdd:*`), thin wrappers that delegate to workflows |
| `agents/` | The 10 subagents (scoper, planner, researcher, independent sizers, analyst, verifier, red-teamer, storyliner, librarian) |
| `gdd-core/workflows/` | The real mechanics each command routes into |
| `gdd-core/templates/` | Engagement state artifacts (brief, taxonomy, ledger, reports…) |
| `gdd-core/references/` | The verification check registry, source hierarchy, sizing methods |
| `docs/design.md` | Design overview: hierarchy, artifacts, commands, agents, verification semantics |
| `examples/` | A full worked engagement (`kestrel-sound`) |

User engagement state lives in `.diligence/` inside a deal folder (never
in this repo — gitignored): `ENGAGEMENT.md`, `TAXONOMY.md` +
`state.json` taxonomy lock, `LEDGER.md`, `SOURCES.md`, `WORKPLAN.md`,
`STATE.md`, `modules/*/`, `reports/`.

## Inspiration

GDD takes its name and skeleton in analogy with
[GSD](https://github.com/open-gsd/get-shit-done-redux) (MIT), whose
command-workflow idea transfers cleanly beyond software development.
Machinery here is written fresh against that pattern.

## License

[Apache-2.0](LICENSE). Copyright 2026 Navis Advisory.

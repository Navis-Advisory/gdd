# GDD — Get Diligence Done

An agentic workflow system for commercial due diligence: scope the deal,
lock the taxonomy, run the modules in fresh-context agents, triangulate,
red-team, tell the story. Built on the process-encoding pattern proven by
GSD (software) and GPD (physics): a deterministic engagement spine with
open-ended analytical leaves, persistent state in markdown + a machine
lock, and a verification gate whose honest claim is **consistency and
traceability, not truth**.

Claude Code, Codex, and Antigravity CLI are supported runtimes; opencode /
copilot are catalogued but gated. See [`docs/design.md`](docs/design.md) for the full
design, [`docs/install.md`](docs/install.md) for every install path, and
[`examples/kestrel-sound/`](examples/) for a complete engagement run.

## Install

**Claude Code (Desktop, web, or CLI).** Add this repository as a plugin
marketplace and install, then run `/gdd:tour`:

```
/plugin marketplace add Navis-Advisory/gdd
/plugin install gdd@gdd
```

**Claude Cowork.** Install **GDD — Get Diligence Done** from the plugin
browser. The intake commands render as fill-in-the-blank forms.

**Local / other runtimes.** `node bin/install.js --claude --local` projects
the same content into a deal folder's `./.claude`. `npm test` verifies the
install round-trip, reference integrity, and the plugin layout. Full details
in [`docs/install.md`](docs/install.md).

## The loop

```
scope-deal → hypothesis-tree → workplan
  → size-market / map-competitors (modules, fresh-context, independent)
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
| `commands/` | The 13 slash commands — flat `.md` files (plugin skills → `/gdd:*`), thin wrappers that delegate to workflows |
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
[GSD](https://github.com/open-gsd/get-shit-done-redux) (MIT) and follows
the domain-fork playbook of
[GPD](https://github.com/psi-oss/get-physics-done) (Apache-2.0), which
showed how the command-workflow idea transfers out of software
development. Machinery here is written fresh against those patterns.

## License

[Apache-2.0](LICENSE). Copyright 2026 Navis Advisory.

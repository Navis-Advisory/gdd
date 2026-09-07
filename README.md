# Get Diligence Done

[![npm](https://img.shields.io/npm/v/get-diligence-done)](https://www.npmjs.com/package/get-diligence-done)
[![tests](https://img.shields.io/github/actions/workflow/status/Navis-Advisory/gdd/ci.yml?branch=main&label=tests)](https://github.com/Navis-Advisory/gdd/actions/workflows/ci.yml)

**Get Diligence Done (GDD)** is the open-source agentic copilot for
commercial due diligence: scope the deal,
lock the taxonomy, run the modules in fresh-context agents, triangulate,
red-team, tell the story. A deterministic engagement spine with open-ended
analytical leaves, persistent state in markdown plus a machine lock, and a
verification gate whose honest claim is **consistency and traceability, not
truth**.

Claude Code, Codex, and Antigravity CLI are supported runtimes; other
runtimes are community ports on demand. See [`docs/design.md`](docs/design.md) for the full
design and [`docs/install.md`](docs/install.md) for every install path.

## Install

**One command (recommended).** Requires Node.js >= 20.

```bash
npx get-diligence-done --claude --global
```

That projects GDD into `~/.claude`, so `/gdd:` works from any deal folder —
the tool's normal per-engagement usage pattern. Swap `--claude` for
`--codex` or `--antigravity` to target those runtimes. The installer is a
single file with no dependencies; there's nothing to build.

**From source** (to read the code first, or to hack on it):

```bash
git clone https://github.com/Navis-Advisory/gdd.git
cd gdd
node bin/install.js --claude --global
```

`npm test` verifies the install round-trip and reference integrity. Full
details in [`docs/install.md`](docs/install.md).

Once installed, GDD runs out of `~/.claude`; engagement state lives in a
`.diligence/` folder inside each deal folder, never in the install. To
update: re-run `npx get-diligence-done@latest --claude --global`, or
`/gdd:update` from inside the runtime.

**Claude Code plugin (secondary).** `/plugin marketplace add
Navis-Advisory/gdd` then `/plugin install gdd@gdd` works, but registers at
local scope pinned to the project you ran it in — `/gdd:` won't follow you
into other deal folders, and it can't reach Antigravity CLI. Use the CLI
install above unless you're staying in one project folder for the whole
engagement.

**Claude Cowork.** Install **GDD — Get Diligence Done** from the plugin
browser once it's listed in the community catalog. The intake commands
render as fill-in-the-blank forms.

## Why we built this

We run commercial due diligence for a living. Pointing a general-purpose AI
at a diligence question rarely fails by being obviously wrong — it fails by
being *confidently unverifiable*: a clean-sounding market size with no
traceable source, a thesis nothing ever tried to kill. That's the failure a
good engagement manager exists to prevent. GDD encodes that discipline —
every number cited, every market sized two independent ways, every thesis
red-teamed — as a workflow, so the rigor is structural rather than hoped-for.

It's a scalpel, not an autopilot: trust the execution, verify like the EM.

## The loop

```
scope-deal → hypothesis-tree → workplan
  → size-market / map-competitors / probe-customers / assess-moat / scan-risks
    (modules, fresh-context, independent)
  → triangulate (verification gate) → red-team → storyline
```

- **`scope-deal`** — interview the deal into an engagement brief and a
  locked taxonomy (the segment definitions everything downstream must obey).
- **`hypothesis-tree`** — decompose the investment thesis into a MECE tree
  of falsifiable hypotheses, one brief per module.
- **`workplan`** — lay the modules across the engagement timeline,
  dependency-ordered.
- **modules** — the analytical work, each in a fresh-context agent:
  `size-market`, `map-competitors`, `probe-customers`, `assess-moat`,
  `scan-risks`.
- **`triangulate`** — the verification gate: consistency and traceability
  checks across every finding. A FAIL blocks the storyline.
- **`red-team`** — the strongest case against the thesis; surviving kills go
  CONTESTED.
- **`storyline`** — synthesize the surviving findings into a pyramid-
  principle storyline.

## Why it works

Naive AI diligence fails in three predictable ways. GDD is built around
closing each one:

- **Untraceable claims.** Every finding carries a citation to a tiered
  source; the verifier fails the gate when a load-bearing number doesn't
  trace back to one.
- **Single-source sizing.** The market is sized top-down and bottom-up by
  two agents that never see each other's work, then reconciled — an
  unreconciled gap is reported and named, never averaged away.
- **Unfalsified theses.** A red-team stage argues the strongest case against
  the thesis before the story is told; a killed finding goes CONTESTED and
  can't carry a key-line claim.

The verifier's promise is consistency and traceability — it confirms the TAM
math checks out, top-down and bottom-up reconcile, every number traces to a
cited source, and the segment tree is MECE. It never claims the market is
*actually* $X.

## Layout

| Path | What |
|---|---|
| `.claude-plugin/` | Plugin manifest (`plugin.json`) and private marketplace (`marketplace.json`) — the no-terminal install surface |
| `bin/install.js` | Single-file CLI installer; runtimes data-defined in `runtime-catalog.json` (Claude Code, Codex, Antigravity CLI) |
| `commands/` | The 17 slash commands — flat `.md` files (plugin skills → `/gdd:*`), thin wrappers that delegate to workflows |
| `agents/` | The 10 subagents (scoper, planner, researcher, independent sizers, analyst, verifier, red-teamer, storyliner, librarian) |
| `gdd-core/workflows/` | The real mechanics each command routes into |
| `gdd-core/templates/` | Engagement state artifacts (brief, taxonomy, ledger, reports…) |
| `gdd-core/references/` | The verification check registry, source hierarchy, sizing methods |
| `docs/design.md` | Design overview: hierarchy, artifacts, commands, agents, verification semantics |

User engagement state lives in `.diligence/` inside a deal folder (never
in this repo — gitignored): `ENGAGEMENT.md`, `TAXONOMY.md` +
`state.json` taxonomy lock, `LEDGER.md`, `SOURCES.md`, `WORKPLAN.md`,
`STATE.md`, `modules/*/`, `reports/`.

## Contributing

Issues are open and welcome — bug reports and feature ideas both. Pull
requests are restricted to collaborators (this repo is a mirror). See
[`CONTRIBUTING.md`](CONTRIBUTING.md).

## Inspiration

GDD takes its name and skeleton in analogy with
[GSD](https://github.com/open-gsd/get-shit-done-redux) (MIT), whose
command-workflow idea transfers cleanly beyond software development.
Machinery here is written fresh against that pattern.

## License

[Apache-2.0](LICENSE). Copyright 2026 Navis Advisory.

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

Claude Code and Codex have CLI adapters. Claude Cowork and ChatGPT Work
are separate native acceptance targets; their plugin installation and
persistence paths are not yet certified. See [`docs/design.md`](docs/design.md) for the full
design and [`docs/install.md`](docs/install.md) for every install path.

## SOW intake pilot (0.2.4)

The candidate adds `/gdd:ingest-sow <file>`, stable question IDs in
QUESTIONS.md, `/gdd:sow-status`, and local Git checkpoints. The portable
plugin offers the entry point as `$gdd`.

**The candidate includes bounded intake corrections and still needs full synthetic
acceptance before real-SOW testing.** Bounded Claude Code checks do not certify
Cowork. The pilot targets Cowork's repository marketplace: add
`Navis-Advisory/gdd` through Customize → Plugins → Add → Add marketplace, then
install GDD after the reviewed public candidate is available. See
[the pilot guide](docs/sow-pilot.md) for exact candidate identification,
account separation and lifecycle checks. No ZIP handoff or npm release is needed.

## Install

**Legacy CLI adapter.** Requires Node.js >= 20. For this SOW pilot, use
the native plugin package and instructions above.

```bash
npx get-diligence-done --claude --global
```

That projects GDD into `~/.claude`, so `/gdd:` works from any deal folder —
the tool's normal per-engagement usage pattern. Swap `--claude` for
`--codex` to target Codex. The installer is a
single file with no dependencies; there's nothing to build.

**From source** (to read the code first, or to hack on it):

Run the npx command from outside a GDD clone. Inside a clone, use the
source command below; npx may resolve the local package before it is installed.

```bash
git clone https://github.com/Navis-Advisory/gdd.git
cd gdd
node bin/install.js --claude --global
```

`npm test` verifies the install round-trip and reference integrity. Full
details in [`docs/install.md`](docs/install.md).

With the global Claude CLI adapter, GDD runs out of `~/.claude`; engagement state lives in a
`.diligence/` folder inside each deal folder, never in the install. To
update a native plugin, use the host's plugin manager. CLI updates are a
separate route; see [installation guidance](docs/install.md#updating).

**Claude Code plugin.** Add the marketplace with `/plugin marketplace add
Navis-Advisory/gdd`, then open `/plugin install gdd@gdd` and choose user,
project, or local scope. User scope makes it available across your projects
on that machine.

**Claude Cowork and ChatGPT Work.** Native installation and persistence
acceptance are pending. Do not assume a CLI installation makes the plugin
available in either app. See the installation guide for current status.

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
| `.claude-plugin/` | Plugin manifest (`plugin.json`) and marketplace (`marketplace.json`) — the no-terminal install surface |
| `bin/install.js` | Single-file CLI installer; runtimes data-defined in `runtime-catalog.json` (Claude Code, Codex) |
| `commands/` | The 19 slash commands — flat `.md` files (plugin skills → `/gdd:*`), thin wrappers that delegate to workflows |
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

## Cloud sessions

Claude Code cloud sessions self-install this checkout's GDD workflows through
the tracked SessionStart hook. For Codex Cloud, set the repository Environment
setup script to:

```sh
bash scripts/cloud-bootstrap.sh codex
```

The script installs GDD locally into the ephemeral clone, so the commands
match the checked-out revision rather than an unrelated user-level install.

## License

[Apache-2.0](LICENSE). Copyright 2026 Navis Advisory.

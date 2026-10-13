# Get Diligence Done

[![npm](https://img.shields.io/npm/v/get-diligence-done)](https://www.npmjs.com/package/get-diligence-done)
[![tests](https://img.shields.io/github/actions/workflow/status/Navis-Advisory/gdd/ci.yml?branch=main&label=tests)](https://github.com/Navis-Advisory/gdd/actions/workflows/ci.yml)

**GDD is an open-source workflow for commercial due diligence.** Scope the
deal, investigate the market, challenge the thesis and build a defensible story.

Findings trace to sources. Independent agents size the market two ways.
Verification checks consistency and traceability; human judgment remains essential.

## Install

**Claude Cowork:** Open **Customize → Plugins → Add → Add marketplace →
Add from a repository**, enter `Navis-Advisory/gdd`, then add GDD.

**Claude Code:** Run these inside Claude Code:

```text
/plugin marketplace add Navis-Advisory/gdd
/plugin install gdd@gdd
```

Open a deal folder and run `/gdd:help` or `/gdd:tour` to get started.
See [installation](docs/install.md) for CLI adapters, other runtimes and updates.

## The workflow

```text
scope-deal → hypothesis-tree → workplan
  → size-market / map-competitors / probe-customers / assess-moat / scan-risks
  → triangulate → red-team → storyline
```

Start from an SOW with `/gdd:ingest-sow`, or scope the engagement through an
interview. Work is saved in `.diligence/` inside your deal folder; use
`/gdd:pause-work` and `/gdd:resume-work` to continue across sessions.

[Design and commands](docs/design.md) · [Contributing](CONTRIBUTING.md)

Inspired by [Git. Ship. Done.](https://github.com/open-gsd/gsd-core) and
[Get Physics Done](https://github.com/psi-oss/get-physics-done).

[Apache-2.0](LICENSE). Copyright 2026 Navis Advisory.

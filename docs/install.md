# Install GDD

GDD's primary distribution is a single-file installer (`bin/install.js`)
that projects the same command/agent content into whichever AI coding
runtime you use. Claude Code, Codex, and Antigravity CLI are supported;
OpenCode and Copilot CLI are catalogued in `runtime-catalog.json` but
gated until their converters exist. A Claude Code plugin/marketplace path
also exists (below) but is scoped to the project folder you install it
from, so it's a secondary option until that's addressed upstream.

Engagement state is written to a `.diligence/` folder inside whatever
deal folder you run in — it never touches this repo.

## CLI install (recommended)

```bash
node bin/install.js --claude --global   # → ~/.claude; /gdd: from any deal folder
claude                                   # then: /gdd:help → /gdd:tour
node bin/install.js --claude --uninstall --global   # remove
```

`--global` is the recommended scope: GDD runs per-deal, out of whatever
folder you happen to be in, so `/gdd:` needs to be available everywhere.
Use `--local` instead to scope the install to one deal folder's
`./.claude` — an isolated one-off engagement, or testing a change without
touching your global command set:

```bash
node bin/install.js --claude --local    # into ./.claude of the current folder
node bin/install.js --claude --uninstall --local
```

`npm test` verifies the install round-trip and reference integrity for
every runtime before you point anyone at a release.

The commands are authored once, flat under `commands/`, against the
neutral `${CLAUDE_PLUGIN_ROOT}` variable; the installer rewrites it to
the absolute config dir at install time. Same content projects cleanly
to every supported runtime — no vendor strings in the workflow layer.

### Codex

```bash
node bin/install.js --codex --global   # → ~/.codex
codex                                   # then: $gdd-help → $gdd-tour
node bin/install.js --codex --uninstall --global   # remove
```

Commands install as skills at `~/.codex/skills/gdd-<name>/SKILL.md`
(frontmatter trimmed to `name` + `description`, per Codex's skill spec;
invoke explicitly with `$gdd-<name>` or let Codex select on task match).
Agents install as standalone TOML files at `~/.codex/agents/gdd-<name>.toml`
with the agent's full body inlined into `developer_instructions` — Codex's
custom-agent format has no external file reference, so the instructions are
embedded directly rather than pointing back at `gdd-core/`.

### Antigravity CLI

```bash
node bin/install.js --antigravity --global   # → ~/.gemini/antigravity
antigravity                                   # then: /gdd-help → /gdd-tour
node bin/install.js --antigravity --uninstall --global   # remove
```

Commands install as skills at `skills/gdd-<name>/SKILL.md`; agents install
as flat markdown at `agents/gdd-<name>.md` with Claude tool names mapped to
Antigravity's Gemini-derived vocabulary (`Read`→`read_file`, `Bash`→
`run_shell_command`, etc.). Local installs land under `./.agents/`, global
installs under `~/.gemini/antigravity/` (`ANTIGRAVITY_CONFIG_DIR` overrides).

### Why Codex and Antigravity need real conversion, not just a copy

Both runtimes lack Claude Code's native `@file` auto-include, so a command's
`<execution_context>@${CLAUDE_PLUGIN_ROOT}/gdd-core/workflows/x.md</execution_context>`
block would install as a dangling reference to nothing. The installer
resolves it at install time, splicing the referenced workflow's content
directly into the generated `SKILL.md`. It also rewrites `/gdd:` prefixes in
prose to each runtime's actual invocation syntax (`$gdd-` for Codex, `/gdd-`
for Antigravity) so cross-references between commands read correctly.

Gemini CLI itself has no entry in the catalog: Google sunset it on
2026-06-18 in favor of Antigravity CLI, which is what GDD targets instead.

## Claude Code plugin / marketplace (secondary — known limitation)

```
/plugin marketplace add Navis-Advisory/gdd
/plugin install gdd@gdd
```

then run `/gdd:tour`. This registers at **local scope, pinned to the
project folder you ran it in** — `/gdd:` will not appear once you `cd`
into an actual deal folder elsewhere, which works against the tool's
per-deal-folder pattern. It also can't reach Antigravity CLI (which
discovers skills, not `commands/`). Reasonable if you're keeping one
engagement inside a single project folder for its whole run, or if
you're validating the plugin manifest itself — otherwise, use the CLI
install above.

### Verify a local checkout

To confirm the plugin loads from a clone before pointing anyone at it:

```bash
claude plugin validate .                       # manifests are well formed
claude plugin marketplace add ./               # add this repo as a marketplace
claude plugin install gdd@gdd                  # install the plugin
claude plugin details gdd                      # 16 commands, 10 agents
# then, in a scratch deal folder: /gdd:help → /gdd:tour → /gdd:scope-deal
```

## Claude Cowork (no terminal, pending)

Once GDD is listed in Anthropic's community plugin catalog, open Cowork's
plugin browser, find **GDD — Get Diligence Done** under the Anthropic &
Partners tab, and install it. Then open a deal folder and run
**`/gdd:tour`**.

The intake commands (`/gdd:scope-deal`, `/gdd:hypothesis-tree`,
`/gdd:size-market`) carry argument hints, so Cowork renders them as
fill-in-the-blank forms. Cowork shares the plugin mechanism above; whether
its install scope has the same per-project pinning is unconfirmed as of
this writing.

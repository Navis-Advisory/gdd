# Install GDD

GDD is a Claude plugin. Engagement state is written to a `.diligence/`
folder inside whatever deal folder you run in — it never touches this repo.

## In Claude Cowork (no terminal)

Once GDD is listed in the community plugin catalog, open Cowork's plugin
browser, find **GDD — Get Diligence Done** under the Anthropic & Partners
tab, and install it. Then open a deal folder and run **`/gdd:tour`**.

The intake commands (`/gdd:scope-deal`, `/gdd:hypothesis-tree`,
`/gdd:size-market`) carry argument hints, so Cowork renders them as
fill-in-the-blank forms.

## In Claude Code (Desktop, web, or CLI)

Add this repository as a plugin marketplace and install, then run `/gdd:tour`:

```
/plugin marketplace add Navis-Advisory/gdd
/plugin install gdd@gdd
```

## Verify a local checkout

To confirm the plugin loads from a clone before pointing anyone at it:

```bash
claude plugin validate .                       # manifests are well formed
claude plugin marketplace add ./               # add this repo as a marketplace
claude plugin install gdd@gdd                  # install the plugin
claude plugin details gdd                      # 13 commands, 10 agents
# then, in a scratch deal folder: /gdd:help → /gdd:tour → /gdd:scope-deal
```

## As a CLI install (other runtimes / vendored)

The single-file installer projects the same content into a runtime's config
directory. Claude Code, Codex, and Antigravity CLI are supported; OpenCode
and Copilot CLI are catalogued in `runtime-catalog.json` but gated until
their converters exist.

```bash
node bin/install.js --claude --local   # into ./.claude of a deal folder
claude                                  # then: /gdd:help → /gdd:tour
node bin/install.js --claude --uninstall --local   # remove
```

The commands are authored once, flat under `commands/`, against the neutral
`${CLAUDE_PLUGIN_ROOT}` plugin variable. The plugin loader resolves it
directly; the installer rewrites it to the absolute config dir. Same content,
two surfaces — no vendor strings in the workflow layer.

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

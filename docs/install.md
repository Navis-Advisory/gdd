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
directory. Claude Code is the supported runtime; the rest are catalogued in
`runtime-catalog.json` but gated.

```bash
node bin/install.js --claude --local   # into ./.claude of a deal folder
claude                                  # then: /gdd:help → /gdd:tour
node bin/install.js --claude --uninstall --local   # remove
```

The commands are authored once, flat under `commands/`, against the neutral
`${CLAUDE_PLUGIN_ROOT}` plugin variable. The plugin loader resolves it
directly; the installer rewrites it to the absolute config dir. Same content,
two surfaces — no vendor strings in the workflow layer.

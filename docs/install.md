# Install GDD

Use the repository plugin in Claude Cowork or Claude Code, or the CLI adapters
for Claude Code and Codex. Antigravity support is discontinued.
See [versioning](VERSIONING.md) when switching routes and
[SOW intake](sow-pilot.md) to start from a statement of work.

## Claude Cowork

Open **Customize → Plugins → Add → Add marketplace → Add from a repository**,
enter `Navis-Advisory/gdd`, and add GDD from that marketplace. Start a new task
with your private deal folder selected, then load `/gdd:help`.

## Claude Code plugin

In Claude Code:

```text
/plugin marketplace add Navis-Advisory/gdd
/plugin install gdd@gdd
```

Choose user scope for availability across projects on the same machine,
project scope for repository collaborators, or local scope for this repository.
Open a separate deal folder and run `/gdd:help` or `/gdd:tour`.

## CLI adapters

Requires Node.js >= 20. Run from outside a GDD clone:

```bash
npx get-diligence-done@latest --claude --global
npx get-diligence-done@latest --codex --global
```

`--global` uses the runtime's user configuration directory. `--local` uses
its project configuration directory; `--config-dir <path>` overrides either.
Use `--dry-run` to inspect intended changes. Claude invokes `/gdd:help`;
Codex invokes `$gdd-help`. Work stays in the deal folder's `.diligence/`,
separate from the installation.

These commands install npm's published version. To try repository changes
that are still listed under `Unreleased`, use a disposable configuration:

```bash
git clone https://github.com/Navis-Advisory/gdd.git
cd gdd
node scripts/install.js --claude --config-dir /absolute/path/to/scratch-config
node scripts/install.js --codex --config-dir /absolute/path/to/another-scratch-config
```

Codex commands become skills with their context includes expanded; agent
instructions become TOML. This conversion does not establish native plugin
behavior in Codex or ChatGPT Work.

## ChatGPT Work and Codex plugins

The repository includes portable plugin packaging and a marketplace catalog.
Native workflow validation in these apps remains separate from CLI installation.
Verify command discovery, access to the selected folder, saving and fresh-session
resume with a synthetic document before using confidential material. Missing
file, delegate or Git capabilities are reported as limitations.

## Updating and removing

For plugins, use the host's plugin manager, then start a new session.
`/gdd:update` identifies the active installation route before proposing changes;
it does not replace a native plugin with an npm adapter.

For CLI adapters, use the existing configuration directory and an exact
[release version](VERSIONING.md). Review local edits and the dry-run before
updating or uninstalling. The current repository installer preserves edited and
unowned files by default; `--update` backs up replaced local edits in
`gdd-patches/` and refuses to overwrite unresolved backups. `--uninstall` keeps
modified files. `--force` explicitly permits overwriting/removing local edits.
These protections require 0.2.9 or later. Check [registry availability](VERSIONING.md)
before installing; a repository version is not proof of npm publication.

## Development checks

`npm test` checks installation, references and packaging.
`node tests/smoke-pack.mjs` checks the packed npm artifact.
`npm run test:codex` requires Python 3.11+ (`python`) to parse generated agent TOML.
None of these checks establishes native app behavior.

Command frontmatter omits `name:`: Claude derives names from files, while the
Codex converter supplies skill names. Claude Code cloud sessions install this
checkout through the tracked SessionStart hook. For Codex Cloud, set the
repository Environment setup script to `bash scripts/cloud-bootstrap.sh codex`.

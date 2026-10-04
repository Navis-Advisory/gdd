# Install GDD

Claude Code and Codex have CLI adapters. Claude Cowork and ChatGPT Work
are separate native plugin targets; native acceptance is pending. Antigravity
support has been discontinued. Existing Antigravity installations are not
changed by this release.

## Claude Code plugin

In Claude Code:

```text
/plugin marketplace add Navis-Advisory/gdd
/plugin install gdd@gdd
```

Choose user scope for availability across projects on the same machine,
project scope for repository collaborators, or local scope for just that
repository. Installation requires access to the marketplace repository.
After activation, run `/gdd:help` and `/gdd:tour` in a scratch deal folder.
Native installation and invocation must be checked on the exact candidate.

## CLI installation

Requires Node.js >= 20. Use a scratch configuration directory for candidate
testing; installer ownership and recovery hardening remain outstanding.

```bash
npx get-diligence-done --claude --global
npx get-diligence-done --codex --global
```

These commands install the published npm version, which can lag this checkout.
To test this source revision:

```bash
git clone https://github.com/Navis-Advisory/gdd.git
cd gdd
node bin/install.js --claude --config-dir /absolute/path/to/scratch-config
node bin/install.js --codex --config-dir /absolute/path/to/another-scratch-config
```

`--global` uses the runtime's user configuration directory. `--local` uses
its project configuration directory. `--config-dir` overrides either.
Claude invokes `/gdd:help`; Codex invokes `$gdd-help`. Engagement state
lives in the selected deal folder's `.diligence/`, separate from the install.

Codex commands are converted into skills with workflow includes inlined.
Agent instructions are converted to TOML. This CLI conversion does not
establish native plugin discovery in Codex or ChatGPT Work.

## Claude Cowork

Native plugin installation, command discovery, folder selection, durable
saving, and fresh-session resume must be tested independently of Claude Code.
Argument hints are input guidance, not proof that native forms render.
Do not advertise community-directory availability before a listing exists.

## ChatGPT Work and Codex plugins

Native packaging and marketplace discovery are pending. CLI installation
is not a substitute. Test each app with a pinned plugin candidate and a
synthetic document before using a real SOW.

## Candidate acceptance

For each of Claude Code, Claude Cowork, Codex, and ChatGPT Work, record:

1. Candidate revision, app version, installation route, and model.
2. Discovery and invocation in a fresh session.
3. Access to an explicitly selected engagement folder.
4. Saving and resuming without rebuilding or losing question IDs.
5. Git availability and an actual checkpoint containing the intended files.

Missing file or Git capabilities must be reported explicitly. Until SOW
ingestion is implemented, document intake is not a certified SOW workflow.

## Updating

Use `/gdd:update` from the engagement runtime or repeat the installer with
the desired published version. Test candidate updates in a scratch directory.
Do not silently replace a retired runtime with another adapter.

## Author checks

`npm test` checks CLI installation and references, not native app behavior.
`node tests/smoke-pack.mjs` tests the packed npm artifact.
Command frontmatter must omit `name:`: Claude derives names from files,
while the Codex converter supplies skill names.

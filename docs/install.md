# Install GDD

GDD installs as a repository plugin in Claude Code and Claude Cowork.
Claude Code and Codex also have CLI adapters; Codex and ChatGPT Work native
acceptance remains separate. Antigravity support is discontinued.

Plugin and npm releases can differ; see [versioning](VERSIONING.md) before
switching installation routes. SOW intake is described in the
[design overview](design.md#sow-intake).

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
Run npx from outside a GDD clone. Inside a clone it may resolve the local
package before installation; use `node scripts/install.js` instead.
To test the checked-out source revision:

```bash
git clone https://github.com/Navis-Advisory/gdd.git
cd gdd
node scripts/install.js --claude --config-dir /absolute/path/to/scratch-config
node scripts/install.js --codex --config-dir /absolute/path/to/another-scratch-config
```

`--global` uses the runtime's user configuration directory. `--local` uses
its project configuration directory. `--config-dir` overrides either.
Claude invokes `/gdd:help`; Codex invokes `$gdd-help`. Engagement state
lives in the selected deal folder's `.diligence/`, separate from the install.

Codex commands are converted into skills with workflow includes inlined.
Agent instructions are converted to TOML. This CLI conversion does not
establish native plugin discovery in Codex or ChatGPT Work.

## Claude Cowork

Open Cowork → Customize → Plugins → Add → Add marketplace → Add from a
repository, enter `Navis-Advisory/gdd`, and add GDD from that marketplace.
Use a separate private deal folder for each engagement. Load `/gdd:help`
after installation and confirm the active plugin version. Installation alone
does not establish acceptance of every workflow; the [pilot guide](sow-pilot.md)
records the historical 0.2.5 test procedure, not current release readiness.

Native plugin installation, command discovery, folder selection, durable
saving, and fresh-session resume must be tested independently of Claude Code.
Argument hints are input guidance, not proof that native forms render.
Do not advertise community-directory availability before a listing exists.

## ChatGPT Work and Codex plugins

Portable packaging is provided in root plugin.json, skills/, and the native
marketplace catalog. CLI installation is not a substitute for native
behavioral acceptance. Test each app with a pinned plugin candidate and a
synthetic document before using a real SOW.

## Candidate acceptance

For each of Claude Code, Claude Cowork, Codex, and ChatGPT Work, record:

1. Candidate revision, app version, installation route, and model.
2. Discovery and invocation in a fresh session.
3. Access to an explicitly selected engagement folder.
4. Saving and resuming without rebuilding or losing question IDs.
5. Git availability and an actual checkpoint containing the intended files.

Missing file or Git capabilities must be reported explicitly. SOW ingestion is a pilot; each app still needs independent behavioral
acceptance against a private synthetic document before a real SOW.

## Updating

For a native plugin, use the host's plugin manager or replace the candidate
through the same native installation route. `/gdd:update` first identifies
the active native, candidate, source-checkout or CLI route. Missing CLI
ownership metadata never routes a native plugin to npm. The corrected routing
still needs native-app acceptance; an installed version alone does not prove it.

CLI installation/update hardening remains pending integration and validation.
Test that route only in a disposable configuration directory, using an exact
reviewed version and the known existing destination. Preserve unresolved local
edits. Do not silently create another installation or substitute a retired
runtime with another adapter.

## Author checks

`npm test` checks CLI installation and references, not native app behavior.
`node tests/smoke-pack.mjs` tests the packed npm artifact.
Command frontmatter must omit `name:`: Claude derives names from files,
while the Codex converter supplies skill names.

## Cloud sessions

Claude Code cloud sessions install this checkout's workflows through the
tracked SessionStart hook. For Codex Cloud, set the repository Environment
setup script to `bash scripts/cloud-bootstrap.sh codex`. This installs into
the ephemeral clone so the commands match the checked-out revision.

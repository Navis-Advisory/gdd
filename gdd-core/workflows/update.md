# Workflow: update

Maintenance command. This updates the GDD **install** (the command/agent/
gdd-core payload projected into your runtime's config dir). It does not read
or write any `.diligence/` engagement — run it from anywhere.

The reinstall itself is done by the published installer via `npx`; the model's
job here is the version check, the changelog readout, the confirmation, and
merging back any files the user edited locally.

## 1. Locate the install and read its manifest

This workflow file lives at `<configDir>/gdd-core/workflows/update.md`, so its
install dir is the `gdd-core/` directory it was loaded from. Read the manifest:

- `<configDir>/gdd-core/gdd-file-manifest.json`

From it, take:
- `version` — the installed version (also in `gdd-core/VERSION`).
- `config_dir` — the absolute install dir to reinstall into.
- `install` — the provenance `{ runtime_flag, scope, config_dir_override }`.

**Fail closed.** If the manifest is missing, unreadable, or has no `install`
block, stop. Tell the user GDD can't tell how it was installed, and give them
the manual path: `npx -y get-diligence-done@latest <runtime-flag> --update`
(e.g. `--claude`, `--codex`). Do not guess. If the recorded runtime
is retired, stop and explain; never reinterpret it as another runtime.

## 2. Check the latest published version

Run: `npm view get-diligence-done version`

Compare it to the installed `version` as semver:
- If installed ≥ latest: report "GDD is up to date (vX.Y.Z)" and stop.
- If installed < latest: continue.

If `npm view` fails (offline, registry error), say so and stop — do not
attempt an update you can't verify.

## 3. Show what's changing

Fetch the public changelog and show the entries between the installed and the
latest version (newest first):

- `https://raw.githubusercontent.com/Navis-Advisory/gdd/HEAD/CHANGELOG.md`
  (`HEAD` resolves to the repo's default branch, whatever it is named)

If the fetch fails, print the changelog URL and the two version numbers so the
user can read it themselves. Keep the readout to the relevant version sections.

## 4. Confirm

Ask the user to confirm the update from vX.Y.Z → vA.B.C. Do not proceed without
an explicit yes. Note that locally modified GDD files will be backed up to
`gdd-patches/` and you'll help merge them back.

## 5. Reinstall in place

Replay the recorded install deterministically, targeting the exact install dir:

```
npx -y get-diligence-done@latest <install.runtime_flag> --config-dir <config_dir> --update
```

`--update` backs up any locally modified file to `<config_dir>/gdd-patches/<rel>`
before overwriting, and prunes files the new version no longer ships. Report the
installer's summary (files written, backed up, pruned).

## 6. Merge local edits back

If `<config_dir>/gdd-patches/` is non-empty, each file there is the user's
pre-update version. For each one:

1. Read the backup (user's edits) and the freshly installed file (new upstream).
2. Three-way-merge in your head against the old baseline: carry the user's
   intent forward onto the new content. You are the merge engine — there is no
   diff3 step.
3. Where the user's change and an upstream change touch the same lines and can't
   both stand, do **not** silently pick one. Show the conflict and ask the user.
4. Write the merged result to the live file with Edit.

When a file is fully reconciled, delete its `gdd-patches/` copy so a re-run
doesn't re-merge it. Leave anything you couldn't resolve in place and list it.

## 7. Report

State the final version (vX.Y.Z → vA.B.C), how many files were merged cleanly,
and anything left unresolved in `gdd-patches/` for the user to handle.

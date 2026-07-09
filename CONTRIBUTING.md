# Contributing

`gdd-private` is the source of truth. `Navis-Advisory/gdd` (public) is a
mirror — never edit it directly; see "Publishing" below.

## Workflow

- Branch off `main`, one change per PR. No direct pushes to `main`, no
  force-pushing.
- CI (`.github/workflows/ci.yml`) runs `npm test` on every PR — must pass
  before merging.
- Commits use your own identity, no AI co-author trailers (see `CLAUDE.md`).

## Publishing to the public repo

Merging to `main` here triggers `.github/workflows/sync-public.yml`, which
mirrors everything except `docs/plan/` into a PR against `Navis-Advisory/gdd`.
Review and merge that PR same as any other. Manual fallback:
`bin/sync-public.sh <path-to-local-clone-of-gdd-public>`.

## Versioning

Bump `"version"` in `.claude-plugin/plugin.json` for any change that should
reach installed users — Claude Code caches plugin updates by that string, so
a fix without a version bump is invisible to `/plugin update`. Record it in
`CHANGELOG.md`.

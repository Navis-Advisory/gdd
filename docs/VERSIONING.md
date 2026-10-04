# Versioning

GDD follows [semver](https://semver.org): `MAJOR.MINOR.PATCH`.

- **One version, three places.** Bump `package.json` and
  `.claude-plugin/plugin.json` together, and add the matching `## [X.Y.Z]`
  heading to `CHANGELOG.md`. `tests/check-references.mjs` enforces that all three
  agree — a mismatch fails CI.
- **Roll the changelog at tag time.** Write day-to-day notes under
  `## [Unreleased]`; when cutting a release, rename that section to the new
  `## [X.Y.Z] - <date>` heading (and start a fresh empty `## [Unreleased]`).
- **`latest` dist-tag only.** No `next`/`beta` channels — every publish is the
  new `latest`.
- **Publishing is manual.** Bump + roll the changelog, merge to `main`, then a
  human triggers `.github/workflows/publish.yml` (workflow_dispatch). It runs
  `npm test` + the packed-artifact smoke test, refuses if the version is already
  on npm, `npm publish --provenance --access public`, then pushes tag `v<version>`.

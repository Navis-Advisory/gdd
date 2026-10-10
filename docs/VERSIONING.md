# Versioning

GDD follows [semver](https://semver.org): `MAJOR.MINOR.PATCH`.

- Keep `package.json`, `.claude-plugin/plugin.json`, root `plugin.json` and
  the first versioned `CHANGELOG.md` heading aligned. Reference and plugin
  package checks enforce parity across these surfaces.
- Record development notes under `Unreleased`; use a versioned entry when
  preparing an identified candidate. That entry does not establish publication
  or availability through every channel.
- The 0.2.5 candidate still needs full synthetic acceptance. Native
  installation checks do not establish successful ingestion or Git tracking.
- Record source commit and SHA-256 digest with each candidate ZIP or tarball.
  Rebuilt contents require new digests and affected checks even if the
  candidate version has not changed.
- npm publication is a separate, manually triggered release action. The current
  workflow runs source tests and a packing smoke test, publishes the working
  tree, then pushes `v<version>`. It does not yet bind publication to one
  previously tested tarball or provide complete tagging recovery.
- Required release work is to build once, test and scan that exact artifact,
  publish those bytes, and verify the downloaded artifact and release tag.
  Pair npm and plugin releases from the same reviewed source/version; compare
  canonical product files as well as version labels. Confirm npm's `latest`
  and fresh registry-based npm/npx installs before declaring channel parity.
  This target contract is not yet implemented by the current workflow.
- npm uses the `latest` dist-tag; candidate ZIP testing does not update it.
  Do not republish an existing version or move a tag to different content.
- Trusted OIDC publishing authenticates the publisher; it is distinct from
  provenance attestation. The current workflow explicitly disables provenance.
  A public repository alone does not establish an attestation.

As checked on 2026-10-06, npm `latest` is 0.2.2 and the repository plugin is
0.2.4. The channels are not yet aligned.

Test native updates through the host plugin manager. CLI updates must identify
the existing installation and the exact target version. See
[installation](install.md) and the [SOW pilot guide](sow-pilot.md).

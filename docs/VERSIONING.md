# Versioning

GDD follows [semver](https://semver.org): `MAJOR.MINOR.PATCH`.
Changes under `Unreleased` in the [changelog](../CHANGELOG.md) are repository
changes awaiting a release. A repository plugin can contain these changes even
when its manifest version still matches the last published npm package.

## Check what you are installing

```bash
npm view get-diligence-done dist-tags --json
npm view get-diligence-done@latest version dist.integrity --json
```

For a reproducible CLI install, replace `latest` with the exact version you want:

```bash
npx get-diligence-done@latest --claude --global
```

Check the active plugin manifest through the host's plugin manager/resources
and record its source revision when available. Matching version strings alone
are not proof of matching contents. Plugin updates use the host's plugin manager;
CLI updates target the existing configuration directory. See [installation](install.md).

## Release checks

- Align `package.json`, `.claude-plugin/plugin.json`, root `plugin.json` and the
  first versioned changelog heading. Record each candidate commit and digest.
- After review, the release process packs once and compares the artifact's
  canonical resources and inventory with the reviewed public plugin commit.
  Publication is a separate manual action; a merge does not publish to npm.
- Retain the tarball and identities. Verify registry integrity, both CLI installs,
  the `latest` tag and fresh npx execution against those bytes. These are
  distribution checks, not native workflow acceptance.
- Never overwrite a published version or move a release tag. Recovery of a
  partially completed release requires identical artifact integrity and tag
  identity; inspect the registry before retrying.
- Trusted OIDC publishing authenticates the publisher. It does not itself prove
  provenance attestation; the current release process disables that attestation.

# Security Policy

## Reporting a vulnerability

Please report security issues **privately**, not as public GitHub issues.

Use GitHub's [private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability)
on this repository (the **Security** tab → **Report a vulnerability**), or
email **security@navisadvisory.com**.

Please include what you found, how to reproduce it, and the affected version.
We'll acknowledge your report and keep you posted as we work a fix.

## Scope

GDD is a set of prompts, templates, and a small zero-dependency Node installer
that projects them into an AI coding runtime's config directory. The most
relevant concerns are things like the installer writing outside its intended
config directory, or the packaged artifact shipping something it shouldn't.
The workflow content itself runs inside your own agent runtime under your
control.

## No bounty

We don't run a paid bug-bounty program. We're grateful for responsible
disclosure and will credit you in the changelog if you'd like.

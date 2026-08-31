#!/bin/bash
# SessionStart hook: makes this repo's own GDD command set (/gdd:* commands)
# available in fresh Claude Code on the web/mobile sessions opened against
# this repo.
#
# Why this exists: sessions here run in ephemeral containers (repo cloned
# fresh at session start, container discarded after inactivity), so nothing
# from a past session persists on its own.
#
# This used to register the checkout as a plugin marketplace
# (`claude plugin marketplace add` + `claude plugin install`). That works,
# but plugin-installed commands surface to Claude Code as Skills rather
# than native project slash commands, so they don't appear in `/`
# autocomplete. Running the real installer instead — the same one a local
# terminal user runs by hand — projects the commands into
# .claude/commands/gdd/*.md, which Claude Code's own project-commands
# directory format does autocomplete. It's a no-op reinstall (unchanged
# checksums) when the files are already there, so this is safe to run on
# every start, resume, clear and compact.
set -euo pipefail

# Web/mobile sessions only — a local terminal user runs the real
# installer (node bin/install.js --claude --global) once, deliberately,
# and shouldn't have this repo silently re-installing on top of it.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

REPO_ROOT="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"

if ! command -v node >/dev/null 2>&1; then
  echo "session-start.sh: 'node' not found on PATH — skipping GDD command install." >&2
  exit 0
fi

node "$REPO_ROOT/bin/install.js" --claude --local

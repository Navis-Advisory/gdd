#!/usr/bin/env bash
# Install this checkout's GDD workflows into an ephemeral cloud session.
# Claude invokes this through the tracked SessionStart hook; Codex Cloud invokes
# it explicitly from the repository Environment setup script.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RUNTIME="${1:-claude}"

case "$RUNTIME" in
  claude)
    # Avoid changing a developer's local Claude configuration merely because
    # they opened this repository. Cloud sessions set this marker.
    if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
      exit 0
    fi
    RUNTIME_FLAG="--claude"
    ;;
  codex)
    RUNTIME_FLAG="--codex"
    ;;
  *)
    echo "usage: $0 [claude|codex]" >&2
    exit 2
    ;;
esac

if ! command -v node >/dev/null 2>&1; then
  echo "cloud-bootstrap.sh: 'node' is required to install GDD." >&2
  exit 1
fi

cd "$REPO_ROOT"
exec node "$REPO_ROOT/scripts/install.js" "$RUNTIME_FLAG" --local

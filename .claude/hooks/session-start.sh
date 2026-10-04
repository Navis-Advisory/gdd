#!/usr/bin/env bash
# Install this checkout's workflows only in a Claude Code cloud session.
set -euo pipefail
REPO_ROOT="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"
exec bash "$REPO_ROOT/scripts/cloud-bootstrap.sh" claude

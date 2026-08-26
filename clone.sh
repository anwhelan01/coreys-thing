#!/usr/bin/env bash
# One-liner friend:
#   curl -fsSL https://raw.githubusercontent.com/anwhelan01/coreys-thing/main/clone.sh | bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
if [ -x "$ROOT/install.sh" ]; then
  exec "$ROOT/install.sh"
fi
curl -fsSL https://raw.githubusercontent.com/anwhelan01/coreys-thing/main/install.sh | bash

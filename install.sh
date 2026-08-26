#!/usr/bin/env bash
# COREY — the thing you wanted.
# Clone, install, and run the operator.
set -euo pipefail

REPO_URL="${COREY_REPO_URL:-https://github.com/anwhelan01/coreys-thing.git}"
DIR_NAME="${COREY_DIR:-coreys-thing}"

need() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "COREY needs $1 on PATH." >&2
    exit 1
  fi
}

need git
need node
need npm

NODE_MAJOR="$(node -p "process.versions.node.split('.')[0]")"
if [ "$NODE_MAJOR" -lt 22 ]; then
  echo "COREY wants Node 22+. You have $(node -v)." >&2
  exit 1
fi

if [ -f package.json ] && grep -q '"name"' package.json; then
  ROOT="$(pwd)"
  echo "→ Installing in current directory: $ROOT"
else
  if [ -d "$DIR_NAME/.git" ]; then
    echo "→ Updating $DIR_NAME"
    git -C "$DIR_NAME" pull --ff-only
  else
    echo "→ Cloning $REPO_URL"
    git clone "$REPO_URL" "$DIR_NAME"
  fi
  cd "$DIR_NAME"
  ROOT="$(pwd)"
fi

echo "→ npm install"
npm install

if [ ! -f .env ] && [ -f .env.example ]; then
  echo "→ Copy .env.example to .env and add XAI_API_KEY if you want live generation."
fi

echo
echo "COREY is installed."
echo
echo "  cd $ROOT"
echo "  npm run dev"
echo
echo "Then open the URL Vite prints. Desk first. Signal Local is the demo."
echo "The 25 minutes still end at a door. AI will not walk through it for you."
echo

#!/usr/bin/env bash
#
# mirror-to-trustreply-demo.sh
# ----------------------------
# Publishes the trustreply-demo subfolder of saurabhj1986/PMWorkOS to the
# standalone repo saurabhj1986/trustreply-demo so Josh has a clean URL to view.
#
# WHY THIS EXISTS:
# Development happens on the `claude/setup-trustreply-demo-vbcxt` branch in
# saurabhj1986/PMWorkOS (the workspace repo). The standalone trustreply-demo
# repo is the public-facing mirror — what you share with Josh / what Vercel
# auto-deploys from.
#
# WHAT IT DOES:
# 1. Copies the current trustreply-demo/ subfolder into a temp directory
# 2. Strips node_modules / dist / .git
# 3. Initializes a fresh git history with one clean "Publish" commit
# 4. Force-pushes to the standalone repo's main branch
#
# USAGE (run from inside the trustreply-demo/ folder of your local PMWorkOS clone):
#   bash scripts/mirror-to-trustreply-demo.sh
#
# IDEMPOTENT: safe to re-run any time you want to sync updates. Each run
# REPLACES the standalone repo's main branch with the current local state.
# (History on the standalone repo is intentionally flat — it's a publish
# target, not a development branch.)
#
# REQUIREMENTS:
# - You must have push access to https://github.com/saurabhj1986/trustreply-demo
# - Git must be configured with credentials (gh auth login, SSH key, or PAT)

set -euo pipefail

REPO_URL="https://github.com/saurabhj1986/trustreply-demo.git"
SOURCE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TMP_DIR="$(mktemp -d -t trustreply-mirror-XXXXXX)"

echo ">> Source: $SOURCE_DIR"
echo ">> Mirror staging dir: $TMP_DIR"
echo ">> Target repo: $REPO_URL"
echo

# Confirmation guard so nobody accidentally force-pushes
read -r -p "This will FORCE-PUSH the current trustreply-demo/ contents to main of $REPO_URL. Continue? [y/N] " confirm
if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
  echo "Aborted."
  rm -rf "$TMP_DIR"
  exit 1
fi

echo
echo ">> Copying source files (excluding node_modules, dist, .git)..."
# rsync gives us a clean filtered copy in one shot
rsync -a \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude 'dist' \
  --exclude 'dist-ssr' \
  --exclude '*.local' \
  "$SOURCE_DIR"/ "$TMP_DIR"/

cd "$TMP_DIR"

echo ">> Initializing fresh git history..."
git init -b main >/dev/null
git add .
git -c user.email="$(git config user.email)" \
    -c user.name="$(git config user.name)" \
    commit -m "Publish TrustReply demo

Mirror of trustreply-demo/ from saurabhj1986/PMWorkOS at $(date -u +%Y-%m-%dT%H:%M:%SZ)." \
    >/dev/null

echo ">> Adding remote and force-pushing to main..."
git remote add origin "$REPO_URL"
git push -f origin main

echo
echo ">> Mirror push complete."
echo ">> View it: https://github.com/saurabhj1986/trustreply-demo"
echo
echo ">> Cleaning up temp dir: $TMP_DIR"
rm -rf "$TMP_DIR"

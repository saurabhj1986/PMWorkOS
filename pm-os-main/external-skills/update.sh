#!/usr/bin/env bash
# external-skills/update.sh
# Re-syncs external skills from their upstream GitHub repositories.
# Run this whenever you want the latest versions of external skills.
#
# Requirements: git, jq
# Usage:
#   ./external-skills/update.sh              # update all sources
#   ./external-skills/update.sh --id <id>    # update one source by registry id
#   ./external-skills/update.sh --dry-run    # preview without writing files

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SKILLS_DIR="$PROJECT_ROOT/.cursor/skills"
REGISTRY="$SCRIPT_DIR/registry.json"
TEMP_BASE="/tmp/pm-os-external-skills-$$"
DRY_RUN=false
FILTER_ID=""

# Marker that identifies vendored SKILL.md files. Used to detect and avoid
# double-stamping attribution headers on re-sync.
ATTRIBUTION_MARKER="<!-- pm-os:external-skill -->"

# ── helpers ────────────────────────────────────────────────────────────────

log()  { echo "  $*"; }
info() { echo "▸ $*"; }
ok()   { echo "  ✓ $*"; }
err()  { echo "  ✗ $*" >&2; }

require_git() {
  if ! command -v git &>/dev/null; then
    err "git is required but not found. Install git and try again."
    exit 1
  fi
}

require_jq() {
  if ! command -v jq &>/dev/null; then
    err "jq is required but not found."
    err "Install it: brew install jq (macOS) or apt install jq (Linux)"
    exit 1
  fi
}

# Prepend attribution header to SKILL.md if not already present.
# Extra files (e.g. STYLE_PRESETS.md) do NOT get attribution headers.
add_attribution() {
  local skill_file="$1" repo="$2" author="$3"
  if grep -q "$ATTRIBUTION_MARKER" "$skill_file" 2>/dev/null; then
    return
  fi
  local header
  header="${ATTRIBUTION_MARKER}
> **External skill** — Source: [${repo}](${repo}) by ${author}. Not maintained by prodmgmt.world. Run \`./external-skills/update.sh\` to pull the latest version.

---

"
  local tmp
  tmp=$(mktemp)
  printf '%s' "$header" | cat - "$skill_file" > "$tmp"
  mv "$tmp" "$skill_file"
}

# Update last_synced and synced_commit for a source id in registry.json.
update_registry() {
  local src_id="$1" commit="$2" today="$3"
  local tmp
  tmp=$(mktemp)
  jq --arg id "$src_id" --arg commit "$commit" --arg date "$today" \
    '(.sources[] | select(.id == $id) | .last_synced) = $date |
     (.sources[] | select(.id == $id) | .synced_commit) = $commit' \
    "$REGISTRY" > "$tmp"
  mv "$tmp" "$REGISTRY"
}

# ── per-source processing ──────────────────────────────────────────────────

process_source() {
  local i="$1"
  local src_id repo author description
  src_id=$(jq -r ".sources[$i].id"          "$REGISTRY")
  repo=$(jq -r   ".sources[$i].repo"        "$REGISTRY")
  author=$(jq -r ".sources[$i].author"      "$REGISTRY")
  description=$(jq -r ".sources[$i].description" "$REGISTRY")

  # Skip if filtering by id and this isn't the one
  if [[ -n "$FILTER_ID" && "$src_id" != "$FILTER_ID" ]]; then
    return
  fi

  info "[$src_id] $description"
  log "Repo: $repo"

  local clone_dir="$TEMP_BASE/$src_id"
  local commit="(dry-run)"
  local today
  today=$(date +%Y-%m-%d)

  if $DRY_RUN; then
    log "Would clone $repo → $clone_dir"
  else
    log "Cloning (shallow)..."
    git clone --depth=1 --quiet "$repo" "$clone_dir"
    commit=$(git -C "$clone_dir" rev-parse --short HEAD)
    log "Commit: $commit"
  fi

  local n_skills
  n_skills=$(jq ".sources[$i].skills | length" "$REGISTRY")

  for ((j = 0; j < n_skills; j++)); do
    # src: subfolder in cloned repo ("" = repo root)
    # dest: folder name under .cursor/skills/
    # Supports legacy "folder" field as fallback for both src and dest.
    local src dest filename
    src=$(jq -r      ".sources[$i].skills[$j].src  // .sources[$i].skills[$j].folder // \"\"" "$REGISTRY")
    dest=$(jq -r     ".sources[$i].skills[$j].dest // .sources[$i].skills[$j].folder"         "$REGISTRY")
    filename=$(jq -r ".sources[$i].skills[$j].filename"                                        "$REGISTRY")

    # Resolve source directory
    local src_dir
    if [[ -z "$src" || "$src" == "null" ]]; then
      src_dir="$clone_dir"
    else
      src_dir="$clone_dir/$src"
    fi

    local src_skill_file="$src_dir/$filename"
    local dest_dir="$SKILLS_DIR/$dest"
    local dest_file="$dest_dir/SKILL.md"

    if $DRY_RUN; then
      log "Would copy $src/$filename → .cursor/skills/$dest/SKILL.md"
    else
      if [[ ! -f "$src_skill_file" ]]; then
        err "Skill file not found: ${src:-<root>}/$filename — skipping $dest"
        continue
      fi
      mkdir -p "$dest_dir"
      cp "$src_skill_file" "$dest_file"
      add_attribution "$dest_file" "$repo" "$author"
      ok "Updated .cursor/skills/$dest/SKILL.md"
    fi

    # Copy any extra companion files (no attribution header added)
    local n_extra
    n_extra=$(jq ".sources[$i].skills[$j].extra_files | length" "$REGISTRY")
    for ((k = 0; k < n_extra; k++)); do
      local extra_file
      extra_file=$(jq -r ".sources[$i].skills[$j].extra_files[$k]" "$REGISTRY")
      local src_extra="$src_dir/$extra_file"

      if $DRY_RUN; then
        log "Would copy extra: ${src:-<root>}/$extra_file → .cursor/skills/$dest/$extra_file"
      else
        if [[ ! -f "$src_extra" ]]; then
          err "Extra file not found: ${src:-<root>}/$extra_file — skipping"
          continue
        fi
        cp "$src_extra" "$dest_dir/$extra_file"
        ok "Copied extra: .cursor/skills/$dest/$extra_file"
      fi
    done
  done

  if ! $DRY_RUN; then
    update_registry "$src_id" "$commit" "$today"
    ok "Registry updated (commit: $commit, date: $today)"
  fi

  echo ""
}

# ── main ───────────────────────────────────────────────────────────────────

main() {
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --dry-run) DRY_RUN=true ;;
      --id)      FILTER_ID="$2"; shift ;;
      *) err "Unknown argument: $1"; exit 1 ;;
    esac
    shift
  done

  echo ""
  echo "pm-os external skills updater"
  echo "=============================="
  $DRY_RUN && echo "(dry run — no files will be written)"
  [[ -n "$FILTER_ID" ]] && echo "(filtering to: $FILTER_ID)"
  echo ""

  require_git
  require_jq

  mkdir -p "$TEMP_BASE"
  trap 'rm -rf "$TEMP_BASE"' EXIT

  local n_sources
  n_sources=$(jq '.sources | length' "$REGISTRY")
  info "Found $n_sources source(s) in registry.json"
  echo ""

  for ((i = 0; i < n_sources; i++)); do
    process_source "$i"
  done

  echo "Done."
  echo ""
}

main "$@"

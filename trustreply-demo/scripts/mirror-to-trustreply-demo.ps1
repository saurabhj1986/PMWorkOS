# mirror-to-trustreply-demo.ps1
# -----------------------------
# Windows / PowerShell version of the mirror script. Publishes the
# trustreply-demo subfolder of saurabhj1986/PMWorkOS to the standalone repo
# saurabhj1986/trustreply-demo so Josh has a clean URL to view.
#
# WHY THIS EXISTS:
# Development happens on the `claude/setup-trustreply-demo-vbcxt` branch in
# saurabhj1986/PMWorkOS (the workspace repo). The standalone trustreply-demo
# repo is the public-facing mirror -- what you share with Josh / what Vercel
# auto-deploys from.
#
# WHAT IT DOES:
# 1. Copies the current trustreply-demo/ subfolder into a temp directory
#    (using robocopy, which is built into Windows -- no rsync needed)
# 2. Skips node_modules / dist / .git
# 3. Initializes a fresh git history with one clean "Publish" commit
# 4. Force-pushes to the standalone repo's main branch
#
# USAGE (run from inside the trustreply-demo/ folder of your local PMWorkOS clone):
#   powershell -ExecutionPolicy Bypass -File scripts\mirror-to-trustreply-demo.ps1
#
# Or, if your execution policy already allows scripts:
#   .\scripts\mirror-to-trustreply-demo.ps1
#
# IDEMPOTENT: safe to re-run any time you want to sync updates. Each run
# REPLACES the standalone repo's main branch with the current local state.
#
# REQUIREMENTS:
# - You must have push access to https://github.com/saurabhj1986/trustreply-demo
# - Git must be configured with credentials. Git for Windows includes Git
#   Credential Manager, which will pop up a browser login the first time.

$ErrorActionPreference = "Stop"

$RepoUrl = "https://github.com/saurabhj1986/trustreply-demo.git"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$SourceDir = (Resolve-Path (Join-Path $ScriptDir "..")).Path
$TmpDir = Join-Path $env:TEMP "trustreply-mirror-$(Get-Random)"

Write-Host ">> Source: $SourceDir"
Write-Host ">> Mirror staging dir: $TmpDir"
Write-Host ">> Target repo: $RepoUrl"
Write-Host ""

# Confirmation guard so nobody accidentally force-pushes
$confirm = Read-Host "This will FORCE-PUSH the current trustreply-demo/ contents to main of $RepoUrl. Continue? [y/N]"
if ($confirm -notmatch "^[Yy]$") {
    Write-Host "Aborted."
    exit 1
}

Write-Host ""
Write-Host ">> Copying source files (excluding node_modules, dist, .git)..."

New-Item -ItemType Directory -Path $TmpDir -Force | Out-Null

# robocopy is built into Windows. /E = recurse including empty dirs.
# /XD excludes directories, /XF excludes files. /NFL /NDL /NJH /NJS = quiet output.
# robocopy returns 0-7 on success, >=8 on real errors.
robocopy $SourceDir $TmpDir /E /XD node_modules dist dist-ssr .git /XF "*.local" /NFL /NDL /NJH /NJS | Out-Null
if ($LASTEXITCODE -ge 8) {
    Write-Host "robocopy failed with exit code $LASTEXITCODE"
    exit 1
}

Set-Location $TmpDir

Write-Host ">> Initializing fresh git history..."
git init -b main | Out-Null
git add .

$timestamp = [DateTime]::UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ")
$commitMessage = @"
Publish TrustReply demo

Mirror of trustreply-demo/ from saurabhj1986/PMWorkOS at $timestamp.
"@
git commit -m $commitMessage | Out-Null

Write-Host ">> Adding remote and force-pushing to main..."
git remote add origin $RepoUrl
git push -f origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Push failed. If this is an auth error, the easiest fix is:"
    Write-Host "  1. Install GitHub CLI: winget install --id GitHub.cli"
    Write-Host "  2. Run: gh auth login"
    Write-Host "  3. Re-run this script."
    exit 1
}

Write-Host ""
Write-Host ">> Mirror push complete."
Write-Host ">> View it: https://github.com/saurabhj1986/trustreply-demo"
Write-Host ""
Write-Host ">> Cleaning up temp dir: $TmpDir"
Set-Location $env:TEMP
Remove-Item -Recurse -Force $TmpDir

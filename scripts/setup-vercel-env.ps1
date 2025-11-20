param()

if (-not $env:VERCEL_TOKEN) {
    Write-Host "ERROR: Please set environment variable VERCEL_TOKEN before running this script." -ForegroundColor Red
    Write-Host "You can create a token at https://vercel.com/account/tokens and then set it in this PowerShell session before running this script." -ForegroundColor Yellow
    exit 1
}

$vars = @(
    "LINE_CHANNEL_SECRET",
    "LINE_CHANNEL_ACCESS_TOKEN",
    "NEXT_PUBLIC_LIFF_ID",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY"
)

Write-Host "This script will help you add environment variables to your Vercel project." -ForegroundColor Green
Write-Host "It will run interactive 'vercel env add' commands; paste values when prompted." -ForegroundColor Yellow
Write-Host "Make sure you run this from your project root (where vercel.json / package.json are)." -ForegroundColor Yellow

foreach ($v in $vars) {
    Write-Host "\nAdding env var: $v (production scope)" -ForegroundColor Cyan
    Write-Host 'If you do not have a value, just press Enter to skip.' -ForegroundColor DarkYellow
    # vercel env add <name> production
    & npx vercel env add $v production --token $env:VERCEL_TOKEN
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Command returned exit code $LASTEXITCODE (you may need to run interactively)" -ForegroundColor Red
    }
}

Write-Host "Done. After adding, redeploy the project (use ./scripts/deploy-vercel.ps1)." -ForegroundColor Green

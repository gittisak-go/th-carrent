param()

if (-not $env:VERCEL_TOKEN) {
    Write-Host "ERROR: Please set environment variable VERCEL_TOKEN before running this script." -ForegroundColor Red
    Write-Host "You can create a token at https://vercel.com/account/tokens and then run:`$env:VERCEL_TOKEN='your_token'`" -ForegroundColor Yellow
  exit 1
}

Write-Host "Using VERCEL_TOKEN from environment. Starting deployment..." -ForegroundColor Green

# Deploy to Vercel production (non-interactive)
Write-Host 'Running deployment command: npx vercel --prod --confirm (using provided VERCEL_TOKEN)' -ForegroundColor Cyan
& npx vercel --token $env:VERCEL_TOKEN --prod --confirm

if ($LASTEXITCODE -ne 0) {
  Write-Host "Vercel deploy command failed (exit $LASTEXITCODE)." -ForegroundColor Red
  Write-Host "You may need to run 'npx vercel login' interactively or check your token." -ForegroundColor Yellow
  exit $LASTEXITCODE
}

Write-Host "Deployment finished. If you need to add environment variables, run scripts/setup-vercel-env.ps1" -ForegroundColor Green

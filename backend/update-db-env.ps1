# Run this after getting TiDB Cloud credentials:
# powershell -ExecutionPolicy Bypass .\update-db-env.ps1
# Then it auto-redeploys the backend.

param(
  [string]$Host     = "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
  [string]$User     = "REPLACE",
  [string]$Password = "REPLACE",
  [string]$Port     = "4000"
)

Write-Host "Updating database environment variables on Vercel..."
cd "M:\projects\Websites\portfolio\backend"

echo $Host     | vercel env add DB_HOST     production --force 2>&1 | Select-Object -Last 1
echo $User     | vercel env add DB_USER     production --force 2>&1 | Select-Object -Last 1
echo $Password | vercel env add DB_PASSWORD production --force 2>&1 | Select-Object -Last 1
echo $Port     | vercel env add DB_PORT     production --force 2>&1 | Select-Object -Last 1

Write-Host "Redeploying backend..."
vercel --yes --prod 2>&1 | Select-Object -Last 5

Write-Host "Done! Test: https://portfolio-api-lilac-six.vercel.app/api/health"

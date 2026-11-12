# Run this once to push all env vars to Vercel backend project
# Usage: cd backend; powershell -ExecutionPolicy Bypass .\set-env.ps1

$vars = @{
  "NODE_ENV"      = "production"
  "JWT_SECRET"    = "eyaderaddis_portfolio_jwt_secret_change_this_in_production_2026"
  "JWT_EXPIRES_IN"= "7d"
  "EMAIL_USER"    = "Eyaderaddisbelete@gmail.com"
  "EMAIL_PASS"    = "selutgcphndrLgvy"
  "ADMIN_EMAIL"   = "Eyaderaddisbelete@gmail.com"
  "CLIENT_URL"    = "https://portfolio-eyaderaddis.vercel.app"
  "DB_NAME"       = "portfolio"
  "DB_PORT"       = "4000"
  # TiDB Cloud values — fill in after creating cluster:
  "DB_HOST"       = "REPLACE_WITH_TIDB_HOST"
  "DB_USER"       = "REPLACE_WITH_TIDB_USER"
  "DB_PASSWORD"   = "REPLACE_WITH_TIDB_PASSWORD"
}

foreach ($key in $vars.Keys) {
  $val = $vars[$key]
  Write-Host "Setting $key ..."
  echo $val | vercel env add $key production --force 2>&1
}
Write-Host "Done! Redeploy with: vercel --prod --yes"

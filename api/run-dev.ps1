Write-Host "==========================================================="
Write-Host "DEV STARTER for API (Node 22)"
Write-Host "==========================================================="

# ép PATH để Nest CLI và các tiến trình con dùng Node 22 local
$env:Path = "E:\code\thecfh\api\node-v22.21.0-win-x64\node-v22.21.0-win-x64;" + $env:Path

# chạy NestJS CLI bằng Node 22
& "E:\code\thecfh\api\node-v22.21.0-win-x64\node-v22.21.0-win-x64\node.exe" node_modules/@nestjs/cli/bin/nest.js start --watch

$ErrorActionPreference = 'Stop'

# Find the absolute path to this script's directory
$PSScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Compiling ConsoleClient.java..." -ForegroundColor Cyan
# Compile the ConsoleClient class. It doesn't rely on Spring so it can be compiled separately for simplicity.
# We output it to the target/classes directory which we will reuse
$srcPath = Join-Path $PSScriptRoot "src\main\java\com\smallbiz\inventory\client\ConsoleClient.java"
$outDir = Join-Path $PSScriptRoot "target\classes"

# Ensure output directory exists
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir | Out-Null
}

javac -d $outDir $srcPath

if ($LASTEXITCODE -ne 0) {
    Write-Host "Compilation failed." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "Compilation successful. Starting client..." -ForegroundColor Green
Write-Host "Make sure the Spring Boot server is already running on localhost:8080." -ForegroundColor Yellow
Write-Host ""

# Run the compiled client
java -cp $outDir com.smallbiz.inventory.client.ConsoleClient

Write-Host "`nClient has disconnected." -ForegroundColor Cyan

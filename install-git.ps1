# Snake Game Pro - Git Installation Script
# For @TimurPanin

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Installing Git for Snake Game Pro" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is already installed
try {
    $gitVersion = git --version 2>$null
    if ($gitVersion) {
        Write-Host "✓ Git is already installed: $gitVersion" -ForegroundColor Green
        Write-Host ""
        Write-Host "You can now run: upload-to-github.bat" -ForegroundColor Yellow
        Read-Host "Press Enter to continue"
        exit 0
    }
} catch {
    # Git not found, continue with installation
}

Write-Host "Git is not installed. Attempting to install..." -ForegroundColor Yellow
Write-Host ""

# Try to install Git using winget (Windows Package Manager)
try {
    Write-Host "Attempting to install Git using winget..." -ForegroundColor Cyan
    winget install --id Git.Git -e --source winget
    Write-Host "✓ Git installed successfully using winget!" -ForegroundColor Green
} catch {
    Write-Host "winget installation failed. Manual installation required." -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Git manually:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://git-scm.com/downloads" -ForegroundColor White
    Write-Host "2. Download and install Git for Windows" -ForegroundColor White
    Write-Host "3. Run this script again after installation" -ForegroundColor White
    Write-Host ""
    
    # Open Git download page
    Start-Process "https://git-scm.com/downloads"
    
    Read-Host "Press Enter after installing Git"
}

# Verify installation
try {
    $gitVersion = git --version 2>$null
    if ($gitVersion) {
        Write-Host "✓ Git installation verified: $gitVersion" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "1. Run: upload-to-github.bat" -ForegroundColor White
        Write-Host "2. Follow the instructions to upload to GitHub" -ForegroundColor White
    } else {
        Write-Host "✗ Git installation verification failed" -ForegroundColor Red
        Write-Host "Please restart your terminal and try again" -ForegroundColor Yellow
    }
} catch {
    Write-Host "✗ Git installation verification failed" -ForegroundColor Red
    Write-Host "Please restart your terminal and try again" -ForegroundColor Yellow
}

Read-Host "Press Enter to exit"


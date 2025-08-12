# Snake Game Pro - GitHub Upload Script
# For @TimurPanin

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Snake Game Pro - GitHub Upload" -ForegroundColor Cyan
Write-Host "    For @TimurPanin" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Git installation
try {
    $gitVersion = git --version 2>$null
    if ($gitVersion) {
        Write-Host "✓ Git is available: $gitVersion" -ForegroundColor Green
    } else {
        Write-Host "✗ Git is not available" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
} catch {
    Write-Host "✗ Git is not available" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[1/8] Setting up Git configuration..." -ForegroundColor Yellow
try {
    git config --global user.name "Timur Panin"
    git config --global user.email "timur.panin@example.com"
    Write-Host "✓ Git configured" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to configure Git" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[2/8] Initializing Git repository..." -ForegroundColor Yellow
try {
    git init
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to initialize Git repository" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[3/8] Adding files to Git..." -ForegroundColor Yellow
try {
    git add .
    Write-Host "✓ Files added to Git" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to add files" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[4/8] Creating initial commit..." -ForegroundColor Yellow
try {
    git commit -m "Initial commit: Snake Game Pro with React - Modern architecture with hooks, components, and power-ups"
    Write-Host "✓ Initial commit created" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to create commit" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[5/8] Setting up main branch..." -ForegroundColor Yellow
try {
    git branch -M main
    Write-Host "✓ Main branch set" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to set main branch" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[6/8] Opening GitHub repository creation page..." -ForegroundColor Yellow
try {
    Start-Process "https://github.com/new"
    Write-Host "✓ GitHub page opened" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to open GitHub page" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    NEXT STEPS REQUIRED:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Create a new repository on GitHub:" -ForegroundColor White
Write-Host "   - Repository name: snake-game-pro" -ForegroundColor Gray
Write-Host "   - Description: Modern Snake game built with React, featuring multiple game modes, power-ups, and advanced architecture" -ForegroundColor Gray
Write-Host "   - Make it Public" -ForegroundColor Gray
Write-Host "   - DON'T initialize with README, .gitignore, or license" -ForegroundColor Gray
Write-Host "   - Click 'Create repository'" -ForegroundColor Gray
Write-Host ""
Write-Host "2. After creating the repository, run these commands:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/TimurPanin/snake-game-pro.git" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Optional: Add a tag for the first release:" -ForegroundColor White
Write-Host "   git tag -a v1.0.0 -m `"First release: Snake Game Pro`"" -ForegroundColor Gray
Write-Host "   git push origin v1.0.0" -ForegroundColor Gray
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✓ Local Git setup completed successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

Read-Host "Press Enter to continue"

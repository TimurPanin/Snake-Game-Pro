@echo off
echo ========================================
echo    Snake Game Pro - GitHub Upload
echo    For @TimurPanin
echo ========================================
echo.

echo [1/6] Setting up Git configuration...
git config --global user.name "Timur Panin"
git config --global user.email "timur.panin@example.com"
echo ✓ Git configured

echo.
echo [2/6] Initializing Git repository...
git init
echo ✓ Git repository initialized

echo.
echo [3/6] Adding files to Git...
git add .
echo ✓ Files added to Git

echo.
echo [4/6] Creating initial commit...
git commit -m "Initial commit: Snake Game Pro with React - Modern architecture with hooks, components, and power-ups"
echo ✓ Initial commit created

echo.
echo [5/6] Setting up main branch...
git branch -M main
echo ✓ Main branch set

echo.
echo [6/6] Opening GitHub repository creation page...
start https://github.com/new
echo ✓ GitHub page opened

echo.
echo ========================================
echo    NEXT STEPS REQUIRED:
echo ========================================
echo.
echo 1. Create a new repository on GitHub:
echo    - Repository name: snake-game-pro
echo    - Description: Modern Snake game built with React, featuring multiple game modes, power-ups, and advanced architecture
echo    - Make it Public
echo    - DON'T initialize with README, .gitignore, or license
echo    - Click "Create repository"
echo.
echo 2. After creating the repository, run these commands:
echo    git remote add origin https://github.com/TimurPanin/snake-game-pro.git
echo    git push -u origin main
echo.
echo 3. Optional: Add a tag for the first release:
echo    git tag -a v1.0.0 -m "First release: Snake Game Pro"
echo    git push origin v1.0.0
echo.
echo ========================================
echo ✓ Local Git setup completed successfully!
echo ========================================
pause

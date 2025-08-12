@echo off
echo ========================================
echo    Snake Game Pro - GitHub Upload
echo    For @TimurPanin
echo ========================================
echo.

echo [1/8] Checking Git installation...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not available in PATH
    echo Please restart your terminal/command prompt
    echo or run: install-git.ps1
    pause
    exit /b 1
)
echo ✓ Git is available

echo.
echo [2/8] Setting up Git configuration...
echo Configuring Git for Timur Panin...
git config --global user.name "Timur Panin"
git config --global user.email "timur.panin@example.com"
echo ✓ Git configured

echo.
echo [3/8] Initializing Git repository...
git init
if %errorlevel% neq 0 (
    echo ERROR: Failed to initialize Git repository
    pause
    exit /b 1
)
echo ✓ Git repository initialized

echo.
echo [4/8] Adding files to Git...
git add .
if %errorlevel% neq 0 (
    echo ERROR: Failed to add files
    pause
    exit /b 1
)
echo ✓ Files added to Git

echo.
echo [5/8] Creating initial commit...
git commit -m "Initial commit: Snake Game Pro with React - Modern architecture with hooks, components, and power-ups"
if %errorlevel% neq 0 (
    echo ERROR: Failed to create commit
    pause
    exit /b 1
)
echo ✓ Initial commit created

echo.
echo [6/8] Setting up main branch...
git branch -M main
if %errorlevel% neq 0 (
    echo ERROR: Failed to set main branch
    pause
    exit /b 1
)
echo ✓ Main branch set

echo.
echo [7/8] Opening GitHub repository creation page...
echo Opening: https://github.com/new
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


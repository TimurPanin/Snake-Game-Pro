@echo off
echo ========================================
echo    Snake Game Pro - GitHub Upload
echo    For @TimurPanin
echo ========================================
echo.

echo [1/7] Checking Git installation...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Git is not installed. Installing Git...
    echo Please download Git from: https://git-scm.com/downloads
    echo After installation, run this script again.
    echo.
    echo Opening Git download page...
    start https://git-scm.com/downloads
    pause
    exit /b 1
)
echo ✓ Git is installed

echo.
echo [2/7] Setting up Git configuration...
echo Please enter your Git configuration:
set /p GIT_NAME="Enter your name (e.g., Timur Panin): "
set /p GIT_EMAIL="Enter your email: "

git config --global user.name "%GIT_NAME%"
git config --global user.email "%GIT_EMAIL%"
echo ✓ Git configured

echo.
echo [3/7] Initializing Git repository...
git init
if %errorlevel% neq 0 (
    echo ERROR: Failed to initialize Git repository
    pause
    exit /b 1
)
echo ✓ Git repository initialized

echo.
echo [4/7] Adding files to Git...
git add .
if %errorlevel% neq 0 (
    echo ERROR: Failed to add files
    pause
    exit /b 1
)
echo ✓ Files added to Git

echo.
echo [5/7] Creating initial commit...
git commit -m "Initial commit: Snake Game Pro with React - Modern architecture with hooks, components, and power-ups"
if %errorlevel% neq 0 (
    echo ERROR: Failed to create commit
    pause
    exit /b 1
)
echo ✓ Initial commit created

echo.
echo [6/7] Setting up main branch...
git branch -M main
if %errorlevel% neq 0 (
    echo ERROR: Failed to set main branch
    pause
    exit /b 1
)
echo ✓ Main branch set

echo.
echo ========================================
echo    NEXT STEPS REQUIRED:
echo ========================================
echo.
echo 1. Create a new repository on GitHub:
echo    - Go to: https://github.com/new
echo    - Name: snake-game-pro
echo    - Description: Modern Snake game built with React, featuring multiple game modes, power-ups, and advanced architecture
echo    - Make it Public
echo    - DON'T initialize with README, .gitignore, or license
echo.
echo 2. After creating the repository, run:
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


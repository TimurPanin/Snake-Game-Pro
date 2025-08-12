@echo off
echo ========================================
echo    Snake Game Pro - GitHub Upload
echo ========================================
echo.

echo [1/6] Checking Git installation...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/downloads
    pause
    exit /b 1
)
echo ✓ Git is installed

echo.
echo [2/6] Initializing Git repository...
git init
if %errorlevel% neq 0 (
    echo ERROR: Failed to initialize Git repository
    pause
    exit /b 1
)
echo ✓ Git repository initialized

echo.
echo [3/6] Adding files to Git...
git add .
if %errorlevel% neq 0 (
    echo ERROR: Failed to add files
    pause
    exit /b 1
)
echo ✓ Files added to Git

echo.
echo [4/6] Creating initial commit...
git commit -m "Initial commit: Snake Game Pro with React - Modern architecture with hooks, components, and power-ups"
if %errorlevel% neq 0 (
    echo ERROR: Failed to create commit
    pause
    exit /b 1
)
echo ✓ Initial commit created

echo.
echo [5/6] Setting up main branch...
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
echo    - Description: Modern Snake game built with React
echo    - Make it Public or Private
echo    - DON'T initialize with README, .gitignore, or license
echo.
echo 2. After creating the repository, run:
echo    git remote add origin https://github.com/YOUR_USERNAME/snake-game-pro.git
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


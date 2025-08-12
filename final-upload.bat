@echo off
echo ========================================
echo    Final Upload to GitHub @TimurPanin
echo ========================================
echo.

echo [1/3] Adding remote origin...
git remote add origin https://github.com/TimurPanin/snake-game-pro.git
echo ✓ Remote origin added

echo.
echo [2/3] Pushing to GitHub...
git push -u origin main
echo ✓ Code pushed to GitHub

echo.
echo [3/3] Adding release tag...
git tag -a v1.0.0 -m "First release: Snake Game Pro"
git push origin v1.0.0
echo ✓ Release tag added

echo.
echo ========================================
echo    SUCCESS! Project uploaded to GitHub
echo ========================================
echo.
echo Repository: https://github.com/TimurPanin/snake-game-pro
echo Demo: https://timurpanin.github.io/snake-game-pro/
echo.
echo ========================================
pause

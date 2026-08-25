@echo off
title E-Cell UIET KUK Build Production Bundle
cd /d "%~dp0"
cls

echo =================================================================
echo        E-CELL UIET KUK - BUILDING PRODUCTION DIST BUNDLE
echo =================================================================
echo.

call npm run vite -- build

echo.
echo Build finished! Production dist folder is ready at %~dp0dist
pause

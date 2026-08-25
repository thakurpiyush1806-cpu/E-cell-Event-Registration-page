@echo off
title E-Cell UIET KUK Startup Pitch Competition Portal
cd /d "%~dp0"
cls

echo =================================================================
echo        E-CELL UIET KUK - STARTUP PITCH COMPETITION PORTAL
echo =================================================================
echo.
echo  Starting Express Backend API (3001) ^& React Frontend (3000)...
echo  Opening http://localhost:3000 in your browser...
echo.

start "" "http://localhost:3000"

call npm run dev

pause

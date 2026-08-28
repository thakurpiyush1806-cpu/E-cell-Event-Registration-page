@echo off
title E-Cell UIET KUK Startup Pitch Competition Portal
cd /d "%~dp0"
cls

echo =================================================================
echo        E-CELL UIET KUK - STARTUP PITCH COMPETITION PORTAL
echo =================================================================
echo.
echo  Starting Express Backend API (8081) ^& React Frontend (8080)...
echo  Opening http://localhost:8080 in your browser...
echo.

start "" "http://localhost:8080"

call npm run dev

pause

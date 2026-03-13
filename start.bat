@echo off
cd /d "%~dp0"
set PORT=8080
echo PMAS — zapusk na http://localhost:%PORT%
echo Dlya ostanovki nazhmite Ctrl+C
start http://localhost:%PORT%
python -m http.server %PORT%

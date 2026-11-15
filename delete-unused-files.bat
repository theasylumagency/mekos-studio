@echo off
rem Removes files the Meko's Studio site no longer uses. Double-click to run; it deletes itself when done.
cd /d "%~dp0"
echo.
echo Removing files the site no longer uses...
echo.
if exist "public\file.svg" (del /q "public\file.svg" && echo   deleted public\file.svg)
if exist "public\globe.svg" (del /q "public\globe.svg" && echo   deleted public\globe.svg)
if exist "public\next.svg" (del /q "public\next.svg" && echo   deleted public\next.svg)
if exist "public\vercel.svg" (del /q "public\vercel.svg" && echo   deleted public\vercel.svg)
if exist "public\window.svg" (del /q "public\window.svg" && echo   deleted public\window.svg)
if exist "public\studio\studio-film.mp4" (del /q "public\studio\studio-film.mp4" && echo   deleted public\studio\studio-film.mp4)
if exist "public\studio\space-formation-1.webp" (del /q "public\studio\space-formation-1.webp" && echo   deleted public\studio\space-formation-1.webp)
if exist "public\studio\banners\material-hero-mobile-9x16.webp" (del /q "public\studio\banners\material-hero-mobile-9x16.webp" && echo   deleted public\studio\banners\material-hero-mobile-9x16.webp)
if exist "public\studio\icon-32.png" (del /q "public\studio\icon-32.png" && echo   deleted public\studio\icon-32.png)
if exist "public\studio\icon-192.png" (del /q "public\studio\icon-192.png" && echo   deleted public\studio\icon-192.png)
if exist "public\studio\apple-touch-icon.png" (del /q "public\studio\apple-touch-icon.png" && echo   deleted public\studio\apple-touch-icon.png)
if exist "src\components\studio-film.tsx" (del /q "src\components\studio-film.tsx" && echo   deleted src\components\studio-film.tsx)
if exist "_backup-before-redesign" (rmdir /s /q "_backup-before-redesign" && echo   deleted _backup-before-redesign\)
if exist ".next\cache\images" (rmdir /s /q ".next\cache\images" && echo   cleared .next\cache\images ^(old optimised images^))
echo.
echo Done. old-site was left untouched.
pause
(goto) 2>nul & del "%~f0"

@echo off
echo ===================================================
echo 🔄 Freight CRM - Auto Restart & Fix Tool
echo ===================================================

echo.
echo [1/4] Stopping running Node.js processes (cleaning ports)...
taskkill /F /IM node.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo    ✅ Processes stopped.
) else (
    echo    ℹ️  No active processes found.
)

echo.
echo [2/4] Regenerating Prisma Client (Fixing Database Sync)...
call npx prisma generate
if %errorlevel% neq 0 (
    echo    ❌ Error generating Prisma Client.
    pause
    exit /b %errorlevel%
)
echo    ✅ Prisma Client generated.

echo.
echo [3/4] Pushing Schema to Database...
call npx prisma db push
if %errorlevel% neq 0 (
    echo    ❌ Error pushing DB changes.
    pause
    exit /b %errorlevel%
)
echo    ✅ Database synced.

echo.
echo [4/4] Starting Development Server...
echo    🚀 Server starting at http://localhost:3000
echo.

npm run dev

@echo off
REM KBI Project Deployment Initialization Script
REM أسكريبت إعداد النشر التلقائي

echo.
echo ========================================
echo KBI Project - Cloudflare Pages Setup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Download from: https://nodejs.org
    pause
    exit /b 1
)

REM Check if Git is installed
where git >nul 2>nul
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Download from: https://git-scm.com
    pause
    exit /b 1
)

echo ✓ Node.js found: 
node --version

echo ✓ Git found:
git --version

echo.
echo ========================================
echo Step 1: Install Dependencies
echo ========================================
echo.

call npm install
if errorlevel 1 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Step 2: Generate Prisma Client
echo ========================================
echo.

call npx prisma generate
if errorlevel 1 (
    echo ERROR: Prisma generation failed!
    echo Make sure DATABASE_URL is set in .env.local
    pause
    exit /b 1
)

echo.
echo ========================================
echo Step 3: Build Test
echo ========================================
echo.

call npm run build
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✓ SETUP COMPLETE!
echo ========================================
echo.
echo Next Steps:
echo 1. Create GitHub account: https://github.com/signup
echo 2. Create Cloudflare account: https://dash.cloudflare.com
echo 3. Create Turso account: https://turso.tech
echo 4. Follow DEPLOYMENT-GUIDE-AR.md
echo.
echo Files created:
echo   - .gitignore
echo   - .env.example
echo   - .github/workflows/deploy.yml
echo   - wrangler.toml
echo   - vercel.json
echo   - DEPLOYMENT-GUIDE-AR.md
echo   - README-DEPLOYMENT.md
echo   - TROUBLESHOOTING.md
echo.
echo Ready to deploy! 🚀
echo.

pause

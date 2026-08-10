#!/bin/bash
# KBI Project Deployment Initialization Script
# أسكريبت إعداد النشر التلقائي (macOS/Linux)

set -e

echo ""
echo "========================================"
echo "KBI Project - Cloudflare Pages Setup"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Download from: https://nodejs.org"
    exit 1
fi

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "ERROR: Git is not installed!"
    echo "Download from: https://git-scm.com"
    exit 1
fi

echo "✓ Node.js found:"
node --version

echo "✓ Git found:"
git --version

echo ""
echo "========================================"
echo "Step 1: Install Dependencies"
echo "========================================"
echo ""

npm install

echo ""
echo "========================================"
echo "Step 2: Generate Prisma Client"
echo "========================================"
echo ""

npx prisma generate

echo ""
echo "========================================"
echo "Step 3: Build Test"
echo "========================================"
echo ""

npm run build

echo ""
echo "========================================"
echo "✓ SETUP COMPLETE!"
echo "========================================"
echo ""
echo "Next Steps:"
echo "1. Create GitHub account: https://github.com/signup"
echo "2. Create Cloudflare account: https://dash.cloudflare.com"
echo "3. Create Turso account: https://turso.tech"
echo "4. Follow DEPLOYMENT-GUIDE-AR.md"
echo ""
echo "Files created:"
echo "   - .gitignore"
echo "   - .env.example"
echo "   - .github/workflows/deploy.yml"
echo "   - wrangler.toml"
echo "   - vercel.json"
echo "   - DEPLOYMENT-GUIDE-AR.md"
echo "   - README-DEPLOYMENT.md"
echo "   - TROUBLESHOOTING.md"
echo ""
echo "Ready to deploy! 🚀"
echo ""

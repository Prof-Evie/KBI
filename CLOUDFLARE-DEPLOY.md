# Cloudflare Pages Deployment Fixes

## لماذا فشل النشر؟

الخطأ جاء من `wrangler deploy` لأن هذا الأمر ينتظر Worker script أو assets directory.
هذا المشروع هو مشروع Next.js تم بناؤه ليعمل كـ standalone محتوى وليس كـ Worker.

## الحل الصحيح

### 1. استخدام الأمر الصحيح للنشر:
```bash
npx wrangler pages deploy .next/standalone --project-name=kbi --branch=main
```

### 2. تعديل `wrangler.toml`
أضفنا تعريف [site] حتى يتعرف Wrangler على مجلد النشر.

### 3. عدم استخدام `type = "javascript"` و `build.upload`
هذه الحقول غير متوافقة مع إعدادات Pages.

### 4. إذا استخدمت GitHub Actions:
تأكد من أن خطوة النشر تستخدم `pages deploy` وليس `wrangler deploy`.

## الملاحظات
- `wrangler pages deploy` مخصص لتحميل محتوى Pages
- `wrangler deploy` مخصص لـ Workers

## التعليمات الجديدة
- إذا كنت ترغب في نشر يدويًا:
  ```bash
  npm run build
  npx wrangler pages deploy .next/standalone --project-name=kbi --branch=main
  ```
- إذا كنت تريد CI/CD، استخدم GitHub Actions مع Cloudflare Pages API token.
<<<<<<< HEAD
=======
## النشر التلقائي مع GitHub Actions
أنشئ الملف التالي لتفعيل النشر عند كل دفع إلى الفرع `main`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Deploy to Cloudflare Pages
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
        run: npx wrangler pages deploy .next/standalone --project-name=kbi --branch=main
```

> تأكد من إضافة السر `CLOUDFLARE_API_TOKEN` في إعدادات GitHub repository secrets.
>>>>>>> 34435f93 (Setup Cloudflare deployment)

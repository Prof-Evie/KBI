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

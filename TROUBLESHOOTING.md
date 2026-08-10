# بدائل و خطط الطوارئ 🆘
# Alternatives & Backup Plans

## ❌ إذا لم يعمل الـ GitHub Deployment

### البديل 1: Direct Upload من Cloudflare CLI

```bash
# 1. ثبت Wrangler CLI
npm install -g wrangler

# 2. تسجيل الدخول
wrangler login

# 3. بناء المشروع
npm run build

# 4. رفع مباشرة
wrangler pages deploy .next/standalone
```

---

## ❌ إذا كانت Turso بطيئة

### البديل 1: Neon (PostgreSQL مجاني)

```bash
# 1. اذهب إلى https://neon.tech
# 2. أنشئ قاعدة بيانات PostgreSQL
# 3. في prisma/schema.prisma غيّّر:

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

# 4. شغل:
npx prisma db push
```

### البديل 2: Planetscale (MySQL مجاني)

```bash
# 1. اذهب إلى https://planetscale.com
# 2. أنشئ قاعدة بيانات MySQL
# 3. في prisma/schema.prisma غيّّ:

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

---

## ❌ إذا فشل الـ Build

### الحل الأول:
```bash
# 1. اختبر locally أولاً
cd d:\KBI\KBI
npm install
npm run build

# اگر عملت كويس هنا، المشكلة في Cloudflare settings
```

### الحل الثاني - Clear Build Cache:
```bash
# في Cloudflare Pages dashboard:
1. اختر project
2. اضغط "Settings"
3. اختر "Build cache"
4. اضغط "Clear cache"
5. أعد النشر
```

### الحل الثالث - Check Logs:
```bash
# في Cloudflare Pages:
1. اضغط "Builds" tab
2. اختر آخر build
3. اضغط "View build log"
4. ابحث عن الخطأ (حمراء)
```

---

## ❌ إذا كان Deployment بطيء

### الحل:

```bash
# 1. تقليل حجم dependencies:
npm prune --production

# 2. استخدم npm ci بدل npm install:
# (أسرع في CI/CD)

# 3. أضف caching في workflow:
```

---

## ❌ إذا أردت Rollback

### العودة لنسخة سابقة:

```bash
# 1. في Cloudflare Pages
# 2. اضغط "Deployments"
# 3. اختر deployment قديم
# 4. اضغط "Rollback" 
```

أو من Git:
```bash
git log  # شوف الـ commits
git revert COMMIT_ID
git push origin main
# Cloudflare هتعيد النشر تلقائياً
```

---

## ✅ Checklist للنشر الناجح

- [ ] GitHub account تم إنشاؤه
- [ ] Repository تم رفعه (git push)
- [ ] Turso account تم إنشاءه
- [ ] DATABASE_URL تم نسخه بشكل صحيح
- [ ] .env.local موجود locally
- [ ] `npm run build` تشتغل بنجاح
- [ ] Cloudflare account تم إنشاءه
- [ ] GitHub متصل مع Cloudflare
- [ ] متغيرات البيئة تمت إضافتها
- [ ] الـ deployment اكتمل بنجاح ✅
- [ ] الموقع يفتح: `kbi.pages.dev`

---

## 🔧 Commands مفيدة للـ Debugging

```bash
# شيك version Node.js
node --version

# شيك npm version
npm --version

# شيك إذا Prisma موجود
npx prisma --version

# شيك DATABASE_URL
echo %DATABASE_URL%  # Windows
echo $DATABASE_URL   # Mac/Linux

# اختبر Database connection
npx prisma db execute --stdin
# ثم ادخل: SELECT 1;

# List كل Turso databases
turso db list

# شيك logs من بناء محلي
npm run build 2>&1 | head -50
```

---

## 📞 Contacts للدعم

| المشكلة | الدعم |
|--------|-------|
| مشاكل Cloudflare | https://support.cloudflare.com |
| مشاكل Turso | https://turso.tech/support |
| مشاكل Next.js | https://github.com/vercel/next.js/issues |
| مشاكل Prisma | https://github.com/prisma/prisma/issues |

---

**آخر تحديث:** August 10, 2026

## 🚀 خطوات النشر السريعة (Quick Start)

### الخطوة 1️⃣: رفع الكود على GitHub (5 دقائق)

**أولاً - افتح Terminal في المشروع:**
```bash
cd d:\KBI\KBI
git init
git add .
git commit -m "KBI Project - Ready for Cloudflare"
git branch -M main
```

**ثم انسخ رابط GitHub الجديد وشغل:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/KBI.git
git push -u origin main
```

> ⚠️ اذا كان لديك مستودع بالفعل، استخدم `git push` فقط

---

### الخطوة 2️⃣: إنشاء قاعدة بيانات Turso (3 دقائق)

```bash
# 1. ثبت Turso (Windows)
winget install tursodatabase.turso

# 2. تسجيل الدخول
turso auth login

# 3. إنشاء قاعدة بيانات جديدة
turso db create kbi-db

# 4. الحصول على رابط الاتصال
turso db tokens create kbi-db --expiration never
```

**النتيجة ستكون شيء مثل:**
```
libsql://kbi-db-USERNAME.turso.io?authToken=XXXXXXXXXXXXXXXX
```

**انسخ هذا الرابط - ستحتاجه قريباً!** 💾

---

### الخطوة 3️⃣: دفع قاعدة البيانات Locally (2 دقائق)

```bash
# في Terminal
cd d:\KBI\KBI

# 1. أضف DATABASE_URL إلى .env.local
# (اختر Text Editor وافتح ملف جديد يسمى .env.local)

DATABASE_URL="libsql://kbi-db-USERNAME.turso.io?authToken=XXXXXXXXXXXXXXXX"
NODE_ENV=production

# 2. احفظ الملف في folder المشروع الرئيسي

# 3. شغل من Terminal:
npm install
npx prisma generate
npx prisma db push
```

---

### الخطوة 4️⃣: إنشاء حساب Cloudflare & نشر (3 دقائق)

**1. اذهب إلى:** https://dash.cloudflare.com

**2. اختر "Pages" من القائمة اليسرى**

**3. اضغط "Create a project"**

**4. اختر "Connect to Git"**

**5. وصّل GitHub:**
- سيفتح GitHub ويطلب permissions
- اضغط Authorize
- اختر الـ KBI repository

**6. إعدادات البناء:**
```
Framework preset: None (Manual setup)
Build command: npm run build
Build output directory: .next/standalone
Root directory: /
Node.js version: 20.x
```

**7. متغيرات البيئة:**
- اضغط "Add environment variable"
- أضف:
```
DATABASE_URL = libsql://kbi-db-USERNAME.turso.io?authToken=XXXXXXXXXXXXXXXX
NODE_ENV = production
```

**8. اضغط Deploy!**
- انتظر 2-5 دقائق
- سيعطيك رابط مثل: `kbi-12345.pages.dev` ✅

---

### الخطوة 5️⃣: اختبر الموقع (1 دقيقة)

بعد انتهاء الـ deployment:
```
https://kbi-XXXXX.pages.dev
```

✅ إذا شفت الموقع يعمل = نجح النشر!

---

## 📝 اختياري: إضافة نطاق خاص

### if you have a domain:

1. **في Cloudflare Pages:**
   - اختر project → Custom domains
   - أضف `yourdomain.com`
   
2. **وجّه ـالـ DNS:**
   - Cloudflare هيعطيك nameservers
   - اذهب إلى registrar (GoDaddy, Namecheap, إلخ)
   - غيّر الـ nameservers

### or استخدم نطاق ثانوي مجاني:

```
kbi.cf      (مجاني من Cloudflare)
kbi.ga      (مجاني من Cloudflare)
```

---

## ⚠️ Troubleshooting

| المشكلة | الحل |
|--------|------|
| Build failed | شف الـ logs في Cloudflare → "View builds" |
| Database connection error | تحقق `DATABASE_URL` صحيح في Cloudflare |
| Blank page | تأكد `npm run build` تشتغل locally |
| CORS errors | أضف headers في `next.config.ts` |

---

## 🎯 النتيجة النهائية:

✅ **موقعك يعمل على:**
- `https://kbi.pages.dev` 
- أو نطاقك الخاص

✅ **قاعدة البيانات مؤمنة في:**
- Turso (مجاني + موثوق)

✅ **Deployment تلقائي:**
- كل push إلى GitHub = automatic deploy

✅ **HTTPS و CDN مجانية من Cloudflare** 🔒

---

## 📞 احتجت مساعدة؟

```
Cloudflare Pages Docs: https://developers.cloudflare.com/pages/
Turso Getting Started: https://docs.turso.tech/quickstart
Next.js + Cloudflare: https://nextjs.org/docs/pages/building-your-application/deploying
```

---

**تم إعداده:** August 10, 2026 ✅
**حالة:** جاهز للـ deployment 🚀

# خطوات النشر على Cloudflare - دليل كامل 🚀

## المرحلة 1️⃣: إعداد GitHub

### 1. إنشاء مستودع GitHub:
```bash
git init
git add .
git commit -m "Initial commit - KBI Project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/KBI.git
git push -u origin main
```

### 2. إذا كان لديك مستودع بالفعل:
```bash
git add .
git commit -m "Prepare for Cloudflare deployment"
git push origin main
```

---

## المرحلة 2️⃣: إعداد قاعدة البيانات (Turso - مجاني)

### 1. تسجيل الدخول إلى Turso:
- اذهب إلى [turso.tech](https://turso.tech)
- أنشئ حساب مجاني
- ثبت Turso CLI:
```bash
# Windows
winget install tursodatabase.turso

# أو macOS
brew install tursodatabase/tap/turso

# أو من pip
pip install turso-cli
```

### 2. إنشاء قاعدة بيانات:
```bash
turso auth login
turso db create kbi-db
turso db tokens create kbi-db
```

### 3. نسخ الرابط والتوكن:
```
DATABASE_URL سيكون شيء مثل:
libsql://kbi-db-USERNAME.turso.io?authToken=XXXXX
```

### 4. تحديث `.env.local`:
```bash
DATABASE_URL="libsql://kbi-db-USERNAME.turso.io?authToken=XXXXX"
```

### 5. دفع Schema إلى Turso:
```bash
npx prisma db push
```

---

## المرحلة 3️⃣: إعداد Cloudflare Pages

### 1. تسجيل الدخول إلى Cloudflare:
- اذهب إلى [dash.cloudflare.com](https://dash.cloudflare.com)
- أنشئ حساب مجاني أو تسجيل دخول

### 2. توصيل GitHub مع Cloudflare:
1. اذهب إلى **Pages** من القائمة اليسرى
2. اضغط **Create a project** → **Connect to Git**
3. ربط حسابك على GitHub (سيطلب الصلاحيات)
4. اختر مستودع `KBI`

### 3. إعدادات البناء:
```
Framework: Next.js
Build command: npm run build
Build output directory: .next/standalone
Node.js version: 20
```

### 4. متغيرات البيئة:
في Cloudflare Pages:
1. اذهب إلى project settings → Environment variables
2. أضف:
```
DATABASE_URL = libsql://kbi-db-USERNAME.turso.io?authToken=XXXXX
NODE_ENV = production
```

### 5. انتظر النشر الأول:
- Cloudflare سيبدأ البناء تلقائياً
- عندما ينجح، سيعطيك رابط: `your-project.pages.dev`

---

## المرحلة 4️⃣: إضافة نطاق مجاني (اختياري)

### خيار 1 - استخدام النطاق الافتراضي:
```
https://kbi.pages.dev
```

### خيار 2 - نطاق مشروط مجاني:
1. اشترِ نطاق (مثل من Namecheap)
2. وجهه إلى Cloudflare nameservers
3. أضفه إلى Custom Domain في Pages

### خيار 3 - نطاق ثانوي مجاني من Cloudflare:
1. في Cloudflare، اضغط **Account** → **Pages**
2. اختر project الخاص بك
3. اذهب إلى **Custom domains**
4. أضف `kbi.cf` أو `kbi.ga` (مجاني)

---

## المرحلة 5️⃣: GitHub Actions (CI/CD اختياري)

متضمن بالفعل في `.github/workflows/deploy.yml`

للتفعيل:
1. اذهب إلى GitHub → Settings → Secrets and variables
2. أضف:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

احصل عليها من Cloudflare:
- اذهب إلى My Account → API Tokens
- أنشئ token جديد بصلاحيات Page access

---

## المرحلة 6️⃣: الاختبار المحلي قبل النشر

```bash
# تثبيت الحزم
npm install

# توليd Prisma Client
npx prisma generate

# البناء
npm run build

# الاختبار المحلي
npm start
```

---

## استكشاف الأخطاء:

### ❌ Database connection error:
- تحقق من DATABASE_URL في Cloudflare
- تأكد من أن Turso token صحيح
- جرب: `turso db tokens list kbi-db`

### ❌ Build fails:
```bash
# نظف وأعد المحاولة
rm -rf node_modules .next
npm install
npm run build
```

### ❌ Pages deployment fails:
- تحقق من build logs في Cloudflare Pages dashboard
- تأكد من أن `next.config.ts` لديه `standalone` output

---

## ملاحظات مهمة:

✅ **مجاني تماماً:**
- Cloudflare Pages ✓
- Turso (قاعدة بيانات) ✓
- GitHub ✓
- Custom domain (اختياري) ~$3-10/سنة

⚠️ **حدود مجانية:**
- Cloudflare Pages: 500 builds/شهر
- Turso: 9GB storage, unlimited readاقراءات

📊 **مراقبة:**
- اذهب إلى Cloudflare Pages dashboard
- شاهد deployments والـ logs
- تحقق من صحة الموقع: `kbi.pages.dev`

---

## الدعم:

- Cloudflare Docs: https://developers.cloudflare.com/pages/
- Turso Docs: https://docs.turso.tech
- Next.js Docs: https://nextjs.org/docs

---

**تم إعداده في:** August 10, 2026
**الحالة:** جاهز للنشر ✅

## 🔧 الإعدادات المتقدمة - Advanced Configuration

هذا الملف للمستخدمين المتقدمين الذين يريدون تحسينات إضافية.

---

## 1️⃣ تكوين Custom Headers

أضف في `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: "standalone",
  // ... الإعدادات الأخرى
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          }
        ]
      }
    ]
  }
}
```

---

## 2️⃣ تفعيل Cloudflare Analytics Engine

في `wrangler.toml`:

```toml
[[analytics_engine_datasets]]
binding = "ANALYTICS"
```

ثم في API routes:

```typescript
export async function POST(request: Request) {
  // ...
  const event = {
    timestamp: Date.now(),
    user_id: userId,
    action: 'page_view',
  }
  
  // إرسال للـ Analytics
  await ANALYTICS.writeDataPoint({
    indexes: [userId],
    blobs: [JSON.stringify(event)]
  })
}
```

---

## 3️⃣ استخدام Cloudflare KV (Cache مجاني)

بدل قاعدة البيانات للأشياء المؤقتة:

في `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "KV"
id = "your-kv-namespace-id"
preview_id = "your-preview-namespace-id"
```

في الكود:

```typescript
// Save to cache
await KV.put('user:123', JSON.stringify(userData), { expirationTtl: 3600 })

// Get from cache
const cached = await KV.get('user:123')
if (cached) {
  return JSON.parse(cached)
}
```

---

## 4️⃣ تكوين Environment-specific Database

لـ Testing و Production المختلفة:

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  // سيستخدم .env.DATABASE_URL تلقائياً
  url      = env("DATABASE_URL")
}
```

ثم:

```bash
# Development
DATABASE_URL="file:./dev.db" npm run dev

# Production
DATABASE_URL="libsql://kbi-db.turso.io?authToken=..." npm start
```

---

## 5️⃣ تفعيل Rate Limiting مع Cloudflare Workers

ملف جديد: `worker.ts`

```typescript
export default {
  async fetch(request: Request) {
    const ip = request.headers.get('cf-connecting-ip')
    const key = `rate:${ip}`
    
    let count = 1
    const cached = await KV.get(key)
    
    if (cached) {
      count = parseInt(cached) + 1
    }
    
    if (count > 100) { // 100 requests/minute
      return new Response('Too many requests', { status: 429 })
    }
    
    await KV.put(key, count.toString(), { expirationTtl: 60 })
    
    return fetch(request)
  }
}
```

---

## 6️⃣ Load Testing (اختبر قبل النشر)

استخدم Apache Bench أو wrk:

```bash
# تثبيت wrk (macOS)
brew install wrk

# اختبار locally
wrk -t4 -c100 -d30s http://localhost:3000

# النتائج المتوقعة:
# - Requests/sec: 1000+
# - Latency: < 100ms
```

---

## 7️⃣ CI/CD اضافي: Database Backups

أضف job جديد في `.github/workflows/deploy.yml`:

```yaml
  backup-database:
    runs-on: ubuntu-latest
    needs: build-and-deploy
    steps:
      - name: Backup Turso Database
        run: |
          turso db dump kbi-db > backup-$(date +%Y%m%d).sql
```

---

## 8️⃣ Monitoring & Alerts

استخدم Cloudflare Logpush:

```bash
# CLI command (في Cloudflare Account)
cf_setup logging enable --zone-id=YOUR_ZONE_ID \
  --dataset=http_requests \
  --destination-conf bucket=YOUR_BUCKET \
  --ownership-token=YOUR_TOKEN
```

---

## 9️⃣ Security: API Key Management

الطريقة الآمنة:

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key')
  
  // تحقق من API key
  if (apiKey !== process.env.INTERNAL_API_KEY) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  
  return NextResponse.next()
}

// middleware config
export const config = {
  matcher: '/api/admin/:path*'
}
```

---

## 🔟 Web Vitals Monitoring

أضف في `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout() {
  return (
    <html>
      <body>
        {/* content */}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## 🎯 Performance Checklist:

- [ ] تفعيل Caching Headers
- [ ] استخدام KV للـ static content
- [ ] تفعيل image optimization
- [ ] استخدام ISR للـ dynamic pages
- [ ] testen load testing
- [ ] تفعيل monitoring
- [ ] setup automated backups
- [ ] API rate limiting

---

## 📊 Metrics المهمة:

```
Lighthouse Scores Target:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

Core Web Vitals:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
```

---

**تم آخر تحديث:** August 10, 2026

/**
 * نصائح تحسين الأداء على Cloudflare Pages
 * Performance Tips for Cloudflare Pages
 */

// ✅ 1. Image Optimization
// في next.config.ts - نحن حسسناه بالفعل
// تأكد من استخدام <Image /> من next/image مع unoptimized={true}

// ✅ 2. Caching Strategy
// أضف في src/app/layout.tsx
// export const revalidate = 3600; // revalidate every hour

// ✅ 3. API Routes مع getServerSideProps
// استخدم ISR (Incremental Static Regeneration) حيث يمكن:
// export const revalidate = 60; // seconds

// ✅ 4. Database Connection Pooling
// Turso يدعم connection pooling تلقائياً
// استخدم @prisma/client مع:
// datasource db {
//   provider = "sqlite"
//   url      = env("DATABASE_URL")
// }

// ✅ 5. Edge Functions (اختياري - مع Workers)
// يمكن إضافة Cloudflare Workers للمنطق السريع
// مثل: Authentication, rate limiting, etc.

// ✅ 6. Environment Variables Security
// لا تضع secrets في client code
// استخدم NEXT_PUBLIC_ فقط للـ public variables

// ✅ 7. Build Optimization
// الملفات الحالية بالفعل optimized:
// - output: "standalone" ✅
// - images.unoptimized: true ✅
// - typescript.ignoreBuildErrors: true ✅

// ✅ 8. Monitoring & Logs
// Cloudflare Pages توفر مجاناً:
// - Live logs في dashboard
// - Error tracking
// - Performance metrics

// ✅ 9. Custom Headers (Optional)
// أضف في next.config.ts:
/*
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=600'
          }
        ]
      }
    ]
  }
*/

// ✅ 10. Redirects & Rewrites
// إذا احتجت routing معقد:
/*
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true
      }
    ]
  }
*/

module.exports = {
  // نصائح فقط - لن توثر على build
}

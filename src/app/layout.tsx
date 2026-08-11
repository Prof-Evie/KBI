import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KBI Club | نادي الكيك بوكسينغ والملاكمة - الموصل",
  description: "نادي KBI للكيك بوكسينغ والملاكبة في الموصل، حي نور. تدريب مع المحترفين مع الكابتن بكر. Boxing & Kick-Boxing التدريب المتخصص في الموصل",
  keywords: ["KBI", "Kickboxing", "Boxing", "الملاكمة", "الكيك بوكسينغ", "الموصل", "العراق", "نادي رياضي", "Captin Bkr", "حي نور"],
  authors: [{ name: "KBI Club" }],
  icons: {
    icon: "/images/IMG_٢٠٢٦٠٨١٠_١٥١٤٤٢.jpg",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://kbi.mosul.workers.dev",
  },
  openGraph: {
    title: "KBI Club | نادي الكيكبوكسينغ - الموصل، العراق",
    description: "انضم إلى أفضل نادي للـ Boxing و Kick-Boxing في الموصل. تدرب مع الكابتن بكر وحقق أهدافك الرياضية.",
    url: "https://kbi.mosul.workers.dev",
    siteName: "KBI Club",
    type: "website",
    locale: "ar_IQ",
    images: [
      {
        url: "https://kbi.mosul.workers.dev/images/IMG_٢٠٢٦٠٨١٠_١٥١٤٤٢.jpg",
        width: 1200,
        height: 630,
        alt: "KBI Club - نادي الكيك بوكسينغ والملاكمة",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KBI Club | نادي الكيكبوكسينغ",
    description: "نادي KBI للكيكبوكسينغ والملاكمة - الموصل، العراق",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
        <link rel="canonical" href="https://kbi.mosul.workers.dev" />
        <link rel="sitemap" href="/sitemap.xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Cloudflare Pages optimization
  experimental: {
    isrMemoryCacheSize: 0, // استخدم 0 لـ serverless
  },
  images: {
    unoptimized: true, // Cloudflare لا يدعم image optimization
  },
};

export default nextConfig;

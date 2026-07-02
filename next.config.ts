import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF first (best compression), fall back to WebP
    formats: ['image/avif', 'image/webp'],
    // Allow team/blog avatars hosted off-origin (Vercel Blob uploads, etc.)
    remotePatterns: [
      { protocol: 'https', hostname: '**.public.blob.vercel-storage.com' },
      { protocol: 'https', hostname: '**.mikaelsoninitiative.org' },
      { protocol: 'https', hostname: 'mikaelsoninitiative.org' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
  // Remove the X-Powered-By: Next.js header
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://mikaelson-school-club-backend-y7od.vercel.app/api/:path*',
      },
    ];
  },
};

export default nextConfig;

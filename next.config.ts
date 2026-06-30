import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF first (best compression), fall back to WebP
    formats: ['image/avif', 'image/webp'],
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

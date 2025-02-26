// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/:path*'
      }
    ]
  },
  // Optional: Add other Next.js config options here
  reactStrictMode: true,
  swcMinify: true,
}

export default nextConfig
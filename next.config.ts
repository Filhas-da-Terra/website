import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nkualykoqttmxfbhydav.supabase.co',
      },
    ],
  },
}

export default nextConfig

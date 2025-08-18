import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nkualykoqttmxfbhydav.supabase.co',
        pathname: '/storage/v1/object/public/filhasDaTerra/**',
      },
    ],
  },
}

export default nextConfig

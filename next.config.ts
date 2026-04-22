import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nkualykoqttmxfbhydav.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'brasil.un.org',
        pathname: '/profiles/undg_country/themes/custom/undg/images/SDGs/**',
      },
    ],
  },
}

export default nextConfig

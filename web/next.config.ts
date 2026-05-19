import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  async headers() {
    // Allow the site to be embedded by Sanity Presentation inside the Studio.
    // Keep this narrowly scoped to frame embedding only.
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://*.sanity.studio https://sanity.studio",
          },
        ],
      },
    ]
  },
}

export default nextConfig

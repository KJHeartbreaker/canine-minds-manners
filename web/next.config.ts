import type {NextConfig} from 'next'

function originFromUrl(value: string | undefined): string | undefined {
  if (!value) return undefined
  try {
    return new URL(value).origin
  } catch {
    return undefined
  }
}

// Sanity-hosted Studio URLs redirect to the dashboard on www.sanity.io, which is the
// actual parent origin when Presentation embeds the site in an iframe.
const presentationFrameAncestors = [
  "'self'",
  'https://www.sanity.io',
  'https://*.sanity.studio',
  'https://sanity.studio',
  originFromUrl(process.env.NEXT_PUBLIC_SANITY_STUDIO_URL),
  'http://localhost:3333',
]
  .filter((value, index, list) => value && list.indexOf(value) === index)
  .join(' ')

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
            value: `frame-ancestors ${presentationFrameAncestors}`,
          },
        ],
      },
    ]
  },
}

export default nextConfig

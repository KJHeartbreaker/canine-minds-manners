import {NextRequest, NextResponse} from 'next/server'
import {client} from '@/sanity/lib/client'
import {redirectsQuery} from '@/sanity/lib/queries'

type RedirectEntry = {
  source: string
  destination: string
  permanent: boolean
}

// Cache redirects in memory to avoid fetching on every request
let redirectsCache: RedirectEntry[] | null = null
let cacheTimestamp: number = 0
const CACHE_TTL = 60 * 1000 // 1 minute cache

async function getRedirects(): Promise<RedirectEntry[]> {
  const now = Date.now()

  // Return cached redirects if still valid
  if (redirectsCache && now - cacheTimestamp < CACHE_TTL) {
    return redirectsCache
  }

  try {
    const redirects = await client.fetch<RedirectEntry[]>(redirectsQuery)
    redirectsCache = redirects || []
    cacheTimestamp = now
    return redirectsCache
  } catch (error) {
    console.error('Error fetching redirects:', error)
    // Return cached redirects even if stale, or empty array
    return redirectsCache || []
  }
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip redirect check for API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/studio') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next()
  }

  // Get redirects from Sanity
  const redirects = await getRedirects()

  // Find matching redirect
  const redirect = redirects.find((r) => {
    // Exact match
    if (r.source === pathname) {
      return true
    }

    // Handle trailing slash variations
    if (r.source === pathname + '/' || r.source + '/' === pathname) {
      return true
    }

    return false
  })

  if (redirect) {
    // Determine the status code
    const statusCode = redirect.permanent ? 308 : 307

    // Handle relative and absolute URLs
    let destination = redirect.destination
    if (!destination.startsWith('http://') && !destination.startsWith('https://')) {
      // Ensure destination starts with /
      if (!destination.startsWith('/')) {
        destination = '/' + destination
      }
      // Create absolute URL
      destination = new URL(destination, request.url).toString()
    }

    return NextResponse.redirect(destination, statusCode)
  }

  // No redirect found, continue the request
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - studio (Sanity Studio)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|studio).*)',
  ],
}

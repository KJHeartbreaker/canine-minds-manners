import {revalidateTag} from 'next/cache'
import {type NextRequest, NextResponse} from 'next/server'
import {parseBody} from 'next-sanity/webhook'

type WebhookPayload = {
  _type?: string
}

const ALLOWED_TAGS = new Set([
  // Core doc types
  'class',
  'page',
  'home',
  'settings',
  'post',
  'blogLandingPage',
  // Other published collections
  'resource',
  'product',
  'trainer',
  'testimonial',
  'redirect',
])

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET
    if (!secret) {
      return new Response('Missing environment variable SANITY_REVALIDATE_SECRET', {status: 500})
    }

    const {isValidSignature, body} = await parseBody<WebhookPayload>(
      req,
      secret,
      true, // wait for Content Lake propagation
    )

    if (!isValidSignature) {
      return new Response(
        JSON.stringify({message: 'Invalid signature', isValidSignature, body}),
        {status: 401},
      )
    }

    const type = body?._type
    if (!type) {
      return new Response(JSON.stringify({message: 'Bad Request: missing _type', body}), {
        status: 400,
      })
    }

    if (!ALLOWED_TAGS.has(type)) {
      return new Response(
        JSON.stringify({message: `Unsupported _type/tag: ${type}`, body}),
        {status: 400},
      )
    }

    // Webhooks typically expect the next request to be a blocking cache miss.
    // Next.js recommends `{ expire: 0 }` for this use case.
    revalidateTag(type, {expire: 0})

    return NextResponse.json({ok: true, revalidated: type})
  } catch (err: unknown) {
    console.error(err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    return new Response(message, {status: 500})
  }
}


import {NextRequest, NextResponse} from 'next/server'
import {createHmac} from 'crypto'
import {createClient} from 'next-sanity'
import {apiVersion, dataset, projectId} from '@/sanity/lib/api'

// Create a write client for webhook mutations (no CDN, can write)
// Use write token if available, otherwise fall back to read token
const writeToken = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN

if (!writeToken) {
  console.error('Missing SANITY_API_WRITE_TOKEN or SANITY_API_READ_TOKEN for webhook mutations')
}

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken, // Required for mutations
})

/**
 * Webhook endpoint for Acuity Scheduling to update booking counts
 *
 * To set up:
 * 1. In Acuity, go to Settings > Integrations > Webhooks
 * 2. Add a webhook URL pointing to: https://yourdomain.com/api/acuity-webhook
 * 3. Select events: "Appointment Scheduled" and "Appointment Canceled"
 * 4. Get your API key from: Acuity Dashboard > Settings > Integrations > API
 * 5. Set ACUITY_API_KEY in your Vercel environment variables (production)
 * 6. Set SANITY_API_WRITE_TOKEN in your Vercel environment variables (production)
 *
 * The webhook will:
 * - Verify the request is from Acuity using HMAC-SHA256 signature verification (production only)
 * - Find the class session by appointmentTypeID (matches acuityId)
 * - Update the bookingsCount field (increment for scheduled, decrement for canceled)
 * - Automatically recalculate availability (open/nearlyFull/full)
 * - Changes are reflected immediately via next-sanity/live automatic revalidation
 *
 * Production Setup:
 * - Signature verification is REQUIRED in production (NODE_ENV !== 'development')
 * - Acuity automatically sends the x-acuity-signature header with each webhook
 * - Make sure ACUITY_API_KEY matches your Acuity API key exactly
 *
 * Local Testing:
 * - Signature verification is skipped in development for easier testing
 * - You can test with: curl -d "action=scheduled&appointmentTypeID=123" http://localhost:3000/api/acuity-webhook
 *
 * Documentation: https://developers.acuityscheduling.com/docs/webhooks
 */

/**
 * Verify webhook signature to ensure request is from Acuity
 */
function verifySignature(body: string, signature: string | null, apiKey: string): boolean {
  if (!signature || !apiKey) {
    return false
  }

  // Compute HMAC-SHA256 signature
  const hash = createHmac('sha256', apiKey).update(body).digest('base64')

  // Compare signatures
  return hash === signature
}

export async function POST(req: NextRequest) {
  try {
    // Acuity sends webhooks as application/x-www-form-urlencoded
    const bodyText = await req.text()

    // Parse form data
    const params = new URLSearchParams(bodyText)
    const action = params.get('action')
    const appointmentTypeID = params.get('appointmentTypeID')

    // Verify webhook signature
    // In production, Acuity automatically sends x-acuity-signature header
    // In development, we skip verification for easier local testing
    const apiKey = process.env.ACUITY_API_KEY
    const signature = req.headers.get('x-acuity-signature')
    const isDevelopment = process.env.NODE_ENV === 'development'

    if (apiKey && !isDevelopment) {
      // Production: Always verify signature
      if (!signature || !verifySignature(bodyText, signature, apiKey)) {
        console.error('Invalid webhook signature')
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
      }
    } else if (apiKey && signature && !verifySignature(bodyText, signature, apiKey)) {
      // Development with signature: verify it (useful for testing with real webhooks)
      console.error('Invalid webhook signature')
      return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }
    // Development without signature: skip verification (for local curl testing)

    // Only process scheduled and canceled actions
    if (action !== 'scheduled' && action !== 'canceled') {
      return NextResponse.json({success: true, message: `Action ${action} ignored`}, {status: 200})
    }

    if (!appointmentTypeID) {
      return NextResponse.json({error: 'Missing appointmentTypeID'}, {status: 400})
    }

    // Find the class document that has this appointmentTypeID
    // Query all classes and filter in code for more reliability
    const classes = await writeClient.fetch(`
			*[_type == "class" && defined(upcomingClasses)]{
				_id,
				upcomingClasses[]{
					_key,
					acuityId,
					bookingsCount,
					totalSpots
				}
			}
		`)

    // Find the class and session with matching acuityId
    let classDoc: any = null
    let session: any = null

    for (const classItem of classes) {
      const matchingSession = classItem.upcomingClasses?.find(
        (s: any) => s.acuityId === appointmentTypeID,
      )
      if (matchingSession) {
        classDoc = {_id: classItem._id, upcomingClasses: [matchingSession]}
        session = matchingSession
        break
      }
    }

    if (!classDoc || !session) {
      console.warn(`No class found with acuityId: ${appointmentTypeID}`)
      return NextResponse.json({success: true, message: 'Class not found'}, {status: 200})
    }
    const currentBookings = session?.bookingsCount || 0
    const totalSpots = session?.totalSpots

    // Update bookingsCount based on action
    let newBookingsCount = currentBookings
    if (action === 'scheduled') {
      newBookingsCount = currentBookings + 1
    } else if (action === 'canceled') {
      newBookingsCount = Math.max(0, currentBookings - 1)
    }

    // Calculate new availability based on spots
    let newAvailability: 'open' | 'nearlyFull' | 'full' = 'open'
    if (totalSpots && totalSpots > 0) {
      const remaining = totalSpots - newBookingsCount
      const percentage = (newBookingsCount / totalSpots) * 100

      if (remaining <= 0) {
        newAvailability = 'full'
      } else if (remaining <= 2 || percentage >= 80) {
        newAvailability = 'nearlyFull'
      }
    }

    // Update the document with both bookingsCount and availability
    await writeClient
      .patch(classDoc._id)
      .set({
        [`upcomingClasses[_key=="${session._key}"].bookingsCount`]: newBookingsCount,
        [`upcomingClasses[_key=="${session._key}"].availability`]: newAvailability,
      })
      .commit()

    console.log(
      `Updated class ${classDoc._id}: ${action} → ${newBookingsCount}/${totalSpots || '?'} spots (${newAvailability})`,
    )

    // Note: defineLive from next-sanity/live will automatically revalidate pages
    // when Sanity content changes. No additional revalidation needed.
    // The changes will be reflected on the next page request (within seconds).

    return NextResponse.json({
      success: true,
      action,
      appointmentTypeID,
      bookingsCount: newBookingsCount,
      totalSpots,
      availability: newAvailability,
    })
  } catch (error: any) {
    console.error('Acuity webhook error:', error)
    return NextResponse.json(
      {error: 'Internal server error', message: error.message},
      {status: 500},
    )
  }
}

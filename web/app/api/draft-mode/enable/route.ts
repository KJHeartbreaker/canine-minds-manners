import {validatePreviewUrl} from '@sanity/preview-url-secret'
import {perspectiveCookieName} from '@sanity/preview-url-secret/constants'
import {cookies, draftMode} from 'next/headers'
import {redirect} from 'next/navigation'

import {client} from '@/sanity/lib/client'
import {token} from '@/sanity/lib/token'

/**
 * defineEnableDraftMode() is used to enable draft mode. Set the route of this file
 * as the previewMode.enable option for presentationTool in your sanity.config.ts
 * Learn more: https://github.com/sanity-io/next-sanity?tab=readme-ov-file#5-integrating-with-sanity-presentation-tool--visual-editing
 */

export async function GET(request: Request) {
  const url = new URL(request.url)

  // If the Studio can't generate URL Preview Secrets due to missing grants, it will
  // call this endpoint without a secret. Make that failure mode obvious.
  if (!url.searchParams.get('sanity-preview-secret')) {
    return new Response(
      'Missing `sanity-preview-secret`.\n\nSanity Presentation requires URL Preview Secrets. Ensure your Sanity user/role has permission to create documents of type `sanity.previewUrlSecret` (and optionally `sanity.previewUrlShareAccess`).',
      {status: 401},
    )
  }

  const {isValid, redirectTo = '/', studioPreviewPerspective} = await validatePreviewUrl(
    client.withConfig({token}),
    request.url,
  )

  if (!isValid) return new Response('Invalid secret', {status: 401})

  const draftModeStore = await draftMode()
  if (!draftModeStore.isEnabled) draftModeStore.enable()

  const isSecure = process.env.NODE_ENV === 'production'
  const cookieStore = await cookies()
  const bypassCookie = cookieStore.get('__prerender_bypass')
  const bypassValue = bypassCookie?.value ?? globalThis.crypto?.randomUUID?.() ?? 'draft'

  // Ensure the bypass cookie is set with a SameSite policy compatible with iframe usage in Studio.
  cookieStore.set({
    name: '__prerender_bypass',
    value: bypassValue,
    httpOnly: true,
    path: '/',
    secure: isSecure,
    sameSite: isSecure ? 'none' : 'lax',
  })

  if (studioPreviewPerspective) {
    cookieStore.set({
      name: perspectiveCookieName,
      value: studioPreviewPerspective,
      httpOnly: true,
      path: '/',
      secure: isSecure,
      sameSite: isSecure ? 'none' : 'lax',
    })
  }

  return redirect(redirectTo)
}

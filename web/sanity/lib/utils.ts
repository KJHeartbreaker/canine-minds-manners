import { createImageUrlBuilder } from '@sanity/image-url'
import {Link} from '@/sanity.types'
import {dataset, projectId, studioUrl} from '@/sanity/lib/api'
import {createDataAttribute, CreateDataAttributeProps} from 'next-sanity'
import {getImageDimensions} from '@sanity/asset-utils'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: any) => {
  // Handle resolved format (has _id or url)
  if (source?.asset?._id) {
    const crop = source.crop

    // Try to get dimensions from metadata if available
    let width = source.asset?.metadata?.dimensions?.width
    let height = source.asset?.metadata?.dimensions?.height

    if (!width || !height) {
      try {
        const dimensions = getImageDimensions(source.asset._id)
        width = dimensions.width
        height = dimensions.height
      } catch {
        // Fallback dimensions
        width = 800
        height = 600
      }
    }

    if (crop) {
      // compute the cropped image's area
      const croppedWidth = Math.floor(width * (1 - (crop.right + crop.left)))
      const croppedHeight = Math.floor(height * (1 - (crop.top + crop.bottom)))

      // compute the cropped image's position
      const left = Math.floor(width * crop.left)
      const top = Math.floor(height * crop.top)

      // gather into a url
      return imageBuilder?.image(source).rect(left, top, croppedWidth, croppedHeight).auto('format')
    }

    // If hotspot exists, use fit('crop') to respect the focal point
    // The hotspot will be used as the center point when cropping
    if (source.hotspot) {
      return imageBuilder?.image(source).fit('crop').auto('format')
    }

    return imageBuilder?.image(source).auto('format')
  }

  // Handle reference format (_ref)
  if (!source?.asset?._ref) {
    return undefined
  }

  const imageRef = source?.asset?._ref
  const crop = source.crop

  // get the image's og dimensions
  const {width, height} = getImageDimensions(imageRef)

  if (crop) {
    // compute the cropped image's area
    const croppedWidth = Math.floor(width * (1 - (crop.right + crop.left)))

    const croppedHeight = Math.floor(height * (1 - (crop.top + crop.bottom)))

    // compute the cropped image's position
    const left = Math.floor(width * crop.left)
    const top = Math.floor(height * crop.top)

    // gather into a url
    return imageBuilder?.image(source).rect(left, top, croppedWidth, croppedHeight).auto('format')
  }

  // If hotspot exists, use fit('crop') to respect the focal point
  // The hotspot will be used as the center point when cropping
  if (source.hotspot) {
    return imageBuilder?.image(source).fit('crop').auto('format')
  }

  return imageBuilder?.image(source).auto('format')
}

export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
  if (!image) return
  const url = urlForImage(image)?.width(1200).height(627).fit('crop').url()
  if (!url) return
  return {url, alt: image?.alt as string, width, height}
}

// Depending on the type of link, we need to fetch the corresponding page, post, or URL.  Otherwise return null.
export function linkResolver(link: Link | undefined) {
  if (!link) return null

  // If linkType is not set but href is, lets set linkType to "href".  This comes into play when pasting links into the portable text editor because a link type is not assumed.
  if (!link.linkType && link.href) {
    link.linkType = 'href'
  }

  switch (link.linkType) {
    case 'href':
      return link.href || null
    case 'page':
      if (link?.page && typeof link.page === 'string') {
        return `/${link.page}`
      }
      break
    case 'post':
      if (link?.post && typeof link.post === 'string') {
        return `/blog/${link.post}`
      }
      break
    default:
      return null
  }
  return null
}

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, 'id' | 'type' | 'path'>>

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
  }).combine(config)
}

import React from 'react'
import dynamic from 'next/dynamic'

import { dataAttr } from '@/sanity/lib/utils'
// Keep hero blocks static - they're above the fold and critical for LCP
import HeroBannerBlock from './blocks/HeroBannerBlock'
import HeroTwoPanelBlock from './blocks/HeroTwoPanelBlock'

// Dynamically import all other blocks to reduce initial bundle size
const SingleColumnContentBlock = dynamic(() => import('./blocks/ContentBlocks').then((mod) => mod.SingleColumnContentBlock), {
  ssr: true,
})
const ContentRowsBlock = dynamic(() => import('./blocks/ContentBlocks').then((mod) => mod.ContentRowsBlock), {
  ssr: true,
})
const SuccessStoriesBlock = dynamic(() => import('./blocks/SuccessStoriesBlock'), {
  ssr: true,
})
const ProductGridBlock = dynamic(() => import('./blocks/GridBlocks').then((mod) => mod.ProductGridBlock), {
  ssr: true,
})
const ProgramsGridBlock = dynamic(() => import('./blocks/GridBlocks').then((mod) => mod.ProgramsGridBlock), {
  ssr: true,
})
const PostsGridBlock = dynamic(() => import('./blocks/GridBlocks').then((mod) => mod.PostsGridBlock), {
  ssr: true,
})
const TrainersGridBlock = dynamic(() => import('./blocks/GridBlocks').then((mod) => mod.TrainersGridBlock), {
  ssr: true,
})
const TestimonialsGridBlock = dynamic(() => import('./blocks/GridBlocks').then((mod) => mod.TestimonialsGridBlock), {
  ssr: true,
})
const RelatedResourcesGridBlock = dynamic(() => import('./blocks/GridBlocks').then((mod) => mod.RelatedResourcesGridBlock), {
  ssr: true,
})
const CustomComponentBlock = dynamic(() => import('./blocks/CustomComponentBlock'), {
  ssr: true,
})
const TrainingRowBlock = dynamic(() => import('./blocks/TrainingRowBlock'), {
  ssr: true,
})
const MapBannerBlock = dynamic(() => import('./blocks/MapBannerBlock'), {
  ssr: true,
})

type BlocksType = {
  [key: string]: React.ComponentType<any>
}

type BlockType = {
  _type: string
  _key: string
}

type BlockProps = {
  index: number
  block: BlockType
  pageId: string
  pageType: string
}

const Blocks: BlocksType = {
  'heroBanner': HeroBannerBlock,
  'heroTwoPanel': HeroTwoPanelBlock,
  'singleColumnContentBlock': SingleColumnContentBlock,
  'successStoriesBlock': SuccessStoriesBlock,
  'rowContainer': ContentRowsBlock,
  'productGridContainer': ProductGridBlock,
  'programsGridContainer': ProgramsGridBlock,
  'postsGridContainer': PostsGridBlock,
  'trainersGridContainer': TrainersGridBlock,
  'testimonialGridContainer': TestimonialsGridBlock,
  'customComponent': CustomComponentBlock,
  'classRowsContainer': TrainingRowBlock,
  'relatedResourcesRow': RelatedResourcesGridBlock,
  'contactPageMap': MapBannerBlock,
}

/**
 * Used by the <PageBuilder>, this component renders a the component that matches the block type.
 */
export default function BlockRenderer({ block, index, pageId, pageType }: BlockProps) {
  // Block does exist
  if (typeof Blocks[block._type] !== 'undefined') {
    return (
      <div
        key={block._key}
        data-sanity={dataAttr({
          id: pageId,
          type: pageType,
          path: `content[_key=="${block._key}"]`,
        }).toString()}
      >
        {React.createElement(Blocks[block._type], {
          key: block._key,
          block: block,
          index: index,
        })}
      </div>
    )
  }
  // Block doesn't exist yet - log for debugging
  if (process.env.NODE_ENV === 'development') {
    console.warn(`Block type "${block._type}" not found in Blocks. Available types:`, Object.keys(Blocks))
  }
  return React.createElement(
    () => (
      <div className="w-full bg-gray-100 text-center text-gray-500 p-20 rounded">
        A &ldquo;{block._type}&rdquo; block hasn&apos;t been created
      </div>
    ),
    { key: block._key },
  )
}

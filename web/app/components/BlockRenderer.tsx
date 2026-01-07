import React from 'react'

import { dataAttr } from '@/sanity/lib/utils'
import HeroBannerBlock from './blocks/HeroBannerBlock'
import {
  TrainersGridBlock,
  ProgramsGridBlock,
  PostsGridBlock,
  ProductGridBlock,
  TestimonialsGridBlock,
  RelatedResourcesGridBlock,
} from './blocks/GridBlocks'
import {
  SingleColumnContentBlock,
  ContentRowsBlock,
} from './blocks/ContentBlocks'
import MapBannerBlock from './blocks/MapBannerBlock'
import TrainingRowBlock from './blocks/TrainingRowBlock'
import CustomComponentBlock from './blocks/CustomComponentBlock'

type BlocksType = {
  [key: string]: React.FC<any>
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
  'singleColumnContentBlock': SingleColumnContentBlock,
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
  // Block doesn't exist yet
  return React.createElement(
    () => (
      <div className="w-full bg-gray-100 text-center text-gray-500 p-20 rounded">
        A &ldquo;{block._type}&rdquo; block hasn&apos;t been created
      </div>
    ),
    { key: block._key },
  )
}

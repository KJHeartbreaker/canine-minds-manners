'use client'

import { SanityDocument } from 'next-sanity'
import { useOptimistic } from 'next-sanity/hooks'
import Link from 'next/link'

import BlockRenderer from '@/app/components/BlockRenderer'
import { GetPageQueryResult } from '@/sanity.types'
import { dataAttr, cleanStegaData } from '@/sanity/lib/utils'
import { studioUrl } from '@/sanity/lib/api'

type PageBuilderPageProps = {
  page: GetPageQueryResult
}

type PageBuilderSection = {
  _key: string
  _type: string
  disabled?: boolean
}

type PageData = {
  _id: string
  _type: string
  content?: PageBuilderSection[]
}

/**
 * The PageBuilder component is used to render the blocks from the `content` field in the Page type in your Sanity Studio.
 */

function renderSections(pageBuilderSections: PageBuilderSection[], page: GetPageQueryResult) {
  if (!page) {
    return null
  }
  // Filter out disabled components, similar to the old getContent function
  const enabledSections = pageBuilderSections.filter((section) => !section.disabled)

  return (
    <div
      data-sanity={dataAttr({
        id: page._id,
        type: page._type,
        path: `content`,
      }).toString()}
    >
      {enabledSections.map((block: any, index: number) => (
        <BlockRenderer
          key={block._key}
          index={index}
          block={block}
          pageId={page._id}
          pageType={page._type}
        />
      ))}
    </div>
  )
}

function renderEmptyState(page: GetPageQueryResult) {
  if (!page) {
    return null
  }
  return (
    <div className="container">
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
        This page has no content!
      </h1>
      <p className="mt-2 text-base text-gray-500">Open the page in Sanity Studio to add content.</p>
      <div className="mt-10 flex">
        <Link
          className="rounded-full flex gap-2 mr-6 items-center bg-black hover:bg-brand focus:bg-blue py-3 px-6 text-white transition-colors duration-200"
          href={`${studioUrl}/structure/intent/edit/template=page;type=page;path=content;id=${page._id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Add content to this page
        </Link>
      </div>
    </div>
  )
}

export default function PageBuilder({ page }: PageBuilderPageProps) {
  // Clean stega encoding from page data so components don't need to handle it
  const cleanedPage = page ? cleanStegaData(page) : page

  const pageBuilderSections = useOptimistic<
    PageBuilderSection[] | undefined,
    SanityDocument<PageData>
  >(cleanedPage?.content || [], (currentSections, action) => {
    // The action contains updated document data from Sanity
    // when someone makes an edit in the Studio

    // If the edit was to a different document, ignore it
    if (action.id !== page?._id) {
      return currentSections
    }

    // If there are sections in the updated document, use them
    if (action.document.content) {
      // Reconcile References. https://www.sanity.io/docs/enabling-drag-and-drop#ffe728eea8c1
      // Clean stega encoding from incoming updates
      const cleanedContent = cleanStegaData(action.document.content)
      return cleanedContent.map(
        (section) => currentSections?.find((s) => s._key === section?._key) || section,
      )
    }

    // Otherwise keep the current sections
    return currentSections
  })

  if (!cleanedPage) {
    return renderEmptyState(cleanedPage)
  }

  return pageBuilderSections && pageBuilderSections.length > 0
    ? renderSections(pageBuilderSections, cleanedPage)
    : renderEmptyState(cleanedPage)
}

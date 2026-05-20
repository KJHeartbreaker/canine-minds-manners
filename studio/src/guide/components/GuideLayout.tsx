import {Box, Container, Heading, Stack, Text} from '@sanity/ui'
import {useCallback, useEffect, useRef, useState, type ReactNode} from 'react'

import {useActiveSection} from '../hooks/useActiveSection'
import type {GuideSection, GuideTocItem} from '../types'
import {collectSectionIds} from '../utils/flattenToc'
import {editorGuideCss} from '../guideStyles'
import {clearLocationHash, scrollToSection} from '../utils/scrollToSection'
import {GuideSection as GuideSectionBlock} from './GuideSection'
import {GuideToc} from './GuideToc'

type GuideLayoutProps = {
  title: string
  description: string
  sections: GuideSection[]
  tocItems: GuideTocItem[]
}

function renderSections(sections: GuideSection[]): ReactNode {
  return sections.map((section) => (
    <GuideSectionBlock key={section.id} id={section.id} title={section.title}>
      {section.content}
      {section.children && section.children.length > 0 ? (
        <Stack space={4} paddingTop={1}>
          {section.children.map((child) => (
            <GuideSectionBlock key={child.id} id={child.id} title={child.title} level="h3">
              {child.content}
            </GuideSectionBlock>
          ))}
        </Stack>
      ) : null}
    </GuideSectionBlock>
  ))
}

export function GuideLayout({title, description, sections, tocItems}: GuideLayoutProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollRoot, setScrollRoot] = useState<HTMLElement | null>(null)
  const sectionIds = collectSectionIds(sections)
  const {activeId, setActiveId} = useActiveSection(sectionIds, sectionIds[0] ?? '', scrollRoot)
  const handledInitialHash = useRef(false)

  const navigateToSection = useCallback(
    (id: string) => {
      if (!scrollRef.current) return
      setActiveId(id)
      scrollToSection(scrollRef.current, id)
    },
    [setActiveId],
  )

  // Honor a deep link hash once, then clear it so the browser does not re-anchor on scroll.
  useEffect(() => {
    if (handledInitialHash.current || !scrollRoot) return

    const hash = window.location.hash.replace(/^#/, '')
    if (!hash || !sectionIds.includes(hash)) return

    handledInitialHash.current = true
    requestAnimationFrame(() => {
      setActiveId(hash)
      scrollToSection(scrollRoot, hash)
      clearLocationHash()
    })
  }, [scrollRoot, sectionIds, setActiveId])

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: editorGuideCss}} />
      <Box
        data-editor-guide
        ref={(node) => {
          scrollRef.current = node
          if (node && scrollRoot !== node) setScrollRoot(node)
        }}
        padding={5}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          minHeight: 0,
          overflow: 'auto',
          boxSizing: 'border-box',
          overscrollBehavior: 'contain',
        }}
      >
      <Container width={5}>
        <Stack space={5}>
          <Stack space={3}>
            <Heading as="h1" size={4}>
              {title}
            </Heading>
            <Text size={2} muted>
              {description}
            </Text>
          </Stack>

          <Box
            style={{
              display: 'flex',
              gap: '2rem',
              alignItems: 'flex-start',
            }}
          >
            <GuideToc items={tocItems} activeId={activeId} onNavigate={navigateToSection} />

            <Stack space={5} style={{flex: 1, minWidth: 0, maxWidth: '42rem'}}>
              {renderSections(sections)}
              {/* Lets the last sections scroll up to the TOC reading line */}
              <Box aria-hidden style={{minHeight: '70vh', flexShrink: 0}} />
            </Stack>
          </Box>
        </Stack>
      </Container>
      </Box>
    </>
  )
}

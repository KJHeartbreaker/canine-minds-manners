import {Box, Stack, Text} from '@sanity/ui'
import {useCallback} from 'react'

import type {GuideTocItem} from '../types'

type GuideTocProps = {
  items: GuideTocItem[]
  activeId: string
  onNavigate: (id: string) => void
}

export function GuideToc({items, activeId, onNavigate}: GuideTocProps) {
  const scrollTo = useCallback(
    (id: string) => {
      onNavigate(id)
    },
    [onNavigate],
  )

  return (
    <Box
      as="nav"
      aria-label="On this page"
      paddingRight={4}
      style={{
        position: 'sticky',
        top: '1.5rem',
        alignSelf: 'flex-start',
        width: '14rem',
        flexShrink: 0,
      }}
    >
      <Stack space={4}>
        <Text size={0} weight="semibold" muted>
          On this page
        </Text>
        <Box as="ul" style={{listStyle: 'none', margin: 0, padding: 0}}>
          {items.map((item, index) => {
            const isActive = item.id === activeId
            const prev = items[index - 1]
            const isFirstNested = item.depth > 0 && (!prev || prev.depth < item.depth)
            const isLast = index === items.length - 1
            const tocPaddingLeft = item.depth === 0 ? 0 : item.depth === 1 ? 2 : 4

            return (
              <Box
                as="li"
                key={item.id}
                paddingLeft={tocPaddingLeft}
                style={{
                  display: 'block',
                  marginTop: isFirstNested ? '0.5rem' : undefined,
                  marginBottom: isLast
                    ? 0
                    : item.depth === 0
                      ? '0.875rem'
                      : item.depth === 1
                        ? '0.5rem'
                        : '0.375rem',
                }}
              >
                <Text
                  size={item.depth >= 2 ? 0 : 1}
                  style={{lineHeight: 1.55}}
                >
                  <button
                    type="button"
                    onClick={() => scrollTo(item.id)}
                    style={{
                      all: 'unset',
                      cursor: 'pointer',
                      display: 'block',
                      padding: '0.125rem 0',
                      color: isActive ? 'var(--card-fg-color)' : 'var(--card-muted-fg-color)',
                      fontWeight: isActive ? 600 : item.depth >= 2 ? 400 : 400,
                      textDecoration: isActive ? 'underline' : 'none',
                      textUnderlineOffset: '0.2em',
                      lineHeight: 1.55,
                    }}
                  >
                    {item.title}
                  </button>
                </Text>
              </Box>
            )
          })}
        </Box>
      </Stack>
    </Box>
  )
}

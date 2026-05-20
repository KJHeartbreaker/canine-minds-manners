import {Box, Card, Heading, Stack} from '@sanity/ui'
import type {ReactNode} from 'react'

type GuideSectionProps = {
  id: string
  title: string
  level?: 'h2' | 'h3'
  children: ReactNode
}

export function GuideSection({id, title, level = 'h2', children}: GuideSectionProps) {
  const isMajor = level === 'h2'

  return (
    <Box as="section" id={id} style={{scrollMarginTop: '1.5rem'}}>
      <Card
        padding={isMajor ? 4 : 3}
        radius={2}
        border
        shadow={isMajor ? 1 : 0}
        tone="default"
        style={
          isMajor
            ? undefined
            : {
                borderLeftWidth: '3px',
                borderLeftColor: 'var(--card-accent-fg-color, var(--brand-primary-color, #2276fc))',
              }
        }
      >
        <Stack space={isMajor ? 5 : 4}>
          <Heading
            as={level}
            size={isMajor ? 2 : 1}
            style={{
              paddingBottom: isMajor ? '0.75rem' : '0.5rem',
              borderBottom: '1px solid var(--card-border-color)',
            }}
          >
            {title}
          </Heading>
          <Stack space={isMajor ? 5 : 4}>{children}</Stack>
        </Stack>
      </Card>
    </Box>
  )
}

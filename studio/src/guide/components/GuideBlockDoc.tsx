import {Stack} from '@sanity/ui'

import {GuideList, GuideParagraph, GuideSubheading} from './GuideProse'

type GuideBlockDocProps = {
  whenToUse: string
  fields?: string[]
  gotchas?: string[]
}

export function GuideBlockDoc({whenToUse, fields, gotchas}: GuideBlockDocProps) {
  return (
    <Stack space={5}>
      <GuideParagraph>{whenToUse}</GuideParagraph>
      {fields && fields.length > 0 ? (
        <Stack space={3}>
          <GuideSubheading>Key fields</GuideSubheading>
          <GuideList items={fields} />
        </Stack>
      ) : null}
      {gotchas && gotchas.length > 0 ? (
        <Stack space={3}>
          <GuideSubheading>Good to know</GuideSubheading>
          <GuideList items={gotchas} />
        </Stack>
      ) : null}
    </Stack>
  )
}

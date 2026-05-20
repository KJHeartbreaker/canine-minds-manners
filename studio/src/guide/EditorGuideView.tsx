import {GuideLayout} from './components/GuideLayout'
import {guideSections} from './content/sections'
import {flattenToc} from './utils/flattenToc'

export function EditorGuideView() {
  return (
    <GuideLayout
      title="Editor guide"
      description="How to edit content on the Canine Minds and Manners website."
      sections={guideSections}
      tocItems={flattenToc(guideSections)}
    />
  )
}

import { UnpublishIcon } from '@sanity/icons'
import { useDocumentOperation } from 'sanity'
import type { DocumentActionComponent } from 'sanity'

/**
 * Document action to unpublish a document
 * This removes the published version while keeping the draft
 */
export const unpublishAction: DocumentActionComponent = (props) => {
    const { published, draft } = props
    const { unpublish } = useDocumentOperation(props.id, props.type)

    // Only show for published documents (when there's a published version but no draft)
    if (!published || draft) {
        return null
    }

    return {
        label: 'Unpublish',
        icon: UnpublishIcon,
        tone: 'critical' as const,
        onHandle: () => {
            unpublish.execute()
        },
    }
}


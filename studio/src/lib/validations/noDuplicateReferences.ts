type ReferenceItem = {_ref?: string}

/**
 * Sanity array validation: reject duplicate document references in the same list.
 */
export function noDuplicateReferences(message = 'Each item can only be selected once.') {
  return (items: ReferenceItem[] | undefined) => {
    if (!items?.length) {
      return true
    }

    const refs = items.map((item) => item._ref).filter(Boolean) as string[]

    if (refs.length !== new Set(refs).size) {
      return message
    }

    return true
  }
}

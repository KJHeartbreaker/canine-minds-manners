import {defineField, defineType} from 'sanity'
import {HiArrowRight as icon} from 'react-icons/hi'

export const redirect = defineType({
  type: 'document',
  name: 'redirect',
  title: 'Redirect',
  icon,
  fields: [
    defineField({
      type: 'string',
      name: 'source',
      title: 'Source Path',
      description: 'The path to redirect from (e.g., /old-page or /blog/old-post)',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return true
          if (!value.startsWith('/')) {
            return 'Source path must start with /'
          }
          return true
        }),
    }),
    defineField({
      type: 'string',
      name: 'destination',
      title: 'Destination Path',
      description:
        'The path to redirect to. Can be relative (e.g., /new-page) or absolute (e.g., https://example.com)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'boolean',
      name: 'permanent',
      title: 'Permanent Redirect',
      description:
        'Permanent redirects (308) tell search engines the page has moved permanently. Temporary redirects (307) are for temporary moves.',
      initialValue: false,
    }),
    defineField({
      type: 'string',
      name: 'description',
      title: 'Description',
      description: 'Optional note about why this redirect exists (for internal reference)',
    }),
  ],
  preview: {
    select: {
      source: 'source',
      destination: 'destination',
      permanent: 'permanent',
    },
    prepare({source, destination, permanent}) {
      return {
        title: source || 'Untitled redirect',
        subtitle: `${permanent ? '308' : '307'} → ${destination || 'No destination'}`,
      }
    },
  },
  orderings: [
    {
      title: 'Source Path (A-Z)',
      name: 'sourceAsc',
      by: [{field: 'source', direction: 'asc'}],
    },
    {
      title: 'Source Path (Z-A)',
      name: 'sourceDesc',
      by: [{field: 'source', direction: 'desc'}],
    },
    {
      title: 'Created Date (Newest)',
      name: 'createdDesc',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
  ],
})

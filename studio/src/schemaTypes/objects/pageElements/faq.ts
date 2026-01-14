import {BsQuestionCircle as icon} from 'react-icons/bs'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const faq = defineType({
  name: 'faq',
  type: 'object',
  title: 'FAQ',
  icon,
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      title: 'FAQ Items',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          fields: [
            defineField({
              name: 'question',
              type: 'string',
              title: 'Question',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              type: 'mainPortableText',
              title: 'Answer',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              question: 'question',
              answer: 'answer.portableTextBlock',
            },
            prepare({question, answer}) {
              // Helper function to extract all text from portable text blocks
              const extractText = (blocks: any[]): string => {
                if (!blocks || blocks.length === 0) return ''

                return blocks
                  .map((block) => {
                    if (block._type === 'block' && block.children) {
                      // Extract text from all children (formatting won't show in preview, but all text will)
                      return block.children.map((child: any) => child.text || '').join('')
                    }
                    // Handle other block types (images, CTAs, etc.)
                    if (block._type === 'image') {
                      return '[Image]'
                    }
                    if (block._type === 'cta') {
                      return `[CTA: ${block.title || 'Button'}]`
                    }
                    if (block._type === 'youtube') {
                      return '[YouTube Video]'
                    }
                    return ''
                  })
                  .filter(Boolean)
                  .join(' ')
              }

              const answerText = extractText(answer) || 'No answer'
              // Truncate if too long for preview
              const maxLength = 100
              const truncatedText =
                answerText.length > maxLength
                  ? answerText.substring(0, maxLength) + '...'
                  : answerText

              return {
                title: question || 'Untitled Question',
                subtitle: truncatedText,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({items}) {
      const count = items?.length || 0
      return {
        title: 'FAQ',
        subtitle: count === 1 ? '1 item' : `${count} items`,
      }
    },
  },
})

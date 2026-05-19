import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {AcuityCategoryInput} from '../../components/AcuityCategoryInput'
import {BulletPointsInput} from '../../components/BulletPointsInput'

export const classDocument = defineType({
  name: 'class',
  title: 'Class',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'acuity',
      title: 'Acuity / Scheduling',
    },
    {
      name: 'display',
      title: 'Display',
    },
  ],
  fieldsets: [
    {
      title: 'Class Image',
      name: 'classImage',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      title: 'Grid Display',
      name: 'gridParams',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      title: 'On Demand',
      name: 'onDemand',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  initialValue: {
    trainingType: 'group',
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Class Name',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Parent Page',
      name: 'parentPage',
      description: `This refers to the page where the class details are displayed. If nothing is referenced, links to this class will go directly to the slug. If there is a parent page, the slug will be used as an anchor link.`,
      type: 'reference',
      to: [{type: 'page'}],
      group: 'content',
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
      },
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Which type of training is this?',
      type: 'string',
      name: 'trainingType',
      options: {
        list: [
          {title: 'Group', value: 'group'},
          {title: 'Private', value: 'private'},
          {title: 'On Demand', value: 'onDemand'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'customTrainingTitle',
      title: 'Custom Training Type Title',
      description:
        'This training type title appears above the class name on the class itself. If no title is provided, the default title will appear. The defaults are "Group Class", and "Private Training".',
      type: 'string',
      group: 'display',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      description:
        'If no price is provided, a link will appear in its place that says Contact Us, and points to the Contact page.',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'upcomingClasses',
      type: 'array',
      title: 'Upcoming Classes',
      description:
        'Add up to 8 upcoming classes. You can paste the Direct Link, or the Booking Button Code snippet which you can find in Acuity. Scheduling Page > Link > Direct Links & Embedding.',
      of: [defineArrayMember({type: 'dateTimeV2'})],
      validation: (rule) => rule.max(8),
      group: 'acuity',
    }),
    defineField({
      name: 'acuityCategoryUrl',
      type: 'string',
      title: 'Acuity Category Booking URL',
      description:
        'Paste the Acuity Booking Button Code snippet for viewing all classes in this category. You can find this in Acuity: Scheduling Page > Link > Direct Links & Embedding. In the dropdown, these are the Appointment Type Categories.',
      group: 'acuity',
      hidden: ({document}) => document?.trainingType !== 'group',
      components: {
        input: AcuityCategoryInput,
      },
    }),
    defineField({
      title: 'Key Takeaways',
      name: 'takeaways',
      type: 'array',
      description: 'These will be displayed on the class page itself under "You&apos;ll Learn".',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.max(4),
      group: 'content',
    }),
    defineField({
      title: 'Card Takeaways',
      name: 'cardTakeaways',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.max(4),
      description:
        'These will be displayed on the enhanced card component on the homepage. The component will automatically extract and clean up to 4 bullet points.',
      components: {
        input: BulletPointsInput,
      },
      group: 'display',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'simplePortableText',
      group: 'content',
    }),
    defineField({
      name: 'picture',
      title: 'Picture',
      type: 'mainImage',
      options: {hotspot: true},
      fieldset: 'classImage',
      group: 'display',
    }),
    defineField({
      name: 'cardImage',
      title: 'Card Image',
      type: 'mainImage',
      description: 'This image will be displayed on the card in the training grid',
      options: {hotspot: true},
      fieldset: 'gridParams',
      group: 'display',
    }),
    defineField({
      name: 'enhancedCardTitle',
      title: 'Enhanced Card Title',
      type: 'string',
      description:
        'Optional title to display on enhanced program cards. If not provided, the class name will be used.',
      group: 'display',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'trainingType',
      photo: 'picture',
    },
    prepare({title, subtitle, photo}) {
      return {
        title,
        subtitle,
        media: photo,
      }
    },
  },
})

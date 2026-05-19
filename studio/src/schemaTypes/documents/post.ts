import {defineArrayMember, defineField, defineType} from 'sanity'
import {BsSearch} from 'react-icons/bs'
import {VscSettings} from 'react-icons/vsc'
import {TbMeat} from 'react-icons/tb'
import {FaBullhorn as icon} from 'react-icons/fa'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon,
  groups: [
    {
      title: 'SEO',
      name: 'seo',
      icon: BsSearch,
      default: true,
    },
    {
      title: 'Post Settings',
      name: 'postSettings',
      icon: VscSettings,
    },
    {
      title: 'Post Content',
      name: 'postContent',
      icon: TbMeat,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'postSettings',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'postSettings',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO Settings',
      description: 'Configure how this post appears in search engines',
      group: 'seo',
    }),
    defineField({
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'trainer'}],
      group: 'postSettings',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'simplePortableText',
      description:
        'This field will appear in places where this post is linked. For example, in a related resources grid.',
      group: 'postSettings',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Header Image',
      type: 'mainImage',
      options: {
        hotspot: true,
      },
      group: 'postContent',
    }),
    defineField({
      name: 'subheader',
      title: 'Subheader',
      type: 'string',
      group: 'postContent',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'mainPortableText',
      group: 'postContent',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'image',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})

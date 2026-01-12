import {FcShop as icon} from 'react-icons/fc'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const productGridContainer = defineType({
  name: 'productGridContainer',
  type: 'object',
  title: 'Product Grid',
  icon,
  fieldsets: [
    {
      title: 'Row Parameters',
      name: 'rowParams',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  initialValue: {
    backgroundColor: 'White',
  },
  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Optional Background Colour',
      type: 'string',
      description:
        'If no background image is uploaded, you can choose a background colour. If no selection is made, the default is white.',
      options: {
        list: [
          {title: 'White', value: '#ffffff'},
          {title: 'Grey', value: '#e2e2e2'},
          {title: 'Blue', value: '#61c8e9'},
          {title: 'Yellow', value: '#feca2d'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      fieldset: 'rowParams',
    }),
    defineField({
      name: 'productsArr',
      type: 'array',
      title: 'Products',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'product'}],
        }),
      ],
    }),

    defineField({
      name: 'disabled',
      title: 'Disabled',
      description: 'Setting this to true will disable the component, but not delete it.',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      product0: 'productsArr.0.heading',
      product1: 'productsArr.1.heading',
      product2: 'productsArr.2.heading',
      product3: 'productsArr.3.heading',
      productImage: 'productsArr.0.image',
      disabled: 'disabled',
    },
    prepare: ({product0, product1, product2, product3, productImage, disabled}) => {
      const products = [product0, product1, product2].filter(Boolean)
      const subtitles = products.length > 0 ? `${products.join(', ')}` : ''
      const hasMoreProducts = Boolean(product3)

      return {
        title: disabled ? '*** DISABLED *** Product Grid' : 'Product Grid',
        subtitle: `${subtitles}`,
        media: productImage || icon,
      }
    },
  },
})

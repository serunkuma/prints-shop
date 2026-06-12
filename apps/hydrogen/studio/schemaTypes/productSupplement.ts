import {defineType, defineField} from 'sanity';

export default defineType({
  name: 'productSupplement',
  title: 'Product Supplement',
  type: 'document',
  fields: [
    defineField({
      name: 'shopifyHandle',
      title: 'Shopify Handle',
      type: 'string',
      description: 'Must match the Shopify product handle exactly',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'story',
      title: 'Story',
      type: 'text',
      rows: 5,
      description: 'The narrative behind this print',
    }),
    defineField({
      name: 'technique',
      title: 'Technique',
      type: 'string',
      description: 'e.g. Digital illustration, Mixed media, Photography',
    }),
    defineField({
      name: 'inspiration',
      title: 'Inspiration',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'additionalImages',
      title: 'Additional Images',
      type: 'array',
      of: [{type: 'imageWithAlt'}],
    }),
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'reference',
      to: [{type: 'artist'}],
    }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'reference',
      to: [{type: 'series'}],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
  ],
  preview: {
    select: {
      title: 'shopifyHandle',
      subtitle: 'technique',
    },
  },
});

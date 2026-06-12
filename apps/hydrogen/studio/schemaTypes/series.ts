import {defineType, defineField} from 'sanity';

export default defineType({
  name: 'series',
  title: 'Series / Drop',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Scheduled', value: 'scheduled'},
          {title: 'Live', value: 'live'},
          {title: 'Archived', value: 'archived'},
        ],
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'shopifyCollectionHandle',
      title: 'Shopify Collection Handle',
      type: 'string',
      description: 'Maps this series to a Shopify collection for product grouping',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'heroImage',
    },
  },
});

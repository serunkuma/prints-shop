export default {
  name: 'series',
  title: 'Series / Drop',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required()},
    {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule: any) => Rule.required()},
    {name: 'heroImage', title: 'Hero Image', type: 'imageWithAlt', validation: (Rule: any) => Rule.required()},
    {name: 'publishDate', title: 'Publish Date', type: 'datetime'},
    {
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
    },
    {name: 'description', title: 'Description', type: 'portableText'},
    {name: 'artistRef', title: 'Artist', type: 'reference', to: [{type: 'artist'}]},
    {name: 'shopifyCollectionHandle', title: 'Shopify Collection Handle', type: 'string'},
    {
      name: 'featuredProducts',
      title: 'Featured Products',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Shopify product handles',
    },
    {name: 'seo', title: 'SEO', type: 'seoFields'},
  ],
  preview: {
    select: {title: 'title', media: 'heroImage'},
  },
};

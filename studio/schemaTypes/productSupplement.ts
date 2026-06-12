export default {
  name: 'productSupplement',
  title: 'Product Supplement',
  type: 'document',
  fields: [
    {name: 'shopifyHandle', title: 'Shopify Handle', type: 'string', validation: (Rule: any) => Rule.required()},
    {name: 'artistRef', title: 'Artist', type: 'reference', to: [{type: 'artist'}]},
    {name: 'story', title: 'Story', type: 'portableText'},
    {name: 'technique', title: 'Technique', type: 'string'},
    {name: 'inspiration', title: 'Inspiration', type: 'portableText'},
    {
      name: 'additionalImages',
      title: 'Additional Images',
      type: 'array',
      of: [{type: 'imageWithAlt'}],
    },
    {name: 'seriesRef', title: 'Series', type: 'reference', to: [{type: 'series'}]},
    {name: 'seo', title: 'SEO', type: 'seoFields'},
  ],
  preview: {
    select: {title: 'shopifyHandle'},
  },
};

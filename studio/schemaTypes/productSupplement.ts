export default {
  name: 'productSupplement',
  title: 'Product Supplement',
  type: 'document',
  fields: [
    {name: 'shopifyHandle', title: 'Shopify Handle', type: 'string', validation: (Rule: any) => Rule.required()},
    {name: 'artistRef', title: 'Artist', type: 'reference', to: [{type: 'artist'}]},
    {name: 'story', title: 'Story', type: 'portableText'},
    {name: 'technique', title: 'Technique', type: 'string'},
    {name: 'paper', title: 'Paper', type: 'string'},
    {name: 'ink', title: 'Ink', type: 'string'},
    {name: 'edition', title: 'Edition', type: 'string'},
    {name: 'inspiration', title: 'Inspiration', type: 'portableText'},
    {
      name: 'additionalImages',
      title: 'Additional Images',
      type: 'array',
      of: [{type: 'imageWithAlt'}],
    },
    {
      name: 'mockupImages',
      title: 'Mockup Images',
      type: 'array',
      of: [{type: 'imageWithAlt'}],
      description: 'Lifestyle mockup shots showing the print in a room setting.',
    },
    {
      name: 'roomImages',
      title: 'Room Placement Images',
      type: 'array',
      of: [{type: 'imageWithAlt'}],
      description: 'Room placement / framing visualisations.',
    },
    {
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {accept: 'video/*'},
        },
      ],
      description: 'Product videos (process, artist commentary, etc.).',
    },
    {name: 'seriesRef', title: 'Series', type: 'reference', to: [{type: 'series'}]},
    {name: 'seo', title: 'SEO', type: 'seoFields'},
  ],
  preview: {
    select: {title: 'shopifyHandle'},
  },
};

export default {
  name: 'productGrid',
  title: 'Product Grid',
  type: 'object',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Shopify product handles',
    },
    {name: 'collectionHandle', title: 'Collection Handle', type: 'string'},
    {name: 'maxProducts', title: 'Max Products', type: 'number'},
  ],
  preview: {
    select: {title: 'title'},
  },
};

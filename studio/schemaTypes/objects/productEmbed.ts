export default {
  name: 'productEmbed',
  title: 'Product Embed',
  type: 'object',
  fields: [
    {name: 'productHandle', title: 'Product Handle', type: 'string'},
    {name: 'productTitle', title: 'Product Title', type: 'string'},
  ],
  preview: {
    select: {title: 'productTitle', subtitle: 'productHandle'},
  },
};

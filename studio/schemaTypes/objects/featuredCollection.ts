export default {
  name: 'featuredCollection',
  title: 'Featured Collection',
  type: 'object',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'description', title: 'Description', type: 'string'},
    {name: 'collectionHandle', title: 'Collection Handle', type: 'string'},
    {name: 'seriesRef', title: 'Series', type: 'reference', to: [{type: 'series'}]},
    {name: 'maxProducts', title: 'Max Products', type: 'number'},
  ],
  preview: {
    select: {title: 'title'},
  },
};

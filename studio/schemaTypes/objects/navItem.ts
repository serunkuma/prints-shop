export default {
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    {name: 'label', title: 'Label', type: 'string'},
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Internal Path', value: 'internal'},
          {title: 'External URL', value: 'external'},
          {title: 'Collection', value: 'collection'},
          {title: 'Series', value: 'series'},
        ],
      },
    },
    {name: 'internalPath', title: 'Internal Path', type: 'string', hidden: ({parent}: any) => parent?.type !== 'internal'},
    {name: 'externalUrl', title: 'External URL', type: 'url', hidden: ({parent}: any) => parent?.type !== 'external'},
    {name: 'collectionHandle', title: 'Collection Handle', type: 'string', hidden: ({parent}: any) => parent?.type !== 'collection'},
    {name: 'seriesRef', title: 'Series', type: 'reference', to: [{type: 'series'}], hidden: ({parent}: any) => parent?.type !== 'series'},
  ],
};

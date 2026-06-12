export default {
  name: 'editorialBanner',
  title: 'Editorial Banner',
  type: 'object',
  fields: [
    {name: 'heading', title: 'Heading', type: 'string'},
    {name: 'body', title: 'Body', type: 'string'},
    {name: 'image', title: 'Image', type: 'imageWithAlt'},
    {
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        {name: 'label', title: 'Label', type: 'string'},
        {name: 'url', title: 'URL', type: 'url'},
      ],
    },
  ],
  preview: {
    select: {title: 'heading'},
  },
};

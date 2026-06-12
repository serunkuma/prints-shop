export default {
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    {name: 'heading', title: 'Heading', type: 'string'},
    {name: 'subheading', title: 'Subheading', type: 'string'},
    {name: 'backgroundImage', title: 'Background Image', type: 'imageWithAlt'},
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

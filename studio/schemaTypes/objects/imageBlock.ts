export default {
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  fields: [
    {name: 'image', title: 'Image', type: 'imageWithAlt'},
    {name: 'caption', title: 'Caption', type: 'string'},
  ],
  preview: {
    select: {title: 'caption', media: 'image'},
  },
};

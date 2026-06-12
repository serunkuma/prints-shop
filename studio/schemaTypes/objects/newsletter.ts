export default {
  name: 'newsletter',
  title: 'Newsletter',
  type: 'object',
  fields: [
    {name: 'heading', title: 'Heading', type: 'string'},
    {name: 'description', title: 'Description', type: 'string'},
  ],
  preview: {
    select: {title: 'heading'},
  },
};

export default {
  name: 'testimonials',
  title: 'Testimonials',
  type: 'object',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'quote', title: 'Quote', type: 'string'},
            {name: 'author', title: 'Author', type: 'string'},
          ],
        },
      ],
    },
  ],
  preview: {
    select: {title: 'title'},
  },
};

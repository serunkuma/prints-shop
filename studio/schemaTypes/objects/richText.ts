export default {
  name: 'richText',
  title: 'Rich Text',
  type: 'object',
  fields: [
    {name: 'body', title: 'Body', type: 'portableText'},
  ],
  preview: {
    select: {title: 'body'},
  },
};

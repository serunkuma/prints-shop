export default {
  name: 'portableText',
  title: 'Portable Text',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Underline', value: 'underline'},
        ],
        annotations: [
          {name: 'link', title: 'Link', type: 'object', fields: [{name: 'url', title: 'URL', type: 'url'}]},
        ],
      },
    },
    {type: 'imageBlock', title: 'Image Block'},
    {type: 'productEmbed', title: 'Product Embed'},
  ],
};

export default {
  name: 'seoFields',
  title: 'SEO',
  type: 'object',
  fields: [
    {name: 'metaTitle', title: 'Meta Title', type: 'string', validation: (Rule: any) => Rule.max(60)},
    {name: 'metaDescription', title: 'Meta Description', type: 'string', validation: (Rule: any) => Rule.max(160)},
    {name: 'ogImage', title: 'OG Image', type: 'imageWithAlt'},
  ],
};

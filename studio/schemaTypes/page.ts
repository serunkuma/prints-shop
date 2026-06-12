export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required()},
    {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule: any) => Rule.required()},
    {name: 'body', title: 'Body', type: 'portableText', validation: (Rule: any) => Rule.required()},
    {name: 'seo', title: 'SEO', type: 'seoFields'},
  ],
  preview: {
    select: {title: 'title'},
  },
};

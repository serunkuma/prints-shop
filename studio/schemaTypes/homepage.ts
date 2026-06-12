export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {type: 'hero'},
        {type: 'featuredCollection'},
        {type: 'editorialBanner'},
        {type: 'productGrid'},
        {type: 'testimonials'},
        {type: 'newsletter'},
        {type: 'richText'},
      ],
    },
    {name: 'seo', title: 'SEO', type: 'seoFields'},
  ],
  preview: {
    prepare: () => ({title: 'Homepage'}),
  },
};

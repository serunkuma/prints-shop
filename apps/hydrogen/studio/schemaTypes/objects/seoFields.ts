import {defineType, defineField} from 'sanity';

export const seoFields = defineType({
  name: 'seoFields',
  title: 'SEO Fields',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Override the default page title for search engines',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      description: 'Brief description for search results (max 160 characters)',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'imageWithAlt',
      description: 'Social share image (1200×630 recommended)',
    }),
  ],
});

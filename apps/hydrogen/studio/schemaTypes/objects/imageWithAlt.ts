import {defineType, defineField} from 'sanity';

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Required for accessibility and SEO',
      validation: (Rule) => Rule.error('Alt text is required').required(),
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'asset',
    },
  },
});

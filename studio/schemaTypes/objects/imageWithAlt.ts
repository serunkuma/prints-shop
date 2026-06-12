export default {
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  fields: [
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Required for accessibility and SEO.',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  options: {
    hotspot: true,
  },
};

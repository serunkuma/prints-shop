import {defineType, defineField} from 'sanity';

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Kumachi Prints',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'announcementText',
      title: 'Announcement Bar Text',
      type: 'string',
      description: 'Optional promotional banner text shown at top of every page',
    }),
    defineField({
      name: 'announcementLink',
      title: 'Announcement Link URL',
      type: 'url',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {name: 'instagram', title: 'Instagram', type: 'url'},
        {name: 'twitter', title: 'X / Twitter', type: 'url'},
        {name: 'facebook', title: 'Facebook', type: 'url'},
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO',
      type: 'seoFields',
    }),
  ],
  preview: {
    select: {title: 'title'},
  },
});

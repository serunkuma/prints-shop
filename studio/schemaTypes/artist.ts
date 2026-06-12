export default {
  name: 'artist',
  title: 'Artist',
  type: 'document',
  fields: [
    {name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required()},
    {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'name'}, validation: (Rule: any) => Rule.required()},
    {name: 'portrait', title: 'Portrait', type: 'imageWithAlt'},
    {name: 'bio', title: 'Bio', type: 'portableText'},
    {name: 'location', title: 'Location', type: 'string'},
    {name: 'website', title: 'Website', type: 'url'},
    {name: 'instagramHandle', title: 'Instagram Handle', type: 'string', description: 'Without @'},
    {name: 'featuredQuote', title: 'Featured Quote', type: 'string'},
  ],
  preview: {
    select: {title: 'name', media: 'portrait'},
  },
};

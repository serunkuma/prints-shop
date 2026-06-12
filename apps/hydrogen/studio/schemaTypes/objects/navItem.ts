import {defineType, defineField} from 'sanity';

export const navItem = defineType({
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          {title: 'Page', value: 'page'},
          {title: 'Collection', value: 'collection'},
          {title: 'External URL', value: 'external'},
        ],
      },
      initialValue: 'page',
    }),
    defineField({
      name: 'pageReference',
      title: 'Page',
      type: 'reference',
      to: [{type: 'page'}],
      hidden: ({parent}) => parent?.linkType !== 'page',
    }),
    defineField({
      name: 'collectionHandle',
      title: 'Collection Handle',
      type: 'string',
      description: 'Shopify collection handle',
      hidden: ({parent}) => parent?.linkType !== 'collection',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'external',
    }),
    defineField({
      name: 'children',
      title: 'Sub-items',
      type: 'array',
      of: [{type: 'navItem'}],
      description: 'Optional dropdown sub-navigation',
    }),
  ],
});

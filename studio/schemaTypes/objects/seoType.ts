import {defineType} from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: {collapsible: true},
  fields: [
    {name: 'title', title: 'Title', type: 'string', description: 'Override the Shopify title'},
    {name: 'description', title: 'Description', type: 'text', rows: 2},
    {name: 'image', title: 'Image', type: 'image'},
    {name: 'keywords', title: 'Keywords', type: 'array', of: [{type: 'string'}]},
    {name: 'synonyms', title: 'Synonyms', type: 'array', of: [{type: 'string'}]},
  ],
})

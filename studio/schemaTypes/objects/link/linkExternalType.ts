import {defineType} from 'sanity'

export const linkExternalType = defineType({
  name: 'linkExternal',
  title: 'External link',
  type: 'object',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'url', title: 'URL', type: 'url'},
  ],
})

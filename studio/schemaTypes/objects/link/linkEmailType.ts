import {defineType} from 'sanity'

export const linkEmailType = defineType({
  name: 'linkEmail',
  title: 'Email link',
  type: 'object',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'email', title: 'Email', type: 'string'},
  ],
})

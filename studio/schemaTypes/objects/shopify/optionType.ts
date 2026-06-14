import {defineType} from 'sanity'

export const optionType = defineType({
  name: 'option',
  title: 'Option',
  type: 'object',
  fields: [
    {name: 'name', title: 'Name', type: 'string'},
    {name: 'values', title: 'Values', type: 'array', of: [{type: 'string'}]},
  ],
})

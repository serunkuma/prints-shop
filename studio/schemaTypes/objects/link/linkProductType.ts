import {defineType} from 'sanity'

export const linkProductType = defineType({
  name: 'linkProduct',
  title: 'Product link',
  type: 'object',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'product', title: 'Product', type: 'reference', to: [{type: 'product'}]},
  ],
})

import {defineType} from 'sanity'

export const priceRangeType = defineType({
  name: 'priceRange',
  title: 'Price range',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fields: [
    {name: 'minVariantPrice', title: 'Min variant price', type: 'number'},
    {name: 'maxVariantPrice', title: 'Max variant price', type: 'number'},
  ],
})

import {defineType} from 'sanity'

export const productWithVariantType = defineType({
  name: 'productWithVariant',
  title: 'Product with variant',
  type: 'object',
  fields: [
    {name: 'product', title: 'Product', type: 'reference', to: [{type: 'product'}]},
    {name: 'variant', title: 'Variant', type: 'reference', to: [{type: 'productVariant'}]},
  ],
  preview: {
    select: {title: 'product.store.title', subtitle: 'variant.store.title'},
  },
})

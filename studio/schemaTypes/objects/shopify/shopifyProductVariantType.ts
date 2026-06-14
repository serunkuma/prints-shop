import {defineType} from 'sanity'

export const shopifyProductVariantType = defineType({
  name: 'shopifyProductVariant',
  title: 'Product variant',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fieldsets: [
    {name: 'status', title: 'Status', options: {columns: 2}},
    {name: 'organization', title: 'Organization', options: {columns: 2}},
  ],
  fields: [
    {name: 'id', title: 'ID', type: 'number', fieldset: 'status'},
    {name: 'productId', title: 'Product ID', type: 'number', fieldset: 'status'},
    {name: 'title', title: 'Title', type: 'string', fieldset: 'status'},
    {name: 'sku', title: 'SKU', type: 'string'},
    {name: 'barcode', title: 'Barcode', type: 'string'},
    {name: 'createdAt', title: 'Created at', type: 'string'},
    {name: 'updatedAt', title: 'Updated at', type: 'string'},
    {name: 'inventory', title: 'Inventory', type: 'inventory'},
    {name: 'option1', title: 'Option 1', type: 'string'},
    {name: 'option2', title: 'Option 2', type: 'string'},
    {name: 'option3', title: 'Option 3', type: 'string'},
    {name: 'price', title: 'Price', type: 'number', fieldset: 'status'},
    {name: 'compareAtPrice', title: 'Compare at price', type: 'number'},
    {name: 'status', title: 'Status', type: 'string', fieldset: 'status'},
    {name: 'isDeleted', title: 'Deleted from Shopify?', type: 'boolean'},
    {name: 'previewImageUrl', title: 'Preview image URL', type: 'string'},
    {name: 'options', title: 'Options', type: 'array', of: [{type: 'option'}]},
  ],
})

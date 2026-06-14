import {defineType} from 'sanity'

export const shopifyProductType = defineType({
  name: 'shopifyProduct',
  title: 'Product',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fieldsets: [
    {name: 'status', title: 'Status', options: {columns: 2}},
    {name: 'organization', title: 'Organization', options: {columns: 2}},
  ],
  fields: [
    {name: 'id', title: 'ID', type: 'number', fieldset: 'status'},
    {name: 'title', title: 'Title', type: 'string', fieldset: 'status'},
    {name: 'slug', title: 'Slug', type: 'slug', fieldset: 'status'},
    {name: 'createdAt', title: 'Created at', type: 'string'},
    {name: 'updatedAt', title: 'Updated at', type: 'string'},
    {
      name: 'productType',
      title: 'Product type',
      type: 'string',
      fieldset: 'organization',
    },
    {name: 'vendor', title: 'Vendor', type: 'string', fieldset: 'organization'},
    {name: 'tags', title: 'Tags', type: 'string'},
    {name: 'status', title: 'Status', type: 'string'},
    {name: 'isDeleted', title: 'Deleted from Shopify?', type: 'boolean'},
    {name: 'description', title: 'Description', type: 'text'},
    {name: 'descriptionHtml', title: 'Description (HTML)', type: 'text'},
    {name: 'options', title: 'Options', type: 'array', of: [{type: 'option'}], fieldset: 'organization'},
    {name: 'variants', title: 'Variants', type: 'array', of: [{type: 'reference', to: [{type: 'productVariant'}]}]},
    {name: 'previewImageUrl', title: 'Preview image URL', type: 'string'},
    {name: 'priceRange', title: 'Price range', type: 'priceRange'},
  ],
})

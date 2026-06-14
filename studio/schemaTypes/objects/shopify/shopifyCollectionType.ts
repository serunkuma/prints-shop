import {defineType} from 'sanity'

export const shopifyCollectionType = defineType({
  name: 'shopifyCollection',
  title: 'Collection',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fieldsets: [{name: 'status', title: 'Status', options: {columns: 2}}],
  fields: [
    {name: 'id', title: 'ID', type: 'number', fieldset: 'status'},
    {name: 'title', title: 'Title', type: 'string', fieldset: 'status'},
    {name: 'slug', title: 'Slug', type: 'slug', fieldset: 'status'},
    {name: 'description', title: 'Description', type: 'string'},
    {name: 'descriptionHtml', title: 'Description (HTML)', type: 'text'},
    {name: 'rule', title: 'Rule', type: 'collectionRule'},
    {name: 'disjunctive', title: 'Disjunctive', type: 'boolean'},
    {name: 'sortOrder', title: 'Sort order', type: 'string'},
    {name: 'isDeleted', title: 'Deleted from Shopify?', type: 'boolean'},
    {name: 'previewImageUrl', title: 'Preview image URL', type: 'string'},
  ],
})

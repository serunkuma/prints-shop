import {defineType} from 'sanity'

export const inventoryType = defineType({
  name: 'inventory',
  title: 'Inventory',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fields: [
    {name: 'isAvailable', title: 'Is available', type: 'boolean'},
    {name: 'manageStock', title: 'Manage stock', type: 'boolean'},
    {name: 'policy', title: 'Inventory policy', type: 'string'},
    {name: 'quantity', title: 'Quantity', type: 'number'},
  ],
})

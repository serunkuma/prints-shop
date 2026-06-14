import {defineType} from 'sanity'

export const collectionRuleType = defineType({
  name: 'collectionRule',
  title: 'Collection rule',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fields: [
    {name: 'column', title: 'Column', type: 'string'},
    {name: 'relation', title: 'Relation', type: 'string'},
    {name: 'condition', title: 'Condition', type: 'string'},
  ],
})

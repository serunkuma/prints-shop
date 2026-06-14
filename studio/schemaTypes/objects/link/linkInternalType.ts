import {defineType} from 'sanity'
import {PAGE_REFERENCES} from '../../../constants'

export const linkInternalType = defineType({
  name: 'linkInternal',
  title: 'Internal link',
  type: 'object',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'reference', title: 'Reference', type: 'reference', to: PAGE_REFERENCES},
  ],
})

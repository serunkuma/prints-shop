import {defineType} from 'sanity'

export const callToActionType = defineType({
  name: 'callToAction',
  title: 'Call to action',
  type: 'object',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'link', title: 'Link', type: 'reference', to: [{type: 'page'}, {type: 'homepage'}]},
  ],
  preview: {
    select: {title: 'title'},
  },
})

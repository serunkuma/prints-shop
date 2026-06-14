import {defineType} from 'sanity'

export const calloutType = defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  fields: [
    {name: 'text', title: 'Text', type: 'text', rows: 2},
    {name: 'tone', title: 'Tone', type: 'string', options: {
      list: [{title: 'Default', value: 'default'}, {title: 'Info', value: 'info'}, {title: 'Warning', value: 'warning'}, {title: 'Error', value: 'error'}],
    }},
  ],
})

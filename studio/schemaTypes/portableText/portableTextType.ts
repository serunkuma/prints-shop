import {defineType} from 'sanity'

export const portableTextType = defineType({
  name: 'portableText',
  title: 'Body',
  type: 'array',
  of: [
    {type: 'block', styles: [{title: 'Normal', value: 'normal'}, {title: 'H1', value: 'h1'}, {title: 'H2', value: 'h2'}, {title: 'H3', value: 'h3'}, {title: 'H4', value: 'h4'}, {title: 'Quote', value: 'blockquote'}],
      marks: {
        annotations: [
          {type: 'linkInternal'},
          {type: 'linkExternal'},
          {type: 'linkEmail'},
          {type: 'linkProduct'},
        ],
      },
    },
    {type: 'imageWithAlt'},
    {type: 'callout'},
    {type: 'callToAction'},
  ],
})

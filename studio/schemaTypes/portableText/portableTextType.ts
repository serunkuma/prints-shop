import {defineType} from 'sanity'

export const portableTextType = defineType({
  name: 'portableText',
  title: 'Body',
  type: 'array',
  of: [
    {type: 'block', styles: [{title: 'Normal', value: 'normal'}, {title: 'H1', value: 'h1'}, {title: 'H2', value: 'h2'}, {title: 'H3', value: 'h3'}, {title: 'H4', value: 'h4'}, {title: 'Quote', value: 'blockquote'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Underline', value: 'underline'},
        ],
        annotations: [
          {name: 'link', title: 'Link', type: 'object', fields: [{name: 'url', title: 'URL', type: 'url'}]},
          {type: 'linkInternal'},
          {type: 'linkExternal'},
          {type: 'linkEmail'},
          {type: 'linkProduct'},
        ],
      },
    },
    {type: 'imageWithAlt'},
    {type: 'imageBlock'},
    {type: 'productEmbed'},
    {type: 'callout'},
    {type: 'callToAction'},
  ],
})

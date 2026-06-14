import {defineType} from 'sanity'

export const portableTextSimpleType = defineType({
  name: 'portableTextSimple',
  title: 'Body',
  type: 'array',
  of: [
    {type: 'block', styles: [{title: 'Normal', value: 'normal'}],
      marks: {
        annotations: [{type: 'linkInternal'}, {type: 'linkExternal'}, {type: 'linkEmail'}],
      },
    },
  ],
})

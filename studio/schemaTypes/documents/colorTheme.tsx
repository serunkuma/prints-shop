import {ColorWheelIcon} from '@sanity/icons'
import {defineType} from 'sanity'
import ColorThemePreview from '../../components/media/ColorTheme'

export const colorThemeType = defineType({
  name: 'colorTheme',
  title: 'Color theme',
  type: 'document',
  icon: ColorWheelIcon,
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'background', title: 'Background', type: 'string'},
    {name: 'text', title: 'Text', type: 'string'},
  ],
  preview: {
    select: {background: 'background', text: 'text', title: 'title'},
    prepare(selection) {
      const {background, text, title} = selection
      return {
        media: <ColorThemePreview background={background} text={text} />,
        title,
      }
    },
  },
})

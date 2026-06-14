import {defineType} from 'sanity'
import PlaceholderStringInput from '../../../components/inputs/PlaceholderString'

export const placeholderStringType = defineType({
  name: 'placeholderString',
  title: 'Placeholder String',
  type: 'string',
  components: {input: PlaceholderStringInput},
})

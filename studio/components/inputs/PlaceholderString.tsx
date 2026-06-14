import type {StringInputProps, StringSchemaType} from 'sanity'
import {useFormValue} from 'sanity'
import type {SanityDocument} from 'sanity'
import get from 'lodash.get'

type Props = StringInputProps<StringSchemaType & {options?: {field?: string}}>

const PlaceholderStringInput = (props: Props) => {
  const {schemaType} = props
  const path = schemaType?.options?.field
  const doc = useFormValue([]) as SanityDocument
  const proxyValue = path ? (get(doc, path) as string) : ''

  return props.renderDefault({
    ...props,
    elementProps: {...props.elementProps, placeholder: proxyValue},
  })
}

export default PlaceholderStringInput

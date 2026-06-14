import {defineType} from 'sanity'
import ProxyString from '../../../components/inputs/ProxyString'

export const proxyStringType = defineType({
  name: 'proxyString',
  title: 'Proxy String',
  type: 'string',
  components: {input: ProxyString},
})

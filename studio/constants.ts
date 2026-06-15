import {ColorWheelIcon, ComposeIcon, SearchIcon} from '@sanity/icons'

export const DEFAULT_CURRENCY_CODE = 'USD'
export const LOCKED_DOCUMENT_TYPES = ['settings', 'home', 'media.tag', 'homepage', 'navigation']
export const SHOPIFY_DOCUMENT_TYPES = ['product', 'productVariant', 'collection']
export const PAGE_REFERENCES = [
  {type: 'collection'},
  {type: 'homepage'},
  {type: 'page'},
  {type: 'product'},
]
export const SANITY_API_VERSION = '2024-01-01'
const studioEnv = import.meta.env
export const SHOPIFY_STORE_ID = studioEnv?.SANITY_STUDIO_SHOPIFY_STORE_ID || ''

export const GROUPS = [
  {name: 'theme', title: 'Theme', icon: ColorWheelIcon},
  {default: true, name: 'editorial', title: 'Editorial', icon: ComposeIcon},
  {name: 'shopifySync', title: 'Shopify sync', icon: undefined},
  {name: 'seo', title: 'SEO', icon: SearchIcon},
]

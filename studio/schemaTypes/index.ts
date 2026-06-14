import homepage from './homepage'
import productSupplement from './productSupplement'
import artist from './artist'
import series from './series'
import page from './page'
import settings from './settings'
import navigation from './navigation'
import seoFields from './objects/seoFields'
import imageWithAlt from './objects/imageWithAlt'
import navItem from './objects/navItem'
import portableText from './objects/portableText'
import hero from './objects/hero'
import featuredCollection from './objects/featuredCollection'
import editorialBanner from './objects/editorialBanner'
import productGrid from './objects/productGrid'
import testimonials from './objects/testimonials'
import newsletter from './objects/newsletter'
import richText from './objects/richText'
import imageBlock from './objects/imageBlock'
import productEmbed from './objects/productEmbed'

import {productType} from './documents/product'
import {productVariantType} from './documents/productVariant'
import {collectionType} from './documents/collection'
import {colorThemeType} from './documents/colorTheme'

import {proxyStringType} from './objects/shopify/proxyStringType'
import {placeholderStringType} from './objects/shopify/placeholderStringType'
import {priceRangeType} from './objects/shopify/priceRangeType'
import {inventoryType} from './objects/shopify/inventoryType'
import {optionType} from './objects/shopify/optionType'
import {productWithVariantType} from './objects/shopify/productWithVariantType'
import {collectionRuleType} from './objects/shopify/collectionRuleType'
import {shopifyProductType} from './objects/shopify/shopifyProductType'
import {shopifyProductVariantType} from './objects/shopify/shopifyProductVariantType'
import {shopifyCollectionType} from './objects/shopify/shopifyCollectionType'
import {shopType} from './objects/shopify/shopType'

import {seoType} from './objects/seoType'

import {linkInternalType} from './objects/link/linkInternalType'
import {linkExternalType} from './objects/link/linkExternalType'
import {linkEmailType} from './objects/link/linkEmailType'
import {linkProductType} from './objects/link/linkProductType'

import {portableTextType} from './portableText/portableTextType'
import {portableTextSimpleType} from './portableText/portableTextSimpleType'

const annotations = [linkEmailType, linkExternalType, linkInternalType, linkProductType]

const shopifyObjects = [
  proxyStringType,
  placeholderStringType,
  priceRangeType,
  inventoryType,
  optionType,
  productWithVariantType,
  collectionRuleType,
  shopifyProductType,
  shopifyProductVariantType,
  shopifyCollectionType,
  shopType,
  seoType,
]

const portableTextBlocks = [portableTextType, portableTextSimpleType]

const shopifyDocuments = [collectionType, colorThemeType, productType, productVariantType]

export const schemaTypes = [
  ...annotations,
  ...shopifyObjects,
  ...shopifyDocuments,
  ...portableTextBlocks,
  homepage,
  productSupplement,
  artist,
  series,
  page,
  settings,
  navigation,
  seoFields,
  imageWithAlt,
  navItem,
  portableText,
  hero,
  featuredCollection,
  editorialBanner,
  productGrid,
  testimonials,
  newsletter,
  richText,
  imageBlock,
  productEmbed,
]

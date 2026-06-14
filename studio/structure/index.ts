import type {ListItemBuilder, StructureResolver} from 'sanity/structure'
import {ComposeIcon} from '@sanity/icons'
import collections from './collectionStructure'
import colorThemes from './colorThemeStructure'
import home from './homeStructure'
import pages from './pageStructure'
import products from './productStructure'
import settings from './settingStructure'

const hiddenDocTypes = (listItem: ListItemBuilder) => {
  const id = listItem.getId()
  if (!id) return false
  return ![
    'collection',
    'colorTheme',
    'homepage',
    'media.tag',
    'page',
    'product',
    'productSupplement',
    'productVariant',
    'series',
    'artist',
    'settings',
    'navigation',
  ].includes(id)
}

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      home(S, context),
      pages(S, context),
      S.divider(),
      collections(S, context),
      products(S, context),
      S.divider(),
      S.listItem()
        .title('Editorial')
        .icon(ComposeIcon)
        .child(
          S.list()
            .title('Editorial')
            .items([
              S.documentTypeListItem('productSupplement').title('Product Supplements'),
              S.documentTypeListItem('series').title('Series'),
              S.documentTypeListItem('artist').title('Artists'),
            ]),
        ),
      S.divider(),
      colorThemes(S, context),
      S.divider(),
      settings(S, context),
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])

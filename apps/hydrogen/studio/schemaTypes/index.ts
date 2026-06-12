import homepage from './homepage';
import productSupplement from './productSupplement';
import artist from './artist';
import series from './series';
import page from './page';
import settings from './settings';
import navigation from './navigation';
import {seoFields} from './objects/seoFields';
import {imageWithAlt} from './objects/imageWithAlt';
import {navItem} from './objects/navItem';

export const schemaTypes = [
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
];

import {defineQuery} from 'groq';

export const HOMEPAGE_QUERY = defineQuery(`*[_type == "homepage"][0]{
  sections[]{
    _type,
    ...,
    "seriesRef": seriesRef->{title, slug, heroImage, shopifyCollectionHandle}
  },
  seo
}`);

export const PRODUCT_SUPPLEMENT_QUERY = defineQuery(`*[_type == "productSupplement" && shopifyHandle == $handle][0]{
  story,
  technique,
  inspiration,
  additionalImages,
  "artist": artistRef->{name, slug, portrait, bio, featuredQuote},
  "series": seriesRef->{title, slug}
}`);

export const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "settings"][0]{
  siteName,
  siteDescription,
  announcementBar,
  footerNavigation,
  socialLinks,
  defaultSeo
}`);

export const NAVIGATION_QUERY = defineQuery(`*[_type == "navigation"][0]{
  mainNav[]{
    label,
    type,
    internalPath,
    externalUrl,
    collectionHandle,
    "seriesRef": seriesRef->{title, slug}
  }
}`);

export const PAGE_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  title,
  body,
  seo
}`);

export const SERIES_LIST_QUERY = defineQuery(`*[_type == "series" && status == "live"] | order(publishDate desc){
  title,
  slug,
  heroImage,
  publishDate,
  description,
  "artist": artistRef->{name, slug}
}`);

export const SERIES_BY_SLUG_QUERY = defineQuery(`*[_type == "series" && slug.current == $slug][0]{
  title,
  slug,
  heroImage,
  publishDate,
  status,
  description,
  "artist": artistRef->{name, slug, portrait},
  shopifyCollectionHandle,
  featuredProducts
}`);

export const ARTIST_LIST_QUERY = defineQuery(`*[_type == "artist"] | order(name asc){
  name,
  slug,
  portrait,
  bio,
  location,
  featuredQuote
}`);

export const ARTIST_BY_SLUG_QUERY = defineQuery(`*[_type == "artist" && slug.current == $slug][0]{
  name,
  slug,
  portrait,
  bio,
  location,
  website,
  instagramHandle,
  featuredQuote
}`);

export const COLLECTION_PRODUCTS_QUERY = `#graphql
  query CollectionProducts($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      image {
        id
        url
        altText
      }
      products(first: 50) {
        nodes {
          id
          handle
          title
          description
          featuredImage {
            id
            url
            altText
            width
            height
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            nodes {
              id
              availableForSale
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_QUERY = `#graphql
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      featuredImage {
        id
        url
        altText
        width
        height
      }
      images(first: 10) {
        nodes {
          id
          url
          altText
          width
          height
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 100) {
        nodes {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
      seo {
        title
        description
      }
    }
  }
`;

export const SEARCH_PRODUCTS_QUERY = `#graphql
  query SearchProducts($query: String!) {
    products(first: 50, query: $query) {
      nodes {
        id
        handle
        title
        description
        featuredImage {
          id
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
          variants(first: 1) {
            nodes {
              id
              availableForSale
              price {
                amount
                currencyCode
              }
            }
          }
      }
    }
  }
`;

export const FEATURED_PRODUCTS_QUERY = `#graphql
  query FeaturedProducts {
    products(first: 8) {
      nodes {
        id
        handle
        title
        featuredImage {
          id
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 1) {
          nodes {
            id
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const SITEMAP_PRODUCTS_QUERY = `#graphql
  query SitemapProducts {
    products(first: 200) {
      nodes {
        handle
        updatedAt
      }
    }
  }
`;

export const SITEMAP_COLLECTIONS_QUERY = `#graphql
  query SitemapCollections {
    collections(first: 50) {
      nodes {
        handle
        updatedAt
      }
    }
  }
`;

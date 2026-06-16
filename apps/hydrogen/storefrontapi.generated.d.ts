/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontAPI from '@shopify/hydrogen/storefront-api-types';

export type CartQueryVariables = StorefrontAPI.Exact<{
  cartId: StorefrontAPI.Scalars['ID']['input'];
}>;

export type CartQuery = {
  cart?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'> & {
      cost: {
        subtotalAmount: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        totalAmount: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      };
      lines: {
        nodes: Array<
          | (Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
              merchandise: Pick<
                StorefrontAPI.ProductVariant,
                'id' | 'title'
              > & {
                product: Pick<StorefrontAPI.Product, 'handle' | 'title'> & {
                  featuredImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url' | 'altText'>
                  >;
                };
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              };
            })
          | (Pick<StorefrontAPI.ComponentizableCartLine, 'id' | 'quantity'> & {
              merchandise: Pick<
                StorefrontAPI.ProductVariant,
                'id' | 'title'
              > & {
                product: Pick<StorefrontAPI.Product, 'handle' | 'title'> & {
                  featuredImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url' | 'altText'>
                  >;
                };
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              };
            })
        >;
      };
    }
  >;
};

export type CollectionProductsQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type CollectionProductsQuery = {
  collection?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Collection, 'id' | 'title' | 'description'> & {
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText'>
      >;
      products: {
        nodes: Array<
          Pick<
            StorefrontAPI.Product,
            'id' | 'handle' | 'title' | 'description'
          > & {
            featuredImage?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'url' | 'altText' | 'width' | 'height'
              >
            >;
            priceRange: {
              minVariantPrice: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
            };
            variants: {
              nodes: Array<
                Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'>
              >;
            };
          }
        >;
      };
    }
  >;
};

export type AllProductsQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type AllProductsQuery = {
  products: {
    nodes: Array<
      Pick<StorefrontAPI.Product, 'id' | 'handle' | 'title' | 'description'> & {
        featuredImage?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'url' | 'altText' | 'width' | 'height'
          >
        >;
        priceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        variants: {
          nodes: Array<
            Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'>
          >;
        };
      }
    >;
  };
};

export type ProductQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type ProductQuery = {
  product?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Product,
      'id' | 'title' | 'handle' | 'description' | 'descriptionHtml'
    > & {
      featuredImage?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
      >;
      images: {
        nodes: Array<
          Pick<
            StorefrontAPI.Image,
            'id' | 'url' | 'altText' | 'width' | 'height'
          >
        >;
      };
      priceRange: {
        minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        maxVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      };
      variants: {
        nodes: Array<
          Pick<
            StorefrontAPI.ProductVariant,
            'id' | 'title' | 'availableForSale' | 'sku'
          > & {
            selectedOptions: Array<
              Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
            >;
            price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
            >;
          }
        >;
      };
      seo: Pick<StorefrontAPI.Seo, 'title' | 'description'>;
    }
  >;
};

export type SearchProductsQueryVariables = StorefrontAPI.Exact<{
  query: StorefrontAPI.Scalars['String']['input'];
}>;

export type SearchProductsQuery = {
  products: {
    nodes: Array<
      Pick<StorefrontAPI.Product, 'id' | 'handle' | 'title' | 'description'> & {
        featuredImage?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'url' | 'altText' | 'width' | 'height'
          >
        >;
        priceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        variants: {
          nodes: Array<
            Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'> & {
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            }
          >;
        };
      }
    >;
  };
};

export type FeaturedProductsQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type FeaturedProductsQuery = {
  products: {
    nodes: Array<
      Pick<StorefrontAPI.Product, 'id' | 'handle' | 'title'> & {
        featuredImage?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'url' | 'altText' | 'width' | 'height'
          >
        >;
        priceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        variants: {
          nodes: Array<
            Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'> & {
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            }
          >;
        };
      }
    >;
  };
};

export type SitemapProductsQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type SitemapProductsQuery = {
  products: {nodes: Array<Pick<StorefrontAPI.Product, 'handle' | 'updatedAt'>>};
};

export type SitemapCollectionsQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type SitemapCollectionsQuery = {
  collections: {
    nodes: Array<Pick<StorefrontAPI.Collection, 'handle' | 'updatedAt'>>;
  };
};

export type CartIdQueryVariables = StorefrontAPI.Exact<{
  cartId: StorefrontAPI.Scalars['ID']['input'];
}>;

export type CartIdQuery = {
  cart?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'> & {
      cost: {
        subtotalAmount: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        totalAmount: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      };
      lines: {
        nodes: Array<
          | (Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
              merchandise: Pick<
                StorefrontAPI.ProductVariant,
                'id' | 'title'
              > & {
                product: Pick<StorefrontAPI.Product, 'handle' | 'title'> & {
                  featuredImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url' | 'altText'>
                  >;
                };
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              };
            })
          | (Pick<StorefrontAPI.ComponentizableCartLine, 'id' | 'quantity'> & {
              merchandise: Pick<
                StorefrontAPI.ProductVariant,
                'id' | 'title'
              > & {
                product: Pick<StorefrontAPI.Product, 'handle' | 'title'> & {
                  featuredImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url' | 'altText'>
                  >;
                };
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              };
            })
        >;
      };
    }
  >;
};

export type RecoverMutationVariables = StorefrontAPI.Exact<{
  email: StorefrontAPI.Scalars['String']['input'];
}>;

export type RecoverMutation = {
  customerRecover?: StorefrontAPI.Maybe<{
    customerUserErrors: Array<
      Pick<StorefrontAPI.CustomerUserError, 'code' | 'message'>
    >;
  }>;
};

export type CartQueryQueryVariables = StorefrontAPI.Exact<{
  cartId: StorefrontAPI.Scalars['ID']['input'];
}>;

export type CartQueryQuery = {
  cart?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'> & {
      cost: {
        subtotalAmount: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        totalAmount: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      };
      lines: {
        nodes: Array<
          | (Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
              merchandise: Pick<
                StorefrontAPI.ProductVariant,
                'id' | 'title'
              > & {
                product: Pick<StorefrontAPI.Product, 'handle' | 'title'> & {
                  featuredImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url' | 'altText'>
                  >;
                };
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              };
            })
          | (Pick<StorefrontAPI.ComponentizableCartLine, 'id' | 'quantity'> & {
              merchandise: Pick<
                StorefrontAPI.ProductVariant,
                'id' | 'title'
              > & {
                product: Pick<StorefrontAPI.Product, 'handle' | 'title'> & {
                  featuredImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url' | 'altText'>
                  >;
                };
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              };
            })
        >;
      };
    }
  >;
};

export type CartCreateMutationVariables = StorefrontAPI.Exact<{
  input: StorefrontAPI.CartInput;
}>;

export type CartCreateMutation = {
  cartCreate?: StorefrontAPI.Maybe<{
    cart?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'> & {
        cost: {
          subtotalAmount: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
          totalAmount: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        };
        lines: {
          nodes: Array<
            | (Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
                merchandise: Pick<
                  StorefrontAPI.ProductVariant,
                  'id' | 'title'
                > & {
                  product: Pick<StorefrontAPI.Product, 'handle' | 'title'> & {
                    featuredImage?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.Image, 'url' | 'altText'>
                    >;
                  };
                  selectedOptions: Array<
                    Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                  >;
                  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                };
              })
            | (Pick<
                StorefrontAPI.ComponentizableCartLine,
                'id' | 'quantity'
              > & {
                merchandise: Pick<
                  StorefrontAPI.ProductVariant,
                  'id' | 'title'
                > & {
                  product: Pick<StorefrontAPI.Product, 'handle' | 'title'> & {
                    featuredImage?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.Image, 'url' | 'altText'>
                    >;
                  };
                  selectedOptions: Array<
                    Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                  >;
                  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                };
              })
          >;
        };
      }
    >;
  }>;
};

export type CartLinesAddMutationVariables = StorefrontAPI.Exact<{
  cartId: StorefrontAPI.Scalars['ID']['input'];
  lines: Array<StorefrontAPI.CartLineInput> | StorefrontAPI.CartLineInput;
}>;

export type CartLinesAddMutation = {
  cartLinesAdd?: StorefrontAPI.Maybe<{
    userErrors: Array<Pick<StorefrontAPI.CartUserError, 'field' | 'message'>>;
    cart?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'> & {
        cost: {
          subtotalAmount: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
          totalAmount: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        };
        lines: {
          nodes: Array<
            | (Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
                merchandise: Pick<
                  StorefrontAPI.ProductVariant,
                  'id' | 'title'
                > & {
                  product: Pick<StorefrontAPI.Product, 'handle' | 'title'> & {
                    featuredImage?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.Image, 'url' | 'altText'>
                    >;
                  };
                  selectedOptions: Array<
                    Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                  >;
                  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                };
              })
            | (Pick<
                StorefrontAPI.ComponentizableCartLine,
                'id' | 'quantity'
              > & {
                merchandise: Pick<
                  StorefrontAPI.ProductVariant,
                  'id' | 'title'
                > & {
                  product: Pick<StorefrontAPI.Product, 'handle' | 'title'> & {
                    featuredImage?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.Image, 'url' | 'altText'>
                    >;
                  };
                  selectedOptions: Array<
                    Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                  >;
                  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                };
              })
          >;
        };
      }
    >;
  }>;
};

export type CartLinesUpdateMutationVariables = StorefrontAPI.Exact<{
  cartId: StorefrontAPI.Scalars['ID']['input'];
  lines:
    | Array<StorefrontAPI.CartLineUpdateInput>
    | StorefrontAPI.CartLineUpdateInput;
}>;

export type CartLinesUpdateMutation = {
  cartLinesUpdate?: StorefrontAPI.Maybe<{
    cart?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'> & {
        cost: {
          subtotalAmount: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
          totalAmount: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        };
        lines: {
          nodes: Array<
            | (Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
                merchandise: Pick<
                  StorefrontAPI.ProductVariant,
                  'id' | 'title'
                > & {
                  product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
                  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                };
              })
            | (Pick<
                StorefrontAPI.ComponentizableCartLine,
                'id' | 'quantity'
              > & {
                merchandise: Pick<
                  StorefrontAPI.ProductVariant,
                  'id' | 'title'
                > & {
                  product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
                  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                };
              })
          >;
        };
      }
    >;
  }>;
};

export type CartLinesRemoveMutationVariables = StorefrontAPI.Exact<{
  cartId: StorefrontAPI.Scalars['ID']['input'];
  lineIds:
    | Array<StorefrontAPI.Scalars['ID']['input']>
    | StorefrontAPI.Scalars['ID']['input'];
}>;

export type CartLinesRemoveMutation = {
  cartLinesRemove?: StorefrontAPI.Maybe<{
    cart?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'> & {
        cost: {
          subtotalAmount: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
          totalAmount: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        };
        lines: {
          nodes: Array<
            | (Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
                merchandise: Pick<
                  StorefrontAPI.ProductVariant,
                  'id' | 'title'
                > & {
                  product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
                  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                };
              })
            | (Pick<
                StorefrontAPI.ComponentizableCartLine,
                'id' | 'quantity'
              > & {
                merchandise: Pick<
                  StorefrontAPI.ProductVariant,
                  'id' | 'title'
                > & {
                  product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
                  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                };
              })
          >;
        };
      }
    >;
  }>;
};

export type ShopPoliciesQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type ShopPoliciesQuery = {
  shop: {
    privacyPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'title' | 'body'>
    >;
    termsOfService?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'title' | 'body'>
    >;
    refundPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'title' | 'body'>
    >;
    shippingPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'title' | 'body'>
    >;
    subscriptionPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicyWithDefault, 'title' | 'body'>
    >;
  };
};

interface GeneratedQueryTypes {
  '#graphql\n  query Cart($cartId: ID!) {\n    cart(id: $cartId) {\n      id\n      checkoutUrl\n      totalQuantity\n      cost {\n        subtotalAmount {\n          amount\n          currencyCode\n        }\n        totalAmount {\n          amount\n          currencyCode\n        }\n      }\n      lines(first: 100) {\n        nodes {\n          id\n          quantity\n          merchandise {\n            ... on ProductVariant {\n              id\n              title\n              product {\n                handle\n                title\n                featuredImage {\n                  url\n                  altText\n                }\n              }\n              selectedOptions {\n                name\n                value\n              }\n              price {\n                amount\n                currencyCode\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: CartQuery;
    variables: CartQueryVariables;
  };
  '#graphql\n  query CollectionProducts($handle: String!) {\n    collection(handle: $handle) {\n      id\n      title\n      description\n      image {\n        id\n        url\n        altText\n      }\n      products(first: 50) {\n        nodes {\n          id\n          handle\n          title\n          description\n          featuredImage {\n            id\n            url\n            altText\n            width\n            height\n          }\n          priceRange {\n            minVariantPrice {\n              amount\n              currencyCode\n            }\n          }\n          variants(first: 1) {\n            nodes {\n              id\n              availableForSale\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: CollectionProductsQuery;
    variables: CollectionProductsQueryVariables;
  };
  '#graphql\n  query AllProducts {\n    products(first: 50) {\n      nodes {\n        id\n        handle\n        title\n        description\n        featuredImage {\n          id\n          url\n          altText\n          width\n          height\n        }\n        priceRange {\n          minVariantPrice {\n            amount\n            currencyCode\n          }\n        }\n        variants(first: 1) {\n          nodes {\n            id\n            availableForSale\n          }\n        }\n      }\n    }\n  }\n': {
    return: AllProductsQuery;
    variables: AllProductsQueryVariables;
  };
  '#graphql\n  query Product($handle: String!) {\n    product(handle: $handle) {\n      id\n      title\n      handle\n      description\n      descriptionHtml\n      featuredImage {\n        id\n        url\n        altText\n        width\n        height\n      }\n      images(first: 10) {\n        nodes {\n          id\n          url\n          altText\n          width\n          height\n        }\n      }\n      priceRange {\n        minVariantPrice {\n          amount\n          currencyCode\n        }\n        maxVariantPrice {\n          amount\n          currencyCode\n        }\n      }\n      variants(first: 100) {\n        nodes {\n          id\n          title\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n          sku\n          compareAtPrice {\n            amount\n            currencyCode\n          }\n        }\n      }\n      seo {\n        title\n        description\n      }\n    }\n  }\n': {
    return: ProductQuery;
    variables: ProductQueryVariables;
  };
  '#graphql\n  query SearchProducts($query: String!) {\n    products(first: 50, query: $query) {\n      nodes {\n        id\n        handle\n        title\n        description\n        featuredImage {\n          id\n          url\n          altText\n          width\n          height\n        }\n        priceRange {\n          minVariantPrice {\n            amount\n            currencyCode\n          }\n        }\n          variants(first: 1) {\n            nodes {\n              id\n              availableForSale\n              price {\n                amount\n                currencyCode\n              }\n            }\n          }\n      }\n    }\n  }\n': {
    return: SearchProductsQuery;
    variables: SearchProductsQueryVariables;
  };
  '#graphql\n  query FeaturedProducts {\n    products(first: 8) {\n      nodes {\n        id\n        handle\n        title\n        featuredImage {\n          id\n          url\n          altText\n          width\n          height\n        }\n        priceRange {\n          minVariantPrice {\n            amount\n            currencyCode\n          }\n        }\n        variants(first: 1) {\n          nodes {\n            id\n            availableForSale\n            price {\n              amount\n              currencyCode\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: FeaturedProductsQuery;
    variables: FeaturedProductsQueryVariables;
  };
  '#graphql\n  query SitemapProducts {\n    products(first: 200) {\n      nodes {\n        handle\n        updatedAt\n      }\n    }\n  }\n': {
    return: SitemapProductsQuery;
    variables: SitemapProductsQueryVariables;
  };
  '#graphql\n  query SitemapCollections {\n    collections(first: 50) {\n      nodes {\n        handle\n        updatedAt\n      }\n    }\n  }\n': {
    return: SitemapCollectionsQuery;
    variables: SitemapCollectionsQueryVariables;
  };
  '#graphql\n  query CartId($cartId: ID!) {\n    cart(id: $cartId) {\n      id\n      checkoutUrl\n      totalQuantity\n      cost {\n        subtotalAmount { amount currencyCode }\n        totalAmount { amount currencyCode }\n      }\n      lines(first: 100) {\n        nodes {\n          id\n          quantity\n          merchandise {\n            ... on ProductVariant {\n              id\n              title\n              product {\n                handle\n                title\n                featuredImage { url altText }\n              }\n              selectedOptions { name value }\n              price { amount currencyCode }\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: CartIdQuery;
    variables: CartIdQueryVariables;
  };
  '#graphql\n  query CartQuery($cartId: ID!) {\n    cart(id: $cartId) {\n      id\n      checkoutUrl\n      totalQuantity\n      cost {\n        subtotalAmount { amount currencyCode }\n        totalAmount { amount currencyCode }\n      }\n      lines(first: 100) {\n        nodes {\n          id\n          quantity\n          merchandise {\n            ... on ProductVariant {\n              id\n              title\n              product {\n                handle\n                title\n                featuredImage { url altText }\n              }\n              selectedOptions { name value }\n              price { amount currencyCode }\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: CartQueryQuery;
    variables: CartQueryQueryVariables;
  };
  '#graphql\n  query ShopPolicies {\n    shop {\n      privacyPolicy { title body }\n      termsOfService { title body }\n      refundPolicy { title body }\n      shippingPolicy { title body }\n      subscriptionPolicy { title body }\n    }\n  }\n': {
    return: ShopPoliciesQuery;
    variables: ShopPoliciesQueryVariables;
  };
}

interface GeneratedMutationTypes {
  '#graphql\n  mutation Recover($email: String!) {\n    customerRecover(email: $email) {\n      customerUserErrors {\n        code\n        message\n      }\n    }\n  }\n': {
    return: RecoverMutation;
    variables: RecoverMutationVariables;
  };
  '#graphql\n  mutation CartCreate($input: CartInput!) {\n    cartCreate(input: $input) {\n      cart {\n        id\n        checkoutUrl\n        totalQuantity\n        cost {\n          subtotalAmount { amount currencyCode }\n          totalAmount { amount currencyCode }\n        }\n        lines(first: 100) {\n          nodes {\n            id\n            quantity\n            merchandise {\n              ... on ProductVariant {\n                id\n                title\n                product {\n                  handle\n                  title\n                  featuredImage { url altText }\n                }\n                selectedOptions { name value }\n                price { amount currencyCode }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: CartCreateMutation;
    variables: CartCreateMutationVariables;
  };
  '#graphql\n  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {\n    cartLinesAdd(cartId: $cartId, lines: $lines) {\n      userErrors {\n        field\n        message\n      }\n      cart {\n        id\n        checkoutUrl\n        totalQuantity\n        cost {\n          subtotalAmount { amount currencyCode }\n          totalAmount { amount currencyCode }\n        }\n        lines(first: 100) {\n          nodes {\n            id\n            quantity\n            merchandise {\n              ... on ProductVariant {\n                id\n                title\n                product {\n                  handle\n                  title\n                  featuredImage { url altText }\n                }\n                selectedOptions { name value }\n                price { amount currencyCode }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: CartLinesAddMutation;
    variables: CartLinesAddMutationVariables;
  };
  '#graphql\n  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {\n    cartLinesUpdate(cartId: $cartId, lines: $lines) {\n      cart {\n        id\n        checkoutUrl\n        totalQuantity\n        cost {\n          subtotalAmount { amount currencyCode }\n          totalAmount { amount currencyCode }\n        }\n        lines(first: 100) {\n          nodes {\n            id\n            quantity\n            merchandise {\n              ... on ProductVariant {\n                id\n                title\n                product { handle title }\n                price { amount currencyCode }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: CartLinesUpdateMutation;
    variables: CartLinesUpdateMutationVariables;
  };
  '#graphql\n  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {\n    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {\n      cart {\n        id\n        checkoutUrl\n        totalQuantity\n        cost {\n          subtotalAmount { amount currencyCode }\n          totalAmount { amount currencyCode }\n        }\n        lines(first: 100) {\n          nodes {\n            id\n            quantity\n            merchandise {\n              ... on ProductVariant {\n                id\n                title\n                product { handle title }\n                price { amount currencyCode }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: CartLinesRemoveMutation;
    variables: CartLinesRemoveMutationVariables;
  };
}

declare module '@shopify/hydrogen' {
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}

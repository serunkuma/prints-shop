import {type RouteConfig} from '@react-router/dev/routes';

const routes: RouteConfig = [
  {path: '/', file: 'routes/_index.tsx'},
  {path: 'products/:handle', file: 'routes/products.$handle.tsx'},
  {path: 'collections', file: 'routes/collections._index.tsx'},
  {path: 'collections/:handle', file: 'routes/collections.$handle.tsx'},
  {path: 'cart', file: 'routes/cart.tsx'},
  {path: 'search', file: 'routes/search.tsx'},
  {path: 'pages/:handle', file: 'routes/pages.$handle.tsx'},
  {path: 'drops', file: 'routes/drops._index.tsx'},
  {path: 'drops/:handle', file: 'routes/drops.$handle.tsx'},
  {path: 'artists', file: 'routes/artists._index.tsx'},
  {path: 'artists/:handle', file: 'routes/artists.$handle.tsx'},
  {path: 'account', file: 'routes/account.tsx'},
  {path: 'account/login', file: 'routes/account.login.tsx'},
  {path: 'account/orders', file: 'routes/account.orders.tsx'},
  {path: 'account/authorize', file: 'routes/account.authorize.tsx'},
  {path: 'account/orders/:orderId', file: 'routes/account.orders.$orderId.tsx'},
  {path: 'policies/:policyHandle', file: 'routes/policies.$policyHandle.tsx'},
  {path: 'robots.txt', file: 'routes/robots.txt.tsx'},
  {path: 'sitemap.xml', file: 'routes/sitemap.xml.tsx'},
];

export default routes;

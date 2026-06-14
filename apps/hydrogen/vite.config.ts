import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {reactRouter} from '@react-router/dev/vite';
import {sanity} from 'hydrogen-sanity/vite';

export default defineConfig({
  plugins: [hydrogen(), sanity(), oxygen(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    assetsInlineLimit: 0,
  },
  optimizeDeps: {
    include: ['set-cookie-parser', 'cookie', 'react-router'],
  },
});

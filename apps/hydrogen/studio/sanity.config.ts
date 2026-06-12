import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {visionTool} from '@sanity/vision';
import {schemaTypes} from './schemaTypes';

export default defineConfig({
  name: 'kumachi-prints',
  title: 'Kumachi Prints',
  projectId: '2wo9hx90',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});

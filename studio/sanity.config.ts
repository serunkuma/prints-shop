import {defineConfig, isDev} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {media, mediaAssetSource} from 'sanity-plugin-media'
import {customDocumentActions} from './plugins/customDocumentActions'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import Navbar from './components/studio/Navbar'

const devOnlyPlugins = [visionTool()]

export default defineConfig({
  name: 'kumachi-prints',
  title: 'Kumachi Prints',
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID || '2wo9hx90',
  dataset: import.meta.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    structureTool({structure}),
    colorInput(),
    customDocumentActions(),
    media(),
    ...(isDev ? devOnlyPlugins : []),
  ],
  schema: {
    types: schemaTypes,
  },
  form: {
    file: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource)
      },
    },
    image: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource === mediaAssetSource)
      },
    },
  },
  studio: {
    components: {
      navbar: Navbar,
    },
  },
})

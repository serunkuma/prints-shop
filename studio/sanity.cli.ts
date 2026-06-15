import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '2wo9hx90',
    dataset: 'production',
  },
  deployment: {
    autoUpdates: true,
  },
  studioHost: 'kumachi-prints',
})

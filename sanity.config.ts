import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemas } from './sanity-schema.js'

export default defineConfig({
  name: 'aem-ace',
  title: 'AEM Ace',
  projectId: 'z5tty2va', // Your project ID from sanity.ts
  dataset: 'production', // Your dataset from sanity.ts
  plugins: [structureTool()],
  schema: {
    types: schemas,
  },
})
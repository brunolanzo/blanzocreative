import { loadEnvConfig } from '@next/env'
import { defineCliConfig } from 'sanity/cli'

// Lê o .env.local também para os comandos do Sanity (seed, CORS, typegen).
loadEnvConfig(process.cwd())

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  // `npm run typegen`: gera os tipos TypeScript das consultas a partir do schema.
  typegen: {
    path: './src/**/*.{ts,tsx}',
    schema: './src/sanity/schema.json',
    generates: './src/sanity/sanity.types.ts',
  },
})

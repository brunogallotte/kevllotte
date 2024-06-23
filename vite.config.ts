import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    environmentMatchGlobs: [
      [
        './src/infra/http/controllers/**',
        './src/infra/http/vitest-environments/prisma.ts',
      ],
    ],
    dir: 'src',
  },
})

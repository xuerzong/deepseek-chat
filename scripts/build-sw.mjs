import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateSW } from 'workbox-build'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

const { count, size, warnings } = await generateSW({
  globDirectory: dist,
  globPatterns: ['**/*.{html,js,css,json,woff,woff2,ttf,svg,png,jpg,jpeg,gif,webp,ico}'],
  swDest: path.join(dist, 'sw.js'),
  inlineWorkboxRuntime: true,
  sourcemap: false,
  navigateFallback: 'index.html',
  cleanupOutdatedCaches: true,
  clientsClaim: true,
  maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
})

for (const warning of warnings) {
  console.warn(warning)
}

console.log(`Precached ${count} files (${(size / 1024 / 1024).toFixed(2)} MiB).`)

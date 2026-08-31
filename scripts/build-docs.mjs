import { cp, mkdir, rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const previews = ['angular', 'react', 'solid', 'svelte', 'vue']
const command = process.platform === 'win32' ? 'pnpm.CMD' : 'pnpm'
const run = (args, cwd) => {
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

for (const framework of previews) run(['build'], resolve(root, 'docs/preview', framework))

await rm(resolve(root, 'docs/site/public/previews'), { recursive: true, force: true })
run(['build'], resolve(root, 'docs/site'))

const outputRoot = resolve(root, 'docs/site/dist/previews')
await rm(outputRoot, { recursive: true, force: true })
await mkdir(outputRoot, { recursive: true })
for (const framework of previews) {
  const source = resolve(
    root,
    'docs/preview',
    framework,
    framework === 'angular' ? 'dist/browser' : 'dist',
  )
  await cp(source, resolve(outputRoot, framework), { recursive: true })
}
await cp(resolve(root, 'docs/site/dist/index.html'), resolve(root, 'docs/site/dist/404.html'))

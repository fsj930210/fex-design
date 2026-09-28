import fs from "node:fs"
import path from "node:path"
import { bundleComponentExclusiveUtils, getSharedCoreFiles } from "./core-bundler.ts"
import { inlineStyles } from "./styles-inliner.ts"
import type { ComponentsConfig, Framework, Layer, RegistryFile, RegistryItem } from "./types.ts"

export const UTILS_TEMPLATE = `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const identity = <T>(value: T): T => value
export const isBrowser = (): boolean => typeof window !== 'undefined'

export const isDev = (): boolean => {
  type GlobalWithProcess = typeof globalThis & {
    process?: { env?: { NODE_ENV?: string } }
  }
  return (globalThis as GlobalWithProcess).process?.env?.NODE_ENV !== 'production'
}

export function isFunction<T extends (...args: never[]) => unknown = (...args: never[]) => unknown>(
  value: unknown,
): value is T {
  return typeof value === 'function'
}

export function isThenable<T = unknown>(value: unknown): value is PromiseLike<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'then' in value &&
    isFunction((value as { then?: unknown }).then)
  )
}

export function shallowEqualObject(left: object, right: object): boolean {
  if (Object.is(left, right)) {
    return true
  }

  const leftKeys = Object.keys(left)
  const rightKeys = Object.keys(right)
  if (leftKeys.length !== rightKeys.length) {
    return false
  }

  const leftRecord = left as Record<string, unknown>
  const rightRecord = right as Record<string, unknown>
  return leftKeys.every((key) => Object.is(leftRecord[key], rightRecord[key]))
}
`

export async function resolveRegistryGraph(
  componentName: string,
  layer: Layer,
  framework: Framework,
  masterRepoRoot: string
): Promise<RegistryItem> {
  const frameworkPkgDir = path.join(masterRepoRoot, "packages", "@fex-design", "components", framework)
  const stylesPkgDir = path.join(masterRepoRoot, "packages", "@fex-design", "components", "styles", "src")

  const files: RegistryFile[] = []
  const dependencies = new Set<string>(["clsx", "tailwind-merge"])
  const registryDependencies = new Set<string>()

  let needsSharedCore = false

  const layersToProcess: Layer[] = []
  if (layer === "pro") layersToProcess.push("pro", "ui", "primitive")
  else if (layer === "ui") layersToProcess.push("ui", "primitive")
  else layersToProcess.push("primitive")

  for (const lyr of layersToProcess) {
    const compDir = path.join(frameworkPkgDir, "src", lyr, componentName)
    if (!fs.existsSync(compDir)) continue

    registryDependencies.add(`${lyr}/${componentName}`)
    const srcFiles = getSourceFiles(compDir)

    for (const f of srcFiles) {
      const relPath = path.relative(compDir, f).replace(/\\/g, "/")
      let content = fs.readFileSync(f, "utf-8")

      // A. Inline styles
      const inlined = await inlineStyles(content, stylesPkgDir)
      content = inlined.transformedCode
      if (inlined.hasCva) {
        dependencies.add("class-variance-authority")
      }

      // B. Rewrite imports
      content = transformComponentImports(content, lyr, componentName, framework)

      // Fix React 19 interface extension for render prop children
      content = content.replace(
        "export interface TooltipTriggerProps extends UseTooltipTriggerProps",
        "export interface TooltipTriggerProps extends Omit<UseTooltipTriggerProps, 'children'>"
      )

      if (content.includes("$utils/shared/")) {
        needsSharedCore = true
      }

      files.push({
        path: `${componentName}/${relPath}`,
        target: lyr,
        content,
      })
    }
  }

  // 2. Component-exclusive Utils
  const bundledUtils = bundleComponentExclusiveUtils(componentName, masterRepoRoot)
  if (bundledUtils) {
    if (bundledUtils.includes("$utils/shared/")) {
      needsSharedCore = true
    }
    files.push({
      path: `${componentName}/utils.ts`,
      target: "primitive",
      content: bundledUtils,
    })
  }

  // 3. Scan & Cascade Framework Hooks
  const hooksNeeded = new Set<string>()
  for (const file of files) {
    const hookMatches = file.content.matchAll(/\$hooks\/([a-zA-Z0-9_-]+)/g)
    for (const m of hookMatches) {
      hooksNeeded.add(m[1]!)
    }
  }

  const hooksDir = path.join(frameworkPkgDir, "src", "hooks")
  const visitedHooks = new Set<string>()
  const hookQueue = Array.from(hooksNeeded)

  while (hookQueue.length > 0) {
    const hookName = hookQueue.shift()!
    if (visitedHooks.has(hookName)) continue
    visitedHooks.add(hookName)

    const hookFile = path.join(hooksDir, `${hookName}.ts`)
    if (fs.existsSync(hookFile)) {
      registryDependencies.add(`hooks/${hookName}`)
      let hookContent = fs.readFileSync(hookFile, "utf-8")

      hookContent = hookContent
        .replace(/from\s+['"]@fex-design\/core\/store\/create-store['"]/g, "from '$utils/shared/store/create-store'")
        .replace(/from\s+['"]@fex-design\/core\/([^'"]+)['"]/g, "from '$utils/shared/$1'")
        .replace(/from\s+['"]@fex-design\/utils(?:\/index)?['"]/g, "from '$utils'")

      if (hookContent.includes("$utils/shared/")) {
        needsSharedCore = true
      }

      const siblingMatches = hookContent.matchAll(/from\s+['"]\.\/([a-zA-Z0-9_-]+)['"]/g)
      for (const sm of siblingMatches) {
        if (!visitedHooks.has(sm[1]!)) {
          hookQueue.push(sm[1]!)
        }
      }

      files.push({
        path: `${hookName}.ts`,
        target: "hooks",
        content: hookContent,
      })
    }
  }

  // 4. Cascade Icons
  const iconsNeeded = new Set<string>()
  for (const file of files) {
    const iconMatches = file.content.matchAll(/\$icons\/([a-zA-Z0-9_-]+)/g)
    for (const m of iconMatches) {
      iconsNeeded.add(m[1]!)
    }
  }

  const iconsDir = path.join(frameworkPkgDir, "src", "icons")
  for (const icon of iconsNeeded) {
    const iconFile = path.join(iconsDir, `${icon}.tsx`)
    if (fs.existsSync(iconFile)) {
      registryDependencies.add(`icons/${icon}`)
      let iconContent = fs.readFileSync(iconFile, "utf-8")
      iconContent = iconContent.replace(/from\s+['"]@fex-design\/utils['"]/g, "from '$utils'")
      files.push({
        path: `${icon}.tsx`,
        target: "icons",
        content: iconContent,
      })
    }
  }

  // 5. Shared Core Infrastructure
  if (needsSharedCore) {
    const sharedFiles = getSharedCoreFiles(masterRepoRoot)
    dependencies.add("@floating-ui/dom")
    for (const sf of sharedFiles) {
      files.push({
        path: `shared/${sf.subpath}`,
        target: "utils",
        content: sf.content,
      })
    }
  }

  return {
    name: componentName,
    layer,
    framework,
    dependencies: Array.from(dependencies),
    registryDependencies: Array.from(registryDependencies),
    files,
  }
}

function transformComponentImports(
  code: string,
  currentLayer: Layer,
  componentName: string,
  framework: Framework
): string {
  let res = code

  // 1. Shared core infrastructure imports
  res = res.replace(
    /from\s+['"]@fex-design\/core\/(store|disclosure|floating|overlay|collection|interactions)\/([^'"]+)['"]/g,
    "from '$utils/shared/$1/$2'"
  )

  // 2. Component-exclusive core imports
  if (currentLayer === "primitive") {
    res = res.replace(/from\s+['"]@fex-design\/core(?:\/[^'"]+)?['"]/g, "from './utils'")
  } else {
    res = res.replace(/from\s+['"]@fex-design\/core(?:\/[^'"]+)?['"]/g, `from '$primitive/${componentName}/utils'`)
  }

  // 3. Framework component & hook imports
  res = res.replace(
    new RegExp(`from\\s+['"]@fex-design\\/${framework}\\/primitive\\/([^'"]+)['"]`, "g"),
    "from '$primitive/$1'"
  )
  res = res.replace(
    new RegExp(`from\\s+['"]@fex-design\\/${framework}\\/ui\\/([^'"]+)['"]`, "g"),
    "from '$ui/$1'"
  )
  res = res.replace(
    new RegExp(`from\\s+['"]@fex-design\\/${framework}\\/pro\\/([^'"]+)['"]`, "g"),
    "from '$pro/$1'"
  )
  res = res.replace(
    new RegExp(`from\\s+['"]@fex-design\\/${framework}\\/hooks\\/([^'"]+)['"]`, "g"),
    "from '$hooks/$1'"
  )
  res = res.replace(
    new RegExp(`from\\s+['"]@fex-design\\/${framework}\\/icons\\/([^'"]+)['"]`, "g"),
    "from '$icons/$1'"
  )
  res = res.replace(/from\s+['"]@fex-design\/utils(?:\/index)?['"]/g, "from '$utils'")

  return res
}

export function applyAliasesToContent(content: string, config: ComponentsConfig): string {
  return content
    .replaceAll("$ui", config.aliases.ui)
    .replaceAll("$primitive", config.aliases.primitive)
    .replaceAll("$pro", config.aliases.pro)
    .replaceAll("$hooks", config.aliases.hooks)
    .replaceAll("$utils", config.aliases.utils)
    .replaceAll("$icons", config.aliases.icons)
}

function getSourceFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === "examples" || entry.name === "node_modules") continue
      files.push(...getSourceFiles(full))
    } else if (
      entry.isFile() &&
      !entry.name.endsWith(".md") &&
      !entry.name.endsWith(".test.ts") &&
      !entry.name.endsWith(".test.tsx") &&
      !entry.name.endsWith(".spec.ts")
    ) {
      files.push(full)
    }
  }
  return files
}


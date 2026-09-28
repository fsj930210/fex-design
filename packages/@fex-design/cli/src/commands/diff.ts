import fs from "node:fs"
import path from "node:path"
import {
  findMasterRepoRoot,
  loadComponentsConfig,
  resolveAliasToPhysicalDir,
  resolveTargetProjectDir,
} from "../config.ts"
import { computeLineDiff, formatDiffOutput } from "../diff.ts"
import { applyAliasesToContent, resolveRegistryGraph } from "../registry.ts"
import type { Framework, Layer } from "../types.ts"

interface DiffOptions {
  framework?: string | undefined
  project?: string | undefined
  layer?: string | undefined
  cwd?: string | undefined
}

export async function runDiff(component: string | undefined, options: DiffOptions): Promise<void> {
  const cwd = options.cwd ?? process.cwd()
  const targetDir = resolveTargetProjectDir(cwd, options.project)
  const masterRepoRoot = findMasterRepoRoot(cwd)

  const config = loadComponentsConfig(targetDir)
  if (!config) {
    console.error(`❌ components.json not found in ${targetDir}. Please run "fex init" first.`)
    process.exit(1)
  }

  const framework: Framework = (options.framework as Framework) || config.framework
  const layer: Layer = (options.layer as Layer) || "ui"

  if (!component) {
    console.log("ℹ Please specify a component to diff. Example: fex diff popover")
    process.exit(1)
  }

  let compName = component
  let compLayer = layer
  if (component.startsWith("primitive/")) {
    compLayer = "primitive"
    compName = component.slice("primitive/".length)
  } else if (component.startsWith("ui/")) {
    compLayer = "ui"
    compName = component.slice("ui/".length)
  } else if (component.startsWith("pro/")) {
    compLayer = "pro"
    compName = component.slice("pro/".length)
  }

  console.log(`\n🔍 Comparing local [${compLayer}] ${compName} against official registry...`)

  const registryItem = await resolveRegistryGraph(compName, compLayer, framework, masterRepoRoot)
  if (registryItem.files.length === 0) {
    console.error(`❌ Component "${compName}" not found in registry.`)
    process.exit(1)
  }

  let totalDiffCount = 0

  for (const file of registryItem.files) {
    const aliasStr = config.aliases[file.target] || config.aliases.components
    const basePhysDir = resolveAliasToPhysicalDir(targetDir, aliasStr, masterRepoRoot)
    const destPath = path.join(basePhysDir, file.path)
    const relDisplay = path.relative(targetDir, destPath)

    const expectedCode = applyAliasesToContent(file.content, config)

    if (!fs.existsSync(destPath)) {
      console.log(`\n📄 ${relDisplay} [Not installed locally]`)
      continue
    }

    const localCode = fs.readFileSync(destPath, "utf-8")
    const diffs = computeLineDiff(localCode, expectedCode)
    const changes = diffs.filter((d) => d.type !== "same")

    if (changes.length > 0) {
      totalDiffCount++
      console.log(`\n📄 ${relDisplay} (${changes.length} change(s)):`)
      console.log(formatDiffOutput(diffs))
    }
  }

  if (totalDiffCount === 0) {
    console.log(`\n✨ All files for "${compName}" are up-to-date with registry.\n`)
  }
}


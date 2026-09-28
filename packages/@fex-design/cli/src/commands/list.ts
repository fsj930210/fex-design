import fs from "node:fs"
import path from "node:path"
import { detectFramework, findMasterRepoRoot, loadComponentsConfig, resolveTargetProjectDir } from "../config.ts"
import type { Framework } from "../types.ts"

interface ListOptions {
  framework?: string | undefined
  project?: string | undefined
  cwd?: string | undefined
}

export async function runList(options: ListOptions): Promise<void> {
  const cwd = options.cwd ?? process.cwd()
  const targetDir = resolveTargetProjectDir(cwd, options.project)
  const masterRepoRoot = findMasterRepoRoot(cwd)

  const config = loadComponentsConfig(targetDir)
  const framework: Framework = (options.framework as Framework) || config?.framework || detectFramework(targetDir)

  const frameworkPkgDir = path.join(masterRepoRoot, "packages", "@fex-design", "components", framework)
  const proDir = path.join(frameworkPkgDir, "src", "pro")
  const uiDir = path.join(frameworkPkgDir, "src", "ui")
  const primitiveDir = path.join(frameworkPkgDir, "src", "primitive")

  const proComponents = fs.existsSync(proDir)
    ? fs.readdirSync(proDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
    : []

  const uiComponents = fs.existsSync(uiDir)
    ? fs.readdirSync(uiDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
    : []

  const primitiveComponents = fs.existsSync(primitiveDir)
    ? fs.readdirSync(primitiveDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
    : []

  console.log(`\n📚 Available Components for [${framework}]:\n`)

  if (proComponents.length > 0) {
    console.log(`Pro Components (${proComponents.length}):`)
    console.log(`  ${proComponents.sort().join(", ")}\n`)
  }

  console.log(`UI Components (${uiComponents.length}):`)
  console.log(`  ${uiComponents.sort().join(", ")}\n`)

  console.log(`Primitive Components (${primitiveComponents.length}):`)
  console.log(`  ${primitiveComponents.sort().join(", ")}\n`)
}


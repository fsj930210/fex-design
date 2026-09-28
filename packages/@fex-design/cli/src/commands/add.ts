import fs from "node:fs"
import path from "node:path"
import readline from "node:readline"
import {
  detectFramework,
  findMasterRepoRoot,
  loadComponentsConfig,
  resolveAliasToPhysicalDir,
  resolveTargetProjectDir,
  saveComponentsConfig,
  resolveLocalSchemaPath,
} from "../config.ts"
import { ensureDependencies } from "../pm.ts"
import { applyAliasesToContent, resolveRegistryGraph, UTILS_TEMPLATE } from "../registry.ts"
import type { ComponentsConfig, Framework, Layer } from "../types.ts"

interface AddOptions {
  framework?: string | undefined
  project?: string | undefined
  layer?: string | undefined
  overwrite?: boolean | undefined
  dryRun?: boolean | undefined
  all?: boolean | undefined
  yes?: boolean | undefined
  cwd?: string | undefined
}

export async function runAdd(components: string[], options: AddOptions): Promise<void> {
  const cwd = options.cwd ?? process.cwd()
  const targetDir = resolveTargetProjectDir(cwd, options.project)
  const masterRepoRoot = findMasterRepoRoot(cwd)

  if (!fs.existsSync(targetDir)) {
    console.error(`❌ Target project directory not found: ${targetDir}`)
    process.exit(1)
  }

  let config = loadComponentsConfig(targetDir)
  const detectedFramework = detectFramework(targetDir)
  const framework: Framework = (options.framework as Framework) || config?.framework || detectedFramework

  if (!config) {
    console.log(`ℹ components.json not found. Auto-initializing default configuration...`)
    config = {
      $schema: resolveLocalSchemaPath(targetDir, masterRepoRoot),
      framework,
      tailwind: { version: "v4", css: "src/index.css", baseColor: "neutral" },
      aliases: {
        components: "@/components",
        ui: "@/components/ui",
        primitive: "@/components/primitive",
        pro: "@/components/pro",
        hooks: "@/hooks",
        utils: "@/lib/utils",
        lib: "@/lib",
        icons: "@/components/icons",
      },
    }
    saveComponentsConfig(targetDir, config)
  }

  const defaultLayer: Layer = (options.layer as Layer) || "ui"
  const available = discoverAvailableComponents(masterRepoRoot, framework, defaultLayer)

  if (options.all) {
    components = available
  } else if (components.length === 0) {
    components = await promptSelectComponents(available)
    if (components.length === 0) {
      console.log("❌ No components selected.")
      process.exit(0)
    }
  }

  console.log(`\n🚀 Adding component(s) to: ${targetDir}`)
  console.log(`⚙ Framework: ${framework} | Default Layer: ${defaultLayer}\n`)

  const summaryCreated: string[] = []
  const summarySkipped: string[] = []
  const allNpmDependencies = new Set<string>(["clsx", "tailwind-merge"])

  // Ensure utils.ts and utils/index.ts exist
  ensureUtilsFiles(targetDir, config, masterRepoRoot, options.dryRun, summaryCreated)

  for (let rawName of components) {
    let targetLayer: Layer = defaultLayer
    let compName = rawName

    if (rawName.startsWith("primitive/")) {
      targetLayer = "primitive"
      compName = rawName.slice("primitive/".length)
    } else if (rawName.startsWith("ui/")) {
      targetLayer = "ui"
      compName = rawName.slice("ui/".length)
    } else if (rawName.startsWith("pro/")) {
      targetLayer = "pro"
      compName = rawName.slice("pro/".length)
    }

    console.log(`🔍 Resolving registry graph for [${targetLayer}] ${compName}...`)

    const registryItem = await resolveRegistryGraph(compName, targetLayer, framework, masterRepoRoot)
    for (const dep of registryItem.dependencies) {
      allNpmDependencies.add(dep)
    }

    if (registryItem.files.length === 0) {
      console.warn(`  ⚠️ Component "${compName}" not found in layer "${targetLayer}" for ${framework}.`)
      continue
    }

    for (const file of registryItem.files) {
      const aliasStr = config.aliases[file.target] || config.aliases.components
      const basePhysDir = resolveAliasToPhysicalDir(targetDir, aliasStr, masterRepoRoot)
      const destPath = path.join(basePhysDir, file.path)
      const relDisplay = path.relative(targetDir, destPath)

      const finalCode = applyAliasesToContent(file.content, config)

      if (fs.existsSync(destPath) && !options.overwrite) {
        summarySkipped.push(relDisplay)
        console.log(`  - [skip] ${relDisplay} (already exists, use -o to overwrite)`)
        continue
      }

      if (options.dryRun) {
        console.log(`  * [dry-run] Would write: ${relDisplay}`)
        summaryCreated.push(relDisplay)
      } else {
        fs.mkdirSync(path.dirname(destPath), { recursive: true })
        fs.writeFileSync(destPath, finalCode, "utf-8")
        summaryCreated.push(relDisplay)
        console.log(`  ✔ [${file.target}] ${relDisplay}`)
      }
    }
  }

  // Re-ensure utils/index.ts if shared utils folder was created
  ensureUtilsFiles(targetDir, config, masterRepoRoot, options.dryRun, summaryCreated)

  // Install missing npm dependencies
  ensureDependencies(targetDir, Array.from(allNpmDependencies), { dryRun: options.dryRun })

  console.log(`\n--------------------------------------------------`)
  console.log(`✨ Done! ${summaryCreated.length} file(s) created/updated.`)
  if (summarySkipped.length > 0) {
    console.log(`ℹ Skipped: ${summarySkipped.length} existing file(s).`)
  }
}

function ensureUtilsFiles(
  targetDir: string,
  config: ComponentsConfig,
  masterRepoRoot: string,
  dryRun: boolean | undefined,
  summaryCreated: string[]
) {
  const utilsDirOrFile = resolveAliasToPhysicalDir(targetDir, config.aliases.utils, masterRepoRoot)
  const filePath = utilsDirOrFile.endsWith(".ts") ? utilsDirOrFile : `${utilsDirOrFile}.ts`
  const indexInFolder = path.join(utilsDirOrFile, "index.ts")

  if (!dryRun) {
    if (!fs.existsSync(filePath) || !fs.readFileSync(filePath, "utf-8").includes("isDev")) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true })
      fs.writeFileSync(filePath, UTILS_TEMPLATE, "utf-8")
      summaryCreated.push(path.relative(targetDir, filePath))
    }
    if (fs.existsSync(utilsDirOrFile) && fs.statSync(utilsDirOrFile).isDirectory()) {
      if (!fs.existsSync(indexInFolder) || !fs.readFileSync(indexInFolder, "utf-8").includes("isDev")) {
        fs.writeFileSync(indexInFolder, UTILS_TEMPLATE, "utf-8")
      }
    }
  }
}

function discoverAvailableComponents(masterRepoRoot: string, framework: Framework, layer: Layer): string[] {
  const dir = path.join(masterRepoRoot, "packages", "@fex-design", "components", framework, "src", layer)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()
}

async function promptSelectComponents(available: string[]): Promise<string[]> {
  if (!process.stdin.isTTY) return []
  console.log(`\n📦 Available components (${available.length}):`)
  console.log("  " + available.join(", ") + "\n")

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    rl.question("👉 Enter component name(s) separated by space (or 'all'): ", (answer) => {
      rl.close()
      const trimmed = answer.trim()
      if (!trimmed) return resolve([])
      if (trimmed === "all") return resolve(available)
      resolve(trimmed.split(/\s+/))
    })
  })
}



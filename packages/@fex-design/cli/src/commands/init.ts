import fs from "node:fs"
import path from "node:path"
import {
  detectFramework,
  findMasterRepoRoot,
  loadComponentsConfig,
  resolveAliasToPhysicalDir,
  resolveTargetProjectDir,
  resolveLocalSchemaPath,
  saveComponentsConfig,
} from "../config.ts"
import { ensureDependencies } from "../pm.ts"
import { UTILS_TEMPLATE } from "../registry.ts"
import { injectThemeVariables } from "../theme.ts"
import type { ComponentsConfig, Framework } from "../types.ts"

interface InitOptions {
  framework?: string | undefined
  project?: string | undefined
  yes?: boolean | undefined
  cwd?: string | undefined
}

export async function runInit(options: InitOptions): Promise<void> {
  const cwd = options.cwd ?? process.cwd()
  const targetDir = resolveTargetProjectDir(cwd, options.project)
  const masterRepoRoot = findMasterRepoRoot(cwd)

  if (!fs.existsSync(targetDir)) {
    console.error(`❌ Target project directory not found: ${targetDir}`)
    process.exit(1)
  }

  const detectedFramework = detectFramework(targetDir)
  const framework: Framework = (options.framework as Framework) || detectedFramework

  console.log(`\n✨ Initializing project in: ${targetDir}`)
  console.log(`⚙ Detected framework: ${framework}\n`)

  const existing = loadComponentsConfig(targetDir)

  const config: ComponentsConfig = existing || {
    $schema: resolveLocalSchemaPath(targetDir, masterRepoRoot),
    framework,
    tailwind: {
      version: "v4",
      css: "src/index.css",
      baseColor: "neutral",
    },
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
  console.log(`  ✔ Wrote configuration: components.json`)

  // Clean up legacy fex.json if present
  const legacyFexJson = path.join(targetDir, "fex.json")
  if (fs.existsSync(legacyFexJson)) {
    fs.unlinkSync(legacyFexJson)
    console.log(`  ✔ Migrated and removed legacy fex.json`)
  }

  // 2. Inject CSS variables & theme tokens
  const themeInjected = injectThemeVariables(targetDir, config.tailwind.css)
  if (themeInjected) {
    console.log(`  ✔ Injected CSS theme variables into: ${config.tailwind.css}`)
  } else {
    console.log(`  ℹ CSS theme variables already present in: ${config.tailwind.css}`)
  }

  // 3. Create utils.ts (`cn` + `shallowEqualObject`)
  const utilsPhysicalPath = resolveAliasToPhysicalDir(
    targetDir,
    config.aliases.utils,
    masterRepoRoot
  )
  const utilsFile = utilsPhysicalPath.endsWith(".ts")
    ? utilsPhysicalPath
    : fs.existsSync(utilsPhysicalPath) && fs.statSync(utilsPhysicalPath).isDirectory()
      ? path.join(utilsPhysicalPath, "index.ts")
      : `${utilsPhysicalPath}.ts`

  fs.mkdirSync(path.dirname(utilsFile), { recursive: true })
  fs.writeFileSync(utilsFile, UTILS_TEMPLATE, "utf-8")
  console.log(`  ✔ Generated utilities: ${path.relative(targetDir, utilsFile)}`)

  // 4. Ensure base dependencies
  ensureDependencies(targetDir, ["clsx", "tailwind-merge", "class-variance-authority"])

  console.log(`\n🎉 Project initialized! Run "fex add <component>" to add components.\n`)
}


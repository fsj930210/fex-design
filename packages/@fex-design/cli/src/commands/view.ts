import {
  detectFramework,
  findMasterRepoRoot,
  loadComponentsConfig,
  resolveTargetProjectDir,
} from "../config.ts"
import { applyAliasesToContent, resolveRegistryGraph } from "../registry.ts"
import type { ComponentsConfig, Framework, Layer } from "../types.ts"

interface ViewOptions {
  framework?: string | undefined
  project?: string | undefined
  layer?: string | undefined
  cwd?: string | undefined
}

export async function runView(component: string, options: ViewOptions): Promise<void> {
  const cwd = options.cwd ?? process.cwd()
  const targetDir = resolveTargetProjectDir(cwd, options.project)
  const masterRepoRoot = findMasterRepoRoot(cwd)

  const loaded = loadComponentsConfig(targetDir)
  const framework: Framework = (options.framework as Framework) || loaded?.framework || detectFramework(targetDir)
  const config: ComponentsConfig = loaded || {
    framework,
    tailwind: { version: "v4", css: "src/index.css" },
    aliases: {
      components: "@/components",
      ui: "@/components/ui",
      primitive: "@/components/primitive",
      pro: "@/components/pro",
      hooks: "@/hooks",
      utils: "@/lib/utils",
      icons: "@/components/icons",
    },
  }

  let compName = component
  let layer: Layer = (options.layer as Layer) || "ui"
  if (component.startsWith("primitive/")) {
    layer = "primitive"
    compName = component.slice("primitive/".length)
  } else if (component.startsWith("ui/")) {
    layer = "ui"
    compName = component.slice("ui/".length)
  } else if (component.startsWith("pro/")) {
    layer = "pro"
    compName = component.slice("pro/".length)
  }

  const registryItem = await resolveRegistryGraph(compName, layer, framework, masterRepoRoot)
  if (registryItem.files.length === 0) {
    console.error(`❌ Component "${compName}" not found for ${framework}.`)
    process.exit(1)
  }

  console.log(`\n👀 Previewing [${layer}] ${compName} (${framework}):`)
  console.log(`📦 Dependencies: ${registryItem.dependencies.join(", ")}`)
  console.log(`🔗 Registry Cascade: ${registryItem.registryDependencies.join(", ")}\n`)

  for (const file of registryItem.files) {
    const finalCode = applyAliasesToContent(file.content, config)
    console.log(`================================================================`)
    console.log(`📄 [${file.target}] ${file.path}`)
    console.log(`================================================================`)
    console.log(finalCode)
  }
}


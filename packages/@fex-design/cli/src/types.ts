export type Framework = "react" | "vue" | "solid" | "svelte" | "angular"

export type Layer = "primitive" | "ui" | "pro"

export type TargetBucket = "ui" | "primitive" | "pro" | "hooks" | "utils" | "icons"

export interface ComponentsConfig {
  $schema?: string
  framework: Framework
  tailwind: {
    version?: "v3" | "v4"
    css: string
    baseColor?: string
  }
  aliases: {
    components: string
    ui: string
    primitive: string
    pro: string
    hooks: string
    utils: string
    lib?: string
    icons: string
  }
}

export interface RegistryFile {
  path: string
  target: TargetBucket
  content: string
}

export interface RegistryItem {
  name: string
  layer: Layer
  framework: Framework
  dependencies: string[]
  registryDependencies: string[]
  files: RegistryFile[]
}

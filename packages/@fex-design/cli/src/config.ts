import fs from "node:fs"
import path from "node:path"
import type { ComponentsConfig, Framework } from "./types.ts"

export function findMasterRepoRoot(startDir: string = process.cwd()): string {
  let curr = path.resolve(startDir)
  while (curr !== path.dirname(curr)) {
    if (
      fs.existsSync(path.join(curr, "pnpm-workspace.yaml")) &&
      (fs.existsSync(path.join(curr, "packages", "@fex-design")) ||
        fs.existsSync(path.join(curr, "packages", "@fex-design", "core")))
    ) {
      return curr
    }
    curr = path.dirname(curr)
  }
  return path.resolve(startDir)
}

export function resolveTargetProjectDir(cwd: string, projectOption?: string): string {
  if (projectOption) {
    return path.resolve(cwd, projectOption)
  }

  let curr = path.resolve(cwd)
  while (curr !== path.dirname(curr)) {
    if (fs.existsSync(path.join(curr, "components.json")) || fs.existsSync(path.join(curr, "fex.json"))) {
      return curr
    }
    if (
      fs.existsSync(path.join(curr, "package.json")) &&
      !fs.existsSync(path.join(curr, "pnpm-workspace.yaml"))
    ) {
      return curr
    }
    curr = path.dirname(curr)
  }

  return path.resolve(cwd)
}

export function detectFramework(targetDir: string): Framework {
  const pkgPath = path.join(targetDir, "package.json")
  if (!fs.existsSync(pkgPath)) return "react"

  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
    const deps = { ...pkg.dependencies, ...pkg.devDependencies }

    if (deps["@angular/core"]) return "angular"
    if (deps["svelte"]) return "svelte"
    if (deps["solid-js"]) return "solid"
    if (deps["vue"]) return "vue"
    if (deps["react"]) return "react"
  } catch {
    // ignore
  }

  return "react"
}

export function resolveLocalSchemaPath(targetDir: string, workspaceRoot?: string): string {
  const localSchema = path.join(targetDir, "node_modules", "@fex-design", "cli", "schema.json")
  if (fs.existsSync(localSchema)) {
    return "./node_modules/@fex-design/cli/schema.json"
  }

  const root = workspaceRoot || findMasterRepoRoot(targetDir)
  if (root && path.resolve(root) !== path.resolve(targetDir)) {
    const rootSchema = path.join(root, "node_modules", "@fex-design", "cli", "schema.json")
    if (fs.existsSync(rootSchema)) {
      let rel = path.relative(targetDir, rootSchema).replace(/\\/g, "/")
      if (!rel.startsWith(".")) rel = "./" + rel
      return rel
    }
    let rel = path.relative(targetDir, path.join(root, "node_modules", "@fex-design", "cli", "schema.json")).replace(/\\/g, "/")
    if (!rel.startsWith(".")) rel = "./" + rel
    return rel
  }

  return "./node_modules/@fex-design/cli/schema.json"
}

export function loadComponentsConfig(targetDir: string): ComponentsConfig | null {
  const componentsPath = path.join(targetDir, "components.json")
  if (fs.existsSync(componentsPath)) {
    try {
      const cfg = JSON.parse(fs.readFileSync(componentsPath, "utf-8"))
      return normalizeConfig(cfg, targetDir)
    } catch {
      return null
    }
  }

  const legacyPath = path.join(targetDir, "fex.json")
  if (fs.existsSync(legacyPath)) {
    try {
      const cfg = JSON.parse(fs.readFileSync(legacyPath, "utf-8"))
      return normalizeConfig(cfg, targetDir)
    } catch {
      return null
    }
  }

  return null
}

function normalizeConfig(raw: any, targetDir?: string): ComponentsConfig {
  const aliases = raw.aliases || {}
  let schema = raw.$schema
  if (!schema || schema.includes("fex-design.dev")) {
    schema = targetDir ? resolveLocalSchemaPath(targetDir) : "./node_modules/@fex-design/cli/schema.json"
  }
  return {
    $schema: schema,
    framework: raw.framework || "react",
    tailwind: {
      version: raw.tailwind?.version || "v4",
      css: raw.tailwind?.css || "src/index.css",
      baseColor: raw.tailwind?.baseColor || "neutral",
    },
    aliases: {
      components: aliases.components || "@/components",
      ui: aliases.ui || aliases.components || "@/components/ui",
      primitive: aliases.primitive || "@/components/primitive",
      pro: aliases.pro || "@/components/pro",
      hooks: aliases.hooks || "@/hooks",
      utils: aliases.utils || "@/lib/utils",
      lib: aliases.lib || "@/lib",
      icons: aliases.icons || "@/components/icons",
    },
  }
}

export function saveComponentsConfig(targetDir: string, config: ComponentsConfig): void {
  const componentsPath = path.join(targetDir, "components.json")
  if (!config.$schema || config.$schema.includes("fex-design.dev")) {
    config.$schema = resolveLocalSchemaPath(targetDir)
  }
  fs.writeFileSync(componentsPath, JSON.stringify(config, null, 2) + "\n", "utf-8")
}

/**
 * Resolve an alias string (e.g. `@/hooks` or `@rap/hooks` or `@demo/ui/components`)
 * to a physical directory on disk, supporting both SPA and Monorepos without tsconfig.json.
 */
export function resolveAliasToPhysicalDir(
  targetDir: string,
  aliasValue: string,
  workspaceRoot?: string
): string {
  // 1. Standard SPA alias: starts with @/ or ~/
  if (aliasValue.startsWith("@/") || aliasValue.startsWith("~/")) {
    const subpath = aliasValue.slice(2)
    const srcDir = path.join(targetDir, "src")
    if (fs.existsSync(srcDir)) {
      return path.join(srcDir, subpath)
    }
    return path.join(targetDir, subpath)
  }

  // 2. Relative path: starts with ./ or ../
  if (aliasValue.startsWith("./") || aliasValue.startsWith("../")) {
    return path.resolve(targetDir, aliasValue)
  }

  // 3. Monorepo package-style alias (e.g. `@repo/hooks`, `@rap/components-ui/components`)
  const localRoot = findWorkspaceRoot(targetDir);
  if (localRoot) {
    const matched = findPackageDirByAlias(localRoot, aliasValue);
    if (matched) return matched;
  }
  if (workspaceRoot) {
    const matched = findPackageDirByAlias(workspaceRoot, aliasValue);
    if (matched) return matched;
  }

  // Fallback: place inside targetDir under the stripped name
  const fallbackSubpath = aliasValue.replace(/^@/, "").replace(/\//g, path.sep)
  const srcDir = path.join(targetDir, "src")
  if (fs.existsSync(srcDir)) {
    return path.join(srcDir, fallbackSubpath)
  }
  return path.join(targetDir, fallbackSubpath)
}

function findWorkspaceRoot(startDir: string): string | null {
  let curr = path.resolve(startDir)
  while (curr !== path.dirname(curr)) {
    if (
      fs.existsSync(path.join(curr, "pnpm-workspace.yaml")) ||
      fs.existsSync(path.join(curr, "lerna.json"))
    ) {
      return curr
    }
    curr = path.dirname(curr)
  }
  return null
}

function findPackageDirByAlias(workspaceRoot: string, alias: string): string | null {
  const searchDirs = [
    path.join(workspaceRoot, "packages"),
    path.join(workspaceRoot, "apps"),
    path.join(workspaceRoot, "libs"),
  ]

  for (const sDir of searchDirs) {
    if (!fs.existsSync(sDir)) continue
    const entries = fs.readdirSync(sDir, { withFileTypes: true })
    for (const ent of entries) {
      if (!ent.isDirectory()) continue
      const pkgJsonPath = path.join(sDir, ent.name, "package.json")
      if (fs.existsSync(pkgJsonPath)) {
        try {
          const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"))
          if (pkg.name && (alias === pkg.name || alias.startsWith(pkg.name + "/"))) {
            const pkgDir = path.join(sDir, ent.name)
            const remainder = alias === pkg.name ? "" : alias.slice(pkg.name.length + 1)
            const hasSrc = fs.existsSync(path.join(pkgDir, "src"))
            const baseDir = hasSrc ? path.join(pkgDir, "src") : pkgDir
            return remainder ? path.join(baseDir, remainder) : baseDir
          }
        } catch {
          // ignore
        }
      }
    }
  }
  return null
}

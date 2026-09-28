import fs from "node:fs"
import path from "node:path"

export interface SharedCoreFile {
  subpath: string
  content: string
}

const SHARED_CORE_FOLDERS = ["store", "disclosure", "floating", "overlay", "collection", "interactions"]

export function getSharedCoreFiles(masterRepoRoot: string): SharedCoreFile[] {
  const coreSrc = path.join(masterRepoRoot, "packages", "@fex-design", "core", "src")
  if (!fs.existsSync(coreSrc)) return []

  const result: SharedCoreFile[] = []

  for (const folder of SHARED_CORE_FOLDERS) {
    const dirPath = path.join(coreSrc, folder)
    if (!fs.existsSync(dirPath)) continue

    const files = getFilesRecursively(dirPath)
    for (const f of files) {
      const rel = path.relative(coreSrc, f).replace(/\\/g, "/")
      if (rel.endsWith(".test.ts") || rel.endsWith(".md")) continue

      let code = fs.readFileSync(f, "utf-8")
      code = code.replace(/['"]@fex-design\/utils(?:\/index)?['"]/g, "'$utils'")
      code = code.replace(/['"]@fex-design\/core\/([^'"]+)['"]/g, (_match, sub) => {
        return `'$utils/shared/${sub}'`
      })

      result.push({ subpath: rel, content: code })
    }
  }

  return result
}

export function bundleComponentExclusiveUtils(
  componentName: string,
  masterRepoRoot: string
): string | null {
  const compCoreDir = path.join(
    masterRepoRoot,
    "packages",
    "@fex-design",
    "core",
    "src",
    componentName
  )
  if (!fs.existsSync(compCoreDir)) return null

  const files = fs.readdirSync(compCoreDir).filter(
    (f) => f.endsWith(".ts") && !f.endsWith(".test.ts")
  )
  if (files.length === 0) return null

  const priority = (name: string) => {
    if (name === "types.ts") return 1
    if (name === "options.ts") return 2
    if (name === "accessibility.ts") return 3
    if (name.startsWith("create-")) return 4
    return 5
  }
  files.sort((a, b) => priority(a) - priority(b))

  const parts: string[] = []
  const externalImportLines: string[] = []

  for (const f of files) {
    const fullPath = path.join(compCoreDir, f)
    let content = fs.readFileSync(fullPath, "utf-8")

    content = content
      .replace(/(['"])\.\.\/store\/([^'"]+)\1/g, "'$utils/shared/store/$2'")
      .replace(/(['"])\.\.\/overlay\/([^'"]+)\1/g, "'$utils/shared/overlay/$2'")
      .replace(/(['"])\.\.\/disclosure\/([^'"]+)\1/g, "'$utils/shared/disclosure/$2'")
      .replace(/(['"])\.\.\/floating\/([^'"]+)\1/g, "'$utils/shared/floating/$2'")
      .replace(/(['"])\.\.\/collection\/([^'"]+)\1/g, "'$utils/shared/collection/$2'")
      .replace(/(['"])\.\.\/interactions\/([^'"]+)\1/g, "'$utils/shared/interactions/$2'")
      .replace(/(['"])@fex-design\/utils(?:\/index)?\1/g, "'$utils'")

    content = content.replace(
      /import\s+(?:type\s+)?(?:\{[^}]*\}|[\w\s,*]+)\s+from\s+['"]\.\/[^'"]+['"]\s*;?\r?\n?/g,
      ""
    )
    content = content.replace(
      /export\s+(?:type\s+)?(?:\{[^}]*\}|\*)\s+from\s+['"]\.\/[^'"]+['"]\s*;?\r?\n?/g,
      ""
    )

    const importRegex = /import\s+(?:type\s+)?(?:\{[^}]*\}|[\w\s,*]+)\s+from\s+['"][^'"]+['"]\s*;?/g
    let match: RegExpExecArray | null
    while ((match = importRegex.exec(content)) !== null) {
      externalImportLines.push(match[0].trim())
    }
    content = content.replace(importRegex, "").trim()

    if (content) {
      parts.push(content)
    }
  }

  const mergedHeader = mergeImports(externalImportLines)
  const fullBody = parts.join("\n\n")

  return `${mergedHeader}\n\n${fullBody}\n`
}

function mergeImports(importStatements: string[]): string {
  const map = new Map<string, { types: Set<string>; values: Set<string> }>()

  for (const stmt of importStatements) {
    const match = /import\s+(type\s+)?\{([^}]*)\}\s+from\s+['"]([^'"]+)['"]/.exec(stmt)
    if (!match) continue
    const isGlobalType = Boolean(match[1])
    const rawNames = match[2]!.split(",").map((s) => s.trim()).filter(Boolean)
    const mod = match[3]!

    if (!map.has(mod)) {
      map.set(mod, { types: new Set(), values: new Set() })
    }
    const entry = map.get(mod)!

    for (const raw of rawNames) {
      if (raw.startsWith("type ")) {
        entry.types.add(raw.slice(5).trim())
      } else if (isGlobalType) {
        entry.types.add(raw)
      } else {
        entry.values.add(raw)
      }
    }
  }

  const result: string[] = []
  for (const [mod, { types, values }] of map.entries()) {
    for (const v of values) {
      types.delete(v)
    }
    const parts: string[] = []
    for (const v of Array.from(values).sort()) {
      parts.push(v)
    }
    for (const t of Array.from(types).sort()) {
      parts.push(`type ${t}`)
    }
    if (parts.length > 0) {
      result.push(`import { ${parts.join(", ")} } from '${mod}'`)
    }
  }

  return result.join("\n")
}

function getFilesRecursively(dir: string): string[] {
  let files: string[] = []
  if (!fs.existsSync(dir)) return files
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const ent of entries) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      files = files.concat(getFilesRecursively(full))
    } else {
      files.push(full)
    }
  }
  return files
}

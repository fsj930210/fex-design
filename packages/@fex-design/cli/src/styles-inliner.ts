import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"

/** Extract the exact `const <name> = cva(...)` block using parenthesis balance */
function extractCvaDeclaration(source: string, name: string): string | null {
  const startRegex = new RegExp(`(?:export\\s+)?const\\s+${name}\\s*=\\s*cva\\s*\\(`)
  const match = startRegex.exec(source)
  if (!match) return null

  const startIndex = match.index
  const openParenIndex = startIndex + match[0].length - 1
  let depth = 0
  let inSingle = false
  let inDouble = false
  let inTemplate = false

  for (let i = openParenIndex; i < source.length; i++) {
    const ch = source[i]
    const prev = source[i - 1]
    if (prev !== "\\") {
      if (ch === "'" && !inDouble && !inTemplate) inSingle = !inSingle
      else if (ch === '"' && !inSingle && !inTemplate) inDouble = !inDouble
      else if (ch === "`" && !inSingle && !inDouble) inTemplate = !inTemplate
    }
    if (inSingle || inDouble || inTemplate) continue

    if (ch === "(") depth++
    else if (ch === ")") {
      depth--
      if (depth === 0) {
        return source.slice(startIndex, i + 1)
      }
    }
  }
  return null
}

/** Collapse array `.join(' ')` patterns inside CVA into pure string literals */
function collapseArrayJoins(cvaCode: string): string {
  return cvaCode.replace(/\[\s*((?:['"][^'"]*['"]\s*,?\s*)+)\]\.join\(\s*['"]\s*['"]\s*\)/g, (_, inner: string) => {
    const parts: string[] = []
    const strRegex = /['"]([^'"]*)['"]/g
    let m: RegExpExecArray | null
    while ((m = strRegex.exec(inner)) !== null) {
      if (m[1]) parts.push(m[1].trim())
    }
    return `"${parts.join(" ")}"`
  })
}

export async function inlineStyles(
  code: string,
  stylesDir: string
): Promise<{ transformedCode: string; hasCva: boolean }> {
  const importRegex = /import\s*\{([^{}]*)\}\s*from\s*['"]@fex-design\/components-styles\/([^'"]+)['"]/g
  let match: RegExpExecArray | null
  let result = code
  let hasCva = false

  const cvaDeclsToInject: string[] = []
  const replacements: { pattern: RegExp; replacement: string }[] = []
  const importsToRemove: string[] = []

  while ((match = importRegex.exec(code)) !== null) {
    const fullImport = match[0]
    importsToRemove.push(fullImport)

    const importedNames = match[1]!.split(",").map((s) => s.trim()).filter(Boolean)
    const styleModuleName = match[2]!
    const styleFilePath = path.join(stylesDir, `${styleModuleName}.ts`)

    if (!fs.existsSync(styleFilePath)) {
      continue
    }

    let styleModule: Record<string, any> = {}
    try {
      styleModule = await import(pathToFileURL(styleFilePath).href)
    } catch {
      // ignore
    }

    const rawStyleSource = fs.readFileSync(styleFilePath, "utf-8")

    for (const name of importedNames) {
      const exportedVal = styleModule[name]

      // Case 1: Simple string literal (e.g. cardClassName, buttonSpinnerClassName)
      if (typeof exportedVal === "string") {
        const cleanVal = exportedVal.trim().replace(/\s+/g, " ")

        // Replace JSX attr: className={cardClassName} -> className="cleanVal"
        replacements.push({
          pattern: new RegExp(`className=\\{${name}\\}`, "g"),
          replacement: `className="${cleanVal}"`,
        })

        // Replace inside cn(...): cn(cardClassName, ...) -> cn("cleanVal", ...)
        replacements.push({
          pattern: new RegExp(`(\\bcn\\s*\\([\\s\\S]*?)\\b${name}\\b`, "g"),
          replacement: `$1"${cleanVal}"`,
        })

        // Replace standalone identifier
        replacements.push({
          pattern: new RegExp(`(?<!['"])\\b${name}\\b(?!['"])`, "g"),
          replacement: `"${cleanVal}"`,
        })
        continue
      }

      // Case 2: CVA definition (e.g. buttonClassName = cva(buttonPrimitiveClassName, { ... }))
      const cvaRaw = extractCvaDeclaration(rawStyleSource, name)
      if (cvaRaw) {
        hasCva = true
        let cvaBody = cvaRaw

        // Inline base class into cva first argument if it references a variable (e.g. buttonPrimitiveClassName)
        const firstArgMatch = cvaBody.match(/cva\s*\(\s*([a-zA-Z0-9_]+)\s*,/)
        if (firstArgMatch && firstArgMatch[1]) {
          const baseVarName = firstArgMatch[1]
          if (typeof styleModule[baseVarName] === "string") {
            const baseStr = styleModule[baseVarName].trim().replace(/\s+/g, " ")
            cvaBody = cvaBody.replace(
              new RegExp(`cva\\s*\\(\\s*${baseVarName}\\s*,`),
              `cva(\n  "${baseStr}",`
            )
          }
        }

        // Collapse any [...].join(' ') inside the CVA
        cvaBody = collapseArrayJoins(cvaBody)

        // Make it private: const <name> = cva(...), NO export!
        cvaBody = cvaBody.replace(/^(?:export\s+)?const\s+[a-zA-Z0-9_]+\s*=/, `const ${name} =`)

        cvaDeclsToInject.push(cvaBody)
        continue
      }

      // Case 3: Static function returning string (e.g. buttonIconClassName())
      if (typeof exportedVal === "function") {
        try {
          const fnResult = exportedVal()
          if (typeof fnResult === "string") {
            const cleanVal = fnResult.trim().replace(/\s+/g, " ")
            replacements.push({
              pattern: new RegExp(`\\b${name}\\s*\\(\\s*\\)`, "g"),
              replacement: `"${cleanVal}"`,
            })
            continue
          }
        } catch {
          // ignore
        }
      }
    }
  }

  // 1. Remove style imports FIRST
  for (const imp of importsToRemove) {
    result = result.replace(imp, "")
  }

  // 2. Perform replacements
  for (const { pattern, replacement } of replacements) {
    result = result.replace(pattern, replacement)
  }

  // 3. Inject private CVA declarations if any
  if (cvaDeclsToInject.length > 0) {
    const uniqueDecls = Array.from(new Set(cvaDeclsToInject)).join("\n\n")

    const lines = result.split("\n")
    let lastImportIdx = -1
    for (let i = 0; i < lines.length; i++) {
      if (lines[i]!.trim().startsWith("import ") || lines[i]!.trim().startsWith("import{")) {
        lastImportIdx = i
      }
    }

    if (hasCva && !result.includes("from 'class-variance-authority'")) {
      const cvaImport = "import { cva } from 'class-variance-authority'"
      if (lastImportIdx >= 0) {
        lines.splice(lastImportIdx + 1, 0, cvaImport)
        lastImportIdx++
      } else {
        lines.unshift(cvaImport)
        lastImportIdx = 0
      }
    }

    if (lastImportIdx >= 0) {
      lines.splice(lastImportIdx + 1, 0, "\n" + uniqueDecls + "\n")
    } else {
      lines.unshift(uniqueDecls + "\n")
    }

    result = lines.join("\n")
  }

  result = result.replace(/\n{3,}/g, "\n\n").trim() + "\n"

  return { transformedCode: result, hasCva }
}
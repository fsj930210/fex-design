import fs from "node:fs"
import path from "node:path"
import { execSync } from "node:child_process"

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

export const KNOWN_DEP_VERSIONS: Record<string, string> = {
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.0.0",
  "class-variance-authority": "^0.7.1",
  "@floating-ui/dom": "^1.6.13",
}

export function detectPackageManager(targetDir: string): PackageManager {
  let curr = path.resolve(targetDir)
  while (curr !== path.dirname(curr)) {
    if (fs.existsSync(path.join(curr, "pnpm-lock.yaml"))) return "pnpm"
    if (fs.existsSync(path.join(curr, "bun.lockb")) || fs.existsSync(path.join(curr, "bun.lock"))) return "bun"
    if (fs.existsSync(path.join(curr, "yarn.lock"))) return "yarn"
    if (fs.existsSync(path.join(curr, "package-lock.json"))) return "npm"
    curr = path.dirname(curr)
  }
  return "pnpm"
}

export function ensureDependencies(
  targetDir: string,
  dependencies: string[],
  options: { dryRun?: boolean | undefined; silent?: boolean | undefined } = {}
): string[] {
  const pkgPath = path.join(targetDir, "package.json")
  if (!fs.existsSync(pkgPath)) return []

  let pkg: any
  try {
    pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
  } catch {
    return []
  }

  const existingDeps = { ...pkg.dependencies, ...pkg.devDependencies }
  const missingDeps: string[] = []

  for (const dep of dependencies) {
    if (!existingDeps[dep]) {
      missingDeps.push(dep)
    }
  }

  if (missingDeps.length === 0) return []

  if (!pkg.dependencies) pkg.dependencies = {}
  for (const dep of missingDeps) {
    const version = KNOWN_DEP_VERSIONS[dep] || "latest"
    pkg.dependencies[dep] = version
  }

  if (options.dryRun) {
    if (!options.silent) {
      console.log(`  * [dry-run] Would add dependencies to package.json: ${missingDeps.join(", ")}`)
    }
    return missingDeps
  }

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf-8")
  if (!options.silent) {
    console.log(`  📦 Added to package.json dependencies: ${missingDeps.join(", ")}`)
  }

  // Attempt auto-install if package manager is available
  const pm = detectPackageManager(targetDir)
  try {
    const cmd = pm === "pnpm" ? "pnpm install" : pm === "yarn" ? "yarn" : pm === "bun" ? "bun install" : "npm install"
    if (!options.silent) {
      console.log(`  ⚡ Running ${cmd} in ${targetDir}...`)
    }
    execSync(cmd, { cwd: targetDir, stdio: "ignore" })
  } catch {
    if (!options.silent) {
      console.log(`  ℹ Please run "${pm} install" in ${targetDir} to install new packages.`)
    }
  }

  return missingDeps
}


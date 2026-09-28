import fs from "node:fs"
import path from "node:path"
import readline from "node:readline"
import { findMasterRepoRoot, saveComponentsConfig, resolveLocalSchemaPath } from "../config.ts"
import { detectPackageManager, ensureDependencies } from "../pm.ts"
import { injectThemeVariables } from "../theme.ts"
import { runAdd } from "./add.ts"
import { runInit } from "./init.ts"
import type { ComponentsConfig, Framework } from "../types.ts"

export type TemplateType = "spa" | "monorepo"

interface CreateOptions {
  framework?: string | undefined
  template?: string | undefined
  preset?: string | undefined
  yes?: boolean | undefined
  cwd?: string | undefined
}

export async function runCreate(projectName: string | undefined, options: CreateOptions): Promise<void> {
  const cwd = options.cwd ?? process.cwd()

  let name = projectName
  if (!name) {
    name = await promptProjectName()
    if (!name) {
      name = "my-fex-app"
    }
  }

  const targetDir = path.resolve(cwd, name)
  if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
    console.error(`❌ Directory "${name}" already exists and is not empty.`)
    process.exit(1)
  }

  const framework: Framework = (options.framework as Framework) || "react"
  const template: TemplateType = (options.template as TemplateType) || "spa"
  const preset = options.preset || "base"

  console.log(`\n🚀 Creating project "${name}"...`)
  console.log(`⚙ Template: ${template} | Framework: ${framework} | Preset: ${preset}\n`)

  fs.mkdirSync(targetDir, { recursive: true })

  if (template === "monorepo") {
    await scaffoldMonorepo(targetDir, name, framework, preset)
  } else {
    await scaffoldSpa(targetDir, name, framework, preset)
  }

  const pm = detectPackageManager(targetDir)

  console.log(`\n🎉 Project "${name}" created successfully!\n`)
  console.log(`👉 Next steps:`)
  console.log(`  cd ${name}`)
  if (template === "monorepo") {
    console.log(`  ${pm} install`)
    console.log(`  ${pm} --filter web dev`)
  } else {
    console.log(`  ${pm} dev`)
  }
  console.log(`\n💡 To add more components later:`)
  console.log(`  ${pm} fex add <component>\n`)
}

async function scaffoldSpa(targetDir: string, name: string, framework: Framework, preset: string): Promise<void> {
  // 1. package.json
  const pkg = {
    name,
    private: true,
    type: "module",
    scripts: {
      dev: "vite",
      build: "vite build",
      typecheck: "tsc --noEmit -p tsconfig.json",
      fex: "node node_modules/@fex-design/cli/bin/fex.js",
    },
    dependencies: {
      react: "^19.0.0",
      "react-dom": "^19.0.0",
      clsx: "^2.1.1",
      "tailwind-merge": "^3.0.0",
      "class-variance-authority": "^0.7.1",
    },
    devDependencies: {
      vite: "^6.0.0",
      "@vitejs/plugin-react": "^4.3.0",
      "@tailwindcss/vite": "^4.0.0",
      tailwindcss: "^4.0.0",
      typescript: "^5.7.0",
      "@types/react": "^19.0.0",
      "@types/react-dom": "^19.0.0",
    },
  }
  fs.writeFileSync(path.join(targetDir, "package.json"), JSON.stringify(pkg, null, 2) + "\n", "utf-8")

  // 2. vite.config.ts
  const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
`
  fs.writeFileSync(path.join(targetDir, "vite.config.ts"), viteConfig, "utf-8")

  // 3. tsconfig.json
  const tsconfig = `{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
`
  fs.writeFileSync(path.join(targetDir, "tsconfig.json"), tsconfig, "utf-8")

  // 4. index.html
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${name}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
  fs.writeFileSync(path.join(targetDir, "index.html"), html, "utf-8")

  // 5. src files
  fs.mkdirSync(path.join(targetDir, "src"), { recursive: true })
  fs.writeFileSync(
    path.join(targetDir, "src", "main.tsx"),
    `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
`,
    "utf-8"
  )

  fs.writeFileSync(
    path.join(targetDir, "src", "index.css"),
    `@import "tailwindcss";\n`,
    "utf-8"
  )

  fs.writeFileSync(
    path.join(targetDir, "src", "App.tsx"),
    `import { Button } from '@/components/ui/button/button'
import { Card } from '@/components/ui/card/card'

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 flex flex-col items-center justify-center gap-6">
      <Card title="${name}" extra={<span className="text-xs text-muted-foreground">Source Delivered</span>}>
        <p className="text-sm text-muted-foreground mb-4">
          This project was scaffolded with Fex CLI. All components are delivered directly into your src/components directory.
        </p>
        <div className="flex gap-3">
          <Button color="primary">Get Started</Button>
          <Button variant="outlined">Documentation</Button>
        </div>
      </Card>
    </div>
  )
}
`,
    "utf-8"
  )

  // 6. Run Init
  await runInit({ cwd: targetDir, yes: true })

  // 7. Install Preset Components
  if (preset === "base") {
    await runAdd(["button", "card", "badge"], { cwd: targetDir, overwrite: true })
  } else if (preset === "full") {
    await runAdd(["button", "card", "badge", "alert", "separator", "popover", "tooltip"], {
      cwd: targetDir,
      overwrite: true,
    })
  }
}

async function scaffoldMonorepo(targetDir: string, name: string, framework: Framework, preset: string): Promise<void> {
  const wsYaml = `packages:
  - "packages/*"
  - "apps/*"
`
  fs.writeFileSync(path.join(targetDir, "pnpm-workspace.yaml"), wsYaml, "utf-8")

  const rootPkg = {
    name: `@${name}/root`,
    private: true,
    scripts: {
      dev: "pnpm --filter web dev",
      build: "pnpm -r build",
    },
  }
  fs.writeFileSync(path.join(targetDir, "package.json"), JSON.stringify(rootPkg, null, 2) + "\n", "utf-8")

  // Create package dirs
  fs.mkdirSync(path.join(targetDir, "packages", "ui", "src"), { recursive: true })
  fs.mkdirSync(path.join(targetDir, "packages", "hooks", "src"), { recursive: true })
  fs.mkdirSync(path.join(targetDir, "packages", "utils", "src"), { recursive: true })
  fs.mkdirSync(path.join(targetDir, "apps", "web", "src"), { recursive: true })

  // Subpackage manifests
  const utilsPkg = {
    name: `@${name}/utils`,
    version: "0.1.0",
    type: "module",
    main: "./src/index.ts",
    exports: { ".": "./src/index.ts", "./shared/*": "./src/shared/*" },
    dependencies: { clsx: "^2.1.1", "tailwind-merge": "^3.0.0", "@floating-ui/dom": "^1.6.13" },
  }
  fs.writeFileSync(path.join(targetDir, "packages", "utils", "package.json"), JSON.stringify(utilsPkg, null, 2) + "\n", "utf-8")

  const hooksPkg = {
    name: `@${name}/hooks`,
    version: "0.1.0",
    type: "module",
    dependencies: { [`@${name}/utils`]: "workspace:*", react: "^19.0.0" },
  }
  fs.writeFileSync(path.join(targetDir, "packages", "hooks", "package.json"), JSON.stringify(hooksPkg, null, 2) + "\n", "utf-8")

  const uiPkg = {
    name: `@${name}/ui`,
    version: "0.1.0",
    type: "module",
    dependencies: {
      [`@${name}/hooks`]: "workspace:*",
      [`@${name}/utils`]: "workspace:*",
      "class-variance-authority": "^0.7.1",
      react: "^19.0.0",
      "react-dom": "^19.0.0",
    },
  }
  fs.writeFileSync(path.join(targetDir, "packages", "ui", "package.json"), JSON.stringify(uiPkg, null, 2) + "\n", "utf-8")

  // components.json inside packages/ui
  const compConfig: ComponentsConfig = {
    $schema: resolveLocalSchemaPath(path.join(targetDir, "packages", "ui"), targetDir),
    framework,
    tailwind: { version: "v4", css: "src/index.css" },
    aliases: {
      components: `@${name}/ui/components`,
      ui: `@${name}/ui/components/ui`,
      primitive: `@${name}/ui/components/primitive`,
      pro: `@${name}/ui/components/pro`,
      hooks: `@${name}/hooks`,
      utils: `@${name}/utils`,
      icons: `@${name}/ui/components/icons`,
    },
  }
  saveComponentsConfig(path.join(targetDir, "packages", "ui"), compConfig)

  // Preinstall components into packages/ui
  const comps = preset === "full" ? ["button", "card", "badge", "popover", "tooltip"] : ["button", "card", "badge"]
  await runAdd(comps, {
    project: path.join(targetDir, "packages", "ui"),
    overwrite: true,
    cwd: targetDir,
  })
}

async function promptProjectName(): Promise<string> {
  if (!process.stdin.isTTY) return "my-fex-app"
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    rl.question("👉 Project name (default: my-fex-app): ", (answer) => {
      rl.close()
      resolve(answer.trim() || "my-fex-app")
    })
  })
}

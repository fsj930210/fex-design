import fs from "node:fs"
import path from "node:path"

export const BASE_CSS_THEME_V4 = `@layer base {
  :root {
    --background: #ffffff;
    --foreground: #09090b;
    --muted: #f4f4f5;
    --muted-foreground: #71717a;
    --popover: #ffffff;
    --popover-foreground: #09090b;
    --popover-background: #ffffff;
    --popover-border: #e4e4e7;
    --popover-radius: 0.5rem;
    --popover-padding: 0.75rem;
    --popover-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --popover-motion-duration: 140ms;
    --card: #ffffff;
    --card-foreground: #09090b;
    --border: #e4e4e7;
    --input: #e4e4e7;
    --primary: #18181b;
    --primary-foreground: #fafafa;
    --secondary: #f4f4f5;
    --secondary-foreground: #18181b;
    --accent: #f4f4f5;
    --accent-foreground: #18181b;
    --destructive: #ef4444;
    --destructive-foreground: #fafafa;
    --ring: #18181b;
    --radius: 0.5rem;
    --radius-sm: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --elevated-background: #ffffff;
    --elevated-foreground: #09090b;
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }

  .dark {
    --background: #09090b;
    --foreground: #fafafa;
    --muted: #27272a;
    --muted-foreground: #a1a1aa;
    --popover: #09090b;
    --popover-foreground: #fafafa;
    --popover-background: #18181b;
    --popover-border: #27272a;
    --card: #09090b;
    --card-foreground: #fafafa;
    --border: #27272a;
    --input: #27272a;
    --primary: #fafafa;
    --primary-foreground: #18181b;
    --secondary: #27272a;
    --secondary-foreground: #fafafa;
    --accent: #27272a;
    --accent-foreground: #fafafa;
    --destructive: #7f1d1d;
    --destructive-foreground: #fafafa;
    --ring: #d4d4d8;
    --elevated-background: #18181b;
    --elevated-foreground: #fafafa;
  }
}
`

export function injectThemeVariables(targetDir: string, cssRelativePath: string): boolean {
  const cssPath = path.join(targetDir, cssRelativePath)
  if (!fs.existsSync(cssPath)) {
    // If not found, try common CSS candidates
    const candidates = ["src/index.css", "src/globals.css", "src/App.css", "src/main.css"]
    let found = false
    for (const cand of candidates) {
      const p = path.join(targetDir, cand)
      if (fs.existsSync(p)) {
        return injectThemeVariables(targetDir, cand)
      }
    }
    // If none exist, create the file
    fs.mkdirSync(path.dirname(cssPath), { recursive: true })
    fs.writeFileSync(cssPath, BASE_CSS_THEME_V4, "utf-8")
    return true
  }

  const existingContent = fs.readFileSync(cssPath, "utf-8")
  if (existingContent.includes("--popover-background") || existingContent.includes("--elevated-background")) {
    return false // Already has tokens
  }

  const updated = existingContent.trimEnd() + "\n\n" + BASE_CSS_THEME_V4
  fs.writeFileSync(cssPath, updated, "utf-8")
  return true
}

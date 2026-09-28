#!/usr/bin/env node
import { spawn } from "node:child_process"
import { fileURLToPath } from "node:url"
import path from "node:path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const entryTs = path.resolve(__dirname, "../src/index.ts")

// Execute src/index.ts with --experimental-strip-types
const child = spawn(
  process.execPath,
  ["--experimental-strip-types", entryTs, ...process.argv.slice(2)],
  {
    stdio: "inherit",
    env: process.env,
  }
)

child.on("exit", (code) => {
  process.exit(code ?? 0)
})
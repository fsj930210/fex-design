import { runAdd } from "./commands/add.ts"
import { runCreate } from "./commands/create.ts"
import { runDiff } from "./commands/diff.ts"
import { runInit } from "./commands/init.ts"
import { runList } from "./commands/list.ts"
import { runView } from "./commands/view.ts"

function parseArgv(args: string[]) {
  const flags: Record<string, string | boolean> = {}
  const positionals: string[] = []

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]!
    if (arg.startsWith("--")) {
      const key = arg.slice(2)
      if (i + 1 < args.length && !args[i + 1]!.startsWith("-")) {
        flags[key] = args[i + 1]!
        i++
      } else {
        flags[key] = true
      }
    } else if (arg.startsWith("-")) {
      const key = arg.slice(1)
      if (i + 1 < args.length && !args[i + 1]!.startsWith("-")) {
        flags[key] = args[i + 1]!
        i++
      } else {
        flags[key] = true
      }
    } else {
      positionals.push(arg)
    }
  }

  return { flags, positionals }
}

export async function main() {
  const rawArgs = process.argv.slice(2)
  const { flags, positionals } = parseArgv(rawArgs)

  const command = positionals[0]

  const framework = (flags.framework || flags.f) as string | undefined
  const project = (flags.project || flags.p) as string | undefined
  const layer = (flags.layer || flags.l) as string | undefined
  const template = (flags.template || flags.t) as string | undefined
  const preset = flags.preset as string | undefined
  const overwrite = Boolean(flags.overwrite || flags.o)
  const dryRun = Boolean(flags["dry-run"] || flags.d)
  const all = Boolean(flags.all || flags.a)
  const yes = Boolean(flags.yes || flags.y)

  if (flags.help || flags.h || command === "help") {
    if (command === "create") {
      console.log(`
Usage: fex create <name> [options]

Scaffold a new project from scratch (SPA or Monorepo)

Options:
  -t, --template <name>    Template type: spa (default) or monorepo
  -f, --framework <name>   Target framework: react (default), vue, solid, svelte, angular
  --preset <preset>        Component preset: base (default: button, card, badge), full, none
  -y, --yes                Skip interactive confirmations

Examples:
  fex create my-app
  fex create my-app -t spa -f react --preset full
  fex create my-monorepo -t monorepo
`);
      return;
    }
  }

  switch (command) {
    case "create": {
      const name = positionals[1]
      await runCreate(name, { framework, template, preset, yes })
      break
    }
    case "init": {
      await runInit({ framework, project, yes })
      break
    }
    case "add": {
      const components = positionals.slice(1)
      await runAdd(components, { framework, project, layer, overwrite, dryRun, all, yes })
      break
    }
    case "diff": {
      const comp = positionals[1]
      await runDiff(comp, { framework, project, layer })
      break
    }
    case "list": {
      await runList({ framework, project })
      break
    }
    case "view": {
      const comp = positionals[1]
      if (!comp) {
        console.error("❌ Please specify component to view. Example: fex view button")
        process.exit(1)
      }
      await runView(comp, { framework, project, layer })
      break
    }
    default: {
      console.log(`
Fex CLI - Source Delivery Tool

Usage:
  fex <command> [options]

Commands:
  create <name>            Scaffold a new project from scratch (SPA or Monorepo)
  init                     Initialize components.json, CSS theme variables, and utils
  add [component...]       Add component(s) to project (cascading primitive, hooks, utils, icons)
  diff <component>         Compare local component files against official registry
  list                     List all available components across layers
  view <component>         Preview transformed source code in terminal

Options:
  -t, --template <name>    Template type for create: spa (default) or monorepo
  -f, --framework <name>   Target framework (react, vue, solid, svelte, angular)
  -p, --project <path>     Target project path (for monorepo subprojects)
  -l, --layer <layer>      Target layer: ui (default), primitive, or pro
  --preset <preset>        Component preset for create: base (default), full, none
  -a, --all                Add all available components for the target framework
  -o, --overwrite          Overwrite existing files
  -d, --dry-run            Dry run without writing to disk
  -y, --yes                Skip interactive confirmations

Examples:
  fex create my-app
  fex create my-monorepo -t monorepo
  fex init -p apps/demo-app
  fex add button card -p apps/demo-app
  fex add primitive/popover -p apps/demo-app
  fex add pro/dialog -p apps/demo-app
  fex add --all -p apps/demo-app
  fex diff popover -p apps/demo-app
  fex view popover -f react
`)
      break
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

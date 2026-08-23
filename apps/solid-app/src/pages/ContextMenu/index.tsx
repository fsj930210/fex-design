import { A } from '@solidjs/router'
import { Card } from '@fex-design/solid/ui/card'
import { BasicContextMenuDemo } from './basic-demo'
import { DataTableContextMenuDemo } from './data-table-demo'
import { TreeContextMenuDemo } from './tree-demo'

export function ContextMenuPage() {
  return (
    <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div class="mx-auto w-full max-w-5xl space-y-4">
        <header class="space-y-2">
          <A class="text-sm text-muted-foreground hover:text-foreground" href="/">Back home</A>
          <div>
            <h1 class="text-2xl font-semibold text-foreground">ContextMenu</h1>
            <p class="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Right-click primitive based on pointer virtual references. Trigger render props bind to existing
              elements, so tree rows, table headers and custom panels keep their DOM shape.
            </p>
          </div>
        </header>
        <div class="space-y-4">
          <Card title="Basic right click" description="Trigger render props bind directly to the caller element; no wrapper is inserted.">
            <BasicContextMenuDemo />
          </Card>
          <Card title="Tree node menu" description="Each tree row stays the actual trigger target, preserving indentation and row structure.">
            <TreeContextMenuDemo />
          </Card>
          <Card title="Data table header and row menus" description="The same ContextMenuRoot can serve header cells and body rows with different payloads.">
            <DataTableContextMenuDemo />
          </Card>
        </div>
      </div>
    </main>
  )
}

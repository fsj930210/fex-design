import { A } from '@solidjs/router'
import { BasicDemo } from './basic-demo'
import { OneWayDemo } from './one-way-demo'
import { CustomDemo } from './custom-demo'
import { TreeDemo } from './tree-demo'
import { TableDemo } from './table-demo'
import { ValidationDemo } from './validation-demo'
export function TransferPage() {
  return (
    <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div class="mx-auto w-full max-w-6xl space-y-4">
        <header class="space-y-2">
          <A class="text-sm text-muted-foreground hover:text-foreground" href="/">
            Back home
          </A>
          <div>
            <h1 class="text-2xl font-semibold text-foreground">Transfer</h1>
            <p class="max-w-3xl text-sm leading-6 text-muted-foreground">
              Move ordered data between two built-in panels while keeping headers, bodies, footers
              and actions independently composable.
            </p>
          </div>
        </header>
        <div class="space-y-4">
          <BasicDemo />
          <OneWayDemo />
          <CustomDemo />
          <TreeDemo />
          <TableDemo />
          <ValidationDemo />
        </div>
      </div>
    </main>
  )
}

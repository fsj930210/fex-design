import { A } from '@solidjs/router'
import { BasicDemo } from './basic-demo'
import { ControlledDemo } from './controlled-demo'
import { CustomDemo } from './custom-demo'
import { RemoteDemo } from './remote-demo'

export function AutoCompletePage() {
  return (
    <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div class="mx-auto w-full max-w-5xl space-y-4">
        <header class="space-y-2">
          <A class="text-sm text-muted-foreground hover:text-foreground" href="/">
            Back home
          </A>
          <h1 class="text-2xl font-semibold text-foreground">AutoComplete</h1>
          <p class="max-w-2xl text-sm text-muted-foreground">
            Free text input with optional local or remote suggestions. Selection metadata preserves
            complete backend records.
          </p>
        </header>
        <div class="grid gap-4">
          <BasicDemo />
          <ControlledDemo />
          <RemoteDemo />
          <CustomDemo />
        </div>
      </div>
    </main>
  )
}

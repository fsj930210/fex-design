import { A } from '@solidjs/router'
import { CustomIconDemo } from './custom-icon-demo'
import { FractionDemo } from './fraction-demo'
import { IntegerDemo } from './integer-demo'
export function RatePage() {
  return (
    <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div class="mx-auto w-full max-w-5xl space-y-4">
        <header class="space-y-4">
          <A class="text-sm text-muted-foreground hover:text-foreground" href="/">
            Back home
          </A>
          <div>
            <h1 class="text-2xl font-semibold text-foreground">Rate</h1>
            <p class="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              A rating primitive with configurable interaction precision and arbitrary fractional
              display.
            </p>
          </div>
        </header>
        <div class="space-y-4">
          <IntegerDemo />
          <FractionDemo />
          <CustomIconDemo />
        </div>
      </div>
    </main>
  )
}

import { A } from '@solidjs/router'
import { BasicDemo } from './basic-demo'
import { AutosizeDemo } from './autosize-demo'
import { ControlledDemo } from './controlled-demo'
import { CountDemo } from './count-demo'
import { FooterDemo } from './footer-demo'
import { ValidationDemo } from './validation-demo'

export function TextareaPage() {
  return (
    <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div class="mx-auto w-full max-w-5xl space-y-4">
        <header class="space-y-2">
          <A class="text-sm text-muted-foreground hover:text-foreground" href="/">
            Back home
          </A>
          <h1 class="text-2xl font-semibold text-foreground">Textarea primitives</h1>
          <p class="max-w-2xl text-sm leading-6 text-muted-foreground">
            TextareaRoot coordinates value, autosize, clear and footer composition while
            TextareaInput remains the native textarea node.
          </p>
        </header>
        <div class="space-y-4">
          <BasicDemo />
          <AutosizeDemo />
          <ControlledDemo />
          <CountDemo />
          <FooterDemo />
          <ValidationDemo />
        </div>
      </div>
    </main>
  )
}

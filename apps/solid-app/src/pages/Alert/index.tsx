import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@fex-design/solid/primitive/alert'
import { Badge } from '@fex-design/solid/primitive/badge'
import { InfoIcon } from '@fex-design/solid/icon/info'
import { Card } from '@fex-design/solid/ui/card'
import { A } from '@solidjs/router'
import { For } from 'solid-js'

const variants = ['default', 'success', 'warning', 'destructive'] as const

export function AlertPage() {
  return (
    <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div class="mx-auto w-full max-w-5xl space-y-4">
        <header class="space-y-2">
          <A class="text-sm text-muted-foreground hover:text-foreground" href="/">
            Back home
          </A>
          <h1 class="text-2xl font-semibold text-foreground">Alert</h1>
          <p class="max-w-2xl text-sm leading-6 text-muted-foreground">
            Show status messages with clear semantics.
          </p>
        </header>
        <Card title="Primitive" description="Structure with icon, title, description, and action.">
          <div class="grid gap-2">
            <For each={variants}>
              {(variant) => (
                <Alert variant={variant}>
                  <InfoIcon />
                  <AlertTitle>{variant}</AlertTitle>
                  <AlertDescription>
                    The current task is in {variant} state. Continue with the page action.
                  </AlertDescription>
                  <AlertAction>
                    <Badge variant="outline">New</Badge>
                  </AlertAction>
                </Alert>
              )}
            </For>
          </div>
        </Card>
      </div>
    </main>
  )
}

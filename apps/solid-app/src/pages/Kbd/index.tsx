import { Kbd, KbdGroup } from '@fex-design/solid/ui/kbd'
import { Card } from '@fex-design/solid/ui/card'
import { A } from '@solidjs/router'

export function KbdPage() {
  return (
    <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div class="mx-auto w-full max-w-5xl space-y-4">
        <header class="space-y-2">
          <A class="text-sm text-muted-foreground hover:text-foreground" href="/">
            Back home
          </A>
          <h1 class="text-2xl font-semibold text-foreground">Kbd</h1>
          <p class="max-w-2xl text-sm leading-6 text-muted-foreground">
            Display keyboard keys and shortcut combinations.
          </p>
        </header>
        <Card title="Shortcuts" description="Single keys and key combinations.">
          <div class="flex min-w-0 flex-wrap items-center gap-3">
            <Kbd>Esc</Kbd>
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
            <KbdGroup>
              <Kbd>Cmd</Kbd>
              <Kbd>Enter</Kbd>
            </KbdGroup>
          </div>
        </Card>
      </div>
    </main>
  )
}

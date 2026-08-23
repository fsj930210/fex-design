import { Kbd, KbdGroup } from '@fex-design/react/ui/kbd'
import { Card } from '@fex-design/react/ui/card'
import { Link } from 'react-router'

export function KbdPage() {
  return (
    <main className="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <header className="space-y-2">
          <Link className="text-sm text-muted-foreground hover:text-foreground" to="/">
            Back home
          </Link>
          <h1 className="text-2xl font-semibold text-foreground">Kbd</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Display keyboard keys and shortcut combinations.
          </p>
        </header>
        <Card title="Shortcuts" description="Single keys and key combinations.">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
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

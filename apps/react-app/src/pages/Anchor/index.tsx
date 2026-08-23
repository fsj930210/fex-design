import { Link } from 'react-router'
import { AnchorDemo } from './anchor-demo'
import { HorizontalDemo } from './horizontal-demo'

export function AnchorPage() {
  return (
    <main className="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <header className="space-y-2">
          <Link className="text-sm text-muted-foreground hover:text-foreground" to="/">
            Back home
          </Link>
          <h1 className="text-2xl font-semibold">Anchor</h1>
          <p className="text-sm text-muted-foreground">
            Navigate and track sections in a scroll container.
          </p>
        </header>
        <div className="grid gap-4">
          <AnchorDemo />
          <HorizontalDemo />
        </div>
      </div>
    </main>
  )
}

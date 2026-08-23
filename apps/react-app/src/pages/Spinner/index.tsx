import { Spinner } from '@fex-design/react/ui/spinner'
import { Card } from '@fex-design/react/ui/card'
import { Link } from 'react-router'

export function SpinnerPage() {
  return (
    <main className="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <header className="space-y-2">
          <Link className="text-sm text-muted-foreground hover:text-foreground" to="/">
            Back home
          </Link>
          <h1 className="text-2xl font-semibold text-foreground">Spinner</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Use spinners for local loading feedback.
          </p>
        </header>
        <Card title="Sizes" description="Available spinner sizes.">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <Spinner size="sm" aria-label="Loading" />
            <Spinner size="md" aria-label="Loading" />
            <Spinner size="lg" aria-label="Loading" />
          </div>
        </Card>
      </div>
    </main>
  )
}

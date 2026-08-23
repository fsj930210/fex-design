import { Link } from 'react-router'
import { BasicDemo } from './basic-demo'
import { ControlledDemo } from './controlled-demo'
import { CustomDemo } from './custom-demo'
import { RemoteDemo } from './remote-demo'

export function AutoCompletePage() {
  return (
    <main className="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <header className="space-y-2">
          <Link className="text-sm text-muted-foreground hover:text-foreground" to="/">
            Back home
          </Link>
          <h1 className="text-2xl font-semibold text-foreground">AutoComplete</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Free text input with optional local or remote suggestions. Selection metadata preserves
            complete backend records.
          </p>
        </header>
        <div className="grid gap-4">
          <BasicDemo />
          <ControlledDemo />
          <RemoteDemo />
          <CustomDemo />
        </div>
      </div>
    </main>
  )
}

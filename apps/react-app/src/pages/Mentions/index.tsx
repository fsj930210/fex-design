import { Link } from 'react-router'
import { BasicDemo } from './basic-demo'
import { CustomTriggerDemo } from './custom-trigger-demo'
import { ParamsDemo } from './params-demo'
import { PrefixDemo } from './prefix-demo'
import { ValidationDemo } from './validation-demo'

export function MentionsPage() {
  return (
    <main className="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <header className="space-y-2">
          <Link className="text-sm text-muted-foreground hover:text-foreground" to="/">
            Back home
          </Link>
          <h1 className="text-2xl font-semibold text-foreground">Mentions primitive</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Mention primitives identify prefix queries, render caller-owned items, and notify
            selection without forcing text replacement.
          </p>
        </header>
        <div className="grid gap-4">
          <BasicDemo />
          <PrefixDemo />
          <ParamsDemo />
          <CustomTriggerDemo />
          <ValidationDemo />
        </div>
      </div>
    </main>
  )
}

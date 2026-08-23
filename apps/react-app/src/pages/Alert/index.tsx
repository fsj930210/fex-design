import { Alert, AlertAction, AlertDescription, AlertTitle } from '@fex-design/react/primitive/alert'
import { Badge } from '@fex-design/react/primitive/badge'
import { InfoIcon } from '@fex-design/react/icon/info'
import { Card } from '@fex-design/react/ui/card'
import { Link } from 'react-router'

const variants = ['default', 'success', 'warning', 'destructive'] as const

export function AlertPage() {
  return (
    <main className="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <header className="space-y-2">
          <Link className="text-sm text-muted-foreground hover:text-foreground" to="/">
            Back home
          </Link>
          <h1 className="text-2xl font-semibold text-foreground">Alert</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Show status messages with clear semantics.
          </p>
        </header>
        <Card title="Primitive" description="Structure with icon, title, description, and action.">
          <div className="grid gap-2">
            {variants.map((variant) => (
              <Alert key={variant} variant={variant}>
                <InfoIcon />
                <AlertTitle>{variant}</AlertTitle>
                <AlertDescription>
                  The current task is in {variant} state. Continue with the page action.
                </AlertDescription>
                <AlertAction>
                  <Badge variant="outline">New</Badge>
                </AlertAction>
              </Alert>
            ))}
          </div>
        </Card>
      </div>
    </main>
  )
}

import { Badge } from '@fex-design/react/primitive/badge'
import { Card } from '@fex-design/react/ui/card'
import { BadgeOverflow } from '@fex-design/react/primitive/badge'
import { Link } from 'react-router'

const variants = ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const

export function BadgePage() {
  return (
    <main className="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <header className="space-y-2">
          <Link className="text-sm text-muted-foreground hover:text-foreground" to="/">
            Back home
          </Link>
          <h1 className="text-2xl font-semibold text-foreground">Badge</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Use badges for compact status, category, and count labels.
          </p>
        </header>
        <div className="grid gap-4">
          <Card title="Variants" description="Badge visual styles.">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              {variants.map((variant) => <Badge key={variant} variant={variant}>{variant}</Badge>)}
            </div>
          </Card>
          <Card title="Overflow" description="Keeps the collection compact without changing its values.">
            <BadgeOverflow maxCount={3}>
              {['Design', 'Frontend', 'Backend', 'QA', 'Operations'].map((item) => <Badge key={item} variant="secondary">{item}</Badge>)}
            </BadgeOverflow>
          </Card>
        </div>
      </div>
    </main>
  )
}

import { Badge } from '@fex-design/react/primitive/badge'
import { Card } from '@fex-design/react/ui/card'
import { InfoIcon } from '@fex-design/react/icon/info'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@fex-design/react/primitive/empty'
import { Link } from 'react-router'

export function EmptyPage() {
  return (
    <main className="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <header className="space-y-2">
          <Link className="text-sm text-muted-foreground hover:text-foreground" to="/">
            Back home
          </Link>
          <h1 className="text-2xl font-semibold text-foreground">Empty</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Use empty states when lists, search results, or filters return no data.
          </p>
        </header>
        <Card title="Primitive" description="Media, title, description, and content slots.">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <InfoIcon />
              </EmptyMedia>
              <EmptyTitle>No approval tasks</EmptyTitle>
              <EmptyDescription>
                Adjust filters and try again, or create a new workflow record.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Badge variant="outline">0 items</Badge>
            </EmptyContent>
          </Empty>
        </Card>
      </div>
    </main>
  )
}

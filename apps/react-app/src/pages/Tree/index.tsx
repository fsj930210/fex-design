import { Link } from 'react-router'
import { AsyncTreeDemo } from './async-demo'
import { AsyncSearchTreeDemo } from './async-search-demo'
import { BasicTreeDemo } from './basic-demo'
import { TreeBatchActionsDemo } from './batch-actions-demo'
import { CheckTreeDemo } from './check-demo'
import { ControlledTreeDemo } from './controlled-demo'
import { TreeDndDemo } from './dnd-demo'
import { TreeMutationDemo } from './mutation-demo'
import { SearchTreeDemo } from './search-demo'
import { VirtualTreeDemo } from './virtual-demo'

export function TreePage() {
  return (
    <main className="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <header className="space-y-1.5">
          <Link className="text-sm text-muted-foreground hover:text-foreground" to="/">
            Back home
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Tree</h1>
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
              Headless tree state, field mapping, async children, search data, keyboard navigation
              and virtual rendering.
            </p>
          </div>
        </header>
        <div className="space-y-4">
          <BasicTreeDemo />
          <ControlledTreeDemo />
          <TreeBatchActionsDemo />
          <TreeMutationDemo />
          <TreeDndDemo />
          <CheckTreeDemo />
          <AsyncTreeDemo />
          <AsyncSearchTreeDemo />
          <SearchTreeDemo />
          <VirtualTreeDemo />
        </div>
      </div>
    </main>
  )
}

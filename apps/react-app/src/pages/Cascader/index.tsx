import { Link } from 'react-router'
import { AsyncValueDemo } from './async-value-demo'
import { BasicDemo } from './basic-demo'
import { ChangeOnSelectDemo } from './change-on-select-demo'
import { CheckStrictlyDemo } from './check-strictly-demo'
import { ControlledDemo } from './controlled-demo'
import { CustomDemo } from './custom-demo'
import { FieldNamesDemo } from './field-names-demo'
import { FormDemo } from './form-demo'
import { HoverDemo } from './hover-demo'
import { LazyLoadDemo } from './lazy-load-demo'
import { MultipleDemo } from './multiple-demo'
import { RemoteSearchDemo } from './remote-search-demo'
import { SearchDemo } from './search-demo'
import { SyncValueDemo } from './sync-value-demo'
export function CascaderPage() {
  return (
    <main className="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <header className="space-y-2">
          <Link className="text-sm text-muted-foreground hover:text-foreground" to="/">
            Back home
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Cascader</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Select hierarchical paths with full-depth search, lazy loading, multiple conduction
              and form integration.
            </p>
          </div>
        </header>
        <div className="grid gap-4">
          <BasicDemo />
          <ControlledDemo />
          <FieldNamesDemo />
          <MultipleDemo />
          <CheckStrictlyDemo />
          <ChangeOnSelectDemo />
          <SearchDemo />
          <RemoteSearchDemo />
          <LazyLoadDemo />
          <HoverDemo />
          <SyncValueDemo />
          <AsyncValueDemo />
          <FormDemo />
          <CustomDemo />
        </div>
      </div>
    </main>
  )
}

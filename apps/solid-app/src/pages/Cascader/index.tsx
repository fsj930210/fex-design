import { A } from '@solidjs/router'
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
    <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div class="mx-auto w-full max-w-5xl space-y-4">
        <header class="space-y-2">
          <A class="text-sm text-muted-foreground hover:text-foreground" href="/">
            Back home
          </A>
          <div>
            <h1 class="text-2xl font-semibold text-foreground">Cascader</h1>
            <p class="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Hierarchical paths with full-depth search, lazy loading, multiple conduction and form
              integration.
            </p>
          </div>
        </header>
        <div class="grid gap-4">
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

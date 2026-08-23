import { A } from '@solidjs/router'
import { BasicTabsDemo } from './basic-demo'
import { CustomTabsDemo } from './custom-demo'
import { DynamicTabsDemo } from './dynamic-demo'
import { SortableTabsDemo } from './sortable-demo'
import { VariantTabsDemo } from './variant-demo'
export function TabsPage() {
  return (
    <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div class="mx-auto w-full max-w-5xl space-y-4">
        <header class="space-y-1.5">
          <A class="text-sm text-muted-foreground hover:text-foreground" href="/">
            Back home
          </A>
          <div>
            <h1 class="text-2xl font-semibold text-foreground">Tabs</h1>
            <p class="max-w-3xl text-sm leading-6 text-muted-foreground">
              Composable tab navigation with lazy retained content and custom rendering.
            </p>
          </div>
        </header>
        <div class="space-y-4">
          <BasicTabsDemo />
          <VariantTabsDemo />
          <DynamicTabsDemo />
          <SortableTabsDemo />
          <CustomTabsDemo />
        </div>
      </div>
    </main>
  )
}

import { ThemeProvider } from '@fex-design/solid/primitive/theme-provider'
import { Card } from '@fex-design/solid/ui/card'
import { A } from '@solidjs/router'
import { createSignal } from 'solid-js'
import { ThemeStatusCard } from './theme-status-card'

export function ThemeProviderPage() {
  const [inheritedTheme, setInheritedTheme] = createSignal<'light' | 'dark'>('dark')
  const [innerTheme, setInnerTheme] = createSignal<'light' | 'dark'>('light')
  const [customTheme, setCustomTheme] = createSignal<'light' | 'dark' | 'admin-blue'>('admin-blue')

  return (
    <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div class="mx-auto w-full max-w-5xl space-y-4">
        <header class="space-y-4">
          <A class="text-sm text-muted-foreground hover:text-foreground" href="/">
            Back home
          </A>
          <div>
            <h1 class="text-2xl font-semibold text-foreground">ThemeProvider</h1>
            <p class="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              ThemeProvider supports local scopes, inherited scopes, custom local themes, multiple
              themes on the same page, and a forcedTheme override with the highest priority.
            </p>
          </div>
        </header>

        <Card
          title="Local Scope"
          description="A local provider applies theme variables to its own wrapper."
        >
          <ThemeProvider
            scope="local"
            storageKey="fex-theme-provider-local-demo"
            class="rounded-md bg-background p-3 text-foreground"
          >
            <ThemeStatusCard title="Interactive local theme" />
          </ThemeProvider>
        </Card>

        <Card
          title="Multiple Themes"
          description="Independent local scopes can render light and dark together."
        >
          <div class="grid gap-3 md:grid-cols-2">
            <ThemeProvider
              scope="local"
              forcedTheme="light"
              class="rounded-md bg-background p-3 text-foreground"
            >
              <ThemeStatusCard title="Forced light scope" />
            </ThemeProvider>
            <ThemeProvider
              scope="local"
              forcedTheme="dark"
              class="rounded-md bg-background p-3 text-foreground"
            >
              <ThemeStatusCard title="Forced dark scope" />
            </ThemeProvider>
          </div>
        </Card>

        <Card
          title="Inherited Scope"
          description="Three nested providers: parent can switch, inherited child follows it, inner local scope stays independent."
        >
          <ThemeProvider
            scope="local"
            forcedTheme={inheritedTheme()}
            class="rounded-md bg-background p-3 text-foreground"
          >
            <button
              class="mb-3 rounded-md border border-border bg-elevated-background px-3 py-1.5 text-sm text-elevated-foreground transition-colors hover:bg-hover-background"
              type="button"
              onClick={() => setInheritedTheme((theme) => (theme === 'dark' ? 'light' : 'dark'))}
            >
              Switch parent to {inheritedTheme() === 'dark' ? 'light' : 'dark'}
            </button>
            <div class="grid gap-3 lg:grid-cols-3">
              <ThemeStatusCard title={`Parent local ${inheritedTheme()} scope`} />
              <ThemeProvider scope="inherit">
                <div class="space-y-3 rounded-md border border-border bg-background p-3">
                  <ThemeStatusCard title="Inherited middle scope" />
                  <ThemeProvider
                    scope="local"
                    forcedTheme={innerTheme()}
                    class="rounded-md bg-background p-3 text-foreground"
                  >
                    <button
                      class="mb-3 rounded-md border border-border bg-elevated-background px-3 py-1.5 text-sm text-elevated-foreground transition-colors hover:bg-hover-background"
                      type="button"
                      onClick={() =>
                        setInnerTheme((theme) => (theme === 'dark' ? 'light' : 'dark'))
                      }
                    >
                      Switch inner to {innerTheme() === 'dark' ? 'light' : 'dark'}
                    </button>
                    <ThemeStatusCard title={`Inner independent ${innerTheme()} scope`} />
                  </ThemeProvider>
                </div>
              </ThemeProvider>
            </div>
          </ThemeProvider>
        </Card>

        <Card
          title="Custom Local Theme"
          description="A local provider can resolve a non-global theme name and expose it through data-theme."
        >
          <ThemeProvider
            scope="local"
            attribute="data-theme"
            themes={['light', 'dark', 'admin-blue']}
            defaultTheme="admin-blue"
            forcedTheme={customTheme()}
            colorSchemeMap={{ 'admin-blue': 'light' }}
            class="rounded-md border border-border bg-background p-3 text-foreground data-[theme=admin-blue]:[--background:oklch(0.97_0.04_245)] data-[theme=admin-blue]:[--card-background:oklch(0.99_0.025_245)] data-[theme=admin-blue]:[--card-foreground:oklch(0.25_0.08_250)] data-[theme=admin-blue]:[--foreground:oklch(0.22_0.08_250)] data-[theme=admin-blue]:[--muted-foreground:oklch(0.45_0.06_250)] data-[theme=admin-blue]:[--border:oklch(0.82_0.07_245)]"
          >
            <div class="mb-3 flex flex-wrap gap-1.5">
              {(['admin-blue', 'light', 'dark'] as const).map((theme) => (
                <button
                  class="rounded-md border border-border bg-elevated-background px-2 py-1.5 text-sm text-elevated-foreground transition-colors hover:bg-hover-background disabled:cursor-default disabled:bg-selected-background"
                  disabled={customTheme() === theme}
                  type="button"
                  onClick={() => setCustomTheme(theme)}
                >
                  {theme}
                </button>
              ))}
            </div>
            <ThemeStatusCard title={`Local ${customTheme()} theme`} />
          </ThemeProvider>
        </Card>

        <Card
          title="Forced Theme Priority"
          description="When forcedTheme is set, setTheme is ignored and the resolved theme remains locked."
        >
          <ThemeProvider
            scope="local"
            defaultTheme="light"
            forcedTheme="dark"
            class="rounded-md bg-background p-3 text-foreground"
          >
            <ThemeStatusCard title="Locked dark theme" />
          </ThemeProvider>
        </Card>
      </div>
    </main>
  )
}

import { Badge } from '@fex-design/solid/primitive/badge'
import { Card } from '@fex-design/solid/ui/card'
import { BadgeGroup } from '@fex-design/solid/primitive/badge'
import { A } from '@solidjs/router'
import { For } from 'solid-js'

const colors = ['primary', 'info', 'success', 'warning', 'danger'] as const

export function BadgePage() {
  return (
    <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div class="mx-auto w-full max-w-5xl space-y-4">
        <header class="space-y-2">
          <A class="text-sm text-muted-foreground hover:text-foreground" href="/">
            Back home
          </A>
          <h1 class="text-2xl font-semibold text-foreground">Badge</h1>
          <p class="max-w-2xl text-sm leading-6 text-muted-foreground">
            Use badges for compact status, category, and count labels.
          </p>
        </header>
        <div class="grid gap-4">
          <Card title="Colors" description="用颜色表达徽标的语义状态。">
            <div class="flex min-w-0 flex-wrap items-center gap-2">
              <For each={colors}>{(color) => <Badge color={color}>{color}</Badge>}</For>
            </div>
          </Card>
          <Card title="Group" description="使用 maxCount 收起过多的标签。">
            <BadgeGroup maxCount={3}>
              <For each={['Design', 'Frontend', 'Backend', 'QA', 'Operations']}>
                {(item) => <Badge color="info">{item}</Badge>}
              </For>
            </BadgeGroup>
          </Card>
        </div>
      </div>
    </main>
  )
}

<script lang="ts">
  import Badge from '@fex-design/svelte/primitive/badge'
  import Card from '@fex-design/svelte/ui/card'
  import { BadgeGroup } from '@fex-design/svelte/primitive/badge'

  const colors = ['primary', 'info', 'success', 'warning', 'danger'] as const
  const overflowItems = ['Design', 'Frontend', 'Backend', 'QA', 'Operations']
</script>

{#snippet overflowBadge(item: string)}<Badge color="info">{item}</Badge>{/snippet}

<main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4"><div class="mx-auto w-full max-w-5xl space-y-4"><header class="space-y-2"><a class="text-sm text-muted-foreground hover:text-foreground" href="/">Back home</a><h1 class="text-2xl font-semibold text-foreground">Badge</h1><p class="max-w-2xl text-sm leading-6 text-muted-foreground">用颜色表达状态，并用 maxCount 收起过多的标签。</p></header><div class="grid gap-4"><Card title="Colors" description="Badge 的内置语义颜色。"><div class="flex min-w-0 flex-wrap items-center gap-2">{#each colors as color}<Badge {color}>{color}</Badge>{/each}</div></Card><Card title="Group" description="使用 maxCount 收起过多的标签。"><BadgeGroup items={overflowItems} maxCount={3} item={overflowBadge} /></Card></div></div></main>

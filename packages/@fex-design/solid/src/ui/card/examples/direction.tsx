import { For } from 'solid-js'
import { Card } from '../card'

export function DirectionExample() {
  return (
    <div class="grid w-full gap-6 sm:grid-cols-2">
      <For each={['ltr', 'rtl'] as const}>
        {(dir) => (
        <Card
          dir={dir}
          title={dir.toUpperCase()}
          description="Header 与 Footer 按逻辑方向排列。"
          extra={<button class="rounded-md border px-3 py-1.5 text-sm">操作</button>}
          footer={<button class="rounded-md bg-primary px-3 py-1.5 text-primary-foreground">保存</button>}
        >
          内容区域保持可读顺序。
        </Card>
        )}
      </For>
    </div>
  )
}

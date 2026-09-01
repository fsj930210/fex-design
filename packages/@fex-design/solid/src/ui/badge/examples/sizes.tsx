import { Badge } from '@fex-design/solid/ui/badge'
import type { BadgeSize } from '@fex-design/core'
import { For } from 'solid-js'

const sizes: readonly BadgeSize[] = ['sm', 'md', 'lg']

export function Sizes() {
  return (
    <div class="grid gap-3">
      <For each={sizes}>
        {(size) => (
          <div class="flex items-center gap-4">
            <span class="w-6 text-sm text-muted-foreground">{size}</span>
            <Badge count={8} size={size} />
            <Badge dot color="success" size={size} />
          </div>
        )}
      </For>
    </div>
  )
}

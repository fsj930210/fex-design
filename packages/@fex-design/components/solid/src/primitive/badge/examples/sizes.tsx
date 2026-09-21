import type { BadgeSize } from '@fex-design/core'
import { Badge, BadgeDot } from '@fex-design/solid/primitive/badge'
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
            <BadgeDot color="success" size={size} />
          </div>
        )}
      </For>
    </div>
  )
}

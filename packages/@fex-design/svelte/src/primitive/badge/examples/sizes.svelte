<script lang="ts">
  import { Badge, BadgeDot } from '@fex-design/svelte/primitive/badge'
  import type { BadgeSize } from '@fex-design/core'

  const sizes: readonly BadgeSize[] = ['sm', 'md', 'lg']
</script>

<div class="grid gap-3">
  {#each sizes as size}
    <div class="flex items-center gap-4">
      <span class="w-6 text-sm text-muted-foreground">{size}</span>
      <Badge count={8} {size} />
      <BadgeDot color="success" {size} />
    </div>
  {/each}
</div>

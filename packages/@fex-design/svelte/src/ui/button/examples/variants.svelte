<script lang="ts">
  import { Button } from '@fex-design/svelte/ui/button'
  const variants = ["default","outline","secondary","ghost","destructive","link","dashed"] as const
</script>

<div class="flex flex-wrap items-center gap-3">{#each variants as item (item)}<Button variant={item}>{item}</Button>{/each}</div>

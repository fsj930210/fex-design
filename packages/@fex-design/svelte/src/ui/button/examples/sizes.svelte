<script lang="ts">
  import { Button } from '@fex-design/svelte/ui/button'
  const sizes = ["xs","sm","default","lg","xl","icon-xs","icon-sm","icon","icon-lg","icon-xl"] as const
</script>

<div class="flex flex-wrap items-center gap-3">{#each sizes as item (item)}<Button size={item} aria-label={item}>{item}</Button>{/each}</div>

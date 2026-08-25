<script lang="ts">
  import { Button } from '@fex-design/svelte/ui/button'
  import PlusIcon from '@fex-design/svelte/icon/plus'
  const sizes = ["xs","sm","default","lg","xl","icon-xs","icon-sm","icon","icon-lg","icon-xl"] as const
</script>

<div class="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-4">
  {#each sizes as item (item)}{#if item.startsWith('icon')}<Button size={item} aria-label={item}><PlusIcon /></Button>{:else}<Button size={item}>{item}</Button>{/if}{/each}
  <Button class="h-12 px-6 text-base">custom</Button>
  <Button class="size-12 px-0" aria-label="custom icon size"><PlusIcon /></Button>
</div>

<script lang="ts">
  import { Button, ButtonIcon } from '@fex-design/svelte/primitive/button'
  import PlusIcon from '@fex-design/svelte/icon/plus'
  import { buttonClassName } from '@fex-design/styles/button'

  const sizes = [
    'xs', 'sm', 'default', 'lg', 'xl',
    'icon-xs', 'icon-sm', 'icon', 'icon-lg', 'icon-xl',
  ] as const
</script>

<div class="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-4">
  {#each sizes as size (size)}
    <Button class={buttonClassName({ size })} aria-label={size}>
      {#if size.startsWith('icon')}
        <ButtonIcon><PlusIcon /></ButtonIcon>
      {:else}
        {size}
      {/if}
    </Button>
  {/each}
  <Button class="h-12 px-6 text-base">custom</Button>
  <Button class="size-12 px-0" aria-label="custom icon size"><ButtonIcon><PlusIcon /></ButtonIcon></Button>
</div>

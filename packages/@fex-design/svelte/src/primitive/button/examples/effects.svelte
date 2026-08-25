<script lang="ts">
  import PlusIcon from '@fex-design/svelte/icon/plus'
  import { Button, ButtonIcon } from '@fex-design/svelte/primitive/button'
  import { buttonClassName } from '@fex-design/styles/button'

  const effects = [
    'expand-icon', 'ring-hover', 'shine-hover', 'gooey-start',
    'gooey-end', 'underline', 'hover-underline', 'press',
  ] as const
</script>

<div class="flex flex-wrap items-center gap-3">
  {#each effects as effect (effect)}
    <Button class={buttonClassName({ effect })} data-effect={effect}>
      <ButtonIcon><PlusIcon /></ButtonIcon>{effect}
    </Button>
  {/each}
</div>

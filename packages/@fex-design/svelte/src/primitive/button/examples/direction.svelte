<script lang="ts">
  import PlusIcon from '@fex-design/svelte/icon/plus'
  import { Button, ButtonGroup, ButtonIcon } from '@fex-design/svelte/primitive/button'
  const directions = ['ltr', 'rtl'] as const
</script>

<div class="grid w-full gap-6 sm:grid-cols-2">
  {#each directions as direction (direction)}
    <section class="grid gap-3 rounded-lg border p-4">
      <strong>{direction.toUpperCase()}</strong>
      <div class="flex flex-wrap gap-3"><Button dir={direction}><ButtonIcon><PlusIcon /></ButtonIcon>Start icon</Button><Button dir={direction}>End icon<ButtonIcon placement="end"><PlusIcon /></ButtonIcon></Button></div>
      <ButtonGroup dir={direction}><Button>First</Button><Button>Middle</Button><Button>Last</Button></ButtonGroup>
    </section>
  {/each}
</div>

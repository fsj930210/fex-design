<script lang="ts">
  import PlusIcon from '@fex-design/svelte/icon/plus'
  import { Button, ButtonGroup } from '@fex-design/svelte/ui/button'
  const directions = ['ltr', 'rtl'] as const
</script>

{#snippet icon()}<PlusIcon />{/snippet}
<div class="grid w-full gap-6 sm:grid-cols-2">
  {#each directions as direction (direction)}
    <section class="grid gap-3 rounded-lg border p-4">
      <strong>{direction.toUpperCase()}</strong>
      <div class="flex flex-wrap gap-3"><Button dir={direction} {icon}>Start icon</Button><Button dir={direction} {icon} iconPlacement="end">End icon</Button></div>
      <ButtonGroup dir={direction}><Button>First</Button><Button>Middle</Button><Button>Last</Button></ButtonGroup>
    </section>
  {/each}
</div>

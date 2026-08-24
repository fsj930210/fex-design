<script lang="ts">
  import { Button } from '@fex-design/svelte/ui/button'
  let buttonElement: HTMLButtonElement | null = null
</script>

<div class="flex flex-wrap items-center gap-3">
<form onsubmit={(event) => event.preventDefault()}>
<Button bind:ref={buttonElement}>Focusable</Button>
<Button type="button" variant="ghost" onclick={() => buttonElement?.focus()}>Focus button</Button>
<Button type="submit">Submit</Button>
<Button type="reset" variant="outline">Reset</Button>
<Button disabled>Disabled</Button>
<Button aria-pressed="true" data-testid="toggle">Pressed</Button>
</form>
</div>

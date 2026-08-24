<script lang="ts">
  import { Button } from '@fex-design/svelte/primitive/button'
  let buttonElement: HTMLButtonElement | null = null
</script>

<div class="flex flex-wrap items-center gap-3">
<form onsubmit={(event) => event.preventDefault()}>
<Button bind:ref={buttonElement}>Focusable</Button>
<Button type="button" onclick={() => buttonElement?.focus()}>Focus button</Button>
<Button type="submit" name="action" value="save">Save</Button>
<Button type="reset">Reset</Button>
<Button disabled aria-label="Unavailable">Disabled</Button>
</form>
</div>

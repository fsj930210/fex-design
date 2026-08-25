<script lang="ts">
  import { Button } from '@fex-design/svelte/ui/button'
</script>

<div class="flex flex-wrap items-center gap-6">
  <Button>Default</Button>
  <Button>Hover / Focus</Button>
  <Button disabled>Disabled</Button>
  <Button aria-pressed="true">Pressed</Button>
</div>

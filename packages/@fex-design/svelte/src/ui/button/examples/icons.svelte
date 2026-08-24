<script lang="ts">
  import PlusIcon from '@fex-design/svelte/icon/plus'
  import { Button } from '@fex-design/svelte/ui/button'
</script>

<div class="flex flex-wrap items-center gap-3">{#snippet icon()}<PlusIcon />{/snippet}<Button {icon}>Create</Button>
<Button {icon} iconPlacement="end">Continue</Button>
<Button {icon} size="icon" aria-label="Create" />
</div>

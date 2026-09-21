<script lang="ts">
  import PlusIcon from "@fex-design/svelte/icons/plus";
  import { Button } from "@fex-design/svelte/ui/button";
</script>

{#snippet icon()}<PlusIcon />{/snippet}
<div class="flex flex-wrap items-center gap-3">
  <Button {icon}>Create</Button>
  <Button {icon} iconPlacement="end">Continue</Button>
  <Button {icon} size="icon-md" aria-label="Create" />
</div>

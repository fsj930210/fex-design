<script lang="ts">
  import PlusIcon from '@fex-design/svelte/icon/plus'
  import { Button } from '@fex-design/svelte/ui/button'
</script>

{#snippet icon()}<PlusIcon />{/snippet}
<div class="flex flex-wrap items-center gap-3">
  <div dir="ltr">
    <Button variant="solid" color="danger" size="lg" effect="press" {icon}>Delete</Button>
  </div>
  <div dir="rtl">
    <Button variant="outlined" effect="expand-icon" {icon} iconPlacement="end">متابعة</Button>
  </div>
</div>


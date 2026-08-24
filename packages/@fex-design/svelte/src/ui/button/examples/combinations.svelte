<script lang="ts">
  import PlusIcon from '@fex-design/svelte/icon/plus'
  import { Button } from '@fex-design/svelte/ui/button'
</script>

<div class="flex flex-wrap items-center gap-3">{#snippet icon()}<PlusIcon />{/snippet}<div dir="ltr">
<Button variant="destructive" size="lg" effect="press" {icon}>Delete</Button>
</div>
<div dir="rtl">
<Button variant="outline" effect="expand-icon" {icon} iconPlacement="end">متابعة</Button>
</div>
</div>

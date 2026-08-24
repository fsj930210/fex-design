<script lang="ts">
  import PlusIcon from '@fex-design/svelte/icon/plus'
  import { Button, ButtonIcon } from '@fex-design/svelte/primitive/button'
</script>

<div class="flex flex-wrap items-center gap-3">
<Button>
<ButtonIcon placement="start">
<PlusIcon />
</ButtonIcon>New item</Button>
<Button>Next<ButtonIcon placement="end">
<PlusIcon />
</ButtonIcon>
</Button>
</div>

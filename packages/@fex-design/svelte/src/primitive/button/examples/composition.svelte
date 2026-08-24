<script lang="ts">
  import PlusIcon from '@fex-design/svelte/icon/plus'
  import { Button, ButtonGroup, ButtonIcon } from '@fex-design/svelte/primitive/button'
</script>

<div class="flex flex-wrap items-center gap-3">
<ButtonGroup spacing={8}>
<Button>
<ButtonIcon placement="start">
<PlusIcon />
</ButtonIcon>Add</Button>
<Button aria-pressed="true">Selected</Button>
<Button disabled>Disabled</Button>
</ButtonGroup>
</div>

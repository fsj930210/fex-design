<script lang="ts">
  import PlusIcon from '@fex-design/svelte/icon/plus'
  import { Button, ButtonIcon } from '@fex-design/svelte/primitive/button'
  import { buttonClassName } from '@fex-design/styles/button'
</script>

<div class="flex flex-wrap items-center gap-3">
<Button class={buttonClassName()}>
<ButtonIcon>
<PlusIcon />
</ButtonIcon>Create</Button>
<Button class={buttonClassName()}>Continue<ButtonIcon placement="end">
<PlusIcon />
</ButtonIcon>
</Button>
<Button class={buttonClassName({ size: 'icon' })} aria-label="Create"><ButtonIcon><PlusIcon /></ButtonIcon></Button>
</div>




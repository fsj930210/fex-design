<script lang="ts">
  import { Dialog } from '@fex-design/svelte/ui/dialog'
  import { Button } from '@fex-design/svelte/ui/button'
  let open = $state(false)
</script>
<Button onclick={() => open = true}>打开 Dialog</Button>
<Dialog bind:open title="CSS Variables"><p>Dialog css-variables 场景。</p></Dialog>

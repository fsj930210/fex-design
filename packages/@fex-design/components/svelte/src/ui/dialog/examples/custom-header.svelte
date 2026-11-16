<script lang="ts">
  import { Dialog } from '@fex-design/svelte/ui/dialog'
  import { Button } from '@fex-design/svelte/ui/button'
  let open = $state(false)
</script>
<Button onclick={() => open = true}>打开 Dialog</Button>
{#snippet headerContent()}<span class="text-sm font-normal text-muted-foreground">这是自定义 Header 内容</span>{/snippet}
<Dialog bind:open title="自定义标题" header={headerContent}><p>Dialog custom-header 场景。</p></Dialog>

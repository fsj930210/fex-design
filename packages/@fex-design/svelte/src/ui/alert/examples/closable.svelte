<script lang="ts">
  import { Alert } from '@fex-design/svelte/ui/alert'
  const keepOpen = (event: MouseEvent) => event.preventDefault()
</script>
<div class="grid w-full gap-3">
  <Alert type="warning" showIcon closable title={title} />
  <Alert closable title={blocked} description={description} onClose={keepOpen} />
</div>
{#snippet title()}这条提示可以关闭{/snippet}
{#snippet blocked()}阻止默认关闭{/snippet}
{#snippet description()}关闭事件被阻止后保持显示。{/snippet}

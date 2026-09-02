<script lang="ts">
  import { Alert } from '@fex-design/svelte/ui/alert'
</script>

<div class="grid w-full gap-3">
  <Alert type="success" showIcon title={success} />
  <Alert type="info" showIcon title={info} />
  <Alert type="warning" showIcon title={warning} />
  <Alert type="error" showIcon title={error} />
  <Alert
    type="info"
    showIcon
    title={custom}
    style="--alert-color:#7c3aed;--alert-color-background:#f5f3ff;--alert-color-border:#c4b5fd"
  />
</div>

{#snippet success()}操作成功{/snippet}
{#snippet info()}信息提示{/snippet}
{#snippet warning()}请注意当前配置{/snippet}
{#snippet error()}操作失败{/snippet}
{#snippet custom()}自定义颜色{/snippet}

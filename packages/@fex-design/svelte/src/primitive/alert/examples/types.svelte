<script lang="ts">
  import AlertTitle from '../alert-title.svelte'
  import AlertIcon from '../alert-icon.svelte'
  import Alert from '../alert.svelte'
  import CircleCheckIcon from '../../../icon/circle-check.svelte'
  import CircleErrorIcon from '../../../icon/circle-error.svelte'
  import CircleInfoIcon from '../../../icon/circle-info.svelte'
  import CircleWarningIcon from '../../../icon/circle-warning.svelte'
</script>

<div class="grid w-full gap-3">
  <Alert type="success"><AlertIcon><CircleCheckIcon /></AlertIcon><AlertTitle>操作成功</AlertTitle></Alert>
  <Alert type="info"><AlertIcon><CircleInfoIcon /></AlertIcon><AlertTitle>信息提示</AlertTitle></Alert>
  <Alert type="warning"><AlertIcon><CircleWarningIcon /></AlertIcon><AlertTitle>请注意当前配置</AlertTitle></Alert>
  <Alert type="error"><AlertIcon><CircleErrorIcon /></AlertIcon><AlertTitle>操作失败</AlertTitle></Alert>
  <Alert style="--alert-color:#7c3aed;--alert-color-background:#f5f3ff;--alert-color-border:#c4b5fd"><AlertIcon><CircleInfoIcon /></AlertIcon><AlertTitle>自定义颜色</AlertTitle></Alert>
</div>

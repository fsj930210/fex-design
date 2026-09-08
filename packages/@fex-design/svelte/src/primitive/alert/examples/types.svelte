<script lang="ts">
  import AlertTitle from '../alert-title.svelte'
  import AlertIcon from '../alert-icon.svelte'
  import Alert from '../alert.svelte'
  import CircleCheckIcon from '../../../icon/circle-check.svelte'
  import CircleXIcon from '../../../icon/circle-x.svelte'
  import InfoIcon from '../../../icon/info.svelte'
  import TriangleAlertIcon from '../../../icon/triangle-alert.svelte'
</script>

<div class="grid w-full gap-3">
  <Alert type="success"><AlertIcon><CircleCheckIcon /></AlertIcon><AlertTitle>操作成功</AlertTitle></Alert>
  <Alert type="info"><AlertIcon><InfoIcon /></AlertIcon><AlertTitle>信息提示</AlertTitle></Alert>
  <Alert type="warning"><AlertIcon><TriangleAlertIcon /></AlertIcon><AlertTitle>请注意当前配置</AlertTitle></Alert>
  <Alert type="error"><AlertIcon><CircleXIcon /></AlertIcon><AlertTitle>操作失败</AlertTitle></Alert>
  <Alert style="--alert-color:#7c3aed;--alert-color-background:#f5f3ff;--alert-color-border:#c4b5fd"><AlertIcon><InfoIcon /></AlertIcon><AlertTitle>自定义颜色</AlertTitle></Alert>
</div>

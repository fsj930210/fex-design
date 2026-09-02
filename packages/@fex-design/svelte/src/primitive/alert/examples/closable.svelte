<script lang="ts">
  import AlertDescription from '../alert-description.svelte'
  import AlertIcon from '../alert-icon.svelte'
  import AlertTitle from '../alert-title.svelte'
  import Alert from '../alert.svelte'
  import CircleWarningIcon from '../../../icon/circle-warning.svelte'
  import CloseIcon from '../../../icon/close.svelte'
  import { alertCloseClassName } from '@fex-design/styles/alert'

  let visible = $state(true)
</script>

<div class="grid w-full gap-3">
  {#if visible}
    <Alert type="warning"><AlertIcon><CircleWarningIcon /></AlertIcon><AlertTitle>这条提示可以关闭</AlertTitle><button class={alertCloseClassName} data-slot="alert-close" aria-label="关闭提示" onclick={() => (visible = false)}><CloseIcon /></button></Alert>
  {:else}
    <button onclick={() => (visible = true)}>重新显示</button>
  {/if}
  <Alert><AlertTitle>阻止默认关闭</AlertTitle><AlertDescription>关闭事件被阻止后保持显示。</AlertDescription><button class={alertCloseClassName} data-slot="alert-close" aria-label="关闭提示" onclick={(event) => event.preventDefault()}><CloseIcon /></button></Alert>
</div>

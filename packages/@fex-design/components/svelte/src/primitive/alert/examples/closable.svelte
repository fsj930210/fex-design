<script lang="ts">
  import { AlertDescription, AlertIcon, AlertTitle, Alert } from '@fex-design/svelte/primitive/alert'
  import TriangleAlertIcon from '@fex-design/svelte/icons/triangle-alert.svelte';
  import XIcon from '@fex-design/svelte/icons/x.svelte';
  import { alertCloseClassName } from "@fex-design/components-styles/alert";

  let visible = $state(true);
</script>

<div class="grid w-full gap-3">
  {#if visible}
    <Alert type="warning"
      ><AlertIcon><TriangleAlertIcon /></AlertIcon><AlertTitle
        >这条提示可以关闭</AlertTitle
      ><button
        class={alertCloseClassName}
        data-slot="alert-close"
        aria-label="关闭提示"
        onclick={() => (visible = false)}><XIcon /></button
      ></Alert
    >
  {:else}
    <button onclick={() => (visible = true)}>重新显示</button>
  {/if}
  <Alert
    ><AlertTitle>阻止默认关闭</AlertTitle><AlertDescription
      >关闭事件被阻止后保持显示。</AlertDescription
    ><button
      class={alertCloseClassName}
      data-slot="alert-close"
      aria-label="关闭提示"
      onclick={(event) => event.preventDefault()}><XIcon /></button
    ></Alert
  >
</div>

<script lang="ts">
  import StarIcon from '@fex-design/svelte/icons/star.svelte';
  import { AlertAction, AlertIcon, AlertTitle, Alert } from '@fex-design/svelte/primitive/alert'
  import XIcon from '@fex-design/svelte/icons/x.svelte';
  import { alertCloseClassName } from "@fex-design/components-styles/alert";
  let visible = $state(true);
</script>

{#if visible}<div class="w-full max-w-sm">
    <Alert type="success"
      ><AlertIcon><StarIcon /></AlertIcon><AlertTitle
        >Long alert title wraps to multiple lines when the alert container is
        narrow enough.</AlertTitle
      ><AlertAction><button class="underline">Action</button></AlertAction
      ><button
        class={alertCloseClassName}
        data-slot="alert-close"
        aria-label="关闭提示"
        onclick={() => (visible = false)}><XIcon /></button
      ></Alert
    >
  </div>{/if}

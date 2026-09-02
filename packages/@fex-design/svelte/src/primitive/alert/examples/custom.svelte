<script lang="ts">
  import StarIcon from '../../../icon/star.svelte'
  import AlertAction from '../alert-action.svelte'
  import AlertIcon from '../alert-icon.svelte'
  import AlertTitle from '../alert-title.svelte'
  import Alert from '../alert.svelte'
  import CloseIcon from '../../../icon/close.svelte'
  import { alertCloseClassName } from '@fex-design/styles/alert'
  let visible = $state(true)
</script>

{#if visible}<div class="w-full max-w-sm"><Alert type="success"><AlertIcon><StarIcon /></AlertIcon><AlertTitle>Long alert title wraps to multiple lines when the alert container is narrow enough.</AlertTitle><AlertAction><button class="underline">Action</button></AlertAction><button class={alertCloseClassName} data-slot="alert-close" aria-label="关闭提示" onclick={() => (visible = false)}><CloseIcon /></button></Alert></div>{/if}

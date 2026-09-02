<script lang="ts">
  import AlertAction from '../alert-action.svelte'
  import AlertIcon from '../alert-icon.svelte'
  import AlertTitle from '../alert-title.svelte'
  import Alert from '../alert.svelte'
  import CircleWarningIcon from '../../../icon/circle-warning.svelte'
  import CloseIcon from '../../../icon/close.svelte'
  import { alertCloseClassName } from '@fex-design/styles/alert'
  const items = [{ dir: 'ltr', title: '配置需要确认', action: '查看' }, { dir: 'rtl', title: 'يجب تأكيد الإعداد', action: 'عرض' }] as const
</script>

<div class="grid w-full gap-6 sm:grid-cols-2">
  {#each items as item (item.dir)}
    <section dir={item.dir} class="grid gap-3 rounded-lg border p-4"><strong>{item.dir.toUpperCase()}</strong><Alert type="warning"><AlertIcon><CircleWarningIcon /></AlertIcon><AlertTitle>{item.title}</AlertTitle><AlertAction><button class="underline">{item.action}</button></AlertAction><button class={alertCloseClassName} data-slot="alert-close" aria-label="关闭提示"><CloseIcon /></button></Alert></section>
  {/each}
</div>

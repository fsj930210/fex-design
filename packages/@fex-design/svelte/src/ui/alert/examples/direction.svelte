<script lang="ts">
  import { Alert } from '@fex-design/svelte/ui/alert'
</script>

<div class="grid w-full gap-6 sm:grid-cols-2">
  <section dir="ltr" class="grid gap-3 rounded-lg border p-4"><strong>LTR</strong><Alert type="warning" showIcon closable title={ltrTitle} action={ltrAction} /></section>
  <section dir="rtl" class="grid gap-3 rounded-lg border p-4"><strong>RTL</strong><Alert type="warning" showIcon closable title={rtlTitle} action={rtlAction} /></section>
</div>

{#snippet ltrTitle()}配置需要确认{/snippet}
{#snippet rtlTitle()}يجب تأكيد الإعداد{/snippet}
{#snippet ltrAction()}<button class="underline">查看</button>{/snippet}
{#snippet rtlAction()}<button class="underline">عرض</button>{/snippet}

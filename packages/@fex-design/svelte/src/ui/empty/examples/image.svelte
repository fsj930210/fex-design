<script lang="ts">
  import Empty from '@fex-design/svelte/ui/empty'
</script>
{#snippet customImage()}
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="21" cy="21" r="10" stroke="currentColor" stroke-width="2" />
    <path d="m29 29 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  </svg>
{/snippet}
<div class="grid w-full gap-4 md:grid-cols-3">
  <Empty title="默认图标" description="使用内置空状态图标。" />
  <Empty image={customImage} title="自定义图标" description="使用自定义媒体内容。" />
  <Empty image={null} title="隐藏图标" description="只显示标题和描述。" />
</div>

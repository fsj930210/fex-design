<script lang="ts">
  import Empty from '@fex-design/svelte/primitive/empty'
  import EmptyDescription from '@fex-design/svelte/primitive/empty-description'
  import EmptyHeader from '@fex-design/svelte/primitive/empty-header'
  import EmptyMedia from '@fex-design/svelte/primitive/empty-media'
  import EmptyTitle from '@fex-design/svelte/primitive/empty-title'
</script>
<div class="grid w-full gap-4 md:grid-cols-3">
  <Empty>
    <EmptyHeader>
      <EmptyMedia><svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect width="48" height="48" rx="12" fill="currentColor" opacity="0.1" /></svg></EmptyMedia>
      <EmptyTitle>默认图形</EmptyTitle>
      <EmptyDescription>使用空状态媒体内容。</EmptyDescription>
    </EmptyHeader>
  </Empty>
  <Empty>
    <EmptyHeader>
      <EmptyMedia>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="21" cy="21" r="10" stroke="currentColor" stroke-width="2" />
          <path d="m29 29 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </EmptyMedia>
      <EmptyTitle>自定义图形</EmptyTitle>
      <EmptyDescription>使用自定义媒体内容。</EmptyDescription>
    </EmptyHeader>
  </Empty>
  <Empty>
    <EmptyHeader>
      <EmptyTitle>隐藏图形</EmptyTitle>
      <EmptyDescription>只显示标题和描述。</EmptyDescription>
    </EmptyHeader>
  </Empty>
</div>

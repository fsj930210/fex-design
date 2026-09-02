<script lang="ts">
  import Empty from '@fex-design/svelte/primitive/empty'
  import EmptyDescription from '@fex-design/svelte/primitive/empty-description'
  import EmptyHeader from '@fex-design/svelte/primitive/empty-header'
  import EmptyMedia from '@fex-design/svelte/primitive/empty-media'
  import EmptyTitle from '@fex-design/svelte/primitive/empty-title'
</script>
<Empty>
  <EmptyHeader>
    <EmptyMedia><svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect width="48" height="48" rx="12" fill="currentColor" opacity="0.1" /></svg></EmptyMedia>
    <EmptyTitle>暂无数据</EmptyTitle>
    <EmptyDescription>当前没有可展示的数据。</EmptyDescription>
  </EmptyHeader>
</Empty>

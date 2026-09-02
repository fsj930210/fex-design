<script lang="ts">
  import Empty from '@fex-design/svelte/primitive/empty'
  import EmptyContent from '@fex-design/svelte/primitive/empty-content'
  import EmptyDescription from '@fex-design/svelte/primitive/empty-description'
  import EmptyHeader from '@fex-design/svelte/primitive/empty-header'
  import EmptyMedia from '@fex-design/svelte/primitive/empty-media'
  import EmptyTitle from '@fex-design/svelte/primitive/empty-title'
</script>
<Empty>
  <EmptyHeader>
    <EmptyMedia><svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect width="48" height="48" rx="12" fill="currentColor" opacity="0.1" /></svg></EmptyMedia>
    <EmptyTitle>暂无项目</EmptyTitle>
    <EmptyDescription>创建项目后，项目会显示在这里。</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <div class="flex flex-wrap justify-center gap-2">
      <button class="rounded-md bg-primary px-3 py-2 text-primary-foreground">创建项目</button>
      <button class="rounded-md border border-border px-3 py-2">导入项目</button>
    </div>
  </EmptyContent>
</Empty>

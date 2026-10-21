<script lang="ts">
  import { Pagination } from "@fex-design/svelte/ui/pagination";
  import { paginationDemoLabels } from "@fex-design/docs-shared/pagination-demo";
</script>

<div class="grid w-full gap-space-lg">
  <Pagination
    total={200}
    labels={paginationDemoLabels}
    defaultPage={8}
    showTotal
    showSizeChanger
    showQuickJumper
  >
    {#snippet totalContent(snapshot)}{snapshot.range[0]}–{snapshot.range[1]} / {snapshot.total}{/snippet}
    {#snippet pageContent(page, current)}{current
        ? "[" + page + "]"
        : page}{/snippet}
    {#snippet previous()}上一页{/snippet}{#snippet next()}下一页{/snippet}{#snippet ellipsis()}…{/snippet}
  </Pagination>
</div>

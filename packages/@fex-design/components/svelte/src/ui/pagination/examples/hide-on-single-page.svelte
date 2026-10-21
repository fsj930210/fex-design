<script lang="ts">
  import { Pagination } from "@fex-design/svelte/ui/pagination";
  import { paginationDemoLabels } from "@fex-design/docs-shared/pagination-demo";
  import { Button } from "@fex-design/svelte/ui/button";
  let total = $state(5);
</script>

<div class="grid w-full gap-space-lg">
  <div class="flex flex-wrap items-center gap-2">
    <Button onclick={() => (total = total === 5 ? 200 : 5)}
      >切换总数 5 / 200</Button
    ><span>总条数：{total}</span>
  </div>
  <Pagination
    {total}
    labels={paginationDemoLabels}
    defaultPage={8}
    showTotal
    showSizeChanger
    showQuickJumper
    hideOnSinglePage
  />
</div>

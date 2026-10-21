<script lang="ts">
  import { Pagination } from "@fex-design/svelte/ui/pagination";
  import { paginationDemoLabels } from "@fex-design/docs-shared/pagination-demo";
</script>

<div class="grid w-full gap-space-lg">
  <Pagination
    total={200}
    labels={paginationDemoLabels}
    defaultPage={8}
    size="sm"
    showTotal
    showSizeChanger
    showQuickJumper
  />
  <Pagination
    total={200}
    labels={paginationDemoLabels}
    defaultPage={8}
    size="md"
    showTotal
    showSizeChanger
    showQuickJumper
  />
  <Pagination
    total={200}
    labels={paginationDemoLabels}
    defaultPage={8}
    size="lg"
    showTotal
    showSizeChanger
    showQuickJumper
  />
</div>

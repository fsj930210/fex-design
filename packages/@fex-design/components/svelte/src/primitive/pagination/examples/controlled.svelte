<script lang="ts">
  import {
    PaginationRoot,
    PaginationContent,
    PaginationPageButton,
    PaginationNavigationButton,
    PaginationEllipsis,
    PaginationPageSizeSelect,
    PaginationQuickJumper,
    type PaginationValue,
    type PaginationChangeDetails,
  } from "@fex-design/svelte/primitive/pagination";
  import {
    paginationDemoLabels,
    paginationDemoInitialChange,
    formatPaginationDemoChange,
  } from "@fex-design/docs-shared/pagination-demo";
  import {
    paginationTotalClassName,
    paginationJumperGroupClassName,
  } from "@fex-design/components-styles/pagination";
  import { Button } from "@fex-design/svelte/ui/button";
  let total = $state(200);
  let value = $state({ page: 3, pageSize: 10 });
  let lastChange = $state(paginationDemoInitialChange);
  function change(next: PaginationValue, details: PaginationChangeDetails) {
    value = next;
    lastChange = formatPaginationDemoChange(next, details);
  }
  function reset() {
    value = { page: 3, pageSize: 10 };
    total = 200;
    lastChange = "已从外部重置";
  }
</script>

<div class="grid w-full gap-space-lg">
  <div class="flex flex-wrap gap-2">
    <Button onclick={() => (value = { ...value, page: 5 })}>设为第 5 页</Button
    ><Button onclick={() => (value = { page: 1, pageSize: 20 })}
      >每页 20 条</Button
    >
    <Button onclick={() => (total = 35)}>总数改为 35 条</Button><Button
      onclick={reset}>重置</Button
    >
  </div>
  <p class="text-sm text-muted-foreground">
    外部值：第 {value.page} 页，每页 {value.pageSize} 条，总数 {total} 条
  </p>
  <p aria-live="polite" class="text-sm text-muted-foreground">{lastChange}</p>
  <PaginationRoot
    {total}
    labels={paginationDemoLabels}
    page={value.page}
    pageSize={value.pageSize}
    onchange={change}
  >
    {#snippet children(snapshot)}
      <span data-slot="pagination-total" class={paginationTotalClassName}
        >{snapshot.labels.total(snapshot.total)}</span
      >
      <PaginationContent>
        <PaginationNavigationButton direction="prev" />
        {#each snapshot.pages as item (item.key)}
          {#if item.type === "page"}<PaginationPageButton page={item.page} />
          {:else}<PaginationEllipsis />{/if}
        {/each}
        <PaginationNavigationButton direction="next" />
      </PaginationContent>
      <PaginationPageSizeSelect />
      <div data-slot="pagination-jumper" class={paginationJumperGroupClassName}>
        <span>{snapshot.labels.jumpPrefix}</span><PaginationQuickJumper /><span
          >{snapshot.labels.jumpSuffix}</span
        >
      </div>
    {/snippet}
  </PaginationRoot>
</div>

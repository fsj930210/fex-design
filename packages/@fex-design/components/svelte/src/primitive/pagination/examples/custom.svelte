<script lang="ts">
  import {
    PaginationRoot,
    PaginationContent,
    PaginationPageButton,
    PaginationNavigationButton,
    PaginationEllipsis,
    PaginationPageSizeSelect,
    PaginationQuickJumper,
  } from "@fex-design/svelte/primitive/pagination";
  import { paginationDemoLabels } from "@fex-design/docs-shared/pagination-demo";
  import {
    paginationTotalClassName,
    paginationJumperGroupClassName,
  } from "@fex-design/components-styles/pagination";
</script>

<div class="grid w-full gap-space-lg">
  <PaginationRoot total={200} labels={paginationDemoLabels} defaultPage={8}>
    {#snippet children(snapshot)}
      <span data-slot="pagination-total" class={paginationTotalClassName}
        >{snapshot.range[0]}–{snapshot.range[1]} / {snapshot.total}</span
      >
      <PaginationContent>
        <PaginationNavigationButton direction="prev"
          >上一页</PaginationNavigationButton
        >
        {#each snapshot.pages as item (item.key)}
          {#if item.type === "page"}<PaginationPageButton page={item.page}
              >{item.page === snapshot.page
                ? "[" + item.page + "]"
                : item.page}</PaginationPageButton
            >
          {:else}<PaginationEllipsis>…</PaginationEllipsis>{/if}
        {/each}
        <PaginationNavigationButton direction="next"
          >下一页</PaginationNavigationButton
        >
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

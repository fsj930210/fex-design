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
    paginationSimpleClassName,
    paginationJumperGroupClassName,
  } from "@fex-design/components-styles/pagination";
</script>

<div class="grid w-full gap-space-lg">
  <PaginationRoot total={0} labels={paginationDemoLabels} defaultPage={1}>
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
  <PaginationRoot total={0} labels={paginationDemoLabels} defaultPage={1}>
    {#snippet children(snapshot)}
      <span data-slot="pagination-total" class={paginationTotalClassName}
        >{snapshot.labels.total(snapshot.total)}</span
      >
      <PaginationContent>
        <PaginationNavigationButton direction="prev" />
        <span data-slot="pagination-simple" class={paginationSimpleClassName}
          >{snapshot.pageCount === 0 ? 0 : snapshot.page} / {snapshot.pageCount}</span
        >
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

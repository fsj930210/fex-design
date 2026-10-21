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
  <PaginationRoot
    total={200}
    labels={paginationDemoLabels}
    defaultPage={8}
    dir="ltr"
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
  <PaginationRoot
    total={200}
    labels={paginationDemoLabels}
    defaultPage={8}
    dir="rtl"
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

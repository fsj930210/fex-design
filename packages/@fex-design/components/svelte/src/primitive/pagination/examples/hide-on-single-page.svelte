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
    paginationHideOnSinglePageClassName,
  } from "@fex-design/components-styles/pagination";
  import { cn } from "@fex-design/utils";
  import { Button } from "@fex-design/svelte/ui/button";
  let total = $state(5);
</script>

<div class="grid w-full gap-space-lg">
  <div class="flex flex-wrap items-center gap-2">
    <Button onclick={() => (total = total === 5 ? 200 : 5)}
      >切换总数 5 / 200</Button
    ><span>总条数：{total}</span>
  </div>
  <PaginationRoot
    {total}
    labels={paginationDemoLabels}
    defaultPage={8}
    class={cn(paginationHideOnSinglePageClassName)}
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

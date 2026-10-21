<script lang="ts">
  import {
    PaginationRoot,
    PaginationContent,
    PaginationPageButton,
    PaginationNavigationButton,
    PaginationEllipsis,
  } from "@fex-design/svelte/primitive/pagination";
  import { paginationDemoLabels } from "@fex-design/docs-shared/pagination-demo";
</script>

<div class="grid w-full gap-space-lg">
  <PaginationRoot total={200} labels={paginationDemoLabels} defaultPage={1}>
    {#snippet children(snapshot)}
      <PaginationContent>
        <PaginationNavigationButton direction="prev" />
        {#each snapshot.pages as item (item.key)}
          {#if item.type === "page"}<PaginationPageButton page={item.page} />
          {:else}<PaginationEllipsis />{/if}
        {/each}
        <PaginationNavigationButton direction="next" />
      </PaginationContent>
    {/snippet}
  </PaginationRoot>
</div>

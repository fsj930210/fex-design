<script lang="ts">
  import { usePagination } from "@fex-design/svelte/primitive/pagination";
  import { paginationDemoLabels } from "@fex-design/docs-shared/pagination-demo";
  const pageSizeOptions = [10, 20, 50, 100];
  let jump = $state("");
  const { controller, snapshot } = usePagination({
    total: 200,
    defaultPage: 3,
    labels: paginationDemoLabels,
  });
  function submitJump() {
    const page = Number(jump);
    if (Number.isInteger(page) && page > 0) controller.setPage(page, "jump");
    jump = "";
  }
</script>

<nav
  aria-label={snapshot().labels.navigation}
  class="grid w-full gap-3 rounded-lg border p-3"
>
  <div class="flex flex-wrap items-center gap-2">
    <span class="mr-auto">{snapshot().labels.total(snapshot().total)}</span>
    <button
      type="button"
      disabled={!snapshot().canPrevious}
      onclick={() => controller.previousPage()}
      >{snapshot().labels.previous}</button
    >
    <ol
      aria-label={snapshot().labels.navigation}
      class="flex flex-wrap items-center gap-1"
    >
      {#each snapshot().pages as item (item.key)}
        <li>
          {#if item.type === "page"}<button
              type="button"
              aria-current={item.page === snapshot().page ? "page" : undefined}
              onclick={() => controller.setPage(item.page)}>{item.page}</button
            >{:else}<span aria-hidden="true">…</span>{/if}
        </li>
      {/each}
    </ol>
    <button
      type="button"
      disabled={!snapshot().canNext}
      onclick={() => controller.nextPage()}>{snapshot().labels.next}</button
    >
  </div>
  <div class="flex flex-wrap items-center gap-3">
    <label class="flex items-center gap-2"
      >{snapshot().labels.pageSize}<select
        value={snapshot().pageSize}
        onchange={(event) =>
          controller.setPageSize(Number(event.currentTarget.value))}
        >{#each pageSizeOptions as size}<option value={size}
            >{snapshot().labels.pageSizeOption(size)}</option
          >{/each}</select
      ></label
    >
    <label class="flex items-center gap-2"
      >{snapshot().labels.jumpPrefix}<input
        type="number"
        min="1"
        max={snapshot().pageCount}
        value={jump}
        oninput={(event) => (jump = event.currentTarget.value)}
        onkeydown={(event) => {
          if (event.key === "Enter") submitJump();
        }}
      />{snapshot().labels.jumpSuffix}</label
    >
    <output aria-live="polite"
      >{snapshot().page} / {snapshot().pageCount}</output
    >
  </div>
</nav>

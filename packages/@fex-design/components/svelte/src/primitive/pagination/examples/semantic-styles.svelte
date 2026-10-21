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
  import {
    paginationDemoLabels,
    paginationDemoClassNames,
  } from "@fex-design/docs-shared/pagination-demo";
  import {
    paginationTotalClassName,
    paginationSimpleClassName,
    paginationJumperGroupClassName,
  } from "@fex-design/components-styles/pagination";
  import { cn } from "@fex-design/utils";
  const classNames = paginationDemoClassNames;
  const styles = {
    root: "background-color:#faf5ff",
    total: "color:#6d28d9",
    content: "column-gap:6px",
    pageButton: "border-color:#c4b5fd",
    navigationButton: "color:#6d28d9",
    ellipsis: "color:#8b5cf6",
    simple: "color:#6d28d9",
    pageSizeSelect: "min-width:128px",
    jumper: "color:#6d28d9",
    quickJumper: "width:96px",
  };
  const pageSizeProps = {
    selectTriggerProps: {
      style:
        "border-color:#c4b5fd;color:#6d28d9;background-color:#ffffff;border-radius:6px;--focus-border:#8b5cf6;--input-ring-width:1px;--input-ring-color:#ddd6fe",
    },
    selectContentProps: {
      style:
        "border-color:#c4b5fd;color:#6d28d9;background-color:#ffffff;border-radius:6px;--focus-border:#8b5cf6;--input-ring-width:1px;--input-ring-color:#ddd6fe;--primary:#6d28d9;--muted-background:#f5f3ff",
    },
  };
  const jumperProps = {
    inputNumberProps: {
      style:
        "border-color:#c4b5fd;color:#6d28d9;background-color:#ffffff;border-radius:6px;--focus-border:#8b5cf6;--input-ring-width:1px;--input-ring-color:#ddd6fe",
    },
    inputProps: { style: "color:#6d28d9" },
    incrementProps: { style: "color:#6d28d9" },
    decrementProps: { style: "color:#6d28d9" },
  };
</script>

<div class="grid w-full gap-space-lg">
  {#each [false, true] as simple (simple)}<PaginationRoot
      total={200}
      defaultPage={8}
      labels={paginationDemoLabels}
      class={classNames.root}
      style={styles.root}
      >{#snippet children(snapshot)}<span
          data-slot="pagination-total"
          class={cn(paginationTotalClassName, classNames.total)}
          style={styles.total}>{snapshot.labels.total(snapshot.total)}</span
        ><PaginationContent class={classNames.content} style={styles.content}
          ><PaginationNavigationButton
            direction="prev"
            class={classNames.navigationButton}
            style={styles.navigationButton}
          />{#if simple}<span
              data-slot="pagination-simple"
              class={cn(paginationSimpleClassName, classNames.simple)}
              style={styles.simple}>{snapshot.page} / {snapshot.pageCount}</span
            >{:else}{#each snapshot.pages as item (item.key)}{#if item.type === "page"}<PaginationPageButton
                  page={item.page}
                  class={classNames.pageButton}
                  style={styles.pageButton}
                />{:else}<PaginationEllipsis
                  class={classNames.ellipsis}
                  style={styles.ellipsis}
                />{/if}{/each}{/if}<PaginationNavigationButton
            direction="next"
            class={classNames.navigationButton}
            style={styles.navigationButton}
          /></PaginationContent
        ><PaginationPageSizeSelect
          {...pageSizeProps}
          class={classNames.pageSizeSelect}
          style={styles.pageSizeSelect}
        />
        <div
          data-slot="pagination-jumper"
          class={cn(paginationJumperGroupClassName, classNames.jumper)}
          style={styles.jumper}
        >
          <span>{snapshot.labels.jumpPrefix}</span><PaginationQuickJumper
            {...jumperProps}
            class={classNames.quickJumper}
            style={styles.quickJumper}
          /><span>{snapshot.labels.jumpSuffix}</span>
        </div>{/snippet}</PaginationRoot
    >{/each}
</div>

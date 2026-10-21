<script lang="ts">
  import type { Snippet, ComponentProps } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type {
    PaginationClassNames,
    PaginationStyles,
    PaginationOptions,
    PaginationSize,
    PaginationSnapshot,
  } from "@fex-design/core/pagination/types";
  import { cn } from "@fex-design/utils";
  import {
    paginationTotalClassName,
    paginationSimpleClassName,
    paginationJumperGroupClassName,
    paginationHideOnSinglePageClassName,
  } from "@fex-design/components-styles/pagination";
  import {
    PaginationRoot,
    PaginationContent,
    PaginationPageButton,
    PaginationNavigationButton,
    PaginationEllipsis,
    PaginationPageSizeSelect,
    PaginationQuickJumper,
  } from "@fex-design/svelte/primitive/pagination";

  interface Props
    extends
      Omit<HTMLAttributes<HTMLElement>, "children" | "onchange">,
      Omit<PaginationOptions, "onChange"> {
    classNames?: PaginationClassNames;
    styles?: PaginationStyles<string>;
    size?: PaginationSize;
    onchange?: PaginationOptions["onChange"];
    showTotal?: boolean;
    showSizeChanger?: boolean;
    pageSizeOptions?: readonly number[];
    showQuickJumper?: boolean;
    simple?: boolean;
    hideOnSinglePage?: boolean;
    totalContent?: Snippet<[PaginationSnapshot]>;
    pageContent?: Snippet<[number, boolean]>;
    previous?: Snippet;
    next?: Snippet;
    ellipsis?: Snippet;
    pageSizeSelectProps?: Pick<
      ComponentProps<typeof PaginationPageSizeSelect>,
      | "class"
      | "style"
      | "disabled"
      | "inputProps"
      | "selectRootProps"
      | "selectTriggerProps"
      | "selectContentProps"
    >;
    quickJumperProps?: Pick<
      ComponentProps<typeof PaginationQuickJumper>,
      | "class"
      | "style"
      | "disabled"
      | "inputProps"
      | "inputNumberProps"
      | "inputActionsProps"
      | "incrementProps"
      | "decrementProps"
    >;
  }
  let {
    total,
    page = $bindable(),
    defaultPage,
    pageSize = $bindable(),
    defaultPageSize,
    siblingCount,
    boundaryCount,
    disabled,
    labels,
    size,
    onchange,
    showTotal = false,
    showSizeChanger = false,
    pageSizeOptions,
    showQuickJumper = false,
    simple = false,
    hideOnSinglePage = false,
    totalContent,
    pageContent,
    previous,
    next,
    ellipsis,
    pageSizeSelectProps,
    quickJumperProps,
    classNames,
    styles,
    style,
    class: className,
    ...rest
  }: Props = $props();
  function mergeStyle(...values: (string | null | undefined)[]) {
    return values.filter(Boolean).join(";");
  }
</script>

<PaginationRoot
  {...rest}
  {total}
  bind:page
  {defaultPage}
  bind:pageSize
  {defaultPageSize}
  {siblingCount}
  {boundaryCount}
  {disabled}
  {labels}
  {size}
  {onchange}
  class={cn(
    hideOnSinglePage && paginationHideOnSinglePageClassName,
    classNames?.root,
    className,
  )}
  style={mergeStyle(styles?.root, style)}
>
  {#snippet children(snapshot)}
    {#if showTotal}<span
        data-slot="pagination-total"
        class={cn(paginationTotalClassName, classNames?.total)}
        style={styles?.total}
      >
        {#if totalContent}{@render totalContent(
            snapshot,
          )}{:else}{snapshot.labels.total(snapshot.total)}{/if}
      </span>{/if}
    <PaginationContent class={classNames?.content} style={styles?.content}>
      <PaginationNavigationButton
        class={classNames?.navigationButton}
        style={styles?.navigationButton}
        direction="prev"
        children={previous}
      />
      {#if simple}<span
          data-slot="pagination-simple"
          class={cn(paginationSimpleClassName, classNames?.simple)}
          style={styles?.simple}
          >{snapshot.pageCount === 0 ? 0 : snapshot.page} / {snapshot.pageCount}</span
        >
      {:else}{#each snapshot.pages as item (item.key)}
          {#if item.type === "page"}<PaginationPageButton
              class={classNames?.pageButton}
              style={styles?.pageButton}
              page={item.page}
            >
              {#if pageContent}{@render pageContent(
                  item.page,
                  item.page === snapshot.page,
                )}{:else}{item.page}{/if}
            </PaginationPageButton>{:else}<PaginationEllipsis
              class={classNames?.ellipsis}
              style={styles?.ellipsis}
              children={ellipsis}
            />{/if}
        {/each}{/if}
      <PaginationNavigationButton
        class={classNames?.navigationButton}
        style={styles?.navigationButton}
        direction="next"
        children={next}
      />
    </PaginationContent>
    {#if showSizeChanger}<PaginationPageSizeSelect
        {...pageSizeSelectProps}
        class={cn(classNames?.pageSizeSelect, pageSizeSelectProps?.class)}
        style={mergeStyle(styles?.pageSizeSelect, pageSizeSelectProps?.style)}
        options={pageSizeOptions}
      />{/if}
    {#if showQuickJumper}<div
        data-slot="pagination-jumper"
        class={cn(paginationJumperGroupClassName, classNames?.jumper)}
        style={styles?.jumper}
      >
        <span>{snapshot.labels.jumpPrefix}</span><PaginationQuickJumper
          {...quickJumperProps}
          class={cn(classNames?.quickJumper, quickJumperProps?.class)}
          style={mergeStyle(styles?.quickJumper, quickJumperProps?.style)}
        /><span>{snapshot.labels.jumpSuffix}</span>
      </div>{/if}
  {/snippet}
</PaginationRoot>

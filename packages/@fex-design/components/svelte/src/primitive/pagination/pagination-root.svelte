<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type {
    PaginationSize,
    PaginationOptions,
    PaginationSnapshot,
  } from "@fex-design/core/pagination/types";
  import { paginationRootClassName } from "@fex-design/components-styles/pagination";
  import { cn } from "@fex-design/utils";
  import { usePagination } from "./use-pagination.svelte";
  import { setPaginationContext } from "./context";

  interface Props
    extends
      Omit<HTMLAttributes<HTMLElement>, "onchange" | "children">,
      Omit<PaginationOptions, "onChange"> {
    size?: PaginationSize;
    onchange?: PaginationOptions["onChange"];
    children?: Snippet<[PaginationSnapshot]>;
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
    size = "md",
    onchange,
    children,
    class: className,
    ...rest
  }: Props = $props();
  const pagination = usePagination(() => ({
    total,
    page,
    defaultPage,
    pageSize,
    defaultPageSize,
    siblingCount,
    boundaryCount,
    disabled,
    labels,
    onChange: (value, details) => {
      if (page !== undefined) page = value.page;
      if (pageSize !== undefined) pageSize = value.pageSize;
      onchange?.(value, details);
    },
  }));
  const { snapshot, controller } = pagination;
  setPaginationContext({ ...pagination, size: () => size });
  export function getSnapshot() {
    return snapshot();
  }
  export function getController() {
    return controller;
  }
</script>

<nav
  {...rest}
  aria-label={rest["aria-label"] ?? snapshot().labels.navigation}
  data-slot="pagination-root"
  data-size={size}
  data-page-count={snapshot().pageCount}
  data-disabled={snapshot().disabled || undefined}
  class={cn(paginationRootClassName({ size }), className)}
>
  {@render children?.(snapshot())}
</nav>

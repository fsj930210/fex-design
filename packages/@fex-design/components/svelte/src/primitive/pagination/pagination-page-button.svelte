<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { paginationButtonClassName } from "@fex-design/components-styles/pagination";
  import { cn } from "@fex-design/utils";
  import { getPaginationContext } from "./context";

  interface Props extends HTMLButtonAttributes {
    page: number;
  }
  let {
    page,
    disabled,
    class: className,
    children,
    onclick,
    ...rest
  }: Props = $props();
  const { controller, snapshot, size } = getPaginationContext();
  const blocked = $derived(
    disabled ||
      snapshot().disabled ||
      !Number.isInteger(page) ||
      page < 1 ||
      page > snapshot().pageCount,
  );
</script>

<button
  {...rest}
  type={rest.type ?? "button"}
  disabled={blocked}
  aria-label={rest["aria-label"] ?? snapshot().labels.page(page)}
  aria-current={page === snapshot().page ? "page" : undefined}
  data-slot="pagination-page-button"
  data-active={page === snapshot().page || undefined}
  class={cn(paginationButtonClassName({ size: size() }), className)}
  onclick={(event) => {
    onclick?.(event);
    if (!event.defaultPrevented && !blocked) controller.setPage(page);
  }}
>
  {#if children}{@render children()}{:else}{page}{/if}
</button>

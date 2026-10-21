<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { PaginationDirection } from "@fex-design/core/pagination/types";
  import ChevronLeftIcon from "@fex-design/svelte/icons/chevron-left.svelte";
  import ChevronRightIcon from "@fex-design/svelte/icons/chevron-right.svelte";
  import { paginationButtonClassName } from "@fex-design/components-styles/pagination";
  import { cn } from "@fex-design/utils";
  import { getPaginationContext } from "./context";

  interface Props extends HTMLButtonAttributes {
    direction: PaginationDirection;
  }
  let {
    direction,
    disabled,
    class: className,
    children,
    onclick,
    ...rest
  }: Props = $props();
  const { controller, snapshot, size } = getPaginationContext();
  const blocked = $derived(
    disabled ||
      !(direction === "prev" ? snapshot().canPrevious : snapshot().canNext),
  );
</script>

<button
  {...rest}
  type={rest.type ?? "button"}
  disabled={blocked}
  aria-label={rest["aria-label"] ??
    (direction === "prev"
      ? snapshot().labels.previous
      : snapshot().labels.next)}
  data-slot="pagination-navigation-button"
  data-direction={direction}
  class={cn(paginationButtonClassName({ size: size() }), className)}
  onclick={(event) => {
    onclick?.(event);
    if (!event.defaultPrevented && !blocked) {
      if (direction === "prev") controller.previousPage();
      else controller.nextPage();
    }
  }}
>
  {#if children}{@render children()}{:else if direction === "prev"}<ChevronLeftIcon
      class="rtl:rotate-180"
    />{:else}<ChevronRightIcon class="rtl:rotate-180" />{/if}
</button>

<script lang="ts">
  import { paginationEllipsisClassName } from "@fex-design/components-styles/pagination";
  import { getPaginationContext } from "./context";
  import { cn } from "@fex-design/utils";
  import type { HTMLAttributes } from "svelte/elements";
  import MoreIcon from "@fex-design/svelte/icons/more.svelte";
  let {
    class: className,
    children,
    ...rest
  }: HTMLAttributes<HTMLSpanElement> = $props();
  const { size } = getPaginationContext();
</script>

<span
  {...rest}
  aria-hidden="true"
  data-slot="pagination-ellipsis"
  class={cn(paginationEllipsisClassName({ size: size() }), className)}
>
  {#if children}{@render children()}{:else}<MoreIcon />{/if}
</span>

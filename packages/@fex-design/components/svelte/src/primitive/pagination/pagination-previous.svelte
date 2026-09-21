<script lang="ts">
  import {
    paginationLinkClassName,
    paginationTextClassName,
    paginationTextLinkClassName,
  } from "@fex-design/components-styles/pagination";
  import { cn } from "@fex-design/utils";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import ChevronLeftIcon from '@fex-design/svelte/icons/chevron-left.svelte';
  interface Props extends Omit<HTMLAnchorAttributes, "class"> {
    class?: string | undefined;
    text?: string;
  }
  let { class: className, text = "Previous", ...rest }: Props = $props();
  const classList = $derived(
    cn(paginationLinkClassName, paginationTextLinkClassName, className),
  );
</script>

<a
  {...rest}
  aria-label="Go to previous page"
  data-slot="pagination-link"
  class={classList}
  ><ChevronLeftIcon /><span class={paginationTextClassName}>{text}</span></a
>

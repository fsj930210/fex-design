<script lang="ts">
  import { selectContentClassName } from "@fex-design/styles/select";
  import { cn } from "@fex/utils";
  import type { Snippet } from "svelte";
  import PopoverContent from "../popover/popover-content.svelte";
  import PopoverPortal from "../popover/popover-portal.svelte";
  import SelectList from "./select-list.svelte";
  let {
    class: className,
    children,
    option,
    emptyText,
    loadingText,
    footer,
  }: {
    class?: string | undefined;
    children?: Snippet | undefined;
    option?: Snippet<[import('@fex-design/core/select/types').SelectOption, { selected: boolean; active: boolean; disabled: boolean }]>;
    emptyText?: string;
    loadingText?: string;
    footer?: Snippet;
  } = $props();
</script>

<PopoverPortal
  ><PopoverContent
    class={cn(selectContentClassName, className)}
    style="width: var(--floating-reference-width); max-width: var(--floating-available-width);"
    >{#if children}{@render children()}{:else}<SelectList {option} {emptyText} {loadingText}
      />{/if}{@render footer?.()}</PopoverContent
  ></PopoverPortal
>

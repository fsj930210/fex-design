<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import {
    menuContentClassName,
    menuRootClassName,
  } from "@fex-design/components-styles/menu";
  import { popoverMenuContentClassName } from "@fex-design/components-styles/popover";
  import { readableCoreStore } from "@fex-design/svelte/stores/core-store";
  import { cn } from "@fex-design/utils";
  import PopoverContent from "../popover/popover-content.svelte";
  import { getDropdownContext } from "./context";

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: HTMLAttributes<HTMLDivElement> & {
    ref?: HTMLDivElement | null;
  } = $props();
  const context = getDropdownContext();
  const snapshot = readableCoreStore(context.controller.menu);
  // The Popover host can mount or unmount independently; bind Menu to the current DOM node.
  $effect(() => {
    if (ref) return context.controller.bindContent(ref);
  });
</script>

<PopoverContent
  {...rest}
  bind:ref
  role="menu"
  aria-labelledby={rest["aria-labelledby"] ??
    (rest["aria-label"] ? undefined : context.triggerId)}
  class={cn(
    popoverMenuContentClassName,
    menuRootClassName({ size: $snapshot.size, color: "none" }),
    menuContentClassName({ layout: "vertical", background: "none" }),
    className,
  )}
>
  {@render children?.()}
</PopoverContent>

<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import {
    menuRootClassName,
    menuContentClassName,
  } from "@fex-design/components-styles/menu";
  import { readableCoreStore } from "@fex-design/svelte/stores/core-store";
  import { cn } from "@fex-design/utils";
  import { getMenuLevel, useMenuContext } from "./context";
  let {
    children,
    class: className,
    ...rest
  }: HTMLAttributes<HTMLDivElement> = $props();
  const dom = useMenuContext(),
    parent = getMenuLevel(),
    snapshot = readableCoreStore(dom.controller);
  function host(element: HTMLDivElement) {
    return { destroy: dom.bindContent(element, parent) };
  }
</script>

<div
  {...rest}
  use:host
  role={$snapshot.layout === "horizontal" ? "menubar" : "menu"}
  dir={$snapshot.dir}
  data-slot="menu-content"
  class={cn(
    menuRootClassName({ size: $snapshot.size }),
    menuContentClassName({ layout: $snapshot.layout }),
    className,
  )}
>
  {@render children?.()}
</div>

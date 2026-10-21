<script lang="ts">
  import { getMenuBranchStore } from "@fex-design/core/menu/branch";
  import { setContext } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import {
    menuRootClassName,
    subMenuContentClassName,
  } from "@fex-design/components-styles/menu";
  import { readableCoreStore } from "@fex-design/svelte/stores/core-store";
  import { cn } from "@fex-design/utils";
  import { getSubMenu, menuLevelKey, useMenuContext } from "./context";
  import type { MenuPopoverProps } from "./popover-types";
  import { subMenuBodyClassName } from "@fex-design/components-styles/menu";
  let {
    container,
    children,
    class: className,
    style,
    ...rest
  }: HTMLAttributes<HTMLDivElement> & {
    container?: HTMLElement | null | undefined;
  } = $props();
  const dom = useMenuContext(),
    branch = getSubMenu(),
    snapshot = readableCoreStore(dom.controller);
  const presence = readableCoreStore(getMenuBranchStore(branch));
  const popup = $derived(
    $snapshot.layout === "inline"
      ? undefined
      : (branch.popoverProps?.() as MenuPopoverProps | undefined),
  );
  setContext(menuLevelKey, branch);
  function host(element: HTMLDivElement) {
    return { destroy: dom.bindContent(element, branch, () => ({ container })) };
  }
  // Portal container and branch identity are external DOM configuration.
  $effect(() => {
    container;
    branch.value();
    dom.refresh();
  });
</script>

<div
  {...rest}
  use:host
  role="menu"
  data-slot="submenu-content"
  dir={$snapshot.dir}
  hidden={$presence.phase === "closed"}
  inert={!$presence.open}
  class={cn(
    $snapshot.layout !== "inline" &&
      menuRootClassName({ size: $snapshot.size }),
    subMenuContentClassName({ inline: $snapshot.layout === "inline" }),
    popup?.classNames?.root,
    className,
  )}
  style={[popup?.styles?.root, style].filter(Boolean).join(";")}
>
  {#if $presence.mounted}<div
      data-slot="popover-body"
      class={cn(subMenuBodyClassName, popup?.classNames?.content)}
      style={popup?.styles?.content}
    >
      {@render children?.()}
    </div>{/if}
</div>

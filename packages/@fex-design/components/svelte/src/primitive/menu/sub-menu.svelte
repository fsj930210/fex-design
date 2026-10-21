<script lang="ts">
  import { setContext, type Snippet } from "svelte";
  import { createMenuBranch } from "@fex-design/core/menu/branch";
  import type { MenuPopoverProps } from "./popover-types";
  import { getMenuLevel, subMenuKey, useMenuContext } from "./context";
  let {
    value,
    popoverProps,
    children,
  }: {
    value: string;
    popoverProps?: MenuPopoverProps | undefined;
    children?: Snippet;
  } = $props();
  const dom = useMenuContext();
  setContext(
    subMenuKey,
    createMenuBranch(() => ({ value, popoverProps }), getMenuLevel()),
  );
  // Rune props configure the external floating controller.
  $effect(() => {
    value;
    Object.values(popoverProps ?? {});
    dom.refresh();
  });
</script>

{@render children?.()}

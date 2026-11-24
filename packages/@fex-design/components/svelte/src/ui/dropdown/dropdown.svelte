<script lang="ts">
  import type { Snippet } from "svelte";
  import { buttonClassName } from "@fex-design/components-styles/button";
  import {
    DropdownRoot,
    DropdownTrigger,
    DropdownPortal,
    DropdownContent,
  } from "@fex-design/svelte/primitive/dropdown";
  import MenuItems from "@fex-design/svelte/ui/menu/menu-items.svelte";
  import type { MenuItemData } from "@fex-design/svelte/ui/menu";
  let {
    items,
    children,
    item,
    ...root
  }: { items: readonly MenuItemData[]; children?: Snippet; item?: Snippet } =
    $props();
</script>

<DropdownRoot {...root}>
  <DropdownTrigger
    >{#snippet children(binding)}<button
        use:binding.action
        {...binding.props}
        class={buttonClassName({ variant: "outlined" })}
        data-slot="button"
        type="button">{@render children?.()}</button
      >{/snippet}</DropdownTrigger
  >
  <DropdownPortal
    ><DropdownContent><MenuItems {items} {item} /></DropdownContent
    ></DropdownPortal
  >
</DropdownRoot>

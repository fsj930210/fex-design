<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { assertMenuContent } from "@fex-design/core/menu/items";
  import { MenuRoot, MenuContent } from "@fex-design/svelte/primitive/menu";
  import type { MenuOptions } from "@fex-design/core/menu/types";
  import type {
    MenuItemData,
    MenuItemBinding,
    MenuClassNames,
    MenuStyles,
  } from "./types";
  import { cn } from "@fex-design/utils";
  import MenuItems from "./menu-items.svelte";
  type Props = MenuOptions &
    Omit<HTMLAttributes<HTMLDivElement>, keyof MenuOptions | "children"> & {
      items?: readonly MenuItemData[];
      children?: Snippet;
      item?: Snippet<[MenuItemData, MenuItemBinding]>;
      classNames?: MenuClassNames | undefined;
      styles?: MenuStyles | undefined;
    };
  let {
    items,
    children,
    item,
    classNames,
    styles,
    layout,
    dir,
    size,
    disabled,
    multiple,
    value,
    defaultValue,
    openValues,
    defaultOpenValues,
    inlineAccordion,
    submenuTrigger,
    openDelay,
    closeDelay,
    onValueChange,
    onOpenChange,
    onActivate,
    ...rest
  }: Props = $props();
  const contentItems = $derived.by(() => {
    assertMenuContent(items, children !== undefined);
    return items;
  });
</script>

<MenuRoot
  {layout}
  {dir}
  {size}
  {disabled}
  {multiple}
  {value}
  {defaultValue}
  {openValues}
  {defaultOpenValues}
  {inlineAccordion}
  {submenuTrigger}
  {openDelay}
  {closeDelay}
  {onValueChange}
  {onOpenChange}
  {onActivate}
>
  <MenuContent
    {...rest}
    class={cn(classNames?.root, rest.class)}
    style={[styles?.root, rest.style].filter(Boolean).join(";")}
  >
    {#if contentItems !== undefined}<MenuItems
        items={contentItems}
        {item}
        {classNames}
        {styles}
      />{:else}{@render children?.()}{/if}
  </MenuContent>
</MenuRoot>

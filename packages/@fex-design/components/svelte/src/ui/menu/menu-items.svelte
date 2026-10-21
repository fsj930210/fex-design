<script lang="ts">
  import type { Snippet } from "svelte";
  import { getMenuEntryKey } from "@fex-design/core/menu/items";
  import {
    SubMenu,
    SubMenuContent,
    MenuSeparator,
  } from "@fex-design/svelte/primitive/menu";
  import MenuItem from "./menu-item.svelte";
  import SubMenuTrigger from "./sub-menu-trigger.svelte";
  import MenuGroup from "./menu-group.svelte";
  import MenuValue from "./menu-value.svelte";
  import MenuItems from "./menu-items.svelte";
  import type {
    MenuItemData,
    MenuItemBinding,
    MenuClassNames,
    MenuStyles,
  } from "./types";
  let {
    items,
    item,
    classNames,
    styles,
  }: {
    items: readonly MenuItemData[];
    classNames?: MenuClassNames | undefined;
    styles?: MenuStyles | undefined;
    item?: Snippet<[MenuItemData, MenuItemBinding]> | undefined;
  } = $props();
</script>

{#each items as entry (getMenuEntryKey(entry))}
  {#if entry.type === "separator"}
    <MenuSeparator class={classNames?.separator} style={styles?.separator} />
  {:else if entry.type === "group"}
    <MenuGroup
      class={classNames?.group}
      style={styles?.group}
      label={entry.label}
      ><MenuItems
        items={entry.children}
        {item}
        {classNames}
        {styles}
      /></MenuGroup
    >
  {:else if entry.children !== undefined}
    <SubMenu value={entry.value} popoverProps={entry.popoverProps}>
      <SubMenuTrigger
        class={classNames?.subMenuTrigger}
        style={styles?.subMenuTrigger}
        disabled={entry.disabled || !entry.children.length}
        textValue={entry.textValue}
        icon={entry.icon}
        suffix={entry.suffix}><MenuValue value={entry.label} /></SubMenuTrigger
      >
      <SubMenuContent
        class={classNames?.subMenuContent}
        style={styles?.subMenuContent}
        ><MenuItems
          items={entry.children}
          {item}
          {classNames}
          {styles}
        /></SubMenuContent
      >
    </SubMenu>
  {:else}
    {#snippet host(binding: MenuItemBinding)}{@render item?.(
        entry,
        binding,
      )}{/snippet}
    <MenuItem
      class={classNames?.item}
      style={styles?.item}
      value={entry.value}
      disabled={entry.disabled}
      textValue={entry.textValue}
      icon={entry.icon}
      suffix={entry.suffix}
      href={entry.href}
      target={entry.target}
      rel={entry.rel}
      trigger={item ? host : undefined}
      ><MenuValue value={entry.label} /></MenuItem
    >
  {/if}
{/each}

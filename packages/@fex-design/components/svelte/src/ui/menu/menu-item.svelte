<script lang="ts">
  import type { Snippet, ComponentProps } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { MenuItem as PrimitiveItem } from "@fex-design/svelte/primitive/menu";
  import {
    menuItemIconClassName,
    menuItemLabelClassName,
    menuItemSuffixClassName,
  } from "@fex-design/components-styles/menu";
  import MenuValue from "./menu-value.svelte";
  import type { MenuContentValue, MenuItemBinding } from "./types";
  interface Props extends Omit<HTMLAttributes<HTMLElement>, "children"> {
    value: string;
    disabled?: boolean | undefined;
    textValue?: string | undefined;
    children?: Snippet;
    icon?: MenuContentValue;
    suffix?: MenuContentValue;
    href?: string | undefined;
    target?: string | undefined;
    rel?: string | undefined;
    trigger?: Snippet<[MenuItemBinding]> | undefined;
  }
  let {
    value,
    disabled = false,
    textValue,
    children,
    icon,
    suffix,
    href,
    target,
    rel,
    trigger,
    ...rest
  }: Props = $props();
  type Binding = Parameters<
    NonNullable<ComponentProps<typeof PrimitiveItem>["trigger"]>
  >[0];
</script>

{#snippet content()}
  {#if icon != null && icon !== false}<span
      data-slot="menu-icon"
      class={menuItemIconClassName}><MenuValue value={icon} /></span
    >{/if}
  <span data-slot="menu-item-content" class={menuItemLabelClassName}
    >{@render children?.()}</span
  >
  {#if suffix != null && suffix !== false}<span
      data-slot="menu-suffix"
      class={menuItemSuffixClassName}><MenuValue value={suffix} /></span
    >{/if}
{/snippet}
{#snippet host(binding: Binding)}
  {#if trigger}
    {@render trigger({ ...binding, content })}
  {:else if href !== undefined}
    <a {...binding.props} use:binding.action {href} {target} {rel}
      >{@render content()}</a
    >
  {:else}
    <button {...binding.props} use:binding.action>{@render content()}</button>
  {/if}
{/snippet}
<PrimitiveItem {...rest} {value} {disabled} {textValue} trigger={host} />

<script lang="ts">
  import type { Snippet, ComponentProps } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { SubMenuTrigger as PrimitiveTrigger } from "@fex-design/svelte/primitive/menu";
  import ChevronRightIcon from "@fex-design/svelte/icons/chevron-right";
  import {
    menuItemIconClassName,
    menuItemLabelClassName,
    menuItemSuffixClassName,
    menuExpandIconClassName,
  } from "@fex-design/components-styles/menu";
  import MenuValue from "./menu-value.svelte";
  import type { MenuContentValue, SubMenuTriggerBinding } from "./types";
  interface Props extends Omit<HTMLAttributes<HTMLElement>, "children"> {
    disabled?: boolean | undefined;
    textValue?: string | undefined;
    children?: Snippet;
    icon?: MenuContentValue;
    suffix?: MenuContentValue;
    indicator?: MenuContentValue;
    trigger?: Snippet<[SubMenuTriggerBinding]> | undefined;
  }
  let {
    disabled = false,
    textValue,
    children,
    icon,
    suffix,
    indicator,
    trigger,
    ...rest
  }: Props = $props();
  type Binding = Parameters<
    NonNullable<ComponentProps<typeof PrimitiveTrigger>["trigger"]>
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
  {#if indicator !== false && indicator !== null}
    <span data-slot="submenu-indicator" class={menuExpandIconClassName}
      >{#if indicator === undefined}<ChevronRightIcon />{:else}<MenuValue
          value={indicator}
        />{/if}</span
    >
  {/if}
{/snippet}
{#snippet host(binding: Binding)}
  {#if trigger}{@render trigger({ ...binding, content })}{:else}<button
      {...binding.props}
      use:binding.action>{@render content()}</button
    >{/if}
{/snippet}
<PrimitiveTrigger {...rest} {disabled} {textValue} trigger={host} />

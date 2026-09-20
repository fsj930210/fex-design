<script lang="ts">
  import { cn } from "@fex/utils";
  import {
    InputAddonAfter,
    InputAddonBefore,
    InputClear,
    InputControl,
    InputGroup,
    InputPrefix,
    InputRoot,
    InputSuffix,
  } from "@fex-design/svelte/primitive/input";
  import CircleXIcon from "../../icon/circle-x.svelte";
  import type { InputProps } from "./input.types";
  let {
    class: className,
    value,
    defaultValue = "",
    onValueChange,
    size = "md",
    variant = "outlined",
    prefix,
    suffix,
    addonBefore,
    addonAfter,
    clear,
    clearable = false,
    classNames,
    styles,
    disabled,
    readonly = false,
    ref = $bindable(null),
    ...rest
  }: InputProps = $props();
</script>

{#snippet body()}
  <InputRoot
    {value}
    {defaultValue}
    {disabled}
    readOnly={readonly}
    {size}
    {variant}
    class={cn(classNames?.root, className)}
    style={styles?.root}
    onValueChange={(next) => onValueChange?.(next)}
  >
    {#if prefix}<InputPrefix class={classNames?.prefix} style={styles?.prefix}
        >{@render prefix()}</InputPrefix
      >{/if}
    <InputControl
      {...rest}
      {disabled}
      {readonly}
      class={classNames?.control}
      style={styles?.control}
      bind:ref
    />
    {#if clearable}<InputClear class={classNames?.clear} style={styles?.clear}
        >{#if clear}{@render clear()}{:else}<CircleXIcon
          />{/if}</InputClear
      >{/if}
    {#if suffix}<InputSuffix class={classNames?.suffix} style={styles?.suffix}
        >{@render suffix()}</InputSuffix
      >{/if}
  </InputRoot>
{/snippet}
{#if addonBefore || addonAfter}
  <InputGroup>
    {#if addonBefore}<InputAddonBefore
        class={classNames?.addonBefore}
        style={styles?.addonBefore}>{@render addonBefore()}</InputAddonBefore
      >{/if}
    {@render body()}
    {#if addonAfter}<InputAddonAfter
        class={classNames?.addonAfter}
        style={styles?.addonAfter}>{@render addonAfter()}</InputAddonAfter
      >{/if}
  </InputGroup>
{:else}
  {@render body()}
{/if}

<script lang="ts">
  import {
    buttonClassName,
    buttonSpinnerClassName,
  } from "@fex-design/components-styles/button";
  import { cn } from "@fex-design/utils";
  import LoadingIcon from "@fex-design/svelte/icons/loading.svelte";
  import {
    Button as PrimitiveButton,
    ButtonIcon,
  } from "@fex-design/svelte/primitive/button";
  import type { ButtonProps } from "./button.types";

  let {
    startIconProps,
    endIconProps,
    loadingIconProps,
    variant = "outlined",
    color,
    size = "md",
    effect,
    iconPlacement = "start",
    loading = false,
    disabled = false,
    type = "button",
    ref = $bindable(null),
    class: className,
    children,
    icon,
    loadingIndicator,
    ...rest
  }: ButtonProps = $props();
</script>

<PrimitiveButton
  {...rest}
  class={cn(buttonClassName({ variant, color, size, effect }), className)}
  data-slot="button"
  data-variant={variant}
  data-color={color}
  {variant}
  {color}
  data-size={size}
  data-effect={effect}
  data-loading={loading ? "true" : undefined}
  disabled={disabled || loading}
  {type}
  bind:ref
>
  {#if iconPlacement === "start" && (loading || icon)}
    <ButtonIcon {...startIconProps} data-icon="inline-start">
      {#if loading}
        {#if loadingIndicator}
          {@render loadingIndicator()}
        {:else}
          <LoadingIcon
            {...loadingIconProps}
            class={cn(buttonSpinnerClassName, loadingIconProps?.class)}
          />
        {/if}
      {:else if icon}
        {@render icon()}
      {/if}
    </ButtonIcon>
  {/if}
  {@render children?.()}
  {#if iconPlacement === "end" && (loading || icon)}
    <ButtonIcon {...endIconProps} data-icon="inline-end">
      {#if loading}
        {#if loadingIndicator}
          {@render loadingIndicator()}
        {:else}
          <LoadingIcon
            {...loadingIconProps}
            class={cn(buttonSpinnerClassName, loadingIconProps?.class)}
          />
        {/if}
      {:else if icon}
        {@render icon()}
      {/if}
    </ButtonIcon>
  {/if}
</PrimitiveButton>

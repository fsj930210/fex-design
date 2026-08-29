<script lang="ts">
  import {
    buttonClassName,
    buttonSpinnerClassName,
  } from '@fex-design/styles/button'
  import { cn } from '@fex/utils'
  import LoadingIcon from '../../icon/loading.svelte'
  import { Button as PrimitiveButton, ButtonIcon } from '@fex-design/svelte/primitive/button'
  import type { ButtonProps } from './button.types'

  let {
    variant = 'outlined',
    color,
    size = 'default',
    effect,
    iconPlacement = 'start',
    loading = false,
    disabled = false,
    type = 'button',
    ref = $bindable(null),
    class: className,
    children,
    icon,
    loadingIndicator,
    ...rest
  }: ButtonProps = $props()

  const classList = $derived(cn(buttonClassName({ variant, color, size, effect }), className))
  const isDisabled = $derived(disabled || loading)

</script>

<PrimitiveButton
  {...rest}
  class={classList}
  data-slot="button"
  data-variant={variant}
  data-color={color}
  {variant}
  {color}
  data-size={size}
  data-effect={effect}
  data-loading={loading ? 'true' : undefined}
  disabled={isDisabled}
  type={type}
  bind:ref
>
  {#if iconPlacement === 'start' && (loading || icon)}
    <ButtonIcon data-icon="inline-start">
      {#if loading}
        {#if loadingIndicator}
          {@render loadingIndicator()}
        {:else}
          <LoadingIcon class={buttonSpinnerClassName} />
        {/if}
      {:else if icon}
        {@render icon()}
      {/if}
    </ButtonIcon>
  {/if}
  {@render children?.()}
  {#if iconPlacement === 'end' && (loading || icon)}
    <ButtonIcon data-icon="inline-end">
      {#if loading}
        {#if loadingIndicator}
          {@render loadingIndicator()}
        {:else}
          <LoadingIcon class={buttonSpinnerClassName} />
        {/if}
      {:else if icon}
        {@render icon()}
      {/if}
    </ButtonIcon>
  {/if}
</PrimitiveButton>

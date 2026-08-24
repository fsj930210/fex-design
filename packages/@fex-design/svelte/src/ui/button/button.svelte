<script lang="ts">
  import {
    buttonClassName,
    buttonSpinnerClassName,
  } from '@fex-design/styles/button'
  import { cn } from '@fex/utils'
  import LoadingIcon from '../../icon/loading.svelte'
  import PrimitiveButton from '../../primitive/button/button.svelte'
  import ButtonIcon from '../../primitive/button/button-icon.svelte'
  import type { ButtonProps } from './button.types'

  let {
    variant = 'default',
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

  const classList = $derived(cn(buttonClassName({ variant, size, effect }), className))
  const isDisabled = $derived(disabled || loading)

</script>

<PrimitiveButton
  {...rest}
  class={classList}
  data-slot="button"
  data-variant={variant}
  data-size={size}
  data-effect={effect}
  data-loading={loading ? 'true' : undefined}
  disabled={isDisabled}
  type={type}
  bind:ref
>
  {#if iconPlacement === 'start' && (loading || icon)}
    <ButtonIcon placement="start" {effect}>
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
    <ButtonIcon placement="end" {effect}>
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

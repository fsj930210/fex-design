<script lang="ts">
  import { inputClearClassName } from '@fex-design/styles/input'
  import { cn } from '@fex/utils'
  import type { Snippet } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import CircleXIcon from '../../icon/circle-x.svelte'
  import { getInputContext } from './context'

  interface Props extends Omit<HTMLButtonAttributes, 'class'> {
    class?: string
    forceMount?: boolean
    children?: Snippet
  }

  let {
    class: className,
    forceMount = false,
    children,
    onclick,
    ...rest
  }: Props = $props()
  const input = getInputContext('InputClear')
</script>

{#if forceMount || input.canClear()}
  <button
    type="button"
    aria-label="Clear input"
    {...rest}
    data-slot="input-clear"
    disabled={!forceMount && !input.canClear()}
    class={cn(inputClearClassName, className)}
    onclick={(event) => {
      onclick?.(event)
      if (!event.defaultPrevented) input.clear()
    }}
  >
    {#if children}{@render children()}{:else}<CircleXIcon />{/if}
  </button>
{/if}

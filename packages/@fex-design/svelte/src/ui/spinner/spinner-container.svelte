<script lang="ts">
  import type { SpinnerContainerOptions, SpinnerOptions, SpinnerStyles } from '@fex-design/core/spinner/types'
  import { spinnerContainerClassName, spinnerOverlayClassName } from '@fex-design/styles/spinner'
  import { cn } from '@fex/utils'
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import Spinner from '../../primitive/spinner/spinner.svelte'
  import PrimitiveSpinnerContainer from '../../primitive/spinner/spinner-container.svelte'
  import SpinnerText from '../../primitive/spinner/spinner-text.svelte'
  let { class: className, spinning, text, indicator, size, classNames, styles, children, ...rest }: HTMLAttributes<HTMLDivElement> & Omit<SpinnerContainerOptions<Snippet, string>, 'text'> & SpinnerOptions & { text?: string; children?: Snippet; styles?: SpinnerStyles<string> } = $props()
</script>
{#if spinning === undefined}
  <Spinner {...rest} {size} class={cn(className, classNames?.spinner)} style={styles?.spinner}>{#if indicator}{@render indicator()}{/if}</Spinner>
{:else}
  <PrimitiveSpinnerContainer {...rest} aria-busy={spinning} class={cn(spinnerContainerClassName, className, classNames?.root)} style={styles?.root}>
    {@render children?.()}
    {#if spinning}<div data-slot="spinner-overlay" class={cn(spinnerOverlayClassName, classNames?.overlay, text && 'flex-col')} style={styles?.overlay}><Spinner {size} class={classNames?.spinner} style={styles?.spinner}>{#if indicator}{@render indicator()}{/if}</Spinner>{#if text}<SpinnerText class={classNames?.text} style={styles?.text}>{text}</SpinnerText>{/if}</div>{/if}
  </PrimitiveSpinnerContainer>
{/if}

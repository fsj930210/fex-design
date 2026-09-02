<script lang="ts">
  import type { AlertClassNames, AlertOptions, AlertStyles } from '@fex-design/core/alert/types'
  import { alertActionClassName, alertCloseClassName, alertContentClassName, alertDescriptionClassName, alertIconClassName, alertTitleClassName } from '@fex-design/styles/alert'
  import { cn } from '@fex/utils'
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import CircleCheckIcon from '../../icon/circle-check.svelte'
  import CloseIcon from '../../icon/close.svelte'
  import CircleErrorIcon from '../../icon/circle-error.svelte'
  import CircleInfoIcon from '../../icon/circle-info.svelte'
  import CircleWarningIcon from '../../icon/circle-warning.svelte'
  import PrimitiveAlert from '../../primitive/alert/alert.svelte'

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>, AlertOptions {
    title?: Snippet
    description?: Snippet
    children?: Snippet
    showIcon?: boolean
    icon?: Snippet
    action?: Snippet
    closable?: boolean
    closeIcon?: Snippet
    onClose?: (event: MouseEvent) => void
    classNames?: AlertClassNames
    styles?: AlertStyles<string>
  }
  let {
    type = 'info',
    variant = 'filled',
    title,
    description,
    children,
    showIcon = false,
    icon,
    action,
    closable = false,
    closeIcon,
    onClose,
    class: className,
    style,
    classNames,
    styles,
    ...rest
  }: Props = $props()
  let visible = $state(true)

  function close(event: MouseEvent) {
    onClose?.(event)
    if (!event.defaultPrevented) visible = false
  }
</script>

{#if visible}
  <PrimitiveAlert {...rest} {type} {variant} class={cn(className, classNames?.root)} style={`${typeof style === 'string' ? style : ''}${styles?.root ?? ''}`}>
    {#if showIcon}
      <span aria-hidden="true" data-slot="alert-icon" class={cn(alertIconClassName, classNames?.icon)} style={styles?.icon}>
        {#if icon}
          {@render icon()}
        {:else if type === 'success'}
          <CircleCheckIcon />
        {:else if type === 'warning'}
          <CircleWarningIcon />
        {:else if type === 'error'}
          <CircleErrorIcon />
        {:else}
          <CircleInfoIcon />
        {/if}
      </span>
    {/if}
    <div data-slot="alert-content" class={cn(alertContentClassName, classNames?.content)} style={styles?.content}>
      {#if title}
        <div data-slot="alert-title" class={cn(alertTitleClassName, classNames?.title)} style={styles?.title}>
          {@render title()}
        </div>
      {/if}
      {#if description}
        <div data-slot="alert-description" class={cn(alertDescriptionClassName, classNames?.description)} style={styles?.description}>
          {@render description()}
        </div>
      {:else if children}
        <div data-slot="alert-description" class={cn(alertDescriptionClassName, classNames?.description)} style={styles?.description}>
          {@render children()}
        </div>
      {/if}
    </div>
    {#if action}
      <div data-slot="alert-action" class={cn(alertActionClassName, classNames?.action)} style={styles?.action}>
        {@render action()}
      </div>
    {/if}
    {#if closable}
      <button type="button" aria-label="Close alert" data-slot="alert-close" class={cn(alertCloseClassName, classNames?.close)} style={styles?.close} onclick={close}>
        {#if closeIcon}
          {@render closeIcon()}
        {:else}
          <CloseIcon />
        {/if}
      </button>
    {/if}
  </PrimitiveAlert>
{/if}

import type { AlertOptions } from '@fex-design/core/alert/types'
import {
  alertActionClassName,
  alertClassName,
  alertDescriptionClassName,
  alertIconClassName,
  alertTitleClassName,
} from '@fex-design/styles/alert'
import { cn } from '@fex/utils'
import type { JSX, ParentProps } from 'solid-js'
import { splitProps } from 'solid-js'

type DivProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>

export type AlertProps = DivProps & AlertOptions

export function Alert(props: AlertProps) {
  const [local, rest] = splitProps(props, ['class', 'children', 'type', 'variant'])
  return (
    <div
      data-slot="alert"
      role="alert"
      {...rest}
      class={cn(alertClassName({ type: local.type ?? 'info', variant: local.variant ?? 'filled' }), local.class)}
    >
      {local.children}
    </div>
  )
}

export type AlertIconProps = ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>

export function AlertIcon(props: AlertIconProps) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return <span {...rest} data-slot="alert-icon" class={cn(alertIconClassName, local.class)}>{local.children}</span>
}

export function AlertTitle(props: DivProps) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <div {...rest} data-slot="alert-title" class={cn(alertTitleClassName, local.class)}>
      {local.children}
    </div>
  )
}

export function AlertDescription(props: DivProps) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <div {...rest} data-slot="alert-description" class={cn(alertDescriptionClassName, local.class)}>
      {local.children}
    </div>
  )
}

export function AlertAction(props: DivProps) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <div {...rest} data-slot="alert-action" class={cn(alertActionClassName, local.class)}>
      {local.children}
    </div>
  )
}

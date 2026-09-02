import type { AlertOptions } from '@fex-design/core/alert/types'
import {
  alertActionClassName,
  alertClassName,
  alertDescriptionClassName,
  alertIconClassName,
  alertTitleClassName,
} from '@fex-design/styles/alert'
import { cn } from '@fex/utils'
import type { ComponentProps } from 'react'

export type AlertProps = ComponentProps<'div'> & AlertOptions

export function Alert({ className, type = 'info', variant = 'filled', ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertClassName({ type, variant }), className)}
      {...props}
    />
  )
}

export type AlertIconProps = ComponentProps<'span'>

export function AlertIcon({ className, ...props }: AlertIconProps) {
  return <span data-slot="alert-icon" className={cn(alertIconClassName, className)} {...props} />
}

export function AlertTitle({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="alert-title" className={cn(alertTitleClassName, className)} {...props} />
}

export function AlertDescription({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(alertDescriptionClassName, className)}
      {...props}
    />
  )
}

export function AlertAction({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="alert-action" className={cn(alertActionClassName, className)} {...props} />
}

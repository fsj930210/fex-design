import type { AlertOptions } from './utils'

import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'
import { cva } from 'class-variance-authority'

const alertClassName = cva(
  "group/alert relative grid w-full grid-cols-[minmax(0,1fr)_auto_auto] items-start has-data-[slot=alert-icon]:grid-cols-[auto_minmax(0,1fr)_auto_auto] gap-x-[var(--alert-content-gap,0.5rem)] rounded-[var(--alert-radius,var(--radius-md))] border px-[var(--alert-padding-inline,0.75rem)] py-[var(--alert-padding-block,0.625rem)] text-left text-sm",
  {
    variants: {
      type: {
        success:
          '[--alert-color:var(--alert-color-success,var(--color-success))] [--alert-color-foreground:var(--alert-color-success-foreground,var(--color-success-foreground))] [--alert-color-background:var(--alert-color-success-background,var(--color-success-background))] [--alert-color-border:var(--alert-color-success-border,var(--color-success-border))]',
        info: '[--alert-color:var(--alert-color-info,var(--color-info))] [--alert-color-foreground:var(--alert-color-info-foreground,var(--color-info-foreground))] [--alert-color-background:var(--alert-color-info-background,var(--color-info-background))] [--alert-color-border:var(--alert-color-info-border,var(--color-info-border))]',
        warning:
          '[--alert-color:var(--alert-color-warning,var(--color-warning))] [--alert-color-foreground:var(--alert-color-warning-foreground,var(--color-warning-foreground))] [--alert-color-background:var(--alert-color-warning-background,var(--color-warning-background))] [--alert-color-border:var(--alert-color-warning-border,var(--color-warning-border))]',
        error:
          '[--alert-color:var(--alert-color-error,var(--color-danger))] [--alert-color-foreground:var(--alert-color-error-foreground,var(--color-danger-foreground))] [--alert-color-background:var(--alert-color-error-background,var(--color-danger-background))] [--alert-color-border:var(--alert-color-error-border,var(--color-danger-border))]',
      },
      variant: {
        filled:
          'border-[var(--alert-color-border)] bg-[var(--alert-color-background)] text-[var(--alert-color)]',
        outlined: 'border-[var(--alert-color-border)] bg-transparent text-[var(--alert-color)]',
        solid:
          'border-[var(--alert-color)] bg-[var(--alert-color)] text-[var(--alert-color-foreground)]',
      },
    },
    defaultVariants: {
      type: 'info',
      variant: 'filled',
    },
  },
)

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
  return <span data-slot="alert-icon" className={cn("row-span-2 mt-0.5 inline-flex size-[var(--alert-icon-size,1rem)] shrink-0 items-center justify-center [&>svg]:size-full", className)} {...props} />
}

export function AlertTitle({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="alert-title" className={cn("col-start-1 row-start-1 font-medium leading-5 group-has-data-[slot=alert-icon]/alert:col-start-2", className)} {...props} />
}

export function AlertDescription({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn("col-start-1 row-start-2 mt-0.5 text-sm leading-5 opacity-85 group-has-data-[slot=alert-icon]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-4 [&_p:not(:last-child)]:mb-4", className)}
      {...props}
    />
  )
}

export function AlertAction({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="alert-action" className={cn("col-start-2 row-start-1 ms-2 shrink-0 group-has-data-[slot=alert-icon]/alert:col-start-3", className)} {...props} />
}

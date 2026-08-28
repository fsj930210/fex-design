import {
  spinnerClassName,
  spinnerContainerClassName,
  spinnerOverlayClassName,
  spinnerTextClassName,
} from '@fex-design/styles/spinner'
import { cn } from '@fex/utils'
import type { SpinnerOptions } from '@fex-design/core/spinner/types'
import type { ComponentProps } from 'react'
import { LoadingIcon } from '../../icon/loading'

export function SpinnerContainer({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="spinner-container"
      className={cn(spinnerContainerClassName, className)}
      {...props}
    />
  )
}

export function Spinner({
  children,
  className,
  size = 'md',
  ...props
}: ComponentProps<'span'> & SpinnerOptions) {
  return (
    <span
      data-slot="spinner"
      className={cn(spinnerClassName({ size }), className)}
      role="status"
      {...props}
    >
      {children ?? <LoadingIcon className="animate-spin" />}
    </span>
  )
}

export function SpinnerText({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span data-slot="spinner-text" className={cn(spinnerTextClassName, className)} {...props} />
  )
}

export function SpinnerOverlay({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="spinner-overlay"
      className={cn(spinnerOverlayClassName, className)}
      {...props}
    />
  )
}

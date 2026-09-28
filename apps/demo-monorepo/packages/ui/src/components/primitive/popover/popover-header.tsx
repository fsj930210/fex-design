import type { ComponentProps, Ref } from 'react'
import { cn } from '@demo/utils'

export interface PopoverHeaderProps extends ComponentProps<'div'> {
  ref?: Ref<HTMLDivElement>
}

export function PopoverHeader({ ref, className, ...props }: PopoverHeaderProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="popover-header"
      className={cn("mb-[var(--popover-title-gap,8px)] grid gap-1", className)}
    />
  )
}

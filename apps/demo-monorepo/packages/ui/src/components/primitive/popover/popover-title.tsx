import type { ComponentProps, Ref } from 'react'
import { cn } from '@demo/utils'

export interface PopoverTitleProps extends ComponentProps<'div'> {
  ref?: Ref<HTMLDivElement>
}

export function PopoverTitle({ ref, className, ...props }: PopoverTitleProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="popover-title"
      className={cn("text-sm font-medium leading-none text-[var(--popover-foreground,var(--elevated-foreground))]", className)}
    />
  )
}

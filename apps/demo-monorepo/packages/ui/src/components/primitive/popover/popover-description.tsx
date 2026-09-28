import type { ComponentProps, Ref } from 'react'
import { cn } from '@demo/utils'

export interface PopoverDescriptionProps extends ComponentProps<'div'> {
  ref?: Ref<HTMLDivElement>
}

export function PopoverDescription({ ref, className, ...props }: PopoverDescriptionProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="popover-description"
      className={cn("text-sm leading-6 text-muted-foreground", className)}
    />
  )
}

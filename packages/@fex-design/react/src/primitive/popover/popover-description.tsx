import type { ComponentProps, Ref } from 'react'
import { cn } from '@fex/utils'
import { popoverDescriptionClassName } from '@fex-design/styles/popover'

export interface PopoverDescriptionProps extends ComponentProps<'div'> {
  ref?: Ref<HTMLDivElement>
}

export function PopoverDescription({ ref, className, ...props }: PopoverDescriptionProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="popover-description"
      className={cn(popoverDescriptionClassName, className)}
    />
  )
}

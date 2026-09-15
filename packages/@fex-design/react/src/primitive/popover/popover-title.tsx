import type { ComponentProps, Ref } from 'react'
import { cn } from '@fex/utils'
import { popoverTitleClassName } from '@fex-design/styles/popover'

export interface PopoverTitleProps extends ComponentProps<'div'> {
  ref?: Ref<HTMLDivElement>
}

export function PopoverTitle({ ref, className, ...props }: PopoverTitleProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="popover-title"
      className={cn(popoverTitleClassName, className)}
    />
  )
}

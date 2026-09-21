import type { ComponentProps, Ref } from 'react'
import { cn } from '@fex-design/utils'
import { popoverHeaderClassName } from '@fex-design/components-styles/popover'

export interface PopoverHeaderProps extends ComponentProps<'div'> {
  ref?: Ref<HTMLDivElement>
}

export function PopoverHeader({ ref, className, ...props }: PopoverHeaderProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="popover-header"
      className={cn(popoverHeaderClassName, className)}
    />
  )
}

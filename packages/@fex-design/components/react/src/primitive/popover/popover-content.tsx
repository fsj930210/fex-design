import type { ComponentProps, Ref } from 'react'
import { usePopoverContent } from './use-popover'

export interface PopoverContentProps extends ComponentProps<'div'> {
  ref?: Ref<HTMLDivElement> | undefined
}

export function PopoverContent({ children, ...props }: PopoverContentProps) {
  const content = usePopoverContent(props)
  if (!content.mounted) {
    return null
  }
  return <div {...content.props}>{children}</div>
}

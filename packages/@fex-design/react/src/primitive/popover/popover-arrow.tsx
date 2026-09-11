import type { ComponentProps, Ref } from 'react'
import { usePopoverArrow } from './use-popover'

export interface PopoverArrowProps extends ComponentProps<'div'> {
  ref?: Ref<HTMLDivElement>
}

export function PopoverArrow(props: PopoverArrowProps) {
  const arrow = usePopoverArrow(props)
  if (!arrow.mounted) {
    return null
  }
  return <div {...arrow.props} />
}

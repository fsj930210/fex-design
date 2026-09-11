import type { ComponentProps, ReactNode, Ref } from 'react'
import { usePopoverTrigger } from './use-popover'

export type PopoverTriggerRenderProps = Omit<ComponentProps<'button'>, 'ref'> & {
  'data-state': 'open' | 'closed'
  ref: Ref<HTMLButtonElement>
}

export interface PopoverTriggerProps extends Omit<ComponentProps<'button'>, 'children'> {
  ref?: Ref<HTMLButtonElement>
  children: (props: PopoverTriggerRenderProps) => ReactNode
}

export type UsePopoverTriggerProps = Omit<PopoverTriggerProps, 'children'>

export function PopoverTrigger({ children, ...props }: PopoverTriggerProps) {
  const trigger = usePopoverTrigger(props)
  return children(trigger.props)
}


import { createContext, use } from 'react'
import type { PopoverController } from '@fex-design/core/popover/create-popover'
import type { RefObject } from 'react'

export interface PopoverContextValue {
  arrowRef: RefObject<HTMLElement | null>
  overlay: PopoverController
  hoverAncestors: readonly PopoverController[]
  triggerRef: RefObject<HTMLElement | null>
}

export const PopoverContext = createContext<PopoverContextValue | null>(null)

export function usePopoverContext(component: string, binding?: PopoverContextValue) {
  const provided = use(PopoverContext)
  const context = binding ?? provided
  if (!context)
    throw new Error(`${component} requires a Popover parent or an explicit usePopover binding`)
  return context
}

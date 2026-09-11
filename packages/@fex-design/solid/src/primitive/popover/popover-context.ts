import { createContext, useContext, type Accessor } from 'solid-js'
import type { PopoverController } from '@fex-design/core/popover/create-popover'
export interface PopoverContextValue {

  arrowElement: { current: HTMLElement | null }
  contentElement: { current: HTMLElement | null }
  overlay: PopoverController
  hoverAncestors: readonly PopoverController[]
  snapshot: Accessor<ReturnType<PopoverController['getSnapshot']>>
  triggerElement: { current: HTMLElement | null }
}
export const PopoverContext = createContext<PopoverContextValue>()
export function usePopover(component: string) {
  const context = useContext(PopoverContext)
  if (!context) throw new Error(`${component} must be used inside Popover`)
  return context
}

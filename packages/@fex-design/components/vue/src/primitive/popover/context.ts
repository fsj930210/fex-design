import type { PopoverController } from '@fex-design/core/popover/create-popover'
import type { PopoverOptions } from '@fex-design/core/popover/types'
import { inject, type InjectionKey, type ShallowRef } from 'vue'

export type PopoverSnapshot = ReturnType<PopoverController['getSnapshot']>

export interface PopoverContextValue {
  arrowElement: ShallowRef<HTMLElement | null>
  overlay: PopoverController
  hoverAncestors: readonly PopoverController[]
  triggerElement: ShallowRef<HTMLElement | null>
  snapshot: ShallowRef<PopoverSnapshot>
}

export const popoverKey: InjectionKey<PopoverContextValue> = Symbol('Popover')

export function usePopoverContext(component: string) {
  const context = inject(popoverKey)
  if (!context) {
    throw new Error(`${component} must be used inside Popover`)
  }
  return context
}

export type PopoverRootProps = PopoverOptions

export function eventInfo(event: Event & Partial<PointerEvent>) {
  return {
    target: event.target,
    currentTarget: event.currentTarget,
    clientX: event.clientX,
    clientY: event.clientY,
    button: event.button,
    pointerType: event.pointerType,
    event,
    preventDefault: event.preventDefault.bind(event),
    stopPropagation: event.stopPropagation.bind(event),
  }
}

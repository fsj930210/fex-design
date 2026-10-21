import { getDatePickerInputPart } from '@fex-design/core/date-picker/view'
import { PickerContainerContext } from './container-context'
import { use, type FocusEvent, type MouseEvent } from 'react'
import { useMemoizedFn } from '@fex-design/react/hooks/use-memoized-fn'
import { useLazyRef } from '@fex-design/react/hooks/use-lazy-ref'
import { focusDatePickerInput } from '@fex-design/core/date-picker/input'
import { PopoverContext } from '../popover/popover-context'
import type { DatePickerInputPart } from '@fex-design/core/date-picker/types'

interface TriggerOwner {
  open: boolean
  disabled: boolean
  openPanel: (part?: DatePickerInputPart) => void
  setActivePart?: (part: DatePickerInputPart) => void
  controller: { getState: () => { open: boolean } }
}

export function usePickerTrigger(owner: TriggerOwner) {
  const reference = useLazyRef<HTMLElement | null>(() => null)
  const containerScope = use(PickerContainerContext)
  const inheritedPopover = use(PopoverContext)
  const popover =
    containerScope && inheritedPopover === containerScope.parentPopover ? null : inheritedPopover
  const ref = useMemoizedFn((element: HTMLElement | null) => {
    reference.current = element
    if (!popover) return
    popover.triggerRef.current = element
    popover.overlay.setReferenceElement(element)
  })
  const focus = useMemoizedFn((event: FocusEvent<HTMLElement>, part?: DatePickerInputPart) => {
    if (event.defaultPrevented || owner.disabled) return
    if (part) owner.setActivePart?.(part)
    if (popover) {
      // Popover suppresses focus restored by closing the popup.
      popover.overlay.trigger.focus({
        target: event.target,
        currentTarget: event.currentTarget,
        event,
        preventDefault: () => event.preventDefault(),
        stopPropagation: () => event.stopPropagation(),
      })
      if (part && owner.controller.getState().open) owner.openPanel(part)
    } else owner.openPanel(part)
  })
  const click = useMemoizedFn((event: MouseEvent<HTMLElement>) => {
    if (event.defaultPrevented || owner.disabled) return
    const part =
      event.target instanceof Element
        ? event.target.closest('[data-range-part]')?.getAttribute('data-range-part')
        : null
    owner.openPanel(getDatePickerInputPart(part))
  })
  const focusInput = useMemoizedFn((part: DatePickerInputPart) =>
    focusDatePickerInput(reference.current, part),
  )
  return { ref, focus, click, focusInput }
}

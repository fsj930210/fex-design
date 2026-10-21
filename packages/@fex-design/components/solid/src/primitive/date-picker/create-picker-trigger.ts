import { getDatePickerInputPart } from '@fex-design/core/date-picker/view'
import { focusDatePickerInput } from '@fex-design/core/date-picker/input'
import { PickerContainerContext } from './container-context'
import { onCleanup, useContext } from 'solid-js'
import { PopoverContext } from '../popover/popover-context'
import type { DatePickerInputPart } from '@fex-design/core/date-picker/types'

interface TriggerOwner {
  open: () => boolean
  disabled: boolean
  openPanel: (part?: DatePickerInputPart) => void
  setActivePart?: (part: DatePickerInputPart) => void
  controller: { getState: () => { open: boolean } }
}

export function createPickerTrigger(owner: TriggerOwner) {
  const inheritedPopover = useContext(PopoverContext)
  const containerScope = useContext(PickerContainerContext)
  const popover =
    containerScope && inheritedPopover === containerScope.parentPopover
      ? undefined
      : inheritedPopover
  let reference: HTMLElement | null = null
  const ref = (element: HTMLElement | null) => {
    reference = element
    if (!popover) return
    popover.triggerElement.current = element
    popover.overlay.setReferenceElement(element)
  }
  onCleanup(() => {
    if (popover?.triggerElement.current === reference) ref(null)
  })
  function focus(event: FocusEvent, part?: DatePickerInputPart) {
    if (event.defaultPrevented || owner.disabled) return
    if (part) owner.setActivePart?.(part)
    if (popover) {
      popover.overlay.trigger.focus({
        target: event.target,
        currentTarget: event.currentTarget,
        event,
        preventDefault: () => event.preventDefault(),
        stopPropagation: () => event.stopPropagation(),
      })
      if (part && owner.controller.getState().open) owner.openPanel(part)
    } else owner.openPanel(part)
  }
  function click(event: MouseEvent) {
    if (event.defaultPrevented || owner.disabled) return
    const part =
      event.target instanceof Element
        ? event.target.closest('[data-range-part]')?.getAttribute('data-range-part')
        : null
    owner.openPanel(getDatePickerInputPart(part))
  }
  return {
    ref,
    focus,
    click,
    focusInput: (part: DatePickerInputPart) => focusDatePickerInput(reference, part),
  }
}

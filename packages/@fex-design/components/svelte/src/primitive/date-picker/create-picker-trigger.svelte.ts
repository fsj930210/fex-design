import { getDatePickerInputPart } from '@fex-design/core/date-picker/view'
import { focusDatePickerInput } from '@fex-design/core/date-picker/input'
import { pickerContainerKey, type PickerContainerScope } from './container-context'
import { getContext, onDestroy } from 'svelte'
import { popoverContextKey, type PopoverContext } from '../popover/popover-context'
import type { DatePickerInputPart } from '@fex-design/core/date-picker/types'

interface TriggerOwner {
  getOpen: () => boolean
  disabled: boolean
  openPanel: (part?: DatePickerInputPart) => void
  setActivePart?: (part: DatePickerInputPart) => void
  controller: { getState: () => { open: boolean } }
}

export function createPickerTrigger(owner: TriggerOwner) {
  const inheritedPopover = getContext<PopoverContext | undefined>(popoverContextKey)
  const containerScope = getContext<PickerContainerScope | undefined>(pickerContainerKey)
  const popover =
    containerScope && inheritedPopover === containerScope.parentPopover
      ? undefined
      : inheritedPopover
  let reference: HTMLElement | null = null
  function action(element: HTMLElement) {
    reference = element
    if (popover) {
      popover.triggerElement.current = element
      popover.overlay.setReferenceElement(element)
    }
    return {
      destroy: () => {
        if (popover?.triggerElement.current === element) {
          popover.triggerElement.current = null
          popover.overlay.setReferenceElement(null)
        }
        reference = null
      },
    }
  }
  onDestroy(() => {
    if (reference && popover?.triggerElement.current === reference)
      popover.overlay.setReferenceElement(null)
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
    action,
    focus,
    click,
    focusInput: (part: DatePickerInputPart) => focusDatePickerInput(reference, part),
    get props() {
      return {
        'aria-haspopup': 'dialog' as const,
        'aria-expanded': owner.getOpen(),
        'data-state': owner.getOpen() ? 'open' : 'closed',
        onclick: click,
        onfocus: focus,
      }
    },
  }
}

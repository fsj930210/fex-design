import { getDatePickerInputPart } from '@fex-design/core/date-picker/view'
import { focusDatePickerInput } from '@fex-design/core/date-picker/input'
import { pickerContainerKey } from './container-context'
import { inject, onScopeDispose, type ComponentPublicInstance, type ComputedRef } from 'vue'
import { eventInfo, popoverKey } from '../popover/context'
import type { DatePickerInputPart } from '@fex-design/core/date-picker/types'

interface TriggerOwner {
  open: ComputedRef<boolean>
  disabled: boolean
  openPanel: (part?: DatePickerInputPart) => void
  setActivePart?: (part: DatePickerInputPart) => void
  controller: { getState: () => { open: boolean } }
}

export function usePickerTrigger(owner: TriggerOwner, attrs: Record<string, unknown>) {
  const inheritedPopover = inject(popoverKey, null)
  const containerScope = inject(pickerContainerKey, null)
  const popover =
    containerScope && inheritedPopover === containerScope.parentPopover ? null : inheritedPopover
  let reference: HTMLElement | null = null
  function ref(value: Element | ComponentPublicInstance | null) {
    reference =
      value instanceof HTMLElement
        ? value
        : value && '$el' in value && value.$el instanceof HTMLElement
          ? value.$el
          : null
    if (!popover) return
    popover.triggerElement.value = reference
    popover.overlay.setReferenceElement(reference)
  }
  onScopeDispose(() => {
    if (popover?.triggerElement.value === reference) ref(null)
  })
  function call(name: string, event: Event) {
    const handlers = attrs[name]
    for (const handler of Array.isArray(handlers) ? handlers : [handlers]) {
      if (typeof handler === 'function') handler(event)
    }
  }
  function focus(event: FocusEvent, part?: DatePickerInputPart) {
    call('onFocus', event)
    if (event.defaultPrevented || owner.disabled) return
    if (part) owner.setActivePart?.(part)
    if (popover) {
      popover.overlay.trigger.focus(eventInfo(event))
      if (part && owner.controller.getState().open) owner.openPanel(part)
    } else owner.openPanel(part)
  }
  const props = {
    get value() {
      return {
        ...attrs,
        'aria-haspopup': 'dialog' as const,
        'aria-expanded': owner.open.value,
        'data-state': owner.open.value ? 'open' : 'closed',
        onFocus: focus,
        onClick(event: MouseEvent) {
          call('onClick', event)
          if (event.defaultPrevented || owner.disabled) return
          const part =
            event.target instanceof Element
              ? event.target.closest('[data-range-part]')?.getAttribute('data-range-part')
              : null
          owner.openPanel(getDatePickerInputPart(part))
        },
      }
    },
  }
  return {
    ref,
    props,
    focus,
    focusInput: (part: DatePickerInputPart) => focusDatePickerInput(reference, part),
  }
}

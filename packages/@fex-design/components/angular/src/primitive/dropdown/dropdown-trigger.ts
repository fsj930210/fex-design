import { Directive, HostListener, inject, input } from '@angular/core'
import { PopoverTrigger } from '../popover'
import { DropdownRoot } from './dropdown-root'

@Directive({
  selector:
    'button[dropdownTrigger], input[dropdownTrigger], div[dropdownTrigger], span[dropdownTrigger]',
  standalone: true,
  host: {
    'aria-haspopup': 'menu',
    'data-dropdown-trigger': '',
    '[attr.id]': 'dropdown.triggerId()',
    '[attr.aria-disabled]': "dropdown.disabled() ? 'true' : ariaDisabled()",
  },
})
export class DropdownTrigger extends PopoverTrigger {
  protected readonly dropdown = inject(DropdownRoot)
  readonly ariaDisabled = input<string | boolean | null | undefined>(undefined, {
    alias: 'aria-disabled',
  })
  @HostListener('keydown', ['$event'])
  keydown(event: Event) {
    if (event instanceof KeyboardEvent && !event.defaultPrevented)
      this.dropdown.binding.controller.triggerKeyDown(event)
  }
}

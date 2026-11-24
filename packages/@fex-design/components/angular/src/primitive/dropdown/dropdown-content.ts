import { ChangeDetectionStrategy, Component, effect, inject, untracked } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { menuContentClassName, menuRootClassName } from '@fex-design/components-styles/menu'
import {
  popoverContentClassName,
  popoverMenuContentClassName,
} from '@fex-design/components-styles/popover'
import { cn } from '@fex-design/utils'
import { PopoverContent } from '../popover'
import { DropdownRoot } from './dropdown-root'

@Component({
  selector: 'div[dropdownContent]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'menu' },
  template: '<ng-content />',
})
export class DropdownContent extends PopoverContent {
  protected readonly dropdown = inject(DropdownRoot)
  private stop?: () => void
  private generatedLabel: string | undefined
  protected override readonly hostClassName = createHostClassName(
    () =>
      cn(
        popoverContentClassName(),
        popoverMenuContentClassName,
        menuRootClassName({ size: this.dropdown.binding.menuSnapshot().size, color: 'none' }),
        menuContentClassName({ layout: 'vertical', background: 'none' }),
      ),
    () => this.className() || undefined,
  )
  constructor() {
    super()
    // Keep the generated relationship in sync without replacing a caller-provided name.
    effect(() => {
      const id = this.dropdown.triggerId()
      untracked(() => {
        if (
          this.generatedLabel !== undefined &&
          this.element.getAttribute('aria-labelledby') === this.generatedLabel
        ) {
          this.element.setAttribute('aria-labelledby', id)
          this.generatedLabel = id
        }
      })
    })
  }
  override ngAfterViewInit() {
    super.ngAfterViewInit()
    if (!this.element.hasAttribute('aria-label') && !this.element.hasAttribute('aria-labelledby')) {
      this.generatedLabel = this.dropdown.triggerId()
      this.element.setAttribute('aria-labelledby', this.generatedLabel)
    }
    this.stop = this.dropdown.binding.controller.bindContent(this.element)
  }
  override ngOnDestroy() {
    this.stop?.()
    super.ngOnDestroy()
  }
}

import { booleanAttribute, Directive, inject, input, output, type OnInit } from '@angular/core'
import type { DropdownRootOptions } from '@fex-design/core/dropdown/types'
import type { MenuActivateInfo, MenuChangeInfo } from '@fex-design/core/menu/types'
import type { PopoverChangeInfo } from '@fex-design/core/popover/types'
import { Popover } from '../popover'
import { MenuRoot } from '../menu'
import { MENU_LEVEL } from '../menu/context'
import { createDropdown } from './create-dropdown'

let nextTriggerId = 0

@Directive({
  selector: 'div[dropdownRoot], span[dropdownRoot], ng-container[dropdownRoot]',
  standalone: true,
  exportAs: 'dropdown',
  providers: [
    { provide: Popover, useFactory: () => inject(DropdownRoot).popoverAdapter },
    { provide: MenuRoot, useFactory: () => inject(DropdownRoot).menuAdapter },
    { provide: MENU_LEVEL, useValue: undefined },
  ],
})
export class DropdownRoot implements OnInit {
  private readonly parent = inject(Popover, { optional: true, skipSelf: true })
  readonly popoverProps = input<DropdownRootOptions['popoverProps']>()
  readonly menuProps = input<DropdownRootOptions['menuProps']>()
  readonly open = input<boolean>()
  readonly defaultOpen = input<boolean>()
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly closeOnSelect = input(true)
  readonly triggerId = () => `dropdown-trigger-${this.generatedTriggerId}`
  private readonly generatedTriggerId = ++nextTriggerId
  readonly openChange = output<boolean>()
  readonly openChangeInfo = output<PopoverChangeInfo>()
  readonly activate = output<MenuActivateInfo>()
  readonly activated = output<MenuChangeInfo>()
  readonly valueChange = output<{ value: string[]; info: MenuChangeInfo }>()
  readonly menuOpenChange = output<{ value: string[]; info: MenuChangeInfo }>()
  readonly binding = createDropdown(
    () => ({
      popoverProps: {
        ...this.popoverProps(),
        open: this.open(),
        defaultOpen: this.defaultOpen(),
        disabled: this.disabled(),
        onOpenChange: (open, info) => {
          this.openChange.emit(open)
          this.openChangeInfo.emit(info)
        },
      },
      menuProps: {
        ...this.menuProps(),
        disabled: this.disabled(),
        onActivate: (info) => this.activate.emit(info),
        onActivated: (info) => {
          this.menuProps()?.onActivated?.(info)
          this.activated.emit(info)
        },
        onValueChange: (value, info) => {
          this.menuProps()?.onValueChange?.(value, info)
          this.valueChange.emit({ value, info })
        },
        onOpenChange: (value, info) => {
          this.menuProps()?.onOpenChange?.(value, info)
          this.menuOpenChange.emit({ value, info })
        },
      },
      closeOnSelect: this.closeOnSelect(),
    }),
    () => this.parent?.overlay,
  )

  get menuAdapter() {
    const root = this
    return {
      binding: {
        get dom() {
          return root.binding.controller.dom
        },
        get controller() {
          return root.binding.controller.menu
        },
        snapshot: () => root.binding.menuSnapshot(),
      },
    }
  }
  get popoverAdapter() {
    const root = this
    return {
      get overlay() {
        return root.binding.controller.overlay
      },
      snapshot: () => root.binding.snapshot(),
      syncOptions: () => root.binding.syncOptions(),
      referenceElement: null as HTMLElement | null,
      contentElement: null as HTMLElement | null,
      arrowElement: null as HTMLElement | null,
    }
  }
  ngOnInit() {
    this.binding.controller
  }
}

import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
  type DropdownRootOptions,
} from '@fex-design/angular/primitive/dropdown'
import { Button } from '@fex-design/angular/primitive/button'
import {
  MenuItems,
  type MenuItemData,
  type MenuActivateInfo,
  type MenuItemTemplateContext,
} from '@fex-design/angular/ui/menu'
import { TemplateRef } from '@angular/core'
@Component({
  selector: 'div[dropdown]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownRoot, DropdownTrigger, DropdownPortal, DropdownContent, MenuItems, Button],
  template: `<div
    dropdownRoot
    [open]="open()"
    [defaultOpen]="defaultOpen()"
    [disabled]="disabled()"
    [closeOnSelect]="closeOnSelect()"
    [popoverProps]="popoverProps()"
    [menuProps]="menuProps()"
    (openChange)="openChange.emit($event)"
    (activate)="activate.emit($event)"
  >
    <button button dropdownTrigger><ng-content /></button
    ><ng-template dropdownPortal
      ><div dropdownContent>
        <div menuItems [items]="items()" [itemTemplate]="itemTemplate()"></div></div
    ></ng-template>
  </div>`,
})
export class Dropdown {
  readonly items = input.required<readonly MenuItemData[]>()
  readonly open = input<boolean>()
  readonly defaultOpen = input<boolean>()
  readonly disabled = input(false)
  readonly closeOnSelect = input(true)
  readonly popoverProps = input<DropdownRootOptions['popoverProps']>()
  readonly menuProps = input<DropdownRootOptions['menuProps']>()
  readonly itemTemplate = input<TemplateRef<MenuItemTemplateContext>>()
  readonly openChange = output<boolean>()
  readonly activate = output<MenuActivateInfo>()
}

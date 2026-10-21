import { Component, ChangeDetectionStrategy } from '@angular/core'
import {
  Menu,
  MenuItem,
  SubMenu,
  SubMenuTrigger,
  SubMenuContent,
} from '@fex-design/angular/ui/menu'
import type { MenuPopoverProps } from '@fex-design/angular/ui/menu'
@Component({
  selector: 'menu-popover-props-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Menu, MenuItem, SubMenu, SubMenuTrigger, SubMenuContent],
  templateUrl: './popover-props.html',
})
export class MenuPopoverPropsExample {
  readonly popoverProps: MenuPopoverProps = {
    align: 'end',
    sideOffset: 12,
    collisionPadding: 16,
    lazyMount: true,
    destroyOnHidden: true,
    zIndex: 80,
    getPopupContainer: (reference) => reference?.ownerDocument.body ?? document.body,
  }
}

import { NgTemplateOutlet } from '@angular/common'
import { Component, ChangeDetectionStrategy, input } from '@angular/core'
import { MenuGroup as PrimitiveGroup, MenuGroupLabel } from '@fex-design/angular/primitive/menu'
import { asMenuTemplate, menuValueText, type MenuContentValue } from './types'
@Component({
  selector: 'div[menuGroup]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, MenuGroupLabel],
  templateUrl: './menu-group.html',
})
export class MenuGroup extends PrimitiveGroup {
  readonly label = input<MenuContentValue>()
  protected readonly asTemplate = asMenuTemplate
  protected readonly text = menuValueText
}

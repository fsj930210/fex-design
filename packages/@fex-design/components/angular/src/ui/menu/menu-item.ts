import { NgTemplateOutlet } from '@angular/common'
import { Component, ChangeDetectionStrategy, computed, inject, input } from '@angular/core'
import { MenuItem as PrimitiveItem, MenuRoot } from '@fex-design/angular/primitive/menu'
import {
  menuItemIconClassName,
  menuItemLabelClassName,
  menuItemSuffixClassName,
} from '@fex-design/components-styles/menu'
import { asMenuTemplate, menuValueText, type MenuContentValue } from './types'
@Component({
  selector: 'button[menuItem],a[menuItem]',
  standalone: true,
  exportAs: 'menuItem',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  templateUrl: './menu-item.html',
})
export class MenuItem extends PrimitiveItem {
  readonly icon = input<MenuContentValue>()
  readonly suffix = input<MenuContentValue>()
  private readonly owner = inject(MenuRoot)
  readonly selected = computed(() => this.owner.binding.snapshot().value.includes(this.value()))
  protected readonly asTemplate = asMenuTemplate
  protected readonly text = menuValueText
  protected readonly iconClass = menuItemIconClassName
  protected readonly contentClass = menuItemLabelClassName
  protected readonly suffixClass = menuItemSuffixClassName
}

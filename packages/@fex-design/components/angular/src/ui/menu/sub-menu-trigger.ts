import { NgTemplateOutlet } from '@angular/common'
import { Component, ChangeDetectionStrategy, computed, inject, input } from '@angular/core'
import {
  SubMenuTrigger as PrimitiveTrigger,
  SubMenu,
  MenuRoot,
} from '@fex-design/angular/primitive/menu'
import { ChevronRightIcon } from '@fex-design/angular/icons/chevron'
import {
  menuItemIconClassName,
  menuItemLabelClassName,
  menuItemSuffixClassName,
  menuExpandIconClassName,
} from '@fex-design/components-styles/menu'
import { asMenuTemplate, menuValueText, type MenuContentValue } from './types'
@Component({
  selector: 'button[subMenuTrigger]',
  standalone: true,
  exportAs: 'subMenuTrigger',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, ChevronRightIcon],
  templateUrl: './sub-menu-trigger.html',
})
export class SubMenuTrigger extends PrimitiveTrigger {
  readonly icon = input<MenuContentValue>()
  readonly suffix = input<MenuContentValue>()
  readonly indicator = input<MenuContentValue>()
  private readonly ownerRoot = inject(MenuRoot)
  private readonly ownerBranch = inject(SubMenu)
  readonly open = computed(
    () =>
      !this.disabled() &&
      !this.ownerRoot.binding.snapshot().disabled &&
      this.ownerRoot.binding.snapshot().openValues.includes(this.ownerBranch.value()),
  )
  protected readonly asTemplate = asMenuTemplate
  protected readonly text = menuValueText
  protected readonly iconClass = menuItemIconClassName
  protected readonly contentClass = menuItemLabelClassName
  protected readonly suffixClass = menuItemSuffixClassName
  protected readonly expandClass = menuExpandIconClassName
}

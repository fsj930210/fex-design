import { ChangeDetectionStrategy, Component, HostListener, computed, inject } from '@angular/core'
import {
  CheckboxRoot,
  CheckboxControl,
  CheckboxIndicator,
} from '@fex-design/angular/primitive/checkbox'
import type { CheckFeatureApi } from '@fex-design/core/tree/features/check'
import type { TreeNodeData } from '@fex-design/core/tree/types'
import { TreeItem } from './tree-item'

@Component({
  selector: 'div[treeCheckbox]',
  standalone: true,
  imports: [CheckboxRoot, CheckboxControl, CheckboxIndicator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'shrink-0',
    'data-slot': 'tree-checkbox',
    '[hidden]': '!visible()',
  },
  template: `
    @if (visible()) {
      <div checkboxRoot [disabled]="disabled()">
        <input
          type="checkbox"
          checkboxControl
          [attr.tabindex]="item.root.tree().hasFeature('keyboard') ? -1 : null"
          [checked]="item.checked()"
          [indeterminate]="item.checkedState() === 'indeterminate'"
          [attr.aria-checked]="item.checkedState() === 'indeterminate' ? 'mixed' : item.checked()"
          (change)="change($event)"
        />
        <span checkboxIndicator></span>
      </div>
    }
  `,
})
export class TreeCheckbox<T extends TreeNodeData = TreeNodeData> {
  readonly item = inject<TreeItem<T>>(TreeItem)
  readonly visible = computed(() =>
    Boolean(this.item.item()?.checkable && this.item.root.tree().hasFeature('check')),
  )
  readonly disabled = computed(() =>
    Boolean(this.item.item()?.disabled || this.item.item()?.disableCheckbox),
  )
  @HostListener('click', ['$event']) stopClick(event: MouseEvent) {
    event.stopPropagation()
  }
  change(event: Event) {
    if (event.defaultPrevented || this.disabled()) return
    this.item.root
      .tree()
      .getFeature<CheckFeatureApi>('check')
      ?.check(this.item.key(), (event.target as HTMLInputElement).checked)
  }
}

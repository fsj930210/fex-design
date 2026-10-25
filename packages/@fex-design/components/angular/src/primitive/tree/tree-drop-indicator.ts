import { Directive, computed, inject, input } from '@angular/core'
import type { TreeDropIntent } from '@fex-design/core/tree/features/dnd'
import type { TreeNode, TreeNodeData } from '@fex-design/core/tree/types'
import { treeDropIndicatorClassName } from '@fex-design/components-styles/tree'
import { TreeRoot } from './tree-root'
@Directive({
  selector: 'span[treeDropIndicator]',
  standalone: true,
  host: {
    'data-slot': 'tree-drop-indicator',
    '[class]': 'className',
    '[attr.data-position]': 'intent()?.position || null',
    '[class.hidden]': '!visible()',
  },
})
export class TreeDropIndicatorDirective<T extends TreeNodeData = TreeNodeData> {
  readonly root = inject<TreeRoot<T>>(TreeRoot)
  readonly item = input<TreeNode<T> | undefined>()
  readonly intent = input<TreeDropIntent | null>()
  readonly visible = computed(
    () =>
      this.intent()?.valid === true &&
      (!this.item() || this.intent()?.targetKey === this.item()?.key),
  )
  protected readonly className = treeDropIndicatorClassName
}

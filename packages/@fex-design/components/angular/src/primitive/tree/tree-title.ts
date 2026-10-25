import { Directive } from '@angular/core'
import { treeTitleClassName } from '@fex-design/components-styles/tree'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
@Directive({
  selector: '[treeTitle]',
  standalone: true,
  host: { '[class]': 'hostClassName()', 'data-slot': 'tree-title' },
})
export class TreeTitle {
  protected readonly hostClassName = createHostClassName(treeTitleClassName)
}

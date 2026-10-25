import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Tree } from '@fex-design/angular/ui/tree'
import { treeDemoData } from './_data/tree-demo'
@Component({
  selector: 'tree-direction-example',
  standalone: true,
  imports: [Tree],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './direction.html',
})
export class TreeDirectionExample {
  readonly directions = ['ltr', 'rtl'] as const
  readonly treeProps = { treeData: treeDemoData, defaultExpandedKeys: ['root-1', 'root-1-group-1'] }
}

import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Tree } from '@fex-design/angular/ui/tree'
import { treeDemoData } from './_data/tree-demo'
@Component({
  selector: 'tree-custom-render-example',
  standalone: true,
  imports: [Tree],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-render.html',
})
export class TreeCustomRenderExample {
  readonly treeProps = { treeData: treeDemoData, defaultExpandedKeys: ['root-1', 'root-1-group-1'] }
  toggle(tree: { getFeature<T>(id: string): T | undefined }, key: string | number) {
    tree.getFeature<{ toggle(key: string | number): void }>('expansion')?.toggle(key)
  }
}

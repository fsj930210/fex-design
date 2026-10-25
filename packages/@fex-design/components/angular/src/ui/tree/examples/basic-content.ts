import { ChangeDetectionStrategy, Component } from '@angular/core'

import { treeDemoData } from './_data/tree-demo'
import { Tree } from '@fex-design/angular/ui/tree'
@Component({
  selector: 'tree-basic-content-example',
  standalone: true,
  imports: [Tree],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:
    '<div tree [treeData]="treeProps.treeData" [defaultExpandedKeys]="treeProps.defaultExpandedKeys" class="w-full max-w-xl rounded-md bg-background p-2"></div>',
})
export class BasicContent {
  readonly treeProps = {
    treeData: treeDemoData,
    defaultExpandedKeys: ['root-1', 'root-1-group-1'],
  }
}

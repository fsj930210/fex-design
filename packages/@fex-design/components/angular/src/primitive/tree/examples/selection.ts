import { treeSelectionDemoData } from './_data/tree-demo'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { StateDemo } from './state-demo'
@Component({
  selector: 'tree-selection-example',
  standalone: true,
  imports: [StateDemo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './selection.html',
})
export class PrimitiveTreeSelectionExample {
  readonly data = treeSelectionDemoData
}

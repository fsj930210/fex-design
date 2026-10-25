import { treeCheckDemoData } from './_data/tree-demo'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { StateDemo } from './state-demo'
@Component({
  selector: 'tree-checkbox-example',
  standalone: true,
  imports: [StateDemo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkbox.html',
})
export class TreeCheckboxExample {
  readonly data = treeCheckDemoData
}

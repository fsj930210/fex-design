import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Separator } from '../separator'
@Component({
  selector: 'separator-list-example',
  standalone: true,
  imports: [Separator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list.html',
})
export class List {
  protected readonly items = [
    { label: 'Workspace', value: 'Fex Design' },
    { label: 'Plan', value: 'Team' },
    { label: 'Region', value: 'Asia Pacific' },
  ]
}

import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Separator } from '../separator'
import { Card } from '@fex-design/angular/ui/card'
@Component({
  selector: 'fex-separator-list-example',
  standalone: true,
  imports: [Separator, Card],
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

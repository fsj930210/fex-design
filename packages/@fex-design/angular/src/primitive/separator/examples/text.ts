import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Separator } from '../separator'
import { Card } from '@fex-design/angular/ui/card'
@Component({
  selector: 'fex-separator-text-example',
  standalone: true,
  imports: [Separator, Card],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './text.html',
})
export class WithText {
  protected readonly placements = ['Start', 'Center', 'End']
}

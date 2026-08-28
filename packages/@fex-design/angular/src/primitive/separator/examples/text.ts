import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Separator } from '../separator'
@Component({
  selector: 'fex-separator-text-example',
  standalone: true,
  imports: [Separator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './text.html',
})
export class WithText {
  protected readonly placements = ['Start', 'Center', 'End']
}

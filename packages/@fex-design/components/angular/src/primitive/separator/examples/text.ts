import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Separator } from '@fex-design/angular/primitive/separator'
@Component({
  selector: 'separator-text-example',
  standalone: true,
  imports: [Separator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './text.html',
})
export class WithText {
  protected readonly placements = ['Start', 'Center', 'End']
}

import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Scrollbar } from '@fex-design/angular/ui/scrollbar'

@Component({
  selector: 'scrollbar-horizontal-example',
  standalone: true,
  imports: [Scrollbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './horizontal.html',
})
export class ScrollbarHorizontalExample {}

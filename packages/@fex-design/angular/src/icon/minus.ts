import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'minus-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  templateUrl: './minus.html',
})
export class MinusIcon {}

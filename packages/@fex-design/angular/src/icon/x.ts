import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'x-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  templateUrl: './x.html',
})
export class XIcon {}

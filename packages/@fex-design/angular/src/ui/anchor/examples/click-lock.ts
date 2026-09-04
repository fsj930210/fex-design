import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Anchor } from '../anchor'

@Component({
  selector: 'anchor-ui-click-lock-example',
  standalone: true,
  imports: [Anchor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './click-lock.html',
})
export class AnchorUiClickLockExample {
  protected readonly items = [
    { key: 'first', title: '第一节', target: '#angular-ui-click-lock-first' },
    { key: 'second', title: '点击第二节', target: '#angular-ui-click-lock-second' },
    { key: 'third', title: '第三节', target: '#angular-ui-click-lock-third' },
  ]
}

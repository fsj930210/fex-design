import { ChangeDetectionStrategy, Component } from '@angular/core'
import { createPopover } from '@fex-design/angular/primitive/popover'

@Component({
  selector: 'popover-custom-logic-example',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-logic.html',
})
export class CustomLogicExample {
  protected readonly popover = createPopover(() => ({}))
}

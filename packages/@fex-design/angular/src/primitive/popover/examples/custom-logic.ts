import { ChangeDetectionStrategy, Component } from '@angular/core'
import { createPopover } from '@fex-design/angular/primitive/popover'
import { Button } from '@fex-design/angular/ui/button'

@Component({
  selector: 'popover-custom-logic-example',
  standalone: true,
  imports: [Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-logic.html',
})
export class CustomLogicExample {
  protected readonly popover = createPopover(() => ({}))
}

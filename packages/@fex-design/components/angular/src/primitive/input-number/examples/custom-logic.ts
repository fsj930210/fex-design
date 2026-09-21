import { ChangeDetectionStrategy, Component, computed } from '@angular/core'
import { MinusIcon } from '@fex-design/angular/icons/minus'
import { PlusIcon } from '@fex-design/angular/icons/plus'
import { useInputNumber } from '@fex-design/angular/primitive/input-number'
import { Button } from '@fex-design/angular/primitive/button'

@Component({
  selector: 'input-number-custom-logic-example',
  standalone: true,
  imports: [Button, MinusIcon, PlusIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-logic.html',
})
export class CustomLogicExample {
  protected readonly number = useInputNumber(computed(() => ({ defaultValue: 5, min: 0, max: 10 })))
}

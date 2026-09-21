import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Button } from '@fex-design/angular/ui/button'
import { Checkbox } from '@fex-design/angular/ui/checkbox'
@Component({
  selector: 'checkbox-ui-controlled-example',
  standalone: true,
  imports: [Button, Checkbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './controlled.html',
})
export class CheckboxUiControlledExample {
  protected readonly checked = signal(true)
  protected change(event: Event) {
    this.checked.set((event.target as HTMLInputElement).checked)
  }
}

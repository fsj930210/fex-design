import { Button } from '@fex-design/angular/primitive/button'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'button-primitive-demo',
  imports: [Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './primitive-demo.component.html',
})
export class ButtonPrimitiveDemo {}

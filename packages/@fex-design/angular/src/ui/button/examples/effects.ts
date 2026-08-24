import { ChangeDetectionStrategy, Component } from '@angular/core'
import { PlusIcon } from '@fex-design/angular/icon/plus'
import { Button } from '@fex-design/angular/ui/button'

@Component({
  selector: 'button-effects-example',
  standalone: true,
  imports: [Button, PlusIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './effects.html',
})
export class EffectsExample {}

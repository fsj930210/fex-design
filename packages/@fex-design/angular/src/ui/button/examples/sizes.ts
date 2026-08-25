import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Button } from '@fex-design/angular/ui/button'
import { PlusIcon } from '@fex-design/angular/icon/plus'

@Component({
  selector: 'button-sizes-example',
  standalone: true,
  imports: [Button, PlusIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sizes.html',
})
export class SizesExample {}

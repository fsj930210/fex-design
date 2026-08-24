import { ChangeDetectionStrategy, Component } from '@angular/core'
import { PlusIcon } from '@fex-design/angular/icon/plus'
import { Button } from '@fex-design/angular/ui/button'

@Component({
  selector: 'button-icons-example',
  standalone: true,
  imports: [Button, PlusIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icons.html',
})
export class IconsExample {}

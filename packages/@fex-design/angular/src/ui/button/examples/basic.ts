import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Button } from '@fex-design/angular/ui/button'

@Component({
  selector: 'button-basic-example',
  standalone: true,
  imports: [Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class BasicExample {}

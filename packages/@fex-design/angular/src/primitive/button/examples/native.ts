import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Button } from '@fex-design/angular/primitive/button'

@Component({
  selector: 'button-native-example',
  standalone: true,
  imports: [Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './native.html',
})
export class NativeExample {}

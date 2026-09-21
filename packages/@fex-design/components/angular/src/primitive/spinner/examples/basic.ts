import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Spinner } from '@fex-design/angular/primitive/spinner'

@Component({
  selector: 'spinner-primitive-basic-example',
  standalone: true,
  imports: [Spinner],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class BasicExample {}

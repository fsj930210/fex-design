import { ChangeDetectionStrategy, Component } from '@angular/core'
import { InputPassword } from '@fex-design/angular/ui/input'
@Component({
  selector: 'input-password-example',
  standalone: true,
  imports: [InputPassword],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './password.html',
})
export class PasswordExample {}

import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  Input,
  InputPassword,
  InputSearch,
  type InputClassNames,
} from '@fex-design/angular/ui/input'
@Component({
  selector: 'input-semantic-styles-example',
  standalone: true,
  imports: [Input, InputPassword, InputSearch],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class SemanticStylesExample {
  protected readonly classNames: InputClassNames = {
    root: 'border-violet-300 hover:border-violet-400 focus-within:border-violet-600 focus-within:ring-violet-600/20',
    control: 'font-medium',
    prefix: 'text-violet-500',
    clear: 'hover:text-violet-700',
  }
  protected readonly action: InputClassNames = { action: 'text-violet-500' }
}

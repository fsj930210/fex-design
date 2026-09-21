import { ChangeDetectionStrategy, Component } from '@angular/core'
import { InputNumber } from '@fex-design/angular/ui/input-number'
@Component({
  selector: 'input-number-ui-semantic-styles-example',
  standalone: true,
  imports: [InputNumber],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class SemanticStylesExample {
  protected readonly classNames = {
    root: 'w-full border-violet-500 bg-violet-50 shadow-sm',
    prefix: 'bg-violet-200 px-2 font-bold text-violet-900',
    control: 'font-bold text-violet-950',
    clear: 'text-rose-600 hover:bg-rose-100',
    suffix: 'bg-amber-200 px-2 font-bold text-amber-950',
    actions: 'bg-cyan-100',
    increment: 'text-emerald-700 hover:bg-emerald-200',
    decrement: 'text-rose-700 hover:bg-rose-200',
  }
}

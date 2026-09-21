import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  InputNumberActions,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
} from '@fex-design/angular/primitive/input-number'
@Component({
  selector: 'input-number-primitive-formatter-example',
  standalone: true,
  imports: [
    InputNumberRoot,
    InputNumberControl,
    InputNumberActions,
    InputNumberIncrement,
    InputNumberDecrement,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './formatter.html',
})
export class FormatterExample {
  protected readonly formatter = (value: number | undefined) =>
    value === undefined ? '' : `￥${value.toLocaleString('zh-CN')}`
  protected readonly parser = (text: string) => {
    const normalized = text.replace(/[￥,\s]/g, '')
    if (normalized === '') return undefined
    const value = Number(normalized)
    return Number.isFinite(value) ? value : undefined
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core'
import { InputNumber } from '@fex-design/angular/ui/input-number'
@Component({
  selector: 'input-number-ui-formatter-example',
  standalone: true,
  imports: [InputNumber],
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

import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Button } from '@fex-design/angular/ui/button'

@Component({
  selector: 'button-variants-example',
  standalone: true,
  imports: [Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './variants.html',
})
export class VariantsExample {
  protected readonly variants = ['solid', 'outlined', 'dashed', 'filled', 'text', 'link'] as const
  protected readonly colors = [
    { value: 'primary', label: '品牌色' },
    { value: 'danger', label: '危险' },
    { value: 'warning', label: '警告' },
    { value: 'success', label: '成功' },
    { value: 'info', label: '信息' },
  ] as const
  protected readonly customColor =
    '--button-color:#7c3aed;--button-color-foreground:#fff;--button-color-hover:#6d28d9;--button-color-soft:#f3e8ff;--button-color-soft-hover:#ede9fe;--button-color-border:#a78bfa'
}

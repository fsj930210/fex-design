import type {
  SelectFilterOption,
  SelectOption,
  SelectVirtualOptions,
} from '@fex-design/core/select/types'
import type { SelectionValue } from '@fex-design/core/selection/types'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import {
  SelectContent,
  SelectRoot,
  SelectTrigger,
} from '@fex-design/angular/primitive/select'
import { Card } from '@fex-design/angular/ui/card'
export
@Component({
  selector: 'select-simple-demo',
  standalone: true,
  imports: [Card, SelectRoot, SelectTrigger, SelectContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './simple-demo.component.html',
})
class SimpleSelectDemo {
  @Input({ required: true }) title = ''
  @Input({ required: true }) description = ''
  @Input() items: readonly SelectOption[] = []
  @Input() multiple = false
  @Input() clearable = false
  @Input() showSearch = false
  @Input() defaultValue?: SelectionValue | SelectionValue[]
  @Input() filterOption?: SelectFilterOption
  @Input() maxCount?: number
  @Input() maxTagCount?: number
  @Input() virtual?: SelectVirtualOptions
  @Input() placeholder = '请选择'
}

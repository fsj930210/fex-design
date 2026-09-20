import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Select } from '@fex-design/angular/ui/select'
@Component({ selector: 'select-virtual-ui-example', standalone: true, imports: [Select], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './virtual.html' })
export class SelectVirtualExample { readonly items = Array.from({ length: 1000 }, (_, index) => ({ value: index, label: `项目 ${index + 1}` })); readonly virtual = { itemHeight: 32, overscan: 4 } }

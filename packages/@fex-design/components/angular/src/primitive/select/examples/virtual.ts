import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SelectContent, SelectRoot, SelectTrigger } from '@fex-design/angular/primitive/select'
@Component({ selector: 'select-virtual-primitive-example', standalone: true, imports: [SelectRoot, SelectTrigger, SelectContent], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './virtual.html' })
export class SelectVirtualExample { readonly options = Array.from({ length: 1000 }, (_, index) => ({ value: index, label: `项目 ${index + 1}` })); readonly virtual = { itemHeight: 32, overscan: 4 } }

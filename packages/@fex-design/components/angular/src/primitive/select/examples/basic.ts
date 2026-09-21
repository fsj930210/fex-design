import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SelectContent, SelectRoot, SelectTrigger } from '@fex-design/angular/primitive/select'
@Component({ selector: 'select-basic-primitive-example', standalone: true, imports: [SelectRoot, SelectTrigger, SelectContent], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './basic.html' })
export class SelectBasicExample { readonly items = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }] }

import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Select } from '@fex-design/angular/ui/select'
@Component({ selector: 'select-basic-ui-example', standalone: true, imports: [Select], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './basic.html' })
export class SelectBasicExample { readonly items = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }] }

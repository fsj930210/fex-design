import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Select } from '@fex-design/angular/ui/select'
@Component({ selector: 'select-clear-ui-example', imports: [Select], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './clear.html' })
export class SelectClearExample { readonly options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }] }

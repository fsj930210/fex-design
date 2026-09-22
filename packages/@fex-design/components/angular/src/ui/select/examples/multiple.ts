import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Select } from '@fex-design/angular/ui/select'
@Component({ selector: 'select-multiple-ui-example', imports: [Select], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './multiple.html' })
export class SelectMultipleExample { readonly options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }, { value: 'solid', label: 'Solid' }] }

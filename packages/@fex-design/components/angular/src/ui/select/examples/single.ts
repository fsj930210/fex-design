import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Select } from '@fex-design/angular/ui/select'
@Component({ selector: 'select-single-ui-example', imports: [Select], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './single.html' })
export class SelectSingleExample { readonly value = signal('react'); readonly options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }, { value: 'solid', label: 'Solid' }] }

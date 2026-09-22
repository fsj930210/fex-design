import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Select } from '@fex-design/angular/ui/select'
@Component({ selector: 'select-affix-ui-example', imports: [Select], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './prefix-suffix-demo.html' })
export class SelectAffixExample { readonly options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }] }

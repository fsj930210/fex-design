import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Select } from '@fex-design/angular/ui/select'
@Component({ selector: 'select-custom-search-ui-example', imports: [Select], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './custom-search.html' })
export class SelectCustomSearchExample { readonly options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }, { value: 'solid', label: 'Solid' }]; readonly filter = (keyword: string, option: { label: string }) => { let from = 0; return [...keyword.toLowerCase()].every(character => { const index = option.label.toLowerCase().indexOf(character, from); from = index + 1; return index >= 0 }) } }

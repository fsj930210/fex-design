import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Select } from '@fex-design/angular/ui/select'
@Component({ selector: 'select-local-search-ui-example', imports: [Select], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './local-search.html' })
export class SelectLocalSearchExample { readonly options = [{ value: 'beijing', label: '北京' }, { value: 'shanghai', label: '上海' }, { value: 'shenzhen', label: '深圳' }]; readonly filter = (keyword: string, option: { label: string }) => option.label.includes(keyword) }

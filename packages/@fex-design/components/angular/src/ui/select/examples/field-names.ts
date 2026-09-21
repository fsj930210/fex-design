import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Select } from '@fex-design/angular/ui/select'
@Component({ selector: 'select-field-names-ui-example', standalone: true, imports: [Select], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './field-names.html' })
export class SelectFieldNamesExample { readonly items = [{ profileId: 1, displayName: '张三' }, { profileId: 2, displayName: '李四', disabled: true }]; readonly fields = { value: 'profileId', label: 'displayName' } as const }

import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CheckboxGroup } from '@fex-design/angular/ui/checkbox'

@Component({ selector: 'checkbox-ui-group-example', standalone: true, imports: [CheckboxGroup], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './group.html' })
export class CheckboxUiGroupExample {
  protected readonly options = [{ label: '邮件', value: 'email' }, { label: '短信', value: 'sms' }, { label: '站内通知', value: 'push' }]
}

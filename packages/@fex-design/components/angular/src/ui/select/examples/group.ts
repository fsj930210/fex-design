import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Select } from '@fex-design/angular/ui/select'
@Component({ selector: 'select-group-ui-example', imports: [Select], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './group.html' })
export class SelectGroupExample { readonly options = [{ value: 'frontend', label: '前端框架', options: [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }] }, { value: 'backend', label: '后端框架', options: [{ value: 'nest', label: 'NestJS' }] }] }

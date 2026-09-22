import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SelectContent, SelectRoot, SelectTrigger } from '@fex-design/angular/primitive/select'
@Component({ selector: 'select-controlled-example', imports: [SelectRoot, SelectTrigger, SelectContent], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './controlled.html' })
export class SelectControlledExample { readonly options=[{value:'react',label:'React'},{value:'vue',label:'Vue'}]; readonly value=signal('react'); readonly open=signal(false) }

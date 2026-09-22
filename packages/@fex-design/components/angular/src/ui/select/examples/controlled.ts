import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Select } from '@fex-design/angular/ui/select'
@Component({ selector: 'select-controlled-ui-example', imports: [Select], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './controlled.html' })
export class SelectControlledExample { readonly options=[{value:'react',label:'React'},{value:'vue',label:'Vue'}]; readonly value=signal('react'); readonly open=signal(false); readonly setOpen = (open: boolean) => this.open.set(open) }

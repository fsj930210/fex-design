import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Select } from '@fex-design/angular/ui/select'
@Component({ selector: 'select-empty-ui-example', imports: [Select], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './empty-demo.html' })
export class SelectEmptyExample { readonly options = [] }

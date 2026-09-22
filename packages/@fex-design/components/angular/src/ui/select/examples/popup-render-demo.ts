import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Select } from '@fex-design/angular/ui/select'
@Component({ selector: 'select-popup-ui-example', imports: [Select], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './popup-render-demo.html' })
export class SelectPopupExample { readonly options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }] }

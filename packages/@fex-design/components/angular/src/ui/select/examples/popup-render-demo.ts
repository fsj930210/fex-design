import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Select } from '@fex-design/angular/ui/select'
@Component({ selector: 'select-popup-example', imports: [NgTemplateOutlet, Select], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './popup-render-demo.html' })
export class SelectPopupExample { readonly options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }] }

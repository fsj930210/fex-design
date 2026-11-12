import { Component, input } from '@angular/core'
import { formGroupClassName, formLegendClassName } from '@fex-design/components-styles/form'
import { createHostClassName } from '../../signals/host-class'
@Component({
  selector: 'fieldset[formGroup]',
  standalone: true,
  template: `@if (legend(); as text) {
      <legend
        data-slot="form-legend"
        [class]="formLegendClassName + ' ' + (classNames().legend ?? '')"
        [style]="styles().legend"
      >
        {{ text }}
      </legend>
    }
    <ng-content />`,
  host: {
    '[class]': 'hostClassName() + " " + classNames().root',
    '[style]': 'styles().root',
    'data-slot': 'form-group',
  },
})
export class FormGroup {
  protected readonly formLegendClassName = formLegendClassName
  protected readonly hostClassName = createHostClassName(formGroupClassName)
  readonly legend = input<string>()
  readonly classNames = input<{ root?: string; legend?: string }>({})
  readonly styles = input<{ root?: string; legend?: string }>({})
}

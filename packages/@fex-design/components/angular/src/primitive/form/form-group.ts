import { Directive, inject } from '@angular/core'
import { formGroupClassName } from '@fex-design/components-styles/form'
import { createHostClassName } from '../../signals/host-class'
import { FormRoot } from './form-root'
@Directive({
  selector: 'fieldset[formGroup]',
  standalone: true,
  host: { '[class]': 'hostClassName()', 'data-slot': 'form-group' },
})
export class FormGroup {
  private readonly root = inject(FormRoot)
  protected readonly hostClassName = createHostClassName(formGroupClassName)
}

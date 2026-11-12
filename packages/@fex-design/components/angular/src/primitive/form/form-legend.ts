import { Directive, inject } from '@angular/core'
import { formLegendClassName } from '@fex-design/components-styles/form'
import { createHostClassName } from '../../signals/host-class'
import { FormRoot } from './form-root'
@Directive({
  selector: 'legend[formLegend]',
  standalone: true,
  host: { '[class]': 'hostClassName()', 'data-slot': 'form-legend' },
})
export class FormLegend {
  private readonly root = inject(FormRoot)
  protected readonly hostClassName = createHostClassName(formLegendClassName)
}

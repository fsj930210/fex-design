import { booleanAttribute, Directive, effect, ElementRef, inject, input } from '@angular/core'
import { formLabelClassName } from '@fex-design/components-styles/form'
import { createHostClassName } from '../../signals/host-class'
import { FormField } from './form-field'
import { createFormId } from './form-id'
@Directive({
  selector: 'label[formLabel]',
  standalone: true,
  host: {
    '[class]': 'hostClassName()',
    '[id]': 'id()',
    '[attr.for]': 'field.links().controlId',
    'data-slot': 'form-label',
    '[attr.data-required]': 'required() || null',
  },
})
export class FormLabel {
  readonly field = inject(FormField) as FormField<Record<string, unknown>, string>
  readonly id = input(
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.id || createFormId('label'),
  )
  readonly required = input(false, { transform: booleanAttribute })
  protected readonly hostClassName = createHostClassName(formLabelClassName)
  constructor() {
    // Label IDs also name custom controls through aria-labelledby.
    effect((cleanup) => cleanup(this.field.association.register('labels', this.id())))
    // Mounted semantic label owns this required association.
    effect((cleanup) => {
      if (this.required()) cleanup(this.field.association.require())
    })
  }
}

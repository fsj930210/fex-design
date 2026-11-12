import { Directive, effect, ElementRef, inject, input } from '@angular/core'
import { formDescriptionClassName } from '@fex-design/components-styles/form'
import { createHostClassName } from '../../signals/host-class'
import { FormField } from './form-field'
import { createFormId } from './form-id'
@Directive({
  selector: 'p[formDescription]',
  standalone: true,
  host: { '[class]': 'hostClassName()', '[id]': 'id()', 'data-slot': 'form-description' },
})
export class FormDescription {
  private readonly field = inject(FormField) as FormField<Record<string, unknown>, string>
  readonly id = input(
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.id || createFormId('description'),
  )
  protected readonly hostClassName = createHostClassName(formDescriptionClassName)
  constructor() {
    // Associate only this mounted description and clean up its previous ID.
    effect((cleanup) => cleanup(this.field.association.register('descriptions', this.id())))
  }
}

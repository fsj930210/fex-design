import { DestroyRef, Directive, effect, inject, input } from '@angular/core'
import { getFormControlAttributes } from '@fex-design/core/form/control-binding'
import { createFormControlTarget } from '@fex-design/core/form/control-target'
import { NATIVE_CONTROL_TARGET } from '@fex-design/angular/directives/native-control-target'
import { FormField } from './form-field'

@Directive({
  selector: '[formControl]',
  standalone: true,
  exportAs: 'formControl',
  providers: [{ provide: NATIVE_CONTROL_TARGET, useFactory: () => inject(FormControl).register }],
})
export class FormControl {
  // Kept as inert compatibility inputs while examples migrate to direct CVA controls.
  readonly component = input<unknown>()
  readonly props = input<Record<string, unknown>>({})
  readonly valuePropName = input<string>()
  readonly trigger = input<string>()
  readonly getValueFromEvent = input<(...args: unknown[]) => unknown>()
  readonly getValueProps = input<(value: unknown) => Record<string, unknown>>()
  private readonly field = inject(FormField) as FormField<Record<string, unknown>, string>
  private readonly registry = createFormControlTarget({
    onTarget: (element, originalId) => {
      const initial = this.field.association.getSnapshot().controlId
      if (originalId) this.field.association.setControlId(originalId)
      const detach = this.field.root.targets.register({
        name: () => String(this.field.api.name),
        invalid: () => this.field.presentation().invalid,
        element: () => element,
      })
      return () => {
        detach()
        this.field.association.setControlId(initial)
      }
    },
  })
  register = (element: HTMLElement) => this.registry.register(element)

  constructor() {
    effect(() => {
      this.registry.update(
        getFormControlAttributes(
          this.field.links(),
          String(this.field.api.name),
          this.field.presentation().invalid,
        ),
      )
    })
    inject(DestroyRef).onDestroy(() => this.registry.destroy())
  }
}

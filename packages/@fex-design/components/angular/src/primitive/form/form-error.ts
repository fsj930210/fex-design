import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  inject,
  input,
  TemplateRef,
} from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import { getFormErrorMessages } from '@fex-design/core/form/error-messages'
import { formErrorClassName } from '@fex-design/components-styles/form'
import { createHostClassName } from '../../signals/host-class'
import { FormField } from './form-field'
import { createFormId } from './form-id'
@Component({
  selector: 'div[formError]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: {
    '[class]': 'hostClassName()',
    '[id]': 'id()',
    '[hidden]': '!visible()',
    'aria-live': 'polite',
    'data-slot': 'form-error',
  },
  template: `@if (visible()) {
    @if (content(); as custom) {
      <ng-container
        [ngTemplateOutlet]="custom"
        [ngTemplateOutletContext]="{ $implicit: field.presentation().errors }"
      />
    } @else {
      @for (message of messages(); track message) {
        <div>{{ message }}</div>
      }
    }
  }`,
})
export class FormError {
  readonly field = inject(FormField) as FormField<Record<string, unknown>, string>
  readonly id = input(createFormId('error'))
  readonly messages = computed(() => getFormErrorMessages(this.field.presentation().errors))
  readonly content = contentChild<TemplateRef<{ $implicit: readonly unknown[] }>>(TemplateRef)
  readonly visible = computed(
    () =>
      this.field.presentation().errors.length > 0 &&
      (!!this.content() || this.messages().length > 0),
  )
  protected readonly hostClassName = createHostClassName(formErrorClassName)
  constructor() {
    // Hidden empty hosts do not contribute error IDs to the actual control.
    effect((cleanup) => {
      if (this.visible()) cleanup(this.field.association.register('errors', this.id()))
    })
  }
}

import {
  afterNextRender,
  booleanAttribute,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  Injector,
  Renderer2,
} from '@angular/core'
import type { AnyFormApi } from '@tanstack/angular-form'
import { createFormTargets, scrollToField } from '@fex-design/core/form/field-targets'
import type { FormLayout, FormScrollToFirstError } from '@fex-design/core/form/types'
import {
  formRootClassName,
  formLayoutClassName,
  formLayoutStyle,
} from '@fex-design/components-styles/form'
import { createHostClassName } from '../../signals/host-class'
@Directive({
  selector: 'form[formRoot],div[formRoot]',
  standalone: true,
  exportAs: 'formRoot',
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'form-root',
    '[attr.data-layout]': 'layout()',
    '[attr.data-label-align]': 'labelAlign()',
    '[attr.data-label-wrap]': 'labelWrap() ? "true" : "false"',
    '[style.--form-label-width]': 'layoutStyle()["--form-label-width"]',
    '[style.--form-label-gap]': 'layoutStyle()["--form-label-gap"]',
    '[attr.novalidate]': 'noValidate() ? "" : null',
  },
})
export class FormRoot {
  readonly layout = input<FormLayout>('vertical')
  readonly labelAlign = input<'start' | 'end'>('end')
  readonly labelWidth = input<string | number>('7rem')
  readonly labelGap = input<string | number>('0.5rem')
  readonly labelWrap = input(false, { transform: booleanAttribute })
  protected readonly layoutStyle = () => formLayoutStyle(this.labelWidth(), this.labelGap())
  readonly form = input.required<AnyFormApi>()
  readonly noValidate = input(true, { transform: booleanAttribute })
  readonly scrollToFirstError = input<FormScrollToFirstError>(true)
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  readonly targets = createFormTargets()
  private readonly injector = inject(Injector)
  protected readonly hostClassName = createHostClassName(
    formRootClassName + ' ' + formLayoutClassName,
  )
  constructor() {
    const renderer = inject(Renderer2)
    const destroy = inject(DestroyRef)
    // Append native handlers after template handlers so callers can cancel reset/submit first.
    afterNextRender(() => {
      destroy.onDestroy(renderer.listen(this.element, 'reset', (event: Event) => this.reset(event)))
      destroy.onDestroy(
        renderer.listen(this.element, 'submit', (event: Event) => {
          void this.submit(event)
        }),
      )
    })
  }
  reset(event: Event) {
    if (!(this.element instanceof HTMLFormElement) || event.defaultPrevented) return
    event.preventDefault()
    this.form().reset()
  }
  async submit(event: Event) {
    if (!(this.element instanceof HTMLFormElement) || event.defaultPrevented) return
    event.preventDefault()
    const form = this.form()
    await form.handleSubmit()
    const option = this.scrollToFirstError()
    // TanStack may focus the first invalid control during submission. Focus is
    // opt-in for this directive, so clear that implicit focus unless the
    // caller explicitly requested scrollToFirstError.
    if (!option && this.element.ownerDocument.activeElement instanceof HTMLElement) {
      const active = this.element.ownerDocument.activeElement
      if (active !== this.element && this.element.contains(active)) active.blur()
    }
    if (!option || form.state.isValid) return
    afterNextRender(
      () => scrollToField(this.targets, undefined, typeof option === 'boolean' ? {} : option),
      { injector: this.injector },
    )
  }
}
export function injectFormInstance() {
  return inject(FormRoot).form
}

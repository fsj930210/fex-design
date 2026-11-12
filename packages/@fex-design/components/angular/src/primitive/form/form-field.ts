import {
  afterNextRender,
  computed,
  Directive,
  effect,
  inject,
  Injector,
  input,
  runInInjectionContext,
  signal,
} from '@angular/core'
import {
  TanStackField,
  type DeepKeys,
  type DeepValue,
  type FieldValidateOrFn,
  type FieldAsyncValidateOrFn,
  type FormValidateOrFn,
  type FormAsyncValidateOrFn,
} from '@tanstack/angular-form'
import { createFormFieldAssociation } from '@fex-design/core/form/field-association'
import { getFormFieldPresentation } from '@fex-design/core/form/field-presentation'
import type { FormFieldSnapshot } from '@fex-design/core/form/types'
import { createCoreStoreSignal } from '../../signals/core-store-signal'
import { formSnapshotStore } from '@fex-design/core/form/snapshot-store'
import { injectStore } from '@tanstack/angular-form'
import { FormRoot } from './form-root'
import { createFormId } from './form-id'
import { formFieldClassName } from '@fex-design/components-styles/form'

@Directive({
  selector: 'ng-container[formField],div[formField]',
  standalone: true,
  exportAs: 'formField',
  host: { '[class]': 'formFieldClassName', 'data-slot': 'form-field' },
})
export class FormField<
  TData = Record<string, unknown>,
  TName extends DeepKeys<TData> = DeepKeys<TData>,
> {
  protected readonly formFieldClassName = formFieldClassName
  readonly root = inject(FormRoot)
  private readonly formInjector = inject(Injector)
  private get tanstack() {
    return this.formInjector.get(TanStackField)
  }
  get api() {
    return this.tanstack.api
  }
  get name() {
    return this.tanstack.name()
  }
  // Reuse the official directive's complete field lifecycle and option inputs.
  readonly association = createFormFieldAssociation(createFormId('control'))
  readonly links = createCoreStoreSignal(this.association)
  private readonly snapshot = signal<FormFieldSnapshot>({
    value: undefined,
    meta: { errors: [], isTouched: false, isValidating: false },
  })
  readonly fieldState = this.snapshot.asReadonly()
  readonly submissionAttempts = signal(0)
  readonly presentation = computed(() => {
    return getFormFieldPresentation(this.fieldState(), this.submissionAttempts(), 'touched')
  })
  constructor() {
    afterNextRender(() => {
      const fieldStore = formSnapshotStore(this.api.store)

      this.snapshot.set(fieldStore.getSnapshot())
      const attempts = runInInjectionContext(this.formInjector, () =>
        injectStore(this.api.form, (state) => state.submissionAttempts),
      )
      runInInjectionContext(this.formInjector, () =>
        effect(() => this.submissionAttempts.set(attempts())),
      )
      effect(
        (cleanup) => {
          cleanup(this.root.targets.claim(String(this.name)))
        },
        { injector: this.formInjector },
      )
      effect(
        (cleanup) => {
          const api = this.api
          const store = formSnapshotStore(api.store)

          this.snapshot.set(store.getSnapshot())
          cleanup(
            store.subscribe(() => {
              const state = store.getSnapshot()

              this.snapshot.set(state)
            }),
          )
        },
        { injector: this.formInjector },
      )
    })
  }
}

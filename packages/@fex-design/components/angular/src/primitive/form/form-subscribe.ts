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
  TemplateRef,
  ViewContainerRef,
  type EmbeddedViewRef,
} from '@angular/core'
import { injectStore } from '@tanstack/angular-form'
import type { AnyFormState } from '@tanstack/angular-form'
import { FormRoot } from './form-root'
export interface FormSubscribeContext<TSelected> {
  $implicit: TSelected
}
@Directive({ selector: 'ng-template[formSubscribe]', standalone: true })
export class FormSubscribe<TSelected> {
  readonly selector = input.required<(state: AnyFormState) => TSelected>({ alias: 'formSubscribe' })
  private readonly root = inject(FormRoot)
  private readonly injector = inject(Injector)
  private readonly template = inject<TemplateRef<FormSubscribeContext<TSelected>>>(TemplateRef)
  private readonly container = inject(ViewContainerRef)
  // FormRoot's required input is assigned after directive construction. Read it
  // from a computed signal so NG0950 is not raised during field initialization.
  private readonly state = signal<AnyFormState>({} as AnyFormState)
  private readonly selected = computed(() => this.selector()(this.state()))
  constructor() {
    afterNextRender(() => {
      const state = runInInjectionContext(this.injector, () =>
        injectStore(this.root.form(), (value) => value),
      )
      runInInjectionContext(this.injector, () => effect(() => this.state.set(state())))
    })
    let view: EmbeddedViewRef<FormSubscribeContext<TSelected>> | undefined
    // Embedded view context is an Angular rendering boundary, not a business state listener.
    effect(() => {
      const value = this.selected()
      if (!view) view = this.container.createEmbeddedView(this.template, { $implicit: value })
      else {
        view.context.$implicit = value
        view.markForCheck()
      }
    })
  }
  static ngTemplateContextGuard<T>(
    directive: FormSubscribe<T>,
    context: unknown,
  ): context is FormSubscribeContext<T> {
    return true
  }
}
